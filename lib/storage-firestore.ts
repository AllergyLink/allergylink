/**
 * Firestore-based storage layer
 * This replaces the localStorage-based storage.ts
 * 
 * Usage: Import functions from this file instead of storage.ts
 */

import {
  upsertProfile as firestoreUpsertProfile,
  getProfile as firestoreGetProfile,
  getPrimaryProfile,
  listProfiles as firestoreListProfiles,
  deleteProfile as firestoreDeleteProfile,
  addShared as firestoreAddShared,
  listShared as firestoreListShared,
  getSettings as firestoreGetSettings,
  updateSettings as firestoreUpdateSettings,
  newId as firestoreNewId,
  isFirestoreAvailable,
} from './firebase/storage';
import { getCurrentUser } from './firebase/auth';
import type { Profile, SharedEntry } from './models';

// Fallback to localStorage if Firestore is not available
import { load, upsertProfile as localUpsertProfile, newId as localNewId } from './storage';

/**
 * Get current user ID
 */
function getUserId(): string | null {
  const user = getCurrentUser();
  return user?.uid || null;
}

/**
 * Upsert profile (uses Firestore if available, falls back to localStorage)
 */
export async function upsertProfile(profile: Profile): Promise<void> {
  if (isFirestoreAvailable()) {
    const userId = getUserId();
    if (userId) {
      await firestoreUpsertProfile({ ...profile, userId });
      return;
    }
  }
  
  // Fallback to localStorage
  localUpsertProfile(profile);
}

/**
 * Get profile by ID
 */
export async function getProfile(id?: string): Promise<Profile | undefined> {
  if (isFirestoreAvailable()) {
    if (id) {
      return (await firestoreGetProfile(id)) || undefined;
    }
    
    // Get primary profile for current user
    const userId = getUserId();
    if (userId) {
      return (await getPrimaryProfile(userId)) || undefined;
    }
  }
  
  // Fallback to localStorage
  const localData = load();
  if (id) {
    return localData.profiles[id];
  }
  return localData.primaryId ? localData.profiles[localData.primaryId] : undefined;
}

/**
 * List profiles
 */
export async function listProfiles(familyOnly: boolean = false): Promise<Profile[]> {
  if (isFirestoreAvailable()) {
    const userId = getUserId();
    if (userId) {
      return await firestoreListProfiles(userId, familyOnly);
    }
  }
  
  // Fallback to localStorage
  const localData = load();
  const all = Object.values(localData.profiles);
  if (familyOnly) {
    return all.filter(p => p.familyOf);
  }
  return all;
}

/**
 * Delete profile
 */
export async function deleteProfile(id: string): Promise<void> {
  if (isFirestoreAvailable()) {
    await firestoreDeleteProfile(id);
    return;
  }
  
  // Fallback: localStorage doesn't have delete, but we can clear it
  console.warn('Delete not implemented for localStorage');
}

/**
 * Add shared entry
 */
export async function addShared(entry: SharedEntry): Promise<void> {
  if (isFirestoreAvailable()) {
    const userId = getUserId();
    if (userId) {
      await firestoreAddShared(userId, entry);
      return;
    }
  }
  
  // Fallback to localStorage
  const localData = load();
  localData.shared = [entry, ...localData.shared];
  // Note: localStorage save would need to be implemented
  console.warn('Shared entry added to local state but not persisted');
}

/**
 * List shared entries
 */
export async function listShared(): Promise<SharedEntry[]> {
  if (isFirestoreAvailable()) {
    const userId = getUserId();
    if (userId) {
      return await firestoreListShared(userId);
    }
  }
  
  // Fallback to localStorage
  const localData = load();
  return localData.shared || [];
}

/**
 * Generate new ID
 */
export function newId(): string {
  return firestoreNewId();
}

/**
 * Get user settings
 */
export async function getSettings() {
  if (isFirestoreAvailable()) {
    const userId = getUserId();
    if (userId) {
      return await firestoreGetSettings(userId);
    }
  }
  
  // Return default settings
  return {
    nameVisible: true,
    theme: 'light' as const,
    liveUpdates: true,
    favoriteVenues: [],
  };
}

/**
 * Update user settings
 */
export async function updateSettings(settings: Partial<{
  nameVisible: boolean;
  theme: 'light' | 'mint';
  phone: string;
  liveUpdates: boolean;
  favoriteVenues: string[];
}>): Promise<void> {
  if (isFirestoreAvailable()) {
    const userId = getUserId();
    if (userId) {
      await firestoreUpdateSettings(userId, settings);
      return;
    }
  }
  
  console.warn('Settings update not persisted (Firestore not available)');
}
