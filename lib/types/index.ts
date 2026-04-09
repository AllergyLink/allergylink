export type UUID = string

export type User = {
  id: UUID
  phoneNumber: string
  firstName: string
}

export type ProfileType = 'primary' | 'secondary' | 'family'

export type AllergyCategory =
  | 'Nuts'
  | 'Shellfish'
  | 'Dairy'
  | 'Eggs'
  | 'Fish'
  | 'Wheat/Gluten'
  | 'Soy'
  | 'Seeds'
  | 'Other'

export type Allergy = {
  category: AllergyCategory
  name: string
  isAnaphylactic: boolean
  crossContaminationOK: boolean
  image: string
}

export type Avatar = {
  hairLength: 'Short' | 'Medium' | 'Long'
  hairColor: 'Black' | 'Brown' | 'Blonde' | 'Red' | 'Gray'
  glasses: 'None' | 'Yes'
  skinTone: 'Light' | 'Medium' | 'Deep'
}

export type DietaryRestriction =
  | 'Vegan'
  | 'Vegetarian'
  | 'Halal'
  | 'Kosher'
  | 'Gluten-Free'
  | 'Custom'

export type EmergencyContact = {
  name?: string
  phone?: string
}

export type Profile = {
  id: UUID
  userId: UUID
  type: ProfileType
  isMinor: boolean
  name: string
  avatar?: Avatar
  photoDataUrl?: string
  allergies: Allergy[]
  dietaryRestrictions: DietaryRestriction[]
  dietaryCustom?: string
  emergencyContact?: EmergencyContact
  guardians: Guardian[]
  preferences: Preferences
  allergyLinkId: string
  createdAt: string
  updatedAt: string
}

export type Guardian = {
  id: UUID
  profileId: UUID
  name: string
  phoneNumber: string
  relationship: string
  isPrimary: boolean
  verified: boolean
}

export type ShareMethod = 'QR' | 'link' | 'PDF' | 'ID'

export type ShareSession = {
  id: UUID
  profileId: UUID
  method: ShareMethod
  approved: boolean
  timestamp: string
}

export type Address = {
  line1: string
  line2?: string
  city: string
  state: string
  zip: string
}

export type Preferences = {
  promotionsDigital: boolean
  promotionsSampleBox: boolean
  sampleBoxAddress?: Address
  translationsEnabled: boolean
}

export type Session = {
  userId: UUID
  verified: boolean
}

export type AppState = {
  session?: Session
  users: Record<UUID, User>
  profiles: Record<UUID, Profile>
  shareSessions: Record<UUID, ShareSession>
  minorApprovals: Record<UUID, { approvedByGuardianId: UUID; approvedAt: string }>
}

