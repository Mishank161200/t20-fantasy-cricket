import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';

// This route updates match schedules automatically using RapidAPI cricket data
// Designed to be called by Vercel Cron Jobs
export async function POST(request: Request) {
  try {
    // Verify authorization (optional: add a secret token)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET || 'dev-secret';

    if (authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const apiKey = process.env.RAPIDAPI_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Fetch live matches
    const response = await fetch('https://cricket-live-scores1.p.rapidapi.com/matches/live', {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'cricket-live-scores1.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const data = await response.json();

    // Filter for T20 World Cup matches
    const worldCupMatches = data.matches?.filter((match: any) =>
      match.series?.toLowerCase().includes('t20 world cup') ||
      match.series?.toLowerCase().includes('t20wc') ||
      match.series?.toLowerCase().includes('icc men\'s t20 world cup')
    ) || [];

    // Update schedule in Firestore
    const scheduleRef = doc(db, 'config', 'match-schedule');

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
      }))
    };

    await setDoc(scheduleRef, updates, { merge: true });

    return NextResponse.json({
      success: true,
      matchesFound: worldCupMatches.length,
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

// Allow GET requests for testing
export async function GET() {
  return NextResponse.json({
    message: 'Cricket schedule updater is running',
    note: 'Use POST with authorization header to trigger update'
  });
}
