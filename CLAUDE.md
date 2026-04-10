# AllergyLink — Project Description for Claude

## What This Project Is

AllergyLink is a mobile-first Progressive Web App (PWA) that helps people with food allergies create a shareable **Allergy ID** and **QR code** representing their allergy and dietary profile. The core use case: a guest at a restaurant, school, camp, or event can show or scan their QR code so the venue instantly knows exactly what they can and can't eat — reducing miscommunication and safety risk.

## Primary Audience

The **primary customer is venues and businesses** — restaurants, schools, camps, hotels, airlines, and event organizers. They are the ones who benefit most from receiving structured, reliable allergy information. Individual users and families are the *supply side* of the marketplace; venues are the *demand side* driving the business model.

## Current Development Phase

We are actively **building the backend**. The MVP frontend is largely complete and functional, running on **localStorage** for data persistence. The immediate priority is connecting it to a real backend using **Supabase** (Postgres + Auth + Storage).

This is an **MVP** — the goal is to demonstrate as much working functionality as possible, cleanly and simply. Do not over-engineer. Favor shipping working features over perfect architecture.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS
- **State**: React Query (TanStack), React Hook Form, Zod for validation
- **QR Code**: `qrcode` library (client-side generation)
- **PWA**: `next-pwa` with service worker caching
- **Backend (in progress)**: Supabase — Postgres database, Supabase Auth, Supabase Storage
- **Deployment**: Vercel (primary), GitHub Pages (static fallback)
- **API Base URL**: `https://api.allergylink.net`

## Data Architecture

The app is structured around these core entities:

- **User** — authenticated account (email or phone)
- **Profile** — one or more allergy profiles per user (primary + family members)
  - Includes: name, avatar, allergies with severity, dietary restrictions, emergency contact, Allergy ID
- **Allergy ID** — unique human-readable ID per profile (format: `ALY-XXXXXXXX`), linked to a public QR-scannable URL
- **ShareSession** — a log entry created when a profile is shared with a venue
- **Venue** — entity that received a shared profile

## Key Features (MVP Scope)

1. User sign-up / sign-in (Supabase Auth)
2. Onboarding wizard (5 steps: name/avatar → allergies → severity → dietary → review)
3. Allergy ID generation and QR code display
4. Profile sharing (QR scan, link, copy ID)
5. Family profile management (primary + dependent profiles with guardian controls)
6. Share history / venues list
7. Public profile view (scannable by venue without login)

## What Claude Should Prioritize

- **Backend integration with Supabase** is the current top priority — replacing localStorage with real auth, database reads/writes, and storage
- Keep code simple and minimal; this is an MVP
- Demonstrate maximum functionality — a working end-to-end flow matters more than polish
- Mobile-first at all times — always test/consider the mobile layout

## What Claude Should Be Careful About

- **Health data is sensitive** — allergy information is personal health data. Be thoughtful about how it's stored, who can access it, and what's exposed publicly via QR/share URLs
- **Don't break existing flows** — the onboarding, dashboard, QR display, and sharing modals are working. Changes to these should be additive or clearly scoped
- **Keep it simple** — avoid over-abstraction, unnecessary dependencies, or premature optimization. The goal is a clean, working MVP

## File Structure Overview

```
/app              — Next.js App Router pages and layouts
/components       — React components (navigation, QR, profile, sharing, UI)
/lib              — Business logic, types, storage utilities, API client
/public           — Static assets, PWA manifest, icons
```

Key files:
- `lib/types/index.ts` — core TypeScript types (Profile, Allergy, ShareSession, etc.)
- `lib/storage.ts` — localStorage utilities (to be replaced with Supabase calls)
- `lib/api.ts` — Axios client pointed at `api.allergylink.net`
- `app/onboarding/` — unified 5-step onboarding wizard
- `app/dashboard/` — main user dashboard
- `app/id/` — Allergy ID and QR code display + public share view

## Supabase Integration Notes

- Supabase MCP is connected and available
- Auth: Use Supabase Auth (email/phone OTP preferred for mobile UX)
- Database: Mirror the existing TypeScript types into Postgres tables
- Storage: Use Supabase Storage for avatar images
- RLS (Row Level Security): Enable on all tables — users should only access their own profiles; public share URLs should allow unauthenticated reads of specific profile fields only

## Coding Conventions

- TypeScript throughout — no `any` types
- Tailwind for all styling — no inline styles or CSS modules unless necessary
- React Query for all async data — don't use raw useEffect for data fetching
- Zod schemas for all form validation
- Prefer small, focused components over large monolithic ones
