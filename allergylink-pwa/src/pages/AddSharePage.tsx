import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAllergyLink } from '../hooks/useAllergyLink'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { VENUE_CATEGORY_OPTIONS } from '../lib/venueCategories'
import type { ShareMethod, VenueCategory } from '../lib/types'

export function AddSharePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as { profileId?: string } | undefined
  const { profiles, activeProfileId, addShare } = useAllergyLink()

  const defaultPid =
    state?.profileId ||
    activeProfileId ||
    profiles[0]?.id ||
    ''

  const [profileId, setProfileId] = useState(defaultPid)
  const [recipientName, setRecipientName] = useState('')
  const [category, setCategory] = useState<VenueCategory>('restaurants')
  const [method, setMethod] = useState<ShareMethod>('qr')
  const [dateShared, setDateShared] = useState(() =>
    new Date().toISOString().slice(0, 10),
  )
  const [pushUpdatesEnabled, setPushUpdatesEnabled] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!profileId || !recipientName.trim()) return
    addShare({
      profileId,
      recipientName: recipientName.trim(),
      category,
      method,
      dateShared: new Date(dateShared).toISOString(),
      pushUpdatesEnabled,
    })
    navigate('/shared')
  }

  if (!profiles.length) {
    return (
      <div className="space-y-4">
        <p className="text-slate-600">Create a profile first.</p>
        <Link to="/profile/new" className="font-medium text-teal-800">
          Create profile
        </Link>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Log a share</h1>
      <Card>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="pid">
              Profile
            </label>
            <select
              id="pid"
              className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
              value={profileId}
              onChange={(e) => setProfileId(e.target.value)}
              required
            >
              {profiles.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.firstName} {p.lastName} ({p.allergyId})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="rec">
              Recipient
            </label>
            <input
              id="rec"
              required
              className="min-h-11 w-full rounded-xl border border-slate-200 px-3 text-base"
              placeholder="e.g. Green Leaf Café"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="cat">
              Category
            </label>
            <select
              id="cat"
              className="min-h-11 w-full rounded-xl border border-slate-200 px-3 text-base"
              value={category}
              onChange={(e) => setCategory(e.target.value as VenueCategory)}
            >
              {VENUE_CATEGORY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="meth">
              How you shared
            </label>
            <select
              id="meth"
              className="min-h-11 w-full rounded-xl border border-slate-200 px-3 text-base"
              value={method}
              onChange={(e) => setMethod(e.target.value as ShareMethod)}
            >
              <option value="qr">QR code</option>
              <option value="link">Link</option>
              <option value="id">Allergy ID</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="d">
              Date
            </label>
            <input
              id="d"
              type="date"
              required
              className="min-h-11 w-full rounded-xl border border-slate-200 px-3 text-base"
              value={dateShared}
              onChange={(e) => setDateShared(e.target.value)}
            />
          </div>
          <label className="flex cursor-pointer items-start gap-3 text-sm">
            <input
              type="checkbox"
              className="mt-1"
              checked={pushUpdatesEnabled}
              onChange={(e) => setPushUpdatesEnabled(e.target.checked)}
            />
            <span>
              Prefer to send updates when this profile changes{' '}
              <span className="text-xs text-amber-800">(placeholder — not active yet)</span>
            </span>
          </label>
          <Button type="submit" className="w-full">
            Save entry
          </Button>
        </form>
      </Card>
      <p className="text-center text-sm">
        <button type="button" className="font-medium text-teal-800" onClick={() => navigate(-1)}>
          Cancel
        </button>
      </p>
    </div>
  )
}
