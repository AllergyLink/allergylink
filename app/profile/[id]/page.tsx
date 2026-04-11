'use client'

import { useMemo, useRef, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { useApp } from '@/components/AppProvider'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import type { Profile } from '@/lib/types'
import { ALLERGEN_CATEGORIES, ALLERGEN_SEED } from '@/lib/store/allergens'

export default function InternalProfilePage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const { state, upsertProfile } = useApp()

  const id = params.id
  const profile = state.profiles[id]

  const [expanded, setExpanded] = useState<string>('Nuts')
  const [draft, setDraft] = useState<Profile | null>(profile ?? null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isMinor = draft?.isMinor ?? false
  const approval = state.minorApprovals[id]

  const needsApproval = isMinor && !approval

  if (!profile) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <p className="text-slate-700">Profile not found.</p>
        <Link href="/dashboard" className="mt-4 inline-block">
          <Button variant="secondary">Back to dashboard</Button>
        </Link>
      </div>
    )
  }

  if (needsApproval) {
    router.replace(`/profile/${id}/approval`)
    return null
  }

  const allergiesForCat = useMemo(
    () => (draft?.allergies ?? []).filter((a) => a.category === expanded),
    [draft?.allergies, expanded],
  )

  return (
    <div className="mx-auto max-w-lg px-4 pb-24 pt-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Profile</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">{profile.name}</h1>
          <p className="mt-2 font-mono text-sm font-semibold tracking-wide text-slate-600">{profile.allergyLinkId}</p>
        </div>
        <Link href={`/profile/${id}/view`} className="shrink-0 pt-1">
          <Button variant="outline" className="!min-h-10 !px-3 text-xs">
            Public view
          </Button>
        </Link>
      </div>

      <Card className="mt-6 space-y-4">
        <p className="text-sm font-semibold text-slate-900">Edit Profile</p>

        {/* Photo upload */}
        <div className="flex items-center gap-4">
          <div
            className="flex h-16 w-16 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[color:var(--color-primary)] to-[color:var(--color-accent)] text-2xl font-bold text-white"
            onClick={() => fileInputRef.current?.click()}
          >
            {draft?.photoDataUrl ? (
              <img src={draft.photoDataUrl} alt="Avatar" className="h-full w-full object-cover" />
            ) : (
              (draft?.name?.charAt(0).toUpperCase() ?? '?')
            )}
          </div>
          <div className="space-y-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (!file) return
                const reader = new FileReader()
                reader.onload = () => setDraft((p) => p ? { ...p, photoDataUrl: typeof reader.result === 'string' ? reader.result : undefined } : p)
                reader.readAsDataURL(file)
              }}
            />
            <Button type="button" variant="secondary" className="!min-h-9 !px-3 text-xs" onClick={() => fileInputRef.current?.click()}>
              Change photo
            </Button>
            {draft?.photoDataUrl && (
              <button
                type="button"
                className="block text-xs text-slate-500 hover:text-rose-600"
                onClick={() => setDraft((p) => p ? { ...p, photoDataUrl: undefined } : p)}
              >
                Remove photo
              </button>
            )}
          </div>
        </div>

        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-800">Name</span>
          <input
            value={draft?.name ?? ''}
            onChange={(e) => setDraft((p) => (p ? { ...p, name: e.target.value } : p))}
            className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
          />
        </label>
      </Card>

      <Card className="mt-4 space-y-4">
        <p className="text-sm font-semibold text-slate-900">Emergency contact</p>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-800">Name</span>
          <input
            value={draft?.emergencyContact?.name ?? ''}
            onChange={(e) => setDraft((p) => p ? { ...p, emergencyContact: { ...(p.emergencyContact ?? {}), name: e.target.value } } : p)}
            className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-800">Phone</span>
          <input
            value={draft?.emergencyContact?.phone ?? ''}
            onChange={(e) => setDraft((p) => p ? { ...p, emergencyContact: { ...(p.emergencyContact ?? {}), phone: e.target.value } } : p)}
            inputMode="tel"
            className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
          />
        </label>
      </Card>

      <section className="mt-6 space-y-3">
        <p className="text-sm font-semibold text-slate-900">Allergies</p>
        <Card className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {ALLERGEN_CATEGORIES.map((c) => {
              const count = (draft?.allergies ?? []).filter((a) => a.category === c.key).length
              return (
                <button
                  key={c.key}
                  type="button"
                  className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${
                    expanded === c.key
                      ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)]'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                  onClick={() => setExpanded(c.key)}
                >
                  {c.label}{count > 0 ? ` (${count})` : ''}
                </button>
              )
            })}
          </div>

          {/* Add allergens from catalog */}
          <div className="space-y-2">
            {ALLERGEN_SEED.filter((s) => s.category === expanded && !(draft?.allergies ?? []).some((a) => a.name === s.name)).map((seed) => (
              <button
                key={seed.name}
                type="button"
                className="flex w-full items-center gap-3 rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-2.5 text-left text-sm hover:border-[color:var(--color-primary)]"
                onClick={() =>
                  setDraft((p) => p ? {
                    ...p,
                    allergies: [...p.allergies, { category: seed.category, name: seed.name, image: seed.image, isAnaphylactic: false, crossContaminationOK: true }],
                  } : p)
                }
              >
                <span className="text-xl">{seed.image}</span>
                <span className="flex-1 text-slate-700">{seed.name}</span>
                <span className="text-[color:var(--color-primary)]">+</span>
              </button>
            ))}
          </div>

          <div className="space-y-3">
            {allergiesForCat.map((a) => {
              const danger = a.isAnaphylactic || !a.crossContaminationOK
              return (
                <div key={a.name} className={`rounded-2xl border p-4 ${danger ? 'border-rose-200 bg-rose-50/40' : 'border-slate-200 bg-white'}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-2xl" aria-hidden>
                        {a.image}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{a.name}</p>
                        <p className="text-xs text-slate-600">{a.category}</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
                    <button
                      type="button"
                      className={`min-h-11 rounded-xl border px-3 py-2 text-sm font-semibold ${
                        a.isAnaphylactic ? 'border-rose-300 bg-rose-50 text-rose-900' : 'border-slate-200 bg-slate-50 text-slate-800'
                      }`}
                      onClick={() =>
                        setDraft((p) =>
                          p
                            ? { ...p, allergies: p.allergies.map((x) => (x.name === a.name ? { ...x, isAnaphylactic: !x.isAnaphylactic } : x)) }
                            : p,
                        )
                      }
                    >
                      Anaphylactic: {a.isAnaphylactic ? 'Yes' : 'No'}
                    </button>
                    <button
                      type="button"
                      className={`min-h-11 rounded-xl border px-3 py-2 text-sm font-semibold ${
                        !a.crossContaminationOK ? 'border-rose-300 bg-rose-50 text-rose-900' : 'border-emerald-300 bg-emerald-50 text-emerald-900'
                      }`}
                      onClick={() =>
                        setDraft((p) =>
                          p
                            ? { ...p, allergies: p.allergies.map((x) => (x.name === a.name ? { ...x, crossContaminationOK: !x.crossContaminationOK } : x)) }
                            : p,
                        )
                      }
                    >
                      Cross-contamination OK: {a.crossContaminationOK ? 'Yes' : 'No'}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </section>

      <Card className="mt-4 space-y-3">
        <p className="text-sm font-semibold text-slate-900">Preferences</p>
        <label className="flex cursor-pointer items-center justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-800">🌐 Allergy Translations</p>
            <p className="text-xs text-slate-500">Show allergens translated in 6 languages on dashboard</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={draft?.preferences?.translationsEnabled ?? false}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
              draft?.preferences?.translationsEnabled
                ? 'bg-[color:var(--color-primary)]'
                : 'bg-slate-200'
            }`}
            onClick={() =>
              setDraft((p) =>
                p
                  ? {
                      ...p,
                      preferences: {
                        ...(p.preferences ?? { promotionsDigital: false, promotionsSampleBox: false, translationsEnabled: false }),
                        translationsEnabled: !(p.preferences?.translationsEnabled ?? false),
                      },
                    }
                  : p,
              )
            }
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white shadow transition-transform ${
                draft?.preferences?.translationsEnabled ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </label>
      </Card>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Button
          className="w-full"
          onClick={() => {
            if (!draft) return
            upsertProfile(draft)
            router.push('/dashboard')
          }}
        >
          Save changes
        </Button>
        <Link href="/dashboard" className="block">
          <Button variant="secondary" className="w-full">
            Cancel
          </Button>
        </Link>
      </div>
    </div>
  )
}

