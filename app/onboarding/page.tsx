'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CreateProfileWizard } from '@/components/profile/CreateProfileWizard'
import { signUpWithEmail, signInWithEmail } from '@/lib/auth'
import { useApp } from '@/components/AppProvider'
import type { Profile } from '@/lib/types'

function OnboardingContent() {
  const searchParams = useSearchParams()
  const profileType = (searchParams?.get('type') ?? 'primary') as Profile['type']

  const { state } = useApp()
  const [authed, setAuthed] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Skip auth if already signed in
  useEffect(() => {
    if (state.session?.verified) setAuthed(true)
  }, [state.session?.verified])

  const handleSubmit = async () => {
    setLoading(true)
    setError('')
    if (firstName.trim()) {
      localStorage.setItem('allergylink_pending_firstName', firstName.trim())
    }
    // Try sign up first; if account exists, sign in instead
    const signUpErr = await signUpWithEmail(email, password)
    if (signUpErr && !signUpErr.toLowerCase().includes('already')) {
      setError(signUpErr)
      setLoading(false)
      return
    }
    const signInErr = await signInWithEmail(email, password)
    if (signInErr) {
      setError(signInErr)
      setLoading(false)
      return
    }
    setAuthed(true)
    setLoading(false)
  }

  if (!authed) {
    return (
      <main style={{ minHeight: '100dvh', background: 'var(--color-bg)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
        <header style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', background: 'white' }}>
          <Link href="/welcome">
            <Image src="/allergylink-logo.png" alt="AllergyLink" width={1024} height={524} className="h-8 w-auto max-w-[140px] object-contain" />
          </Link>
        </header>
        <div style={{ maxWidth: '480px', margin: '0 auto', padding: '40px 20px' }}>
          <div style={{ background: 'white', borderRadius: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)', padding: '40px 24px' }}>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '8px' }}>
              Create your account
            </h1>
            <p style={{ color: 'var(--color-text-muted)', marginBottom: '32px' }}>
              Enter your details to get started.
            </p>

            {error && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', color: '#b91c1c', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}

            <label style={{ display: 'block', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '6px', color: 'var(--color-text)' }}>
              First name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="e.g. Alex"
              autoComplete="given-name"
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid var(--color-border)', fontSize: '1rem', fontFamily: 'inherit', marginBottom: '16px', boxSizing: 'border-box' }}
            />

            <label style={{ display: 'block', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '6px', color: 'var(--color-text)' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid var(--color-border)', fontSize: '1rem', fontFamily: 'inherit', marginBottom: '16px', boxSizing: 'border-box' }}
            />

            <label style={{ display: 'block', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '6px', color: 'var(--color-text)' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              autoComplete="new-password"
              style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid var(--color-border)', fontSize: '1rem', fontFamily: 'inherit', marginBottom: '24px', boxSizing: 'border-box' }}
            />

            <button
              type="button"
              onClick={() => void handleSubmit()}
              disabled={!email || password.length < 6 || loading}
              style={{
                width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
                background: (email && password.length >= 6)
                  ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)'
                  : 'var(--color-border)',
                color: 'white', fontWeight: 600, fontSize: '1rem',
                cursor: (email && password.length >= 6) ? 'pointer' : 'not-allowed',
              }}
            >
              {loading ? 'Setting up…' : 'Get started'}
            </button>

            <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.8125rem', color: 'var(--color-text-muted)' }}>
              Already have an account?{' '}
              <Link href="/auth" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Sign in</Link>
            </p>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main style={{ minHeight: '100dvh', background: 'var(--color-bg)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      <header style={{ padding: '20px 24px', borderBottom: '1px solid var(--color-border)', background: 'white' }}>
        <Link href="/welcome">
          <Image src="/allergylink-logo.png" alt="AllergyLink" width={1024} height={524} className="h-8 w-auto max-w-[140px] object-contain" />
        </Link>
      </header>
      <CreateProfileWizard profileType={profileType} />
    </main>
  )
}

export default function Onboarding() {
  return (
    <Suspense fallback={
      <main style={{ minHeight: '100dvh', background: 'var(--color-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div>Loading...</div>
      </main>
    }>
      <OnboardingContent />
    </Suspense>
  )
}
