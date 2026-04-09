import { Link } from 'react-router-dom'
import { useAllergyLink } from '../hooks/useAllergyLink'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export function HomePage() {
  const { profiles, activeProfileId } = useAllergyLink()
  const active = profiles.find((p) => p.id === activeProfileId) ?? profiles[0]
  const hasProfile = profiles.length > 0

  const primaryTarget = hasProfile && active ? `/profile/${active.id}` : '/profile/new'
  const primaryLabel = hasProfile ? 'Open My Allergy ID' : 'Create My Allergy Profile'

  return (
    <div className="min-h-dvh bg-gradient-to-b from-[#D8F0FF] via-white to-white">
      {/* Fixed header */}
      <div className="fixed inset-x-0 top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <div className="flex items-center gap-3">
            <img
              src="/allergylink-logo.png"
              alt="AllergyLink"
              className="h-8 w-auto object-contain"
              width={1024}
              height={524}
              decoding="async"
            />
          </div>

          <nav className="hidden items-center gap-6 text-sm text-slate-700 md:flex" aria-label="Primary">
            <a href="#how" className="hover:text-slate-900">
              How It Works
            </a>
            <a href="#venues" className="hover:text-slate-900">
              For Restaurants
            </a>
            <a href="#faq" className="hover:text-slate-900">
              FAQ
            </a>
            <a href="#support" className="hover:text-slate-900">
              Support
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/profile">
              <Button variant="secondary" className="!min-h-10 !px-3 text-xs">
                Access Profile
              </Button>
            </Link>
            <Link to="/profile/new">
              <Button className="!min-h-10 !px-3 text-xs">Create Your Link</Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Hero */}
      <main className="mx-auto max-w-6xl px-4 pb-16 pt-24 md:pt-28">
        <section className="grid items-center gap-10 md:grid-cols-2">
          <div className="space-y-6">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-600">
              No registration. No credit card.
            </p>
            <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-slate-950 sm:text-5xl">
              All your allergies. One safe link.
            </h1>
            <p className="text-balance text-lg leading-relaxed text-slate-700">
              Share your dietary and allergy profile instantly — no downloads, no logins, no credit
              cards. Just safe eating anywhere.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link to={primaryTarget} className="block">
                <Button className="w-full sm:w-auto">{primaryLabel}</Button>
              </Link>
              <a
                href="#demo"
                className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
              >
                View Demo
              </a>
            </div>

            <Card className="border-slate-200/70 bg-white/70 shadow-sm">
              <p className="text-sm leading-relaxed text-slate-700">
                Your information stays on this device for now. You can update and share it anytime.
              </p>
            </Card>
          </div>

          {/* Right-side visuals (simple, calm, mobile-first) */}
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-full bg-[color:var(--al-milk)]/20 blur-2xl" />
            <div className="absolute -bottom-8 -right-10 h-28 w-28 rounded-full bg-[color:var(--al-sesame)]/20 blur-2xl" />

            <div className="relative space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Profile card
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200" aria-hidden />
                  <div className="min-w-0">
                    <p className="font-semibold text-slate-900">Madeline</p>
                    <p className="text-sm text-slate-600">Peanuts · Shellfish · Gluten</p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Your AllergyLink ID
                </p>
                <div className="mt-3 flex items-center justify-between gap-4">
                  <div>
                    <p className="font-mono text-lg font-bold tracking-wide text-slate-900">
                      ALY-1234ABCD
                    </p>
                    <p className="text-sm text-slate-600">Scan to view</p>
                  </div>
                  <div className="grid h-16 w-16 grid-cols-3 gap-1 rounded-lg bg-slate-100 p-2" aria-hidden>
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="rounded bg-slate-300/70" />
                    ))}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-md">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Shared with
                </p>
                <div className="mt-3 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-slate-900">Red Lantern — Boston</p>
                    <p className="text-sm text-slate-600">Nov 2025 · Safe visit recorded</p>
                  </div>
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800">
                    ✅ Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mt-16 rounded-3xl bg-white/70 p-6 shadow-sm ring-1 ring-slate-200/60 md:p-10">
          <h2 className="text-2xl font-bold text-slate-950">How it works</h2>
          <p className="mt-2 text-slate-700">Simple steps. Clear information. Safer outcomes.</p>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            <Card className="bg-white">
              <p className="text-sm font-semibold text-slate-900">1) Create</p>
              <p className="mt-2 text-sm text-slate-600">
                Make your AllergyLink in seconds. No app. No password.
              </p>
            </Card>
            <Card className="bg-white">
              <p className="text-sm font-semibold text-slate-900">2) Share</p>
              <p className="mt-2 text-sm text-slate-600">
                Show or send your unique Allergy ID to restaurants, schools, or caregivers.
              </p>
            </Card>
            <Card className="bg-white">
              <p className="text-sm font-semibold text-slate-900">3) Eat safe</p>
              <p className="mt-2 text-sm text-slate-600">
                They see exactly what to avoid. You dine confidently.
              </p>
            </Card>
          </div>
        </section>

        {/* Demo */}
        <section id="demo" className="mt-16">
          <h2 className="text-2xl font-bold text-slate-950">See how AllergyLink looks in action</h2>
          <p className="mt-2 text-slate-700">A quick preview of the key screens.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <p className="text-sm font-semibold text-slate-900">Create Profile</p>
              <p className="mt-2 text-sm text-slate-600">No registration required</p>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-slate-900">Allergy ID Card</p>
              <p className="mt-2 text-sm text-slate-600">Clear, safety-first layout</p>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-slate-900">Shared With</p>
              <p className="mt-2 text-sm text-slate-600">Track where you shared</p>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-slate-900">Family Profiles</p>
              <p className="mt-2 text-sm text-slate-600">Manage kids and dependents</p>
            </Card>
          </div>
        </section>

        {/* Venues */}
        <section id="venues" className="mt-16 rounded-3xl bg-gradient-to-br from-white to-[#D8F0FF] p-6 shadow-sm ring-1 ring-slate-200/60 md:p-10">
          <h2 className="text-2xl font-bold text-slate-950">For restaurants, schools, camps, and caterers</h2>
          <p className="mt-2 text-slate-700">Safer guests. Simpler compliance.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card className="bg-white">
              <p className="text-sm font-semibold text-slate-900">Works anywhere</p>
              <p className="mt-2 text-sm text-slate-600">
                Opens in any modern browser — no special equipment required.
              </p>
            </Card>
            <Card className="bg-white">
              <p className="text-sm font-semibold text-slate-900">Clear before ordering</p>
              <p className="mt-2 text-sm text-slate-600">
                See the exact allergy needs in seconds, with a layout designed for fast scanning.
              </p>
            </Card>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#support"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
            >
              Get your venue Allergy‑Enabled
            </a>
            <a
              href="#demo"
              className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50"
            >
              See demo for venues
            </a>
          </div>
        </section>

        {/* FAQ + Support + Footer */}
        <section id="faq" className="mt-16">
          <h2 className="text-2xl font-bold text-slate-950">FAQ</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Card>
              <p className="text-sm font-semibold text-slate-900">Do I need to download an app?</p>
              <p className="mt-2 text-sm text-slate-600">No. AllergyLink works in your browser.</p>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-slate-900">Do venues need an account?</p>
              <p className="mt-2 text-sm text-slate-600">No. They just scan your QR or use your ID.</p>
            </Card>
          </div>
        </section>

        <section id="support" className="mt-16 pb-16">
          <h2 className="text-2xl font-bold text-slate-950">Support</h2>
          <Card className="mt-6">
            <p className="text-sm text-slate-700">
              Questions? Email us at <span className="font-semibold">support@allergylink.com</span>
            </p>
          </Card>

          <footer className="mt-10 border-t border-slate-200/80 pt-8 text-sm text-slate-600">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p>AllergyLink — nothing to download, nothing to fear, everything to trust.</p>
              <p className="text-slate-500">© {new Date().getFullYear()} AllergyLink</p>
            </div>
          </footer>
        </section>
      </main>
    </div>
  )
}
