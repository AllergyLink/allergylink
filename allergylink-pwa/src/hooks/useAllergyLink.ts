import { useContext } from 'react'
import { AllergyLinkContext } from '../context/allergyLinkContext'

export function useAllergyLink() {
  const ctx = useContext(AllergyLinkContext)
  if (!ctx) throw new Error('useAllergyLink must be used within AllergyLinkProvider')
  return ctx
}
