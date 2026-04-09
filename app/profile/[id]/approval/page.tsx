'use client'

import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useApp } from '@/components/AppProvider'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { UUID } from '@/lib/types'

export default function MinorApprovalPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { state, approveMinor } = useApp()

  const id = params.id
  const p = state.profiles[id]
  const [guardianId, setGuardianId] = useState<UUID | ''>('')

  const verifiedGuardians = useMemo(() => (p?.guardians ?? []).filter((g) => g.verified), [p?.guardians])

  if (!p) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <p className="text-slate-700">Profile not found.</p>
        <Link href="/dashboard" className="mt-4 inline-block">
          <Button variant="secondary">Back</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <Card className="space-y-4">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Minor protection</p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-950">Approval required</h1>
        <p className="text-sm text-slate-700">
          Access to <span className="font-semibold">{p.name}</span> requires guardian approval. No approval → no access.
        </p>

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
          className="w-full"
          disabled={!guardianId}
          onClick={() => {
            approveMinor(p.id, guardianId)
            router.push(`/profile/${p.id}`)
          }}
        >
          Approve
        </Button>

        <Link href="/dashboard" className="block">
          <Button variant="secondary" className="w-full">
            Back to dashboard
          </Button>
        </Link>
      </Card>
    </div>
  )
}

