# Scoring System

This document outlines the complete scoring system implemented in the app.

## Squad Requirements

- **Minimum Players**: 15 players per squad
- **Maximum Players**: 20 players per squad
- **Playing Team**: Select exactly 12 players from your squad before each match

## Batting Points

| Action | Points | Notes |
|--------|--------|-------|
| Run | 1 | Every run scored |
| Boundary (4) | +4 | Bonus for hitting a four |
| Six (6) | +6 | Bonus for hitting a six |
| 25 Runs | +4 | Milestone bonus |
| 50 Runs | +8 | Half-century bonus |
| 75 Runs | +12 | 75-run milestone bonus |
| 100 Runs | +16 | Century bonus (ONLY this, no 25/50/75 bonuses) |
| Duck | -2 | Getting dismissed on 0 |

### Strike Rate Bonuses (Minimum 10 balls faced)
| Strike Rate | Points |
|-------------|--------|
| 170+ | +6 |
| 150-170 | +4 |
| 130-150 | +2 |
| 60-70 | -2 |
| 50-60 | -4 |
| Below 50 | -6 |

**Important**: Negative points for low batting strike rates only apply for strike rates of 70 or below.

## Bowling Points

| Action | Points | Notes |
|--------|--------|-------|
| Dot Ball | 1 | Every dot ball bowled (includes leg bye/bye) |
| Wicket | 30 | Every wicket taken (excluding runout) |
| LBW/Bowled Bonus | +8 | Additional bonus for these dismissals |
| Maiden Over | 12 | Bowling a maiden over |
| 3 Wickets | +4 | Milestone bonus |
| 4 Wickets | +8 | Milestone bonus |
| 5 Wickets | +12 | 5-wicket haul bonus |

### Economy Rate Bonuses (Minimum 2 overs bowled)
| Economy Rate | Points |
|--------------|--------|
| Below 5 | +6 |
| 5-6 | +4 |
| 6-7 | +2 |
| 10-11 | -2 |
| 11-12 | -4 |
| 12 and above | -6 |

## Fielding Points

| Action | Points | Notes |
|--------|--------|-------|
| Catch | 8 | Catching the ball |
| 3+ Catches | +4 | Bonus for taking 3 or more catches (awarded once only) |
| Stumping | 12 | Stumping a batsman |
| Run Out (Direct) | 12 | Direct hit run out |
| Run Out (Indirect) | 6 | Run out where multiple fielders touched the ball |

**Important**: Players taking more than 3 catches will still only get 4 points as the 3 Catch Bonus (not multiplied).

## Starting Lineup

| Action | Points |
|--------|--------|
| Announced Lineup | 4 | Being in the starting eleven |

## Important Rules

### Batting
- **Century Rule**: Any player scoring a century will only get 16 points for the century bonus. No points will be awarded for their 25, 50, or 75 run bonuses.
- **Overthrows**: If any runs are scored on an overthrow, points for those runs will be credited to the batter on strike. However, if the overthrow goes for a boundary, the batter will not receive extra Boundary Bonus points.
- **Strike Rate Penalties**: Only applicable for individual strike rates of 70 runs per 100 balls or below.

### Bowling
- **Dot Balls**: Bowlers will get dot ball points for leg bye and bye deliveries.

### Fielding
- **Catch Bonus**: Players taking more than 3 catches will also get 4 points as 3 Catch Bonus. For example, if a player takes 6 catches, they get 48 points (6×8) + 4 bonus = 52 points total.
- **Direct Hit**: A direct hit is inflicted by the fielder who is the only one to touch the ball after the batter faces the delivery. In all other cases, points will be awarded only to the last 2 fielders who touch the ball.

### Substitutes
- **Concussion/Impact/X-Factor Substitutes**: The announced substitutes will get 0 points initially. Only those that actually play will be awarded 4 Points (starting lineup) in addition to points for all contributions they make.
- **Other Substitutes**: Substitutes apart from Concussion, X-Factor, Impact Player substitutes or Full-time playing replacements will not be awarded points for any contribution they make.
- **Returning Players**: If a player gets replaced but later comes back on the field, they will get points for their contributions. However, if a player who was not part of announced lineups comes as a substitute, they will not get points (except Concussion/X-Factor/Impact/Full-time replacement players).

### Starting Eleven
- If a player is announced in the starting eleven but later is unable to start the match, they will not score any points. The replacement player will earn points for the match (including starting points).

### Other Rules
- **Super Over/Super Five**: No points will be awarded for any actions during a Super Over or a Super Five.
- **Team Transfers**: A player who has been transferred from one team to another might still be available for selection for their older team until the next update. However, no points will be attributed to the player in such situations.
- **Match Completion**: Once a match has been marked as completed and winners declared, no further adjustments will be made. Points awarded live in-game are subject to change as long as the match status is 'In progress' or 'Waiting for review'.

## Automatic Point Calculation

Points will be calculated automatically when:
- Match is completed
- Player performance data is available
- Using the `calculatePlayerPoints()` function from `/lib/scoring.ts`

The system sums up all applicable bonuses and penalties to give the final score for each player in every match.
