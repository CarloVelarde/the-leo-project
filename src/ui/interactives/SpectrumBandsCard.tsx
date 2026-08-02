import { Figure } from './Figure'

const ROWS = [
  {
    band: 'Ku-class',
    range: '~12–18 GHz',
    role: 'Often associated with user service links',
    weather: 'Moderate weather sensitivity',
  },
  {
    band: 'Ka-class',
    range: '~26–40 GHz',
    role: 'High-throughput feeder / gateway patterns',
    weather: 'More rain fade than Ku',
  },
  {
    band: 'Higher (e.g. V/E)',
    range: 'tens of GHz+',
    role: 'Extra capacity where authorized',
    weather: 'Even more moisture attenuation',
  },
]

/**
 * Public band classes for LEO broadband — roles as design patterns, not channel maps.
 */
export function SpectrumBandsCard() {
  return (
    <Figure
      caption="Higher frequency → more bandwidth potential, more rain fade. Exact operator channel plans are regulatory detail — learn the pattern."
      credit="ESA satellite frequency bands · public architecture pattern only"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[28rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs tracking-wide text-ink-faint uppercase">
              <th className="py-2 pr-3 font-medium">Band class</th>
              <th className="py-2 pr-3 font-medium">Approx.</th>
              <th className="py-2 pr-3 font-medium">Typical role</th>
              <th className="py-2 font-medium">Weather</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.band} className="border-b border-line last:border-0">
                <td className="py-3 pr-3 font-semibold text-ink">{r.band}</td>
                <td className="py-3 pr-3 font-mono text-xs text-ink-muted">{r.range}</td>
                <td className="py-3 pr-3 text-ink-muted">{r.role}</td>
                <td className="py-3 text-ink-muted">{r.weather}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Figure>
  )
}
