# 🔥 Firebase Firestore Setup

This document provides step-by-step instructions for setting up Firebase Firestore as the backend for AllergyLink.

## Quick Start

1. **Install dependencies** (already done):
   ```bash
   npm install firebase
   ```

2. **Create Firebase project**:
   - Go to [Firebase Console](https://console.firebase.google.com/)
   - Create a new project
   - Enable Authentication (Phone provider)
   - Create Firestore database

3. **Get configuration values**:
   - Project Settings > Your apps > Web app
   - Copy the config values

4. **Set environment variables**:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Firebase config
   ```

5. **Set up Firestore rules**:
   - Copy rules from `lib/firebase/rules.md`
   - Paste in Firebase Console > Firestore > Rules

## Detailed Setup

See `lib/firebase/README.md` for complete setup instructions.

## File Structure

```
lib/firebase/
├── config.ts          # Firebase initialization
├── auth.ts            # Authentication functions
├── storage.ts         # Firestore operations
├── hooks.ts           # React hooks for auth
├── migration.ts       # localStorage to Firestore migration
├── rules.md           # Security rules
└── README.md          # Detailed setup guide
```

## Usage

### In Components

```typescript
import { useAuth } from '@/lib/firebase/hooks';
import { upsertProfile, getProfile } from '@/lib/firebase/storage';

function MyComponent() {
  const { user, loading, isAuthenticated } = useAuth();
  
  if (loading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please sign in</div>;
  
  // Use Firestore functions
  const handleSave = async () => {
    await upsertProfile({
      id: 'ALY-12345678',
      userId: user.uid,
      firstName: 'John',
      // ...
    });
  };
}
```

### Migration from localStorage

```typescript
import { migrateLocalStorageToFirestore, needsMigration } from '@/lib/firebase/migration';
import { useAuth } from '@/lib/firebase/hooks';

function MigrationComponent() {
  const { user } = useAuth();
  
  useEffect(() => {
    if (user && needsMigration()) {
      migrateLocalStorageToFirestore(user.uid);
    }
  }, [user]);
}
```

## API Reference

### Authentication

- `initializeRecaptcha()` - Set up reCAPTCHA for phone auth
- `sendPhoneVerificationCode()` - Send SMS code
- `verifyPhoneCode()` - Verify code and sign in
- `getCurrentUser()` - Get current user
- `signOut()` - Sign out
- `onAuthChange()` - Listen to auth state

### Profiles

- `upsertProfile(profile)` - Create or update profile
- `getProfile(id)` - Get profile by ID
- `getPrimaryProfile(userId)` - Get user's primary profile
- `listProfiles(userId, familyOnly)` - List user's profiles
- `deleteProfile(id)` - Delete profile

### Shared Venues

- `addShared(userId, entry)` - Add shared venue entry
- `listShared(userId)` - List shared venues

### Settings

- `getSettings(userId)` - Get user settings
- `updateSettings(userId, settings)` - Update settings

## Environment Variables

Required in `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## Security Rules

Firestore security rules are in `lib/firebase/rules.md`. Copy them to Firebase Console.

Rules ensure:
- Users can only read/write their own data
- Public profiles can be read by anyone (for venue view)
- All writes require authentication

## Troubleshooting

### "Firestore not initialized"
- Check environment variables are set
- Restart dev server after adding env vars
- Verify `NEXT_PUBLIC_` prefix is used

### Permission denied
- Check Firestore security rules
- Verify user is authenticated
- Check rules match your data structure

### Phone auth not working
- Enable Phone provider in Firebase Console
- Set up reCAPTCHA
- Add domain to authorized domains

## Next Steps

1. Update components to use Firestore functions
2. Replace localStorage calls with Firestore
3. Test authentication flow
4. Test data persistence
5. Deploy and test in production
