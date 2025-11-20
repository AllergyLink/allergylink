# 🔐 Firebase Authentication Setup

## Step-by-Step: Enable Phone Authentication

### Step 1: Go to Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **allergylink-6d14d**
3. In the left sidebar, click **Authentication**
4. Click **Get started** (if you see it)

### Step 2: Enable Phone Provider

1. Click the **Sign-in method** tab (at the top)
2. You'll see a list of providers
3. Find **Phone** in the list
4. Click on **Phone**
5. Toggle the **Enable** switch to **ON**
6. Click **Save**

### Step 3: Set Up reCAPTCHA (if prompted)

Firebase will automatically set up reCAPTCHA for you. You might see:
- "reCAPTCHA Enterprise" - this is fine, just accept it
- Or it might be automatic

### Step 4: Add Authorized Domains (if needed)

1. Still in Authentication → Settings
2. Scroll to **Authorized domains**
3. Make sure these are listed:
   - `localhost` (for local testing)
   - `allergylink-6d14d.firebaseapp.com` (your Firebase domain)
   - Your GitHub Pages domain (if you know it)
   - Any custom domain you're using

### Step 5: Test It

After enabling:
1. Go to your app
2. Try `/auth/sign-up`
3. Enter your phone number
4. You should receive an SMS code!

## ⚠️ Important Notes

- **Phone authentication costs money** after the free tier (but free tier is generous)
- **Test phone numbers** can be used for development (in Firebase Console → Authentication → Settings)
- **Production**: Real phone numbers will receive SMS codes

## 🧪 Testing Phone Numbers (Optional)

For testing without real SMS:
1. Go to **Authentication** → **Settings**
2. Scroll to **Phone numbers for testing**
3. Add test numbers (they won't receive real SMS)

## ✅ Checklist

- [ ] Phone provider enabled
- [ ] reCAPTCHA set up (automatic)
- [ ] Authorized domains configured
- [ ] Test the sign-up flow

## 🐛 Troubleshooting

**"Phone provider not enabled"**
- Make sure you clicked "Enable" and saved

**"reCAPTCHA verification failed"**
- Check authorized domains
- Make sure you're on an authorized domain

**"SMS not received"**
- Check phone number format (+1 for US)
- Check Firebase Console for quota limits
- Try a test phone number first
