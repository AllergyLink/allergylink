# AllergyLink — Next.js PWA Starter (Cursor-ready)

## Quick start
1. Open this folder in **Cursor** (or VS Code) and run:
   ```bash
   npm install
   npm run dev
   ```
2. Visit http://localhost:3000

## Firebase Setup (Required for Backend)

This app uses Firebase Firestore for data persistence. See [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) for complete setup instructions.

**Quick setup:**
1. Create Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Phone provider) and Firestore Database
3. Copy `.env.local.example` to `.env.local` and add your Firebase config
4. Set up Firestore security rules (see `lib/firebase/rules.md`)

**Environment variables needed:**
```env
NEXT_PUBLIC_FIREBASE_API_KEY=...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
NEXT_PUBLIC_FIREBASE_PROJECT_ID=...
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=...
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=...
NEXT_PUBLIC_FIREBASE_APP_ID=...
```

## Deploy (Vercel)
- Push to GitHub and import the repo in Vercel.
- Add `NEXT_PUBLIC_API_BASE_URL` in Vercel → Project → Settings → Environment Variables.
- Map domains:
  - `app.allergylink.net` → this app
  - `id.allergylink.net` → also this app (public QR views)
  - `api.allergylink.net` → your backend (separate host)

## Routes
- `/` Welcome
- `/auth/sign-in`, `/auth/sign-up`
- `/onboarding/*` steps (basics, food-allergies, restrictions, sensitivities, emergency, review)
- `/id`, `/id/share`
- `/venues`, `/entities`, `/family`, `/settings`, `/error-states`

## Notes
- PWA is enabled (manifest + service worker). On mobile, users can “Add to Home Screen”.
- UI is intentionally minimal (hi‑fi wireframe). Replace components as you refine or paste from Canva.
- Use `lib/api.ts` for API calls; it reads `NEXT_PUBLIC_API_BASE_URL`.
