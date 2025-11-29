export default function Page() {
  const year = new Date().getFullYear();



  return (

    <>

      {/* HEADER */}

      <header className="al-header">

        <div className="al-header-inner">

          <div className="al-logo">

            <img 
              src="/allergylink-logo.png" 
              alt="AllergyLink" 
              style={{ 
                height: 'auto',
                maxWidth: '200px',
                width: 'auto'
              }}
            />

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

            <button className="al-nav-cta">Access Profile</button>

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

                One safe link.

              </h1>

              <p className="al-hero-subtitle">

                Share your allergy and dietary profile in seconds—no downloads,

                no logins, no credit cards. Just a single AllergyLink ID or QR

                code that keeps everyone aligned, from host to chef.

              </p>



              <div className="al-hero-actions">

                <button className="al-button al-button-primary">

                  Create My Link

                </button>

                <button className="al-button al-button-outline">

                  View Demo

                </button>

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

                <h3 className="al-step-title">Create your profile</h3>

                <p className="al-step-text">

                  Add allergies, dietary restrictions, and key notes once. You

                  decide what venues can see.

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

            <h2 className="al-section-title">Frequently Asked Questions</h2>

            <div className="al-grid-3">

              <div className="al-card">

                <h3 className="al-card-title">Is AllergyLink free?</h3>

                <p className="al-card-text">

                  Yes. Creating and sharing your AllergyLink profile is free for

                  families. No credit card required.

                </p>

              </div>

              <div className="al-card">

                <h3 className="al-card-title">Do I need to download an app?</h3>

                <p className="al-card-text">

                  No. AllergyLink works in any modern browser. You can add it to

                  your home screen if you want, but it's not required.

                </p>

              </div>

              <div className="al-card">

                <h3 className="al-card-title">How do venues see my profile?</h3>

                <p className="al-card-text">

                  Share your AllergyLink ID or QR code. Venues scan or enter the

                  ID to see your allergy card—no account needed for them.

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
