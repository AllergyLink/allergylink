import type { Allergy, AllergyCategory } from '@/lib/types'
type Seed = { category: AllergyCategory; name: string; image: string }

export const ALLERGEN_CATEGORIES: { key: AllergyCategory; label: string; hint: string }[] = [
  { key: 'Nuts', label: 'Nuts', hint: 'Peanuts and tree nuts' },
  { key: 'Shellfish', label: 'Shellfish', hint: 'Shrimp, crab, lobster' },
  { key: 'Dairy', label: 'Dairy', hint: 'Milk and dairy ingredients' },
  { key: 'Eggs', label: 'Eggs', hint: 'Egg and egg ingredients' },
  { key: 'Fish', label: 'Fish', hint: 'Fish and fish ingredients' },
  { key: 'Wheat/Gluten', label: 'Wheat/Gluten', hint: 'Wheat and gluten sources' },
  { key: 'Soy', label: 'Soy', hint: 'Soy and soy ingredients' },
  { key: 'Seeds', label: 'Seeds', hint: 'Sesame and other seeds' },
  { key: 'Other', label: 'Other', hint: 'Anything else you need to avoid' },
]

export const ALLERGEN_SEED: Seed[] = [
  { category: 'Dairy', name: 'Milk', image: '🥛' },
  { category: 'Eggs', name: 'Eggs', image: '🥚' },
  { category: 'Soy', name: 'Soy', image: '🫘' },
  { category: 'Wheat/Gluten', name: 'Wheat/Gluten', image: '🌾' },
  { category: 'Nuts', name: 'Tree nuts', image: '🌰' },
  { category: 'Nuts', name: 'Peanuts', image: '🥜' },
  { category: 'Fish', name: 'Fish', image: '🐟' },
  { category: 'Shellfish', name: 'Shellfish', image: '🦐' },
  { category: 'Seeds', name: 'Sesame', image: '⚪' },
]

export function buildAllergies(): Allergy[] {
  return ALLERGEN_SEED.map((s) => ({
    category: s.category,
    name: s.name,
    image: s.image,
    isAnaphylactic: false,
    crossContaminationOK: true,
  }))
}

