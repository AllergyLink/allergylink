'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { sendPhoneOtp, verifyPhoneOtp } from '@/lib/auth'
import { listProfiles } from '@/lib/storage'

export default function AuthPage() {
  const router = useRouter()

  const [phone, setPhone] = useState('')
  const [firstName, setFirstName] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const canSend = useMemo(() => phone.trim().length >= 10 && firstName.trim().length >= 1, [phone, firstName])

  const sendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSend) return
    setLoading(true)
    setError('')
    const err = await sendPhoneOtp(phone)
    setLoading(false)
    if (err) {
      setError(err)
    } else {
      setCodeSent(true)
    }
  }

  const verify = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    // Store firstName so AppProvider can pick it up after Supabase auth fires
    if (firstName.trim()) {
      localStorage.setItem('allergylink_pending_firstName', firstName.trim())
    }
    const err = await verifyPhoneOtp(phone, code)
    setLoading(false)
    if (err) {
      setError(err)
      return
    }
    const profiles = await listProfiles()
    router.push(profiles.length > 0 ? '/dashboard' : '/onboarding')
  }

  return (
    <div className="min-h-dvh bg-slate-50">
      <div className="mx-auto max-w-lg px-4 py-10">
        <div className="flex justify-center pb-6">
          <Image
            src="/allergylink-logo.png"
            alt="AllergyLink"
            width={1024}
            height={524}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        <h1 className="text-center text-2xl font-bold text-slate-950">Sign in</h1>
        <p className="mt-2 text-center text-sm text-slate-600">
          Enter your phone number to receive a one-time verification code.
        </p>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <Card className="mt-6">
          {!codeSent ? (
            <form onSubmit={sendCode} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800">Phone number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                  placeholder="(555) 123-4567"
                  className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
                />
              </div>
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800">First name</label>
                <input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Madeline"
                  className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
                />
              </div>
              <Button type="submit" className="w-full" disabled={!canSend || loading}>
                {loading ? 'Sending…' : 'Send verification code'}
              </Button>
            </form>
          ) : (
            <form onSubmit={verify} className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-800">Verification code</label>
                <input
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  inputMode="numeric"
                  placeholder="123456"
                  className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base tracking-widest"
                />
              </div>
              <Button type="submit" className="w-full" disabled={code.trim().length < 6 || loading}>
                {loading ? 'Verifying…' : 'Verify'}
              </Button>
              <Button type="button" variant="secondary" className="w-full" onClick={() => { setCodeSent(false); setError('') }}>
                Change phone/name
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  )
}
