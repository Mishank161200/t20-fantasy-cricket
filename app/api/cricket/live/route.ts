import { NextResponse } from 'next/server';

// This API route fetches live cricket scores from RapidAPI and updates match statuses
export async function GET(request: Request) {
  try {
    const apiKey = process.env.RAPIDAPI_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Fetch live matches from Cricket Live Scores API on RapidAPI
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
      match.series?.toLowerCase().includes('t20wc')
    ) || [];

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
