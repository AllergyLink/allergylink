import type { VenueCategory } from './types'

export const VENUE_CATEGORY_LABELS: Record<VenueCategory, string> = {
  restaurants: 'Restaurant',
  schools: 'School',
  camps: 'Camp',
  workplaces: 'Workplace',
  hotels: 'Hotel',
  airlines: 'Airline',
  private_events: 'Private event',
  friends_family: 'Friends / family',
}

export const VENUE_CATEGORY_OPTIONS: { value: VenueCategory; label: string }[] = (
  Object.entries(VENUE_CATEGORY_LABELS) as [VenueCategory, string][]
).map(([value, label]) => ({ value, label }))
