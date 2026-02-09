# 🚀 Quick Start Guide

Get your T20 Fantasy Cricket app running in 5 minutes!

## Prerequisites Checklist
- ✅ Node.js 18+ installed ([Download](https://nodejs.org/))
- ✅ Code editor (VS Code recommended)
- ✅ Firebase account (free)

## Step-by-Step Setup

### 1️⃣ Firebase Setup (5 minutes)

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter project name: `t20-fantasy-cricket`
4. Disable Google Analytics (optional)
5. Click "Create Project"

**Enable Authentication:**
- Go to Build → Authentication
- Click "Get Started"
- Enable "Email/Password" sign-in method

**Create Firestore Database:**
- Go to Build → Firestore Database
- Click "Create Database"
- Choose "Start in test mode"
- Select a location
- Click "Enable"

**Get Configuration:**
- Go to Project Settings (⚙️ icon)
- Scroll to "Your apps"
- Click Web icon (</>)
- Register app with name: `T20 Fantasy`
- Copy the Firebase configuration

### 2️⃣ Configure Environment (1 minute)

1. Open the project in your code editor:
   ```bash
   cd "/Users/mish/Documents/coding/icc t20 world cup/cricket-fantasy-app"
   code .
   ```

2. Copy the environment template:
   ```bash
   cp .env.local.example .env.local
   ```

3. Open `.env.local` and paste your Firebase config:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
   ```

### 3️⃣ Install & Run (2 minutes)

**Option A: Using the setup script**
```bash
./setup.sh
npm run dev
```

**Option B: Manual installation**
```bash
npm install
npm run dev
```

### 4️⃣ Test the App (1 minute)

1. Open browser: http://localhost:3000
2. You should see the beautiful landing page! 🎉
3. Try creating an account:
   - Click "Create New Tournament"
   - Sign up with your email
   - Start setting up your tournament!

## ✅ You're All Set!

Your app is now running locally. Here's what you can do:

### Test Features:
- ✅ Create a tournament
- ✅ Add team owners
- ✅ Run an auction
- ✅ Select your team
- ✅ View the schedule
- ✅ Check the leaderboard

### Invite Friends:
1. Share the tournament code
2. They can join using the link (when deployed)
3. Start the auction together!

## 🌐 Deploy Online

Ready to host online? Choose one:

### Option 1: Vercel (Easiest - 2 minutes)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import repository
4. Add environment variables
5. Deploy!

### Option 2: GitHub Pages
See `DEPLOYMENT.md` for detailed instructions

## 🎮 How to Play

### As Host:
1. Create tournament → Set budget
2. Add owners → Share code
3. Start auction → Manage bids
4. Track scores → Update leaderboard

### As Player:
1. Join with code → Sign up
2. Participate in auction
3. Select your playing 12
4. Track your points!

## 🆘 Troubleshooting

**App won't start?**
- Make sure Node.js 18+ is installed: `node --version`
- Delete `node_modules` and run `npm install` again

**Firebase errors?**
- Check `.env.local` has correct values
- Verify Firebase project is created
- Ensure Authentication and Firestore are enabled

**Port 3000 already in use?**
```bash
npm run dev -- -p 3001
```

**Still having issues?**
- Check browser console (F12) for errors
- Verify all environment variables are set
- Make sure Firebase rules allow read/write

## 📚 Learn More

- `README.md` - Full documentation
- `DEPLOYMENT.md` - Deployment guides
- `PROJECT_OVERVIEW.md` - Technical details

## 🎯 Next Steps

1. **Customize Players**: Edit `lib/players.ts` to add/remove players
2. **Update Schedule**: Modify `lib/schedule.ts` for actual match dates
3. **Adjust Scoring**: Tweak `lib/scoring.ts` for custom rules
4. **Style Changes**: Edit Tailwind classes for different colors

## 🔥 Pro Tips

- Use Chrome DevTools (F12) to debug
- Test with multiple users in different browsers
- Download auction order before starting
- Save your team before match starts!

## 🎉 Enjoy Your Fantasy League!

You're ready to host an epic T20 World Cup 2026 fantasy tournament with your friends!

---

**Have fun and may the best team win! 🏆**
