import { NextResponse } from 'next/server';
import { calculatePlayerPoints } from '@/lib/scoring';
import { MatchPerformance } from '@/lib/types';
import { WORLD_CUP_PLAYERS } from '@/lib/players';

// Force Node.js runtime for Vercel compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// This API route analyzes scorecard screenshots using OpenAI Vision API
export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const { images, matchId } = formData;

    if (!images || images.length === 0) {
      return NextResponse.json({ error: 'No images provided' }, { status: 400 });
    }

    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      return NextResponse.json({
        error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to environment variables.'
      }, { status: 500 });
    }

    // Analyze all images and extract scorecard data
    const allPerformances: MatchPerformance[] = [];

    for (const imageData of images) {
      const performances = await analyzeScoreboardImage(imageData, matchId, openaiKey);
      allPerformances.push(...performances);
    }

    // Merge performances for the same player (in case they appear in multiple images)
    const mergedPerformances = mergePlayerPerformances(allPerformances);

    // Calculate points for each performance
    mergedPerformances.forEach(perf => {
      perf.points = calculatePlayerPoints(perf);
    });

    return NextResponse.json({
      success: true,
      performances: mergedPerformances,
      playersFound: mergedPerformances.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error analyzing scorecard:', error);
    return NextResponse.json(
      {
        error: 'Failed to analyze scorecard',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

// Analyze a single scorecard image using OpenAI Vision
async function analyzeScoreboardImage(
  imageBase64: string,
  matchId: string,
  apiKey: string
): Promise<MatchPerformance[]> {
  const prompt = `You are analyzing a cricket scorecard screenshot from the ICC T20 World Cup 2026.

Extract ALL player performance data from this image. The image may show:
- Batting scorecard (runs, balls, 4s, 6s)
- Bowling scorecard (overs, runs, wickets, economy, maidens)
- Fall of wickets

Return a JSON array of player performances in this EXACT format:
[
  {
    "playerName": "Full Player Name",
    "runs": 0,
    "balls": 0,
    "fours": 0,
    "sixes": 0,
    "isDismissed": false,
    "wickets": 0,
    "oversBowled": 0.0,
    "runsConceded": 0,
    "maidens": 0,
    "economyRate": 0.0,
    "dotBalls": 0,
    "bowledOrLbw": 0,
    "catches": 0,
    "runOuts": 0,
    "stumpings": 0
  }
]

IMPORTANT:
1. Extract EXACT player names as shown
2. For batting stats: runs, balls faced, 4s, 6s
3. For bowling stats: overs bowled (e.g., 4.0), runs conceded, wickets, maidens, economy rate
4. If a stat is not visible, use 0
5. Return ONLY valid JSON, no markdown or explanation
6. Include ALL players visible in the screenshot`;

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
            role: 'user',
            content: [
              { type: 'text', text: prompt },
              {
                type: 'image_url',
                image_url: {
                  url: imageBase64.startsWith('data:')
                    ? imageBase64
                    : `data:image/jpeg;base64,${imageBase64}`
                }
              }
            ]
          }
        ],
        max_tokens: 2000,
        temperature: 0.1 // Low temperature for accuracy
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`OpenAI API error: ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = content.trim();
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/```\n?/g, '').replace(/```\n?$/g, '');
    }

    const extractedData = JSON.parse(jsonStr);

    // Convert to MatchPerformance format
    const performances: MatchPerformance[] = [];

    for (const playerData of extractedData) {
      // Find player in database
      const player = findPlayerByName(playerData.playerName);

      if (!player) {
        console.warn(`Player not found in database: ${playerData.playerName}`);
        continue;
      }

      performances.push({
        playerId: player.id,
        matchId,
        inStartingLineup: true,
        runs: playerData.runs || 0,
        balls: playerData.balls || 0,
        fours: playerData.fours || 0,
        sixes: playerData.sixes || 0,
        isDismissedForDuck: (playerData.isDismissed && playerData.runs === 0),
        wickets: playerData.wickets || 0,
        dotBalls: playerData.dotBalls || 0,
        bowledOrLbwWickets: playerData.bowledOrLbw || 0,
        oversBowled: playerData.oversBowled || 0,
        catches: playerData.catches || 0,
        directRunOuts: playerData.runOuts || 0,
        indirectRunOuts: 0,
        stumpings: playerData.stumpings || 0,
        maidens: playerData.maidens || 0,
        economyRate: playerData.economyRate || 0,
        points: 0 // Will be calculated later
      });
    }

    return performances;

  } catch (error) {
    console.error('Error calling OpenAI Vision API:', error);
    throw error;
  }
}

// Find player by name (case-insensitive, fuzzy matching)
function findPlayerByName(name: string): { id: string; name: string } | null {
  if (!name) return null;

  const normalizedName = name.toLowerCase().trim();

  // Try exact match first
  let player = WORLD_CUP_PLAYERS.find(p => p.name.toLowerCase() === normalizedName);

  // Try partial match if exact fails
  if (!player) {
    player = WORLD_CUP_PLAYERS.find(p => {
      const dbName = p.name.toLowerCase();
      return dbName.includes(normalizedName) || normalizedName.includes(dbName);
    });
  }

  return player ? { id: player.id, name: player.name } : null;
}

// Merge performances for the same player from multiple images
function mergePlayerPerformances(performances: MatchPerformance[]): MatchPerformance[] {
  const playerMap = new Map<string, MatchPerformance>();

  for (const perf of performances) {
    const existing = playerMap.get(perf.playerId);

    if (existing) {
      // Merge stats (sum batting/bowling/fielding)
      existing.runs += perf.runs;
      existing.balls += perf.balls;
      existing.fours += perf.fours;
      existing.sixes += perf.sixes;
      existing.wickets += perf.wickets;
      existing.dotBalls += perf.dotBalls;
      existing.bowledOrLbwWickets += perf.bowledOrLbwWickets;
      existing.oversBowled += perf.oversBowled;
      existing.catches += perf.catches;
      existing.directRunOuts += perf.directRunOuts;
      existing.indirectRunOuts += perf.indirectRunOuts;
      existing.stumpings += perf.stumpings;
      existing.maidens += perf.maidens;

      // Average economy rate
      if (perf.economyRate > 0) {
        existing.economyRate = existing.economyRate > 0
          ? (existing.economyRate + perf.economyRate) / 2
          : perf.economyRate;
      }

      // Update duck status
      if (perf.isDismissedForDuck) {
        existing.isDismissedForDuck = true;
      }
    } else {
      playerMap.set(perf.playerId, { ...perf });
    }
  }

  return Array.from(playerMap.values());
}
