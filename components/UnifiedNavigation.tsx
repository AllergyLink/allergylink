'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';

interface NavItem {
  href: string;
  label: string;
  icon: string;
  desktopOnly?: boolean;
  mobileOnly?: boolean;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/dashboard', label: 'Profile', icon: '👤' },
  { href: '/dashboard/venues', label: 'Venues', icon: '📊' },
  { href: '/settings', label: 'Settings', icon: '⚙️' },
];

export default function UnifiedNavigation() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isDashboard = pathname?.startsWith('/dashboard');
  const isHome = pathname === '/';
  const isSettings = pathname === '/settings';

  return (
    <>
      {/* Desktop Top Navigation */}
      <header
        className="desktop-nav"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 100,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border)',
          padding: '16px 24px',
        }}
      >
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Link href="/" style={{ textDecoration: 'none' }}>
            <Logo size={200} showTagline={false} />
          </Link>
          <nav
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px',
            }}
          >
            {navItems
              .filter((item) => !item.mobileOnly)
              .map((item) => {
                const isActive =
                  item.href === pathname ||
                  (item.href === '/dashboard' && pathname?.startsWith('/dashboard'));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    style={{
                      color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                      textDecoration: 'none',
                      fontWeight: isActive ? 600 : 500,
                      fontSize: '0.9375rem',
                      paddingBottom: '4px',
                      borderBottom: isActive ? '2px solid var(--color-primary)' : '2px solid transparent',
                      transition: 'all 0.2s',
                    }}
                  >
                    {item.label}
                  </Link>
                );
              })}
            <Link
              href="/auth/sign-in"
              style={{
                padding: '10px 22px',
                borderRadius: '999px',
                border: '1.6px solid var(--color-primary)',
                color: 'var(--color-primary)',
                textDecoration: 'none',
                fontWeight: 600,
                fontSize: '0.9375rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-primary)';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'var(--color-primary)';
              }}
            >
              {isDashboard || isSettings ? 'Sign Out' : 'Get Started'}
            </Link>
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <nav
        className="mobile-bottom-nav"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'white',
          borderTop: '1px solid var(--color-border)',
          paddingBottom: 'env(safe-area-inset-bottom)',
          paddingTop: '8px',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.05)',
        }}
      >
        {navItems
          .filter((item) => !item.desktopOnly && item.href !== '/')
          .map((item) => {
            const isActive =
              item.href === pathname ||
              (item.href === '/dashboard' && pathname?.startsWith('/dashboard'));
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '8px 16px',
                  textDecoration: 'none',
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
                  minWidth: '60px',
                  transition: 'all 0.2s',
                }}
              >
                <span style={{ fontSize: '24px' }}>{item.icon}</span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: isActive ? 600 : 500,
                  }}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        {!isDashboard && !isSettings && (
          <Link
            href="/auth/sign-in"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              padding: '8px 16px',
              textDecoration: 'none',
              color: 'var(--color-primary)',
              minWidth: '60px',
            }}
          >
            <span style={{ fontSize: '24px' }}>➕</span>
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>Create</span>
          </Link>
        )}
      </nav>

      {/* Mobile Top Header with Drawer */}
      <header
        className="mobile-top-header"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 99,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid var(--color-border)',
          padding: `calc(12px + env(safe-area-inset-top)) 20px 12px`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <Logo size={180} showTagline={false} />
        </Link>
        <button
          onClick={() => setDrawerOpen(!drawerOpen)}
          style={{
            background: 'none',
            border: 'none',
            padding: '8px',
            cursor: 'pointer',
            fontSize: '1.5rem',
            color: 'var(--color-text)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '44px',
            height: '44px',
          }}
          aria-label="Open menu"
        >
          ☰
        </button>
      </header>

      {/* Drawer Menu */}
      {drawerOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0, 0, 0, 0.5)',
              zIndex: 200,
              animation: 'fadeIn 0.2s ease',
            }}
            onClick={() => setDrawerOpen(false)}
          />
          <div
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              bottom: 0,
              width: 'min(320px, 85vw)',
              background: 'white',
              zIndex: 201,
              boxShadow: '-4px 0 20px rgba(0, 0, 0, 0.15)',
              padding: `calc(24px + env(safe-area-inset-top)) 24px 24px`,
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              overflowY: 'auto',
              animation: 'slideIn 0.3s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <Logo size={180} showTagline={false} />
              <button
                onClick={() => setDrawerOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontSize: '2rem',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  padding: '8px',
                  lineHeight: 1,
                }}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>
            
            <Link
              href="/#how"
              onClick={() => setDrawerOpen(false)}
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'var(--color-text)',
                fontWeight: 600,
                fontSize: '1.0625rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              HOW IT WORKS
            </Link>
            
            <Link
              href="/auth/sign-in"
              onClick={() => setDrawerOpen(false)}
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'var(--color-text)',
                fontWeight: 600,
                fontSize: '1.0625rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              CREATE MY PROFILE
            </Link>
            
            <Link
              href="/dashboard"
              onClick={() => setDrawerOpen(false)}
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'var(--color-text)',
                fontWeight: 600,
                fontSize: '1.0625rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              MY DASHBOARD
            </Link>
            
            <Link
              href="/#venues"
              onClick={() => setDrawerOpen(false)}
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'var(--color-text)',
                fontWeight: 600,
                fontSize: '1.0625rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              FOR VENUES
            </Link>
            
            <Link
              href="/#faq"
              onClick={() => setDrawerOpen(false)}
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'var(--color-text)',
                fontWeight: 600,
                fontSize: '1.0625rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              FAQ
            </Link>
            
            <Link
              href="/trusted-supporters"
              onClick={() => setDrawerOpen(false)}
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'var(--color-text)',
                fontWeight: 600,
                fontSize: '1.0625rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              TRUSTED SUPPORTERS
            </Link>
            
            <Link
              href="/#support"
              onClick={() => setDrawerOpen(false)}
              style={{
                padding: '16px 20px',
                borderRadius: '12px',
                textDecoration: 'none',
                color: 'var(--color-text)',
                fontWeight: 600,
                fontSize: '1.0625rem',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-bg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
              }}
            >
              HELP
            </Link>
          </div>
        </>
      )}

      {/* Spacer for mobile bottom nav */}
      <div className="mobile-nav-spacer" style={{ height: '80px' }} />

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @media (min-width: 768px) {
          .desktop-nav {
            display: block !important;
          }
          .mobile-bottom-nav,
          .mobile-top-header,
          .mobile-nav-spacer {
            display: none !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-bottom-nav,
          .mobile-top-header {
            display: flex !important;
          }
          .mobile-nav-spacer {
            display: block !important;
          }
        }
      `}</style>
    </>
  );
}

