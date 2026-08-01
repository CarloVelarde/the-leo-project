import type { ReactNode } from 'react'

type FigureProps = {
  caption?: string
  credit?: string
  children: ReactNode
}

/** Caption wrapper for SVG diagrams and custom visuals. */
export function Figure({ caption, credit, children }: FigureProps) {
  return (
    <figure className="my-8 overflow-hidden rounded-xl border border-space-700 bg-space-900/60">
      <div className="px-3 py-4 sm:px-5">{children}</div>
      {caption || credit ? (
        <figcaption className="border-t border-space-800 px-4 py-3 text-xs text-slate-400">
          {caption ? <span className="text-slate-300">{caption}</span> : null}
          {credit ? <span className="mt-1 block text-slate-500">{credit}</span> : null}
        </figcaption>
      ) : null}
    </figure>
  )
}
