'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AllergenTag from '@/components/ui/AllergenTag';
import DietaryRestrictionTag from '@/components/ui/DietaryRestrictionTag';

// This is what a restaurant/venue sees when they access an AllergyLink ID
export default function VenueView() {
  // Mock profile data - in real app, this would come from the ID in the URL
  const profile = {
    firstName: 'Madeline',
    nameVisible: true,
    allergies: [
      { name: 'Peanut', severity: 'anaphylactic' as const },
      { name: 'Dairy', severity: 'no-cross' as const },
      { name: 'Soy', severity: 'cross-ok' as const }
    ],
    dietary: ['Vegetarian'],
    notes: 'Please ensure all utensils and surfaces are clean before preparing food.'
  };

  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
      <div className="container section">
        <div className="card" style={{ maxWidth: '700px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2.5rem',
              fontWeight: 700,
              margin: '0 auto 16px'
            }}>
              {profile.nameVisible ? profile.firstName.charAt(0) : '?'}
            </div>
            <h1 style={{ marginBottom: '8px' }}>
              {profile.nameVisible ? `${profile.firstName}'s` : 'Guest'} Allergy Profile
            </h1>
            <p className="text-muted">
              AllergyLink ID: ALY-12345678
            </p>
          </div>

          {/* Allergies Section */}
          <section style={{ marginBottom: '32px' }}>
            <h2 style={{ marginBottom: '16px', color: 'var(--color-primary)' }}>Food Allergies</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
              {profile.allergies.map((allergy, idx) => (
                <AllergenTag
                  key={idx}
                  name={allergy.name}
                  severity={allergy.severity}
                  showSeverity={true}
                />
              ))}
            </div>
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #FCA5A5', borderRadius: '12px', padding: '16px' }}>
              <div style={{ fontWeight: 600, marginBottom: '8px', color: '#B91C1C' }}>
                ⚠️ Anaphylactic Allergies Present
              </div>
              <p style={{ margin: 0, fontSize: '0.875rem', color: '#991B1B' }}>
                This guest has severe allergies that require strict avoidance and no cross-contamination.
              </p>
            </div>
          </section>

          {/* Dietary Restrictions */}
          {profile.dietary.length > 0 && (
            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ marginBottom: '16px', color: 'var(--color-primary)' }}>Dietary Restrictions</h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                {profile.dietary.map((diet, idx) => (
                  <DietaryRestrictionTag key={idx} name={diet} />
                ))}
              </div>
            </section>
          )}

          {/* Notes for Kitchen */}
          {profile.notes && (
            <section style={{ marginBottom: '32px' }}>
              <h2 style={{ marginBottom: '16px', color: 'var(--color-primary)' }}>Notes for Kitchen</h2>
              <div style={{
                background: 'var(--color-bg)',
                border: '1px solid var(--color-border)',
                borderRadius: '12px',
                padding: '16px'
              }}>
                <p style={{ margin: 0, lineHeight: 1.6 }}>{profile.notes}</p>
              </div>
            </section>
          )}

          {/* Privacy Notice */}
          <div style={{
            marginTop: '32px',
            padding: '20px',
            background: 'rgba(0, 82, 204, 0.05)',
            border: '1px solid var(--color-primary)',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
              <strong>Privacy Notice:</strong> This information is shared for safety only. 
              No personal identifying information (phone, last name, address) is displayed.
            </p>
          </div>

          {/* Actions */}
          <div style={{ marginTop: '32px', display: 'flex', gap: '12px', justifyContent: 'center' }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                // In real app, this would mark a "safe visit" or save to venue records
                alert('Safe visit recorded!');
              }}
            >
              Record Safe Visit
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => window.print()}
            >
              Print Profile
            </button>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
