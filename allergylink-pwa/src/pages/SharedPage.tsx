import { Link } from 'react-router-dom'
import { useAllergyLink } from '../hooks/useAllergyLink'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { VENUE_CATEGORY_LABELS } from '../lib/venueCategories'
import type { ShareMethod } from '../lib/types'

const METHOD_LABEL: Record<ShareMethod, string> = {
  qr: 'QR code',
  link: 'Link',
  id: 'Allergy ID',
  other: 'Other',
}

export function SharedPage() {
  const { shares, profiles, updateShare } = useAllergyLink()

  const sorted = [...shares].sort(
    (a, b) => new Date(b.dateShared).getTime() - new Date(a.dateShared).getTime(),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Shared with</h1>
          <p className="text-sm text-slate-600">
            A simple log of who you told about your profile. You add entries by hand for now.
          </p>
        </div>
        <Link to="/shared/new">
          <Button className="!min-h-10 !px-3 text-xs">Add</Button>
        </Link>
      </div>

      {sorted.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-600">No entries yet.</p>
          <Link to="/shared/new" className="mt-3 inline-block font-medium text-teal-800">
            Log your first share
          </Link>
        </Card>
      ) : (
        <ul className="space-y-3">
          {sorted.map((s) => {
            const prof = profiles.find((p) => p.id === s.profileId)
            return (
              <li key={s.id}>
                <Card className="space-y-3">
                  <div className="flex justify-between gap-2">
                    <div>
                      <p className="font-semibold text-slate-900">{s.recipientName}</p>
                      <p className="text-xs text-slate-500">
                        {VENUE_CATEGORY_LABELS[s.category]} · {METHOD_LABEL[s.method]}
                      </p>
                      <p className="text-xs text-slate-400">
                        {new Date(s.dateShared).toLocaleDateString(undefined, {
                          dateStyle: 'medium',
                        })}
                      </p>
                    </div>
                    {prof ? (
                      <p className="text-right text-xs text-slate-500">
                        Profile:{' '}
                        <span className="font-medium text-slate-700">
                          {prof.firstName} {prof.lastName}
                        </span>
                      </p>
                    ) : null}
                  </div>
                  <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700">
                    <input
                      type="checkbox"
                      checked={s.pushUpdatesEnabled}
                      onChange={(e) =>
                        updateShare(s.id, { pushUpdatesEnabled: e.target.checked })
                      }
                    />
                    <span>
                      Push updates when my profile changes{' '}
                      <span className="text-xs text-amber-700">(coming soon)</span>
                    </span>
                  </label>
                </Card>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
