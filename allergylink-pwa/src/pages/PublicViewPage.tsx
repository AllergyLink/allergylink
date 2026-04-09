import { useParams } from 'react-router-dom'
import { useAllergyLink } from '../hooks/useAllergyLink'
import { Card } from '../components/ui/Card'
/** Read-only card shown when someone opens /view/:id — same device for MVP */
export function PublicViewPage() {
  const { id } = useParams()
  const { profiles } = useAllergyLink()
  const p = profiles.find((x) => x.id === id)

  if (!p) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <p className="text-slate-600">This profile is not available on this device.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-lg space-y-4 px-4 py-8 pb-12">
      <header>
        <p className="text-xs font-semibold uppercase text-teal-700">AllergyLink</p>
        <h1 className="text-2xl font-bold text-slate-900">
          {p.firstName} {p.lastName}
        </h1>
        <p className="font-mono text-sm text-slate-600">{p.allergyId}</p>
      </header>
      <Card className="space-y-3">
        {p.allergies.length ? (
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">Allergies</p>
            <p className="text-base text-slate-900">{p.allergies.join(', ')}</p>
          </div>
        ) : null}
        {[...p.dietaryRestrictions, ...p.intolerances, ...p.sensitivities].length ? (
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">Dietary</p>
            <p className="text-sm text-slate-800">
              {[
                ...p.dietaryRestrictions,
                ...p.intolerances,
                ...p.sensitivities,
              ].join(', ')}
            </p>
          </div>
        ) : null}
      </Card>
      <Card className="border-amber-100 bg-amber-50/50">
        <p className="text-xs font-semibold uppercase text-slate-600">Emergency</p>
        <p className="text-sm">
          {p.emergencyContact.name} · {p.emergencyContact.phone}
        </p>
        {p.medicationsNotes ? <p className="mt-2 text-sm">{p.medicationsNotes}</p> : null}
      </Card>
      <p className="text-center text-xs text-slate-400">Read-only shared view</p>
    </div>
  )
}
