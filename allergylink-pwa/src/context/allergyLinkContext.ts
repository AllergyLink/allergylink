import { createContext } from 'react'
import type { Profile, Session, ShareRecord } from '../lib/types'

export type AllergyLinkContextValue = {
  session: Session
  profiles: Profile[]
  shares: ShareRecord[]
  activeProfileId: string | null
  signIn: (displayName: string, email?: string) => void
  signOut: () => void
  setActiveProfileId: (id: string | null) => void
  saveProfile: (profile: Profile) => void
  deleteProfile: (id: string) => void
  addShare: (share: Omit<ShareRecord, 'id'>) => ShareRecord
  updateShare: (id: string, patch: Partial<ShareRecord>) => void
  removeShare: (id: string) => void
}

export const AllergyLinkContext = createContext<AllergyLinkContextValue | null>(null)
