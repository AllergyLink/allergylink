const ALPHANUM = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'

export function generateAllergyId(): string {
  let s = ''
  const cryptoObj = globalThis.crypto
  if (cryptoObj?.getRandomValues) {
    const bytes = new Uint8Array(8)
    cryptoObj.getRandomValues(bytes)
    for (let i = 0; i < 8; i++) {
      s += ALPHANUM[bytes[i]! % ALPHANUM.length]
    }
  } else {
    for (let i = 0; i < 8; i++) {
      s += ALPHANUM[Math.floor(Math.random() * ALPHANUM.length)]
    }
  }
  return `ALY-${s}`
}

export function generateProfileId(): string {
  return `prof_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
}

export function generateShareId(): string {
  return `share_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 9)}`
}
