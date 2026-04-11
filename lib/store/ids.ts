import type { UUID } from '@/lib/types'

const ALPHANUM = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function uuid(): UUID {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID() as UUID
  }
  // fallback for environments without crypto.randomUUID
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  }) as UUID
}

export function newAllergyLinkId(): string {
  const cryptoObj = globalThis.crypto
  let s = ''
  if (cryptoObj?.getRandomValues) {
    const bytes = new Uint8Array(8)
    cryptoObj.getRandomValues(bytes)
    for (let i = 0; i < 8; i++) s += ALPHANUM[bytes[i]! % ALPHANUM.length]
  } else {
    for (let i = 0; i < 8; i++) s += ALPHANUM[Math.floor(Math.random() * ALPHANUM.length)]
  }
  return `ALY-${s}`
}

