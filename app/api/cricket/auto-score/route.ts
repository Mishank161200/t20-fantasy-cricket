import { NextResponse } from 'next/server';
import { calculatePlayerPoints } from '@/lib/scoring';
import { MatchPerformance } from '@/lib/types';
import { WORLD_CUP_PLAYERS } from '@/lib/players';
import { WORLD_CUP_SCHEDULE } from '@/lib/schedule';

// Force Node.js runtime for Vercel compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// This API route automatically fetches match statistics using CricketData.org API and calculates points
export async function POST(request: Request) {
  try {
    console.log('Received auto-score request');
    const { matchId } = await request.json();

    console.log('Match ID:', matchId);

    if (!matchId) {
      return NextResponse.json({ error: 'Match ID is required' }, { status: 400 });
    }

    // Get match details from schedule
    const match = WORLD_CUP_SCHEDULE.find(m => m.id === matchId);
    if (!match) {
      return NextResponse.json({ error: 'Match not found' }, { status: 404 });
    }

    if (match.status !== 'completed') {
      return NextResponse.json({
        error: 'Match is not completed yet',
        status: match.status
      }, { status: 400 });
    }

    const cricketApiKey = process.env.CRICKET_API_KEY;
    const geminiKey = process.env.GEMINI_API_KEY;

    console.log('Environment check:', {
      hasCricketKey: !!cricketApiKey,
      hasGeminiKey: !!geminiKey,
      cricketKeyPreview: cricketApiKey ? `${cricketApiKey.substring(0, 8)}...${cricketApiKey.slice(-4)}` : 'NOT SET',
      geminiKeyPreview: geminiKey ? `${geminiKey.substring(0, 7)}...${geminiKey.slice(-4)}` : 'NOT SET',
      nodeEnv: process.env.NODE_ENV,
      isVercel: !!process.env.VERCEL
    });

    if (!cricketApiKey) {
      console.error('Cricket API key not configured');
      return NextResponse.json({
        error: 'Cricket API key not configured. Please add CRICKET_API_KEY to environment variables.',
        debug: {
          environment: process.env.NODE_ENV,
          vercel: !!process.env.VERCEL,
          timestamp: new Date().toISOString()
        }
      }, { status: 500 });
    }

    if (!geminiKey) {
      console.error('Gemini API key not configured');
      return NextResponse.json({
        error: 'Gemini API key not configured. Please add GEMINI_API_KEY to environment variables.',
        debug: {
          environment: process.env.NODE_ENV,
          vercel: !!process.env.VERCEL,
          timestamp: new Date().toISOString()
        }
      }, { status: 500 });
    }

    console.log('Fetching match statistics using CricketData.org + Gemini...');

    // Fetch match statistics using CricketData.org API + Gemini analysis
    const performances = await fetchMatchStatistics(match, cricketApiKey);

    console.log('Extracted performances:', performances.length, 'players');

    return NextResponse.json({
      success: true,
      matchId: match.id,
      matchNumber: match.matchNumber,
      teams: `${match.team1} vs ${match.team2}`,
      performances,
      timestamp: new Date().toISOString()
    });

  } catch (error: any) {
    console.error('Error in auto-score:', error);
    return NextResponse.json({
      error: error.message || 'Failed to fetch match statistics',
      details: error.toString()
    }, { status: 500 });
  }
}

// Function to fetch match data from CricketData.org API
async function fetchCricketDataMatch(match: any, apiKey: string): Promise<any> {
  try {
    // CricketData.org API endpoints
    // First, we need to search for current/recent matches
    const currentMatchesUrl = `https://api.cricapi.com/v1/currentMatches?apikey=${apiKey}&offset=0`;

    console.log('Searching for match in CricketData.org current matches...');
    const currentResponse = await fetch(currentMatchesUrl);

    if (!currentResponse.ok) {
      throw new Error(`CricketData API error: ${currentResponse.status}`);
    }

    const currentData = await currentResponse.json();

    // Search for our match based on team names
    let foundMatch = currentData.data?.find((m: any) => {
      const team1Match = m.teams?.includes(match.team1) || m.name?.includes(match.team1);
      const team2Match = m.teams?.includes(match.team2) || m.name?.includes(match.team2);
      return team1Match && team2Match;
    });

    // If not found in current matches, try match series
    if (!foundMatch) {
      console.log('Match not found in current matches, searching series...');
      const seriesUrl = `https://api.cricapi.com/v1/series?apikey=${apiKey}&offset=0`;
      const seriesResponse = await fetch(seriesUrl);

      if (seriesResponse.ok) {
        const seriesData = await seriesResponse.json();
        // Look for ICC T20 World Cup 2026
        const worldCupSeries = seriesData.data?.find((s: any) =>
          s.name?.includes('T20 World Cup') && s.name?.includes('2026')
        );

        if (worldCupSeries && worldCupSeries.id) {
          // Get matches from this series
          const seriesMatchesUrl = `https://api.cricapi.com/v1/series_info?apikey=${apiKey}&id=${worldCupSeries.id}`;
          const seriesMatchesResponse = await fetch(seriesMatchesUrl);

          if (seriesMatchesResponse.ok) {
            const seriesMatchesData = await seriesMatchesResponse.json();
            foundMatch = seriesMatchesData.data?.matchList?.find((m: any) => {
              const team1Match = m.teams?.includes(match.team1) || m.name?.includes(match.team1);
              const team2Match = m.teams?.includes(match.team2) || m.name?.includes(match.team2);
              return team1Match && team2Match;
            });
          }
        }
      }
    }

    if (!foundMatch) {
      console.log('Match not found in CricketData.org');
      return null;
    }

    // Get detailed match info including scorecard
    console.log(`Found match ID: ${foundMatch.id}, fetching detailed scorecard...`);
    const matchInfoUrl = `https://api.cricapi.com/v1/match_info?apikey=${apiKey}&id=${foundMatch.id}`;
    const matchInfoResponse = await fetch(matchInfoUrl);

    if (!matchInfoResponse.ok) {
      throw new Error(`Failed to fetch match details: ${matchInfoResponse.status}`);
    }

    const matchInfo = await matchInfoResponse.json();
    console.log('Match details retrieved successfully');

    return matchInfo.data;

  } catch (error: any) {
    console.error('Error fetching from CricketData.org:', error);
    return null;
  }
}

async function fetchMatchStatistics(match: any, apiKey: string): Promise<MatchPerformance[]> {
  console.log(`Fetching statistics for Match ${match.matchNumber}: ${match.team1} vs ${match.team2}`);

  // Step 1: Get match data from CricketData.org
  console.log('Step 1: Fetching match data from CricketData.org...');

  const matchData = await fetchCricketDataMatch(match, process.env.CRICKET_API_KEY!);

  if (!matchData) {
    throw new Error('Could not find match data from CricketData.org. The match may not be available yet.');
  }

  console.log('Match data retrieved from CricketData.org');

  // Step 2: Use Gemini to analyze and extract player statistics
  console.log('Step 2: Using Gemini to analyze match data...');

  const prompt = `You are a cricket statistics expert. I have match data from CricketData.org API. Please analyze it and extract player statistics in the required format.

Match: ${match.team1} vs ${match.team2}
Date: ${new Date(match.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
Venue: ${match.venue}

Raw Match Data:
${JSON.stringify(matchData, null, 2)}

YOUR TASK:
Extract batting, bowling, and fielding statistics for EVERY player who participated in this match.

IMPORTANT RULES:
1. Return ONLY valid JSON - no markdown, no code blocks, no explanations
2. Extract data from the provided match data above
3. Do NOT make up or hallucinate statistics - only use what's in the data
4. Include ALL players from both teams
5. Use exact player names from the data

Return the data in this exact JSON format:
{
  "players": [
    {
      "name": "Player Full Name",
      "team": "Team Name",
      "batting": {
        "runs": 0,
        "balls": 0,
        "fours": 0,
        "sixes": 0,
        "out": true
      },
      "bowling": {
        "overs": 0,
        "runs": 0,
        "wickets": 0,
        "maidens": 0
      },
      "fielding": {
        "catches": 0,
        "runOuts": 0,
        "stumpings": 0
      }
    }
  ]
}`;

  try {
    const geminiKey = process.env.GEMINI_API_KEY;
    if (!geminiKey) {
      throw new Error('Gemini API key not configured');
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 8000,
          topP: 0.95,
          topK: 40
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Gemini analysis complete');

    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) {
      throw new Error('No content in Gemini response');
    }

    console.log('Parsing Gemini response...');

    // Clean up the response - remove markdown code blocks if present
    let cleanedContent = content.trim();
    if (cleanedContent.startsWith('```json')) {
      cleanedContent = cleanedContent.replace(/```json\n?/g, '').replace(/```\n?/g, '');
    } else if (cleanedContent.startsWith('```')) {
      cleanedContent = cleanedContent.replace(/```\n?/g, '');
    }

    const statsData = JSON.parse(cleanedContent);

    if (!statsData.players || !Array.isArray(statsData.players)) {
      console.log('No player data found in response');
      return [];
    }

    console.log(`Found statistics for ${statsData.players.length} players`);

    // Convert OpenAI stats to MatchPerformance format
    const performances: MatchPerformance[] = [];

    for (const playerStats of statsData.players) {
      // Try to match player name to our player database
      const matchedPlayer = findPlayerByName(playerStats.name);

      if (!matchedPlayer) {
        console.log(`Could not match player: ${playerStats.name}`);
        continue;
      }

      console.log(`Matched ${playerStats.name} -> ${matchedPlayer.name}`);

      // Create match performance object
      const matchPerformance: MatchPerformance = {
        playerId: matchedPlayer.id,
        matchId: match.id,
        inStartingLineup: true,
        runs: playerStats.batting?.runs || 0,
        balls: playerStats.batting?.balls || 0,
        fours: playerStats.batting?.fours || 0,
        sixes: playerStats.batting?.sixes || 0,
        isDismissedForDuck: (playerStats.batting?.runs === 0 && playerStats.batting?.out === true) || false,
        wickets: playerStats.bowling?.wickets || 0,
        dotBalls: 0, // OpenAI doesn't typically provide this, will be 0
        bowledOrLbwWickets: 0, // OpenAI doesn't provide this detail
        oversBowled: playerStats.bowling?.overs || 0,
        catches: playerStats.fielding?.catches || 0,
        directRunOuts: playerStats.fielding?.runOuts || 0,
        indirectRunOuts: 0,
        stumpings: playerStats.fielding?.stumpings || 0,
        maidens: playerStats.bowling?.maidens || 0,
        economyRate: calculateEconomyRate(playerStats.bowling?.runs || 0, playerStats.bowling?.overs || 0),
        points: 0 // Will be calculated next
      };

      // Calculate points based on the performance
      const points = calculatePlayerPoints(matchPerformance);
      matchPerformance.points = points;

      performances.push(matchPerformance);
    }

    return performances;

  } catch (error: any) {
    console.error('Error fetching match statistics:', error);
    throw new Error(`Failed to fetch statistics: ${error.message}`);
  }
}

// Helper function to find a player by name (fuzzy matching)
function findPlayerByName(name: string): any {
  const normalizedName = name.toLowerCase().trim();

  // Try exact match first
  let player = WORLD_CUP_PLAYERS.find(p => p.name.toLowerCase() === normalizedName);
  if (player) return player;

  // Try partial match (last name)
  const nameParts = normalizedName.split(' ');
  const lastName = nameParts[nameParts.length - 1];

  player = WORLD_CUP_PLAYERS.find(p => {
    const playerLastName = p.name.toLowerCase().split(' ').pop();
    return playerLastName === lastName;
  });

  if (player) return player;

  // Try contains match
  player = WORLD_CUP_PLAYERS.find(p =>
    p.name.toLowerCase().includes(normalizedName) ||
    normalizedName.includes(p.name.toLowerCase())
  );

  return player || null;
}

// Helper function to calculate economy rate
function calculateEconomyRate(runsConceded: number, overs: number): number {
  if (overs === 0) return 0;
  return runsConceded / overs;
}
