import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAllergyLink } from '../hooks/useAllergyLink'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

export function SignInPage() {
  const navigate = useNavigate()
  const { signIn } = useAllergyLink()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    signIn(name.trim(), email.trim() || undefined)
    navigate('/')
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Sign in (placeholder)</h1>
        <p className="mt-2 text-sm text-slate-600">
          We store your name on this device only. There is no password and no server—just a demo
          flow for now.
        </p>
      </div>

      <Card>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="n">
              Display name
            </label>
            <input
              id="n"
              required
              className="min-h-11 w-full rounded-xl border border-slate-200 px-3 text-base"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-800" htmlFor="e">
              Email (optional)
            </label>
            <input
              id="e"
              type="email"
              className="min-h-11 w-full rounded-xl border border-slate-200 px-3 text-base"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>
          <Button type="submit" className="w-full">
            Continue
          </Button>
        </form>
      </Card>

      <p className="text-center text-sm">
        <Link to="/" className="font-medium text-teal-800">
          Back to home
        </Link>
      </p>
    </div>
  )
}
