# 🔧 Troubleshooting Firebase Phone Authentication

## Issue: "Demo code" instead of real SMS

If you're seeing demo codes or the authentication isn't working, check these:

### 1. Check Browser Console

Open DevTools (F12) and look for:
- ❌ "Firebase Auth not initialized" 
- ❌ "Firebase configuration is missing"
- ❌ Any red error messages

### 2. Verify Environment Variables

**On GitHub Pages:**
- Go to GitHub → Settings → Secrets and variables → Actions
- Make sure all 6 secrets are set correctly
- Check that secret names match exactly (case-sensitive)

**Check the build logs:**
- Go to Actions → Latest workflow run
- Check if environment variables are being used
- Look for any errors during build

### 3. Check Firebase Console

1. Go to Firebase Console → Authentication
2. Check **Sign-in method** → Phone should be **Enabled**
3. Check **Settings** → **Authorized domains**
   - Should include your GitHub Pages domain
   - Should include `localhost` (for testing)

### 4. Common Issues

**"reCAPTCHA verification failed"**
- Make sure you're on an authorized domain
- Try refreshing the page
- Check browser console for reCAPTCHA errors

**"Firebase Auth not initialized"**
- Environment variables not set in GitHub Secrets
- Check build logs to see if variables are available
- Make sure `NEXT_PUBLIC_` prefix is used

**"Invalid phone number"**
- Format: `+15551234567` (with country code)
- Or: `5551234567` (will auto-add +1 for US)

**"Too many requests"**
- Firebase has rate limits
- Wait a few minutes and try again
- Check Firebase Console → Usage for quota

### 5. Test Phone Numbers

For testing without real SMS:
1. Firebase Console → Authentication → Settings
2. Scroll to **Phone numbers for testing**
3. Add test numbers (they won't receive real SMS)
4. Use those numbers in the app

### 6. Debug Steps

1. **Check if Firebase is loading:**
   - Open browser console
   - Type: `window.firebase` or check Network tab
   - Should see Firebase requests

2. **Check environment variables:**
   - The build should include them
   - Check the built JavaScript files
   - Look for your Firebase config values

3. **Check reCAPTCHA:**
   - Should initialize automatically
   - Check console for reCAPTCHA errors
   - May need to wait a moment after page load

### 7. Quick Test

1. Open browser console (F12)
2. Try signing up
3. Watch for:
   - "Sending verification code to: +1..."
   - "Verification code sent successfully"
   - Any error messages

If you see errors, share them and I can help fix!
