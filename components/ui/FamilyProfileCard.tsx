'use client';

import Link from 'next/link';
import type { Profile } from '@/lib/models';

interface FamilyProfileCardProps {
  profile: Profile;
  onEdit?: () => void;
  onView?: () => void;
}

export default function FamilyProfileCard({ profile, onEdit, onView }: FamilyProfileCardProps) {
  const initials = profile.firstName?.charAt(0).toUpperCase() || '?';
  const allergyList = profile.allergies.map(a => a.name).join(' • ');

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
        {profile.avatarUrl ? (
          <img
            src={profile.avatarUrl}
            alt={profile.firstName}
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div
            style={{
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
            }}
          >
            {initials}
          </div>
        )}
        <div style={{ flex: 1 }}>
          <h4 style={{ marginBottom: '4px' }}>{profile.firstName || 'Unnamed'}</h4>
          <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>
            {allergyList || 'No allergies listed'}
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '8px' }}>
        {onView ? (
          <button onClick={onView} className="btn btn-primary btn-full btn-sm">
            View Profile
          </button>
        ) : (
          <Link href="/id" className="btn btn-primary btn-full btn-sm">
            View Profile
          </Link>
        )}
        {onEdit ? (
          <button onClick={onEdit} className="btn btn-secondary btn-full btn-sm">
            Edit
          </button>
        ) : (
          <Link href="/create" className="btn btn-secondary btn-full btn-sm">
            Edit
          </Link>
        )}
      </div>
    </div>
  );
}
