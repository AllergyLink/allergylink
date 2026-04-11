import type { AppState } from '@/lib/types'

const KEY = 'allergylink_pwa_v2'

const seed: AppState = {
  users: {},
  profiles: {},
  shareSessions: {},
  minorApprovals: {},
  favoriteVenues: [],
}

export function loadState(): AppState {
  if (typeof window === 'undefined') return seed
  try {
    const raw = window.localStorage.getItem(KEY)
    if (!raw) return seed
    return JSON.parse(raw) as AppState
  } catch {
    return seed
  }
}

export function saveState(state: AppState) {
  if (typeof window === 'undefined') return
  window.localStorage.setItem(KEY, JSON.stringify(state))
}

export function clearState() {
  if (typeof window === 'undefined') return
  window.localStorage.removeItem(KEY)
}

