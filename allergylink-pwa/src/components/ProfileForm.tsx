import { useMemo, useState } from 'react'
import type { Profile } from '../lib/types'
import { AllergenSelector } from './AllergenSelector'
import { COMMON_ALLERGEN_SET } from '../lib/commonAllergens'
import { Button } from './ui/Button'
import { Card } from './ui/Card'
import { TagInputList } from './TagInputList'

export function ProfileForm({
  initial,
  title,
  submitLabel,
  onSubmit,
  onCancel,
  showAllergenGrid = false,
}: {
  initial: Profile
  title: string
  submitLabel: string
  onSubmit: (p: Profile) => void
  onCancel?: () => void
  /** Tap-to-select common allergens (create profile only) */
  showAllergenGrid?: boolean
}) {
  const [p, setP] = useState<Profile>(initial)

  const update = <K extends keyof Profile>(key: K, v: Profile[K]) =>
    setP((prev) => ({ ...prev, [key]: v }))

  const ec = p.emergencyContact

  const isValid = useMemo(() => {
    return (
      p.firstName.trim().length > 0 &&
      p.lastName.trim().length > 0 &&
      p.emergencyContact.name.trim().length > 0 &&
      p.emergencyContact.phone.trim().length > 0
    )
  }, [p])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValid) return
    const now = new Date().toISOString()
    onSubmit({
      ...p,
      firstName: p.firstName.trim(),
      lastName: p.lastName.trim(),
      medicationsNotes: p.medicationsNotes?.trim() || undefined,
      updatedAt: now,
      createdAt: p.createdAt || now,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 pb-28">
      <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
      <p className="text-sm text-slate-600">
        Saved on this device only. You can change anything later.
      </p>

      <Card className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-800">Basics</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="fn">
              First name
            </label>
            <input
              id="fn"
              required
              className="min-h-11 w-full rounded-xl border border-slate-200 px-3 text-base"
              value={p.firstName}
              onChange={(e) => update('firstName', e.target.value)}
              autoComplete="given-name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="ln">
              Last name
            </label>
            <input
              id="ln"
              required
              className="min-h-11 w-full rounded-xl border border-slate-200 px-3 text-base"
              value={p.lastName}
              onChange={(e) => update('lastName', e.target.value)}
              autoComplete="family-name"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="dob">
            Date of birth (optional)
          </label>
          <input
            id="dob"
            type="date"
            className="min-h-11 w-full rounded-xl border border-slate-200 px-3 text-base"
            value={p.dateOfBirth ?? ''}
            onChange={(e) => update('dateOfBirth', e.target.value || undefined)}
          />
        </div>
      </Card>

      <Card className="space-y-5">
        {showAllergenGrid ? (
          <div className="space-y-4">
            <h2 className="text-base font-semibold text-slate-900">Select your allergies</h2>
            <AllergenSelector
              value={p.allergies}
              onChange={(allergies) => update('allergies', allergies)}
            />
            <TagInputList
              label="Other allergies"
              hint="Add any allergens not shown above."
              value={p.allergies.filter((a) => !COMMON_ALLERGEN_SET.has(a))}
              onChange={(others) => {
                const common = p.allergies.filter((a) => COMMON_ALLERGEN_SET.has(a))
                update('allergies', [...common, ...others])
              }}
              placeholder="e.g. Mustard"
            />
          </div>
        ) : (
          <TagInputList
            label="Allergies"
            hint="Add each allergen and tap Add."
            value={p.allergies}
            onChange={(allergies) => update('allergies', allergies)}
            placeholder="e.g. Peanuts"
          />
        )}
        <TagInputList
          label="Dietary restrictions"
          value={p.dietaryRestrictions}
          onChange={(dietaryRestrictions) => update('dietaryRestrictions', dietaryRestrictions)}
          placeholder="e.g. Vegan"
        />
        <TagInputList
          label="Intolerances"
          value={p.intolerances}
          onChange={(intolerances) => update('intolerances', intolerances)}
          placeholder="e.g. Lactose"
        />
        <TagInputList
          label="Sensitivities"
          value={p.sensitivities}
          onChange={(sensitivities) => update('sensitivities', sensitivities)}
          placeholder="e.g. Sulfites"
        />
      </Card>

      <Card className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-800">Emergency</h2>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="med">
            Medications or notes (optional)
          </label>
          <textarea
            id="med"
            rows={3}
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-base"
            value={p.medicationsNotes ?? ''}
            onChange={(e) => update('medicationsNotes', e.target.value)}
          />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="ecn">
              Emergency contact name
            </label>
            <input
              id="ecn"
              required
              className="min-h-11 w-full rounded-xl border border-slate-200 px-3 text-base"
              value={ec.name}
              onChange={(e) =>
                update('emergencyContact', { ...ec, name: e.target.value })
              }
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="ecp">
              Emergency phone
            </label>
            <input
              id="ecp"
              required
              type="tel"
              className="min-h-11 w-full rounded-xl border border-slate-200 px-3 text-base"
              value={ec.phone}
              onChange={(e) =>
                update('emergencyContact', { ...ec, phone: e.target.value })
              }
              autoComplete="tel"
            />
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="rel">
            Relationship (optional)
          </label>
          <input
            id="rel"
            className="min-h-11 w-full rounded-xl border border-slate-200 px-3 text-base"
            value={ec.relationship ?? ''}
            onChange={(e) =>
              update('emergencyContact', {
                ...ec,
                relationship: e.target.value || undefined,
              })
            }
          />
        </div>
      </Card>

      <Card className="space-y-3">
        <h2 className="text-sm font-semibold text-slate-800">Display</h2>
        <fieldset>
          <legend className="mb-2 text-sm text-slate-600">Preferred format</legend>
          <div className="flex flex-col gap-2">
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="fmt"
                checked={p.preferredDisplayFormat === 'detailed'}
                onChange={() => update('preferredDisplayFormat', 'detailed')}
              />
              Detailed (all sections)
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm">
              <input
                type="radio"
                name="fmt"
                checked={p.preferredDisplayFormat === 'compact'}
                onChange={() => update('preferredDisplayFormat', 'compact')}
              />
              Compact (allergies & emergency first)
            </label>
          </div>
        </fieldset>
      </Card>

      {p.managedByProfileId ? (
        <Card className="space-y-3">
          <h2 className="text-sm font-semibold text-slate-800">Caregiver</h2>
          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={p.canShareIndependently}
              onChange={(e) => update('canShareIndependently', e.target.checked)}
            />
            <span>
              This person can share their own AllergyLink ID and QR (not only through my
              account).
            </span>
          </label>
        </Card>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button type="submit" disabled={!isValid} className="flex-1">
          {submitLabel}
        </Button>
        {onCancel ? (
          <Button type="button" variant="secondary" className="flex-1" onClick={onCancel}>
            Cancel
          </Button>
        ) : null}
      </div>
    </form>
  )
}
