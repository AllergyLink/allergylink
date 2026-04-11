'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { CreateProfileWizard } from '@/components/profile/CreateProfileWizard'
import { sendPhoneOtp, verifyPhoneOtp } from '@/lib/auth'
import { useApp } from '@/components/AppProvider'
import type { Profile } from '@/lib/types'

function OnboardingContent() {
  const searchParams = useSearchParams()
  const profileType = (searchParams?.get('type') ?? 'primary') as Profile['type']

  const { state } = useApp()
  const [authed, setAuthed] = useState(false)
  const [phone, setPhone] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [otp, setOtp] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState('')

  // Skip auth if already signed in
  useEffect(() => {
    if (state.session?.verified) setAuthed(true)
  }, [state.session?.verified])

  const handleSendCode = async () => {
    setAuthLoading(true)
    setAuthError('')
    const err = await sendPhoneOtp(phone)
    setAuthLoading(false)
    if (err) setAuthError(err)
    else setOtpSent(true)
  }

  const handleVerifyOtp = async () => {
    setAuthLoading(true)
    setAuthError('')
    const err = await verifyPhoneOtp(phone, otp)
    setAuthLoading(false)
    if (err) setAuthError(err)
    else setAuthed(true)
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
              Enter your phone number to get started. We&apos;ll send a one-time code.
            </p>

            {authError && (
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px 16px', marginBottom: '16px', color: '#b91c1c', fontSize: '0.875rem' }}>
                {authError}
              </div>
            )}

            {!otpSent ? (
              <div>
                <label style={{ display: 'block', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text)' }}>
                  Phone number
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(555) 123-4567"
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid var(--color-border)', fontSize: '1rem', fontFamily: 'inherit', marginBottom: '20px', boxSizing: 'border-box' }}
                />
                <button
                  type="button"
                  onClick={() => void handleSendCode()}
                  disabled={phone.trim().length < 10 || authLoading}
                  style={{
                    width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
                    background: phone.trim().length >= 10 ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)' : 'var(--color-border)',
                    color: 'white', fontWeight: 600, fontSize: '1rem', cursor: phone.trim().length >= 10 ? 'pointer' : 'not-allowed',
                  }}
                >
                  {authLoading ? 'Sending…' : 'Send verification code'}
                </button>
              </div>
            ) : (
              <div>
                <label style={{ display: 'block', fontSize: '0.9375rem', fontWeight: 600, marginBottom: '8px', color: 'var(--color-text)' }}>
                  Verification code
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  style={{ width: '100%', padding: '14px 16px', borderRadius: '12px', border: '1.5px solid var(--color-border)', fontSize: '1.25rem', letterSpacing: '0.2em', fontFamily: 'inherit', marginBottom: '20px', boxSizing: 'border-box' }}
                />
                <button
                  type="button"
                  onClick={() => void handleVerifyOtp()}
                  disabled={otp.trim().length < 6 || authLoading}
                  style={{
                    width: '100%', padding: '14px', borderRadius: '12px', border: 'none',
                    background: otp.trim().length >= 6 ? 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)' : 'var(--color-border)',
                    color: 'white', fontWeight: 600, fontSize: '1rem', cursor: otp.trim().length >= 6 ? 'pointer' : 'not-allowed', marginBottom: '12px',
                  }}
                >
                  {authLoading ? 'Verifying…' : 'Verify & continue'}
                </button>
                <button
                  type="button"
                  onClick={() => { setOtpSent(false); setAuthError('') }}
                  style={{ width: '100%', padding: '12px', borderRadius: '12px', border: '1.5px solid var(--color-border)', background: 'white', color: 'var(--color-text)', fontWeight: 600, fontSize: '0.9375rem', cursor: 'pointer' }}
                >
                  Change number
                </button>
              </div>
            )}

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
