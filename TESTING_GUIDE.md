# 🧪 Testing Guide

## How to Test Firebase Authentication

### Option 1: Test Locally (Recommended First)

1. **Make sure `.env.local` is set up** (already done ✅)

2. **Start your dev server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   - Go to `http://localhost:3000`

4. **Test Sign Up:**
   - Go to `/auth/sign-up`
   - Enter your phone number (format: `+15551234567` or `5551234567`)
   - Click "Send one-time code"
   - Check your phone for SMS code
   - Enter the code
   - Should redirect to `/create`

5. **Test Sign In:**
   - Go to `/auth/sign-in`
   - Enter the same phone number
   - Enter the SMS code
   - Should redirect to `/dashboard`

6. **Test Profile Creation:**
   - After signing up, create a profile
   - Fill in all fields
   - Click "Save Profile"
   - Check Firebase Console → Firestore → `profiles` collection
   - Should see your profile saved!

7. **Test Dashboard:**
   - Go to `/dashboard`
   - Should see your profile loaded from Firestore
   - Should see QR code with your AllergyLink ID

### Option 2: Test on GitHub Pages

1. **Wait for deployment to complete**
   - Go to GitHub → Actions tab
   - Wait for "Deploy to GitHub Pages" to finish

2. **Visit your GitHub Pages site**

3. **Test the same flow:**
   - Sign up
   - Create profile
   - Check dashboard

## ✅ What to Check

### Browser Console
- Open DevTools (F12)
- Should NOT see "Firestore not initialized" warnings
- Should see successful Firebase operations

### Firebase Console
1. Go to **Firestore Database**
2. Check `profiles` collection - should see your profile
3. Check `shared` collection - when you share venues
4. Check `settings` collection - when you change settings

### Authentication
1. Go to **Authentication** → **Users**
2. Should see your phone number after signing up

## 🐛 Common Issues

**"reCAPTCHA verification failed"**
- Make sure you're on an authorized domain
- Check browser console for errors

**"SMS not received"**
- Check phone number format (+1 for US)
- Check Firebase Console → Authentication → Usage for quota
- Try test phone numbers first

**"Permission denied"**
- Check Firestore security rules are deployed
- Make sure user is authenticated

**"Profile not loading"**
- Check browser console for errors
- Verify profile was saved in Firestore
- Check Firestore rules allow reads

## 🎯 Test Checklist

- [ ] Can sign up with phone number
- [ ] Receives SMS code
- [ ] Can verify code and sign in
- [ ] Can create profile
- [ ] Profile appears in Firestore
- [ ] Dashboard loads profile
- [ ] Settings save and load
- [ ] Family profiles work
- [ ] Venue view loads by ID
