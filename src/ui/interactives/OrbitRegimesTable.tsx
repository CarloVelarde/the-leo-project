import { Figure } from './Figure'

type Row = {
  regime: string
  altitude: string
  period: string
  coverage: string
  latency: string
}

const ROWS: Row[] = [
  {
    regime: 'LEO',
    altitude: '~160–2,000 km',
    period: '~90–128 min',
    coverage: 'Small, fast-moving footprint',
    latency: 'Low light-time (ms class on space hop)',
  },
  {
    regime: 'MEO',
    altitude: '~2,000 km → below GEO',
    period: 'Hours (e.g. GNSS ~12 h)',
    coverage: 'Wide; mid-size fleets',
    latency: 'Tens of ms one-way typical',
  },
  {
    regime: 'GEO',
    altitude: '35,786 km',
    period: '1 sidereal day',
    coverage: 'Huge fixed footprint',
    latency: '~119 ms one-way zenith; ~240 ms up+down',
  },
]

/** Compact LEO / MEO / GEO comparison — numbers safe for beginners. */
export function OrbitRegimesTable() {
  return (
    <Figure
      caption="Orbit regimes at a glance. Altitude bounds are conventions (ESA/NASA), not sharp physical walls."
      credit="ESA Types of orbits · light-time from d/c with c ≈ 3×10⁵ km/s"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs tracking-wide text-ink-faint uppercase">
              <th className="py-2 pr-3 font-medium">Regime</th>
              <th className="py-2 pr-3 font-medium">Altitude</th>
              <th className="py-2 pr-3 font-medium">Period</th>
              <th className="py-2 pr-3 font-medium">Coverage</th>
              <th className="py-2 font-medium">Latency floor</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.regime} className="border-b border-line last:border-0">
                <td className="py-3 pr-3 font-semibold text-ink">{r.regime}</td>
                <td className="py-3 pr-3 text-ink-muted">{r.altitude}</td>
                <td className="py-3 pr-3 text-ink-muted">{r.period}</td>
                <td className="py-3 pr-3 text-ink-muted">{r.coverage}</td>
                <td className="py-3 text-ink-muted">{r.latency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Figure>
  )
}
