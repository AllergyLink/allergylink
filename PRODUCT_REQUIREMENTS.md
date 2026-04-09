# AllergyLink — Product Requirements Document (PRD)

**Version:** 1.0  
**Last updated:** April 2026  
**Status:** MVP — local-first prototype

---

## 1. Executive summary

**AllergyLink** is a mobile-first Progressive Web App (PWA) that helps people create, maintain, and share a clear allergy and dietary profile using a unique **Allergy ID** and **QR code**. The first release stores data on the device only, with architecture ready to connect to a backend later.

---

## 2. Goals and non-goals

### 2.1 Goals (MVP)

- Let a user create and edit a rich allergy/dietary profile.
- Generate a **unique Allergy ID** per profile and show a **scannable QR code** for that ID.
- Support **multiple profiles** for family/caregiver scenarios (e.g., parent managing children).
- Track a **“Shared with”** list (who received the profile, how, and when), with a placeholder for future “push updates.”
- Deliver a **calm, trustworthy, simple** mobile UX with bottom navigation where appropriate.
- Ship as **PWA-ready** (installable, offline-capable baseline via service worker where supported).

### 2.2 Non-goals (MVP)

- Real authentication, accounts, or cloud sync.
- Real SMS/email delivery or venue integrations.
- Medical certification or regulatory compliance claims beyond clear UX copy.

---

## 3. Personas

| Persona | Needs |
|--------|--------|
| **Individual** | One profile, quick share, easy updates. |
| **Parent / caregiver** | Multiple profiles, clear ownership, share child’s profile safely. |
| **Venue staff (indirect)** | Receive consistent, readable allergy info (simulated via shared ID/QR view). |

---

## 4. Core user value

1. Create a personal (or dependent) allergy profile in minutes.  
2. Receive a **unique Allergy ID** and **QR code** tied to that profile.  
3. Share information **clearly** (ID, QR, summary).  
4. **Update** the profile anytime; data persists locally.  
5. **Track** who has been recorded as having received the profile (manual log for MVP).  
6. **Manage family profiles** from one place.

---

## 5. Functional requirements

### 5.1 Home screen

- Strong **value proposition** (headline + short supporting copy).
- Primary actions: **Sign in (placeholder)** and **Create profile** (or continue if already set up).
- Link or entry to **Family** and **Settings** as appropriate without clutter.

### 5.2 Authentication (placeholder)

- Simple **local-only** flow: e.g. name + optional email, stored in `localStorage`.
- No passwords, no server validation.
- Clear labeling that this is **not real security** — convenience for demo/MVP.

### 5.3 Create profile

Collect (all persisted locally):

| Field | Required |
|-------|----------|
| First name | Yes |
| Last name | Yes |
| Date of birth | No |
| Allergies (list) | Yes (at least one or explicit “none” — product decision: allow empty with confirmation) |
| Dietary restrictions | Optional list |
| Intolerances | Optional list |
| Sensitivities | Optional list |
| Medications / emergency notes | Optional |
| Emergency contact (name, phone, relationship optional) | Yes for name + phone in MVP for safety UX |
| Preferred display format | e.g. compact vs detailed |

On save: generate **Allergy ID** (unique string, human-readable), associate with profile.

### 5.4 Allergy ID / profile view

- Display **Allergy ID** prominently.
- Show **QR code** encoding a share URL or ID string (consistent scheme documented in code).
- **Summary** of allergies, restrictions, intolerances, sensitivities.
- **Emergency** block (contact + notes).
- **Share-friendly** layout (readable contrast, logical order).
- Actions: **Edit**, **Shared with**, **Family** (if applicable).

### 5.5 Edit profile

- Same fields as create; **load existing** values.
- **Save** writes to local storage; show light confirmation.

### 5.6 Shared with

- List of entries: **recipient label** (e.g. restaurant name, school), **venue category**, **method** (QR / link / ID / other), **date shared**.
- **Future-ready**: toggle or placeholder labeled **“Push updates”** (stored locally; no real push in MVP).

### 5.7 Family / caregiver management

- **Dashboard** of profiles: self + dependents.
- Add **dependent profile** (minimal extra fields; same profile model with `managedBy` / `isDependent` flags).
- Indicate whether profile can be **shared independently** vs **caregiver-managed** (boolean + short explanation in UI).

### 5.8 Venue categories

Used when logging shares (and filters later). Categories:

- Restaurants  
- Schools  
- Camps  
- Workplaces  
- Hotels  
- Airlines  
- Private events  
- Friends / family  

---

## 6. UX requirements

- **Mobile-first**; comfortable on small screens; usable on desktop.
- **Calm, trustworthy** visual tone: generous spacing, clear hierarchy, limited color palette.
- **Bottom navigation** for primary sections: Home, Profile (ID), Shared, Family.
- **Accessibility**: semantic headings, visible focus, sufficient touch targets (min ~44px), readable base font size.
- **Navigation**: shallow depth; back affordances on inner screens.

---

## 7. Technical requirements

| Area | Requirement |
|------|-------------|
| Framework | React 18+ |
| Build | Vite |
| Styling | Tailwind CSS |
| State | React state + `localStorage` (structured JSON) |
| QR | Client-side generation (e.g. QR library) |
| PWA | `vite-plugin-pwa` (or equivalent): manifest + service worker |
| Structure | Modular folders: `components`, `pages` or `routes`, `lib`, `hooks` |
| Future API | Centralize data access in `lib/` services behind small interfaces |

---

## 8. Data model (conceptual)

- **Session**: placeholder user id / display name.  
- **Profile**: id, allergyId, demographics, medical/diet fields, emergency, display preference, dependent flags.  
- **ShareRecord**: id, profileId, recipient, category, method, date, pushUpdatesPlaceholder.

---

## 9. Success criteria (MVP)

- User can complete **placeholder sign-in**, **create/edit profile**, see **ID + QR**, add **shared-with** rows, and manage **multiple profiles** without crashes.
- App **installs** as PWA on supported mobile browsers (manifest + SW).
- **No backend** required to demo full flow.

---

## 10. Risks and mitigations

| Risk | Mitigation |
|------|------------|
| Users think local data is cloud-backed | Copy: “Saved on this device only.” |
| QR opens wrong URL in prod | Centralize base URL in one config for future env. |

---

## 11. Out of scope for this document

- Backend API design, auth providers, push notification providers, and legal/privacy policy text beyond high-level intent.

---

## 12. Appendix: screen map (MVP)

1. Home  
2. Sign-in (placeholder)  
3. Create / edit profile  
4. Allergy ID (QR + summary)  
5. Shared with (+ add entry)  
6. Family dashboard (+ add dependent)  
7. Settings (optional: clear data, about)
