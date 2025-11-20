export type Severity = "anaphylactic" | "no-cross" | "cross-ok";

export type Profile = {
  id: string;              // "ALY-12345678"
  firstName: string;
  avatarUrl?: string;      // data URL or /public path
  allergies: Array<{ name: string; severity: Severity }>;
  dietary: string[];
  updatedAt: string;       // ISO date
  familyOf?: string;       // parent profile id (for child profiles)
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
