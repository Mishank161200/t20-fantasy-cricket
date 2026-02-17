import { NextResponse } from 'next/server';
import { calculatePlayerPoints } from '@/lib/scoring';
import { MatchPerformance } from '@/lib/types';
import { WORLD_CUP_PLAYERS } from '@/lib/players';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Force Node.js runtime for Vercel compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// This API route analyzes scorecard screenshots using Gemini Vision API
export async function POST(request: Request) {
  try {
    console.log('Received scorecard analysis request');
    const formData = await request.json();
    const { images, matchId } = formData;

    console.log('Match ID:', matchId);
    console.log('Number of images received:', images?.length || 0);

    if (!images || images.length === 0) {
      console.error('No images provided in request');
      return NextResponse.json({ error: 'No images provided' }, { status: 400 });
    }

    const geminiKey = process.env.GEMINI_API_KEY;
    console.log('Environment check:', {
      hasKey: !!geminiKey,
      keyPreview: geminiKey ? `${geminiKey.substring(0, 7)}...${geminiKey.slice(-4)}` : 'NOT SET',
      nodeEnv: process.env.NODE_ENV,
      isVercel: !!process.env.VERCEL
    });

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

    console.log('Gemini API key found, starting image analysis...');

    // Analyze all images and extract scorecard data
    const allPerformances: MatchPerformance[] = [];

    for (let i = 0; i < images.length; i++) {
      console.log(`Analyzing image ${i + 1} of ${images.length}...`);
      const performances = await analyzeScoreboardImage(images[i], matchId, geminiKey);
      console.log(`Image ${i + 1} analysis complete: ${performances.length} players found`);
      allPerformances.push(...performances);
    }

    // Merge performances for the same player (in case they appear in multiple images)
    console.log('Merging performances from multiple images...');
    const mergedPerformances = mergePlayerPerformances(allPerformances);
    console.log(`Final merged performances: ${mergedPerformances.length} unique players`);

    // Calculate points for each performance
    console.log('Calculating points for each player...');
    mergedPerformances.forEach(perf => {
      perf.points = calculatePlayerPoints(perf);
    });

    console.log('Analysis complete, returning results');
    return NextResponse.json({
      success: true,
      performances: mergedPerformances,
      playersFound: mergedPerformances.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error analyzing scorecard:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error details:', errorMessage);
    return NextResponse.json(
      {
        error: 'Failed to analyze scorecard',
        details: errorMessage
      },
      { status: 500 }
    );
  }
}

// Analyze a single scorecard image using Gemini Vision
async function analyzeScoreboardImage(
  imageBase64: string,
  matchId: string,
  apiKey: string
): Promise<MatchPerformance[]> {
  const prompt = `You are analyzing a cricket scorecard screenshot from the ICC T20 World Cup 2026 for a fantasy cricket game.

=== FANTASY SCORING SYSTEM ===
This scorecard will be used to calculate fantasy points based on:

BATTING POINTS:
- Every run = 1 point
- Every boundary (4) = +4 bonus points
- Every six (6) = +6 bonus points
- Strike rate bonuses/penalties (calculated from runs/balls)
- Duck penalty if dismissed for 0 runs = -2 points

BOWLING POINTS:
- Every wicket = 30 points
- Bowled/LBW dismissal = +8 bonus points (IMPORTANT!)
- Every maiden over = 12 points
- Economy rate bonuses/penalties (calculated from runs/overs)
- Dot balls = 1 point each (if visible)

FIELDING POINTS:
- Catches = 8 points each
- Stumpings = 12 points
- Direct run outs = 12 points
- Indirect run outs = 6 points

=== EXTRACTION INSTRUCTIONS ===

CRITICAL RULES:
- Extract ONLY what is CLEARLY VISIBLE in THIS image
- DO NOT hallucinate, invent, or guess ANY data
- DO NOT include players not shown in THIS specific screenshot
- If you cannot read a value clearly, use 0
- Be EXACT with player names (match the scorecard exactly)

WHAT TO EXTRACT:

1. BATTING SCORECARD (if visible):
   - Player name (exact match from scorecard)
   - Runs scored (R column)
   - Balls faced (B column)
   - Fours hit (4S column)
   - Sixes hit (6S column)
   - Dismissal status: set "isDismissed" to true if player is out, false if "not out"
   - Look for dismissal method (c = caught, b = bowled, lbw, st = stumped, run out)

2. BOWLING SCORECARD (if visible):
   - Bowler name (exact match from scorecard)
   - Overs bowled (O column) - use decimal format (e.g., 4.0, 3.2)
   - Runs conceded (R column)
   - Wickets taken (W column)
   - Maidens bowled (M column)
   - Economy rate (ECO column)
   - If you can see individual balls: count dot balls (balls with 0 runs)

3. FALL OF WICKETS (if visible):
   - Look for dismissal methods to count catches, stumpings, run outs
   - If you see "c [name]" = that fielder gets a catch
   - If you see "st [name]" = that wicketkeeper gets a stumping
   - If you see "run out" = credit to fielder (if name is visible)

4. BOWLED/LBW BONUS (CRITICAL):
   - In batting scorecard, look at dismissal column
   - If dismissal method shows "b [bowler]" = bowled
   - If dismissal method shows "lbw b [bowler]" = leg before wicket
   - For that bowler, set "bowledOrLbw" = number of such dismissals
   - This is worth +8 bonus points per dismissal!

RETURN FORMAT - JSON ONLY:
[
  {
    "playerName": "Exact Name From Scorecard",
    "runs": 100,
    "balls": 52,
    "fours": 10,
    "sixes": 5,
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

STRICT RULES:
1. Return ONLY valid JSON - no markdown blocks, no explanations, no comments
2. Extract EXACT player names as shown (case-sensitive)
3. Use 0 for any stat NOT visible in THIS image
4. DO NOT combine data from different images
5. DO NOT infer or calculate missing values
6. Include ONLY players visible in THIS screenshot
7. For batting scorecard: focus on runs, balls, 4s, 6s, dismissal status
8. For bowling scorecard: focus on overs, runs, wickets, maidens, economy
9. Match player names to dismissal methods to credit bowled/lbw bonuses
10. Check fall of wickets carefully for fielding contributions`;

  try {
    console.log('Calling Gemini Vision API...');

    // Initialize Gemini AI
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    // Extract base64 data from data URL if present
    let base64Data = imageBase64;
    let mimeType = 'image/jpeg';

    if (imageBase64.startsWith('data:')) {
      const matches = imageBase64.match(/^data:([^;]+);base64,(.+)$/);
      if (matches) {
        mimeType = matches[1];
        base64Data = matches[2];
      }
    }

    // Generate content with image and prompt
    const result = await model.generateContent([
      { text: prompt },
      {
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      }
    ]);

    const response = await result.response;
    const content = response.text();
    console.log('Gemini response received, parsing JSON...');

    // Extract JSON from response (handle markdown code blocks)
    let jsonStr = content.trim();
    if (jsonStr.startsWith('```json')) {
      jsonStr = jsonStr.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
    } else if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/```\n?/g, '').replace(/```\n?$/g, '');
    }

    console.log('Extracted JSON string length:', jsonStr.length);
    const extractedData = JSON.parse(jsonStr);
    console.log('Parsed data, extracted players:', extractedData.length);

    // Convert to MatchPerformance format
    const performances: MatchPerformance[] = [];

    for (const playerData of extractedData) {
      // Find player in database
      const player = findPlayerByName(playerData.playerName);

      if (!player) {
        console.warn(`Player not found in database: ${playerData.playerName}`);
        continue;
      }

      console.log(`Matched player: ${playerData.playerName} -> ${player.name}`);

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

    console.log(`Converted ${performances.length} player performances from this image`);
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
