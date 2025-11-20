# 🔥 Firebase Setup for GitHub Pages

## Quick Setup Guide

### Step 1: Add Firebase Secrets to GitHub

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** for each variable below

Add these 6 secrets (click "New repository secret" 6 times):

| Secret Name | Value to Paste |
|------------|----------------|
| `NEXT_PUBLIC_FIREBASE_API_KEY` | `AIzaSyCOe-9v1GKW7bM8Z-4UCuJ_UuDmrzaoYFM` |
| `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` | `allergylink-6d14d.firebaseapp.com` |
| `NEXT_PUBLIC_FIREBASE_PROJECT_ID` | `allergylink-6d14d` |
| `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` | `allergylink-6d14d.firebasestorage.app` |
| `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` | `136900932828` |
| `NEXT_PUBLIC_FIREBASE_APP_ID` | `1:136900932828:web:092406c33babd91d953019` |

**Important:** The secret **name** must match exactly (including `NEXT_PUBLIC_` prefix).

### Step 2: Workflow Updated ✅

I've already updated `.github/workflows/deploy.yml` to use these secrets. No changes needed!

### Step 3: Deploy

1. **Commit and push** your changes:
   ```bash
   git add .
   git commit -m "Add Firebase configuration"
   git push
   ```

2. GitHub Actions will automatically:
   - Build the site with Firebase config
   - Deploy to GitHub Pages

3. Or **manually trigger**:
   - Go to **Actions** tab
   - Select **Deploy to GitHub Pages** workflow
   - Click **Run workflow**

## Visual Guide

1. **Go to:** `https://github.com/YOUR_USERNAME/YOUR_REPO/settings/secrets/actions`

2. **Click:** "New repository secret" (6 times)

3. **For each secret:**
   - **Name:** Copy from the table above
   - **Secret:** Paste the value from the table above
   - **Click:** "Add secret"

## Verify It Worked

After deployment:
1. Visit your GitHub Pages site
2. Open browser console (F12)
3. Should NOT see "Firestore not initialized" warnings
4. Try signing up - should work with real Firebase!

## Important Notes

- ✅ These values are safe to expose (Firebase client configs are public)
- ✅ They're only used during build time
- ✅ The built static files will contain these values (this is normal)
- ✅ `.env.local` is for local development only
- ✅ GitHub Secrets are for GitHub Pages builds

## Troubleshooting

**Build fails?**
- Check all 6 secrets are added
- Check secret names match exactly (case-sensitive)
- Check workflow file is updated

**Firebase not working on GitHub Pages?**
- Check browser console for errors
- Verify secrets are set correctly
- Check Firestore security rules are deployed
