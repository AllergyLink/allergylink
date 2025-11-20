# 🧪 Testing on GitHub Pages

## Step 1: Wait for Deployment

1. Go to your GitHub repository
2. Click **Actions** tab
3. Wait for **"Deploy to GitHub Pages"** workflow to complete (green checkmark)
   - Usually takes 2-3 minutes

## Step 2: Find Your GitHub Pages URL

Your site will be at one of these:
- `https://YOUR_USERNAME.github.io/allergylink/` (if repo is `allergylink`)
- `https://YOUR_USERNAME.github.io/` (if repo is `username.github.io`)

Or check:
- GitHub repo → **Settings** → **Pages** → See the URL at the top

## Step 3: Test Authentication

1. **Visit your GitHub Pages URL**
2. **Go to sign-up page:**
   - Add `/auth/sign-up` to your URL
   - Example: `https://YOUR_USERNAME.github.io/allergylink/auth/sign-up`

3. **Test sign-up:**
   - Enter your phone number (format: `+15551234567`)
   - Click "Send one-time code"
   - Check your phone for SMS code
   - Enter the code
   - Should redirect to create profile page

4. **Create a profile:**
   - Fill in your information
   - Click "Save Profile"
   - Should save to Firestore

5. **Check Dashboard:**
   - Go to `/dashboard`
   - Should see your profile loaded from Firestore

## Step 4: Verify in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select **allergylink-6d14d**
3. Check **Firestore Database** → `profiles` collection
4. Should see your profile saved!

5. Check **Authentication** → **Users**
6. Should see your phone number

## ✅ Success Indicators

- ✅ Can sign up with phone number
- ✅ Receives SMS code
- ✅ Can verify and create profile
- ✅ Profile appears in Firestore
- ✅ Dashboard loads your profile
- ✅ No console errors

## 🐛 If Something Doesn't Work

1. **Check browser console (F12)** for errors
2. **Check GitHub Actions** - did build succeed?
3. **Check Firebase Console** - is data being saved?
4. **Check Firestore rules** - are they deployed?

## 🔍 Quick Debug

Open browser console (F12) and look for:
- ❌ "Firestore not initialized" = secrets not set correctly
- ❌ "Permission denied" = Firestore rules issue
- ❌ "Phone auth failed" = Phone provider not enabled
