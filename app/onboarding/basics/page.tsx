'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Page() {
  const [allergies, setAllergies] = useState(['Peanut', 'Dairy', 'Soy']);
  const [dietaryRestrictions, setDietaryRestrictions] = useState(['Vegetarian', 'Gluten-Free']);

  const removeAllergy = (allergy: string) => {
    setAllergies(allergies.filter(a => a !== allergy));
  };

  const removeRestriction = (restriction: string) => {
    setDietaryRestrictions(dietaryRestrictions.filter(r => r !== restriction));
  };

  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
      <div className="container section">
        <div className="card">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{
              width: '120px',
              height: '120px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '3rem',
              fontWeight: 700,
              margin: '0 auto 16px',
              boxShadow: '0 4px 16px rgba(0, 82, 204, 0.3)'
            }}>
              M
            </div>
            <h1>AllergyLink Profile</h1>
            <p style={{ maxWidth: '600px', margin: '0 auto' }}>
              Create your AllergyLink profile to safely share your food allergies and dietary restrictions with restaurants, schools, and venues. Your information is kept confidential and only shared when you choose to share your QR code.
            </p>
          </div>

          {/* Food Allergies Section */}
          <div style={{ marginBottom: '32px' }}>
            <label>Food Allergies</label>
            <div style={{
              border: '1.5px solid var(--color-border)',
              borderRadius: '12px',
              padding: '12px',
              minHeight: '56px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              alignItems: 'center',
              background: 'var(--color-card)'
            }}>
              {allergies.length > 0 ? (
                allergies.map((allergy) => (
                  <div key={allergy} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(0, 82, 204, 0.1)',
                    border: '1.5px solid var(--color-primary)',
                    borderRadius: '999px',
                    padding: '6px 12px',
                    fontSize: '0.9375rem',
                    color: 'var(--color-primary)',
                    fontWeight: 500
                  }}>
                    <span>{allergy}</span>
                    <button
                      onClick={() => removeAllergy(allergy)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-primary)',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        padding: '0',
                        lineHeight: '1',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <span className="text-muted">Add your food allergies</span>
              )}
            </div>
            <Link href="/create" style={{ 
              display: 'inline-block', 
              marginTop: '12px',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}>
              + Add allergies
            </Link>
          </div>

          {/* Dietary Restrictions Section */}
          <div style={{ marginBottom: '32px' }}>
            <label>Dietary Restrictions</label>
            <div style={{
              border: '1.5px solid var(--color-border)',
              borderRadius: '12px',
              padding: '12px',
              minHeight: '56px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              alignItems: 'center',
              background: 'var(--color-card)'
            }}>
              {dietaryRestrictions.length > 0 ? (
                dietaryRestrictions.map((restriction) => (
                  <div key={restriction} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    background: 'rgba(16, 185, 129, 0.1)',
                    border: '1.5px solid var(--color-success)',
                    borderRadius: '999px',
                    padding: '6px 12px',
                    fontSize: '0.9375rem',
                    color: 'var(--color-success)',
                    fontWeight: 500
                  }}>
                    <span>{restriction}</span>
                    <button
                      onClick={() => removeRestriction(restriction)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--color-success)',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        padding: '0',
                        lineHeight: '1',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))
              ) : (
                <span className="text-muted">Add your dietary restrictions</span>
              )}
            </div>
            <Link href="/create" style={{ 
              display: 'inline-block', 
              marginTop: '12px',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '0.875rem'
            }}>
              + Add restrictions
            </Link>
          </div>

          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            marginTop: '32px',
            paddingTop: '24px',
            borderTop: '1px solid var(--color-border)'
          }}>
            <Link href="/" className="btn btn-secondary" style={{ flex: 1 }}>
              Cancel
            </Link>
            <Link href="/dashboard" className="btn btn-primary" style={{ flex: 1 }}>
              Save Profile
            </Link>
          </div>

          <p className="text-muted" style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.75rem' }}>
            Your allergy information is kept secure and private
          </p>
      </div>
      </div>

      <Footer />
    </main>
  );
}
