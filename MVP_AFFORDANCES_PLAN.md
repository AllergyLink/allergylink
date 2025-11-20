# 🎯 AllergyLink MVP Affordances Plan

**Status Overview:** Implementation progress for all MVP affordances

---

## 📊 Status Legend
- ✅ **Done** - Fully implemented and functional
- 🟡 **In Progress** - Partially implemented, needs refinement
- ❌ **Missing** - Not yet implemented
- 🔄 **Needs Review** - Implemented but may need UX/styling improvements

---

## 🌐 GLOBAL AFFORDANCES (ALL PAGES)

### General UX
- ✅ Fast loading, lightweight PWA feel
- ✅ Mobile-first layouts with desktop support
- ✅ Consistent brand colors (blue + mint)
- ✅ Clear, minimalist, intuitive interactions
- ✅ Users always know where they are and what to do next

### Navigation
- ✅ Universal Top Navigation Bar on all pages
- ✅ Clear text links
- ✅ Simple call to action ("Create My Link," "Access Profile")
- ✅ Bottom Personal Navigation Bar (Dashboard only)

### Accessibility
- ✅ Large, easy-to-tap buttons
- 🟡 Accessible labels/alt text (needs audit)
- ✅ Readable text contrast

---

## 🏠 WELCOME PAGE AFFORDANCES

### Hero Section
- ✅ AllergyLink logo at top
- ✅ Friendly headline and subheadline
- ✅ Two clear CTAs: "Create My Link" and "View Demo"
- ✅ Overlapping mobile screens showing profile card and dashboard preview

### Why AllergyLink Section
- ✅ 3-4 feature cards explaining core benefits
- ✅ Quick scanning for parents, users, and venues

### How It Works Section
- ✅ Steps 1-4 displayed visually
- ✅ Smooth scrolling to each step
- ✅ Acts as demo of signup and creation experience

### Venue Preview Section
- ✅ Simple teaser of venue functionality
- ✅ Highlights safety and clarity for restaurants

**Status:** ✅ **COMPLETE**

---

## 📱 PHONE AUTH / ACCESS PROFILE AFFORDANCES

### Phone Number Input
- ✅ Users can enter phone number (UI only)
- ✅ "Send Code" button advances to Step 2

### Code Input
- ✅ Users can type 6-digit mock code (no backend)
- ✅ "Verify" button to proceed

### Navigation After Auth
- ✅ First time: redirect to Create Profile (`/auth/sign-up` → `/create`)
- ✅ Returning: redirect to Dashboard (`/auth/sign-in` → `/dashboard`)

**Status:** ✅ **COMPLETE**

---

## 👤 CREATE PROFILE FLOW AFFORDANCES

### 1. Profile Type
- ✅ Users can select profile type:
  - ✅ Primary Personal Profile
  - ✅ Secondary Personal Profile
  - ✅ Family Profile
- ✅ Toggle: "Make This My Primary Profile"

### 2. Basic Info
- ✅ Users can enter first name
- ✅ Toggle: "Show my name to venues" (name visibility)
- ✅ Users can upload photo or choose/create avatar

### 3. Food Allergies
- ✅ List of top 15 allergens + "Other"
- ✅ Each allergen has:
  - ✅ Photo/icon (emoji symbols)
  - ✅ Toggle for Anaphylactic: Yes/No (via severity)
  - ✅ Toggle for Cross-contamination: OK/Not OK (via severity)
- ✅ Users can add notes (via "Other" allergies)
- 🟡 Notes field per allergen (currently only in "Other" section)

### 4. Dietary Restrictions
- ✅ Users can select from common restrictions:
  - ✅ Vegan, Vegetarian, Gluten Intolerance, Lactose Intolerance, Low Sodium, Cilantro, Cinnamon
- 🟡 Cross-contamination toggle per restriction (mentioned in spec, not fully implemented)

### 5. Emergency Contact (Optional)
- ✅ Users can enter:
  - ✅ Name
  - ✅ Relationship
  - ✅ Phone
  - ✅ Notes
- 🟡 Emergency contact not saved to profile model yet (UI only)

### 6. Save Actions
- ✅ Buttons: "Save Profile" and "Save & Add Family Member"

### 7. Live Preview
- ✅ Right column (or bottom on mobile) updates live showing:
  - ✅ Profile photo/avatar
  - ✅ Allergy chips
  - ✅ Dietary chips
  - ✅ Anaphylaxis/cross-contamination flags
  - ✅ QR Code placeholder
  - ✅ AllergyLink ID placeholder
- 🟡 Preview could be more prominent/always visible

**Status:** 🟡 **MOSTLY COMPLETE** - Needs emergency contact persistence and dietary cross-contamination toggles

---

## 🧭 DASHBOARD AFFORDANCES

### Top: Primary Profile Card
- ✅ Shows avatar/photo
- ✅ Shows first name (if enabled)
- ✅ Displays tags:
  - ✅ "Primary Profile"
  - ✅ Allergy list with icons
  - ✅ Dietary restrictions
- ✅ Shows:
  - ✅ QR Code
  - ✅ AllergyLink ID
  - ✅ Last updated date
- ✅ Buttons:
  - ✅ Copy ID
  - ✅ Show Full QR
  - ✅ Share Profile

### Family Profiles Section
- ✅ Shows list of family members
- ✅ Each family member card allows:
  - ✅ Viewing the allergy card
  - ✅ Sharing the card
  - ✅ Editing the profile
- ✅ Large button/card: "+ Add Family Member"

### Shared Venues & Recipients Section
- ✅ Chronological list of:
  - ✅ Restaurants
  - ✅ Coaches
  - ✅ Schools
  - ✅ Hosts/events
- ✅ Each line shows:
  - ✅ Venue name
  - ✅ City/State
  - ✅ Date shared
  - ✅ "Safe Visit" tag (placeholder)

### Saved / Favorite Venues Section
- ✅ Users can mark venues as favorites (star)
- ✅ Keep simple list of saved places
- ✅ Share AllergyLink ID quickly to any saved venue
- 🟡 Add/remove favorites functionality (UI ready, needs state management)

### Bottom Navigation (Dashboard Only)
- ✅ Tabs include:
  1. ✅ Profile — Shows primary profile card
  2. ✅ Family — Shows all family profiles & edit/add actions
  3. ✅ Venues — Shows Shared + Favorites
  4. ✅ Settings — Allows toggles (name visibility, color theme, etc.)

**Status:** ✅ **COMPLETE** - Minor enhancement needed for favorites state management

---

## 🏷️ PUBLIC ID VIEW (VENUE VIEW) AFFORDANCES

### What Restaurants See
- ✅ Shows profile card clearly and simply
- ✅ No editing allowed
- ✅ Shows:
  - ✅ First name (if enabled)
  - ✅ Allergen list with icons
  - ✅ Anaphylaxis Yes/No
  - ✅ Cross-contamination rules
  - ✅ Dietary restrictions
  - ✅ Notes for kitchen
- ✅ No personal identifying info (phone, last name, etc.)
- ✅ Clear message at bottom: "This information is shared for safety only."
- ✅ "Record Safe Visit" button
- ✅ "Print Profile" button

**Status:** ✅ **COMPLETE**

---

## ⭐ TRUSTED SUPPORTERS PAGE AFFORDANCES

- ✅ Grid of supporter cards
- ✅ Each card displays:
  - ✅ Logo (with fallback to initial)
  - ✅ Brand name
  - ✅ Short description
  - ✅ Radio options:
    - ✅ Yes: Show me relevant promotions
    - ✅ Not now
- ✅ Cards load logos from `/public/logos/...` (paths configured)
- ✅ Responsive and visually consistent layout

**Status:** ✅ **COMPLETE** - Logo files need to be added to `/public/logos/`

---

## ❓ FAQ PAGE AFFORDANCES

- ✅ Expandable Q&A sections (accordion-style)
- ✅ Questions include:
  - ✅ Do I need to download an app?
  - ✅ What info is shared?
  - ✅ Can I add multiple family members?
  - ✅ Plus 5 more common questions
- ✅ Clean, accordion-style display
- ✅ Link to support page

**Status:** ✅ **COMPLETE**

---

## 🛠️ SUPPORT PAGE AFFORDANCES

- ✅ Simple contact form UI
- ✅ Fields:
  - ✅ Name
  - ✅ Email
  - ✅ Message
- ✅ No backend — just UI (demo success state)
- ✅ Direct email link as alternative

**Status:** ✅ **COMPLETE**

---

## 🧾 SETTINGS PAGE AFFORDANCES

- ✅ Toggle for showing user's first name in public ID
- ✅ Toggle for theme (light/mint mode)
- ✅ Simple UI for mock phone number management
- ✅ Profile management links
- ✅ Privacy & security options
- ✅ Live update toggle
- ✅ Bottom navigation

**Status:** ✅ **COMPLETE**

---

## 🧩 GLOBAL COMPONENT AFFORDANCES

### Reusable Components Created
- ✅ **Top Navigation** - Universal navigation bar
- ✅ **Bottom Mobile Navigation** - Dashboard bottom nav
- ✅ **ProfileCard** - Full profile display with QR and actions
- ✅ **FamilyProfileCard** - Compact family member card
- ✅ **VenueListItem** - Shared venue display item
- ✅ **AllergenTag** - Allergen display with image/icon
- ✅ **DietaryRestrictionTag** - Dietary restriction display
- ✅ **QRDisplayBlock** - QR code display (via QR component)
- ✅ **TrustedSupporterCard** - Supporter card with promotion options

**Status:** ✅ **COMPLETE**

---

## 🔄 MISSING / NEEDS WORK

### High Priority
1. ❌ **Emergency Contact Persistence** - Emergency contact data not saved to profile model
2. 🟡 **Dietary Cross-Contamination Toggles** - UI mentions it, but toggles not fully implemented per restriction
3. 🟡 **Allergen Notes Field** - Notes can only be added to "Other" allergies, not standard ones
4. 🟡 **Favorites State Management** - UI exists but needs proper state persistence
5. 🟡 **Live Preview Enhancement** - Could be more prominent/always visible in Create Profile

### Medium Priority
6. 🟡 **Accessibility Audit** - Need to verify all icons/images have proper alt text
7. 🟡 **Profile Type Persistence** - Profile type selection not saved to profile model
8. 🟡 **Name Visibility Persistence** - Name visibility toggle not saved to profile model
9. 🟡 **Theme Persistence** - Theme selection not saved to user preferences

### Low Priority / Nice to Have
10. 🟡 **Logo Files** - Need actual logo images in `/public/logos/` directory
11. 🟡 **Avatar Generation** - Default avatar creation could be more sophisticated
12. 🟡 **Profile Photo Upload** - Currently uses FileReader, could add image optimization
13. 🟡 **Print Styles** - Venue view print button works but could have better print styles

---

## 📈 IMPLEMENTATION SUMMARY

### Overall Status: 🟡 **~90% COMPLETE**

- **Completed:** 8/10 major sections (80%)
- **In Progress:** 2/10 major sections (20%)
- **Missing:** Minor features and persistence layers

### Next Steps (Priority Order)

1. **Add Emergency Contact to Profile Model** - Update `lib/models.ts` and storage
2. **Implement Dietary Cross-Contamination Toggles** - Add per-restriction toggle UI
3. **Add Allergen Notes Field** - Allow notes on all allergens, not just "Other"
4. **Implement Favorites State Management** - Add to storage/local state
5. **Enhance Live Preview** - Make it more prominent in Create Profile flow
6. **Accessibility Audit** - Add missing alt text and ARIA labels
7. **Add Logo Files** - Create placeholder or actual logos in `/public/logos/`

---

## 🎯 MVP READINESS

**Current State:** The app has all major UI affordances implemented. The core user flows work end-to-end. Remaining work is primarily:
- Data persistence for new fields (emergency contact, profile type, etc.)
- Minor UX enhancements (live preview, favorites state)
- Accessibility polish

**Estimated Completion:** 2-3 days of focused work to reach 100% MVP completeness.

---

*Last Updated: Based on current codebase review*
*Next Review: After implementing missing persistence layers*
