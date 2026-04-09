import { ALLERGEN_TILE_VAR } from '../lib/allergenTileTones'

function SesameIcon({ className = 'text-slate-700' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={`h-9 w-9 drop-shadow-sm ${className}`}
      fill="currentColor"
      aria-hidden
    >
      <circle cx="10" cy="17" r="3.2" />
      <circle cx="16" cy="12" r="3.2" />
      <circle cx="22" cy="17" r="3.2" />
    </svg>
  )
}

const GRID: { label: string; emoji: string | null }[] = [
  { label: 'Milk', emoji: '🥛' },
  { label: 'Eggs', emoji: '🥚' },
  { label: 'Soy', emoji: '🫘' },
  { label: 'Wheat', emoji: '🌾' },
  { label: 'Tree nuts', emoji: '🌰' },
  { label: 'Peanuts', emoji: '🥜' },
  { label: 'Fish', emoji: '🐟' },
  { label: 'Shellfish', emoji: '🦐' },
  { label: 'Sesame', emoji: null },
]

type Props = {
  value: string[]
  onChange: (next: string[]) => void
  className?: string
}

export function AllergenSelector({ value, onChange, className = '' }: Props) {
  const toggle = (label: string) => {
    const has = value.includes(label)
    const next = has ? value.filter((x) => x !== label) : [...value, label]
    onChange(next)
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <p className="text-sm text-slate-600">Tap to select or clear.</p>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {GRID.map(({ label, emoji }) => {
          const selected = value.includes(label)
          const v = ALLERGEN_TILE_VAR[label] ?? '--al-soya'
          return (
            <button
              key={label}
              type="button"
              onClick={() => toggle(label)}
              aria-pressed={selected}
              style={
                selected
                  ? {
                      backgroundColor: `var(${v})`,
                      borderColor: `color-mix(in srgb, var(${v}) 85%, black)`,
                    }
                  : {
                      borderColor: 'rgb(226 232 240)',
                      backgroundColor: `color-mix(in srgb, var(${v}) 12%, white)`,
                    }
              }
              className={`flex min-h-[88px] flex-col items-center justify-center gap-1 rounded-2xl border-2 px-2 py-3 text-center transition-[transform,box-shadow] active:scale-[0.98] ${
                selected
                  ? 'text-white shadow-md ring-2 ring-white/40'
                  : 'text-slate-800 hover:brightness-[1.02]'
              } `}
            >
              <span
                className={`flex h-10 items-center justify-center select-none rounded-full ${
                  selected ? 'bg-white/25 px-1' : 'bg-white/80 px-1 shadow-sm'
                }`}
              >
                {emoji ? (
                  <span className="text-[2rem] leading-none sm:text-[2.125rem]">{emoji}</span>
                ) : (
                  <SesameIcon className={selected ? 'text-white' : 'text-slate-800'} />
                )}
              </span>
              <span className={`text-xs font-semibold leading-tight ${selected ? 'text-white' : ''}`}>
                {label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
