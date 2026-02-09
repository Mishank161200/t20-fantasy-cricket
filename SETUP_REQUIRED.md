# ⚠️ IMPORTANT: Setup Required Before Building

## Firebase Configuration Required

This app requires Firebase credentials to build and run. You'll see build errors until Firebase is properly configured.

## Quick Fix

1. **Create `.env.local` file** in the project root:
   ```bash
   cp .env.local.example .env.local
   ```

2. **Get Firebase credentials** from [Firebase Console](https://console.firebase.google.com/):
   - Create a new project (or use existing)
   - Go to Project Settings
   - Under "Your apps", click the Web icon (</>)
   - Copy your config

3. **Update `.env.local`** with your Firebase credentials:
   ```env
   NEXT_PUBLIC_FIREBASE_API_KEY=your_actual_api_key_here
   NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
   NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
   NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
   ```

4. **Enable Firebase services**:
   - Authentication → Enable Email/Password
   - Firestore Database → Create database in test mode

5. **Try again**:
   ```bash
   npm run dev
   # OR
   npm run build
   ```

## Why This Happens

The app uses Firebase for:
- User authentication (email/password login)
- Database (storing tournaments, teams, scores)

Without valid Firebase credentials, the app cannot initialize these services, causing build/runtime errors.

## Need Help?

See `QUICK_START.md` for detailed Firebase setup instructions.

---

**Once Firebase is configured, everything will work perfectly! 🚀**
