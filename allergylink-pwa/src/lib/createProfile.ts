import { generateAllergyId, generateProfileId } from './allergyId'
import type { Profile } from './types'

export function createEmptyProfile(overrides: Partial<Profile> = {}): Profile {
  const now = new Date().toISOString()
  return {
    id: generateProfileId(),
    allergyId: generateAllergyId(),
    firstName: '',
    lastName: '',
    dateOfBirth: undefined,
    allergies: [],
    dietaryRestrictions: [],
    intolerances: [],
    sensitivities: [],
    medicationsNotes: undefined,
    emergencyContact: { name: '', phone: '' },
    preferredDisplayFormat: 'detailed',
    managedByProfileId: null,
    canShareIndependently: true,
    createdAt: now,
    updatedAt: now,
    ...overrides,
  }
}
