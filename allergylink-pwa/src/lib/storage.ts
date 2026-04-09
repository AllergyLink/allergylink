const PREFIX = 'allergylink_v1_'

const KEYS = {
  session: `${PREFIX}session`,
  profiles: `${PREFIX}profiles`,
  shares: `${PREFIX}shares`,
  activeProfile: `${PREFIX}activeProfile`,
} as const

export function loadJson<T>(key: keyof typeof KEYS, fallback: T): T {
  try {
    const raw = localStorage.getItem(KEYS[key])
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

export function saveJson(key: keyof typeof KEYS, value: unknown): void {
  localStorage.setItem(KEYS[key], JSON.stringify(value))
}
