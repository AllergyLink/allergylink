'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UnifiedNavigation from '@/components/UnifiedNavigation';
import Footer from '@/components/Footer';
import { load, getProfile } from '@/lib/storage';

export default function SettingsPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('');

  useEffect(() => {
    // In a real app, you'd load this from user data
    const state = load();
    setPhone(state.phone || '');
  }, []);

  const handleSignOut = () => {
    // In a real app, you'd clear auth tokens
    localStorage.removeItem('allergylink-demo');
    router.push('/');
  };

  return (
    <main style={{ minHeight: '100dvh', background: 'var(--color-bg)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <UnifiedNavigation />

      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '24px 20px 120px' }}>
        <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2.25rem)', fontWeight: 700, marginBottom: '32px' }}>
          Settings
        </h1>

        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}
        >
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '20px' }}>Account</h2>
          
          <div style={{ marginBottom: '20px' }}>
            <label
              style={{
                display: 'block',
                fontSize: '0.875rem',
                fontWeight: 600,
                marginBottom: '8px',
                color: 'var(--color-text)',
              }}
            >
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              readOnly
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1.5px solid var(--color-border)',
                background: 'var(--color-bg)',
                fontSize: '1rem',
                fontFamily: 'inherit',
                color: 'var(--color-text-muted)',
              }}
            />
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: '8px' }}>
              Your phone number is used for authentication and cannot be changed here.
            </p>
          </div>
        </div>

        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}
        >
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '20px' }}>Profile</h2>
          <Link
            href="/dashboard"
            style={{
              display: 'block',
              padding: '12px 16px',
              borderRadius: '10px',
              border: '1.5px solid var(--color-border)',
              background: 'white',
              color: 'var(--color-text)',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '0.9375rem',
              textAlign: 'center',
              marginBottom: '12px',
            }}
          >
            Manage Profiles
          </Link>
        </div>

        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}
        >
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '20px' }}>Support</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <a
              href="mailto:support@allergylink.com"
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1.5px solid var(--color-border)',
                background: 'white',
                color: 'var(--color-text)',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '0.9375rem',
                textAlign: 'center',
              }}
            >
              Contact Support
            </a>
            <Link
              href="/#faq"
              style={{
                padding: '12px 16px',
                borderRadius: '10px',
                border: '1.5px solid var(--color-border)',
                background: 'white',
                color: 'var(--color-text)',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '0.9375rem',
                textAlign: 'center',
              }}
            >
              FAQ
            </Link>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          style={{
            width: '100%',
            padding: '14px 24px',
            borderRadius: '12px',
            border: '1.5px solid #FCA5A5',
            background: '#FEF2F2',
            color: '#B91C1C',
            fontWeight: 600,
            fontSize: '1rem',
            cursor: 'pointer',
          }}
        >
          Sign Out
        </button>
      </div>

      <Footer />
    </main>
  );
}
