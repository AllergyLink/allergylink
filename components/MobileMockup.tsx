'use client';

import React, { useState } from "react";

/**
 * AllergyLink Mobile Mockups (390 x 844) — tap the buttons to switch screens.
 * Designed for quick stakeholder demos and screenshots.
 *
 * Notes:
 * - This is a static, front-end mock. No backend required.
 * - Layout targets a typical phone size (iPhone 12: 390x844 logical px).
 * - Colors and spacing are neutral/clean to drop into brand later.
 */

const phoneW = 390;
const phoneH = 844;

type ScreenKey = 'home' | 'profile' | 'qr' | 'dashboard';

const Pill = ({ children }: { children: React.ReactNode }) => (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    padding: '4px 12px',
    borderRadius: '999px',
    fontSize: '0.875rem',
    background: '#F1F5F9',
    color: '#334155',
    border: '1px solid #E2E8F0',
    fontFamily: "'Quicksand', sans-serif"
  }}>
    {children}
  </span>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{
    fontSize: '1rem',
    fontWeight: 600,
    color: '#1E293B',
    marginBottom: '8px',
    fontFamily: "'Quicksand', sans-serif"
  }}>{children}</h2>
);

const Divider = () => (
  <div style={{
    height: '1px',
    background: '#E2E8F0',
    margin: '16px 0'
  }} />
);

const QRPlaceholder = ({ id }: { id: string }) => (
  <div style={{
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}>
    <div style={{
      width: '192px',
      height: '192px',
      borderRadius: '12px',
      background: 'linear-gradient(135deg, #111111 10%, #444444 100%)',
      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.2)'
    }} />
    <p style={{
      fontSize: '0.75rem',
      color: '#64748B',
      marginTop: '8px',
      fontFamily: "'Quicksand', sans-serif"
    }}>{id}</p>
  </div>
);

function TopBar({ title }: { title: string }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 16px',
      borderBottom: '1px solid #E2E8F0',
      background: 'white'
    }}>
      <span style={{
        fontSize: '0.875rem',
        color: '#64748B',
        fontFamily: "'Quicksand', sans-serif"
      }}>9:41</span>
      <h1 style={{
        fontSize: '1rem',
        fontWeight: 600,
        color: '#1E293B',
        fontFamily: "'Quicksand', sans-serif"
      }}>{title}</h1>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        color: '#64748B'
      }}>
        <span style={{
          height: '6px',
          width: '6px',
          borderRadius: '50%',
          background: '#64748B'
        }} />
        <span style={{
          height: '6px',
          width: '6px',
          borderRadius: '50%',
          background: '#64748B'
        }} />
        <span style={{
          height: '6px',
          width: '24px',
          borderRadius: '3px',
          background: '#64748B'
        }} />
      </div>
    </div>
  );
}

function PrimaryBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: '100%',
      height: '44px',
      borderRadius: '12px',
      background: '#10B981',
      color: 'white',
      fontWeight: 500,
      border: 'none',
      cursor: 'pointer',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.9375rem',
      transition: 'background-color 0.2s'
    }} onMouseEnter={(e) => e.currentTarget.style.background = '#059669'} onMouseLeave={(e) => e.currentTarget.style.background = '#10B981'}>
      {children}
    </button>
  );
}

function SecondaryBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: '100%',
      height: '44px',
      borderRadius: '12px',
      background: 'white',
      color: '#10B981',
      fontWeight: 500,
      border: '1px solid #10B981',
      cursor: 'pointer',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.9375rem',
      transition: 'background-color 0.2s'
    }} onMouseEnter={(e) => e.currentTarget.style.background = '#ECFDF5'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
      {children}
    </button>
  );
}

function SubtleBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} style={{
      width: '100%',
      height: '44px',
      borderRadius: '12px',
      background: '#F8FAFC',
      color: '#334155',
      fontWeight: 500,
      border: '1px solid #E2E8F0',
      cursor: 'pointer',
      fontFamily: "'Quicksand', sans-serif",
      fontSize: '0.9375rem',
      transition: 'background-color 0.2s'
    }} onMouseEnter={(e) => e.currentTarget.style.background = '#F1F5F9'} onMouseLeave={(e) => e.currentTarget.style.background = '#F8FAFC'}>
      {children}
    </button>
  );
}

// --- Screens ---

function ScreenHome({ go }: { go: (s: ScreenKey) => void }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'white'
    }}>
      <TopBar title="AllergyLink" />
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        overflowY: 'auto',
        flex: 1
      }}>
        <PrimaryBtn onClick={() => go('profile')}>View My Profile</PrimaryBtn>
        <SecondaryBtn onClick={() => go('qr')}>Share QR Code</SecondaryBtn>
        <SubtleBtn onClick={() => go('dashboard')}>Dashboard</SubtleBtn>
      </div>
    </div>
  );
}

function ScreenProfile({ go }: { go: (s: ScreenKey) => void }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'white'
    }}>
      <TopBar title="My Profile" />
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        overflowY: 'auto',
        flex: 1
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '2rem',
            fontWeight: 700,
            fontFamily: "'Quicksand', sans-serif"
          }}>
            M
          </div>
          <h2 style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            color: '#1E293B',
            fontFamily: "'Quicksand', sans-serif"
          }}>Madeline</h2>
        </div>

        <Divider />

        <div>
          <SectionTitle>Food Allergies</SectionTitle>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <Pill>Peanut</Pill>
            <Pill>Dairy</Pill>
            <Pill>Soy</Pill>
          </div>
        </div>

        <div>
          <SectionTitle>Dietary Restrictions</SectionTitle>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px'
          }}>
            <Pill>Vegetarian</Pill>
            <Pill>Gluten-Free</Pill>
          </div>
        </div>

        <PrimaryBtn onClick={() => go('home')}>Back to Home</PrimaryBtn>
      </div>
    </div>
  );
}

function ScreenQR({ go }: { go: (s: ScreenKey) => void }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'white'
    }}>
      <TopBar title="Share QR Code" />
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        overflowY: 'auto',
        flex: 1,
        justifyContent: 'center'
      }}>
        <QRPlaceholder id="allergylink.com/id/abc123" />
        <p style={{
          fontSize: '0.875rem',
          color: '#64748B',
          textAlign: 'center',
          maxWidth: '280px',
          fontFamily: "'Quicksand', sans-serif"
        }}>
          Scan this QR code to view allergy information
        </p>
        <SecondaryBtn onClick={() => go('home')}>Back to Home</SecondaryBtn>
      </div>
    </div>
  );
}

function ScreenDashboard({ go }: { go: (s: ScreenKey) => void }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'white'
    }}>
      <TopBar title="Dashboard" />
      <div style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        overflowY: 'auto',
        flex: 1
      }}>
        <SectionTitle>My Profiles</SectionTitle>
        <div style={{
          padding: '16px',
          background: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #E2E8F0'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #0EA5E9 0%, #3B82F6 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '1.25rem',
              fontWeight: 700,
              fontFamily: "'Quicksand', sans-serif"
            }}>
              M
            </div>
            <div>
              <div style={{
                fontWeight: 600,
                color: '#1E293B',
                fontFamily: "'Quicksand', sans-serif"
              }}>Madeline</div>
              <div style={{
                fontSize: '0.875rem',
                color: '#64748B',
                fontFamily: "'Quicksand', sans-serif"
              }}>My Profile</div>
            </div>
          </div>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '6px'
          }}>
            <Pill>Peanut</Pill>
            <Pill>Dairy</Pill>
            <Pill>Soy</Pill>
          </div>
        </div>

        <PrimaryBtn onClick={() => go('home')}>Back to Home</PrimaryBtn>
      </div>
    </div>
  );
}

export default function MobileMockup() {
  const [screen, setScreen] = useState<ScreenKey>('home');

  const renderScreen = () => {
    switch (screen) {
      case 'home':
        return <ScreenHome go={setScreen} />;
      case 'profile':
        return <ScreenProfile go={setScreen} />;
      case 'qr':
        return <ScreenQR go={setScreen} />;
      case 'dashboard':
        return <ScreenDashboard go={setScreen} />;
      default:
        return <ScreenHome go={setScreen} />;
    }
  };

  return (
    <div style={{
      width: `${phoneW}px`,
      height: `${phoneH}px`,
      borderRadius: '24px',
      overflow: 'hidden',
      boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
      background: '#000',
      padding: '8px',
      margin: '0 auto'
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        borderRadius: '20px',
        overflow: 'hidden',
        background: 'white'
      }}>
        {renderScreen()}
      </div>
    </div>
  );
}

