import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const styles: Record<Variant, string> = {
  primary:
    'bg-[color:var(--al-primary)] text-white hover:bg-[color:var(--al-primary-hover)] active:bg-[color:var(--al-primary-active)] shadow-sm disabled:opacity-50',
  secondary:
    'bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 active:bg-slate-100 disabled:opacity-50',
  ghost: 'text-slate-800 hover:bg-slate-100 active:bg-slate-200 disabled:opacity-50',
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode
  variant?: Variant
}) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-11 min-w-[44px] items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition-colors ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
