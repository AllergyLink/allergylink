'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import QR from '@/components/QR';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'venues' | 'supporters'>('dashboard');

  const TabButton = ({ id, label, isActive, onClick }: { id: string; label: string; isActive: boolean; onClick: () => void }) => (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        border: 'none',
        background: 'transparent',
        color: isActive ? 'var(--color-primary)' : 'var(--color-text-muted)',
        fontWeight: isActive ? 600 : 500,
        fontSize: '1rem',
        cursor: 'pointer',
        borderBottom: isActive ? '3px solid var(--color-primary)' : '3px solid transparent',
        transition: 'all 0.2s',
        fontFamily: 'inherit'
      }}
    >
      {label}
    </button>
  );

  const TabLink = ({ href, label }: { href: string; label: string }) => (
    <Link href={href} style={{ textDecoration: 'none' }}>
      <div
        style={{
          padding: '12px 24px',
          background: 'transparent',
          color: 'var(--color-text-muted)',
          fontWeight: 500,
          fontSize: '1rem',
          cursor: 'pointer',
          borderBottom: '3px solid transparent',
          transition: 'all 0.2s',
          fontFamily: 'inherit'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = 'var(--color-primary)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = 'var(--color-text-muted)';
        }}
      >
        {label}
      </div>
    </Link>
  );

  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
      <div style={{ background: 'var(--color-card)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container-wide">
          <h1 style={{ paddingTop: '32px', marginBottom: '24px' }}>Dashboard</h1>
          
          <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid var(--color-border)' }}>
            <TabButton
              id="dashboard"
              label="My Dashboard"
              isActive={activeTab === 'dashboard'}
              onClick={() => setActiveTab('dashboard')}
            />
            <TabLink href="/enabled-venues" label="Enabled Venues" />
            <TabLink href="/trusted-supporters" label="Trusted Supporters" />
          </div>
        </div>
      </div>

      <div className="container-wide section">
        {activeTab === 'dashboard' && (
          <div>
            <h2 style={{ marginBottom: '24px' }}>My Profiles</h2>
            
            <div className="grid grid-2" style={{ marginBottom: '48px' }}>
              {/* Primary Profile Card */}
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '16px',
                    background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 700
                  }}>
                    M
                  </div>
                  <div>
                    <h3 style={{ marginBottom: '4px' }}>Madeline</h3>
                    <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>Primary Profile</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  <span className="chip chip-primary">Peanut</span>
                  <span className="chip chip-primary">Dairy</span>
                  <span className="chip chip-primary">Soy</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <Link href="/id" className="btn btn-primary btn-full">
                    View Profile
                  </Link>
                  <Link href="/create" className="btn btn-secondary btn-full">
                    Edit Profile
                  </Link>
                </div>
              </div>

              {/* QR Code Card */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>Share QR Code</h3>
                <div style={{ 
                  background: 'var(--color-bg)', 
                  padding: '16px', 
                  borderRadius: '12px',
                  marginBottom: '16px'
                }}>
                  <QR value="https://id.allergylink.net/ALY-12345678" size={180} />
                </div>
                <p className="text-muted" style={{ marginBottom: '16px', fontSize: '0.875rem', textAlign: 'center' }}>
                  ALY-12345678
                </p>
                <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                  <button className="btn btn-primary btn-full btn-sm" onClick={() => {
                    navigator.clipboard.writeText('ALY-12345678');
                    alert('ID copied!');
                  }}>
                    Copy ID
                  </button>
                  <Link href="/id/share" className="btn btn-secondary btn-full btn-sm">
                    Share
                  </Link>
                </div>
              </div>
            </div>

            {/* Family Profiles Section */}
            <h2 style={{ marginBottom: '24px' }}>Family Profiles</h2>
            <div className="grid grid-2">
              <div className="card">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <div style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '12px',
                    background: 'var(--color-accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '1.5rem',
                    fontWeight: 700
                  }}>
                    J
                  </div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ marginBottom: '4px' }}>Jacob</h4>
                    <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>Gluten • Dairy</p>
                  </div>
                  <Link href="/id" className="btn btn-ghost btn-sm">
                    View
                  </Link>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '24px' }}>
              <Link href="/create" className="btn btn-secondary">
                + Add Family Member
              </Link>
            </div>

            {/* Shared Venues Section */}
            <h2 style={{ marginTop: '48px', marginBottom: '24px' }}>Shared Venues & Recipients</h2>
            <div className="card">
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <th style={{ textAlign: 'left', padding: '12px 0', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.875rem' }}>Type</th>
                      <th style={{ textAlign: 'left', padding: '12px 0', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.875rem' }}>Name</th>
                      <th style={{ textAlign: 'left', padding: '12px 0', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.875rem' }}>Location</th>
                      <th style={{ textAlign: 'left', padding: '12px 0', color: 'var(--color-text-muted)', fontWeight: 600, fontSize: '0.875rem' }}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: '1px solid var(--color-border)' }}>
                      <td style={{ padding: '12px 0', fontSize: '0.875rem' }}>Venue</td>
                      <td style={{ padding: '12px 0', fontSize: '0.875rem' }}>Red Lantern</td>
                      <td style={{ padding: '12px 0', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Boston, MA</td>
                      <td style={{ padding: '12px 0', fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>Nov 2025</td>
                    </tr>
                    <tr>
                      <td colSpan={4} style={{ padding: '24px 0', textAlign: 'center', color: 'var(--color-text-muted)' }}>
                        No other shares yet
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
