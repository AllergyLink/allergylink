'use client';

type LogoProps = {
  className?: string;
  size?: number;
  showTagline?: boolean;
};

export default function Logo({ className = '', size = 400, showTagline = true }: LogoProps) {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: showTagline ? '8px' : '0',
      }}
    >
      <img
        src="/allergylink-logo.png"
        alt="AllergyLink"
        style={{ 
          width: `${size}px`, 
          height: 'auto',
          maxWidth: '100%'
        }}
      />
      {showTagline && (
        <span
          style={{
            fontFamily: "'Quicksand', sans-serif",
            fontSize: '0.95rem',
            fontWeight: 500,
            color: '#6B8A86',
            letterSpacing: '0.01em'
          }}
        >
          food allergies shared instantly
        </span>
      )}
    </div>
  );
}
