import { Link } from 'react-router-dom'
import { useAllergyLink } from '../hooks/useAllergyLink'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
export function SettingsPage() {
  const { session, signOut } = useAllergyLink()

  const clearAll = () => {
    if (!confirm('Erase all AllergyLink data on this device?')) return
    localStorage.clear()
    window.location.reload()
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

      <Card className="space-y-2 text-sm text-slate-700">
        <p>
          <strong className="text-slate-900">Session:</strong>{' '}
          {session.isAuthenticated ? session.displayName : 'Not signed in'}
        </p>
        <p className="text-xs text-slate-500">
          Data stays in your browser. Clearing site data removes profiles and shares.
        </p>
      </Card>

      <div className="flex flex-col gap-3">
        {session.isAuthenticated ? (
          <Button
            type="button"
            variant="secondary"
            className="w-full"
            onClick={() => {
              signOut()
            }}
          >
            Sign out (placeholder)
          </Button>
        ) : (
          <Link to="/sign-in">
            <Button variant="secondary" className="w-full">
              Sign in (placeholder)
            </Button>
          </Link>
        )}

        <Button type="button" variant="ghost" className="w-full text-red-800" onClick={clearAll}>
          Clear all local data
        </Button>
      </div>

      <Card className="text-sm text-slate-600">
        <p className="font-semibold text-slate-900">About this build</p>
        <p className="mt-2">
          AllergyLink MVP — React, Vite, Tailwind, and local storage. Replace storage calls in{' '}
          <code className="rounded bg-slate-100 px-1 text-xs">src/lib/storage.ts</code> with API
          calls when your backend is ready.
        </p>
      </Card>

      <p className="text-center text-sm">
        <Link to="/" className="font-medium text-teal-800">
          Home
        </Link>
      </p>
    </div>
  )
}
