'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useApp } from '@/components/AppProvider'
import { ShareModal } from '@/components/sharing/ShareModal'
import QR from '@/components/QR'

function QRPlaceholder() {
  return (
    <div className="grid h-24 w-24 grid-cols-3 gap-1 rounded-xl bg-slate-100 p-3" aria-hidden>
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} className="rounded bg-slate-300/70" />
      ))}
    </div>
  )
}

export default function DashboardPage() {
  const { state } = useApp()
  const [shareOpen, setShareOpen] = useState(false)

  const user = state.session?.verified ? state.users[state.session.userId] : undefined
  const profiles = useMemo(() => Object.values(state.profiles), [state.profiles])
  const primary = useMemo(
    () => profiles.find((p) => p.userId === user?.id && p.type === 'primary') ?? null,
    [profiles, user?.id],
  )
  const family = useMemo(
    () => profiles.filter((p) => p.userId === user?.id && p.type === 'family'),
    [profiles, user?.id],
  )
  const shareSessions = useMemo(() => Object.values(state.shareSessions), [state.shareSessions])

  if (!user) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <p className="text-slate-700">Please sign in to access your dashboard.</p>
        <Link href="/auth" className="mt-4 inline-block">
          <Button>Go to sign in</Button>
        </Link>
      </div>
    )
  }

  if (!primary) {
    return (
      <div className="mx-auto max-w-lg px-4 py-10">
        <p className="text-slate-700">No profile found. Create your profile to continue.</p>
        <Link href="/onboarding" className="mt-4 inline-block">
          <Button>Create profile</Button>
        </Link>
      </div>
    )
  }

  const topAllergies = primary.allergies.filter((a) => a.isAnaphylactic || !a.crossContaminationOK).slice(0, 4)

  return (
    <div className="mx-auto max-w-lg px-4 pb-24 pt-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">Dashboard</p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-950">
            Welcome, {user.firstName || primary.name}
          </h1>
        </div>
        <Link href="/welcome" className="text-sm font-semibold text-slate-600 hover:text-slate-900">
          Home
        </Link>
      </div>

      {/* Primary profile card */}
      <Card className="mt-6 space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-200">
              {primary.photoDataUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={primary.photoDataUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-sm font-bold text-slate-600">
                  {primary.name.slice(0, 1).toUpperCase()}
                </div>
              )}
            </div>
            <div>
              <p className="text-lg font-semibold text-slate-950">{primary.name}</p>
              <p className="font-mono text-sm font-semibold tracking-wide text-slate-600">{primary.allergyLinkId}</p>
            </div>
          </div>
          {/* QR preview */}
          <div className="shrink-0 rounded-xl bg-white p-2 shadow-sm ring-1 ring-slate-200">
            <QR value={`https://id.allergylink.net/${primary.allergyLinkId}`} size={80} />
          </div>
        </div>

        {topAllergies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {topAllergies.map((a) => (
              <span
                key={a.name}
                className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-800"
              >
                {a.image} {a.name}
              </span>
            ))}
            {primary.allergies.length > 4 && (
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">
                +{primary.allergies.length - 4} more
              </span>
            )}
          </div>
        )}

        <div className="grid gap-2 sm:grid-cols-2">
          <Button className="w-full" onClick={() => setShareOpen(true)}>
            Share Profile
          </Button>
          <Link href={`/profile/${primary.id}`} className="w-full">
            <Button variant="secondary" className="w-full">View Full Profile</Button>
          </Link>
        </div>
      </Card>

      {/* Family profiles */}
      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Family</h2>
          <Link href="/onboarding" className="text-xs font-semibold text-[color:var(--color-primary)]">
            + Add member
          </Link>
        </div>
        <div className="mt-3 space-y-3">
          {family.length ? (
            family.map((p) => (
              <Card key={p.id} className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-950">{p.name}</p>
                  <p className="text-xs text-slate-600">{p.isMinor ? 'Minor profile' : 'Family profile'}</p>
                </div>
                <Link href={`/profile/${p.id}`} className="shrink-0">
                  <Button variant="secondary" className="!min-h-10 !px-3 text-xs">
                    Show Profile
                  </Button>
                </Link>
              </Card>
            ))
          ) : (
            <Card>
              <p className="text-sm text-slate-700">No family profiles yet.</p>
              <Link href="/onboarding" className="mt-3 inline-block">
                <Button variant="secondary">Add family members</Button>
              </Link>
            </Card>
          )}
        </div>
      </section>

      {/* Share history */}
      {shareSessions.filter((s) => s.profileId === primary.id).length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Recent Shares</h2>
          <div className="mt-3 space-y-2">
            {shareSessions
              .filter((s) => s.profileId === primary.id)
              .slice(0, 5)
              .map((s) => (
                <Card key={s.id} className="flex items-center justify-between gap-3 !py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Shared via {s.method}</p>
                    <p className="text-xs text-slate-500">{new Date(s.timestamp).toLocaleDateString()}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${s.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
                    {s.approved ? 'Approved' : 'Pending'}
                  </span>
                </Card>
              ))}
          </div>
        </section>
      )}

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  )
}
