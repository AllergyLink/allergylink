export type Severity = "anaphylactic" | "no-cross" | "cross-ok";

export type Profile = {
  id: string;              // "ALY-12345678"
  userId?: string;         // Firebase user ID
  firstName: string;
  nameVisible?: boolean;   // Whether to show name to venues
  avatarUrl?: string;      // data URL or /public path
  allergies: Array<{ name: string; severity: Severity; notes?: string }>;
  dietary: string[];
  emergencyContact?: {
    name: string;
    relationship: string;
    phone: string;
    notes?: string;
  };
  updatedAt: string;       // ISO date
  familyOf?: string;       // parent profile id (for child profiles)
  isPrimary?: boolean;     // Whether this is the primary profile
  profileType?: 'primary' | 'secondary' | 'family';
};

export type SharedEntry = {
  type: "venue" | "person";
  name: string;
  cityState?: string;
  date: string;            // ISO
};

export type AppState = {
  phone?: string;
  primaryId?: string;              // the main user’s profile id
  profiles: Record<string, Profile>;
  shared: SharedEntry[];
};
