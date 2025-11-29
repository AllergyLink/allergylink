'use client';

import { useState, useEffect } from 'react';
import type { Profile } from '@/lib/models';
import { upsertProfile } from '@/lib/storage';

interface ProfileEditModalProps {
  open: boolean;
  profile: Profile | null;
  onClose: () => void;
  onUpdated: (profile: Profile) => void;
}

export default function ProfileEditModal({
  open,
  profile,
  onClose,
  onUpdated,
}: ProfileEditModalProps) {
  const [firstName, setFirstName] = useState('');
  const [dietary, setDietary] = useState<string>('');

  useEffect(() => {
    if (profile) {
      setFirstName(profile.firstName || '');
      setDietary(profile.dietary.join(', '));
    }
  }, [profile]);

  if (!open || !profile) return null;

  const handleSave = () => {
    const updated: Profile = {
      ...profile,
      firstName: firstName.trim() || profile.firstName,
      dietary: dietary
        .split(',')
        .map((d) => d.trim())
        .filter(Boolean),
      updatedAt: new Date().toISOString(),
    };
    upsertProfile(updated);
    onUpdated(updated);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 200,
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          maxWidth: '480px',
          width: '100%',
          background: 'white',
          borderRadius: '20px',
          padding: '24px 20px 20px',
          boxShadow: '0 20px 60px rgba(15, 23, 42, 0.4)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '16px',
          }}
        >
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
            Edit Profile
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'transparent',
              fontSize: '1.5rem',
              cursor: 'pointer',
              lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        <div style={{ marginBottom: '16px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '8px',
            }}
          >
            First name
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name"
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1.5px solid var(--color-border)',
              fontSize: '0.95rem',
              fontFamily: 'inherit',
            }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label
            style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: 600,
              marginBottom: '8px',
            }}
          >
            Dietary notes (comma separated)
          </label>
          <textarea
            value={dietary}
            onChange={(e) => setDietary(e.target.value)}
            placeholder="e.g. Vegetarian, Low sodium"
            rows={3}
            style={{
              width: '100%',
              padding: '10px 12px',
              borderRadius: '10px',
              border: '1.5px solid var(--color-border)',
              fontSize: '0.95rem',
              fontFamily: 'inherit',
              resize: 'vertical',
            }}
          />
          <p
            style={{
              marginTop: '6px',
              fontSize: '0.75rem',
              color: 'var(--color-text-muted)',
            }}
          >
            This text appears as dietary notes on your shared profile.
          </p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '8px',
          }}
        >
          <button
            type="button"
            onClick={onClose}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: '1.5px solid var(--color-border)',
              background: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: '10px 18px',
              borderRadius: '10px',
              border: 'none',
              background:
                'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
              color: 'white',
              fontWeight: 600,
              cursor: 'pointer',
              fontSize: '0.9rem',
            }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}


