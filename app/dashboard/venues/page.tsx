'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import UnifiedNavigation from '@/components/UnifiedNavigation';
import Footer from '@/components/Footer';
import { useApp } from '@/components/AppProvider';

export default function VenuesPage() {
  const { state } = useApp();
  const user = state.session?.verified ? state.users[state.session.userId] : undefined;

  const shareSessions = useMemo(() => {
    if (!user) return [];
    // Get all sessions for profiles owned by this user
    const userProfileIds = new Set(
      Object.values(state.profiles)
        .filter((p) => p.userId === user.id)
        .map((p) => p.id),
    );
    return Object.values(state.shareSessions)
      .filter((s) => userProfileIds.has(s.profileId))
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  }, [state.shareSessions, state.profiles, user]);

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
            Share History
          </h1>
          <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9375rem' }}>
            View all venues and people you've shared your AllergyLink profile with
          </p>
        </div>

        {shareSessions.length > 0 ? (
          <div
            style={{
              background: 'white',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
              {shareSessions.map((session, idx) => {
                const profile = state.profiles[session.profileId];
                return (
                  <div
                    key={session.id}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '16px 0',
                      borderBottom: idx < shareSessions.length - 1 ? '1px solid var(--color-border)' : 'none',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                        <span style={{ fontSize: '1.5rem' }}>📤</span>
                        <div>
                          <div style={{ fontWeight: 600, fontSize: '1.0625rem', marginBottom: '4px' }}>
                            Shared via {session.method}
                            {profile ? ` — ${profile.name}` : ''}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginBottom: '4px' }}>
                        {new Date(session.timestamp).toLocaleDateString('en-US', {
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
                          background: session.approved ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                          color: session.approved ? 'var(--color-success)' : '#D97706',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                        }}
                      >
                        {session.approved ? 'Approved' : 'Pending'}
                      </div>
                    </div>
                  </div>
                );
              })}
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
              No shares yet
            </h2>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '24px' }}>
              Start sharing your AllergyLink ID with restaurants, schools, and venues to track your shares.
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
