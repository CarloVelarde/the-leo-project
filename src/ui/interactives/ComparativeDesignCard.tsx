import { useState } from 'react'
import { Figure } from './Figure'

type DesignId = 'leo-dish' | 'leo-dtc' | 'geo-hts' | 'other-ngso'

const DESIGNS: Record<
  DesignId,
  { title: string; orbit: string; user: string; latency: string; trade: string }
> = {
  'leo-dish': {
    title: 'LEO dish broadband',
    orbit: 'Many LEO sats, multi-shell possible',
    user: 'Phased-array terminal',
    latency: 'Low geometric floor (ms-class space hop)',
    trade: 'Complex fleet + handovers; shared capacity',
  },
  'leo-dtc': {
    title: 'LEO direct-to-cell',
    orbit: 'Often lower shells (public plans)',
    user: 'Ordinary phones (partner MNOs)',
    latency: 'Still LEO geometry; capacity often limited',
    trade: 'Brutal link budget; messaging-first history',
  },
  'geo-hts': {
    title: 'GEO high-throughput',
    orbit: 'Few sats at ~35,786 km',
    user: 'Fixed dish / VSAT family',
    latency: 'High light-time floor (~240 ms up+down)',
    trade: 'Simple sky geometry; poor interactive feel',
  },
  'other-ngso': {
    title: 'Other NGSO broadband',
    orbit: 'Different shells, inclinations, gateway models',
    user: 'Varies by operator and market',
    latency: 'Between GEO tax and densest LEO',
    trade: 'Compare design points — not brand scores',
  },
}

/**
 * Design-point comparison for LEO / GEO / DTC — public architecture, no ranking hype.
 */
export function ComparativeDesignCard() {
  const [id, setId] = useState<DesignId>('leo-dish')
  const d = DESIGNS[id]

  return (
    <Figure
      caption={`${d.title}: compare architecture axes, not marketing claims. Counts and shells are time-sensitive.`}
      credit="Pedagogical design points — not a competitive scorecard"
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {(Object.keys(DESIGNS) as DesignId[]).map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setId(k)}
            className={
              id === k
                ? 'rounded-full bg-inverse px-3 py-1 text-xs font-medium text-paper'
                : 'rounded-full border border-line px-3 py-1 text-xs text-ink-muted hover:border-ink hover:text-ink'
            }
          >
            {DESIGNS[k].title}
          </button>
        ))}
      </div>
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div className="rounded-md border border-line px-3 py-2">
          <dt className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
            Orbit
          </dt>
          <dd className="mt-1 text-ink-muted">{d.orbit}</dd>
        </div>
        <div className="rounded-md border border-line px-3 py-2">
          <dt className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
            User gear
          </dt>
          <dd className="mt-1 text-ink-muted">{d.user}</dd>
        </div>
        <div className="rounded-md border border-line px-3 py-2">
          <dt className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
            Latency character
          </dt>
          <dd className="mt-1 text-ink-muted">{d.latency}</dd>
        </div>
        <div className="rounded-md border border-line px-3 py-2">
          <dt className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
            Main trade
          </dt>
          <dd className="mt-1 text-ink-muted">{d.trade}</dd>
        </div>
      </dl>
    </Figure>
  )
}
