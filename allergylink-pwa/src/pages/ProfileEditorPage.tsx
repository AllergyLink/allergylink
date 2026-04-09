import { useMemo } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useAllergyLink } from '../hooks/useAllergyLink'
import { createEmptyProfile } from '../lib/createProfile'
import { ProfileForm } from '../components/ProfileForm'

export function ProfileEditorPage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { profiles, saveProfile, activeProfileId, setActiveProfileId } = useAllergyLink()

  const dependent = searchParams.get('dependent') === '1'
  const managedBy = searchParams.get('managedBy') || activeProfileId || undefined

  const existing = useMemo(() => profiles.find((p) => p.id === id), [profiles, id])
  const initial = useMemo(() => {
    if (id && existing) return existing
    return createEmptyProfile({
      managedByProfileId: dependent ? managedBy ?? null : null,
      canShareIndependently: !dependent,
    })
  }, [id, existing, dependent, managedBy])

  const isEdit = Boolean(id && existing)

  return (
    <ProfileForm
      title={isEdit ? 'Edit profile' : 'Create profile'}
      submitLabel={isEdit ? 'Save changes' : 'Create profile'}
      showAllergenGrid={!isEdit}
      initial={initial}
      onSubmit={(p) => {
        saveProfile(p)
        setActiveProfileId(p.id)
        navigate(`/profile/${p.id}`)
      }}
      onCancel={() => navigate(-1)}
    />
  )
}
