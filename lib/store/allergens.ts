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
  // Nuts
  { category: 'Nuts', name: 'Peanuts', image: '🥜' },
  { category: 'Nuts', name: 'Tree Nuts', image: '🌰' },
  { category: 'Nuts', name: 'Almonds', image: '🌰' },
  { category: 'Nuts', name: 'Cashews', image: '🌰' },
  { category: 'Nuts', name: 'Walnuts', image: '🌰' },
  { category: 'Nuts', name: 'Pecans', image: '🌰' },
  { category: 'Nuts', name: 'Pistachios', image: '🌰' },
  { category: 'Nuts', name: 'Hazelnuts', image: '🌰' },
  { category: 'Nuts', name: 'Macadamia Nuts', image: '🌰' },
  { category: 'Nuts', name: 'Brazil Nuts', image: '🌰' },
  // Shellfish
  { category: 'Shellfish', name: 'Shrimp', image: '🦐' },
  { category: 'Shellfish', name: 'Crab', image: '🦀' },
  { category: 'Shellfish', name: 'Lobster', image: '🦞' },
  { category: 'Shellfish', name: 'Crayfish', image: '🦞' },
  { category: 'Shellfish', name: 'Scallops', image: '🐚' },
  { category: 'Shellfish', name: 'Oysters', image: '🦪' },
  { category: 'Shellfish', name: 'Clams', image: '🐚' },
  { category: 'Shellfish', name: 'Mussels', image: '🐚' },
  // Dairy
  { category: 'Dairy', name: 'Milk', image: '🥛' },
  { category: 'Dairy', name: 'Cheese', image: '🧀' },
  { category: 'Dairy', name: 'Butter', image: '🧈' },
  { category: 'Dairy', name: 'Cream', image: '🥛' },
  { category: 'Dairy', name: 'Yogurt', image: '🥛' },
  { category: 'Dairy', name: 'Whey', image: '🥛' },
  { category: 'Dairy', name: 'Casein', image: '🥛' },
  // Eggs
  { category: 'Eggs', name: 'Eggs', image: '🥚' },
  { category: 'Eggs', name: 'Egg White', image: '🥚' },
  { category: 'Eggs', name: 'Egg Yolk', image: '🥚' },
  // Fish
  { category: 'Fish', name: 'Fish', image: '🐟' },
  { category: 'Fish', name: 'Salmon', image: '🐟' },
  { category: 'Fish', name: 'Tuna', image: '🐟' },
  { category: 'Fish', name: 'Cod', image: '🐟' },
  { category: 'Fish', name: 'Tilapia', image: '🐟' },
  { category: 'Fish', name: 'Halibut', image: '🐟' },
  { category: 'Fish', name: 'Swordfish', image: '🐟' },
  { category: 'Fish', name: 'Anchovies', image: '🐟' },
  // Wheat/Gluten
  { category: 'Wheat/Gluten', name: 'Wheat', image: '🌾' },
  { category: 'Wheat/Gluten', name: 'Gluten', image: '🌾' },
  { category: 'Wheat/Gluten', name: 'Barley', image: '🌾' },
  { category: 'Wheat/Gluten', name: 'Rye', image: '🌾' },
  { category: 'Wheat/Gluten', name: 'Spelt', image: '🌾' },
  { category: 'Wheat/Gluten', name: 'Oats', image: '🌾' },
  // Soy
  { category: 'Soy', name: 'Soy', image: '🫘' },
  { category: 'Soy', name: 'Edamame', image: '🫘' },
  { category: 'Soy', name: 'Tofu', image: '🫘' },
  { category: 'Soy', name: 'Miso', image: '🫘' },
  { category: 'Soy', name: 'Tempeh', image: '🫘' },
  // Seeds
  { category: 'Seeds', name: 'Sesame', image: '⚪' },
  { category: 'Seeds', name: 'Sunflower Seeds', image: '🌻' },
  { category: 'Seeds', name: 'Pumpkin Seeds', image: '🎃' },
  { category: 'Seeds', name: 'Poppy Seeds', image: '⚪' },
  { category: 'Seeds', name: 'Flax Seeds', image: '⚪' },
  { category: 'Seeds', name: 'Chia Seeds', image: '⚪' },
  { category: 'Seeds', name: 'Hemp Seeds', image: '⚪' },
  { category: 'Seeds', name: 'Mustard', image: '🧂' },
  // Other
  { category: 'Other', name: 'Corn', image: '🌽' },
  { category: 'Other', name: 'Lupin', image: '🌼' },
  { category: 'Other', name: 'Sulfites', image: '🍷' },
  { category: 'Other', name: 'Celery', image: '🥬' },
  { category: 'Other', name: 'Mollusks', image: '🐚' },
  { category: 'Other', name: 'Latex', image: '⚠️' },
]

export function buildAllergies(): Allergy[] {
  return []
}
