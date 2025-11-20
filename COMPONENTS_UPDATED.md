# Components Updated for Firebase

## ✅ Components Updated

### Authentication Pages
- ✅ **`app/auth/sign-in/page.tsx`**
  - Integrated Firebase phone authentication
  - Added reCAPTCHA initialization
  - Real SMS code sending and verification
  - Error handling and loading states
  - Redirects to dashboard on success

- ✅ **`app/auth/sign-up/page.tsx`**
  - Integrated Firebase phone authentication
  - Added localStorage to Firestore migration
  - Real SMS code sending and verification
  - Redirects to create profile on success

### Profile Management
- ✅ **`app/create/page.tsx`**
  - Uses `useAuth()` hook to check authentication
  - Saves profiles to Firestore with `userId`
  - Includes all new fields (emergency contact, profile type, name visibility)
  - Shows loading and error states
  - Redirects to sign-in if not authenticated

### Dashboard
- ✅ **`app/dashboard/page.tsx`**
  - Loads primary profile from Firestore
  - Loads family profiles from Firestore
  - Loads shared venues from Firestore
  - Shows loading states
  - Shows empty states when no data
  - Redirects to sign-in if not authenticated

### Family Page
- ✅ **`app/family/page.tsx`**
  - Loads family profiles from Firestore
  - Uses `FamilyProfileCard` component
  - Shows loading and empty states
  - Redirects to sign-in if not authenticated

### Settings Page
- ✅ **`app/settings/page.tsx`**
  - Loads settings from Firestore on mount
  - Saves settings to Firestore on change
  - All toggles persist to database
  - Shows loading and saving states
  - Redirects to sign-in if not authenticated

### Venue View
- ✅ **`app/id/venue/[id]/page.tsx`** (NEW - dynamic route)
  - Loads profile from Firestore by ID
  - Shows profile data for venues
  - Handles missing profiles gracefully
  - Shows emergency contact if available

- ✅ **`app/id/venue/page.tsx`** (Updated)
  - Now loads from Firestore
  - Shows error states

## 🔧 How to Use

### 1. Set Environment Variables

Run the setup script:
```bash
node scripts/setup-firebase-env.js
```

Or manually create `.env.local`:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

### 2. Restart Dev Server

After setting environment variables:
```bash
npm run dev
```

### 3. Test Authentication

1. Go to `/auth/sign-up`
2. Enter your phone number
3. Enter the SMS code you receive
4. You should be redirected to `/create`

### 4. Test Profile Creation

1. Create a profile with all fields
2. Check Firebase Console > Firestore to see the data
3. Go to Dashboard - should see your profile

## 📝 Key Changes

### Authentication Flow
- **Before**: Mock code "123456"
- **After**: Real Firebase phone authentication with SMS

### Data Storage
- **Before**: localStorage only
- **After**: Firestore (with localStorage fallback)

### Data Loading
- **Before**: Hardcoded mock data
- **After**: Loads from Firestore based on user ID

### Settings Persistence
- **Before**: Local state only
- **After**: Saves to Firestore, loads on mount

## 🐛 Troubleshooting

### "Firestore not initialized"
- Check environment variables are set
- Restart dev server
- Check browser console for errors

### "Permission denied"
- Check Firestore security rules
- Make sure user is authenticated
- Verify rules match your data structure

### Phone auth not working
- Check Phone provider is enabled in Firebase Console
- Verify reCAPTCHA is set up
- Check authorized domains include your domain

### Data not loading
- Check user is authenticated (`useAuth()` hook)
- Verify Firestore rules allow reads
- Check browser console for errors
- Verify data exists in Firestore Console

## ✅ Testing Checklist

- [ ] Environment variables set
- [ ] Dev server restarted
- [ ] Can sign up with phone number
- [ ] Can sign in with phone number
- [ ] Can create profile
- [ ] Profile appears in Dashboard
- [ ] Family profiles load
- [ ] Settings save and load
- [ ] Venue view loads profile by ID
- [ ] Shared venues load
