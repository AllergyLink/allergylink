'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useApp } from '@/components/AppProvider'
import QR from '@/components/QR'
import UnifiedNavigation from '@/components/UnifiedNavigation'
import Footer from '@/components/Footer'

export default function IDPage() {
  const { state } = useApp()
  const user = state.session?.verified ? state.users[state.session.userId] : undefined
  const profile = useMemo(
    () =>
      Object.values(state.profiles).find(
        (p) => p.userId === user?.id && p.type === 'primary',
      ) ?? null,
    [state.profiles, user?.id],
  )

  if (!user) {
    return (
      <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
        <UnifiedNavigation />
        <div className="container section" style={{ textAlign: 'center', paddingTop: '60px' }}>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            Sign in to view your Allergy ID.
          </p>
          <Link href="/auth">
            <Button>Sign in</Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  if (!profile) {
    return (
      <main className="page-shell" style={{ background: 'var(--color-bg)' }}>
        <UnifiedNavigation />
        <div className="container section" style={{ textAlign: 'center', paddingTop: '60px' }}>
          <p style={{ color: 'var(--color-text-muted)', marginBottom: '16px' }}>
            No profile found. Create one first.
          </p>
          <Link href="/onboarding">
            <Button>Create Profile</Button>
          </Link>
        </div>
        <Footer />
      </main>
    )
  }

  const qrUrl = `https://allergylink.vercel.app/p/${profile.allergyLinkId}`
  const anaphylacticAllergies = profile.allergies.filter((a) => a.isAnaphylactic)
  const otherAllergies = profile.allergies.filter((a) => !a.isAnaphylactic)

  const handleCopy = () => {
    navigator.clipboard.writeText(profile.allergyLinkId).catch(() => null)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: `${profile.name}'s AllergyLink`, url: qrUrl }).catch(() => handleCopy())
    } else {
      handleCopy()
    }
  }

  return (
    <main className="page-shell" style={{ background: 'var(--color-bg)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <UnifiedNavigation />

      <div className="container section">
        <div className="card" style={{ maxWidth: '600px', margin: '0 auto' }}>

          {/* Profile header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '20px',
                background: profile.photoDataUrl
                  ? 'transparent'
                  : 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '2.5rem',
                fontWeight: 700,
                margin: '0 auto 16px',
                overflow: 'hidden',
              }}
            >
              {profile.photoDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={profile.photoDataUrl} alt={profile.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                profile.name.slice(0, 1).toUpperCase()
              )}
            </div>
            <h1>{profile.name}&rsquo;s Allergy ID</h1>

            {/* Allergy chips */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center', marginBottom: '16px' }}>
              {anaphylacticAllergies.map((a) => (
                <span key={a.name} className="chip chip-primary">
                  {a.image} {a.name}
                </span>
              ))}
              {otherAllergies.slice(0, 3).map((a) => (
                <span key={a.name} className="chip chip-success">
                  {a.name}
                </span>
              ))}
              {profile.dietaryRestrictions.map((d) => (
                <span key={d} className="chip chip-success">{d}</span>
              ))}
            </div>
          </div>

          {/* QR Code */}
          <div
            style={{
              background: 'var(--color-bg)',
              padding: '24px',
              borderRadius: '16px',
              textAlign: 'center',
              marginBottom: '24px',
              border: '1px solid var(--color-border)',
            }}
          >
            <QR value={qrUrl} size={200} />
            <p
              className="text-muted"
              style={{ marginTop: '16px', marginBottom: 0, fontFamily: 'monospace', fontSize: '1rem' }}
            >
              {profile.allergyLinkId}
            </p>
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
            <button className="btn btn-primary btn-full" onClick={handleCopy}>
              Copy ID
            </button>
            <button className="btn btn-secondary btn-full" onClick={handleShare}>
              Share Profile
            </button>
            <Link href="/dashboard" className="btn btn-ghost btn-full">
              Back to Dashboard
            </Link>
          </div>

          <p className="text-muted" style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.75rem' }}>
            Your data is securely stored. Only allergy-relevant info is visible to venues.
          </p>
        </div>
      </div>

      <Footer />
    </main>
  )
}
