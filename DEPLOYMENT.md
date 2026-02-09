# Deploying to GitHub Pages

This guide will help you deploy your T20 Fantasy Cricket app to GitHub Pages.

## Important Note

GitHub Pages is designed for static websites. Since this app uses Firebase for backend functionality, you'll need to ensure Firebase is properly configured. For full functionality, **Vercel is recommended** instead of GitHub Pages.

However, if you still want to use GitHub Pages, follow these steps:

## Step 1: Prepare Your Repository

1. **Initialize Git** (if not already done):
   ```bash
   cd "/Users/mish/Documents/coding/icc t20 world cup/cricket-fantasy-app"
   git init
   git add .
   git commit -m "Initial commit: T20 Fantasy Cricket App"
   ```

2. **Create a GitHub repository**:
   - Go to [GitHub](https://github.com/new)
   - Create a new repository (e.g., `t20-fantasy-cricket`)
   - Don't initialize with README, .gitignore, or license

3. **Link and push to GitHub**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/t20-fantasy-cricket.git
   git branch -M main
   git push -u origin main
   ```

## Step 2: Configure for Static Export

1. **Update next.config.ts** for static export:
   ```typescript
   import type { NextConfig } from "next";

   const nextConfig: NextConfig = {
     output: 'export',
     images: {
       unoptimized: true,
     },
     basePath: '/t20-fantasy-cricket', // Replace with your repo name
   };

   export default nextConfig;
   ```

2. **Add a .nojekyll file** to public folder:
   ```bash
   touch public/.nojekyll
   ```

## Step 3: Build and Deploy

### Option A: Manual Deployment

1. **Build the static site**:
   ```bash
   npm run build
   ```

2. **Install gh-pages**:
   ```bash
   npm install --save-dev gh-pages
   ```

3. **Add deploy scripts to package.json**:
   ```json
   {
     "scripts": {
       "predeploy": "npm run build",
       "deploy": "gh-pages -d out"
     }
   }
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

### Option B: GitHub Actions (Recommended)

1. **Create `.github/workflows/deploy.yml`**:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches: [ main ]
     workflow_dispatch:

   permissions:
     contents: read
     pages: write
     id-token: write

   jobs:
     build:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         
         - name: Setup Node
           uses: actions/setup-node@v4
           with:
             node-version: '20'
             cache: 'npm'
         
         - name: Install dependencies
           run: npm ci
         
         - name: Build
           run: npm run build
           env:
             NEXT_PUBLIC_FIREBASE_API_KEY: ${{ secrets.FIREBASE_API_KEY }}
             NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: ${{ secrets.FIREBASE_AUTH_DOMAIN }}
             NEXT_PUBLIC_FIREBASE_PROJECT_ID: ${{ secrets.FIREBASE_PROJECT_ID }}
             NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: ${{ secrets.FIREBASE_STORAGE_BUCKET }}
             NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: ${{ secrets.FIREBASE_MESSAGING_SENDER_ID }}
             NEXT_PUBLIC_FIREBASE_APP_ID: ${{ secrets.FIREBASE_APP_ID }}
         
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v2
           with:
             path: ./out

     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       needs: build
       steps:
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v3
   ```

2. **Add Firebase secrets to GitHub**:
   - Go to your repository Settings → Secrets and variables → Actions
   - Add these secrets:
     - `FIREBASE_API_KEY`
     - `FIREBASE_AUTH_DOMAIN`
     - `FIREBASE_PROJECT_ID`
     - `FIREBASE_STORAGE_BUCKET`
     - `FIREBASE_MESSAGING_SENDER_ID`
     - `FIREBASE_APP_ID`

3. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Source: GitHub Actions

4. **Push to deploy**:
   ```bash
   git add .
   git commit -m "Add GitHub Actions deployment"
   git push
   ```

## Step 4: Access Your App

Your app will be available at:
```
https://YOUR_USERNAME.github.io/t20-fantasy-cricket/
```

## Alternative: Deploy to Vercel (Easier & Recommended)

1. **Push code to GitHub** (steps above)

2. **Go to [Vercel](https://vercel.com)**

3. **Import your repository**

4. **Add environment variables**:
   - Add all your Firebase config variables

5. **Deploy!**

Your app will be live at: `https://your-app.vercel.app`

## Troubleshooting

### Issue: Firebase not working on GitHub Pages
- **Solution**: Make sure all Firebase environment variables are set in GitHub Secrets
- Check browser console for errors

### Issue: 404 on page refresh
- **Cause**: GitHub Pages doesn't support client-side routing perfectly
- **Solution**: Use Vercel instead, or add a custom 404.html that redirects to index.html

### Issue: Images not loading
- **Solution**: Ensure `images: { unoptimized: true }` is in next.config.ts

### Issue: Base path errors
- **Solution**: Make sure basePath in next.config.ts matches your repo name

## Sharing Your App

Once deployed, share the link with your friends:
```
https://YOUR_USERNAME.github.io/t20-fantasy-cricket/
```

They can:
1. Create accounts
2. Join tournaments using the code you provide
3. Participate in the auction
4. Build their fantasy teams

---

**Need help?** Create an issue in the GitHub repository!
