'use client'

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import type { AppState, Guardian, Profile, ShareMethod, ShareSession, User, UUID } from '@/lib/types'
import { loadState, saveState } from '@/lib/store/storage'
import { newAllergyLinkId, uuid } from '@/lib/store/ids'
import { buildAllergies } from '@/lib/store/allergens'

type Ctx = {
  state: AppState
  signInVerified: (phoneNumber: string, firstName: string) => UUID
  signOut: () => void
  createProfileDraft: (userId: UUID, name: string) => Profile
  upsertProfile: (p: Profile) => void
  createGuardian: (profileId: UUID, g: Omit<Guardian, 'id' | 'profileId' | 'verified'>) => Guardian
  verifyGuardian: (profileId: UUID, guardianId: UUID, code: string) => boolean
  createShareSession: (profileId: UUID, method: ShareMethod) => ShareSession
  setShareApproved: (shareId: UUID, approved: boolean) => void
  approveMinor: (minorProfileId: UUID, guardianId: UUID) => void
}

const AppContext = createContext<Ctx | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState())

  const commit = useCallback((next: AppState) => {
    setState(next)
    saveState(next)
  }, [])

  const signInVerified = useCallback(
    (phoneNumber: string, firstName: string) => {
      const existing = Object.values(state.users).find((u) => u.phoneNumber === phoneNumber)
      const user: User =
        existing ?? {
          id: uuid(),
          phoneNumber,
          firstName,
        }
      commit({
        ...state,
        users: { ...state.users, [user.id]: user },
        session: { userId: user.id, verified: true },
      })
      return user.id
    },
    [state, commit],
  )

  const signOut = useCallback(() => {
    const { session: _session, ...rest } = state
    commit(rest)
  }, [state, commit])

  const createProfileDraft = useCallback((userId: UUID, name: string): Profile => {
    const now = new Date().toISOString()
    return {
      id: uuid(),
      userId,
      type: 'primary',
      isMinor: false,
      name,
      avatar: {
        hairLength: 'Medium',
        hairColor: 'Brown',
        glasses: 'None',
        skinTone: 'Medium',
      },
      photoDataUrl: undefined,
      allergies: buildAllergies(),
      dietaryRestrictions: [],
      dietaryCustom: undefined,
      emergencyContact: {},
      guardians: [],
      preferences: {
        promotionsDigital: false,
        promotionsSampleBox: false,
        translationsEnabled: false,
      },
      allergyLinkId: newAllergyLinkId(),
      createdAt: now,
      updatedAt: now,
    }
  }, [])

  const upsertProfile = useCallback(
    (p: Profile) => {
      commit({
        ...state,
        profiles: { ...state.profiles, [p.id]: { ...p, updatedAt: new Date().toISOString() } },
      })
    },
    [state, commit],
  )

  const createGuardian = useCallback(
    (profileId: UUID, g: Omit<Guardian, 'id' | 'profileId' | 'verified'>): Guardian => {
      const profile = state.profiles[profileId]
      if (!profile) throw new Error('Profile not found')
      const guardian: Guardian = {
        id: uuid(),
        profileId,
        name: g.name,
        phoneNumber: g.phoneNumber,
        relationship: g.relationship,
        isPrimary: g.isPrimary,
        verified: false,
      }
      upsertProfile({ ...profile, guardians: [...profile.guardians, guardian] })
      return guardian
    },
    [state.profiles, upsertProfile],
  )

  const verifyGuardian = useCallback(
    (profileId: UUID, guardianId: UUID, code: string) => {
      if (code.trim() !== '123456') return false
      const profile = state.profiles[profileId]
      if (!profile) return false
      upsertProfile({
        ...profile,
        guardians: profile.guardians.map((g) => (g.id === guardianId ? { ...g, verified: true } : g)),
      })
      return true
    },
    [state.profiles, upsertProfile],
  )

  const createShareSession = useCallback(
    (profileId: UUID, method: ShareMethod): ShareSession => {
      const s: ShareSession = {
        id: uuid(),
        profileId,
        method,
        approved: false,
        timestamp: new Date().toISOString(),
      }
      commit({ ...state, shareSessions: { ...state.shareSessions, [s.id]: s } })
      return s
    },
    [state, commit],
  )

  const setShareApproved = useCallback(
    (shareId: UUID, approved: boolean) => {
      const s = state.shareSessions[shareId]
      if (!s) return
      commit({ ...state, shareSessions: { ...state.shareSessions, [shareId]: { ...s, approved } } })
    },
    [state, commit],
  )

  const approveMinor = useCallback(
    (minorProfileId: UUID, guardianId: UUID) => {
      commit({
        ...state,
        minorApprovals: {
          ...state.minorApprovals,
          [minorProfileId]: { approvedByGuardianId: guardianId, approvedAt: new Date().toISOString() },
        },
      })
    },
    [state, commit],
  )

  const value = useMemo(
    () => ({
      state,
      signInVerified,
      signOut,
      createProfileDraft,
      upsertProfile,
      createGuardian,
      verifyGuardian,
      createShareSession,
      setShareApproved,
      approveMinor,
    }),
    [
      state,
      signInVerified,
      signOut,
      createProfileDraft,
      upsertProfile,
      createGuardian,
      verifyGuardian,
      createShareSession,
      setShareApproved,
      approveMinor,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}

