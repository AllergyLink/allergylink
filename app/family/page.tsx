'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import BottomNavigation from '@/components/ui/BottomNavigation';
import FamilyProfileCard from '@/components/ui/FamilyProfileCard';
import { useAuth } from '@/lib/firebase/hooks';
import { listProfiles } from '@/lib/firebase/storage';
import type { Profile } from '@/lib/models';

export default function Family() {
  const { user, loading: authLoading } = useAuth();
  const [familyProfiles, setFamilyProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    
    if (!user) {
      setLoading(false);
      return;
    }

    const loadFamilyProfiles = async () => {
      try {
        const profiles = await listProfiles(user.uid, true);
        setFamilyProfiles(profiles);
      } catch (error) {
        console.error('Error loading family profiles:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFamilyProfiles();
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
        <Navigation />
        <div className="container section" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
          <div>Loading...</div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
        <Navigation />
        <div className="container section" style={{ textAlign: 'center' }}>
          <h2>Please sign in to view family profiles</h2>
          <Link href="/auth/sign-in" className="btn btn-primary" style={{ marginTop: '16px' }}>
            Sign In
          </Link>
        </div>
      </main>
    );
  }

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

        {familyProfiles.length > 0 ? (
          <div className="grid grid-2" style={{ marginBottom: '32px' }}>
            {familyProfiles.map((profile) => (
              <FamilyProfileCard key={profile.id} profile={profile} />
            ))}
          </div>
        ) : (
          <div className="card" style={{ textAlign: 'center', padding: '48px', marginBottom: '32px' }}>
            <p className="text-muted" style={{ marginBottom: '16px' }}>
              No family profiles yet. Add your first family member to get started.
            </p>
          </div>
        )}

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
