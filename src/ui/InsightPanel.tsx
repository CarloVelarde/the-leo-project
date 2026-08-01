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
    return `${h}h ${m % 60}m`
  }
  const remStr = rem < 10 ? `0${rem.toFixed(1)}` : rem.toFixed(1)
  return `${m}:${remStr}`
}

export function InsightPanel({ params, stats }: InsightPanelProps) {
  const coverage = stats?.coverage
  const online = coverage?.online ?? false
  const flashing = stats?.handoffFlash ?? false

  return (
    <aside
      className={[
        'rounded-lg border bg-paper p-4 text-sm transition-colors',
        flashing ? 'border-ink' : 'border-line',
      ].join(' ')}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <h2 className="text-[10px] font-semibold tracking-[0.2em] text-ink-faint uppercase">
          Live insights
        </h2>
        <span className="rounded-full border border-line px-2 py-0.5 text-[10px] font-semibold tracking-wide text-ink uppercase">
          {flashing ? 'Handoff' : online ? 'Online' : 'Offline'}
        </span>
      </div>

      <dl className="grid grid-cols-2 gap-x-3 gap-y-2">
        <Stat label="Satellites" value={String(stats?.totalSatellites ?? params.planes * params.satsPerPlane)} />
        <Stat label="Planes" value={`${params.planes} × ${params.satsPerPlane}`} />
        <Stat label="Altitude" value={`${params.altitudeKm} km`} />
        <Stat label="Period" value={stats ? `${stats.orbitalPeriodMin.toFixed(1)} min` : '—'} />
        <Stat label="Orbital speed" value={stats ? `${stats.orbitalSpeedKms.toFixed(2)} km/s` : '—'} />
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
        <Stat label="Sim time" value={stats ? formatSimClock(stats.simTimeSeconds) : '0:00.0'} />
        <Stat label="Time scale" value={`${params.timeScale}×`} />
      </dl>

      <p className="mt-3 text-xs text-ink-faint">
        Geometric model: circular orbits, elevation mask {params.minElevationDeg}°. Not full RF.
      </p>
    </aside>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-ink-faint">{label}</dt>
      <dd className="font-mono text-sm text-ink">{value}</dd>
    </div>
  )
}
