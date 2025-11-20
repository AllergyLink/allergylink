'use client';

import { useState } from 'react';
import Link from 'next/link';
import Logo from '@/components/Logo';

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Header */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(245, 247, 251, 0.95)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--color-border)',
          padding: `calc(16px + env(safe-area-inset-top)) 20px 16px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        className="mobile-header"
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Logo size={200} showTagline={false} />
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
            width: '32px',
            height: '32px',
            justifyContent: 'center'
          }}
        >
          <span style={{ width: '24px', height: '2px', background: 'var(--color-primary)', borderRadius: '2px', transition: 'all 0.3s' }}></span>
          <span style={{ width: '24px', height: '2px', background: 'var(--color-primary)', borderRadius: '2px', transition: 'all 0.3s' }}></span>
          <span style={{ width: '24px', height: '2px', background: 'var(--color-primary)', borderRadius: '2px', transition: 'all 0.3s' }}></span>
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 82, 204, 0.95)',
            zIndex: 200,
            paddingTop: 'env(safe-area-inset-top)',
            padding: '80px 24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            overflowY: 'auto'
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <button
            onClick={() => setMobileMenuOpen(false)}
            style={{
              position: 'absolute',
              top: 'calc(24px + env(safe-area-inset-top))',
              right: '24px',
              background: 'none',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
              width: '44px',
              height: '44px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            ×
          </button>
          <Link href="/" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 600, padding: '16px 0' }}>
            Home
          </Link>
          <a href="/#how-it-works" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 600, padding: '16px 0' }}>
            How It Works
          </a>
          <a href="/#for-restaurants" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 600, padding: '16px 0' }}>
            For Restaurants
          </a>
          <a href="/#faq" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 600, padding: '16px 0' }}>
            FAQ
          </a>
          <a href="/#support" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 600, padding: '16px 0' }}>
            Support
          </a>
          <Link href="/trusted-supporters" style={{ color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 600, padding: '16px 0' }}>
            Trusted Supporters
          </Link>
          <Link
            href="/auth/sign-in"
            style={{
              marginTop: '24px',
              padding: '16px 24px',
              borderRadius: '999px',
              border: '2px solid white',
              color: 'white',
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: '1.125rem',
              textAlign: 'center'
            }}
          >
            Access Profile
          </Link>
        </div>
      )}

      {/* Desktop Header */}
      <header
        style={{
          maxWidth: '1180px',
          margin: '0 auto',
          padding: '32px 24px',
          display: 'none',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
        className="desktop-header"
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Logo size={400} showTagline={false} />
        </Link>
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '1rem',
            color: '#1F2E2E'
          }}
        >
          <Link href="/" style={{ color: 'var(--color-text)', textDecoration: 'none', fontWeight: 600 }}>
            Home
          </Link>
          <a href="/#how-it-works" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
            How It Works
          </a>
          <a href="/#for-restaurants" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
            For Restaurants
          </a>
          <a href="/#faq" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
            FAQ
          </a>
          <a href="/#support" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
            Support
          </a>
          <Link href="/trusted-supporters" style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
            Trusted Supporters
          </Link>
          <Link
            href="/auth/sign-in"
            style={{
              padding: '10px 22px',
              borderRadius: '999px',
              border: '1.6px solid var(--color-primary)',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              fontWeight: 600
            }}
          >
            Access Profile
          </Link>
        </nav>
      </header>

      <style jsx>{`
        @media (min-width: 768px) {
          .mobile-header {
            display: none !important;
          }
          .desktop-header {
            display: flex !important;
          }
        }
        @media (max-width: 767px) {
          .mobile-header {
            display: flex !important;
          }
          .desktop-header {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}

