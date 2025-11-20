'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import QR from '@/components/QR';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { TOP_ALLERGIES } from '@/lib/constants';
import type { Severity } from '@/lib/models';
import { newId } from '@/lib/firebase/storage';
import { upsertProfile } from '@/lib/firebase/storage';
import { useAuth } from '@/lib/firebase/hooks';

const severityLabels: Record<Severity, string> = {
  anaphylactic: 'Severe / Anaphalatic - no cross contamination -',
  'no-cross': 'No cross contamination',
  'cross-ok': 'Cross contamination ok',
};

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

const INITIAL_SEVERITY: Severity = 'anaphylactic';

type SelectedAllergy = {
  name: string;
  severity: Severity;
  notes?: string;
};

type PreviewProfile = {
  id: string;
  firstName: string;
  avatarUrl?: string;
  allergies: SelectedAllergy[];
  dietary: string[];
};

type ProfileType = 'primary' | 'secondary' | 'family';

export default function CreateProfile() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [profileType, setProfileType] = useState<ProfileType>('primary');
  const [makePrimary, setMakePrimary] = useState(true);
  const [firstName, setFirstName] = useState('');
  const [nameVisible, setNameVisible] = useState(true);
  const [avatarUrl, setAvatarUrl] = useState<string>();
  const [selectedAllergies, setSelectedAllergies] = useState<Record<string, SelectedAllergy>>({});
  const [otherAllergies, setOtherAllergies] = useState(
    Array.from({ length: 3 }, () => ({ name: '', severity: INITIAL_SEVERITY }))
  );
  const [selectedDietary, setSelectedDietary] = useState<string[]>([]);
  const [emergencyContact, setEmergencyContact] = useState({
    name: '',
    relationship: '',
    phone: '',
    notes: ''
  });
  const [showPreview, setShowPreview] = useState(false);
  const [preview, setPreview] = useState<PreviewProfile | null>(null);
  const [saving, setSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const allergyList = useMemo(() => TOP_ALLERGIES, []);
  const dietaryList = ['Vegan', 'Gluten Intolerance', 'Low Sodium', 'Cilantro', 'Cinnamon'];

  const toggleAllergy = (name: string) => {
    setSelectedAllergies((prev) => {
      const next = { ...prev };
      if (next[name]) {
        delete next[name];
      } else {
        next[name] = { name, severity: INITIAL_SEVERITY };
      }
      return next;
    });
  };

  const changeSeverity = (name: string, severity: Severity) => {
    setSelectedAllergies((prev) => ({
      ...prev,
      [name]: { ...prev[name], severity },
    }));
  };

  const updateOtherAllergy = (idx: number, field: 'name' | 'severity', value: string | Severity) => {
    setOtherAllergies((prev) => {
      const next = [...prev];
      next[idx] = {
        ...next[idx],
        [field]: value,
      };
      return next;
    });
  };

  const toggleDietary = (item: string) => {
    setSelectedDietary((prev) =>
      prev.includes(item) ? prev.filter((x) => x !== item) : [...prev, item]
    );
  };

  const triggerUpload = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setAvatarUrl(String(reader.result));
    reader.readAsDataURL(file);
  };

  const createProfile = async (withPreview = true) => {
    if (!user) {
      alert('Please sign in to create a profile');
      return;
    }

    setSaving(true);
    try {
      const id = newId();
      const allergies = [
        ...Object.values(selectedAllergies),
        ...otherAllergies.filter((o) => o.name.trim() !== ''),
      ];

      const profileData = {
        id,
        userId: user.uid,
        firstName,
        nameVisible,
        avatarUrl,
        allergies,
        dietary: selectedDietary,
        emergencyContact: emergencyContact.name ? emergencyContact : undefined,
        updatedAt: new Date().toISOString(),
        isPrimary: profileType === 'primary' || makePrimary,
        profileType,
        familyOf: profileType === 'family' ? undefined : undefined, // TODO: Set parent ID if needed
      };

      await upsertProfile(profileData);

      if (withPreview) {
        setPreview({ id, firstName, avatarUrl, allergies, dietary: selectedDietary });
        setShowPreview(true);
      } else {
        // Redirect to dashboard after saving
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const resetAvatar = () => setAvatarUrl(undefined);

  if (authLoading) {
    return (
      <main className="page-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div>Loading...</div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="page-shell" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <div style={{ textAlign: 'center' }}>
          <h2>Please sign in to create a profile</h2>
          <Link href="/auth/sign-in" className="btn btn-primary" style={{ marginTop: '16px' }}>
            Sign In
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: '100dvh',
        background: 'linear-gradient(180deg, #F2F7F5 0%, #FFFFFF 70%)',
        paddingBottom: 'env(safe-area-inset-bottom)',
        paddingLeft: 'env(safe-area-inset-left)',
        paddingRight: 'env(safe-area-inset-right)',
        fontFamily: "'Quicksand', sans-serif"
      }}
    >
      <Navigation />
      
      <section
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '32px 20px 64px'
        }}
      >
        {!showPreview ? (
          <div
            style={{
              background: 'white',
              borderRadius: '24px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
              padding: '32px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '32px'
            }}
          >
            <header style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '20px',
              marginBottom: '8px'
            }}>
              <h1 style={{
                fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
                fontWeight: 700,
                color: 'var(--color-primary)',
                margin: 0,
                letterSpacing: '-0.02em',
                lineHeight: 1.2
              }}>
                Create your sharable AllergyLink Profile
              </h1>
            </header>

            {/* Profile Type Selection */}
            <section>
              <label style={{ marginBottom: '12px', display: 'block' }}>Profile Type</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '12px', borderRadius: '12px', border: profileType === 'primary' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', background: profileType === 'primary' ? 'rgba(0, 82, 204, 0.05)' : 'white' }}>
                  <input
                    type="radio"
                    name="profileType"
                    value="primary"
                    checked={profileType === 'primary'}
                    onChange={(e) => setProfileType(e.target.value as ProfileType)}
                    style={{ cursor: 'pointer' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>Primary Personal Profile</div>
                    <div className="text-muted" style={{ fontSize: '0.875rem' }}>Your main allergy profile</div>
                  </div>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '12px', borderRadius: '12px', border: profileType === 'secondary' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', background: profileType === 'secondary' ? 'rgba(0, 82, 204, 0.05)' : 'white' }}>
                  <input
                    type="radio"
                    name="profileType"
                    value="secondary"
                    checked={profileType === 'secondary'}
                    onChange={(e) => setProfileType(e.target.value as ProfileType)}
                    style={{ cursor: 'pointer' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>Secondary Personal Profile</div>
                    <div className="text-muted" style={{ fontSize: '0.875rem' }}>An additional profile for yourself</div>
                  </div>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', padding: '12px', borderRadius: '12px', border: profileType === 'family' ? '2px solid var(--color-primary)' : '1px solid var(--color-border)', background: profileType === 'family' ? 'rgba(0, 82, 204, 0.05)' : 'white' }}>
                  <input
                    type="radio"
                    name="profileType"
                    value="family"
                    checked={profileType === 'family'}
                    onChange={(e) => setProfileType(e.target.value as ProfileType)}
                    style={{ cursor: 'pointer' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600 }}>Family Profile</div>
                    <div className="text-muted" style={{ fontSize: '0.875rem' }}>For a family member (child, partner, etc.)</div>
                  </div>
                </label>
              </div>
              {profileType !== 'primary' && (
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={makePrimary}
                    onChange={(e) => setMakePrimary(e.target.checked)}
                    style={{ cursor: 'pointer' }}
                  />
                  <span style={{ fontSize: '0.875rem' }}>Make This My Primary Profile</span>
                </label>
              )}
            </section>

            {/* First Name */}
            <section>
              <label>First Name</label>
              <input
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="e.g. Madeline"
              />
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '12px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={nameVisible}
                  onChange={(e) => setNameVisible(e.target.checked)}
                  style={{ cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.875rem' }}>Show my name to venues</span>
              </label>
            </section>

            {/* Avatar */}
            <section>
              <label>Upload photo or create avatar</label>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: 'none' }} />
                <button
                  onClick={triggerUpload}
                  className="btn btn-ghost btn-sm"
                >
                  Upload Photo
                </button>
                <button
                  onClick={() => setAvatarUrl('/default-avatar.png')}
                  className="btn btn-ghost btn-sm"
                >
                  Use Default Avatar
                </button>
                {avatarUrl && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px'
                  }}>
                    <img src={avatarUrl} alt="Preview" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover' }} />
                    <button
                      onClick={resetAvatar}
                      style={{
                        padding: '6px 12px',
                        borderRadius: '8px',
                        border: '1px solid #FCA5A5',
                        background: '#FEF2F2',
                        color: '#B91C1C',
                        cursor: 'pointer',
                        fontSize: '0.875rem',
                        fontWeight: 600
                      }}
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Food Allergies */}
            <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>
                  Food Allergies
                </h2>
                <p className="text-muted" style={{ marginBottom: '16px' }}>
                  Tap to select allergies and assign severity. Add other allergens using the fields below.
                </p>
              </div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '12px'
                }}
              >
                {allergyList.map((name) => {
                  const selected = !!selectedAllergies[name];
                  const severity = selectedAllergies[name]?.severity ?? INITIAL_SEVERITY;
                  return (
                    <div
                      key={name}
                      onClick={() => toggleAllergy(name)}
                      style={{
                        borderRadius: '16px',
                        border: selected ? '2px solid var(--color-primary)' : '1.5px solid var(--color-border)',
                        background: selected ? 'rgba(0, 82, 204, 0.1)' : 'white',
                        padding: '16px',
                        cursor: 'pointer',
                        boxShadow: '0 1px 4px rgba(15, 23, 42, 0.08)',
                        transition: 'all 0.2s'
                      }}
                    >
                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>{allergySymbols[name] || '🍽️'}</div>
                      <div style={{ fontWeight: 600, color: '#1E293B', marginBottom: '12px' }}>{name}</div>
                      {selected && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                          {(Object.keys(severityLabels) as Severity[]).map((option) => (
                            <button
                              key={option}
                              onClick={(e) => {
                                e.stopPropagation();
                                changeSeverity(name, option);
                              }}
                              style={{
                                padding: '6px 10px',
                                borderRadius: '999px',
                                border: severity === option ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                                background: severity === option ? 'rgba(0, 82, 204, 0.1)' : 'var(--color-bg)',
                                fontSize: '0.75rem',
                                color: severity === option ? 'var(--color-primary)' : 'var(--color-text)',
                                cursor: 'pointer',
                                fontWeight: 600
                              }}
                            >
                              {severityLabels[option]}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop: '8px' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '12px' }}>
                  Other Allergies
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {otherAllergies.map((entry, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <input
                        value={entry.name}
                        onChange={(e) => updateOtherAllergy(idx, 'name', e.target.value)}
                        placeholder={`Other allergy ${idx + 1}`}
                        style={{
                          flex: 1,
                          height: '44px',
                          padding: '0 12px',
                          borderRadius: '10px',
                          border: '1.5px solid #C4D6CF',
                          fontFamily: "'Quicksand', sans-serif"
                        }}
                      />
                      <select
                        value={entry.severity}
                        onChange={(e) => updateOtherAllergy(idx, 'severity', e.target.value as Severity)}
                        style={{
                          height: '44px',
                          borderRadius: '10px',
                          border: '1.5px solid #C4D6CF',
                          padding: '0 12px',
                          fontFamily: "'Quicksand', sans-serif"
                        }}
                      >
                        {(Object.keys(severityLabels) as Severity[]).map((option) => (
                          <option key={option} value={option}>
                            {severityLabels[option]}
                          </option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Dietary Restrictions */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>
                Dietary Restrictions
              </h2>
              <p className="text-muted" style={{ marginBottom: '16px' }}>
                Tap to select any dietary needs that apply. Each restriction can have cross-contamination settings.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {dietaryList.map((item) => {
                  const active = selectedDietary.includes(item);
                  return (
                    <button
                      key={item}
                      onClick={() => toggleDietary(item)}
                      className={active ? 'chip chip-primary' : 'chip'}
                      style={{
                        padding: '10px 18px',
                        minHeight: '44px',
                        fontSize: '0.9rem',
                        fontWeight: 600
                      }}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Emergency Contact (Optional) */}
            <section>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>
                Emergency Contact (Optional)
              </h2>
              <p className="text-muted" style={{ marginBottom: '16px' }}>
                Add an emergency contact that venues can reach if needed.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '0.875rem', marginBottom: '4px', display: 'block' }}>Name</label>
                  <input
                    value={emergencyContact.name}
                    onChange={(e) => setEmergencyContact({ ...emergencyContact, name: e.target.value })}
                    placeholder="Emergency contact name"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.875rem', marginBottom: '4px', display: 'block' }}>Relationship</label>
                  <input
                    value={emergencyContact.relationship}
                    onChange={(e) => setEmergencyContact({ ...emergencyContact, relationship: e.target.value })}
                    placeholder="e.g. Parent, Spouse, Guardian"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.875rem', marginBottom: '4px', display: 'block' }}>Phone</label>
                  <input
                    type="tel"
                    value={emergencyContact.phone}
                    onChange={(e) => setEmergencyContact({ ...emergencyContact, phone: e.target.value })}
                    placeholder="(555) 555-1212"
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.875rem', marginBottom: '4px', display: 'block' }}>Notes</label>
                  <textarea
                    value={emergencyContact.notes}
                    onChange={(e) => setEmergencyContact({ ...emergencyContact, notes: e.target.value })}
                    placeholder="Additional notes for emergency contact"
                    rows={3}
                    style={{
                      width: '100%',
                      padding: '12px',
                      borderRadius: '10px',
                      border: '1.5px solid #C4D6CF',
                      fontFamily: "'Quicksand', sans-serif",
                      resize: 'vertical'
                    }}
                  />
                </div>
              </div>
            </section>

            <footer style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'flex-end', marginTop: '8px' }}>
              <button
                onClick={() => createProfile(true)}
                className="btn btn-primary"
                style={{ minHeight: '48px' }}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save Profile'}
              </button>
              <button
                onClick={async () => {
                  await createProfile(false);
                  // Redirect to create another family member
                  router.push('/create');
                }}
                className="btn btn-accent"
                style={{ minHeight: '48px' }}
                disabled={saving}
              >
                {saving ? 'Saving...' : 'Save & Add Family Member'}
              </button>
            </footer>
          </div>
        ) : (
          preview && (
            <div
              style={{
                maxWidth: '760px',
                margin: '0 auto',
                padding: '32px 20px 64px'
              }}
            >
              <div
                style={{
                  background: 'white',
                  borderRadius: '24px',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.10)',
                  padding: '32px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '24px'
                }}
              >
                <header style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '8px' }}>
                  <div>
                    <h1 style={{ fontSize: 'clamp(1.75rem, 5vw, 2rem)', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '4px' }}>
                      {preview.firstName || 'Your'} AllergyLink ID
                    </h1>
                    <p className="text-muted">Share this QR code or ID with venues, schools, and travel partners.</p>
                  </div>
                  <button
                    onClick={() => setShowPreview(false)}
                    style={{
                      padding: '12px 20px',
                      borderRadius: '10px',
                      border: '1.5px solid #C4D6CF',
                      background: '#F8FAFC',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontSize: '0.95rem',
                      alignSelf: 'flex-start',
                      minHeight: '44px'
                    }}
                  >
                    Back to edit
                  </button>
                </header>

            <section style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  border: '1px solid #E2E8F0',
                  padding: '16px',
                  width: '240px',
                  display: 'grid',
                  placeItems: 'center'
                }}
              >
                <QR value={`https://id.allergylink.net/${preview.id}`} className="w-56 h-56" />
                <p style={{ fontSize: '0.85rem', color: '#64748B', marginTop: '12px' }}>{preview.id}</p>
              </div>
              <div style={{ flex: 1, minWidth: '240px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <img
                    src={preview.avatarUrl || '/default-avatar.png'}
                    alt="Avatar"
                    style={{ width: '64px', height: '64px', borderRadius: '16px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1E293B' }}>{preview.firstName || 'Unnamed'}</div>
                    <div style={{ fontSize: '0.9rem', color: '#64748B' }}>Personal Allergy Profile</div>
                  </div>
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '8px' }}>Allergies</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {preview.allergies.length ? (
                      preview.allergies.map((a) => (
                        <span
                          key={`${a.name}-${a.severity}`}
                          style={{
                            padding: '6px 10px',
                            borderRadius: '999px',
                            background: '#E7F4EE',
                            border: '1px solid #C4D6CF',
                            fontSize: '0.85rem',
                            color: '#0F4C4D'
                          }}
                        >
                          {a.name} • {severityLabels[a.severity]}
                        </span>
                      ))
                    ) : (
                      <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>No allergies selected</span>
                    )}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-primary)', marginBottom: '8px' }}>Dietary Restrictions</h3>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {preview.dietary.length ? (
                      preview.dietary.map((d) => (
                        <span
                          key={d}
                          className="chip chip-primary"
                          style={{ fontSize: '0.85rem' }}
                        >
                          {d}
                        </span>
                      ))
                    ) : (
                      <span style={{ fontSize: '0.9rem', color: '#94A3B8' }}>None selected</span>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <footer style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <Link
                href={`/id/share`}
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  border: '1px solid #CBD5F5',
                  background: '#F8FAFC',
                  color: '#1E3A5F',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Share Profile
              </Link>
              <button
                onClick={() => setShowPreview(false)}
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  border: '1px solid #1557C9',
                  background: '#1557C9',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Edit Profile
              </button>
              <Link
                href="/create"
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  border: '1px solid #B01261',
                  background: '#B01261',
                  color: 'white',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                Create Family Profile
              </Link>
              <Link
                href="/dashboard"
                style={{
                  padding: '12px 20px',
                  borderRadius: '12px',
                  border: '1px solid #E2E8F0',
                  background: 'white',
                  color: '#1E3A5F',
                  fontWeight: 600,
                  cursor: 'pointer',
                  textDecoration: 'none',
                  display: 'inline-block'
                }}
              >
                View Dashboard
              </Link>
            </footer>
          </div>
          </div>
        )
      )}
      </section>
      <Footer />
    </main>
  );
}
