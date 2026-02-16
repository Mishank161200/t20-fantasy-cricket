# Automatic Score Updates Setup

This document explains how the automatic cricket score fetching and schedule updates work.

## Environment Variables

### Required Variables

Add these to your Vercel project settings:

1. **RAPIDAPI_KEY**: Your RapidAPI key
   - Value: `5474ac2abemshb2a6dc53e73fe26p1e4279jsn14b849e8221e`
   - Used for: Fetching live cricket scores

2. **CRON_SECRET** (optional): Secret token for cron job authorization
   - Value: Generate a random string (e.g., `your-secret-token-here`)
   - Used for: Securing the cron job endpoint

### How to Add in Vercel:

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add each variable:
   - Name: `RAPIDAPI_KEY`
   - Value: `5474ac2abemshb2a6dc53e73fe26p1e4279jsn14b849e8221e`
   - Environment: Select all (Production, Preview, Development)
   - Click **Save**
4. Repeat for `CRON_SECRET` if needed

## How It Works

### 1. **Automatic Updates (Vercel Cron)**
- Runs every 15 minutes automatically
- Endpoint: `/api/cricket/update-schedule`
- Fetches live match data from RapidAPI
- Updates Firestore with latest scores
- Configured in `vercel.json`

### 2. **Frontend Auto-Refresh**
- Schedule page refreshes every 30 seconds when there are live matches
- Fetches from: `/api/cricket/live`
- Shows "Refresh Scores" button for manual updates
- Displays "Last updated" timestamp

### 3. **RapidAPI Cricket Provider**
- Provider: Cricket Live Scores API
- Endpoint: `https://cricket-live-scores1.p.rapidapi.com/matches/live`
- Filters: T20 World Cup matches only
- Rate Limit: Check your RapidAPI dashboard

## API Routes

### `/api/cricket/live` (GET)
- Public endpoint
- Returns current live T20 World Cup matches
- Called by frontend for display

### `/api/cricket/update-schedule` (POST)
- Protected by authorization header
- Updates Firestore with latest match data
- Called automatically by Vercel Cron every 15 minutes

## Testing

### Test Live Scores API:
```bash
curl https://your-app.vercel.app/api/cricket/live
```

### Test Cron Update (requires auth):
```bash
curl -X POST \
  -H "Authorization: Bearer your-cron-secret" \
  https://your-app.vercel.app/api/cricket/update-schedule
```

## Troubleshooting

### If scores don't update:

1. **Check Vercel Logs**:
   - Go to Vercel Dashboard → Your Project → Logs
   - Look for cron job executions

2. **Verify Environment Variables**:
   - Settings → Environment Variables
   - Ensure RAPIDAPI_KEY is set correctly

3. **Check RapidAPI Dashboard**:
   - Login to RapidAPI
   - Check API usage and rate limits
   - Ensure subscription is active

4. **Test API Manually**:
   - Visit `/api/cricket/live` in browser
   - Should return JSON with match data

## Cost Considerations

- **Vercel Cron**: Free tier includes cron jobs
- **RapidAPI**: Check your subscription limits
  - Free tier: Usually 100-500 requests/day
  - Each cron run = 1 API call
  - 15-minute intervals = 96 calls/day

## Future Improvements

- Add caching to reduce API calls
- Implement webhooks for instant updates
- Add detailed player statistics from API
- Store historical match data
