'use client';

import Logo from '@/components/Logo';
import Link from 'next/link';
import UnifiedNavigation from '@/components/UnifiedNavigation';

export default function Page() {
  const year = new Date().getFullYear();



  return (

    <>

      <UnifiedNavigation />

      {/* HEADER (for homepage only, kept for styling) */}
      <header className="al-header" style={{ display: 'none' }}>

        <div className="al-header-inner">

          <div className="al-logo">

            <Logo size={200} showTagline={false} />

          </div>



          <nav className="al-nav">

            <a href="#how" className="al-nav-link">

              How It Works

            </a>

            <a href="#demo-dashboard" className="al-nav-link">

              Demo Dashboard

            </a>

            <a href="#venues" className="al-nav-link">

              For Venues

            </a>

            <a href="#faq" className="al-nav-link">

              FAQ

            </a>

            <a href="#support" className="al-nav-link">

              Support

            </a>

            <Link href="/auth/sign-in" className="al-nav-cta" style={{ textDecoration: 'none', display: 'inline-block' }}>Access Profile</Link>

          </nav>

        </div>

      </header>



      <main>

        <div className="al-shell">

          {/* HERO */}

          <section className="al-hero">

            <div className="al-hero-text">

              <div className="al-hero-highlight">

                <span>✔</span>

                <span>No App. No Passwords. No payment.</span>

              </div>

              <h1 className="al-hero-title">

                All your allergies.

                <br />

                Share in an instant.

              </h1>

              <p className="al-hero-subtitle">

                Share your allergy and dietary profile in seconds—no downloads,

                no logins, no credit cards. Just a single AllergyLink ID or QR

                code that keeps everyone aligned, from host to chef.

              </p>



              <div className="al-hero-actions">

                <Link href="/auth/sign-in" className="al-button al-button-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>

                  Create My Link

                </Link>

                <a href="#demo-dashboard" className="al-button al-button-outline" style={{ textDecoration: 'none', display: 'inline-block' }}>

                  View Demo

                </a>

              </div>



              <ul className="al-hero-list">

                <li>Works at restaurants, hotels, schools, camps, and events.</li>

                <li>Guests stay in control. Venues see only what they need.</li>

                <li>Runs in any modern browser—nothing to install.</li>

              </ul>

            </div>



            {/* SAMPLE PROFILE CARD */}

            <aside className="al-profile-card" aria-label="Sample AllergyLink profile">

              <div className="al-profile-header">

                <div className="al-avatar">M</div>

                <div>

                  <div className="al-profile-name">Madeline</div>

                  <div className="al-profile-allergies">

                    Peanut • Dairy • Soy

                  </div>

                </div>

              </div>



              <div className="al-profile-meta">

                <div className="al-profile-label">Sample profile</div>

                <div>QR code for sharing with venues</div>

                <div className="al-qr-box">QR</div>

              </div>



              <div className="al-profile-id-block">

                <div className="al-profile-label">AllergyLink ID</div>

                <div className="al-profile-id">ALY-12345678</div>

              </div>



              <div className="al-profile-actions">

                <button className="al-button al-button-small">

                  Copy ID

                </button>

                <button className="al-button al-button-small al-button-outline">

                  Share Profile

                </button>

              </div>



              <div className="al-profile-shared">

                <div className="al-profile-label">Shared with (example)</div>

                <div className="al-profile-venue">

                  Green Leaf Café — Boston, MA

                </div>

                <div className="al-profile-date">

                  Oct 18, {year} • Safe visit recorded

                </div>

              </div>

            </aside>

          </section>



          {/* HOW IT WORKS */}

          <section id="how" className="al-section">

            <h2 className="al-section-title">How AllergyLink works</h2>

            <p className="al-section-intro">

              Designed to feel simple for families and crystal-clear for venues.

              No apps to install. No accounts for restaurants to manage. Just a

              clear allergy card, shared in seconds.

            </p>



            <div className="al-steps">

              <div className="al-step">

                <div className="al-step-number">1</div>

                <h3 className="al-step-title">Enter your phone number</h3>

                <p className="al-step-text">

                  No username or password. We use a one-time code to protect

                  your AllergyLink account.

                </p>

              </div>

              <div className="al-step">

                <div className="al-step-number">2</div>

                <h3 className="al-step-title">Complete quick onboarding</h3>

                <p className="al-step-text">

                  Our simple 5-step wizard guides you through creating your

                  profile. Takes less than 3 minutes.

                </p>

              </div>

              <div className="al-step">

                <div className="al-step-number">3</div>

                <h3 className="al-step-title">Add family profiles</h3>

                <p className="al-step-text">

                  Store profiles for kids, partners, or parents. Switch between

                  them when sharing a QR code or ID.

                </p>

              </div>

              <div className="al-step">

                <div className="al-step-number">4</div>

                <h3 className="al-step-title">Share with one tap</h3>

                <p className="al-step-text">

                  Show your AllergyLink ID or QR code. Venues see a clear allergy

                  card before any order is placed.

                </p>

              </div>

            </div>

          </section>



          {/* DEMO DASHBOARD */}

          <section id="demo-dashboard" className="al-section">

            <h2 className="al-section-title">Demo Dashboard</h2>

            <p className="al-section-intro">

              See what your AllergyLink dashboard looks like after creating a

              profile.

            </p>



            <div className="al-dashboard">

              <div className="al-dashboard-panel">

                <h3 className="al-dashboard-title">My Profiles</h3>

                <p className="al-dashboard-subtitle">

                  Manage your personal and family allergy profiles

                </p>

                <div className="al-profile-list">

                  <div className="al-profile-row">

                    <div className="al-profile-row-left">

                      <div className="al-mini-avatar">M</div>

                      <div>

                        <div className="al-profile-row-name">Madeline</div>

                        <div className="al-profile-row-allergies">

                          Peanut • Dairy • Soy

                        </div>

                      </div>

                    </div>

                    <span className="al-badge-primary">Primary</span>

                  </div>

                  <div className="al-profile-row">

                    <div className="al-profile-row-left">

                      <div className="al-mini-avatar">E</div>

                      <div>

                        <div className="al-profile-row-name">Emma</div>

                        <div className="al-profile-row-allergies">

                          Gluten • Egg

                        </div>

                      </div>

                    </div>

                    <span className="al-badge-secondary">Family</span>

                  </div>

                </div>

              </div>



              <div className="al-dashboard-panel">

                <h3 className="al-dashboard-title">Shared Venues</h3>

                <p className="al-dashboard-subtitle">

                  Venues where you've shared your AllergyLink profile

                </p>

                <div className="al-profile-list">

                  <div className="al-profile-row">

                    <div>

                      <div className="al-profile-row-name">

                        Green Leaf Café

                      </div>

                      <div className="al-profile-row-allergies">

                        Boston, MA • Oct 18, {year}

                      </div>

                    </div>

                    <span className="al-badge-primary">Active</span>

                  </div>

                  <div className="al-profile-row">

                    <div>

                      <div className="al-profile-row-name">Summer Camp</div>

                      <div className="al-profile-row-allergies">

                        Portland, OR • Sep 5, {year}

                      </div>

                    </div>

                    <span className="al-badge-secondary">Archived</span>

                  </div>

                </div>

              </div>

            </div>

          </section>



          {/* FOR VENUES */}

          <section id="venues" className="al-section">

            <h2 className="al-section-title">For Venues</h2>

            <p className="al-section-intro">

              Make service safer and faster for guests with allergies. No app

              downloads or account management required.

            </p>



            <div className="al-grid-3">

              <div className="al-card">

                <h3 className="al-card-title">Instant guest sharing</h3>

                <p className="al-card-text">

                  Guests share their AllergyLink ID or QR code. You see a clear

                  allergy card instantly—no forms, no confusion.

                </p>

              </div>

              <div className="al-card">

                <h3 className="al-card-title">Front & back of house</h3>

                <p className="al-card-text">

                  Share allergy information with kitchen staff in seconds. Keep

                  everyone aligned on dietary restrictions.

                </p>

              </div>

              <div className="al-card">

                <h3 className="al-card-title">Record safe experiences</h3>

                <p className="al-card-text">

                  Track which guests had safe visits. Build trust and show

                  families you take allergies seriously.

                </p>

              </div>

            </div>

          </section>



          {/* FAQ */}

          <section id="faq" className="al-section">
            <h2 className="al-section-title">AllergyLink – Official FAQ</h2>
            <p className="al-section-intro">
              Answers for individuals, families, and venues using AllergyLink to communicate
              allergies safely.
            </p>

            {/* Core FAQ */}
            <div className="al-card" style={{ marginBottom: 24 }}>
              <ol style={{ paddingLeft: 20, margin: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li>
                  <strong>What is AllergyLink?</strong>
                  <p className="al-card-text">
                    AllergyLink is a secure, universal, and mobile-friendly profile that instantly
                    communicates food allergies and dietary restrictions to restaurants, venues,
                    schools, events, and more—using a unique AllergyLink ID or QR code. No apps,
                    downloads, or log-ins are required.
                  </p>
                </li>
                <li>
                  <strong>How does AllergyLink work?</strong>
                  <p className="al-card-text">
                    Create a profile once. Then share your AllergyLink ID or QR code anywhere.
                    The receiving venue sees the exact allergy and cross-contact requirements
                    immediately—no explanations, no errors, and no confusion.
                  </p>
                </li>
                <li>
                  <strong>Do venues need an account to use AllergyLink?</strong>
                  <p className="al-card-text">
                    No. Any venue can scan the QR code or enter the ID to view your allergy
                    profile securely. No login, no subscription, no hardware required.
                  </p>
                </li>
                <li>
                  <strong>Is AllergyLink free for individuals and families?</strong>
                  <p className="al-card-text">
                    Yes. Creating and using an AllergyLink profile is free. Premium features
                    (subscriptions, saved venues, alerts, emergency contact sync) may be added in
                    the future, but everything required for safety is free.
                  </p>
                </li>
                <li>
                  <strong>Who uses AllergyLink?</strong>
                  <p className="al-card-text">
                    AllergyLink is designed for individuals with food allergies or intolerances,
                    parents, restaurants, schools, camps, travel, events, and anyone who wants a
                    fast, accurate way to communicate allergy needs.
                  </p>
                </li>
                <li>
                  <strong>What allergens can I add to my profile?</strong>
                  <p className="al-card-text">
                    You can add all 9 major US allergens, additional common allergens, dietary
                    restrictions, cross-contact rules, bee stings and medication alerts, and
                    emergency information.
                  </p>
                </li>
                <li>
                  <strong>How do I share my AllergyLink profile at a restaurant or event?</strong>
                  <p className="al-card-text">
                    Show your QR code, share your AllergyLink ID, or tap “Share Profile” and send
                    via text or email. It takes seconds.
                  </p>
                </li>
                <li>
                  <strong>Do venues get notified if I update my allergies?</strong>
                  <p className="al-card-text">
                    Yes. Any venue that has viewed your profile will automatically receive profile
                    updates the next time your ID is scanned or opened.
                  </p>
                </li>
                <li>
                  <strong>Can I add multiple profiles?</strong>
                  <p className="al-card-text">
                    Yes. You can create profiles for children, spouses, travel companions, care
                    recipients, and multiple household members—then switch profiles in one tap.
                  </p>
                </li>
                <li>
                  <strong>What do venues see?</strong>
                  <p className="al-card-text">
                    Only the allergy-safety profile: name (optional), photo or avatar (optional),
                    all allergens and cross-contact rules, and emergency instructions. No personal
                    or private data is shared.
                  </p>
                </li>
                <li>
                  <strong>Do I need to download an app?</strong>
                  <p className="al-card-text">
                    No. AllergyLink works instantly on any device and browser. It’s a PWA, so you
                    can add it to your home screen if you want, but it’s not required.
                  </p>
                </li>
                <li>
                  <strong>Is my allergy information secure?</strong>
                  <p className="al-card-text">
                    Yes. AllergyLink never shares your information without your permission. Your
                    data is encrypted and stored securely.
                  </p>
                </li>
                <li>
                  <strong>How accurate are the allergy definitions?</strong>
                  <p className="al-card-text">
                    Allergens follow FDA and FARE guidelines and industry-standard classifications.
                    You can also add custom allergens and restrictions.
                  </p>
                </li>
                <li>
                  <strong>Can AllergyLink prevent food reactions?</strong>
                  <p className="al-card-text">
                    AllergyLink dramatically reduces miscommunication and risk by providing clear
                    allergen information, visual markers, standardized language, and emergency
                    instructions. However, no service can fully eliminate human or food-handling
                    error.
                  </p>
                </li>
                <li>
                  <strong>What if the venue is not AllergyLink-enabled?</strong>
                  <p className="al-card-text">
                    You can still share your profile instantly. The platform works everywhere,
                    regardless of whether the venue is enrolled.
                  </p>
                </li>
                <li>
                  <strong>Do restaurants need special technology?</strong>
                  <p className="al-card-text">
                    No. They can view the profile on any phone or tablet, access the QR or ID
                    from text, and optionally integrate with POS later.
                  </p>
                </li>
                <li>
                  <strong>Can I use AllergyLink internationally?</strong>
                  <p className="al-card-text">
                    Yes. AllergyLink can be used anywhere. International versions will continue
                    expanding food allergen definitions and regional guidance.
                  </p>
                </li>
                <li>
                  <strong>What if I make a mistake in my profile?</strong>
                  <p className="al-card-text">
                    You can edit your profile anytime. Venues see updated information
                    automatically the next time they open your link.
                  </p>
                </li>
                <li>
                  <strong>Why does this exist?</strong>
                  <p className="al-card-text">
                    Because allergies are life-threatening and mistakes happen when guests have to
                    explain verbally or rely on others to remember allergy rules. AllergyLink
                    removes risk and confusion by standardizing the message.
                  </p>
                </li>
                <li>
                  <strong>What if a venue has questions or needs training?</strong>
                  <p className="al-card-text">
                    Venues can access a quick-training guide, support resources, best-practice
                    templates, and live onboarding (coming soon).
                  </p>
                </li>
              </ol>
            </div>

            {/* Venue & Parents FAQ callouts */}
            <div className="al-grid-3">
              <div className="al-card">
                <h3 className="al-card-title">For Venues</h3>
                <p className="al-card-text">
                  AllergyLink fits into your existing service flow. Staff can scan or tap a link
                  to see clear allergy requirements before an order is placed—no new hardware
                  required.
                </p>
                <p className="al-card-text">
                  Use it to brief FOH and BOH, reduce miscommunication, and show guests that you
                  take allergy safety seriously.
                </p>
              </div>

              <div className="al-card">
                <h3 className="al-card-title">For Parents & Families</h3>
                <p className="al-card-text">
                  Create profiles for each child, add emergency instructions, and share a single
                  QR code or link with schools, camps, birthday parties, and caregivers.
                </p>
                <p className="al-card-text">
                  Update once, and everyone scanning the code will always see the latest
                  information.
                </p>
              </div>

              <div className="al-card">
                <h3 className="al-card-title">Need a dedicated venue or parent FAQ?</h3>
                <p className="al-card-text">
                  We’re building expanded FAQ views just for restaurants and caregivers, with
                  playbooks your teams can use during training and onboarding.
                </p>
              </div>
            </div>
          </section>



          {/* SUPPORT */}

          <section id="support" className="al-section al-section-narrow">

            <h2 className="al-section-title">Support</h2>

            <p className="al-section-intro">

              Have questions? We're here to help.

            </p>

            <div className="al-support-email">

              <p>

                Email us at{" "}

                <a href="mailto:support@allergylink.com">

                  support@allergylink.com

                </a>

              </p>

            </div>

          </section>



          {/* FOOTER */}

          <footer className="al-footer">

            <div>© {year} AllergyLink. All rights reserved.</div>

            <div className="al-footer-links">

              <a href="#faq">FAQ</a>

              <span>•</span>

              <a href="#support">Support</a>

            </div>

          </footer>

        </div>

    </main>

    </>

  );

}
