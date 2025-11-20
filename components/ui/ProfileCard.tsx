'use client';

import Link from 'next/link';
import QR from '@/components/QR';
import type { Profile } from '@/lib/models';

interface ProfileCardProps {
  profile: Profile;
  showActions?: boolean;
  showQR?: boolean;
  compact?: boolean;
}

export default function ProfileCard({ profile, showActions = true, showQR = true, compact = false }: ProfileCardProps) {
  const initials = profile.firstName?.charAt(0).toUpperCase() || '?';
  const allergyList = profile.allergies.map(a => a.name).join(' • ');

  return (
    <div className="card" style={{ padding: compact ? '20px' : '24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px' }}>
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.firstName}
            style={{
              width: compact ? '56px' : '64px',
              height: compact ? '56px' : '64px',
              borderRadius: '16px',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div
            style={{
              width: compact ? '56px' : '64px',
              height: compact ? '56px' : '64px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: compact ? '1.5rem' : '2rem',
              fontWeight: 700
            }}
          >
            {initials}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <h3 style={{ marginBottom: '4px' }}>{profile.firstName || 'Unnamed'}</h3>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>
            {profile.familyOf ? 'Family Profile' : 'Primary Profile'}
          </p>
        </div>
      </div>

      {allergyList && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {profile.allergies.map((allergy, idx) => (
            <span key={idx} className="chip chip-primary">
              {allergy.name}
            </span>
          ))}
        </div>
      )}

      {profile.dietary && profile.dietary.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
          {profile.dietary.map((diet, idx) => (
            <span key={idx} className="chip chip-success">
              {diet}
            </span>
          ))}
        </div>
      )}

      {showQR && (
        <div style={{ marginBottom: '20px', textAlign: 'center' }}>
          <div
            style={{
              background: 'var(--color-bg)',
              padding: '16px',
              borderRadius: '12px',
              display: 'inline-block',
              border: '1px solid var(--color-border)'
            }}
          >
            <QR value={`https://id.allergylink.net/${profile.id}`} size={compact ? 140 : 180} />
          </div>
          <p className="text-muted" style={{ marginTop: '12px', marginBottom: 0, fontFamily: 'monospace', fontSize: '0.875rem' }}>
            {profile.id}
          </p>
        </div>
      )}

      {showActions && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <button
            className="btn btn-primary btn-full btn-sm"
            onClick={() => {
              navigator.clipboard.writeText(profile.id);
              alert('ID copied!');
            }}
          >
            Copy ID
          </button>
          <Link href={`/id/share`} className="btn btn-secondary btn-full btn-sm">
            Share Profile
          </Link>
          {showQR && (
            <Link href={`/id`} className="btn btn-ghost btn-full btn-sm">
              Show Full QR
            </Link>
          )}
        </div>
      )}

      {profile.updatedAt && (
        <p className="text-muted" style={{ marginTop: '16px', fontSize: '0.75rem', textAlign: 'center' }}>
          Last updated: {new Date(profile.updatedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
}
