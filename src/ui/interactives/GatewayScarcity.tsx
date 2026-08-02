import { useState } from 'react'
import { Figure } from './Figure'

type Mode = 'local-gw' | 'remote-isl' | 'congested'

const COPY: Record<
  Mode,
  { title: string; path: string; note: string }
> = {
  'local-gw': {
    title: 'Nearby gateway',
    path: 'User → sat → local GW → Internet',
    note: 'Shortest ground hop when a gateway sits under the footprint. Fiber on-ramp is close.',
  },
  'remote-isl': {
    title: 'Remote via ISLs',
    path: 'User → sat → laser hops → distant GW → Internet',
    note: 'Oceans and sparse land: mesh carries traffic until a gateway with fiber is reachable.',
  },
  congested: {
    title: 'Busy gateway',
    path: 'User → sat → GW (queued) → Internet',
    note: 'Gateways are shared capacity. Many users or thin backhaul can queue even when sats are up.',
  },
}

/** Gateways as scarce fiber on-ramps — not infinite free exits. */
export function GatewayScarcity() {
  const [mode, setMode] = useState<Mode>('remote-isl')
  const c = COPY[mode]

  return (
    <Figure
      caption={`${c.title}: ${c.note}`}
      credit="Conceptual — not an operator gateway map"
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
      <p className="font-mono text-sm text-ink">{c.path}</p>
      <p className="mt-3 text-xs leading-relaxed text-ink-muted">
        Almost all consumer Internet traffic still exits to terrestrial networks. ISLs move where
        that exit can be — they do not remove the need for fiber somewhere.
      </p>
    </Figure>
  )
}
