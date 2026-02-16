import { NextResponse } from 'next/server';

// Force Node.js runtime for Vercel compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// This API route fetches live and recent cricket scores from RapidAPI
// Updated: 2026-02-16 - Automatic scoring system for 2026 T20 World Cup
export async function GET(request: Request) {
  try {
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

    return NextResponse.json({
      success: true,
      matches: worldCupMatches,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error fetching cricket scores:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cricket scores', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
