import { useMemo, useState } from 'react'
import { C_KM_S, EARTH_RADIUS_KM, GEO_ALTITUDE_KM } from '@/sim/constants'
import { oneWayLightTimeMs, orbitalPeriodMinutes } from '@/sim/orbit'

/** Interactive altitude → light-time / period explorer for lessons. */
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
      geoPeriodH: orbitalPeriodMinutes(GEO_ALTITUDE_KM) / 60,
      ratio: (geoOneWay * factor) / (oneWay * factor),
    }
  }, [altitudeKm, includeReturn])

  const maxAlt = 2000
  const barPct = Math.min(100, (altitudeKm / maxAlt) * 100)
  const geoBarPct = 100

  return (
    <section className="my-8 rounded-xl border border-space-600 bg-space-900/80 p-5">
      <h3 className="mb-1 text-sm font-semibold tracking-widest text-accent uppercase">
        Interactive: altitude vs light-time
      </h3>
      <p className="mb-4 text-xs text-slate-400">
        Pure propagation only (speed of light in vacuum). Real RTT also includes processing,
        routing, and gateways. GEO fixed at {GEO_ALTITUDE_KM.toLocaleString()} km for comparison.
      </p>

      <label className="mb-4 block text-xs text-slate-400">
        <div className="mb-1 flex justify-between">
          <span>Satellite altitude</span>
          <span className="font-mono text-slate-200">{altitudeKm} km</span>
        </div>
        <input
          type="range"
          min={200}
          max={maxAlt}
          step={10}
          value={altitudeKm}
          onChange={(e) => setAltitudeKm(Number(e.target.value))}
          className="w-full accent-accent"
        />
      </label>

      <label className="mb-5 flex cursor-pointer items-center gap-2 text-xs text-slate-300">
        <input
          type="checkbox"
          className="accent-accent"
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
          color="bg-signal"
        />
        <Bar
          label={`GEO reference (${includeReturn ? 'RT' : 'one-way'})`}
          value={`${stats.geoLight.toFixed(0)} ms`}
          pct={geoBarPct}
          color="bg-warn"
        />
      </div>

      <dl className="mt-5 grid grid-cols-2 gap-3 text-xs sm:grid-cols-3">
        <Stat label="Orbital period (approx.)" value={`${stats.periodMin.toFixed(1)} min`} />
        <Stat label="GEO / your light-time" value={`${stats.ratio.toFixed(0)}×`} />
        <Stat
          label="Earth radius (ref)"
          value={`${EARTH_RADIUS_KM} km`}
        />
      </dl>
      <p className="mt-3 text-[11px] text-slate-500">
        c = {C_KM_S.toLocaleString()} km/s · circular-orbit period model matches the lab.
      </p>
    </section>
  )
}

function Bar({
  label,
  value,
  pct,
  color,
}: {
  label: string
  value: string
  pct: number
  color: string
}) {
  return (
    <div>
      <div className="mb-1 flex justify-between text-xs">
        <span className="text-slate-400">{label}</span>
        <span className="font-mono text-slate-100">{value}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-space-800">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-space-800 bg-space-950/50 px-3 py-2">
      <dt className="text-slate-500">{label}</dt>
      <dd className="font-mono text-slate-100">{value}</dd>
    </div>
  )
}
