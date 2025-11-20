'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BottomNavigation from '@/components/ui/BottomNavigation';

export default function Settings() {
  const [nameVisible, setNameVisible] = useState(true);
  const [theme, setTheme] = useState<'light' | 'mint'>('light');
  const [phone, setPhone] = useState('(555) 555-1212');
  const [liveUpdates, setLiveUpdates] = useState(true);

  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
      <div className="container section">
        <h1>Settings</h1>

        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>Profile Visibility</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>Show First Name to Venues</div>
              <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>
                When enabled, venues will see your first name on your allergy card
              </p>
            </div>
            <button
              className={nameVisible ? 'toggle on' : 'toggle'}
              onClick={() => setNameVisible(!nameVisible)}
              style={{ cursor: 'pointer' }}
            ></button>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>Appearance</h3>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
            <div>
              <div style={{ fontWeight: 600, marginBottom: '4px' }}>Theme</div>
              <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>
                Choose between light mode and mint mode
              </p>
            </div>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button
                onClick={() => setTheme('light')}
                className={theme === 'light' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
              >
                Light
              </button>
              <button
                onClick={() => setTheme('mint')}
                className={theme === 'mint' ? 'btn btn-primary btn-sm' : 'btn btn-ghost btn-sm'}
              >
                Mint
              </button>
            </div>
          </div>
        </div>

        <div className="card" style={{ marginBottom: '24px' }}>
          <h3 style={{ marginBottom: '20px' }}>Account</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.875rem', marginBottom: '4px', display: 'block' }}>Phone Number</label>
              <div style={{ display: 'flex', gap: '8px' }}>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{ flex: 1 }}
                />
                <button className="btn btn-secondary btn-sm">Update</button>
              </div>
            </div>
          </div>
        </div>

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
            <button
              className={liveUpdates ? 'toggle on' : 'toggle'}
              onClick={() => setLiveUpdates(!liveUpdates)}
              style={{ cursor: 'pointer' }}
            ></button>
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

      <BottomNavigation />
      <div style={{ height: '80px' }} /> {/* Spacer for bottom nav */}
      <Footer />
    </main>
  );
}
