# AllergyLink — Screen-by-Screen UX Reference

Use this with your **AllergyLink App UI Mockup Prompts** PDF. Each screen below has a URL, the file to edit, and what’s on it so you can match mockup → screen → file and plan UX changes.

---

## How to use this with your mockup PDF

1. Open the PDF next to this file (or on a second monitor).
2. For each mockup screen in the PDF, find the matching row in the table below.
3. The **File to edit** column tells you which file to change for that screen.
4. Use the **What’s on this screen** notes to confirm you have the right screen.

---

## App flow (typical user path)

| # | Screen name        | URL path              | File to edit                    | What’s on this screen |
|---|--------------------|------------------------|----------------------------------|------------------------|
| 1 | **Welcome / Home** | `/`                    | `app/page.tsx`                   | Hero, “Shared in an instant,” sample profile (Anna), How it works, Demo Dashboard CTA |
| 2 | **Sign in**        | `/auth/sign-in`        | `app/auth/sign-in/page.tsx`      | Phone number sign-in, one-time code |
| 3 | **Sign up**        | `/auth/sign-up`        | `app/auth/sign-up/page.tsx`      | Registration |
| 4 | **Onboarding start** | `/onboarding`        | `app/onboarding/page.tsx`       | Start of 5-step wizard |
| 5 | **Onboarding – Basics** | `/onboarding/basics` | `app/onboarding/basics/page.tsx` | Name, basic info |
| 6 | **Onboarding – Food allergies** | `/onboarding/food-allergies` | `app/onboarding/food-allergies/page.tsx` | Food allergy selection |
| 7 | **Onboarding – Restrictions** | `/onboarding/restrictions` | `app/onboarding/restrictions/page.tsx` | Dietary restrictions |
| 8 | **Onboarding – Sensitivities** | `/onboarding/sensitivities` | `app/onboarding/sensitivities/page.tsx` | Sensitivities |
| 9 | **Onboarding – Emergency** | `/onboarding/emergency` | `app/onboarding/emergency/page.tsx` | Emergency contact / info |
|10 | **Onboarding – Review** | `/onboarding/review` | `app/onboarding/review/page.tsx` | Review and submit profile |
|11 | **Dashboard**     | `/dashboard`            | `app/dashboard/page.tsx`        | Main hub: QR code, profile summary, quick actions |
|12 | **Dashboard – Venues** | `/dashboard/venues` | `app/dashboard/venues/page.tsx`  | Venues list / shared venues |
|13 | **My profile / ID** | `/id`                 | `app/id/page.tsx`                | AllergyLink ID, QR code, copy/share |
|14 | **Share profile** | `/id/share`            | `app/id/share/page.tsx`          | Share view (e.g. for venues) |
|15 | **Create profile** | `/create`             | `app/create/page.tsx`            | Create new profile flow |
|16 | **Family**        | `/family`              | `app/family/page.tsx`            | Family members / profiles |
|17 | **Venues**        | `/venues`              | `app/venues/page.tsx`             | Venues discovery / list |
|18 | **Enabled venues** | `/enabled-venues`    | `app/enabled-venues/page.tsx`     | Venues that use AllergyLink |
|19 | **Settings**      | `/settings`            | `app/settings/page.tsx`           | Account and app settings |
|20 | **Trusted supporters** | `/trusted-supporters` | `app/trusted-supporters/page.tsx` | Trusted supporters list |
|21 | **Entities**      | `/entities`           | `app/entities/page.tsx`          | Entities (e.g. venues) |
|22 | **Error states**  | `/error-states`       | `app/error-states/page.tsx`      | Error / empty state examples |
|23 | **Offline**       | `/offline`             | `app/offline/page.tsx`            | Offline message |

---

## Shared layout and navigation

- **Layout (wraps all pages):** `app/layout.tsx` — header, nav, footer, global styles.
- **Unified nav (if used):** `components/UnifiedNavigation.tsx` — top/bottom nav, menu items.
- **Global styles:** `app/globals.css` — colors, spacing, typography.

---

## Quick tips for UX changes

- **Copy/layout from mockup:** Edit the **File to edit** for that screen; keep the URL the same unless you want a new route.
- **Change order of onboarding steps:** Update links in `app/onboarding/page.tsx` and the step components.
- **Change look and feel everywhere:** Start with `app/globals.css` and `app/layout.tsx`, then each screen’s `page.tsx`.
- **Add a new screen:** Add a folder under `app/` (e.g. `app/new-screen/page.tsx`); add the URL and file to this table.

---

*Match each mockup in your PDF to a row above, then edit the listed file to make the UX match.*
