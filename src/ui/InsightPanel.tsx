import type { LabParams, LiveSimStats } from '@/sim/types'

type InsightPanelProps = {
  params: LabParams
  stats: LiveSimStats | null
}

function formatSimClock(seconds: number): string {
  const s = Math.max(0, seconds)
  const m = Math.floor(s / 60)
  const rem = s - m * 60
  if (m >= 60) {
    const h = Math.floor(m / 60)
    const mm = m % 60
    return `${h}h ${mm}m`
  }
  return `${m}:${rem.toFixed(1).padStart(4, '0')}`
}

export function InsightPanel({ params, stats }: InsightPanelProps) {
  const coverage = stats?.coverage
  const online = coverage?.online ?? false

  return (
    <aside className="rounded-xl border border-space-700 bg-space-900/90 p-4 text-sm shadow-lg backdrop-blur">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">
          Live insights
        </h2>
        <span
          className={[
            'rounded-full px-2 py-0.5 text-[10px] font-semibold tracking-wide uppercase',
            online
              ? 'bg-signal/15 text-signal'
              : 'bg-warn/15 text-warn',
          ].join(' ')}
        >
          {online ? 'Online' : 'Offline'}
        </span>
      </div>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
        <Stat label="Satellites" value={String(stats?.totalSatellites ?? params.planes * params.satsPerPlane)} />
        <Stat label="Planes" value={`${params.planes} × ${params.satsPerPlane}`} />
        <Stat label="Altitude" value={`${params.altitudeKm} km`} />
        <Stat
          label="Period"
          value={stats ? `${stats.orbitalPeriodMin.toFixed(1)} min` : '—'}
        />
        <Stat
          label="Orbital speed"
          value={stats ? `${stats.orbitalSpeedKms.toFixed(2)} km/s` : '—'}
        />
        <Stat label="Sats in view" value={coverage ? String(coverage.satsInView) : '—'} />
        <Stat
          label="Elevation"
          value={
            coverage?.servingElevationDeg != null
              ? `${coverage.servingElevationDeg.toFixed(1)}°`
              : '—'
          }
        />
        <Stat
          label="Slant range"
          value={coverage?.rangeKm != null ? `${coverage.rangeKm.toFixed(0)} km` : '—'}
        />
        <Stat
          label="One-way light"
          value={
            coverage?.oneWayLatencyMs != null
              ? `${coverage.oneWayLatencyMs.toFixed(2)} ms`
              : '—'
          }
        />
        <Stat label="Serving sat" value={coverage?.servingSatId ?? '—'} />
        <Stat label="Handoffs" value={stats ? String(stats.handoffCount) : '0'} />
        <Stat
          label="Handoffs / min"
          value={
            stats?.handoffsPerSimMinute != null
              ? stats.handoffsPerSimMinute.toFixed(2)
              : '…'
          }
        />
        <Stat
          label="Sim time"
          value={stats ? formatSimClock(stats.simTimeSeconds) : '0:00.0'}
        />
        <Stat
          label="Time scale"
          value={`${params.timeScale}×`}
        />
      </dl>

      <p className="mt-3 text-xs text-slate-500">
        Geometric model: circular orbits, elevation mask {params.minElevationDeg}°. Not full RF.
        Handoff rate uses sim-time (not wall clock).
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
