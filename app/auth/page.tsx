'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { signInWithEmail, signUpWithEmail } from '@/lib/auth'
import { listProfiles } from '@/lib/storage'

export default function AuthPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (mode === 'signup') {
      if (firstName.trim()) {
        localStorage.setItem('allergylink_pending_firstName', firstName.trim())
      }
      const err = await signUpWithEmail(email, password)
      if (err) { setError(err); setLoading(false); return }
      // After signup Supabase may require email confirmation; try to sign in immediately
      const signInErr = await signInWithEmail(email, password)
      if (signInErr) {
        // Likely needs email confirmation
        setError('Account created! Check your email to confirm, then sign in.')
        setLoading(false)
        return
      }
    } else {
      const err = await signInWithEmail(email, password)
      if (err) { setError(err); setLoading(false); return }
    }

    const profiles = await listProfiles()
    router.push(profiles.length > 0 ? '/dashboard' : '/onboarding')
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      <div className="mx-auto max-w-lg px-4 py-10">
        <div className="flex justify-center pb-6">
          <Link href="/welcome">
            <Image
              src="/allergylink-logo.png"
              alt="AllergyLink"
              width={1024}
              height={524}
              className="h-10 w-auto max-w-[160px] object-contain"
              priority
            />
          </Link>
        </div>

        {/* Mode toggle */}
        <div className="mb-6 flex rounded-xl border border-slate-200 bg-white p-1">
          <button
            type="button"
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
              mode === 'signin'
                ? 'bg-[color:var(--color-primary)] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            onClick={() => { setMode('signin'); setError('') }}
          >
            Sign in
          </button>
          <button
            type="button"
            className={`flex-1 rounded-lg py-2 text-sm font-semibold transition-colors ${
              mode === 'signup'
                ? 'bg-[color:var(--color-primary)] text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
            onClick={() => { setMode('signup'); setError('') }}
          >
            Create account
          </button>
        </div>

        <h1 className="text-center text-2xl font-bold text-slate-950">
          {mode === 'signin' ? 'Welcome back' : 'Create your account'}
        </h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          {mode === 'signin'
            ? 'Sign in to access your allergy profile.'
            : 'Set up your AllergyLink profile in seconds.'}
        </p>

        {error && (
          <div className={`mt-4 rounded-xl border px-4 py-3 text-sm ${
            error.includes('Check your email')
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
              : 'border-red-200 bg-red-50 text-red-700'
          }`}>
            {error}
          </div>
        )}

        <Card className="mt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'signup' && (
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800">First name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="e.g. Alex"
                  autoComplete="given-name"
                  className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
                />
              </div>
            )}
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-800">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
                className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-slate-800">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === 'signup' ? 'At least 6 characters' : '••••••••'}
                autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                required
                minLength={6}
                className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
              />
            </div>
            <Button
              type="submit"
              className="w-full"
              disabled={!email || password.length < 6 || loading}
            >
              {loading
                ? (mode === 'signin' ? 'Signing in…' : 'Creating account…')
                : (mode === 'signin' ? 'Sign in' : 'Create account')}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}
