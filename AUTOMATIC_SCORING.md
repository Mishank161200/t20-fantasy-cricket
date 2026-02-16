# Automatic Scoring System

This document explains the automated scoring system that fetches match data from RapidAPI and calculates player points based on the official scoring rules.

## Overview

The system automatically:
1. **Fetches live and completed matches** for the 2026 T20 World Cup
2. **Retrieves detailed scorecards** for completed matches (including historical matches)
3. **Calculates player points** using the official scoring rules
4. **Updates tournament standings** in Firestore
5. **Runs automatically** via Vercel Cron Jobs once daily (midnight UTC)

## Match Coverage

The app now includes:
- **Matches 1-29**: Completed matches from Feb 1-15, 2026 (historical)
- **Match 30 onwards**: Current and future matches
- **All matches display** in the schedule with results
- **Automatic scoring** for all completed matches when API data becomes available

## Architecture

### API Endpoints

#### 1. `/api/cricket/live` (GET)
- **Purpose**: Fetch current live and recent 2026 T20 World Cup matches
- **Access**: Public
- **Returns**: List of matches with basic info (teams, scores, status)
- **Filters**: Only 2026 T20 World Cup matches

#### 2. `/api/cricket/scorecard` (POST)
- **Purpose**: Fetch detailed scorecard and calculate player points
- **Access**: Internal/Protected
- **Input**: `{ matchId: string }`
- **Process**:
  1. Fetches detailed match data from RapidAPI
  2. Parses batting, bowling, and fielding performances
  3. Calculates points using `calculatePlayerPoints()` function
  4. Updates all tournament documents in Firestore
- **Returns**: Success status and number of players processed

#### 3. `/api/cricket/update-schedule` (POST)
- **Purpose**: Automated cron job to update schedules and process completed matches
- **Access**: Protected (requires Bearer token)
- **Trigger**: Vercel Cron (every 15 minutes)
- **Process**:
  1. Fetches live and recent matches
  2. Updates match-schedule document in Firestore
  3. Identifies newly completed matches
  4. Calls `/api/cricket/scorecard` for each new completed match
  5. Tracks processed matches to avoid duplicates

## Scoring Rules Implementation

The system implements all official scoring rules from [SCORING_SYSTEM.md](./SCORING_SYSTEM.md):

### Batting Points
- ✅ 1 point per run
- ✅ +4 bonus for boundaries (4s)
- ✅ +6 bonus for sixes
- ✅ Milestone bonuses (25/50/75/100 runs)
- ✅ Century special rule (only 100 bonus, no 25/50/75)
- ✅ -2 penalty for duck
- ✅ Strike rate bonuses/penalties (minimum 10 balls)

### Bowling Points
- ✅ 1 point per dot ball
- ✅ 30 points per wicket (excluding run outs)
- ✅ +8 bonus for LBW/Bowled dismissals
- ✅ Maiden over bonus (12 points)
- ✅ Wicket milestones (3/4/5 wickets)
- ✅ Economy rate bonuses/penalties (minimum 2 overs)

### Fielding Points
- ✅ 8 points per catch
- ✅ +4 bonus for 3+ catches
- ✅ 12 points for stumping
- ✅ 12 points for direct run out
- ✅ 6 points for indirect run out

### Other Rules
- ✅ +4 points for being in starting lineup
- ✅ All special cases (century rule, catch bonus, etc.)
- ❌ Super Over/Super Five excluded (no points)
- ❌ Substitute players handled per rules

## Data Flow

### Match Processing Flow

```
Vercel Cron (every 15 min)
        ↓
/api/cricket/update-schedule
        ↓
Fetch live + recent matches from RapidAPI
        ↓
Filter for 2026 T20 World Cup
        ↓
Store in Firestore (config/match-schedule)
        ↓
Identify newly completed matches
        ↓
For each completed match:
    ↓
/api/cricket/scorecard
    ↓
Fetch detailed scorecard
    ↓
Parse player performances
    ↓
Calculate points using scoring rules
    ↓
Update all tournaments in Firestore
    ↓
Update owner points
    ↓
Mark match as processed
```

### Player Performance Parsing

The system extracts the following data from API scorecards:

**Batting Data:**
- Runs scored
- Balls faced
- Boundaries (4s)
- Sixes (6s)
- Dismissal status (duck detection)

**Bowling Data:**
- Overs bowled
- Runs conceded
- Wickets taken
- Dot balls bowled
- Maidens
- Economy rate
- LBW/Bowled dismissals

**Fielding Data:**
- Catches
- Run outs (direct/indirect)
- Stumpings

### Player Matching

The system matches API player names to the app's player database:
- Case-insensitive matching
- Handles name variations when possible
- Only processes players from the official 300-player roster
- Logs unmatched players for manual review

## Environment Variables

Required environment variables:

```bash
# RapidAPI Key for Cricket Live Scores API
RAPIDAPI_KEY=your_rapidapi_key_here

# Optional: Secret for cron job authorization
CRON_SECRET=your_secret_token_here

# Vercel URL (automatically set by Vercel)
VERCEL_URL=your-app.vercel.app
```

## Setup Instructions

### 1. RapidAPI Key Configuration

Already configured:
- Key: `5474ac2abemshb2a6dc53e73fe26p1e4279jsn14b849e8221e`
- Added to `.env.local`
- **Must also add to Vercel Environment Variables:**
  1. Go to Vercel Dashboard → Project Settings → Environment Variables
  2. Add `RAPIDAPI_KEY` with the value above
  3. Select all environments (Production, Preview, Development)
  4. Redeploy the application

### 2. Cron Job Configuration

Already configured in `vercel.json`:
```json
{
  "crons": [{
    "path": "/api/cricket/update-schedule",
    "schedule": "*/15 * * * *"
  }]
}
```

This runs every 15 minutes = ~96 API calls per day.

### 3. Optional: Add CRON_SECRET

For enhanced security:
```bash
# Generate a random token
openssl rand -hex 32

# Add to Vercel Environment Variables
CRON_SECRET=<generated_token>
```

Then update the cron authorization header to use this secret.

## Testing

### Manual Testing

#### Test Live Matches Endpoint
```bash
curl https://your-app.vercel.app/api/cricket/live
```

#### Test Scorecard Processing
```bash
curl -X POST https://your-app.vercel.app/api/cricket/scorecard \
  -H "Content-Type: application/json" \
  -d '{"matchId": "your_match_id"}'
```

#### Test Cron Job (Local)
```bash
curl -X POST http://localhost:3000/api/cricket/update-schedule \
  -H "Authorization: Bearer dev-secret"
```

### Monitoring

**Vercel Dashboard:**
- Monitor cron job execution in Logs tab
- Check for errors and success rates
- View API response times

**RapidAPI Dashboard:**
- Monitor API usage and quota
- Track remaining free tier calls
- Check for rate limit warnings

**Firestore Console:**
- Verify `config/match-schedule` document updates
- Check tournament documents for `matchPerformances` field
- Verify owner points are updating correctly

## Error Handling

The system handles various error scenarios:

### API Errors
- **Rate Limit Exceeded**: Returns 429, logs error
- **Invalid Match ID**: Returns 400 with error message
- **Network Timeout**: Retries on next cron cycle

### Data Parsing Errors
- **Missing Scorecard**: Logs warning, skips match
- **Unknown Player**: Logs player name, continues processing
- **Invalid Format**: Logs error, returns partial results

### Firestore Errors
- **Permission Denied**: Check Firebase rules
- **Document Not Found**: Creates new document
- **Write Failed**: Retries on next cycle

## Debugging

### Check Cron Job Logs
```bash
# In Vercel Dashboard
Deployments → [Your Deployment] → Logs → Filter by "cron"
```

### Check Match Processing Status
Query Firestore:
```javascript
const scheduleRef = doc(db, 'config', 'match-schedule');
const scheduleDoc = await getDoc(scheduleRef);
console.log(scheduleDoc.data());
// Shows: lastUpdated, liveMatches, processedMatches
```

### Manual Scorecard Processing
If a match wasn't processed automatically, you can trigger it manually:
```bash
curl -X POST https://your-app.vercel.app/api/cricket/scorecard \
  -H "Content-Type: application/json" \
  -d '{"matchId": "match_12345"}'
```

## Troubleshooting

### Common Issues

#### 1. No Live Matches Showing
- Check if matches are actually live at the current date/time
- Verify API key is valid and has quota remaining
- Check Vercel logs for API errors

#### 2. Points Not Updating
- Verify match has been marked as "completed" by the API
- Check if match ID is in the `processedMatches` array
- Review Firestore rules for write permissions
- Check console logs for parsing errors

#### 3. Player Not Found Errors
- Player name might not match our database exactly
- Check spelling variations (e.g., "M Sharma" vs "Mohit Sharma")
- Add player name mapping if needed

#### 4. Cron Job Not Running
- Verify `vercel.json` is in repository root
- Check Vercel project settings for cron jobs
- Ensure authorization header is correct
- Review Vercel cron job logs

## Limitations

### RapidAPI Free Tier
- **100-500 calls per day** (varies by plan)
- With 15-minute intervals = 96 calls/day ✅
- Monitor usage to stay within limits

### Match Data Availability
- API may not have detailed scorecards immediately
- Some matches may have delayed data
- Player names must match exactly (case-insensitive)

### Performance
- Processing 22 players per match = ~2-3 seconds
- Multiple tournaments = longer processing time
- Firestore write limits apply (500 writes/sec)

## Future Enhancements

### Potential Improvements
1. **Caching**: Cache API responses to reduce calls
2. **Webhooks**: Use webhooks for instant updates (if available)
3. **Player Stats**: Store historical player stats
4. **Match History**: Archive all match data
5. **Notifications**: Push notifications when matches complete
6. **Manual Override**: Admin panel to manually adjust points
7. **Backup System**: Fallback to manual scorecard upload if API fails
8. **Analytics**: Dashboard showing system health and stats

## Support

### Getting Help
- Check Vercel deployment logs
- Review RapidAPI dashboard for quota/errors
- Check Firestore console for data integrity
- Review this documentation for troubleshooting steps

### Reporting Issues
When reporting issues, include:
- Match ID that failed
- Error message from logs
- Timestamp of the error
- Expected vs actual behavior

## Summary

The automatic scoring system is now fully implemented and will:
- ✅ Fetch 2026 T20 World Cup matches only
- ✅ Process completed matches automatically
- ✅ Calculate player points using official scoring rules
- ✅ Update tournament standings in real-time
- ✅ Run every 15 minutes via Vercel Cron
- ✅ Handle errors gracefully and log issues
- ✅ Track processed matches to avoid duplicates

**Next Step**: Add `RAPIDAPI_KEY` to Vercel Environment Variables and deploy!
