'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useApp } from '@/components/AppProvider'
import type { Profile, ShareMethod, UUID } from '@/lib/types'
import { MinorApprovalModal } from './MinorApprovalModal'

export function ShareModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { state, createShareSession } = useApp()
  const userId = state.session?.verified ? state.session.userId : undefined
  const profiles = useMemo(
    () => Object.values(state.profiles).filter((p) => p.userId === userId),
    [state.profiles, userId],
  )

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [profileId, setProfileId] = useState<UUID | ''>('')
  const [method, setMethod] = useState<ShareMethod>('QR')
  const [venue, setVenue] = useState('')
  const [pendingMinor, setPendingMinor] = useState<Profile | null>(null)

  if (!open) return null

  const selectedProfile = profiles.find((p) => p.id === profileId) ?? null

  const proceed = () => {
    if (!selectedProfile) return
    if (selectedProfile.isMinor) {
      setPendingMinor(selectedProfile)
      return
    }
    createShareSession(selectedProfile.id, method)
    setStep(3)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/40 p-4 sm:items-center">
      <div className="w-full max-w-lg">
        <Card className="p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Share</p>
              <p className="mt-1 text-lg font-semibold text-slate-950">Share Profile</p>
            </div>
            <button type="button" className="text-sm font-semibold text-slate-600" onClick={onClose}>
              Close
            </button>
          </div>

          <div className="mt-5 space-y-4">
            {step === 1 ? (
              <>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-800">Select profile</span>
                  <select
                    className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
                    value={profileId}
                    onChange={(e) => setProfileId(e.target.value as UUID)}
                  >
                    <option value="">Choose…</option>
                    {profiles.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.type === 'primary' ? 'Primary' : p.type === 'secondary' ? 'Secondary' : 'Family'} — {p.name}
                      </option>
                    ))}
                  </select>
                </label>
                <Button
                  type="button"
                  className="w-full"
                  disabled={!profileId}
                  onClick={() => setStep(2)}
                >
                  Continue
                </Button>
              </>
            ) : null}

            {step === 2 ? (
              <>
                <div className="grid gap-2 sm:grid-cols-2">
                  {(['QR', 'link', 'PDF', 'ID'] as ShareMethod[]).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMethod(m)}
                      className={`min-h-11 rounded-xl border px-3 py-2 text-sm font-semibold ${
                        method === m
                          ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)]'
                          : 'border-slate-200 bg-white text-slate-800'
                      }`}
                    >
                      {m === 'QR' ? 'Show QR' : m === 'link' ? 'Share link' : m === 'PDF' ? 'Export PDF' : 'Share ID'}
                    </button>
                  ))}
                </div>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-800">Venue</span>
                  <input
                    value={venue}
                    onChange={(e) => setVenue(e.target.value)}
                    placeholder="Restaurant / school / venue name"
                    className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
                  />
                </label>
                <Button
                  type="button"
                  className="w-full"
                  disabled={!selectedProfile || !venue.trim()}
                  onClick={proceed}
                >
                  Continue
                </Button>
                <Button type="button" variant="secondary" className="w-full" onClick={() => setStep(1)}>
                  Back
                </Button>
              </>
            ) : null}

            {step === 3 ? (
              <>
                <p className="text-sm text-slate-700">
                  You are sharing <span className="font-semibold">{selectedProfile?.name}</span> with{' '}
                  <span className="font-semibold">{venue}</span>. Proceed?
                </p>
                <div className="grid gap-2 sm:grid-cols-2">
                  <Button type="button" className="w-full" onClick={onClose}>
                    Confirm
                  </Button>
                  <Button type="button" variant="secondary" className="w-full" onClick={onClose}>
                    Cancel
                  </Button>
                </div>
              </>
            ) : null}
          </div>
        </Card>
      </div>

      {pendingMinor ? (
        <MinorApprovalModal
          minor={pendingMinor}
          open={Boolean(pendingMinor)}
          onClose={() => setPendingMinor(null)}
          onApproved={() => {
            createShareSession(pendingMinor.id, method)
            setPendingMinor(null)
            setStep(3)
          }}
        />
      ) : null}
    </div>
  )
}

