'use client';

import { useState } from 'react';

interface TrustedSupporterCardProps {
  name: string;
  description: string;
  logo?: string;
}

export default function TrustedSupporterCard({ name, description, logo }: TrustedSupporterCardProps) {
  const [promotionPreference, setPromotionPreference] = useState<'yes' | 'no' | null>(null);

  return (
    <div className="card">
      <div
        style={{
          width: '80px',
          height: '80px',
          borderRadius: '16px',
          background: 'var(--color-bg)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '20px',
          border: '1px solid var(--color-border)'
        }}
      >
        {logo ? (
          <img src={logo} alt={name} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '8px' }} />
        ) : (
          <div
            style={{
              fontSize: '2rem',
              fontWeight: 700,
              color: 'var(--color-primary)'
            }}
          >
            {name.charAt(0)}
          </div>
        )}
      </div>
      <h3 style={{ marginBottom: '12px' }}>{name}</h3>
      <p className="text-muted" style={{ margin: 0, marginBottom: '20px', lineHeight: 1.6 }}>
        {description}
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '4px' }}>
          Promotions:
        </label>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name={`promo-${name}`}
              checked={promotionPreference === 'yes'}
              onChange={() => setPromotionPreference('yes')}
              style={{ cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.875rem' }}>Yes: Show me relevant promotions</span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
            <input
              type="radio"
              name={`promo-${name}`}
              checked={promotionPreference === 'no'}
              onChange={() => setPromotionPreference('no')}
              style={{ cursor: 'pointer' }}
            />
            <span style={{ fontSize: '0.875rem' }}>Not now</span>
          </label>
        </div>
      </div>
    </div>
  );
}
