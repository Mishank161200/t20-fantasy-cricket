import { NextResponse } from 'next/server';
import { db } from '@/lib/firebase';
import { collection, getDocs, doc, updateDoc, getDoc } from 'firebase/firestore';
import { calculatePlayerPoints } from '@/lib/scoring';
import { MatchPerformance, Tournament } from '@/lib/types';
import { WORLD_CUP_PLAYERS } from '@/lib/players';

// Force Node.js runtime for Vercel compatibility
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// This API route fetches detailed match scorecards and calculates player points
export async function POST(request: Request) {
  try {
    const { matchId } = await request.json();

    if (!matchId) {
      return NextResponse.json({ error: 'Match ID required' }, { status: 400 });
    }

    const apiKey = process.env.RAPIDAPI_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Fetch detailed match scorecard from RapidAPI
    const response = await fetch(`https://cricket-live-scores1.p.rapidapi.com/match/${matchId}`, {
      method: 'GET',
      headers: {
        'x-rapidapi-key': apiKey,
        'x-rapidapi-host': 'cricket-live-scores1.p.rapidapi.com'
      }
    });

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`);
    }

    const matchData = await response.json();

    // Verify this is a 2026 T20 World Cup match
    const series = matchData.series?.toLowerCase() || '';
    const matchDate = new Date(matchData.date || matchData.dateTimeGMT);
    const year = matchDate.getFullYear();

    if (!(series.includes('t20 world cup') || series.includes('t20wc') ||
      series.includes('icc men\'s t20 world cup') || series.includes('icc t20 world cup')) ||
      year !== 2026) {
      return NextResponse.json({ error: 'Not a 2026 T20 World Cup match' }, { status: 400 });
    }

    // Parse player performances from scorecard
    const performances = parsePlayerPerformances(matchData);

    if (performances.length === 0) {
      return NextResponse.json({
        message: 'No player performance data available yet',
        matchId
      });
    }

    // Update all tournaments with these player performances
    await updateTournamentPerformances(matchId, performances);

    return NextResponse.json({
      success: true,
      matchId,
      playersProcessed: performances.length,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing scorecard:', error);
    return NextResponse.json(
      { error: 'Failed to process scorecard', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// Parse player performances from match data
function parsePlayerPerformances(matchData: any): MatchPerformance[] {
  const performances: MatchPerformance[] = [];

  try {
    const scorecard = matchData.scorecard || matchData.score;
    if (!scorecard) return performances;

    // Get starting lineups
    const startingLineup = new Set([
      ...(matchData.players?.team1 || []),
      ...(matchData.players?.team2 || [])
    ]);

    // Process batting performances
    const innings = Array.isArray(scorecard) ? scorecard : [scorecard.innings1, scorecard.innings2].filter(Boolean);

    for (const inning of innings) {
      if (!inning?.batsmen) continue;

      for (const batsman of inning.batsmen) {
        const playerName = batsman.name || batsman.batsman;
        const player = findPlayerByName(playerName);

        if (!player) continue;

        const runs = parseInt(batsman.runs || batsman.r || 0);
        const balls = parseInt(batsman.balls || batsman.b || 0);
        const fours = parseInt(batsman.fours || batsman['4s'] || 0);
        const sixes = parseInt(batsman.sixes || batsman['6s'] || 0);
        const isDismissed = batsman.dismissal !== 'not out' && batsman.dismissal !== 'not-out';
        const isDismissedForDuck = isDismissed && runs === 0;

        // Find existing performance or create new one
        let perf = performances.find(p => p.playerId === player.id);
        if (!perf) {
          perf = createEmptyPerformance(player.id, matchData.id || matchData.match_id);
          perf.inStartingLineup = startingLineup.has(playerName);
          performances.push(perf);
        }

        perf.runs += runs;
        perf.balls += balls;
        perf.fours += fours;
        perf.sixes += sixes;
        if (isDismissedForDuck) perf.isDismissedForDuck = true;
      }
    }

    // Process bowling performances
    for (const inning of innings) {
      if (!inning?.bowlers) continue;

      for (const bowler of inning.bowlers) {
        const playerName = bowler.name || bowler.bowler;
        const player = findPlayerByName(playerName);

        if (!player) continue;

        const overs = parseFloat(bowler.overs || bowler.o || 0);
        const runs = parseInt(bowler.runs || bowler.r || 0);
        const wickets = parseInt(bowler.wickets || bowler.w || 0);
        const maidens = parseInt(bowler.maidens || bowler.m || 0);
        const dots = parseInt(bowler.dots || bowler.nb || 0);
        const economyRate = overs > 0 ? runs / overs : 0;

        // Count LBW/Bowled wickets from dismissal info
        let bowledOrLbw = 0;
        if (bowler.dismissals) {
          bowledOrLbw = bowler.dismissals.filter((d: string) =>
            d.toLowerCase().includes('bowled') || d.toLowerCase().includes('lbw')
          ).length;
        }

        let perf = performances.find(p => p.playerId === player.id);
        if (!perf) {
          perf = createEmptyPerformance(player.id, matchData.id || matchData.match_id);
          perf.inStartingLineup = startingLineup.has(playerName);
          performances.push(perf);
        }

        perf.wickets += wickets;
        perf.dotBalls += dots;
        perf.bowledOrLbwWickets += bowledOrLbw;
        perf.oversBowled += overs;
        perf.maidens += maidens;
        perf.economyRate = economyRate;
      }
    }

    // Process fielding performances (catches, runouts, stumpings)
    if (matchData.fielding) {
      for (const fielder of matchData.fielding) {
        const playerName = fielder.name || fielder.fielder;
        const player = findPlayerByName(playerName);

        if (!player) continue;

        let perf = performances.find(p => p.playerId === player.id);
        if (!perf) {
          perf = createEmptyPerformance(player.id, matchData.id || matchData.match_id);
          perf.inStartingLineup = startingLineup.has(playerName);
          performances.push(perf);
        }

        perf.catches += parseInt(fielder.catches || 0);
        perf.stumpings += parseInt(fielder.stumpings || 0);
        perf.directRunOuts += parseInt(fielder.directRunouts || 0);
        perf.indirectRunOuts += parseInt(fielder.runouts || 0) - parseInt(fielder.directRunouts || 0);
      }
    }

    // Calculate points for all performances
    performances.forEach(perf => {
      perf.points = calculatePlayerPoints(perf);
    });

  } catch (error) {
    console.error('Error parsing player performances:', error);
  }

  return performances;
}

// Find player by name (case-insensitive)
function findPlayerByName(name: string): { id: string; name: string } | null {
  if (!name) return null;

  const normalizedName = name.toLowerCase().trim();
  const player = WORLD_CUP_PLAYERS.find(p => p.name.toLowerCase() === normalizedName);

  return player ? { id: player.id, name: player.name } : null;
}

// Create empty performance object
function createEmptyPerformance(playerId: string, matchId: string): MatchPerformance {
  return {
    playerId,
    matchId,
    inStartingLineup: false,
    runs: 0,
    balls: 0,
    fours: 0,
    sixes: 0,
    isDismissedForDuck: false,
    wickets: 0,
    dotBalls: 0,
    bowledOrLbwWickets: 0,
    oversBowled: 0,
    catches: 0,
    directRunOuts: 0,
    indirectRunOuts: 0,
    stumpings: 0,
    maidens: 0,
    economyRate: 0,
    points: 0
  };
}

// Update all tournaments with match performances
async function updateTournamentPerformances(matchId: string, performances: MatchPerformance[]) {
  const tournamentsRef = collection(db, 'tournaments');
  const tournamentsSnapshot = await getDocs(tournamentsRef);

  for (const tournamentDoc of tournamentsSnapshot.docs) {
    const tournament = tournamentDoc.data() as Tournament;

    // Filter performances for players in this tournament
    const relevantPlayerIds = new Set(
      tournament.owners.flatMap(owner => owner.players.map(p => p.playerId))
    );

    const tournamentPerformances = performances.filter(p =>
      relevantPlayerIds.has(p.playerId)
    );

    if (tournamentPerformances.length === 0) continue;

    // Update match performances
    const matchPerformances = tournament.matchPerformances || {};
    matchPerformances[matchId] = tournamentPerformances;

    // Update owner points
    const updatedOwners = tournament.owners.map(owner => {
      const ownerPlayerIds = new Set(owner.players.map(p => p.playerId));
      const ownerPerformances = tournamentPerformances.filter(p =>
        ownerPlayerIds.has(p.playerId)
      );

      const matchPoints = ownerPerformances.reduce((sum, p) => sum + p.points, 0);

      return {
        ...owner,
        points: owner.points + matchPoints
      };
    });

    // Update tournament document
    await updateDoc(doc(db, 'tournaments', tournamentDoc.id), {
      matchPerformances,
      owners: updatedOwners
    });
  }
}
