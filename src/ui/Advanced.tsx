import { useState, type ReactNode } from 'react'

type AdvancedProps = {
  title?: string
  children: ReactNode
}

/** Collapsed-by-default deeper math/physics block for motivated learners. */
export function Advanced({ title = 'Advanced', children }: AdvancedProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="my-6 rounded-xl border border-space-600 bg-space-900/80">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-accent"
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className="text-slate-400" aria-hidden>
          {open ? '−' : '+'}
        </span>
      </button>
      {open ? (
        <div className="border-t border-space-700 px-4 py-4 text-sm leading-relaxed text-slate-300 prose-sim">
          {children}
        </div>
      ) : null}
    </div>
  )
}
