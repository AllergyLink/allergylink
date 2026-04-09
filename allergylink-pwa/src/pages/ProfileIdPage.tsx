import type { ReactNode } from 'react'
import QRCode from 'react-qr-code'
import { Link, Navigate, useParams } from 'react-router-dom'
import { useAllergyLink } from '../hooks/useAllergyLink'
import { Button } from '../components/ui/Button'

function SecondarySection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm">
      <h2 className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-slate-500">
        {title}
      </h2>
      <div className="text-sm leading-relaxed text-slate-600">{children}</div>
    </section>
  )
}

function SecondaryItems({ items }: { items: string[] }) {
  if (!items.length) {
    return <p className="text-slate-400">None listed</p>
  }
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="rounded-lg border border-slate-100 bg-slate-50/80 px-3 py-2 text-sm font-medium text-slate-800"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export function ProfileIdPage() {
  const { id } = useParams()
  const { profiles, setActiveProfileId } = useAllergyLink()
  if (id === 'new') return <Navigate to="/profile/new" replace />
  const p = profiles.find((x) => x.id === id)

  const shareUrl =
    typeof window !== 'undefined' && id ? `${window.location.origin}/view/${id}` : ''

  if (!p) {
    return (
      <div className="space-y-4">
        <p className="text-slate-600">Profile not found.</p>
        <Link to="/profile/new" className="font-medium text-teal-800">
          Create a profile
        </Link>
      </div>
    )
  }

  const compact = p.preferredDisplayFormat === 'compact'

  return (
    <div className="space-y-8 pb-10">
      {/* 1. Name — standalone block, fast read */}
      <header className="flex items-start justify-between gap-4 border-b border-slate-200/80 pb-8">
        <div className="min-w-0 flex-1 space-y-4">
          <h1 className="text-balance text-[2rem] font-bold leading-[1.12] tracking-tight text-slate-950 sm:text-[2.5rem] sm:leading-[1.1]">
            {p.firstName} {p.lastName}
          </h1>
          <p className="font-mono text-[13px] font-medium tracking-wide text-slate-500">{p.allergyId}</p>
        </div>
        <Link to={`/profile/${p.id}/edit`} className="shrink-0 pt-0.5">
          <Button variant="secondary" className="!min-h-10 !px-3 text-xs">
            Edit
          </Button>
        </Link>
      </header>

      {/* 2–3. ALLERGY ALERT + primary allergies (highest contrast) */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/90 shadow-md">
        <div className="border-b border-amber-200/80 bg-amber-100 px-5 py-4 text-center">
          <p className="text-sm font-bold tracking-[0.18em] text-amber-950">ALLERGY ALERT</p>
        </div>
        <div className="bg-white px-5 py-7">
          {p.allergies.length > 0 ? (
            <ul className="flex flex-col gap-3">
              {p.allergies.map((a) => (
                <li
                  key={a}
                  className="rounded-xl border-2 border-rose-500 bg-rose-50 px-4 py-4 text-center text-xl font-bold leading-tight text-rose-950 shadow-sm sm:text-2xl"
                >
                  {a}
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-5 text-center text-sm text-slate-500">
              No allergens on file — tap <strong className="font-semibold text-slate-700">Edit</strong>{' '}
              to add.
            </p>
          )}
        </div>
      </div>

      {/* 4. Secondary — smaller typography, clearly labeled */}
      <div className="space-y-3.5">
        {!compact ? (
          <>
            <SecondarySection title="Dietary restrictions">
              <SecondaryItems items={p.dietaryRestrictions} />
            </SecondarySection>
            <SecondarySection title="Intolerances">
              <SecondaryItems items={p.intolerances} />
            </SecondarySection>
            <SecondarySection title="Sensitivities">
              <SecondaryItems items={p.sensitivities} />
            </SecondarySection>
          </>
        ) : (
          <SecondarySection title="Dietary notes">
            <SecondaryItems
              items={[...p.dietaryRestrictions, ...p.intolerances, ...p.sensitivities]}
            />
          </SecondarySection>
        )}
      </div>

      {/* 5. Emergency Contact */}
      <section className="rounded-2xl border border-slate-200 bg-slate-50 px-5 py-7 shadow-sm">
        <h2 className="mb-6 text-sm font-bold tracking-tight text-slate-800">Emergency Contact</h2>
        <p className="text-[1.35rem] font-semibold leading-snug text-slate-900">{p.emergencyContact.name}</p>
        <p className="mt-4 text-[1.65rem] font-semibold tabular-nums leading-none text-slate-900">
          <a href={`tel:${p.emergencyContact.phone.replace(/\s/g, '')}`} className="text-inherit">
            {p.emergencyContact.phone}
          </a>
        </p>
        {p.emergencyContact.relationship ? (
          <p className="mt-3 text-sm text-slate-600">{p.emergencyContact.relationship}</p>
        ) : null}
        {p.medicationsNotes ? (
          <div className="mt-5 border-t border-slate-200 pt-5">
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">
              Medications and notes
            </p>
            <p className="mt-2 text-sm leading-relaxed text-slate-800">{p.medicationsNotes}</p>
          </div>
        ) : null}
      </section>

      {p.managedByProfileId ? (
        <p className="text-center text-xs text-slate-500">
          Managed profile ·{' '}
          {p.canShareIndependently ? 'Can share independently' : 'Shared via caregiver only'}
        </p>
      ) : null}

      {/* 6. QR — lower on screen */}
      <section className="rounded-2xl border border-slate-200 bg-white px-5 py-9 text-center shadow-md">
        <p className="text-base font-semibold text-slate-800">Scan for full profile</p>
        <div className="mx-auto mt-7 inline-block rounded-xl bg-white p-4 shadow-inner ring-1 ring-slate-100">
          <QRCode
            value={shareUrl}
            size={176}
            level="M"
            fgColor="#0f172a"
            bgColor="#ffffff"
            title={`QR for ${p.allergyId}`}
          />
        </div>
        <button
          type="button"
          className="mt-5 text-sm font-medium text-slate-700 underline-offset-2 hover:text-slate-900 hover:underline"
          onClick={() => {
            void navigator.clipboard?.writeText(p.allergyId)
          }}
        >
          Copy Allergy ID
        </button>
      </section>

      <div className="flex flex-col gap-2 border-t border-slate-100 pt-6">
        <Link to="/shared/new" state={{ profileId: p.id }} className="text-center text-sm font-medium text-teal-800">
          Log a share
        </Link>
        <button
          type="button"
          className="text-center text-sm text-slate-600"
          onClick={() => setActiveProfileId(p.id)}
        >
          Use as active profile
        </button>
      </div>
    </div>
  )
}
