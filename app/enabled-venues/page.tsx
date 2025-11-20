'use client';

import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function EnabledVenues() {
  const venues = [
    {
      name: 'The Allergy-Friendly Cafe',
      address: '123 Main Street, City, State 12345',
      tags: ['Peanut-Free', 'Dairy-Free Options', 'Gluten-Free'],
      verified: true
    },
    {
      name: 'Safe Bites Restaurant',
      address: '456 Oak Avenue, City, State 12345',
      tags: ['Allergy-Aware Staff', 'Nut-Free Kitchen'],
      verified: true
    },
    {
      name: 'Healthy Choices Bistro',
      address: '789 Pine Street, City, State 12345',
      tags: ['Vegetarian Options', 'Soy-Free', 'Egg-Free'],
      verified: true
    }
  ];

  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
      <div className="container-wide section">
        <div style={{ marginBottom: '32px' }}>
          <h1>Enabled Venues</h1>
          <p>
            Restaurants and food establishments verified to be allergy-aware and ready to serve you safely.
          </p>
      </div>

        <div className="card" style={{ marginBottom: '32px' }}>
          <input
            type="text"
            placeholder="Search restaurants, cuisine, or location..."
            style={{ marginBottom: '16px' }}
          />
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button className="chip chip-primary">All Cuisines</button>
            <button className="chip">Italian</button>
            <button className="chip">Asian</button>
            <button className="chip">American</button>
        </div>
        </div>

        <div className="grid grid-2" style={{ marginBottom: '48px' }}>
          {venues.map((venue, idx) => (
            <div key={idx} className="card">
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
                <h3 style={{ margin: 0, flex: 1 }}>{venue.name}</h3>
                {venue.verified && (
                  <span className="chip chip-success" style={{ fontSize: '0.75rem' }}>
                ✓ Verified
              </span>
                )}
            </div>
              <p className="text-muted" style={{ marginBottom: '16px', fontSize: '0.875rem' }}>
                {venue.address}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
                {venue.tags.map((tag, tagIdx) => (
                  <span key={tagIdx} className="chip" style={{ fontSize: '0.75rem' }}>
                    {tag}
                  </span>
                ))}
            </div>
              <button className="btn btn-primary btn-full btn-sm">
              View Details
            </button>
            </div>
          ))}
          </div>

        <div className="card" style={{ background: 'rgba(16, 185, 129, 0.05)', borderColor: 'var(--color-success)' }}>
          <h3 style={{ marginBottom: '12px', color: 'var(--color-success)' }}>
            What are Enabled Venues?
              </h3>
          <p style={{ margin: 0 }}>
            Enabled Venues are restaurants, cafes, and other food establishments that have been verified to be allergy-aware and can safely accommodate customers with food allergies. These venues have trained staff and protocols in place to handle allergy information shared through AllergyLink.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
