'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { useApp } from '@/components/AppProvider'
import { ShareModal } from '@/components/sharing/ShareModal'
import QR from '@/components/QR'
import { LOCALE_LABELS, translateAllergen, type SupportedLocale } from '@/lib/translations'

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
  const { state, addFavoriteVenue, removeFavoriteVenue } = useApp()
  const [shareOpen, setShareOpen] = useState(false)
  const [translationLocale, setTranslationLocale] = useState<SupportedLocale>('es')

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
  const secondary = useMemo(
    () => profiles.filter((p) => p.userId === user?.id && p.type === 'secondary'),
    [profiles, user?.id],
  )
  const shareSessions = useMemo(() => Object.values(state.shareSessions), [state.shareSessions])
  const favoriteVenues = useMemo(() => state.favoriteVenues ?? [], [state.favoriteVenues])

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
  const primarySessions = shareSessions.filter((s) => s.profileId === primary.id)

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
            <QR value={`https://allergylink.vercel.app/p/${primary.allergyLinkId}`} size={80} />
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
          <Link href="/onboarding?type=family" className="text-xs font-semibold text-[color:var(--color-primary)]">
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
              <Link href="/onboarding?type=family" className="mt-3 inline-block">
                <Button variant="secondary">Add family members</Button>
              </Link>
            </Card>
          )}
        </div>
      </section>

      {/* Secondary profiles */}
      <section className="mt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Secondary Profiles</h2>
          <Link href="/onboarding?type=secondary" className="text-xs font-semibold text-[color:var(--color-primary)]">
            + Add profile
          </Link>
        </div>
        <div className="mt-3 space-y-3">
          {secondary.length ? (
            secondary.map((p) => (
              <Card key={p.id} className="flex items-center justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-950">{p.name}</p>
                  <p className="font-mono text-xs text-slate-500">{p.allergyLinkId}</p>
                </div>
                <Link href={`/profile/${p.id}`} className="shrink-0">
                  <Button variant="secondary" className="!min-h-10 !px-3 text-xs">
                    Edit
                  </Button>
                </Link>
              </Card>
            ))
          ) : (
            <Card>
              <p className="text-sm text-slate-700">Secondary profiles let you share different views of your allergies for specific contexts.</p>
              <Link href="/onboarding?type=secondary" className="mt-3 inline-block">
                <Button variant="secondary">Create secondary profile</Button>
              </Link>
            </Card>
          )}
        </div>
      </section>

      {/* Share history + favorite venues */}
      {primarySessions.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Recent Shares</h2>
          <div className="mt-3 space-y-2">
            {primarySessions.slice(0, 5).map((s) => {
              const isFav = favoriteVenues.some((v) => v.name === (s.venueName ?? `Shared via ${s.method}`))
              return (
                <Card key={s.id} className="flex items-center justify-between gap-3 !py-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-900">
                      {s.venueName ?? `Shared via ${s.method}`}
                    </p>
                    <p className="text-xs text-slate-500">{new Date(s.timestamp).toLocaleDateString()}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${s.approved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900'}`}>
                      {s.approved ? 'Approved' : 'Pending'}
                    </span>
                    <button
                      type="button"
                      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                      className={`text-lg leading-none transition-colors ${isFav ? 'text-amber-400' : 'text-slate-300 hover:text-amber-300'}`}
                      onClick={() => {
                        const venueName = s.venueName ?? `Shared via ${s.method}`
                        if (isFav) {
                          const fav = favoriteVenues.find((v) => v.name === venueName)
                          if (fav) removeFavoriteVenue(fav.id)
                        } else {
                          addFavoriteVenue({ name: venueName, type: s.venueType })
                        }
                      }}
                    >
                      ★
                    </button>
                  </div>
                </Card>
              )
            })}
          </div>
        </section>
      )}

      {/* Favorite venues */}
      {favoriteVenues.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Favorite Venues</h2>
          <div className="mt-3 space-y-2">
            {favoriteVenues.map((v) => (
              <Card key={v.id} className="flex items-center justify-between gap-3 !py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-900">⭐ {v.name}</p>
                  {v.type && <p className="text-xs text-slate-500">{v.type}</p>}
                </div>
                <button
                  type="button"
                  className="text-xs text-slate-400 hover:text-rose-600"
                  onClick={() => removeFavoriteVenue(v.id)}
                >
                  Remove
                </button>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Translations */}
      {primary.preferences?.translationsEnabled && primary.allergies.length > 0 && (
        <section className="mt-6">
          <h2 className="text-sm font-bold uppercase tracking-[0.14em] text-slate-500">Allergy Translations</h2>
          <Card className="mt-3 space-y-3">
            <div className="flex flex-wrap gap-2">
              {(Object.entries(LOCALE_LABELS) as [SupportedLocale, string][]).map(([code, label]) => (
                <button
                  key={code}
                  type="button"
                  className={`rounded-full border px-3 py-1.5 text-sm font-semibold ${
                    translationLocale === code
                      ? 'border-[color:var(--color-primary)] bg-[color:var(--color-primary-soft)] text-[color:var(--color-primary)]'
                      : 'border-slate-200 bg-white text-slate-700'
                  }`}
                  onClick={() => setTranslationLocale(code)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {primary.allergies.map((a) => (
                <span
                  key={a.name}
                  className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                >
                  <span className="mr-1">{a.image}</span>
                  <span className="font-semibold text-slate-900">{translateAllergen(a.name, translationLocale)}</span>
                  <span className="ml-1 text-xs text-slate-500">({a.name})</span>
                </span>
              ))}
            </div>
          </Card>
        </section>
      )}

      {/* Enable translations prompt */}
      {!primary.preferences?.translationsEnabled && (
        <section className="mt-6">
          <Card className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-slate-900">🌐 Allergy Translations</p>
              <p className="mt-0.5 text-xs text-slate-600">Show your allergens in 6 languages</p>
            </div>
            <Link href={`/profile/${primary.id}`} className="shrink-0">
              <Button variant="secondary" className="!min-h-9 !px-3 text-xs">Enable</Button>
            </Link>
          </Card>
        </section>
      )}

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </div>
  )
}
