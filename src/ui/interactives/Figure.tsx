import type { ReactNode } from 'react'

type FigureProps = {
  caption?: string
  credit?: string
  children: ReactNode
}

export function Figure({ caption, credit, children }: FigureProps) {
  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-line bg-paper">
      <div className="px-3 py-4 sm:px-5">{children}</div>
      {caption || credit ? (
        <figcaption className="border-t border-line px-4 py-3 text-xs text-ink-muted">
          {caption ? <span className="text-ink-muted">{caption}</span> : null}
          {credit ? <span className="mt-1 block text-ink-faint">{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  )
}
