'use client'

import type { Avatar } from '@/lib/types'

const HAIR_LENGTH: Avatar['hairLength'][] = ['Short', 'Medium', 'Long']
const HAIR_COLOR: Avatar['hairColor'][] = ['Black', 'Brown', 'Blonde', 'Red', 'Gray']
const GLASSES: Avatar['glasses'][] = ['None', 'Yes']
const SKIN: Avatar['skinTone'][] = ['Light', 'Medium', 'Deep']

function Select<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: T[]
  onChange: (v: T) => void
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-slate-800">{label}</span>
      <select
        className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-base"
        value={value}
        onChange={(e) => onChange(e.target.value as T)}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}

export function AvatarBuilder({
  value,
  onChange,
}: {
  value: Avatar
  onChange: (next: Avatar) => void
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <Select
        label="Hair length"
        value={value.hairLength}
        options={HAIR_LENGTH}
        onChange={(hairLength) => onChange({ ...value, hairLength })}
      />
      <Select
        label="Hair color"
        value={value.hairColor}
        options={HAIR_COLOR}
        onChange={(hairColor) => onChange({ ...value, hairColor })}
      />
      <Select
        label="Glasses"
        value={value.glasses}
        options={GLASSES}
        onChange={(glasses) => onChange({ ...value, glasses })}
      />
      <Select
        label="Skin tone"
        value={value.skinTone}
        options={SKIN}
        onChange={(skinTone) => onChange({ ...value, skinTone })}
      />
    </div>
  )
}

