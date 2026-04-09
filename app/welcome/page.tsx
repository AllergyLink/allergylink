'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'

const VENUE_BADGES = [
  'Restaurants',
  'Schools',
  'Camps',
  'Airlines',
  'Hotels',
  'Workplace',
  'Events',
  'Hospitals',
]

const RIGHT_CALLOUTS = [
  'Share Profile',
  'QR Code',
  'Family Profiles',
  'Minor Protection',
  'Trusted Venues',
  'Favorites',
  'Promotions',
  'Translations',
  'Edit Profile',
]

export default function WelcomePage() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-[#D8F0FF] via-white to-white">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <header className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Image
              src="/allergylink-logo.png"
              alt="AllergyLink"
              width={1024}
              height={524}
              priority
              className="h-10 w-auto object-contain"
            />
            <p className="hidden text-sm text-slate-600 sm:block">
              Instantly share your allergy &amp; dietary profile—anywhere you go.
            </p>
          </div>
        </header>

        <main className="mt-10 grid items-center gap-10 md:grid-cols-2">
          <section className="space-y-6">
            <h1 className="text-balance text-4xl font-bold tracking-tight text-slate-950 sm:text-5xl">
              Instantly share your allergy &amp; dietary profile—anywhere you go.
            </h1>
            <p className="text-lg leading-relaxed text-slate-700">
              No registration. No credit card. Nothing but safe eating out.
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link href="/auth" className="block">
                <Button className="w-full sm:w-auto">Get Started</Button>
              </Link>
              <a href="#how" className="block">
                <Button variant="secondary" className="w-full sm:w-auto">
                  How it Works
                </Button>
              </a>
            </div>
          </section>

          <section className="relative mx-auto w-full max-w-lg">
            {/* Left card + venue badges */}
            <div className="relative">
              <Card className="relative z-20 w-[92%] max-w-sm p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Profile preview
                </p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-slate-200" aria-hidden />
                  <div>
                    <p className="font-semibold text-slate-900">Madeline</p>
                    <p className="text-sm text-slate-600">Peanuts 🥜 · Shellfish 🦐 · Gluten 🌾</p>
                  </div>
                </div>
                <div className="mt-4 rounded-xl bg-slate-50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Notes
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    Cross-contamination: <span className="font-semibold text-rose-700">NO</span>
                  </p>
                </div>
              </Card>

              {/* Dashed connectors + circular badges */}
              <div className="pointer-events-none absolute -inset-6 z-10 hidden md:block">
                <div className="absolute left-[-6px] top-[18px] h-[360px] w-[360px] rounded-full border border-dashed border-slate-300/70" />
                {VENUE_BADGES.map((b, i) => (
                  <div
                    key={b}
                    className="absolute rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm"
                    style={{
                      left: `${10 + (i % 2) * 260}px`,
                      top: `${18 + i * 42}px`,
                    }}
                  >
                    {b}
                  </div>
                ))}
              </div>

              {/* Right overlapping card + callouts */}
              <Card className="absolute right-0 top-10 z-10 w-[82%] max-w-sm p-5">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-500">
                  Dashboard preview
                </p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {RIGHT_CALLOUTS.map((c) => (
                    <div
                      key={c}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700"
                    >
                      {c}
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>
        </main>

        <section id="how" className="mt-16">
          <h2 className="text-2xl font-bold text-slate-950">How it works</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card>
              <p className="text-sm font-semibold text-slate-900">1) Create</p>
              <p className="mt-2 text-sm text-slate-600">
                Create your AllergyLink in seconds. No app. No password.
              </p>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-slate-900">2) Share</p>
              <p className="mt-2 text-sm text-slate-600">
                Share your Allergy ID with restaurants, schools, or caregivers.
              </p>
            </Card>
            <Card>
              <p className="text-sm font-semibold text-slate-900">3) Eat Safe</p>
              <p className="mt-2 text-sm text-slate-600">
                They see exactly what to avoid. You dine confidently.
              </p>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

