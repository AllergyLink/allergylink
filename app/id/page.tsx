'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import QR from '@/components/QR';

export default function IDHome() {
  const id = 'ALY-12345678';
  const profileName = "Madeline's";

  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
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
            <h1>{profileName} Allergy ID</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
              <span className="chip chip-primary">Peanut</span>
              <span className="chip chip-primary">Dairy</span>
              <span className="chip chip-primary">Soy</span>
              <span className="chip chip-success">Vegetarian</span>
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
            <QR value={`https://id.allergylink.net/${id}`} size={200} />
            <p className="text-muted" style={{ marginTop: '16px', marginBottom: 0, fontFamily: 'monospace', fontSize: '1rem' }}>
              {id}
            </p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            <button
              className="btn btn-primary btn-full"
              onClick={() => {
                navigator.clipboard.writeText(id);
                alert('ID copied to clipboard!');
              }}
            >
              Copy ID
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
