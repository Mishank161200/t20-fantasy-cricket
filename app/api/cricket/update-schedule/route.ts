import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// This route updates match schedules and processes completed matches automatically
// Designed to be called by Vercel Cron Jobs
export async function POST(request: Request) {
  try {
    // Verify authorization
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'dev-secret';

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Fetch both live and recent matches
    const [liveResponse, recentResponse] = await Promise.all([
      fetch('https://cricket-live-scores1.p.rapidapi.com/matches/live', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'cricket-live-scores1.p.rapidapi.com'
        }
      }),
      fetch('https://cricket-live-scores1.p.rapidapi.com/matches/recent', {
        method: 'GET',
        headers: {
          'x-rapidapi-key': apiKey,
          'x-rapidapi-host': 'cricket-live-scores1.p.rapidapi.com'
        }
      })
    ]);

    if (!liveResponse.ok || !recentResponse.ok) {
      throw new Error(`API responded with error`);
    }

    const [liveData, recentData] = await Promise.all([
      liveResponse.json(),
      recentResponse.json()
    ]);

    // Combine and filter for 2026 T20 World Cup matches
    const allMatches = [
      ...(liveData.matches || []),
      ...(recentData.matches || [])
    ];

    const worldCupMatches = allMatches.filter((match: any) => {
      const series = match.series?.toLowerCase() || '';
      const matchDate = new Date(match.date || match.dateTimeGMT);
      const year = matchDate.getFullYear();

      return (
        (series.includes('t20 world cup') ||
          series.includes('t20wc') ||
          series.includes('icc men\'s t20 world cup') ||
          series.includes('icc t20 world cup')) &&
        year === 2026
      );
    });

    // Get previously processed matches
    const scheduleRef = doc(db, 'config', 'match-schedule');
    const scheduleDoc = await getDoc(scheduleRef);
    const previousData = scheduleDoc.exists() ? scheduleDoc.data() : {};
    const processedMatches = new Set(previousData.processedMatches || []);

    // Update schedule in Firestore
    const updates = {
      lastUpdated: new Date().toISOString(),
      liveMatches: worldCupMatches.map((match: any) => ({
        matchId: match.id || match.match_id,
        team1: match.team1 || match.teams?.[0],
        team2: match.team2 || match.teams?.[1],
        status: match.status || 'live',
        score: match.score || '',
        venue: match.venue || '',
        matchNumber: match.match_number || 0
      })),
      processedMatches: Array.from(processedMatches)
    };

    await setDoc(scheduleRef, updates, { merge: true });

    // Process completed matches that haven't been processed yet
    const completedMatches = worldCupMatches.filter((match: any) => {
      const matchId = match.id || match.match_id;
      const status = match.status?.toLowerCase() || '';
      return (status === 'completed' || status === 'finished' || match.matchEnded) &&
        !processedMatches.has(matchId);
    });

    let scorecardProcessed = 0;
    const scorecardErrors: string[] = [];

    // Process each completed match
    for (const match of completedMatches) {
      const matchId = match.id || match.match_id;

      try {
        // Call our scorecard processing endpoint
        const scorecardResponse = await fetch(`${getBaseUrl()}/api/cricket/scorecard`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ matchId })
        });

        if (scorecardResponse.ok) {
          scorecardProcessed++;
          processedMatches.add(matchId);
        } else {
          const errorData = await scorecardResponse.json();
          scorecardErrors.push(`Match ${matchId}: ${errorData.error || 'Unknown error'}`);
        }
      } catch (error) {
        scorecardErrors.push(`Match ${matchId}: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    }

    // Update processed matches list
    if (scorecardProcessed > 0) {
      await setDoc(scheduleRef, {
        processedMatches: Array.from(processedMatches)
      }, { merge: true });
    }

    return NextResponse.json({
      success: true,
      matchesFound: worldCupMatches.length,
      completedMatches: completedMatches.length,
      scorecardsProcessed: scorecardProcessed,
      errors: scorecardErrors.length > 0 ? scorecardErrors : undefined,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error updating cricket schedule:', error);
    return NextResponse.json(
      { error: 'Failed to update schedule', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Get base URL for API calls
function getBaseUrl() {
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
}

// Allow GET requests for testing
export async function GET() {
  return NextResponse.json({
    message: 'Cricket schedule updater is running',
    note: 'Use POST with authorization header to trigger update'
  });
}
