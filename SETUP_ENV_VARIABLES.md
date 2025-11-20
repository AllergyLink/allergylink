# 🔧 How to Set Up Environment Variables

## Step-by-Step Guide

### Step 1: Get Your Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click on your project (or create one if you haven't)
3. Click the **gear icon** ⚙️ in the top left
4. Click **Project Settings**
5. Scroll down to **Your apps** section
6. If you see a web app already, click on it. If not:
   - Click the **Web icon** (`</>`)
   - Register your app (name it "AllergyLink Web")
   - Click **Register app**

7. You'll see a config object that looks like this:
```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123def456"
};
```

### Step 2: Create the .env.local File

**Option A: Use the Setup Script (Easiest)**
```bash
node scripts/setup-firebase-env.js
```
This will ask you for each value and create the file automatically.

**Option B: Create Manually**

1. In your project root folder (`/workspace`), create a new file called `.env.local`
2. Copy this template into it:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
```

3. Fill in each value from your Firebase config:
   - `NEXT_PUBLIC_FIREBASE_API_KEY` = the `apiKey` value
   - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN` = the `authDomain` value
   - `NEXT_PUBLIC_FIREBASE_PROJECT_ID` = the `projectId` value
   - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET` = the `storageBucket` value
   - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID` = the `messagingSenderId` value
   - `NEXT_PUBLIC_FIREBASE_APP_ID` = the `appId` value

### Step 3: Example

Your `.env.local` file should look something like this:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnop
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=allergylink-12345.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=allergylink-12345
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=allergylink-12345.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456ghi789
```

### Step 4: Restart Your Dev Server

After creating/updating `.env.local`:
```bash
# Stop your current server (Ctrl+C)
npm run dev
```

### Step 5: Verify It's Working

1. Open your browser console (F12)
2. Look for any "Firestore not initialized" warnings
3. If you don't see those warnings, it's working! ✅

## File Location

The `.env.local` file should be in the **root** of your project:

```
/workspace/
  ├── .env.local          ← Create this file here
  ├── app/
  ├── components/
  ├── lib/
  ├── package.json
  └── ...
```

## Important Notes

- ✅ The file is called `.env.local` (starts with a dot)
- ✅ It's already in `.gitignore` (won't be committed to git)
- ✅ You MUST restart the dev server after creating/updating it
- ✅ All variables MUST start with `NEXT_PUBLIC_`

## Troubleshooting

**Can't find the file?**
- Make sure you're in the project root (`/workspace`)
- Make sure the filename starts with a dot: `.env.local` (not `env.local`)

**Variables not working?**
- Check for typos in variable names
- Make sure they all start with `NEXT_PUBLIC_`
- Restart your dev server
- Check browser console for errors
