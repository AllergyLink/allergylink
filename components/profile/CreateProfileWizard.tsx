'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useApp } from '@/components/AppProvider'
import type { DietaryRestriction, Guardian, Profile } from '@/lib/types'
import { ALLERGEN_CATEGORIES, ALLERGEN_SEED } from '@/lib/store/allergens'
import { AvatarBuilder } from './AvatarBuilder'

type Step =
  | 'identity'
  | 'allergies'
  | 'dietary'
  | 'emergency'
  | 'promotions'
  | 'family'
  | 'guardians'
  | 'complete'

const ALL_STEPS: { key: Step; label: string }[] = [
  { key: 'identity', label: 'Identity' },
  { key: 'allergies', label: 'Food Allergies' },
  { key: 'dietary', label: 'Dietary' },
  { key: 'emergency', label: 'Emergency' },
  { key: 'promotions', label: 'Promotions' },
  { key: 'family', label: 'Family Profiles' },
  { key: 'guardians', label: 'Guardians' },
  { key: 'complete', label: 'Complete' },
]

const SECONDARY_STEPS: Step[] = ['identity', 'allergies', 'dietary', 'emergency', 'promotions', 'complete']

const DIETARY: DietaryRestriction[] = [
  'Vegan',
  'Vegetarian',
  'Halal',
  'Kosher',
  'Gluten-Free',
  'Custom',
]

function Stepper({ index, steps }: { index: number; steps: { key: Step; label: string }[] }) {
  return (
    <div className="flex items-center gap-2" aria-label="Progress">
      {steps.map((s, i) => (
        <div
          key={s.key}
          className={`h-2 flex-1 rounded-full ${
            i <= index ? 'bg-[color:var(--color-primary)]' : 'bg-slate-200'
          }`}
        />
      ))}
    </div>
  )
}

function Toggle({
  label,
  value,
  onChange,
  tone,
}: {
  label: string
  value: boolean
  onChange: (v: boolean) => void
  tone: 'danger' | 'safe' | 'neutral'
}) {
  const cls =
    tone === 'danger'
      ? 'border-rose-300 bg-rose-50 text-rose-900'
      : tone === 'safe'
        ? 'border-emerald-300 bg-emerald-50 text-emerald-900'
        : 'border-slate-200 bg-slate-50 text-slate-800'
  return (
    <button
      type="button"
      className={`flex min-h-11 w-full items-center justify-between rounded-xl border px-3 py-2 text-sm font-semibold ${cls}`}
      onClick={() => onChange(!value)}
      aria-pressed={value}
    >
      <span>{label}</span>
      <span className="font-bold">{value ? 'Yes' : 'No'}</span>
    </button>
  )
}

function AllergenRow({
  p,
  allergenName,
  image,
  onChange,
}: {
  p: Profile
  allergenName: string
  image: string
  onChange: (next: Profile) => void
}) {
  const a = p.allergies.find((x) => x.name === allergenName)
  if (!a) return null

  const danger = a.isAnaphylactic || !a.crossContaminationOK

  return (
    <div className={`rounded-2xl border p-4 shadow-sm ${danger ? 'border-rose-200 bg-rose-50/40' : 'border-slate-200 bg-white'}`}>
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-2xl" aria-hidden>
            {image}
          </div>
          <div>
            <p className="text-base font-semibold text-slate-900">{a.name}</p>
            <p className="text-xs text-slate-600">{a.category}</p>
          </div>
        </div>
        <div className={`rounded-full px-3 py-1 text-xs font-bold ${danger ? 'bg-rose-100 text-rose-900' : 'bg-slate-100 text-slate-700'}`}>
          {danger ? 'HIGH RISK' : 'STANDARD'}
        </div>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <Toggle
          label="Anaphylactic"
          value={a.isAnaphylactic}
          onChange={(v) =>
            onChange({
              ...p,
              allergies: p.allergies.map((x) =>
                x.name === a.name ? { ...x, isAnaphylactic: v } : x,
              ),
            })
          }
          tone={a.isAnaphylactic ? 'danger' : 'neutral'}
        />
        <Toggle
          label="Cross-contamination OK"
          value={a.crossContaminationOK}
          onChange={(v) =>
            onChange({
              ...p,
              allergies: p.allergies.map((x) =>
                x.name === a.name ? { ...x, crossContaminationOK: v } : x,
              ),
            })
          }
          tone={!a.crossContaminationOK ? 'danger' : 'safe'}
        />
      </div>
    </div>
  )
}

function GuardianEditor({
  guardians,
  onAdd,
  onVerify,
}: {
  guardians: Guardian[]
  onAdd: (g: Omit<Guardian, 'id' | 'profileId' | 'verified'>) => void
  onVerify: (guardianId: string, code: string) => void
}) {
  const [name, setName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [relationship, setRelationship] = useState('')
  const [isPrimary, setIsPrimary] = useState(true)
  const [verifyFor, setVerifyFor] = useState<string | null>(null)
  const [code, setCode] = useState('')

  return (
    <div className="space-y-5">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-800">Name</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
          />
        </label>
        <label className="block">
          <span className="mb-1 block text-sm font-medium text-slate-800">Phone number</span>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            inputMode="tel"
            className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
          />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-sm font-medium text-slate-800">Relationship</span>
          <input
            value={relationship}
            onChange={(e) => setRelationship(e.target.value)}
            placeholder="Parent, Guardian, Caregiver"
            className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
          />
        </label>
      </div>

      <label className="flex items-center gap-3 text-sm font-medium text-slate-800">
        <input
          type="checkbox"
          checked={isPrimary}
          onChange={(e) => setIsPrimary(e.target.checked)}
        />
        Primary guardian
      </label>

      <Button
        type="button"
        className="w-full"
        onClick={() => {
          if (!name.trim() || !phoneNumber.trim() || !relationship.trim()) return
          onAdd({ name: name.trim(), phoneNumber: phoneNumber.trim(), relationship: relationship.trim(), isPrimary })
          setName('')
          setPhoneNumber('')
          setRelationship('')
          setIsPrimary(true)
        }}
      >
        Add guardian
      </Button>

      {guardians.length ? (
        <div className="space-y-3">
          {guardians.map((g) => (
            <Card key={g.id} className="space-y-2">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">{g.name}</p>
                  <p className="text-sm text-slate-600">{g.phoneNumber}</p>
                  <p className="text-xs text-slate-500">{g.relationship}{g.isPrimary ? ' (Primary)' : ''}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-bold ${g.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
                  {g.verified ? 'Verified' : 'Verify required'}
                </span>
              </div>

              {!g.verified ? (
                <div className="space-y-2">
                  {verifyFor === g.id ? (
                    <>
                      <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        placeholder="Enter code (123456)"
                        className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base tracking-widest"
                      />
                      <Button
                        type="button"
                        className="w-full"
                        onClick={() => {
                          onVerify(g.id, code)
                          setVerifyFor(null)
                          setCode('')
                        }}
                      >
                        Verify guardian
                      </Button>
                    </>
                  ) : (
                    <Button type="button" variant="secondary" className="w-full" onClick={() => setVerifyFor(g.id)}>
                      Simulate verification
                    </Button>
                  )}
                </div>
              ) : null}
            </Card>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export function CreateProfileWizard({ profileType = 'primary' }: { profileType?: Profile['type'] }) {
  const router = useRouter()
  const { state, createProfileDraft, upsertProfile, createGuardian, verifyGuardian } = useApp()

  const user = state.session?.verified ? state.users[state.session.userId] : undefined

  const STEPS = profileType === 'secondary'
    ? ALL_STEPS.filter((s) => SECONDARY_STEPS.includes(s.key))
    : ALL_STEPS

  const [stepIndex, setStepIndex] = useState(0)
  const step = STEPS[stepIndex]!.key

  const [primary, setPrimary] = useState<Profile>(() =>
    user ? createProfileDraft(user.id, user.firstName, profileType) : createProfileDraft('unknown', 'User', profileType),
  )
  const [expandedCategory, setExpandedCategory] = useState<string | null>('Nuts')
  const [customAllergenName, setCustomAllergenName] = useState('')
  const [family, setFamily] = useState<Profile[]>([])

  const minorsNeedingGuardians = useMemo(
    () => [primary, ...family].filter((p) => p.isMinor && p.guardians.length === 0),
    [primary, family],
  )

  const canContinue = useMemo(() => {
    if (step === 'identity') return primary.name.trim().length > 0
    if (step === 'guardians') return minorsNeedingGuardians.length === 0
    return true
  }, [step, primary.name, minorsNeedingGuardians.length])

  const next = () => {
    if (!canContinue) return
    const nextIndex = Math.min(stepIndex + 1, STEPS.length - 1)
    setStepIndex(nextIndex)
  }

  const back = () => setStepIndex(Math.max(stepIndex - 1, 0))

  if (!user) {
    router.replace('/auth')
    return null
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-8">
      <div className="space-y-4">
        <Stepper index={stepIndex} steps={STEPS} />
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-950">Create Profile</h1>
          <p className="mt-2 text-sm text-slate-600">{STEPS[stepIndex]!.label}</p>
        </div>
      </div>

      <div className="mt-6 space-y-4">
        {step === 'identity' ? (
          <Card className="space-y-4">
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-800">First name</span>
              <input
                value={primary.name}
                onChange={(e) => setPrimary({ ...primary, name: e.target.value })}
                className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-800">Photo upload (optional)</span>
              <input
                type="file"
                accept="image/*"
                className="block w-full text-sm text-slate-700"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (!file) return
                  const reader = new FileReader()
                  reader.onload = () => {
                    const res = typeof reader.result === 'string' ? reader.result : undefined
                    setPrimary({ ...primary, photoDataUrl: res })
                  }
                  reader.readAsDataURL(file)
                }}
              />
            </label>

            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">Avatar builder (recommended)</p>
              <AvatarBuilder
                value={
                  primary.avatar ?? {
                    hairLength: 'Medium',
                    hairColor: 'Brown',
                    glasses: 'None',
                    skinTone: 'Medium',
                  }
                }
                onChange={(avatar) => setPrimary({ ...primary, avatar })}
              />
            </div>
          </Card>
        ) : null}

        {step === 'allergies' ? (
          <div className="space-y-4">
            <Card className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">Categories</p>
              <div className="flex flex-wrap gap-2">
                {ALLERGEN_CATEGORIES.map((c) => {
                  const count = primary.allergies.filter((a) => a.category === c.key).length
                  return (
                    <button
                      key={c.key}
                      type="button"
                      className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${
                        expandedCategory === c.key
                          ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)]'
                          : 'border-slate-200 bg-white text-slate-700'
                      }`}
                      onClick={() => setExpandedCategory(c.key)}
                    >
                      {c.label}{count > 0 ? ` (${count})` : ''}
                    </button>
                  )
                })}
              </div>
              <p className="text-xs text-slate-500">
                Tap a category, then add allergens. Set anaphylaxis and cross-contamination per item.
              </p>
            </Card>

            {/* Catalog: allergens available to add */}
            <div className="space-y-2">
              {ALLERGEN_SEED.filter((s) => s.category === expandedCategory).map((seed) => {
                const added = primary.allergies.some((a) => a.name === seed.name)
                return added ? null : (
                  <button
                    key={seed.name}
                    type="button"
                    className="flex w-full items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-left hover:border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-soft)]"
                    onClick={() =>
                      setPrimary({
                        ...primary,
                        allergies: [
                          ...primary.allergies,
                          { category: seed.category, name: seed.name, image: seed.image, isAnaphylactic: false, crossContaminationOK: true },
                        ],
                      })
                    }
                  >
                    <span className="text-2xl">{seed.image}</span>
                    <span className="flex-1 text-sm font-medium text-slate-800">{seed.name}</span>
                    <span className="text-lg text-[color:var(--color-primary)]">+</span>
                  </button>
                )
              })}

              {/* Custom allergen for Other category */}
              {expandedCategory === 'Other' && (
                <div className="flex gap-2">
                  <input
                    value={customAllergenName}
                    onChange={(e) => setCustomAllergenName(e.target.value)}
                    placeholder="Custom allergen name"
                    className="min-h-11 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-sm"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    className="shrink-0"
                    onClick={() => {
                      const name = customAllergenName.trim()
                      if (!name || primary.allergies.some((a) => a.name === name)) return
                      setPrimary({
                        ...primary,
                        allergies: [
                          ...primary.allergies,
                          { category: 'Other', name, image: '⚠️', isAnaphylactic: false, crossContaminationOK: true },
                        ],
                      })
                      setCustomAllergenName('')
                    }}
                  >
                    Add
                  </Button>
                </div>
              )}
            </div>

            {/* Configured allergens in this category */}
            <div className="space-y-3">
              {primary.allergies
                .filter((a) => a.category === expandedCategory)
                .map((a) => (
                  <div key={a.name} className="relative">
                    <AllergenRow
                      p={primary}
                      allergenName={a.name}
                      image={a.image}
                      onChange={setPrimary}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-3 rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 hover:bg-rose-100 hover:text-rose-700"
                      onClick={() =>
                        setPrimary({ ...primary, allergies: primary.allergies.filter((x) => x.name !== a.name) })
                      }
                    >
                      Remove
                    </button>
                  </div>
                ))}
            </div>
          </div>
        ) : null}

        {step === 'dietary' ? (
          <Card className="space-y-4">
            <p className="text-sm font-semibold text-slate-900">Dietary restrictions</p>
            <div className="space-y-2">
              {DIETARY.map((d) => (
                <label key={d} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-3 py-3">
                  <input
                    type="checkbox"
                    className="mt-1"
                    checked={primary.dietaryRestrictions.includes(d)}
                    onChange={(e) => {
                      const next = e.target.checked
                        ? [...primary.dietaryRestrictions, d]
                        : primary.dietaryRestrictions.filter((x) => x !== d)
                      setPrimary({ ...primary, dietaryRestrictions: next })
                    }}
                  />
                  <span className="text-sm font-medium text-slate-800">{d}</span>
                </label>
              ))}
            </div>
            {primary.dietaryRestrictions.includes('Custom') ? (
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-800">Custom dietary note</span>
                <input
                  value={primary.dietaryCustom ?? ''}
                  onChange={(e) => setPrimary({ ...primary, dietaryCustom: e.target.value })}
                  className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
                />
              </label>
            ) : null}
          </Card>
        ) : null}

        {step === 'emergency' ? (
          <Card className="space-y-4">
            <p className="text-sm font-semibold text-slate-900">Emergency contact (optional)</p>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-800">Name</span>
              <input
                value={primary.emergencyContact?.name ?? ''}
                onChange={(e) =>
                  setPrimary({
                    ...primary,
                    emergencyContact: { ...(primary.emergencyContact ?? {}), name: e.target.value },
                  })
                }
                className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-sm font-medium text-slate-800">Phone</span>
              <input
                value={primary.emergencyContact?.phone ?? ''}
                onChange={(e) =>
                  setPrimary({
                    ...primary,
                    emergencyContact: { ...(primary.emergencyContact ?? {}), phone: e.target.value },
                  })
                }
                inputMode="tel"
                className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
              />
            </label>
          </Card>
        ) : null}

        {step === 'promotions' ? (
          <Card className="space-y-4">
            <p className="text-sm font-semibold text-slate-900">Promotions</p>
            <div className="space-y-2">
              <label className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Digital promotions</p>
                  <p className="text-xs text-slate-600">In-app only</p>
                </div>
                <input
                  type="checkbox"
                  checked={primary.preferences.promotionsDigital}
                  onChange={(e) =>
                    setPrimary({
                      ...primary,
                      preferences: { ...primary.preferences, promotionsDigital: e.target.checked },
                    })
                  }
                />
              </label>
              <label className="flex items-start justify-between gap-4 rounded-xl border border-slate-200 bg-white px-3 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">Sample box</p>
                  <p className="text-xs text-slate-600">Only if enabled</p>
                </div>
                <input
                  type="checkbox"
                  checked={primary.preferences.promotionsSampleBox}
                  onChange={(e) =>
                    setPrimary({
                      ...primary,
                      preferences: { ...primary.preferences, promotionsSampleBox: e.target.checked },
                    })
                  }
                />
              </label>
            </div>
            <p className="rounded-xl bg-slate-50 p-3 text-sm text-slate-700">
              Your data is never shared with brands.
            </p>
            {primary.preferences.promotionsSampleBox ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-slate-800">Address line 1</span>
                  <input
                    value={primary.preferences.sampleBoxAddress?.line1 ?? ''}
                    onChange={(e) =>
                      setPrimary({
                        ...primary,
                        preferences: {
                          ...primary.preferences,
                          sampleBoxAddress: { ...(primary.preferences.sampleBoxAddress ?? { city: '', state: '', zip: '' }), line1: e.target.value },
                        },
                      })
                    }
                    className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-slate-800">Address line 2</span>
                  <input
                    value={primary.preferences.sampleBoxAddress?.line2 ?? ''}
                    onChange={(e) =>
                      setPrimary({
                        ...primary,
                        preferences: {
                          ...primary.preferences,
                          sampleBoxAddress: { ...(primary.preferences.sampleBoxAddress ?? { line1: '', city: '', state: '', zip: '' }), line2: e.target.value },
                        },
                      })
                    }
                    className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-800">City</span>
                  <input
                    value={primary.preferences.sampleBoxAddress?.city ?? ''}
                    onChange={(e) =>
                      setPrimary({
                        ...primary,
                        preferences: {
                          ...primary.preferences,
                          sampleBoxAddress: { ...(primary.preferences.sampleBoxAddress ?? { line1: '', state: '', zip: '' }), city: e.target.value },
                        },
                      })
                    }
                    className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-sm font-medium text-slate-800">State</span>
                  <input
                    value={primary.preferences.sampleBoxAddress?.state ?? ''}
                    onChange={(e) =>
                      setPrimary({
                        ...primary,
                        preferences: {
                          ...primary.preferences,
                          sampleBoxAddress: { ...(primary.preferences.sampleBoxAddress ?? { line1: '', city: '', zip: '' }), state: e.target.value },
                        },
                      })
                    }
                    className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-sm font-medium text-slate-800">ZIP</span>
                  <input
                    value={primary.preferences.sampleBoxAddress?.zip ?? ''}
                    onChange={(e) =>
                      setPrimary({
                        ...primary,
                        preferences: {
                          ...primary.preferences,
                          sampleBoxAddress: { ...(primary.preferences.sampleBoxAddress ?? { line1: '', city: '', state: '' }), zip: e.target.value },
                        },
                      })
                    }
                    inputMode="numeric"
                    className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
                  />
                </label>
              </div>
            ) : null}
          </Card>
        ) : null}

        {step === 'family' ? (
          <Card className="space-y-4">
            <p className="text-sm font-semibold text-slate-900">Family profiles</p>
            <p className="text-sm text-slate-600">
              Add family members. If a profile is a minor, guardian verification is required.
            </p>

            <Button
              type="button"
              variant="secondary"
              className="w-full"
              onClick={() => {
                const now = new Date().toISOString()
                setFamily((prev) => [
                  ...prev,
                  {
                    ...createProfileDraft(user.id, 'Family member'),
                    type: 'family',
                    isMinor: false,
                    createdAt: now,
                    updatedAt: now,
                  },
                ])
              }}
            >
              Add family member
            </Button>

            {family.length ? (
              <div className="space-y-3">
                {family.map((m, idx) => (
                  <Card key={m.id} className="space-y-3">
                    <label className="block">
                      <span className="mb-1 block text-sm font-medium text-slate-800">Name</span>
                      <input
                        value={m.name}
                        onChange={(e) => {
                          const v = e.target.value
                          setFamily((prev) => prev.map((p, i) => (i === idx ? { ...p, name: v } : p)))
                        }}
                        className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
                      />
                    </label>
                    <label className="flex items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white px-3 py-3">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">Minor</p>
                        <p className="text-xs text-slate-600">Requires guardian approval</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={m.isMinor}
                        onChange={(e) => {
                          const v = e.target.checked
                          setFamily((prev) => prev.map((p, i) => (i === idx ? { ...p, isMinor: v } : p)))
                        }}
                      />
                    </label>
                    {m.isMinor ? (
                      <p className="text-xs text-amber-800">
                        Guardian required before you can complete setup.
                      </p>
                    ) : null}
                  </Card>
                ))}
              </div>
            ) : null}
          </Card>
        ) : null}

        {step === 'guardians' ? (
          <div className="space-y-4">
            <Card className="space-y-2">
              <p className="text-sm font-semibold text-slate-900">Guardians (for minors)</p>
              <p className="text-sm text-slate-600">
                At least one guardian is required for each minor profile. Demo verification code is 123456.
              </p>
            </Card>

            {[primary, ...family].filter((p) => p.isMinor).map((minor) => (
              <Card key={minor.id} className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-slate-900">{minor.name}</p>
                    <p className="text-xs text-slate-500">Minor profile · guardian approval required</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${minor.guardians.length ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-900'}`}>
                    {minor.guardians.length ? 'Guardian added' : 'Needs guardian'}
                  </span>
                </div>

                <GuardianEditor
                  guardians={minor.guardians}
                  onAdd={(g) => {
                    const created = createGuardian(minor.id, g)
                    const updated = { ...minor, guardians: [...minor.guardians, created] }
                    if (minor.id === primary.id) setPrimary(updated)
                    else setFamily((prev) => prev.map((p) => (p.id === minor.id ? updated : p)))
                  }}
                  onVerify={(guardianId, code) => {
                    const ok = verifyGuardian(minor.id, guardianId, code)
                    if (!ok) return
                    const updated = {
                      ...minor,
                      guardians: minor.guardians.map((g) => (g.id === guardianId ? { ...g, verified: true } : g)),
                    }
                    if (minor.id === primary.id) setPrimary(updated)
                    else setFamily((prev) => prev.map((p) => (p.id === minor.id ? updated : p)))
                  }}
                />
              </Card>
            ))}
          </div>
        ) : null}

        {step === 'complete' ? (
          <Card className="space-y-4">
            <p className="text-lg font-semibold text-slate-950">Ready to create your profile?</p>
            <p className="text-sm text-slate-600">
              You can edit everything later from your dashboard. External views are strictly read-only.
            </p>
            <Button
              type="button"
              className="w-full"
              disabled={minorsNeedingGuardians.length > 0}
              onClick={() => {
                upsertProfile(primary)
                family.forEach((m) => upsertProfile(m))
                router.push('/dashboard')
              }}
            >
              Create Profile &amp; Go to Dashboard
            </Button>
            {minorsNeedingGuardians.length ? (
              <p className="text-sm text-rose-700">
                Add at least 1 guardian for each minor before completing.
              </p>
            ) : null}
          </Card>
        ) : null}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <Button type="button" variant="secondary" className="flex-1" onClick={back} disabled={stepIndex === 0}>
          Back
        </Button>
        <Button
          type="button"
          className="flex-1"
          onClick={next}
          disabled={stepIndex === STEPS.length - 1 || !canContinue}
        >
          Continue
        </Button>
      </div>
    </div>
  )
}

