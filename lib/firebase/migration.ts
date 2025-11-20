import { upsertProfile, addShared } from './storage';
import { load } from '../storage';
import type { Profile, SharedEntry } from '../models';

/**
 * Migrate data from localStorage to Firestore
 * Call this after user authenticates
 */
export async function migrateLocalStorageToFirestore(userId: string): Promise<void> {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const localData = load();
    
    // Migrate profiles
    for (const profile of Object.values(localData.profiles)) {
      await upsertProfile({
        ...profile,
        userId,
        isPrimary: profile.id === localData.primaryId,
      });
    }
    
    // Migrate shared entries
    for (const shared of localData.shared) {
      await addShared(userId, shared);
    }
    
    console.log('Migration completed successfully');
  } catch (error) {
    console.error('Error during migration:', error);
    throw error;
  }
}

/**
 * Check if migration is needed
 */
export function needsMigration(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  const localData = load();
  return Object.keys(localData.profiles).length > 0 || localData.shared.length > 0;
}
