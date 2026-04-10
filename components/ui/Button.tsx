'use client'

import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline'

const styles: Record<Variant, string> = {
  primary:
    'bg-[color:var(--color-primary)] text-white hover:brightness-110 active:brightness-95 shadow-sm',
  secondary:
    'bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 active:bg-slate-100 shadow-sm',
  outline:
    'bg-transparent text-[color:var(--color-primary)] border border-[color:var(--color-primary)] hover:bg-[color:var(--color-primary-soft)] active:brightness-95',
}

export function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode; variant?: Variant }) {
  return (
    <button
      type="button"
      className={`inline-flex min-h-11 items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold transition ${styles[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}
