import type { ReactNode } from 'react'

type CalloutProps = {
  title?: string
  variant?: 'note' | 'warning' | 'lab' | 'key'
  children: ReactNode
}

const styles = {
  note: 'border-accent/40 bg-accent/5',
  warning: 'border-warn/40 bg-warn/5',
  lab: 'border-signal/40 bg-signal/5',
  key: 'border-space-500 bg-space-900',
}

export function Callout({ title, variant = 'note', children }: CalloutProps) {
  return (
    <aside className={`my-6 rounded-xl border px-4 py-3 text-sm leading-relaxed text-slate-300 ${styles[variant]}`}>
      {title ? (
        <p className="mb-1 text-xs font-semibold tracking-widest text-slate-400 uppercase">{title}</p>
      ) : null}
      <div>{children}</div>
    </aside>
  )
}
