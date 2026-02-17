# T20 World Cup Fantasy League

A minimalistic fantasy cricket application for ICC T20 World Cup 2026, built with Next.js, TypeScript, Tailwind CSS, and Firebase.

## Features

- **Tournament Creation & Management**: Host can create tournaments with customizable budgets
- **Player Auction System**: Random order auction with up to 20 team owners
- **Team Selection**: Select playing 12 before each match
- **Live Scoring**: Dream11-style points calculation based on actual match performances
- **Match Schedule**: Complete T20 World Cup 2026 schedule with dates and venues (IST)
- **Leaderboard**: Real-time rankings and points tracking
- **Dashboard**: Overview of team performance and statistics
- **User Authentication**: Email-based login with Firebase Auth
- **Responsive Design**: Clean, minimalistic UI that works on all devices

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Firebase account (for authentication and database)

### Installation

1. **Navigate to the project directory**:
   ```bash
   cd "/Users/mish/Documents/coding/icc t20 world cup/cricket-fantasy-app"
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Firebase**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Email/Password authentication in Authentication section
   - Create a Firestore database
   - Copy your Firebase configuration

4. **Configure environment variables**:
   - Copy `.env.local.example` to `.env.local`:
     ```bash
     cp .env.local.example .env.local
     ```
   - Fill in your Firebase credentials in `.env.local`:
     ```
     NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
     NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
     NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
     NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
     NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
     NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
     ```

5. **Run the development server**:
   ```bash
   npm run dev
   ```

6. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
cricket-fantasy-app/
├── app/                          # Next.js app directory
│   ├── auth/                     # Authentication pages
│   ├── dashboard/                # Main dashboard and pages
│   │   ├── auction/              # Auction page
│   │   ├── leaderboard/          # Leaderboard page
│   │   ├── schedule/             # Match schedule page
│   │   ├── team/                 # Team management page
│   │   └── layout.tsx            # Dashboard layout with navigation
│   ├── tournament/               # Tournament setup pages
│   │   ├── create/               # Create tournament
│   │   └── join/                 # Join tournament
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page
│   └── globals.css               # Global styles
├── lib/                          # Utility functions and data
│   ├── firebase.ts               # Firebase configuration
│   ├── types.ts                  # TypeScript type definitions
│   ├── scoring.ts                # Dream11-style scoring logic
│   ├── players.ts                # Player roster data
│   ├── schedule.ts               # Match schedule data
│   ├── utils.ts                  # Utility functions
│   └── store.ts                  # Zustand state management
├── public/                       # Static assets
├── .env.local.example            # Environment variables template
├── package.json                  # Dependencies
└── README.md                     # This file
```

## How to Use

### As a Host

1. **Create Tournament**:
   - Click "Create New Tournament" on the home page
   - Sign in or create an account
   - Set tournament name and budget per team
   - You'll receive a 6-digit tournament code

2. **Add Team Owners**:
   - Share the tournament code with friends
   - Add owner details (email, name, team name)
   - Minimum 2 owners required to start

3. **Start Auction**:
   - Download the auction order (optional)
   - Players appear in random order
   - Manage bids from all team owners
   - Mark players as SOLD or UNSOLD

4. **Manage Matches**:
   - View the match schedule
   - Team owners select their playing 12 before each match
   - Update live scores during matches
   - View leaderboard after each match

### As a Team Owner

1. **Join Tournament**:
   - Get the 6-digit code from your host
   - Click "Join Tournament" on the home page
   - Sign in or create an account
   - Enter the tournament code

2. **Participate in Auction**:
   - Wait for host to start the auction
   - Bid on players to build your squad
   - Aim for at least 15 players

3. **Manage Your Team**:
   - Select your playing 12 before each match
   - Save your team before match starts

4. **Track Progress**:
   - View your points on the dashboard
   - Check your rank on the leaderboard
   - See player performances after each match

## Scoring System (Dream11 Style)

### Batting
- Every run: 1 point
- Boundary (4): +1 point
- Six: +2 points
- 30 runs: +4 points
- 50 runs: +8 points
- 100 runs: +16 points
- Duck (dismissed for 0): -2 points
- Strike rate bonuses/penalties (min 10 balls)

### Bowling
- Wicket: 25 points
- LBW/Bowled bonus: +8 points
- 3 wickets: +4 points
- 4 wickets: +8 points
- 5 wickets: +16 points
- Maiden over: 12 points
- Economy rate bonuses/penalties

### Fielding
- Catch: 8 points
- 3 catches: +4 points
- Stumping: 12 points
- Run out: 6 points

## Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import your repository
4. Add your environment variables
5. Deploy!

### Deploy to GitHub Pages

Note: GitHub Pages only supports static sites. For full functionality with Firebase, use Vercel or similar platforms.

## Technologies Used

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe code
- **Tailwind CSS**: Utility-first styling
- **Firebase**: Authentication and database
- **Zustand**: State management
- **date-fns**: Date formatting
- **Lucide React**: Beautiful icons

## Features to Implement (Future)

- Real-time bidding in auction
- Live match score updates
- Push notifications for match start
- Player statistics and history
- Multi-tournament support
- Team chat/messaging
- Export/import tournament data
- Mobile app (React Native)

## Contributing

This is a personal project, but suggestions and feedback are welcome!

## License

MIT License - Feel free to use this project for your own fantasy leagues!

## Support

For issues or questions, please create an issue in the GitHub repository.

---

**Built with ❤️ for cricket fans**
Environment: Vercel production with OpenAI integration
