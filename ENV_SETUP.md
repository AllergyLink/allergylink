# Environment Variables Setup

## Quick Setup

### Option 1: Use the Setup Script
```bash
node scripts/setup-firebase-env.js
```

This interactive script will prompt you for each Firebase configuration value and create `.env.local` automatically.

### Option 2: Manual Setup

1. Copy the example file:
   ```bash
   cp .env.local.example .env.local
   ```

2. Edit `.env.local` and add your Firebase configuration values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
NEXT_PUBLIC_FIREBASE_APP_ID=your-app-id
```

## Where to Find These Values

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon ⚙️ > **Project Settings**
4. Scroll down to **Your apps** section
5. If you don't have a web app yet:
   - Click the **Web** icon (`</>`)
   - Register your app (name it "AllergyLink Web")
   - Copy the configuration values

## Important Notes

- ✅ All variables must start with `NEXT_PUBLIC_` to be accessible in the browser
- ✅ `.env.local` is already in `.gitignore` (won't be committed)
- ✅ Restart your dev server after adding/updating environment variables
- ✅ For production, add these same variables to your hosting platform (Vercel, etc.)

## Verification

After setting up, restart your dev server:
```bash
npm run dev
```

Check the browser console - you should NOT see "Firestore not initialized" warnings if everything is set up correctly.
