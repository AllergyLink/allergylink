'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useApp } from '@/components/AppProvider'
import type { Profile, UUID } from '@/lib/types'

export function MinorApprovalModal({
  minor,
  open,
  onClose,
  onApproved,
}: {
  minor: Profile
  open: boolean
  onClose: () => void
  onApproved: () => void
}) {
  const { approveMinor } = useApp()
  const [guardianId, setGuardianId] = useState<UUID | ''>('')

  const verifiedGuardians = useMemo(() => minor.guardians.filter((g) => g.verified), [minor.guardians])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/50 p-4 sm:items-center">
      <div className="w-full max-w-lg">
        <Card className="p-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Minor protection</p>
          <h2 className="mt-2 text-xl font-semibold text-slate-950">Guardian approval required</h2>
          <p className="mt-2 text-sm text-slate-700">
            Access to <span className="font-semibold">{minor.name}</span> requires guardian approval. No approval → no access.
          </p>

          <div className="mt-5 space-y-3">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-800">Select guardian</span>
              <select
                className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
                value={guardianId}
                onChange={(e) => setGuardianId(e.target.value as UUID)}
              >
                <option value="">Choose…</option>
                {verifiedGuardians.map((g) => (
                  <option key={g.id} value={g.id}>
                    {g.name} — {g.relationship}
                  </option>
                ))}
              </select>
            </label>

            <Button
              type="button"
              className="w-full"
              disabled={!guardianId}
              onClick={() => {
                approveMinor(minor.id, guardianId)
                onApproved()
              }}
            >
              Approve
            </Button>
            <Button type="button" variant="secondary" className="w-full" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

