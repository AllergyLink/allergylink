import { 
  collection, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  deleteDoc,
  query,
  where,
  getDocs,
  addDoc,
  serverTimestamp,
  Timestamp,
  QueryConstraint,
  orderBy,
  limit
} from 'firebase/firestore';
import { db } from './config';
import type { Profile, SharedEntry, AppState } from '../models';

// Collections
const COLLECTIONS = {
  PROFILES: 'profiles',
  SHARED: 'shared',
  USERS: 'users',
  SETTINGS: 'settings',
} as const;

// ==================== PROFILE OPERATIONS ====================

/**
 * Create or update a profile
 */
export async function upsertProfile(profile: Profile): Promise<void> {
  if (!db) {
    console.warn('Firestore not initialized');
    return;
  }

  try {
    const profileRef = doc(db, COLLECTIONS.PROFILES, profile.id);
    await setDoc(profileRef, {
      ...profile,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Error upserting profile:', error);
    throw error;
  }
}

/**
 * Get a profile by ID
 */
export async function getProfile(id: string): Promise<Profile | null> {
  if (!db) {
    console.warn('Firestore not initialized');
    return null;
  }

  try {
    const profileRef = doc(db, COLLECTIONS.PROFILES, id);
    const profileSnap = await getDoc(profileRef);
    
    if (profileSnap.exists()) {
      const data = profileSnap.data();
      return {
        ...data,
        id: profileSnap.id,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
      } as Profile;
    }
    return null;
  } catch (error) {
    console.error('Error getting profile:', error);
    return null;
  }
}

/**
 * Get primary profile for a user
 */
export async function getPrimaryProfile(userId: string): Promise<Profile | null> {
  if (!db) {
    console.warn('Firestore not initialized');
    return null;
  }

  try {
    const profilesRef = collection(db, COLLECTIONS.PROFILES);
    const q = query(
      profilesRef,
      where('userId', '==', userId),
      where('isPrimary', '==', true),
      limit(1)
    );
    
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0];
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
      } as Profile;
    }
    return null;
  } catch (error) {
    console.error('Error getting primary profile:', error);
    return null;
  }
}

/**
 * List all profiles for a user
 */
export async function listProfiles(userId: string, familyOnly: boolean = false): Promise<Profile[]> {
  if (!db) {
    console.warn('Firestore not initialized');
    return [];
  }

  try {
    const profilesRef = collection(db, COLLECTIONS.PROFILES);
    const constraints: QueryConstraint[] = [
      where('userId', '==', userId),
    ];

    if (familyOnly) {
      constraints.push(where('familyOf', '!=', null));
    }

    const q = query(profilesRef, ...constraints, orderBy('updatedAt', 'desc'));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        id: doc.id,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || data.updatedAt,
      } as Profile;
    });
  } catch (error) {
    console.error('Error listing profiles:', error);
    return [];
  }
}

/**
 * Delete a profile
 */
export async function deleteProfile(id: string): Promise<void> {
  if (!db) {
    console.warn('Firestore not initialized');
    return;
  }

  try {
    const profileRef = doc(db, COLLECTIONS.PROFILES, id);
    await deleteDoc(profileRef);
  } catch (error) {
    console.error('Error deleting profile:', error);
    throw error;
  }
}

// ==================== SHARED VENUES OPERATIONS ====================

/**
 * Add a shared venue entry
 */
export async function addShared(userId: string, entry: SharedEntry): Promise<void> {
  if (!db) {
    console.warn('Firestore not initialized');
    return;
  }

  try {
    const sharedRef = collection(db, COLLECTIONS.SHARED);
    await addDoc(sharedRef, {
      ...entry,
      userId,
      createdAt: serverTimestamp(),
    });
  } catch (error) {
    console.error('Error adding shared entry:', error);
    throw error;
  }
}

/**
 * List shared venues for a user
 */
export async function listShared(userId: string): Promise<SharedEntry[]> {
  if (!db) {
    console.warn('Firestore not initialized');
    return [];
  }

  try {
    const sharedRef = collection(db, COLLECTIONS.SHARED);
    const q = query(
      sharedRef,
      where('userId', '==', userId),
      orderBy('date', 'desc')
    );
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        date: data.date?.toDate?.()?.toISOString() || data.date,
      } as SharedEntry;
    });
  } catch (error) {
    console.error('Error listing shared entries:', error);
    return [];
  }
}

// ==================== USER SETTINGS OPERATIONS ====================

export interface UserSettings {
  nameVisible: boolean;
  theme: 'light' | 'mint';
  phone?: string;
  liveUpdates: boolean;
  favoriteVenues?: string[];
}

/**
 * Get user settings
 */
export async function getSettings(userId: string): Promise<UserSettings | null> {
  if (!db) {
    console.warn('Firestore not initialized');
    return null;
  }

  try {
    const settingsRef = doc(db, COLLECTIONS.SETTINGS, userId);
    const settingsSnap = await getDoc(settingsRef);
    
    if (settingsSnap.exists()) {
      return settingsSnap.data() as UserSettings;
    }
    
    // Return default settings
    return {
      nameVisible: true,
      theme: 'light',
      liveUpdates: true,
      favoriteVenues: [],
    };
  } catch (error) {
    console.error('Error getting settings:', error);
    return null;
  }
}

/**
 * Update user settings
 */
export async function updateSettings(userId: string, settings: Partial<UserSettings>): Promise<void> {
  if (!db) {
    console.warn('Firestore not initialized');
    return;
  }

  try {
    const settingsRef = doc(db, COLLECTIONS.SETTINGS, userId);
    await setDoc(settingsRef, {
      ...settings,
      updatedAt: serverTimestamp(),
    }, { merge: true });
  } catch (error) {
    console.error('Error updating settings:', error);
    throw error;
  }
}

// ==================== UTILITY FUNCTIONS ====================

/**
 * Generate a new AllergyLink ID
 */
export function newId(): string {
  const n = Math.floor(10000000 + Math.random() * 90000000);
  return `ALY-${n}`;
}

/**
 * Check if Firestore is available
 */
export function isFirestoreAvailable(): boolean {
  return typeof window !== 'undefined' && db !== undefined;
}
