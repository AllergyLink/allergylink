'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function Settings() {
  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
      <div className="container section">
        <h1>Settings & Alerts</h1>

        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>Profile Management</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Link href="/create" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              Manage Profile
            </Link>
            <Link href="/family" className="btn btn-secondary" style={{ justifyContent: 'flex-start' }}>
              Manage Family Profiles
            </Link>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>Privacy & Security</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <button className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>
              Data & Privacy
            </button>
            <button className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>
              Two-Factor Authentication
            </button>
            <button className="btn btn-ghost" style={{ justifyContent: 'flex-start' }}>
              Export My Data
            </button>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>Notifications</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>Live Update Toggle</div>
              <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>
                Automatically update shared profiles when you make changes
              </p>
            </div>
            <button className="toggle on"></button>
          </div>
        </div>

        <div className="card" style={{ borderColor: 'var(--color-error)' }}>
          <h3 style={{ marginBottom: '20px', color: 'var(--color-error)' }}>Danger Zone</h3>
          <button className="btn" style={{ 
            background: 'var(--color-error)', 
            color: 'white',
            justifyContent: 'flex-start'
          }}>
            Delete Account
          </button>
        </div>
      </div>

      <Footer />
    </main>
  );
}
