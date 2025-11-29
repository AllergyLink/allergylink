'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UnifiedNavigation from '@/components/UnifiedNavigation';
import Footer from '@/components/Footer';
import QR from '@/components/QR';
import { getProfile } from '@/lib/storage';
import type { Profile } from '@/lib/models';

export default function IDHome() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | undefined>();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const p = getProfile();
    if (!p) {
      router.push('/dashboard');
      return;
    }
    setProfile(p);
  }, [router]);

  const handleCopy = () => {
    if (profile) {
      navigator.clipboard.writeText(profile.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (!profile) {
    return (
      <main style={{ minHeight: '100dvh', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading...</div>
      </main>
    );
  }

  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <UnifiedNavigation />
      
      <div className="container section">
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>
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
              M
            </div>
            <h1>{profile.firstName}'s Allergy ID</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
              {profile.allergies.slice(0, 3).map((a) => (
                <span key={a.name} className="chip chip-primary">{a.name}</span>
              ))}
              {profile.dietary.slice(0, 2).map((d) => (
                <span key={d} className="chip chip-success">{d}</span>
              ))}
            </div>
          </div>

          <div style={{
            background: 'var(--color-bg)',
            padding: '24px',
            borderRadius: '16px',
            textAlign: 'center',
            marginBottom: '24px',
            border: '1px solid var(--color-border)'
          }}>
            <QR value={`https://id.allergylink.net/${profile.id}`} size={200} />
            <p className="text-muted" style={{ marginTop: '16px', marginBottom: 0, fontFamily: 'monospace', fontSize: '1rem' }}>
              {profile.id}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            <button
              className="btn btn-primary btn-full"
              onClick={handleCopy}
            >
              {copied ? '✓ Copied!' : 'Copy ID'}
            </button>
            <button className="btn btn-secondary btn-full">
              Save to Wallet
            </button>
            <Link href="/id/share" className="btn btn-ghost btn-full">
              Share Profile
            </Link>
          </div>

          <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '24px' }}>
            <h3 style={{ marginBottom: '16px' }}>Shared Profile Venues</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{
                padding: '16px',
                background: 'var(--color-bg)',
                borderRadius: '12px',
                border: '1px solid var(--color-border)'
              }}>
                <div style={{ fontWeight: 600, marginBottom: '4px' }}>🥗 Green Leaf Café</div>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>
                  Boston, MA • Oct 18, 2025
                </p>
              </div>
              <div style={{
                padding: '16px',
                background: 'var(--color-bg)',
                borderRadius: '12px',
                border: '1px solid var(--color-border)'
              }}>
                <div style={{ fontWeight: 600, marginBottom: '4px' }}>🏫 Brookline High School</div>
                <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>
                  Brookline, MA • Oct 27, 2025
                </p>
              </div>
            </div>
          </div>

          <p className="text-muted" style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.75rem' }}>
            Your data is securely hosted; no personal identifiers are visible.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
