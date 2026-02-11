import { MatchPerformance, ScoringRule } from './types';

// Updated scoring rules
export const SCORING_RULES: ScoringRule[] = [
  // Batting
  { category: 'Run', points: 1, description: 'Every run scored' },
  { category: 'Boundary Bonus', points: 4, description: 'Every boundary hit (4)' },
  { category: 'Six Bonus', points: 6, description: 'Every six hit' },
  { category: '25 Run Bonus', points: 4, description: 'Scoring 25 runs' },
  { category: '50 Run Bonus', points: 8, description: 'Scoring 50 runs' },
  { category: '75 Run Bonus', points: 12, description: 'Scoring 75 runs' },
  { category: '100 Run Bonus', points: 16, description: 'Scoring 100 runs' },
  { category: 'Duck', points: -2, description: 'Getting out on duck' },

  // Bowling
  { category: 'Dot Ball', points: 1, description: 'Every dot ball bowled' },
  { category: 'Wicket', points: 30, description: 'Every wicket taken (excluding runout)' },
  { category: 'Bonus (LBW/Bowled)', points: 8, description: 'Wicket by LBW or Bowled' },
  { category: '3 Wicket Bonus', points: 4, description: 'Taking 3 wickets' },
  { category: '4 Wicket Bonus', points: 8, description: 'Taking 4 wickets' },
  { category: '5 Wicket Bonus', points: 12, description: 'Taking 5 wickets' },
  { category: 'Maiden Over', points: 12, description: 'Bowling a maiden over' },

  // Fielding
  { category: 'Catch', points: 8, description: 'Catching the ball' },
  { category: '3 Catch Bonus', points: 4, description: 'Taking 3 or more catches' },
  { category: 'Stumping', points: 12, description: 'Stumping a batsman' },
  { category: 'Run Out (Direct)', points: 12, description: 'Direct hit run out' },
  { category: 'Run Out (Indirect)', points: 6, description: 'Run out (not direct hit)' },

  // Economy/Strike Rate
  { category: 'Economy < 5', points: 6, description: 'Economy rate below 5 (min 2 overs)' },
  { category: 'Economy 5-6', points: 4, description: 'Economy rate between 5-6' },
  { category: 'Economy 6-7', points: 2, description: 'Economy rate between 6-7' },
  { category: 'Economy 10-11', points: -2, description: 'Economy rate between 10-11' },
  { category: 'Economy 11-12', points: -4, description: 'Economy rate between 11-12' },
  { category: 'Economy >= 12', points: -6, description: 'Economy rate 12 and above' },
  { category: 'Strike Rate >= 170', points: 6, description: 'Strike rate 170+ (min 10 balls)' },
  { category: 'Strike Rate 150-170', points: 4, description: 'Strike rate between 150-170' },
  { category: 'Strike Rate 130-150', points: 2, description: 'Strike rate between 130-150' },
  { category: 'Strike Rate 60-70', points: -2, description: 'Strike rate between 60-70' },
  { category: 'Strike Rate 50-60', points: -4, description: 'Strike rate between 50-60' },
  { category: 'Strike Rate < 50', points: -6, description: 'Strike rate below 50' },

  // Lineup
  { category: 'Announced Lineup', points: 4, description: 'Being in the starting lineup' },
];

export function calculatePlayerPoints(performance: MatchPerformance): number {
  let points = 0;

  // Announced lineup bonus
  if (performance.inStartingLineup) {
    points += 4;
  }

  // Batting points
  points += performance.runs; // 1 point per run
  points += performance.fours * 4; // Boundary bonus
  points += performance.sixes * 6; // Six bonus

  // Run milestones (century gets only 100 bonus, no 25/50/75)
  if (performance.runs >= 100) {
    points += 16; // Only century bonus
  } else if (performance.runs >= 75) {
    points += 12 + 8 + 4; // 75 + 50 + 25 bonuses
  } else if (performance.runs >= 50) {
    points += 8 + 4; // 50 + 25 bonuses
  } else if (performance.runs >= 25) {
    points += 4; // 25 bonus only
  }

  // Duck penalty (dismissed for 0)
  if (performance.isDismissedForDuck) {
    points -= 2;
  }

  // Strike rate bonus (min 10 balls)
  if (performance.balls >= 10) {
    const strikeRate = (performance.runs / performance.balls) * 100;
    if (strikeRate >= 170) {
      points += 6;
    } else if (strikeRate >= 150) {
      points += 4;
    } else if (strikeRate >= 130) {
      points += 2;
    } else if (strikeRate >= 60 && strikeRate < 70) {
      points -= 2;
    } else if (strikeRate >= 50 && strikeRate < 60) {
      points -= 4;
    } else if (strikeRate < 50) {
      points -= 6;
    }
  }

  // Bowling points
  points += performance.dotBalls * 1; // Dot ball points
  points += performance.wickets * 30; // 30 points per wicket (excluding runout)
  points += performance.bowledOrLbwWickets * 8; // LBW/Bowled bonus
  points += performance.maidens * 12; // Maiden over bonus

  // Wicket milestones
  if (performance.wickets >= 5) {
    points += 12;
  } else if (performance.wickets >= 4) {
    points += 8;
  } else if (performance.wickets === 3) {
    points += 4;
  }

  // Economy rate (min 2 overs)
  if (performance.oversBowled >= 2 && performance.economyRate > 0) {
    if (performance.economyRate < 5) {
      points += 6;
    } else if (performance.economyRate <= 6) {
      points += 4;
    } else if (performance.economyRate <= 7) {
      points += 2;
    } else if (performance.economyRate >= 10 && performance.economyRate < 11) {
      points -= 2;
    } else if (performance.economyRate >= 11 && performance.economyRate < 12) {
      points -= 4;
    } else if (performance.economyRate >= 12) {
      points -= 6;
    }
  }

  // Fielding points
  points += performance.catches * 8;
  points += performance.directRunOuts * 12; // Direct hit
  points += performance.indirectRunOuts * 6; // Not direct hit
  points += performance.stumpings * 12;

  // Catch bonus (3+ catches - only awarded once)
  if (performance.catches >= 3) {
    points += 4;
  }

  return points;
}
