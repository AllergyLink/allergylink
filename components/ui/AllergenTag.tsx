'use client';

const allergySymbols: Record<string, string> = {
  Peanut: '🥜',
  'Tree Nut': '🌰',
  Milk: '🥛',
  Egg: '🍳',
  Wheat: '🌾',
  Soy: '🫘',
  Sesame: '🧆',
  Fish: '🐟',
  Shellfish: '🦐',
  Gluten: '🍞',
  Corn: '🌽',
  Mustard: '🧂',
  Lupin: '🌼',
  Sulfites: '🍷',
  Celery: '🥬',
};

interface AllergenTagProps {
  name: string;
  severity?: 'anaphylactic' | 'no-cross' | 'cross-ok';
  showSeverity?: boolean;
  onClick?: () => void;
}

export default function AllergenTag({ name, severity, showSeverity = false, onClick }: AllergenTagProps) {
  const symbol = allergySymbols[name] || '🍽️';
  const severityLabels: Record<string, string> = {
    anaphylactic: 'Anaphylactic',
    'no-cross': 'No cross-contamination',
    'cross-ok': 'Cross-contamination OK',
  };

  return (
    <div
      onClick={onClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '6px 12px',
        borderRadius: '999px',
        background: 'rgba(0, 82, 204, 0.1)',
        border: '1.5px solid var(--color-primary)',
        fontSize: '0.875rem',
        color: 'var(--color-primary)',
        fontWeight: 500,
        cursor: onClick ? 'pointer' : 'default'
      }}
    >
      <span style={{ fontSize: '1rem' }}>{symbol}</span>
      <span>{name}</span>
      {showSeverity && severity && (
        <span style={{ fontSize: '0.75rem', opacity: 0.8 }}>
          • {severityLabels[severity]}
        </span>
      )}
    </div>
  );
}
