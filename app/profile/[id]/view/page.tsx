'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useMemo } from 'react'
import { useApp } from '@/components/AppProvider'
import { Card } from '@/components/ui/Card'

// External views are strictly read-only.

export default function PublicProfileViewPage() {
  const params = useParams<{ id: string }>()
  const { state } = useApp()
  const id = params.id
  const p = state.profiles[id]

  const primaryAllergies = useMemo(() => (p?.allergies ?? []).filter((a) => a.isAnaphylactic || !a.crossContaminationOK), [p?.allergies])

  if (!p) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <p className="text-slate-700">Profile not available.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <header className="space-y-2">
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">AllergyLink</p>
        <h1 className="text-3xl font-bold tracking-tight text-slate-950">{p.name}</h1>
        <p className="font-mono text-sm font-semibold tracking-wide text-slate-600">{p.allergyLinkId}</p>
      </header>

      <div className="mt-6 space-y-4">
        <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md">
          <div className="border-b border-amber-200/80 bg-amber-100 px-5 py-4 text-center">
            <p className="text-sm font-bold tracking-[0.18em] text-amber-950">ALLERGY ALERT</p>
          </div>
          <div className="bg-white px-5 py-7">
            <ul className="flex flex-col gap-3">
              {(p.allergies ?? []).map((a) => (
                <li
                  key={a.name}
                  className={`rounded-xl border-2 px-4 py-4 text-center text-xl font-bold leading-tight shadow-sm ${
                    a.isAnaphylactic || !a.crossContaminationOK
                      ? 'border-rose-500 bg-rose-50 text-rose-950'
                      : 'border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                >
                  {a.name}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Card className="space-y-3 bg-slate-50">
          <p className="text-sm font-bold text-slate-900">Emergency Contact</p>
          <p className="text-sm text-slate-700">{p.emergencyContact?.name ?? '—'}</p>
          <p className="text-lg font-semibold tabular-nums text-slate-900">{p.emergencyContact?.phone ?? '—'}</p>
        </Card>
      </div>

      <p className="mt-8 text-center text-xs text-slate-500">
        Read-only view · No external edits allowed
      </p>
      <p className="mt-3 text-center text-sm">
        <Link href="/welcome" className="font-semibold text-slate-700 hover:text-slate-900">
          AllergyLink
        </Link>
      </p>
    </div>
  )
}

