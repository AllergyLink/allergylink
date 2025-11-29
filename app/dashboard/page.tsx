'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import UnifiedNavigation from '@/components/UnifiedNavigation';
import Footer from '@/components/Footer';
import QR from '@/components/QR';
import { getProfile, listProfiles, listShared, load } from '@/lib/storage';
import type { Profile } from '@/lib/models';
import ProfileEditModal from '@/components/ProfileEditModal';

export default function Dashboard() {
  const router = useRouter();
  const [primaryProfile, setPrimaryProfile] = useState<Profile | undefined>();
  const [familyProfiles, setFamilyProfiles] = useState<Profile[]>([]);
  const [sharedVenues, setSharedVenues] = useState(listShared());
  const [copied, setCopied] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | null>(null);
  const [editOpen, setEditOpen] = useState(false);

  useEffect(() => {
    const state = load();
    const primary = getProfile();
    
    if (!primary) {
      // No profile exists, redirect to onboarding
      router.push('/onboarding');
      return;
    }

    setPrimaryProfile(primary);
    
    // Get family profiles
    const allProfiles = listProfiles(false);
    const family = allProfiles.filter(p => p.familyOf === primary.id);
    setFamilyProfiles(family);
    
    // Load shared venues
    setSharedVenues(listShared());
  }, []);

  const handleCopyId = () => {
    if (primaryProfile) {
      navigator.clipboard.writeText(primaryProfile.id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = () => {
    if (primaryProfile) {
      if (navigator.share) {
        navigator.share({
          title: `${primaryProfile.firstName}'s AllergyLink`,
          text: `Check out my allergy profile: ${primaryProfile.id}`,
          url: `https://id.allergylink.net/${primaryProfile.id}`,
        }).catch(() => {
          // Fallback to clipboard if share fails
          handleCopyId();
        });
      } else {
        handleCopyId();
      }
    }
  };

  if (!primaryProfile) {
    return (
      <main style={{ minHeight: '100dvh', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading...</div>
      </main>
    );
  }

  const topAllergies = primaryProfile.allergies.slice(0, 3).map(a => a.name);

  return (
    <main style={{ minHeight: '100dvh', background: 'var(--color-bg)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <UnifiedNavigation />

      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px 20px 120px' }}>
        {/* Hero Section: QR Code Prominence */}
        <div
          style={{
            background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
            borderRadius: '24px',
            padding: '32px 24px',
            marginBottom: '24px',
            color: 'white',
            boxShadow: '0 8px 24px rgba(11, 89, 207, 0.3)',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                background: 'white',
                borderRadius: '20px',
                padding: '20px',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
              }}
            >
              <QR value={`https://id.allergylink.net/${primaryProfile.id}`} size={200} />
            </div>
            <div style={{ textAlign: 'center' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '8px' }}>
                {primaryProfile.firstName}'s AllergyLink
              </h1>
              <p
                style={{
                  fontFamily: 'monospace',
                  fontSize: '1.125rem',
                  marginBottom: '16px',
                  opacity: 0.9,
                }}
              >
                {primaryProfile.id}
              </p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button
                  onClick={handleCopyId}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: '2px solid white',
                    background: copied ? 'rgba(255, 255, 255, 0.2)' : 'white',
                    color: copied ? 'white' : 'var(--color-primary)',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9375rem',
                    transition: 'all 0.2s',
                  }}
                >
                  {copied ? '✓ Copied!' : 'Copy ID'}
                </button>
                <button
                  onClick={handleShare}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '12px',
                    border: '2px solid white',
                    background: 'transparent',
                    color: 'white',
                    fontWeight: 600,
                    cursor: 'pointer',
                    fontSize: '0.9375rem',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  Share Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Profile Card */}
        <div
          style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            marginBottom: '24px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
            <div
              style={{
                width: '72px',
                height: '72px',
                borderRadius: '18px',
                background: primaryProfile.avatarUrl
                  ? 'transparent'
                  : 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2.5rem',
                fontWeight: 700,
                overflow: 'hidden',
                flexShrink: 0,
              }}
            >
              {primaryProfile.avatarUrl ? (
                <img
                  src={primaryProfile.avatarUrl}
                  alt={primaryProfile.firstName}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                primaryProfile.firstName.charAt(0).toUpperCase()
              )}
            </div>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '4px' }}>
                {primaryProfile.firstName}
              </h2>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.875rem', margin: 0 }}>
                Primary Profile
              </p>
            </div>
            <Link
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setEditingProfile(primaryProfile);
                setEditOpen(true);
              }}
              style={{
                padding: '10px 20px',
                borderRadius: '10px',
                border: '1.5px solid var(--color-border)',
                background: 'white',
                color: 'var(--color-text)',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '0.9375rem',
              }}
            >
              Edit
            </Link>
          </div>

          {topAllergies.length > 0 && (
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text-muted)' }}>
                Top Allergies
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {topAllergies.map((allergy) => (
                  <span
                    key={allergy}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '999px',
                      background: 'rgba(11, 89, 207, 0.1)',
                      border: '1px solid var(--color-primary)',
                      fontSize: '0.875rem',
                      color: 'var(--color-primary)',
                      fontWeight: 600,
                    }}
                  >
                    {allergy}
                  </span>
                ))}
                {primaryProfile.allergies.length > 3 && (
                  <span
                    style={{
                      padding: '6px 12px',
                      borderRadius: '999px',
                      background: 'var(--color-bg)',
                      border: '1px solid var(--color-border)',
                      fontSize: '0.875rem',
                      color: 'var(--color-text-muted)',
                      fontWeight: 500,
                    }}
                  >
                    +{primaryProfile.allergies.length - 3} more
                  </span>
                )}
              </div>
            </div>
          )}

          <Link
            href={`/id/${primaryProfile.id}`}
            style={{
              display: 'block',
              padding: '12px 20px',
              borderRadius: '10px',
              background: 'var(--color-primary)',
              color: 'white',
              textAlign: 'center',
              fontWeight: 600,
              textDecoration: 'none',
              fontSize: '0.9375rem',
            }}
          >
            View Full Profile
          </Link>
        </div>

        {/* Family Profiles Section */}
        {familyProfiles.length > 0 && (
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Family Profiles</h2>
              <Link
                href="/onboarding?family=true"
                style={{
                  fontSize: '0.875rem',
                  color: 'var(--color-primary)',
                  fontWeight: 600,
                  textDecoration: 'none',
                }}
              >
                + Add Member
              </Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
              {familyProfiles.map((profile) => (
                <div
                  key={profile.id}
                  style={{
                    background: 'white',
                    borderRadius: '16px',
                    padding: '20px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                    <div
                      style={{
                        width: '56px',
                        height: '56px',
                        borderRadius: '14px',
                        background: profile.avatarUrl
                          ? 'transparent'
                          : 'var(--color-accent)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        overflow: 'hidden',
                      }}
                    >
                      {profile.avatarUrl ? (
                        <img
                          src={profile.avatarUrl}
                          alt={profile.firstName}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        profile.firstName.charAt(0).toUpperCase()
                      )}
                    </div>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '4px' }}>
                        {profile.firstName}
                      </h3>
                      <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', margin: 0 }}>
                        {profile.allergies.slice(0, 2).map(a => a.name).join(' • ')}
                        {profile.allergies.length > 2 && ` • +${profile.allergies.length - 2}`}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/id/${profile.id}`}
                    style={{
                      display: 'block',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      border: '1.5px solid var(--color-border)',
                      background: 'white',
                      color: 'var(--color-text)',
                      textAlign: 'center',
                      fontWeight: 600,
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                    }}
                  >
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add Family Member CTA (if no family) */}
        {familyProfiles.length === 0 && (
          <div
            style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              marginBottom: '24px',
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            }}
          >
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>
              Add profiles for family members to manage everyone's allergies in one place
            </p>
            <Link
              href="/onboarding?family=true"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                borderRadius: '10px',
                background: 'var(--color-primary)',
                color: 'white',
                fontWeight: 600,
                textDecoration: 'none',
                fontSize: '0.9375rem',
              }}
            >
              + Add Family Member
            </Link>
          </div>
        )}

        {/* Shared Venues Section */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Shared Venues</h2>
            <Link
              href="/dashboard/venues"
              style={{
                fontSize: '0.875rem',
                color: 'var(--color-primary)',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              View All
            </Link>
          </div>
          {sharedVenues.length > 0 ? (
            <div
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '20px',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            >
              {sharedVenues.slice(0, 5).map((venue, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '12px 0',
                    borderBottom: idx < sharedVenues.slice(0, 5).length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 600, marginBottom: '4px' }}>{venue.name}</div>
                    {venue.cityState && (
                      <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                        {venue.cityState}
                      </div>
                    )}
                  </div>
                  <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)' }}>
                    {new Date(venue.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div
              style={{
                background: 'white',
                borderRadius: '16px',
                padding: '32px',
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
              }}
            >
              <p style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>
                No venues shared yet. Start sharing your AllergyLink ID with restaurants, schools, and venues.
              </p>
            </div>
          )}
        </div>
      </div>

      <Footer />

      <ProfileEditModal
        open={editOpen}
        profile={editingProfile}
        onClose={() => setEditOpen(false)}
        onUpdated={(updated) => {
          setPrimaryProfile(updated);
        }}
      />
    </main>
  );
}
