import { NavLink } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `flex min-h-12 min-w-[44px] flex-1 flex-col items-center justify-center gap-0.5 text-xs font-medium ${
    isActive ? 'text-teal-700' : 'text-slate-500'
  }`

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-200 bg-white/95 pb-[env(safe-area-inset-bottom)] backdrop-blur"
      aria-label="Main"
    >
      <div className="mx-auto flex max-w-lg">
        <NavLink to="/" end className={linkClass}>
          <span className="text-lg" aria-hidden>
            ⌂
          </span>
          Home
        </NavLink>
        <NavLink to="/profile" className={linkClass}>
          <span className="text-lg" aria-hidden>
            ◎
          </span>
          Profile
        </NavLink>
        <NavLink to="/shared" className={linkClass}>
          <span className="text-lg" aria-hidden>
            ↗
          </span>
          Shared
        </NavLink>
        <NavLink to="/family" className={linkClass}>
          <span className="text-lg" aria-hidden>
            👨‍👩‍👧
          </span>
          Family
        </NavLink>
      </div>
    </nav>
  )
}
