import { Navigate } from 'react-router-dom'
import { useAllergyLink } from '../hooks/useAllergyLink'

/** Bottom nav "Profile" target: open active ID card or prompt to create */
export function ProfileTabPage() {
  const { profiles, activeProfileId } = useAllergyLink()
  const active = profiles.find((p) => p.id === activeProfileId) ?? profiles[0]
  if (active) return <Navigate to={`/profile/${active.id}`} replace />
  return <Navigate to="/profile/new" replace />
}
