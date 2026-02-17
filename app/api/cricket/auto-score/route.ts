import { NextResponse } from 'next/server';
import { calculatePlayerPoints } from '@/lib/scoring';
import { MatchPerformance } from '@/lib/types';
import { WORLD_CUP_PLAYERS } from '@/lib/players';
import { WORLD_CUP_SCHEDULE } from '@/lib/schedule';

// Force Node.js runtime for Vercel compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// This API route automatically fetches match statistics using OpenAI and calculates points
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

    const openaiKey = process.env.OPENAI_API_KEY;
    console.log('Environment check:', {
      hasKey: !!openaiKey,
      keyPreview: openaiKey ? `${openaiKey.substring(0, 7)}...${openaiKey.slice(-4)}` : 'NOT SET',
      nodeEnv: process.env.NODE_ENV,
      isVercel: !!process.env.VERCEL
    });

    if (!openaiKey) {
      console.error('OpenAI API key not configured');
      return NextResponse.json({
        error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to environment variables.',
        debug: {
          environment: process.env.NODE_ENV,
          vercel: !!process.env.VERCEL,
          timestamp: new Date().toISOString()
        }
      }, { status: 500 });
    }

    console.log('Fetching match statistics using OpenAI...');

    // Fetch match statistics using OpenAI
    const performances = await fetchMatchStatistics(match, openaiKey);

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

async function fetchMatchStatistics(match: any, apiKey: string): Promise<MatchPerformance[]> {
  console.log(`Fetching statistics for Match ${match.matchNumber}: ${match.team1} vs ${match.team2}`);

  // Format the date nicely for the query
  const matchDate = new Date(match.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  // Create a prompt for OpenAI to search for match statistics
  const prompt = `You are a cricket statistics assistant. Find the detailed player statistics for the following ICC T20 World Cup 2026 match:

Match: ${match.team1} vs ${match.team2}
Date: ${matchDate}
Venue: ${match.venue}

Please provide the batting and bowling statistics for ALL players who participated in this match. For each player, provide:

BATTING:
- Player name
- Runs scored
- Balls faced
- Fours hit
- Sixes hit
- Whether they were out or not out

BOWLING:
- Player name
- Overs bowled (can be decimal like 3.4)
- Runs conceded
- Wickets taken
- Maidens

FIELDING:
- Player name
- Catches taken
- Run outs (direct hits or assists)
- Stumpings (for wicket-keepers)

IMPORTANT RULES:
1. Return ONLY valid JSON - no markdown, no code blocks, no explanations
2. If you cannot find real match data, return an empty array []
3. Do NOT make up or hallucinate statistics
4. Only include players who actually played in this specific match
5. Use exact player names as they appear in official records

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
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [
          {
            role: 'system',
            content: 'You are a cricket statistics expert. You search for and provide accurate cricket match statistics. You MUST return valid JSON only. Never make up statistics - if data is not available, return empty array.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.1, // Low temperature for factual accuracy
        max_tokens: 4000
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`OpenAI API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI response received');

    const content = data.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No content in OpenAI response');
    }

    console.log('Parsing OpenAI response...');

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
