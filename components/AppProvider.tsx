'use client'

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import type { AppState, FavoriteVenue, Guardian, Profile, ShareMethod, ShareSession, User, UUID } from '@/lib/types'
import { loadState, saveState } from '@/lib/store/storage'
import { newAllergyLinkId, uuid } from '@/lib/store/ids'
import { buildAllergies } from '@/lib/store/allergens'
import { supabase } from '@/lib/supabase'
import {
  listProfiles,
  upsertProfile as supabaseUpsertProfile,
  addShareSession as supabaseAddShareSession,
} from '@/lib/storage'

type Ctx = {
  state: AppState
  signInVerified: (phoneNumber: string, firstName: string) => UUID
  signOut: () => void
  createProfileDraft: (userId: UUID, name: string, type?: Profile['type']) => Profile
  upsertProfile: (p: Profile) => void
  addFavoriteVenue: (v: Omit<FavoriteVenue, 'id' | 'savedAt'>) => void
  removeFavoriteVenue: (id: UUID) => void
  createGuardian: (profileId: UUID, g: Omit<Guardian, 'id' | 'profileId' | 'verified'>) => Guardian
  verifyGuardian: (profileId: UUID, guardianId: UUID, code: string) => boolean
  createShareSession: (profileId: UUID, method: ShareMethod) => ShareSession
  setShareApproved: (shareId: UUID, approved: boolean) => void
  approveMinor: (minorProfileId: UUID, guardianId: UUID) => void
}

const AppContext = createContext<Ctx | null>(null)

// Key used by the auth page to pass firstName into AppProvider
const FIRST_NAME_KEY = 'allergylink_pending_firstName'

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AppState>(() => loadState())

  const commit = useCallback((next: AppState) => {
    setState(next)
    saveState(next)
  }, [])

  // ── Load profiles from Supabase for a given userId ────────────────────────
  const syncProfilesFromSupabase = useCallback(async (_userId: string) => {
    const profiles = await listProfiles()
    setState((prev) => {
      const profileMap = Object.fromEntries(profiles.map((p) => [p.id, p]))
      const next = { ...prev, profiles: { ...prev.profiles, ...profileMap } }
      saveState(next)
      return next
    })
  }, [])

  // ── Sync Supabase auth session into AppState ──────────────────────────────
  useEffect(() => {
    // On mount, check for an existing Supabase session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        const userId = session.user.id
        const email = session.user.email ?? session.user.phone ?? ''
        const pendingFirstName = typeof window !== 'undefined'
          ? (localStorage.getItem(FIRST_NAME_KEY) ?? '')
          : ''

        setState((prev) => {
          const existing = prev.users[userId]
          const user: User = existing ?? { id: userId, phoneNumber: email, firstName: pendingFirstName }
          // If we have a pending firstName and user didn't have one, update it
          const updatedUser = (!existing?.firstName && pendingFirstName)
            ? { ...user, firstName: pendingFirstName }
            : user
          return {
            ...prev,
            users: { ...prev.users, [userId]: updatedUser },
            session: { userId, verified: true },
          }
        })

        // Clear the pending firstName after use
        if (typeof window !== 'undefined' && pendingFirstName) {
          localStorage.removeItem(FIRST_NAME_KEY)
        }

        // Fetch profiles from Supabase
        syncProfilesFromSupabase(userId)
      }
    })

    // Listen for future auth changes (sign-in, sign-out, token refresh)
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setState((prev) => {
        if (!session?.user) {
          // Signed out — clear session but keep profiles/users in local state
          const { session: _s, ...rest } = prev
          return rest
        }
        const userId = session.user.id
        const email = session.user.email ?? session.user.phone ?? ''
        const pendingFirstName = typeof window !== 'undefined'
          ? (localStorage.getItem(FIRST_NAME_KEY) ?? '')
          : ''
        const existing = prev.users[userId]
        const user: User = existing ?? { id: userId, phoneNumber: email, firstName: pendingFirstName }
        const updatedUser = (!existing?.firstName && pendingFirstName)
          ? { ...user, firstName: pendingFirstName }
          : user

        // Clear pending firstName
        if (typeof window !== 'undefined' && pendingFirstName) {
          localStorage.removeItem(FIRST_NAME_KEY)
        }

        return {
          ...prev,
          users: { ...prev.users, [userId]: updatedUser },
          session: { userId, verified: true },
        }
      })

      if (session?.user) {
        syncProfilesFromSupabase(session.user.id)
      }
    })

    return () => subscription.unsubscribe()
  }, [syncProfilesFromSupabase])

  const signInVerified = useCallback(
    (phoneNumber: string, firstName: string) => {
      // Legacy helper — still used by auth/page.tsx and anywhere OTP is verified locally
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

  const signOut = useCallback(async () => {
    await supabase.auth.signOut()
    const { session: _session, ...rest } = state
    commit(rest)
  }, [state, commit])

  const createProfileDraft = useCallback((userId: UUID, name: string, type: Profile['type'] = 'primary'): Profile => {
    const now = new Date().toISOString()
    return {
      id: uuid(),
      userId,
      type,
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
      const updated = { ...p, updatedAt: new Date().toISOString() }
      // Persist locally immediately
      commit({
        ...state,
        profiles: { ...state.profiles, [p.id]: updated },
      })
      // Persist to Supabase in background (fire-and-forget)
      supabaseUpsertProfile(updated).catch((err) =>
        console.error('Supabase upsertProfile failed', err),
      )
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
      // Persist to Supabase in background
      supabaseAddShareSession(profileId, method).catch((err) =>
        console.error('Supabase addShareSession failed', err),
      )
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

  const addFavoriteVenue = useCallback(
    (v: Omit<FavoriteVenue, 'id' | 'savedAt'>) => {
      const venue: FavoriteVenue = { ...v, id: uuid(), savedAt: new Date().toISOString() }
      commit({ ...state, favoriteVenues: [...(state.favoriteVenues ?? []), venue] })
    },
    [state, commit],
  )

  const removeFavoriteVenue = useCallback(
    (id: UUID) => {
      commit({ ...state, favoriteVenues: (state.favoriteVenues ?? []).filter((v) => v.id !== id) })
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
      addFavoriteVenue,
      removeFavoriteVenue,
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
      addFavoriteVenue,
      removeFavoriteVenue,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
