'use client';

import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BottomNavigation from '@/components/ui/BottomNavigation';

export default function Family() {
  const familyMembers = [
    {
      name: 'Jacob',
      allergies: ['Gluten', 'Dairy'],
      age: 8,
      initials: 'J'
    },
    {
      name: 'Emma',
      allergies: ['Peanut'],
      age: 5,
      initials: 'E'
    }
  ];

  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
      <Navigation />
      
      <div className="container section">
        <div style={{ marginBottom: '32px' }}>
          <h1>Family Profiles</h1>
          <p>
            Manage allergy profiles for your entire family from one account.
          </p>
        </div>

        <div className="grid grid-2" style={{ marginBottom: '32px' }}>
          {familyMembers.map((member, idx) => (
            <div key={idx} className="card">
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '16px' }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '2rem',
                  fontWeight: 700
                }}>
                  {member.initials}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ marginBottom: '4px' }}>{member.name}</h3>
                  <p className="text-muted" style={{ margin: 0, fontSize: '0.875rem' }}>
                    Age {member.age}
                  </p>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '16px' }}>
                {member.allergies.map((allergy, allergyIdx) => (
                  <span key={allergyIdx} className="chip chip-primary">
                    {allergy}
                  </span>
                ))}
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <Link href="/id" className="btn btn-primary btn-full btn-sm">
                  View Profile
                </Link>
                <Link href="/create" className="btn btn-secondary btn-full btn-sm">
                  Edit
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="card" style={{ background: 'rgba(0, 82, 204, 0.05)', borderColor: 'var(--color-primary)' }}>
          <Link href="/create" className="btn btn-primary">
            + Add Family Member
          </Link>
        </div>

        <div className="card" style={{ marginTop: '32px' }}>
          <h3 style={{ marginBottom: '12px' }}>About Family Profiles</h3>
          <p className="text-muted" style={{ margin: 0 }}>
            Children can share on their own starting at age 13 (configurable). Until then, parents or guardians manage their profiles and sharing.
          </p>
        </div>
      </div>

      <BottomNavigation />
      <div style={{ height: '80px' }} /> {/* Spacer for bottom nav */}
      <Footer />
    </main>
  );
}
