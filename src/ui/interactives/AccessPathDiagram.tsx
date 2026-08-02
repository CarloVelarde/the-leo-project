import { useState } from 'react'
import { Figure } from './Figure'

type Path = 'fiber' | 'cellular' | 'satellite'

const COPY: Record<
  Path,
  { title: string; hops: string[]; latency: string; note: string }
> = {
  fiber: {
    title: 'Fiber',
    hops: ['Device', 'Home router', 'ISP fiber', 'Internet'],
    latency: 'Often low last-mile latency if FTTH; long-haul limited by distance in glass (~⅔ c).',
    note: 'Guided light in glass — classic “fast Internet” path.',
  },
  cellular: {
    title: 'Cellular',
    hops: ['Phone', 'Nearby tower', 'Mobile backhaul', 'Internet'],
    latency: 'Extra radio + scheduling delay; still usually tens of ms on modern networks.',
    note: 'Radio to a tower, then fiber. Coverage follows towers.',
  },
  satellite: {
    title: 'Satellite',
    hops: ['Device', 'Dish / phone', 'Satellite(s)', 'Gateway', 'Internet'],
    latency: 'Space-segment delay scales with altitude. GEO is large; LEO is much smaller.',
    note: 'Same IP packets — different geometry on the access hop.',
  },
}

/** Fiber / cellular / satellite as three access media — same Internet, different first hop. */
export function AccessPathDiagram() {
  const [path, setPath] = useState<Path>('fiber')
  const c = COPY[path]

  return (
    <Figure
      caption={`${c.title}: ${c.note}`}
      credit="Conceptual paths — not operator-specific routing"
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {(Object.keys(COPY) as Path[]).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setPath(p)}
            className={
              path === p
                ? 'rounded-full bg-inverse px-3 py-1 text-xs font-medium text-paper'
                : 'rounded-full border border-line px-3 py-1 text-xs text-ink-muted hover:border-ink hover:text-ink'
            }
          >
            {COPY[p].title}
          </button>
        ))}
      </div>

      <ol className="flex flex-wrap items-center gap-2 text-sm">
        {c.hops.map((hop, i) => (
          <li key={hop} className="flex items-center gap-2">
            <span className="rounded-md border border-line bg-paper-elevated px-3 py-1.5 font-medium text-ink">
              {hop}
            </span>
            {i < c.hops.length - 1 ? (
              <span className="text-ink-faint" aria-hidden>
                →
              </span>
            ) : null}
          </li>
        ))}
      </ol>

      <p className="mt-4 text-xs leading-relaxed text-ink-muted">{c.latency}</p>
    </Figure>
  )
}
