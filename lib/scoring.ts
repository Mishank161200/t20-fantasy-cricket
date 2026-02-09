import { MatchPerformance, ScoringRule } from './types';

// Dream11-style scoring rules
export const SCORING_RULES: ScoringRule[] = [
  // Batting
  { category: 'Run', points: 1, description: 'Every run scored' },
  { category: 'Boundary Bonus', points: 1, description: 'Every boundary hit (4)' },
  { category: 'Six Bonus', points: 2, description: 'Every six hit' },
  { category: '30 Run Bonus', points: 4, description: 'Scoring 30 runs' },
  { category: '50 Run Bonus', points: 8, description: 'Scoring half-century' },
  { category: '100 Run Bonus', points: 16, description: 'Scoring century' },
  { category: 'Duck', points: -2, description: 'Getting out on duck (batsman/all-rounder)' },

  // Bowling
  { category: 'Wicket', points: 25, description: 'Every wicket taken' },
  { category: 'Bonus (LBW/Bowled)', points: 8, description: 'Wicket by LBW or Bowled' },
  { category: '3 Wicket Bonus', points: 4, description: 'Taking 3 wickets' },
  { category: '4 Wicket Bonus', points: 8, description: 'Taking 4 wickets' },
  { category: '5 Wicket Bonus', points: 16, description: 'Taking 5 wickets' },
  { category: 'Maiden Over', points: 12, description: 'Bowling a maiden over' },

  // Fielding
  { category: 'Catch', points: 8, description: 'Catching the ball' },
  { category: '3 Catch Bonus', points: 4, description: 'Taking 3 catches' },
  { category: 'Stumping', points: 12, description: 'Stumping a batsman' },
  { category: 'Run Out', points: 6, description: 'Direct hit run out / thrower' },

  // Economy/Strike Rate (for 2+ overs bowled / 10+ balls faced)
  { category: 'Economy < 5', points: 6, description: 'Economy rate below 5 (min 2 overs)' },
  { category: 'Economy 5-6', points: 4, description: 'Economy rate between 5-6' },
  { category: 'Economy 10-11', points: -2, description: 'Economy rate between 10-11' },
  { category: 'Economy > 11', points: -4, description: 'Economy rate above 11' },
  { category: 'Strike Rate > 170', points: 6, description: 'Strike rate above 170 (min 10 balls)' },
  { category: 'Strike Rate 150-170', points: 4, description: 'Strike rate between 150-170' },
  { category: 'Strike Rate < 70', points: -2, description: 'Strike rate below 70' },
  { category: 'Strike Rate < 60', points: -4, description: 'Strike rate below 60' },
];

export function calculatePlayerPoints(performance: MatchPerformance): number {
  let points = 0;

  // Batting points
  points += performance.runs; // 1 point per run
  points += performance.fours * 1; // Boundary bonus
  points += performance.sixes * 2; // Six bonus

  // Run milestones
  if (performance.runs >= 100) {
    points += 16;
  } else if (performance.runs >= 50) {
    points += 8;
  } else if (performance.runs >= 30) {
    points += 4;
  }

  // Duck penalty (batsman dismissed for 0)
  if (performance.runs === 0 && performance.balls > 0) {
    points -= 2;
  }

  // Strike rate bonus (min 10 balls)
  if (performance.balls >= 10) {
    const strikeRate = (performance.runs / performance.balls) * 100;
    if (strikeRate > 170) {
      points += 6;
    } else if (strikeRate >= 150) {
      points += 4;
    } else if (strikeRate < 60) {
      points -= 4;
    } else if (strikeRate < 70) {
      points -= 2;
    }
  }

  // Bowling points
  points += performance.wickets * 25; // 25 points per wicket
  points += performance.maidens * 12; // Maiden over bonus

  // Wicket milestones
  if (performance.wickets >= 5) {
    points += 16;
  } else if (performance.wickets >= 4) {
    points += 8;
  } else if (performance.wickets === 3) {
    points += 4;
  }

  // Economy rate (assuming 4 overs minimum for T20)
  if (performance.economyRate > 0) {
    if (performance.economyRate < 5) {
      points += 6;
    } else if (performance.economyRate <= 6) {
      points += 4;
    } else if (performance.economyRate >= 10 && performance.economyRate < 11) {
      points -= 2;
    } else if (performance.economyRate >= 11) {
      points -= 4;
    }
  }

  // Fielding points
  points += performance.catches * 8;
  points += performance.runOuts * 6;
  points += performance.stumpings * 12;

  // Catch bonus (3+ catches)
  if (performance.catches >= 3) {
    points += 4;
  }

  return points;
}
