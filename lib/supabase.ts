import { createClient } from '@supabase/supabase-js'
import type { Profile, Guardian, ShareSession } from './types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// ─── Database row types (snake_case, as stored in Postgres) ───────────────────

export type ProfileRow = {
  id: string
  user_id: string
  type: string
  is_minor: boolean
  name: string
  avatar: Profile['avatar'] | null
  photo_url: string | null
  allergies: Profile['allergies']
  dietary_restrictions: Profile['dietaryRestrictions']
  dietary_custom: string | null
  emergency_contact: Profile['emergencyContact'] | null
  preferences: Profile['preferences']
  allergy_link_id: string
  created_at: string
  updated_at: string
}

export type GuardianRow = {
  id: string
  profile_id: string
  name: string
  phone_number: string
  relationship: string
  is_primary: boolean
  verified: boolean
  created_at: string
}

export type ShareSessionRow = {
  id: string
  profile_id: string
  method: string
  venue_name: string | null
  venue_type: string | null
  approved: boolean
  shared_at: string
}

// ─── Row ↔ Type converters ────────────────────────────────────────────────────

export function rowToProfile(row: ProfileRow, guardians: GuardianRow[] = []): Profile {
  return {
    id: row.id,
    userId: row.user_id,
    type: row.type as Profile['type'],
    isMinor: row.is_minor,
    name: row.name,
    avatar: row.avatar ?? undefined,
    photoDataUrl: row.photo_url ?? undefined,
    allergies: row.allergies,
    dietaryRestrictions: row.dietary_restrictions,
    dietaryCustom: row.dietary_custom ?? undefined,
    emergencyContact: row.emergency_contact ?? undefined,
    guardians: guardians.map(rowToGuardian),
    preferences: row.preferences,
    allergyLinkId: row.allergy_link_id,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }
}

export function profileToRow(p: Profile): Omit<ProfileRow, 'created_at' | 'updated_at'> {
  return {
    id: p.id,
    user_id: p.userId,
    type: p.type,
    is_minor: p.isMinor,
    name: p.name,
    avatar: p.avatar ?? null,
    photo_url: p.photoDataUrl ?? null,
    allergies: p.allergies,
    dietary_restrictions: p.dietaryRestrictions,
    dietary_custom: p.dietaryCustom ?? null,
    emergency_contact: p.emergencyContact ?? null,
    preferences: p.preferences,
    allergy_link_id: p.allergyLinkId,
  }
}

export function rowToGuardian(row: GuardianRow): Guardian {
  return {
    id: row.id,
    profileId: row.profile_id,
    name: row.name,
    phoneNumber: row.phone_number,
    relationship: row.relationship,
    isPrimary: row.is_primary,
    verified: row.verified,
  }
}

export function rowToShareSession(row: ShareSessionRow): ShareSession {
  return {
    id: row.id,
    profileId: row.profile_id,
    method: row.method as ShareSession['method'],
    approved: row.approved,
    timestamp: row.shared_at,
  }
}
