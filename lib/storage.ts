/**
 * lib/storage.ts
 * Supabase-backed data layer.  Mirrors the old localStorage API so existing
 * call-sites keep working with minimal changes.
 */

import { supabase, rowToProfile, rowToShareSession, profileToRow } from './supabase'
import type { Profile, ShareSession } from './types'

// ─── ID generation ────────────────────────────────────────────────────────────

export function newId(): string {
  const n = Math.floor(10000000 + Math.random() * 90000000)
  return `ALY-${n}`
}

// ─── Auth helpers ─────────────────────────────────────────────────────────────

export async function getCurrentUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getUser()
  return data.user?.id ?? null
}

// ─── Profiles ─────────────────────────────────────────────────────────────────

/** Fetch all profiles belonging to the signed-in user */
export async function listProfiles(): Promise<Profile[]> {
  const { data: rows, error } = await supabase
    .from('profiles')
    .select('*, guardians(*)')
    .order('created_at', { ascending: true })

  if (error) {
    console.error('listProfiles error', error)
    return []
  }

  return (rows ?? []).map((row) => rowToProfile(row, row.guardians ?? []))
}

/** Fetch a single profile by its UUID */
export async function getProfile(id: string): Promise<Profile | undefined> {
  const { data: row, error } = await supabase
    .from('profiles')
    .select('*, guardians(*)')
    .eq('id', id)
    .single()

  if (error || !row) return undefined
  return rowToProfile(row, row.guardians ?? [])
}

/** Fetch a profile by its public Allergy Link ID (e.g. "ALY-12345678") — no auth required */
export async function getProfileByAllergyLinkId(allergyLinkId: string): Promise<Profile | undefined> {
  const { data: row, error } = await supabase
    .from('profiles')
    .select('*, guardians(*)')
    .eq('allergy_link_id', allergyLinkId)
    .single()

  if (error || !row) return undefined
  return rowToProfile(row, row.guardians ?? [])
}

/** Insert or update a profile */
export async function upsertProfile(profile: Profile): Promise<Profile | null> {
  const row = profileToRow(profile)

  const { data, error } = await supabase
    .from('profiles')
    .upsert(row, { onConflict: 'id' })
    .select('*, guardians(*)')
    .single()

  if (error || !data) {
    console.error('upsertProfile error', error)
    return null
  }

  return rowToProfile(data, data.guardians ?? [])
}

/** Delete a profile */
export async function deleteProfile(id: string): Promise<boolean> {
  const { error } = await supabase.from('profiles').delete().eq('id', id)
  if (error) {
    console.error('deleteProfile error', error)
    return false
  }
  return true
}

// ─── Share Sessions ───────────────────────────────────────────────────────────

/** Log a share event */
export async function addShareSession(
  profileId: string,
  method: ShareSession['method'],
  venueName?: string,
  venueType?: string,
): Promise<ShareSession | null> {
  const { data, error } = await supabase
    .from('share_sessions')
    .insert({ profile_id: profileId, method, venue_name: venueName ?? null, venue_type: venueType ?? null, approved: true })
    .select()
    .single()

  if (error || !data) {
    console.error('addShareSession error', error)
    return null
  }

  return rowToShareSession(data)
}

/** Fetch share history for a profile */
export async function listShareSessions(profileId: string): Promise<ShareSession[]> {
  const { data: rows, error } = await supabase
    .from('share_sessions')
    .select('*')
    .eq('profile_id', profileId)
    .order('shared_at', { ascending: false })

  if (error) {
    console.error('listShareSessions error', error)
    return []
  }

  return (rows ?? []).map(rowToShareSession)
}

// ─── Legacy localStorage shim (used during transition) ───────────────────────
// These stubs prevent import errors in files that haven't been updated yet.

export function load() {
  console.warn('load() is deprecated — use listProfiles() instead')
  return { profiles: {}, shared: [] }
}

export function save() {
  console.warn('save() is deprecated — use upsertProfile() instead')
}
