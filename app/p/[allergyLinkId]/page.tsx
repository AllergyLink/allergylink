'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/Card'
import { getProfileByAllergyLinkId } from '@/lib/storage'
import type { Profile } from '@/lib/types'

export default function PublicAllergyIdPage() {
  const params = useParams<{ allergyLinkId: string }>()
  const [profile, setProfile] = useState<Profile | null | undefined>(undefined)

  useEffect(() => {
    getProfileByAllergyLinkId(params.allergyLinkId).then((p) =>
      setProfile(p ?? null),
    )
  }, [params.allergyLinkId])

  if (profile === undefined) {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-slate-50">
        <p className="text-sm text-slate-500">Loading…</p>
      </div>
    )
  }

  if (profile === null) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-slate-50 px-4">
        <p className="text-slate-700">Profile not found.</p>
        <Link href="/welcome" className="text-sm font-semibold text-[color:var(--color-primary)]">
          AllergyLink
        </Link>
      </div>
    )
  }

  return (
    <div className="min-h-dvh bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-lg">
        <header className="mb-6 space-y-1">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">AllergyLink</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-950">{profile.name}</h1>
          <p className="font-mono text-sm font-semibold tracking-wide text-slate-500">{profile.allergyLinkId}</p>
        </header>

        <div className="space-y-4">
          {/* Allergy Alert Card */}
          <div className="overflow-hidden rounded-2xl border border-slate-200 shadow-md">
            <div className="border-b border-amber-200/80 bg-amber-100 px-5 py-4 text-center">
              <p className="text-sm font-bold tracking-[0.18em] text-amber-950">⚠ ALLERGY ALERT</p>
            </div>
            <div className="bg-white px-5 py-6">
              {profile.allergies.length === 0 ? (
                <p className="text-center text-sm text-slate-500">No allergies listed.</p>
              ) : (
                <ul className="flex flex-col gap-3">
                  {profile.allergies.map((a) => {
                    const danger = a.isAnaphylactic || !a.crossContaminationOK
                    return (
                      <li
                        key={a.name}
                        className={`rounded-xl border-2 px-4 py-4 shadow-sm ${
                          danger
                            ? 'border-rose-500 bg-rose-50 text-rose-950'
                            : 'border-slate-200 bg-slate-50 text-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-xl font-bold">{a.name}</span>
                          <div className="flex flex-col gap-1 text-right">
                            {a.isAnaphylactic && (
                              <span className="rounded-full bg-rose-200 px-2 py-0.5 text-xs font-bold text-rose-900">
                                ANAPHYLACTIC
                              </span>
                            )}
                            {!a.crossContaminationOK && (
                              <span className="rounded-full bg-orange-100 px-2 py-0.5 text-xs font-bold text-orange-900">
                                NO CROSS-CONTAMINATION
                              </span>
                            )}
                            {!a.isAnaphylactic && a.crossContaminationOK && (
                              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                                Cross-contamination OK
                              </span>
                            )}
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
              )}
            </div>
          </div>

          {/* Dietary restrictions */}
          {(profile.dietaryRestrictions.length > 0 || profile.dietaryCustom) && (
            <Card className="space-y-2 bg-slate-50">
              <p className="text-sm font-bold text-slate-900">Dietary Restrictions</p>
              <div className="flex flex-wrap gap-2">
                {profile.dietaryRestrictions.map((d) => (
                  <span
                    key={d}
                    className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900"
                  >
                    {d}
                  </span>
                ))}
              </div>
              {profile.dietaryCustom && (
                <p className="text-sm text-slate-700">{profile.dietaryCustom}</p>
              )}
            </Card>
          )}

          {/* Emergency contact */}
          {(profile.emergencyContact?.name || profile.emergencyContact?.phone) && (
            <Card className="space-y-2 bg-slate-50">
              <p className="text-sm font-bold text-slate-900">Emergency Contact</p>
              {profile.emergencyContact.name && (
                <p className="text-sm text-slate-700">{profile.emergencyContact.name}</p>
              )}
              {profile.emergencyContact.phone && (
                <p className="text-lg font-semibold tabular-nums text-slate-900">
                  {profile.emergencyContact.phone}
                </p>
              )}
            </Card>
          )}
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Read-only view · Data owned by the profile holder
        </p>
        <p className="mt-3 text-center text-sm">
          <Link href="/welcome" className="font-semibold text-slate-600 hover:text-slate-900">
            AllergyLink
          </Link>
        </p>
      </div>
    </div>
  )
}
