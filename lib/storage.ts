import { AppState, Profile, SharedEntry } from './models';

const KEY = 'allergylink-demo';

const seedState: AppState = { profiles: {}, shared: [] };

export function load(): AppState {
  if (typeof window === 'undefined') {
    return seedState;
  }
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return seedState;
    return JSON.parse(raw) as AppState;
  } catch (err) {
    console.warn('Failed to load AllergyLink demo state', err);
    return seedState;
  }
}

export function save(state: AppState) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
}

export function upsertProfile(p: Profile) {
  const s = load();
  s.profiles[p.id] = p;
  if (!s.primaryId) s.primaryId = p.id;
  save(s);
}

export function getProfile(id?: string) {
  const s = load();
  const profileId = id ?? s.primaryId;
  return profileId ? s.profiles[profileId] : undefined;
}

export function listProfiles(parentOnly = false) {
  const all = Object.values(load().profiles);
  if (!parentOnly) return all;
  return all.filter((p) => !p.familyOf);
}

export function addShared(entry: SharedEntry) {
  const s = load();
  s.shared = [entry, ...s.shared];
  save(s);
}

export function listShared() {
  return load().shared;
}

export function newId() {
  const n = Math.floor(10000000 + Math.random() * 90000000);
  return `ALY-${n}`;
}
