import type { UUID } from '@/lib/types'

const ALPHANUM = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function uuid(): UUID {
  return `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`
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

