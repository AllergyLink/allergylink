import { Outlet, useLocation } from 'react-router-dom'
import { BottomNav } from '../components/BottomNav'

export function AppLayout() {
  const { pathname } = useLocation()
  const showBottomNav = pathname !== '/'
  return (
    <div className="min-h-dvh flex flex-col">
      <main className={`mx-auto w-full flex-1 px-4 ${showBottomNav ? 'pt-4 pb-24 max-w-lg' : 'p-0 max-w-none'}`}>
        <Outlet />
      </main>
      {showBottomNav ? <BottomNav /> : null}
    </div>
  )
}
