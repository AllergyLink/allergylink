# Firebase Setup Guide

This guide will help you set up Firebase Firestore for the AllergyLink app.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project"
3. Enter project name (e.g., "allergylink")
4. Follow the setup wizard
5. Enable Google Analytics (optional)

## Step 2: Enable Authentication

1. In Firebase Console, go to **Authentication** > **Get started**
2. Enable **Phone** authentication provider
3. Add your app's domain to authorized domains if needed

## Step 3: Create Firestore Database

1. In Firebase Console, go to **Firestore Database** > **Create database**
2. Start in **production mode** (we'll add rules later)
3. Choose a location (preferably close to your users)
4. Click **Enable**

## Step 4: Get Configuration Values

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click the **Web** icon (`</>`) to add a web app
4. Register your app (name it "AllergyLink Web")
5. Copy the configuration values

## Step 5: Set Environment Variables

1. Copy `.env.local.example` to `.env.local`
2. Fill in your Firebase configuration values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

## Step 6: Set Up Security Rules

1. In Firebase Console, go to **Firestore Database** > **Rules**
2. Copy the rules from `lib/firebase/rules.md`
3. Paste and click **Publish**

## Step 7: Set Up reCAPTCHA (for Phone Auth)

1. In Firebase Console, go to **Authentication** > **Settings** > **reCAPTCHA**
2. Enable reCAPTCHA Enterprise (or use the default)
3. Add your domain to authorized domains

## Step 8: Test the Setup

1. Start your dev server: `npm run dev`
2. Try creating a profile
3. Check Firestore Console to see if data is being saved

## Troubleshooting

### "Firestore not initialized" warnings
- Make sure environment variables are set correctly
- Check that `NEXT_PUBLIC_` prefix is used for client-side variables
- Restart your dev server after adding env variables

### Phone authentication not working
- Make sure Phone auth is enabled in Firebase Console
- Check that reCAPTCHA is set up
- Verify your domain is in authorized domains

### Permission denied errors
- Check Firestore security rules
- Make sure user is authenticated
- Verify the rules match your data structure

## Migration from localStorage

The app currently uses localStorage. To migrate:

1. Keep both systems running temporarily
2. Add migration function to sync localStorage data to Firestore
3. Update components to use Firestore functions
4. Remove localStorage code once migration is complete

See `lib/firebase/migration.ts` for migration utilities.
