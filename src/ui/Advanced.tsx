import { useState, type ReactNode } from 'react'

type AdvancedProps = {
  title?: string
  children: ReactNode
}

export function Advanced({ title = 'Advanced', children }: AdvancedProps) {
  const [open, setOpen] = useState(false)

  return (
    <div className="my-6 rounded-lg border border-line bg-paper-elevated/50">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm font-medium text-ink"
        aria-expanded={open}
      >
        <span>{title}</span>
        <span className="text-ink-faint" aria-hidden>
          {open ? '−' : '+'}
        </span>
      </button>
      {open ? (
        <div className="border-t border-line px-4 py-4 text-sm leading-relaxed text-ink-muted">
          {children}
        </div>
      ) : null}
    </div>
  )
}
