'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function OfflinePage() {
  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
      <div className="container" style={{ 
        flex: 1, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '48px 20px',
        minHeight: '60vh'
      }}>
        <div className="card" style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
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
            margin: '0 auto 24px',
          }}>
            📡
          </div>
          
          <h1 style={{ marginBottom: '16px' }}>You're Offline</h1>
          <p className="text-muted" style={{ marginBottom: '32px' }}>
            It looks like you've lost your internet connection. Don't worry—you can still view your saved AllergyLink profile.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <Link href="/id" className="btn btn-primary btn-full">
              View My Profile
            </Link>
            <button 
              onClick={() => window.location.reload()} 
              className="btn btn-secondary btn-full"
            >
              Try Again
            </button>
          </div>

          <p className="text-muted" style={{ marginTop: '24px', fontSize: '0.875rem' }}>
            Your allergy information is stored locally and available offline
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
