# 🚀 Quick Start: Environment Variables

## Where to Put Them

Create a file called **`.env.local`** in the **root** of your project (same folder as `package.json`).

```
/workspace/                    ← You are here
  ├── .env.local              ← CREATE THIS FILE HERE
  ├── package.json
  ├── app/
  ├── components/
  └── ...
```

## How to Create the File

### Method 1: Use the Script (Easiest!)
```bash
node scripts/setup-firebase-env.js
```
This will ask you questions and create the file automatically.

### Method 2: Create Manually

1. **Get your Firebase config:**
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Click your project → ⚙️ Settings → Project Settings
   - Scroll to "Your apps" → Click Web icon `</>`
   - Copy the config values

2. **Create the file:**
   - In your code editor, create a new file in the root folder
   - Name it exactly: `.env.local` (starts with a dot!)
   - Paste this template:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=paste-api-key-here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=paste-auth-domain-here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=paste-project-id-here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=paste-storage-bucket-here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=paste-sender-id-here
NEXT_PUBLIC_FIREBASE_APP_ID=paste-app-id-here
```

3. **Fill in the values** from your Firebase Console

4. **Save the file**

5. **Restart your dev server:**
   ```bash
   npm run dev
   ```

## Example

Your `.env.local` should look like this (with YOUR actual values):

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnop
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=my-project-12345.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=my-project-12345
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=my-project-12345.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abc123def456
```

## ✅ Check if It Works

After restarting your server, check the browser console. If you DON'T see "Firestore not initialized" warnings, it's working!
