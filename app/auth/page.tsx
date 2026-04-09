'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useApp } from '@/components/AppProvider'

export default function AuthPage() {
  const router = useRouter()
  const { signInVerified } = useApp()

  const [phone, setPhone] = useState('')
  const [firstName, setFirstName] = useState('')
  const [codeSent, setCodeSent] = useState(false)
  const [code, setCode] = useState('')

  const canSend = useMemo(() => phone.trim().length >= 10 && firstName.trim().length >= 1, [phone, firstName])

  const sendCode = (e: React.FormEvent) => {
    e.preventDefault()
    if (!canSend) return
    setCodeSent(true)
  }

  const verify = (e: React.FormEvent) => {
    e.preventDefault()
    if (code.trim() !== '123456') return
    signInVerified(phone.trim(), firstName.trim())
    router.push('/create-profile')
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
          Enter your phone number and first name. We’ll simulate a one-time verification code.
        </p>

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
              <Button type="submit" className="w-full" disabled={!canSend}>
                Send verification code
              </Button>
              <p className="text-center text-xs text-slate-500">Demo code is 123456</p>
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
              <Button type="submit" className="w-full" disabled={code.trim().length < 6}>
                Verify
              </Button>
              <Button type="button" variant="secondary" className="w-full" onClick={() => setCodeSent(false)}>
                Change phone/name
              </Button>
            </form>
          )}
        </Card>
      </div>
    </div>
  )
}

