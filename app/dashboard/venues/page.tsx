'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import UnifiedNavigation from '@/components/UnifiedNavigation';
import Footer from '@/components/Footer';
import { listShared } from '@/lib/storage';
import type { SharedEntry } from '@/lib/models';

export default function VenuesPage() {
  const [sharedVenues, setSharedVenues] = useState<SharedEntry[]>([]);

  useEffect(() => {
    setSharedVenues(listShared());
  }, []);

  return (
    <main style={{ minHeight: '100dvh', background: 'var(--color-bg)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <UnifiedNavigation />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 20px 120px' }}>
        <div style={{ marginBottom: '24px' }}>
          <Link
            href="/dashboard"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              fontWeight: 600,
              marginBottom: '16px',
            }}
          >
            ← Back to Dashboard
          </Link>
          <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)', fontWeight: 700, marginBottom: '8px' }}>
            Shared Venues
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
            View all venues where you've shared your AllergyLink profile
          </p>
        </div>

        {sharedVenues.length > 0 ? (
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {sharedVenues.map((venue, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 0',
                    borderBottom: idx < sharedVenues.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '1.5rem' }}>
                        {venue.type === 'venue' ? '🏢' : '👤'}
                      </span>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '1.0625rem', marginBottom: '4px' }}>
                          {venue.name}
                        </div>
                        {venue.cityState && (
                          <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                            {venue.cityState}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                      {new Date(venue.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </div>
                    <div
                      style={{
                        display: 'inline-block',
                        padding: '4px 12px',
                        borderRadius: '999px',
                        background: 'rgba(16, 185, 129, 0.1)',
                        color: 'var(--color-success)',
                        fontSize: '0.75rem',
                        fontWeight: 600,
                      }}
                    >
                      Active
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '48px 24px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '16px' }}>📋</div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>
              No venues shared yet
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
              Start sharing your AllergyLink ID with restaurants, schools, and venues to track your visits.
            </p>
            <Link
              href="/dashboard"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                borderRadius: '10px',
                background: 'var(--color-primary)',
                color: 'white',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '0.9375rem',
              }}
            >
              Go to Dashboard
            </Link>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}

