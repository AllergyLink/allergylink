# 🔍 Check Firebase Environment Variables

## The Problem

If you're seeing "demo code" or authentication isn't working, Firebase environment variables might not be loading correctly.

## Quick Check

1. **Open your GitHub Pages site**
2. **Open Browser Console** (F12)
3. **Look for these messages:**
   - ✅ "Firebase auth initialized: [DEFAULT]" = Good!
   - ❌ "Firebase auth is undefined" = Problem!
   - ❌ "Firebase configuration is missing" = Problem!

## Verify GitHub Secrets

1. Go to your GitHub repo
2. **Settings** → **Secrets and variables** → **Actions**
3. Make sure you have these 6 secrets (exact names, case-sensitive):
   - `NEXT_PUBLIC_FIREBASE_API_KEY`
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
   - `NEXT_PUBLIC_FIREBASE_APP_ID`

## Check Build Logs

1. Go to **Actions** tab in GitHub
2. Click the latest workflow run
3. Expand **"Build for GitHub Pages"** step
4. Look for any errors or warnings
5. The build should complete successfully

## Test After Deployment

After the latest changes deploy:

1. Visit your GitHub Pages site
2. Open browser console (F12)
3. Try to sign up/sign in
4. Watch the console for:
   - "Sending verification code to: +1..."
   - "Verification code sent successfully"
   - OR error messages

## If Still Not Working

Share:
1. What you see in the browser console
2. Any error messages on the page
3. Screenshot of the GitHub Secrets page (hide the values, just show the names)
