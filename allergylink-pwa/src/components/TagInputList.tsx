import { useState, type KeyboardEvent } from 'react'

export function TagInputList({
  label,
  value,
  onChange,
  placeholder,
  hint,
}: {
  label: string
  value: string[]
  onChange: (next: string[]) => void
  placeholder?: string
  hint?: string
}) {
  const [draft, setDraft] = useState('')

  const add = () => {
    const t = draft.trim()
    if (!t) return
    if (!value.includes(t)) onChange([...value, t])
    setDraft('')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      add()
    }
  }

  const remove = (tag: string) => onChange(value.filter((x) => x !== tag))

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-800">{label}</label>
      {hint ? <p className="text-xs text-slate-500">{hint}</p> : null}
      <div className="flex gap-2">
        <input
          className="min-h-11 flex-1 rounded-xl border border-slate-200 bg-white px-3 text-base text-slate-900 placeholder:text-slate-400"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          aria-label={label}
        />
        <button
          type="button"
          onClick={add}
          className="min-h-11 shrink-0 rounded-xl bg-slate-100 px-3 text-sm font-semibold text-teal-800"
        >
          Add
        </button>
      </div>
      {value.length > 0 ? (
        <ul className="flex flex-wrap gap-2" aria-label={`${label} list`}>
          {value.map((tag) => (
            <li key={tag}>
              <button
                type="button"
                onClick={() => remove(tag)}
                className="inline-flex items-center gap-1 rounded-full bg-teal-50 px-3 py-1 text-sm text-teal-900"
              >
                {tag}
                <span className="text-teal-600" aria-hidden>
                  ×
                </span>
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  )
}
