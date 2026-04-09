import { Link } from 'react-router-dom'
import { useAllergyLink } from '../hooks/useAllergyLink'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export function FamilyPage() {
  const { profiles, activeProfileId, setActiveProfileId } = useAllergyLink()

  const roots = profiles.filter((p) => !p.managedByProfileId)
  const dependents = (parentId: string) =>
    profiles.filter((p) => p.managedByProfileId === parentId)

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Family & caregivers</h1>
        <p className="text-sm text-slate-600">
          Manage your profile and profiles for children or dependents. Each person gets their own
          Allergy ID.
        </p>
      </div>

      {profiles.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-600">No profiles yet.</p>
          <Link to="/profile/new" className="mt-3 inline-block font-medium text-teal-800">
            Create your first profile
          </Link>
        </Card>
      ) : (
        <div className="space-y-6">
          {roots.map((r) => (
            <section key={r.id} className="space-y-3">
              <Card className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase text-teal-700">Primary</p>
                  <p className="text-lg font-semibold text-slate-900">
                    {r.firstName} {r.lastName}
                  </p>
                  <p className="font-mono text-sm text-slate-600">{r.allergyId}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Link to={`/profile/${r.id}`}>
                    <Button variant="secondary" className="!min-h-10 text-xs">
                      View ID
                    </Button>
                  </Link>
                  <button
                    type="button"
                    className="rounded-xl border border-teal-200 bg-white px-3 py-2 text-xs font-semibold text-teal-800"
                    onClick={() => setActiveProfileId(r.id)}
                  >
                    {activeProfileId === r.id ? 'Active' : 'Set active'}
                  </button>
                </div>
              </Card>

              {dependents(r.id).length > 0 ? (
                <ul className="space-y-2 pl-2 border-l-2 border-teal-100">
                  {dependents(r.id).map((c) => (
                    <li key={c.id}>
                      <Card className="flex flex-wrap items-center justify-between gap-2">
                        <div>
                          <p className="font-medium text-slate-900">
                            {c.firstName} {c.lastName}
                          </p>
                          <p className="text-xs text-slate-500">
                            {c.canShareIndependently
                              ? 'Can share their own ID'
                              : 'Shared via caregiver only'}
                          </p>
                          <p className="font-mono text-xs text-slate-500">{c.allergyId}</p>
                        </div>
                        <Link to={`/profile/${c.id}`}>
                          <Button variant="ghost" className="!min-h-10 text-xs">
                            Open
                          </Button>
                        </Link>
                      </Card>
                    </li>
                  ))}
                </ul>
              ) : null}

              <Link
                to={`/profile/new?dependent=1&managedBy=${encodeURIComponent(r.id)}`}
                className="inline-flex"
              >
                <Button variant="secondary" className="text-sm">
                  Add dependent for {r.firstName}
                </Button>
              </Link>
            </section>
          ))}

          {/* Orphan dependents (if parent deleted) */}
          {profiles
            .filter(
              (p) =>
                p.managedByProfileId &&
                !profiles.some((x) => x.id === p.managedByProfileId),
            )
            .map((o) => (
              <Card key={o.id}>
                <p className="text-sm font-medium text-slate-800">
                  {o.firstName} {o.lastName}
                </p>
                <p className="text-xs text-amber-800">
                  Previously linked to a caregiver profile that was removed.
                </p>
                <Link to={`/profile/${o.id}/edit`} className="mt-2 inline-block text-sm text-teal-800">
                  Review settings
                </Link>
              </Card>
            ))}
        </div>
      )}
    </div>
  )
}
