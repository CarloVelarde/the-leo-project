import { useMemo, useState } from 'react'
import { C_KM_S, EARTH_RADIUS_KM, GEO_ALTITUDE_KM } from '@/sim/constants'
import { oneWayLightTimeMs, orbitalPeriodMinutes } from '@/sim/orbit'

export function LatencyCompare() {
  const [altitudeKm, setAltitudeKm] = useState(550)
  const [includeReturn, setIncludeReturn] = useState(true)

  const stats = useMemo(() => {
    const oneWay = oneWayLightTimeMs(altitudeKm)
    const geoOneWay = oneWayLightTimeMs(GEO_ALTITUDE_KM)
    const factor = includeReturn ? 2 : 1
    return {
      light: oneWay * factor,
      geoLight: geoOneWay * factor,
      periodMin: orbitalPeriodMinutes(altitudeKm),
      ratio: (geoOneWay * factor) / (oneWay * factor),
    }
  }, [altitudeKm, includeReturn])

  const maxAlt = 2000
  const barPct = Math.min(100, (altitudeKm / maxAlt) * 100)

  return (
    <section className="my-6 rounded-lg border border-line bg-paper px-5 py-5">
      <h3 className="mb-1 text-[10px] font-semibold tracking-[0.2em] text-ink-faint uppercase">
        Interactive · altitude vs light-time
      </h3>
      <p className="mb-4 text-xs text-ink-muted">
        Pure propagation only. GEO fixed at {GEO_ALTITUDE_KM.toLocaleString()} km for comparison.
      </p>

      <label className="mb-4 block text-xs text-ink-muted">
        <div className="mb-1 flex justify-between">
          <span>Satellite altitude</span>
          <span className="font-mono text-ink">{altitudeKm} km</span>
        </div>
        <input
          type="range"
          min={200}
          max={maxAlt}
          step={10}
          value={altitudeKm}
          onChange={(e) => setAltitudeKm(Number(e.target.value))}
          className="w-full accent-ink"
        />
      </label>

      <label className="mb-5 flex cursor-pointer items-center gap-2 text-xs text-ink-muted">
        <input
          type="checkbox"
          className="accent-ink"
          checked={includeReturn}
          onChange={(e) => setIncludeReturn(e.target.checked)}
        />
        Count round-trip on the same path (×2)
      </label>

      <div className="space-y-3 text-sm">
        <Bar
          label={`Your altitude (${includeReturn ? 'RT' : 'one-way'})`}
          value={`${stats.light.toFixed(2)} ms`}
          pct={barPct}
        />
        <Bar
          label={`GEO reference (${includeReturn ? 'RT' : 'one-way'})`}
          value={`${stats.geoLight.toFixed(0)} ms`}
          pct={100}
          inverse
        />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
        <Stat label="Period (approx.)" value={`${stats.periodMin.toFixed(1)} min`} />
        <Stat label="GEO / your light-time" value={`${stats.ratio.toFixed(0)}×`} />
        <Stat label="Earth radius" value={`${EARTH_RADIUS_KM} km`} />
      </dl>
      <p className="mt-3 text-[11px] text-ink-faint">
        c = {C_KM_S.toLocaleString()} km/s · matches lab circular-orbit model
      </p>
    </section>
  )
}

function Bar({
  label,
  value,
  pct,
  inverse,
}: {
  label: string
  value: string
  pct: number
  inverse?: boolean
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-ink-muted">{label}</span>
        <span className="font-mono text-ink">{value}</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-paper-elevated">
        <div
          className={`h-full rounded-full ${inverse ? 'bg-ink-faint' : 'bg-ink'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md border border-line bg-paper-elevated px-3 py-2">
      <dt className="text-ink-faint">{label}</dt>
      <dd className="font-mono text-ink">{value}</dd>
    </div>
  )
}
