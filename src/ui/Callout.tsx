import type { ReactNode } from 'react'

type CalloutProps = {
  title?: string
  variant?: 'note' | 'warning' | 'lab' | 'key'
  children: ReactNode
}

export function Callout({ title, variant = 'note', children }: CalloutProps) {
  const border =
    variant === 'warning'
      ? 'border-warn/40'
      : variant === 'lab'
        ? 'border-signal/40'
        : 'border-line'

  return (
    <aside className={`my-6 rounded-lg border ${border} bg-paper-elevated px-4 py-3 text-sm leading-relaxed text-ink-muted`}>
      {title ? (
        <p className="mb-1 text-[10px] font-semibold tracking-[0.2em] text-ink-faint uppercase">
          {title}
        </p>
      ) : null}
      <div className="text-ink-muted">{children}</div>
    </aside>
  )
}
