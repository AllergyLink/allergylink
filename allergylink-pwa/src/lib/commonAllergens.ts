export const COMMON_ALLERGEN_LABELS = [
  'Milk',
  'Eggs',
  'Soy',
  'Wheat',
  'Tree nuts',
  'Peanuts',
  'Fish',
  'Shellfish',
  'Sesame',
] as const

export const COMMON_ALLERGEN_SET = new Set<string>(COMMON_ALLERGEN_LABELS)
