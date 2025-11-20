'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BottomNavigation from '@/components/ui/BottomNavigation';
import QR from '@/components/QR';
import ProfileCard from '@/components/ui/ProfileCard';
import FamilyProfileCard from '@/components/ui/FamilyProfileCard';
import VenueListItem from '@/components/ui/VenueListItem';
import { useAuth } from '@/lib/firebase/hooks';
import { getPrimaryProfile, listProfiles, listShared } from '@/lib/firebase/storage';
import type { Profile, SharedEntry } from '@/lib/models';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'venues' | 'supporters'>('dashboard');
  const [primaryProfile, setPrimaryProfile] = useState<Profile | null>(null);
  const [familyProfiles, setFamilyProfiles] = useState<Profile[]>([]);
  const [sharedVenues, setSharedVenues] = useState<SharedEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        const [primary, family, shared] = await Promise.all([
          getPrimaryProfile(user.uid),
          listProfiles(user.uid, true),
          listShared(user.uid),
        ]);
        
        setPrimaryProfile(primary);
        setFamilyProfiles(family);
        setSharedVenues(shared);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user, authLoading]);

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

  if (authLoading || loading) {
    return (
      <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
        <Navigation />
        <div className="container-wide section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <div>Loading...</div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
        <Navigation />
        <div className="container-wide section" style={{ textAlign: 'center' }}>
          <h2>Please sign in to view your dashboard</h2>
          <Link href="/auth/sign-in" className="btn btn-primary" style={{ marginTop: '16px' }}>
            Sign In
          </Link>
        </div>
      </main>
    );
  }

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
            
            {primaryProfile ? (
              <div className="grid grid-2" style={{ marginBottom: '48px' }}>
                {/* Primary Profile Card */}
                <ProfileCard profile={primaryProfile} showActions={true} showQR={false} />
              
              {/* QR Code Card */}
              <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <h3 style={{ marginBottom: '16px', textAlign: 'center' }}>Share QR Code</h3>
                <div style={{ 
                  background: 'var(--color-bg)', 
                  padding: '16px', 
                  borderRadius: '12px',
                  marginBottom: '16px'
                }}>
                  <QR value={`https://id.allergylink.net/${primaryProfile.id}`} size={180} />
                </div>
                <p className="text-muted" style={{ marginBottom: '16px', fontSize: '0.875rem', textAlign: 'center' }}>
                  {primaryProfile.id}
                </p>
                <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
                  <button className="btn btn-primary btn-full btn-sm" onClick={() => {
                    navigator.clipboard.writeText(primaryProfile.id);
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
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '48px' }}>
                <p style={{ marginBottom: '16px' }}>No profile found. Create your first profile to get started.</p>
                <Link href="/create" className="btn btn-primary">
                  Create Profile
                </Link>
              </div>
            )}

            {/* Family Profiles Section */}
            <h2 style={{ marginBottom: '24px', marginTop: '48px' }}>Family Profiles</h2>
            {familyProfiles.length > 0 ? (
              <div className="grid grid-2">
                {familyProfiles.map((profile) => (
                  <FamilyProfileCard key={profile.id} profile={profile} />
                ))}
              </div>
            ) : (
              <div className="card" style={{ textAlign: 'center', padding: '24px' }}>
                <p className="text-muted" style={{ marginBottom: '16px' }}>No family profiles yet.</p>
              </div>
            )}

            <div style={{ marginTop: '24px' }}>
              <Link href="/create" className="btn btn-secondary">
                + Add Family Member
              </Link>
            </div>

            {/* Shared Venues Section */}
            <h2 style={{ marginTop: '48px', marginBottom: '24px' }}>Shared Venues & Recipients</h2>
            {sharedVenues.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {sharedVenues.map((venue, idx) => (
                  <VenueListItem
                    key={idx}
                    type={venue.type}
                    name={venue.name}
                    cityState={venue.cityState}
                    date={venue.date}
                    safeVisit={true}
                  />
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '24px', color: 'var(--color-text-muted)' }}>
                No shared venues yet
              </div>
            )}

            {/* Saved / Favorite Venues Section */}
            <h2 style={{ marginTop: '48px', marginBottom: '24px' }}>Saved / Favorite Venues</h2>
            <div className="card">
              <p className="text-muted" style={{ marginBottom: '16px' }}>
                Keep a list of your favorite venues for quick sharing.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px',
                  background: 'var(--color-bg)',
                  borderRadius: '12px',
                  border: '1px solid var(--color-border)'
                }}>
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>⭐ Green Leaf Café</div>
                    <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>Boston, MA</p>
                  </div>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      navigator.clipboard.writeText('ALY-12345678');
                      alert('ID copied! Share with Green Leaf Café');
                    }}
                  >
                    Share ID
                  </button>
                </div>
                <div style={{ textAlign: 'center', padding: '16px', color: 'var(--color-text-muted)' }}>
                  <button className="btn btn-ghost btn-sm">+ Add Favorite Venue</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <BottomNavigation />
      <div style={{ height: '80px' }} /> {/* Spacer for bottom nav */}
      <Footer />
    </main>
  );
}
