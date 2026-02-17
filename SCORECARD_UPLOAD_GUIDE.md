# AI Scorecard Screenshot Analysis Guide

## Overview

The app now supports **AI-powered scorecard analysis** using OpenAI's GPT-4 Vision API. Tournament hosts can simply upload screenshots from the ICC T20 World Cup 2026 website, and the system will automatically extract all player statistics and calculate points.

## Setup

### 1. Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Sign up or log in
3. Create a new API key
4. Copy the key (starts with `sk-proj-...`)

### 2. Add to Environment Variables

**Local Development (.env.local):**
```bash
OPENAI_API_KEY=sk-proj-your-key-here
```

**Vercel Production:**
1. Go to https://vercel.com/dashboard
2. Select your project → Settings → Environment Variables
3. Add:
   - Name: `OPENAI_API_KEY`
   - Value: `sk-proj-your-key-here`
   - Environments: Production, Preview, Development
4. Redeploy the application

## How to Upload Scorecards

### Step 1: Go to ICC Website

1. Visit https://www.icc-cricket.com/tournaments/mens-t20-world-cup-2026/matches
2. Click on a completed match
3. Navigate to the "Scorecard" tab

### Step 2: Take Screenshots

Take clear screenshots of the following sections:

**Innings 1:**
1. **Batting Scorecard** - Shows all batsmen with runs, balls, 4s, 6s
2. **Bowling Scorecard** - Shows all bowlers with overs, runs, wickets, economy
3. **Fall of Wickets** (optional) - Shows dismissal sequence

**Innings 2:**
4. **Batting Scorecard**
5. **Bowling Scorecard**
6. **Fall of Wickets** (optional)

**Tips for good screenshots:**
- Use full-screen browser for clarity
- Ensure all player names are visible
- Include the entire scorecard table
- Avoid cropping important data
- PNG or JPG format, max 10MB per image

### Step 3: Upload in App

1. As tournament host, go to **Schedule** page
2. Find the completed match
3. Click **"Upload Scorecard"** button
4. Click the upload area or drag & drop screenshots
5. Upload all 4-6 screenshots (batting/bowling for both innings)
6. Review the previews
7. Click **"Analyze Screenshots"**

### Step 4: AI Processing

The system will:
1. Send images to OpenAI GPT-4 Vision
2. Extract player names and stats from each screenshot
3. Match players to the 300-player database
4. Merge stats from multiple screenshots
5. Calculate points using official scoring rules
6. Update all tournament standings

**Processing time:** 10-30 seconds depending on number of images

## What Gets Extracted

### Batting Stats
- Player name
- Runs scored
- Balls faced
- Boundaries (4s)
- Sixes (6s)
- Dismissal status (for duck penalty)

### Bowling Stats
- Player name
- Overs bowled
- Runs conceded
- Wickets taken
- Maidens bowled
- Economy rate
- Bowled/LBW dismissals (bonus points)

### Fielding Stats
- Catches
- Run outs (direct/indirect)
- Stumpings

## Point Calculation

After extraction, points are automatically calculated using rules from [SCORING_SYSTEM.md](./SCORING_SYSTEM.md):

- **Batting:** Runs (1 pt each), boundaries (+4), sixes (+6), milestones (25/50/75/100), strike rate bonuses/penalties
- **Bowling:** Wickets (30 pts each), dot balls (1 pt), maidens (12 pts), LBW/Bowled bonus (+8), economy bonuses/penalties
- **Fielding:** Catches (8 pts), 3+ catch bonus (+4), run outs (6-12 pts), stumpings (12 pts)

## Error Handling

### If player is not recognized:
- System logs a warning: `Player not found: [name]`
- That player's stats are skipped
- Other players are still processed
- Check if player name matches exactly in WORLD_CUP_PLAYERS database

### If screenshot is unclear:
- AI may misread stats
- You'll see incorrect point totals
- Solution: Retake clearer screenshot and re-upload

### If upload fails:
- Check if OPENAI_API_KEY is configured
- Verify images are valid (PNG/JPG, < 10MB)
- Check browser console for errors
- Ensure you're the tournament host

## Cost Considerations

**OpenAI GPT-4 Vision Pricing:**
- ~$0.01 per image analyzed
- 6 screenshots per match = ~$0.06 per match
- 55 matches in tournament = ~$3.30 total

**Free Tier:**
- OpenAI provides $5 free credit for new users
- Enough for ~80 matches worth of analysis

**Optimization:**
- Only upload when absolutely necessary
- Use the RapidAPI automatic scoring when available (free tier)
- Manual upload is backup for when API data is incomplete

## Troubleshooting

### "API key not configured" error
**Solution:** Add OPENAI_API_KEY to environment variables and redeploy

### "Failed to analyze scorecard" error
**Possible causes:**
- Invalid API key
- Image file too large (>10MB)
- Network timeout
- OpenAI API quota exceeded

**Solution:**
- Verify API key is correct
- Compress images if too large
- Try again in a few moments
- Check OpenAI account balance

### Points seem incorrect
**Check:**
1. Are all screenshots uploaded? (need both innings)
2. Are screenshots clear and readable?
3. Do player names in database match exactly?

**Solution:**
- Re-upload with clearer screenshots
- Manually verify a few player stats
- Check console logs for extraction details

### "No player data extracted" error
**Causes:**
- Screenshots don't contain scorecard data
- Images are blank or corrupted
- Wrong image format

**Solution:**
- Verify screenshots show actual scorecard
- Ensure images are PNG or JPG
- Try re-taking screenshots

## Alternative: RapidAPI Automatic Scoring

If you prefer not to use manual uploads:
1. The system automatically fetches scorecards via RapidAPI
2. Runs daily at midnight UTC
3. Processes all completed matches automatically
4. No manual intervention required

**When to use manual uploads:**
- RapidAPI doesn't have the match data
- You want immediate score updates
- API quota is exceeded

## Developer Notes

### API Endpoint
- **Path:** `/api/cricket/analyze-scorecard`
- **Method:** POST
- **Body:** `{ images: string[], matchId: string }`
- **Response:** `{ success: boolean, performances: MatchPerformance[], playersFound: number }`

### Image Format
- Images sent as base64 data URLs
- Format: `data:image/jpeg;base64,[base64string]`
- Maximum 6 images per request

### Player Matching
- Case-insensitive exact match first
- Fallback to partial/fuzzy matching
- Logs warnings for unmatched players

### Stat Merging
- If same player appears in multiple images (batting + bowling)
- Stats are summed automatically
- Economy rate is averaged

## Support

For issues or questions:
1. Check this guide first
2. Review AUTOMATIC_SCORING.md for overall system
3. Check SCORING_SYSTEM.md for point calculation rules
4. Verify environment variables are configured
5. Check browser console for detailed error messages

## Summary

✅ **No manual data entry** - Just upload screenshots  
✅ **AI automatically extracts** all player stats  
✅ **Points calculated** using official rules  
✅ **Tournament standings updated** in real-time  
✅ **Simple workflow** - 6 screenshots per match  
✅ **Accurate** - GPT-4 Vision handles cricket scorecards well  
✅ **Cost-effective** - ~$0.06 per match  

This feature makes scorecard entry effortless for tournament hosts! 🎉
