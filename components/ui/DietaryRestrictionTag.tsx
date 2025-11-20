'use client';

interface DietaryRestrictionTagProps {
  name: string;
  crossContaminationOk?: boolean;
  onClick?: () => void;
}

export default function DietaryRestrictionTag({ name, crossContaminationOk, onClick }: DietaryRestrictionTagProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '999px',
        background: 'rgba(16, 185, 129, 0.1)',
        border: '1.5px solid var(--color-success)',
        fontSize: '0.875rem',
        color: 'var(--color-success)',
        fontWeight: 500,
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <span>{name}</span>
      {crossContaminationOk !== undefined && (
        <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
          {crossContaminationOk ? '(Cross-contamination OK)' : '(No cross-contamination)'}
        </span>
      )}
    </div>
  );
}
