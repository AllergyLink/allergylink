'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Profile', icon: '👤' },
    { href: '/family', label: 'Family', icon: '👨‍👩‍👧‍👦' },
    { href: '/venues', label: 'Venues', icon: '🏢' },
    { href: '/settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'white',
        borderTop: '1px solid var(--color-border)',
        display: 'flex',
        justifyContent: 'space-around',
        padding: '12px 0 calc(12px + env(safe-area-inset-bottom))',
        zIndex: 100,
        boxShadow: '0 -2px 8px rgba(0,0,0,0.05)'
      }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
        return (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              textDecoration: 'none',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
              fontSize: '0.75rem',
              fontWeight: isActive ? 600 : 500,
              padding: '8px 16px',
              borderRadius: '8px',
              transition: 'all 0.2s'
            }}
          >
            <span style={{ fontSize: '1.25rem' }}>{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
