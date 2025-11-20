'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function ErrorStates() {
  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
      <div className="container section" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="card" style={{ maxWidth: '500px', textAlign: 'center' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'rgba(239, 68, 68, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px',
            fontSize: '2.5rem'
          }}>
            ⚠️
          </div>
          <h1>Something went wrong</h1>
          <p className="text-muted" style={{ marginBottom: '32px' }}>
            We encountered an error. Please try again or contact support if the problem persists.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <button className="btn btn-primary btn-full" onClick={() => window.location.reload()}>
              Retry
            </button>
            <a href="mailto:support@allergylink.com" className="btn btn-secondary btn-full">
              Contact Support
            </a>
            <Link href="/" className="btn btn-ghost btn-full">
              Go Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
