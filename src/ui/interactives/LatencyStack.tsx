import { useState } from 'react'
import { Figure } from './Figure'

type FactorId =
  | 'propagation'
  | 'processing'
  | 'queue'
  | 'path'
  | 'handoff'
  | 'obstruction'
  | 'weather'
  | 'ground'

type Factor = {
  id: FactorId
  label: string
  short: string
  detail: string
  /** Geometric light-time only? */
  floor?: boolean
}

const FACTORS: Factor[] = [
  {
    id: 'propagation',
    label: 'Propagation',
    short: 'd / c',
    detail:
      'Light time along the actual path (slant range in km, not just altitude). Free space is about 3.3 ms per 1,000 km one way. LEO cuts this vs GEO; it is a floor, not the full user RTT in ms.',
    floor: true,
  },
  {
    id: 'processing',
    label: 'Processing',
    short: 'modems and nodes',
    detail:
      'Encoding, decoding, and software on terminal, satellite, and ground equipment add small delays on every hop, often fractions of a ms to a few ms each, depending on design.',
  },
  {
    id: 'queue',
    label: 'Queueing',
    short: 'shared load',
    detail:
      'When many users share beams or gateways, packets wait in line. Coverage can stay “up” while queues grow. That is capacity, not geometry. Busy hours can add tens of ms or more.',
  },
  {
    id: 'path',
    label: 'Routing path',
    short: 'hops and ISLs',
    detail:
      'User → sat → (optional laser mesh) → gateway → fiber. Extra hops and longer terrestrial tails add delay even when the serving sat is nearby. Count hops first; better toys sum delay in ms.',
  },
  {
    id: 'handoff',
    label: 'Handoffs',
    short: 'mobility',
    detail:
      'Serving satellite changes (often many times per hour in LEO). Good systems aim for smooth overlap; users may still see brief blips or jitter spikes measured in ms.',
  },
  {
    id: 'obstruction',
    label: 'Obstruction',
    short: 'clear sky',
    detail:
      'Trees and roofs break the link even when a map shows a sat above min elevation in degrees. Outage is not a high ms number; it is no usable path.',
  },
  {
    id: 'weather',
    label: 'Weather',
    short: 'rain fade',
    detail:
      'Higher bands (Ka class and above, tens of GHz) lose margin in heavy rain. Links may drop rate (fewer Mbps) or disconnect. Physics, not a software bug.',
  },
  {
    id: 'ground',
    label: 'Terrestrial tail',
    short: 'fiber Internet',
    detail:
      'After the gateway, the ordinary Internet path to the server still applies. Cross country fiber RTT can be tens of ms; intercontinental can be over 100 ms. CDN distance and peering matter.',
  },
]

/**
 * Multi-factor latency / performance stack — geometric floor vs full experience.
 */
export function LatencyStack() {
  const [active, setActive] = useState<FactorId>('propagation')
  const factor = FACTORS.find((f) => f.id === active) ?? FACTORS[0]!

  return (
    <Figure
      caption="Tap a factor. Light time is only the propagation floor in ms. Real experience stacks many ingredients (still often discussed in ms for delay, Mbps for speed)."
      credit="Systems model for this course, not a measured product RTT"
    >
      <div className="flex flex-wrap gap-2">
        {FACTORS.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setActive(f.id)}
            className={
              active === f.id
                ? 'rounded-full bg-inverse px-3 py-1 text-xs font-medium text-paper'
                : 'rounded-full border border-line px-3 py-1 text-xs text-ink-muted hover:border-ink hover:text-ink'
            }
          >
            {f.label}
            {f.floor ? ' · floor' : ''}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-md border border-line px-4 py-3">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <p className="text-sm font-semibold text-ink">{factor.label}</p>
          <p className="font-mono text-xs text-ink-faint">{factor.short}</p>
        </div>
        <p className="mt-2 text-sm leading-relaxed text-ink-muted">{factor.detail}</p>
      </div>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        <div className="rounded-md border border-line bg-paper-elevated px-3 py-2">
          <p className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
            Geometric floor
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            Propagation only — what altitude and path length can guarantee at best.
          </p>
        </div>
        <div className="rounded-md border border-line bg-paper-elevated px-3 py-2">
          <p className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
            User experience
          </p>
          <p className="mt-1 text-xs text-ink-muted">
            Mean RTT, jitter, loss, and outages — the full stack above the floor.
          </p>
        </div>
      </div>
    </Figure>
  )
}
