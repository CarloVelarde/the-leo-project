import type { LabParams, SimInsights } from '@/sim/types'

type InsightPanelProps = {
  params: LabParams
  insights: SimInsights
}

export function InsightPanel({ params, insights }: InsightPanelProps) {
  const { coverage } = insights

  return (
    <aside className="rounded-xl border border-space-700 bg-space-900/90 p-4 text-sm shadow-lg backdrop-blur">
      <h2 className="mb-3 text-xs font-semibold tracking-widest text-slate-400 uppercase">
        Live insights
      </h2>
      <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
        <Stat label="Satellites" value={String(insights.totalSatellites)} />
        <Stat label="Planes" value={`${params.planes} × ${params.satsPerPlane}`} />
        <Stat label="Altitude" value={`${params.altitudeKm} km`} />
        <Stat label="Period" value={`${insights.orbitalPeriodMin.toFixed(1)} min`} />
        <Stat label="Orbital speed" value={`${insights.orbitalSpeedKms.toFixed(2)} km/s`} />
        <Stat label="Sats in view" value={String(coverage.satsInView)} />
        <Stat
          label="Link"
          value={coverage.online ? 'Online' : 'Offline'}
          accent={coverage.online ? 'signal' : 'warn'}
        />
        <Stat
          label="One-way light"
          value={
            coverage.oneWayLatencyMs != null
              ? `${coverage.oneWayLatencyMs.toFixed(2)} ms`
              : '—'
          }
        />
      </dl>
      <p className="mt-3 text-xs text-slate-500">
        Geometric model: circular orbits, elevation mask {params.minElevationDeg}°. Not full RF.
      </p>
    </aside>
  )
}

function Stat({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: 'signal' | 'warn'
}) {
  const valueClass =
    accent === 'signal'
      ? 'text-signal'
      : accent === 'warn'
        ? 'text-warn'
        : 'text-slate-100'

  return (
    <div>
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className={`font-mono text-sm ${valueClass}`}>{value}</dd>
    </div>
  )
}
