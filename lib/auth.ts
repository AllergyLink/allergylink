/**
 * lib/auth.ts
 * Email + password auth helpers via Supabase.
 */
import { supabase } from './supabase'

/** Sign in with email + password. Returns error string or null. */
export async function signInWithEmail(email: string, password: string): Promise<string | null> {
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return error.message
  return null
}

/** Sign up with email + password. Returns error string or null. */
export async function signUpWithEmail(email: string, password: string): Promise<string | null> {
  const { error } = await supabase.auth.signUp({ email, password })
  if (error) return error.message
  return null
}

/** Sign out. */
export async function signOut(): Promise<void> {
  await supabase.auth.signOut()
}
