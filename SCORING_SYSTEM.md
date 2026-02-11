# Dream11 Scoring System

This document outlines the scoring system implemented in the app, based on official Dream11 rules.

## Batting Points

| Action | Points | Notes |
|--------|--------|-------|
| Run | 1 | Every run scored |
| Boundary (4) | +1 | Bonus on top of run points |
| Six (6) | +2 | Bonus on top of run points |
| 30 Runs | +4 | Milestone bonus |
| 50 Runs | +8 | Half-century bonus |
| 100 Runs | +16 | Century bonus |
| Duck | -2 | Getting out on 0 (batsman/all-rounder) |

### Strike Rate Bonuses (Minimum 10 balls faced)
| Strike Rate | Points |
|-------------|--------|
| Above 170 | +6 |
| 150-170 | +4 |
| Below 60 | -4 |
| 60-70 | -2 |

## Bowling Points

| Action | Points | Notes |
|--------|--------|-------|
| Wicket | 25 | Every wicket taken |
| LBW/Bowled Bonus | +8 | Additional bonus for these dismissals |
| Maiden Over | 12 | Bowling a maiden over |
| 3 Wickets | +4 | Milestone bonus |
| 4 Wickets | +8 | Milestone bonus |
| 5 Wickets | +16 | 5-wicket haul bonus |

### Economy Rate Bonuses (Minimum 2 overs bowled)
| Economy Rate | Points |
|--------------|--------|
| Below 5 | +6 |
| 5-6 | +4 |
| 10-11 | -2 |
| Above 11 | -4 |

## Fielding Points

| Action | Points | Notes |
|--------|--------|-------|
| Catch | 8 | Catching the ball |
| 3 Catches | +4 | Bonus for taking 3+ catches |
| Stumping | 12 | Stumping a batsman |
| Run Out | 6 | Direct hit or thrower |

## Important Notes

1. **No Captain/Vice-Captain Multipliers**: The scoring function calculates base points only. All players earn points equally based on their performance.

2. **Minimum Requirements**: 
   - Strike rate bonuses apply only after 10+ balls faced
   - Economy rate bonuses apply only after 2+ overs bowled

3. **Milestone Bonuses**: These are additive. A player scoring 50 runs gets:
   - 50 points for runs
   - 8 points for 50-run milestone
   - 4 points for 30-run milestone (if 50+ was crossed)
   - Boundary bonuses for any 4s/6s hit

4. **Wicket Bonuses**: Similar to batting, wicket milestones are additive:
   - 5 wickets = 5×25 + 16 + 8 + 4 = 153 base points (before economy bonuses)

## Automatic Point Calculation

Points will be calculated automatically when:
- Match is completed
- Player performance data is available
- Using the `calculatePlayerPoints()` function from `/lib/scoring.ts`

The system sums up all applicable bonuses and penalties to give the final score for each player in every match.
