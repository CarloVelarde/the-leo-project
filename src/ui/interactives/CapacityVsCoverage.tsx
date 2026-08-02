import { useState } from 'react'
import { Figure } from './Figure'

type Mode = 'sparse' | 'dense-empty' | 'dense-busy'

const COPY: Record<
  Mode,
  { title: string; coverage: string; capacity: string; note: string }
> = {
  sparse: {
    title: 'Sparse sky',
    coverage: 'Often offline — geometry gaps',
    capacity: 'Few users can share what little is there',
    note: 'Coverage fails first. Capacity is secondary when no sat is usable.',
  },
  'dense-empty': {
    title: 'Dense sky · quiet cell',
    coverage: 'Usually online',
    capacity: 'Plenty of shared spectrum for you',
    note: 'Geometry looks great. Experience can still feel fast — if load is low.',
  },
  'dense-busy': {
    title: 'Dense sky · busy cell',
    coverage: 'Still online',
    capacity: 'Many neighbors share the same beams',
    note: 'Sat in view ≠ exclusive pipe. Local congestion can dominate speed.',
  },
}

/** Coverage (geometry) vs capacity (shared radio resources) — conceptual only. */
export function CapacityVsCoverage() {
  const [mode, setMode] = useState<Mode>('dense-busy')
  const c = COPY[mode]

  return (
    <Figure
      caption={`${c.title}: ${c.note}`}
      credit="Conceptual — not a load model of any operator"
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {(Object.keys(COPY) as Mode[]).map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className={
              mode === m
                ? 'rounded-full bg-inverse px-3 py-1 text-xs font-medium text-paper'
                : 'rounded-full border border-line px-3 py-1 text-xs text-ink-muted hover:border-ink hover:text-ink'
            }
          >
            {COPY[m].title}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-line px-4 py-3">
          <p className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
            Coverage
          </p>
          <p className="mt-1 text-sm font-medium text-ink">{c.coverage}</p>
          <p className="mt-1 text-xs text-ink-muted">Geometry: sats above min elevation</p>
        </div>
        <div className="rounded-md border border-line px-4 py-3">
          <p className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
            Capacity
          </p>
          <p className="mt-1 text-sm font-medium text-ink">{c.capacity}</p>
          <p className="mt-1 text-xs text-ink-muted">Shared spectrum, power, and beams</p>
        </div>
      </div>
    </Figure>
  )
}
