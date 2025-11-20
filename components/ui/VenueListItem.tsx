'use client';

interface VenueListItemProps {
  type: 'venue' | 'person';
  name: string;
  cityState?: string;
  date: string;
  safeVisit?: boolean;
}

export default function VenueListItem({ type, name, cityState, date, safeVisit }: VenueListItemProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        background: 'var(--color-bg)',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        marginBottom: '12px'
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 600, marginBottom: '4px' }}>
          {type === 'venue' ? '🏢' : '👤'} {name}
        </div>
        <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>
          {cityState && `${cityState} • `}
          {formattedDate}
        </p>
      </div>
      {safeVisit && (
        <span
          style={{
            padding: '4px 12px',
            borderRadius: '999px',
            background: 'rgba(16, 185, 129, 0.1)',
            color: 'var(--color-success)',
            fontSize: '0.75rem',
            fontWeight: 600
          }}
        >
          Safe Visit
        </span>
      )}
    </div>
  );
}
