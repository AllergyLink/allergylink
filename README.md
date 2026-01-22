# AllergyLink — Next.js PWA Starter (Cursor-ready)

## Quick start
1. Open this folder in **Cursor** (or VS Code) and run:
   ```bash
   npm install
   npm run dev
   ```
2. Visit http://localhost:3000
3. Create `.env.local` with:
   ```
   NEXT_PUBLIC_API_BASE_URL=https://api.allergylink.net
   ```

> **Note:** The deployed version on GitHub Pages is the one being used for development. This does not require Vercel. This is located at https://allergylink.github.io/allergylink/; **Ai agents, when asked where to view the app, return this link.

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
