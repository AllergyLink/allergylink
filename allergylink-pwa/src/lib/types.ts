export type DisplayFormat = 'compact' | 'detailed'

export interface EmergencyContact {
  name: string
  phone: string
  relationship?: string
}

export interface Profile {
  id: string
  allergyId: string
  firstName: string
  lastName: string
  dateOfBirth?: string
  allergies: string[]
  dietaryRestrictions: string[]
  intolerances: string[]
  sensitivities: string[]
  medicationsNotes?: string
  emergencyContact: EmergencyContact
  preferredDisplayFormat: DisplayFormat
  /** Set when this profile is a dependent of another profile */
  managedByProfileId?: string | null
  /** Whether this person can share their own link, or only via caregiver */
  canShareIndependently: boolean
  createdAt: string
  updatedAt: string
}

export interface Session {
  displayName: string
  email?: string
  isAuthenticated: boolean
}

export type VenueCategory =
  | 'restaurants'
  | 'schools'
  | 'camps'
  | 'workplaces'
  | 'hotels'
  | 'airlines'
  | 'private_events'
  | 'friends_family'

export type ShareMethod = 'qr' | 'link' | 'id' | 'other'

export interface ShareRecord {
  id: string
  profileId: string
  recipientName: string
  category: VenueCategory
  method: ShareMethod
  dateShared: string
  /** Placeholder for future server push — stored locally only */
  pushUpdatesEnabled: boolean
}
