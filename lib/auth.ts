/**
 * lib/auth.ts
 * Helpers for Supabase phone OTP auth.
 */
import { supabase } from './supabase'

/** Convert a US phone number to E.164 format (+1XXXXXXXXXX) */
export function toE164(raw: string): string {
  const digits = raw.replace(/\D/g, '')
  if (digits.length === 10) return `+1${digits}`
  if (digits.length === 11 && digits.startsWith('1')) return `+${digits}`
  return `+${digits}` // pass through if already international
}

/**
 * Send a phone OTP via Supabase (creates user if new, signs in if existing).
 * Returns an error string on failure, null on success.
 */
export async function sendPhoneOtp(phone: string): Promise<string | null> {
  const { error } = await supabase.auth.signInWithOtp({ phone: toE164(phone) })
  if (error) return error.message
  return null
}

/**
 * Verify the OTP code.
 * Returns an error string on failure, null on success.
 */
export async function verifyPhoneOtp(phone: string, token: string): Promise<string | null> {
  const { error } = await supabase.auth.verifyOtp({
    phone: toE164(phone),
    token,
    type: 'sms',
  })
  if (error) return error.message
  return null
}
