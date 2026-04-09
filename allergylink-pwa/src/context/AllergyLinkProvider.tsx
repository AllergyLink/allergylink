import { useCallback, useMemo, useState, type ReactNode } from 'react'
import { generateShareId } from '../lib/allergyId'
import { loadJson, saveJson } from '../lib/storage'
import type { Profile, Session, ShareRecord } from '../lib/types'
import { AllergyLinkContext } from './allergyLinkContext'

const defaultSession: Session = {
  displayName: '',
  email: undefined,
  isAuthenticated: false,
}

function loadInitial(): {
  session: Session
  profiles: Profile[]
  shares: ShareRecord[]
  activeProfileId: string | null
} {
  return {
    session: loadJson('session', defaultSession),
    profiles: loadJson('profiles', [] as Profile[]),
    shares: loadJson('shares', [] as ShareRecord[]),
    activeProfileId: loadJson('activeProfile', null as string | null),
  }
}

export function AllergyLinkProvider({ children }: { children: ReactNode }) {
  const initial = useMemo(() => loadInitial(), [])
  const [session, setSession] = useState<Session>(initial.session)
  const [profiles, setProfiles] = useState<Profile[]>(initial.profiles)
  const [shares, setShares] = useState<ShareRecord[]>(initial.shares)
  const [activeProfileId, setActiveProfileIdState] = useState<string | null>(
    initial.activeProfileId,
  )

  const persistSession = useCallback((s: Session) => {
    setSession(s)
    saveJson('session', s)
  }, [])

  const persistProfiles = useCallback((list: Profile[]) => {
    setProfiles(list)
    saveJson('profiles', list)
  }, [])

  const persistShares = useCallback((list: ShareRecord[]) => {
    setShares(list)
    saveJson('shares', list)
  }, [])

  const setActiveProfileId = useCallback((id: string | null) => {
    setActiveProfileIdState(id)
    saveJson('activeProfile', id)
  }, [])

  const signIn = useCallback(
    (displayName: string, email?: string) => {
      persistSession({
        displayName: displayName.trim(),
        email: email?.trim() || undefined,
        isAuthenticated: true,
      })
    },
    [persistSession],
  )

  const signOut = useCallback(() => {
    persistSession(defaultSession)
  }, [persistSession])

  const saveProfile = useCallback(
    (profile: Profile) => {
      const idx = profiles.findIndex((p) => p.id === profile.id)
      const next =
        idx >= 0
          ? profiles.map((p) => (p.id === profile.id ? profile : p))
          : [...profiles, profile]
      persistProfiles(next)
      if (!activeProfileId) setActiveProfileId(profile.id)
    },
    [profiles, persistProfiles, activeProfileId, setActiveProfileId],
  )

  const deleteProfile = useCallback(
    (id: string) => {
      const without = profiles.filter((p) => p.id !== id)
      const nextProfiles = without.map((p) =>
        p.managedByProfileId === id ? { ...p, managedByProfileId: null } : p,
      )
      persistProfiles(nextProfiles)
      persistShares(shares.filter((s) => s.profileId !== id))
      if (activeProfileId === id) {
        setActiveProfileId(nextProfiles[0]?.id ?? null)
      }
    },
    [profiles, shares, persistProfiles, persistShares, activeProfileId, setActiveProfileId],
  )

  const addShare = useCallback(
    (row: Omit<ShareRecord, 'id'>): ShareRecord => {
      const rec: ShareRecord = { ...row, id: generateShareId() }
      persistShares([...shares, rec])
      return rec
    },
    [shares, persistShares],
  )

  const updateShare = useCallback(
    (id: string, patch: Partial<ShareRecord>) => {
      persistShares(shares.map((s) => (s.id === id ? { ...s, ...patch } : s)))
    },
    [shares, persistShares],
  )

  const removeShare = useCallback(
    (id: string) => {
      persistShares(shares.filter((s) => s.id !== id))
    },
    [shares, persistShares],
  )

  const value = useMemo(
    () => ({
      session,
      profiles,
      shares,
      activeProfileId,
      signIn,
      signOut,
      setActiveProfileId,
      saveProfile,
      deleteProfile,
      addShare,
      updateShare,
      removeShare,
    }),
    [
      session,
      profiles,
      shares,
      activeProfileId,
      signIn,
      signOut,
      setActiveProfileId,
      saveProfile,
      deleteProfile,
      addShare,
      updateShare,
      removeShare,
    ],
  )

  return (
    <AllergyLinkContext.Provider value={value}>{children}</AllergyLinkContext.Provider>
  )
}
