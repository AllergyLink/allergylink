'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Venues() {
  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
      <div className="container-wide section">
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <h1>For Restaurants</h1>
          <p style={{ maxWidth: '700px', margin: '0 auto' }}>
            Make service safer and faster for guests with allergies. AllergyLink helps your team serve everyone with confidence.
          </p>
        </div>

        <div className="grid grid-3" style={{ marginBottom: '48px' }}>
          <div className="card">
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'rgba(0, 82, 204, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              fontSize: '2rem'
            }}>
              ⚡
            </div>
            <h3 style={{ marginBottom: '12px' }}>Instant Guest Sharing</h3>
            <p className="text-muted" style={{ margin: 0 }}>
              Scan a QR code or enter an AllergyLink ID to see verified allergy details before an order is placed.
            </p>
          </div>

          <div className="card">
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'rgba(0, 82, 204, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              fontSize: '2rem'
            }}>
              👥
            </div>
            <h3 style={{ marginBottom: '12px' }}>Front & Back of House Ready</h3>
            <p className="text-muted" style={{ margin: 0 }}>
              Give servers, chefs, and managers the same allergy snapshot so everyone is aligned on safety.
            </p>
          </div>

          <div className="card">
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: 'rgba(0, 82, 204, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '20px',
              fontSize: '2rem'
            }}>
              📝
            </div>
            <h3 style={{ marginBottom: '12px' }}>Record Safe Experiences</h3>
            <p className="text-muted" style={{ margin: 0 }}>
              Log venues that successfully serve a guest so future visits are faster and more confident.
            </p>
          </div>
        </div>

        <div className="card" style={{ 
          maxWidth: '600px', 
          margin: '0 auto',
          textAlign: 'center',
          background: 'rgba(0, 82, 204, 0.05)',
          borderColor: 'var(--color-primary)'
        }}>
          <h3 style={{ marginBottom: '16px', color: 'var(--color-primary)' }}>
            Enable AllergyLink at Your Venue
          </h3>
          <p style={{ marginBottom: '24px' }}>
            Contact us to learn how AllergyLink can help your restaurant serve guests with allergies safely and efficiently.
          </p>
          <a
            href="mailto:venues@allergylink.com"
            className="btn btn-primary"
          >
            Contact Us
          </a>
        </div>
      </div>

      <Footer />
    </main>
  );
}
