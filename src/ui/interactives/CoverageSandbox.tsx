import { useMemo, useState } from 'react'
import { DEFAULT_LAB_PARAMS } from '@/sim/constants'
import { evaluateCoverage } from '@/sim/coverage'
import { generateConstellation, totalSatellites } from '@/sim/constellation'
import { orbitalPeriodMinutes } from '@/sim/orbit'
import { labPath } from '@/lib/labParams'
import { Link } from 'react-router-dom'

/**
 * In-lesson density sandbox: sample coverage over time without loading WebGL.
 */
export function CoverageSandbox() {
  const [planes, setPlanes] = useState(8)
  const [satsPerPlane, setSatsPerPlane] = useState(12)
  const [altitudeKm, setAltitudeKm] = useState(550)
  const [userLatDeg, setUserLatDeg] = useState(40)

  const result = useMemo(() => {
    const params = {
      ...DEFAULT_LAB_PARAMS,
      planes,
      satsPerPlane,
      altitudeKm,
      userLatDeg,
    }
    const samples = 48
    const period = orbitalPeriodMinutes(altitudeKm) * 60
    let online = 0
    let handoffs = 0
    let last: string | null = null
    for (let i = 0; i < samples; i++) {
      const t = (period * i) / samples
      const c = evaluateCoverage(params, generateConstellation(params, t))
      if (c.online) online += 1
      if (c.servingSatId && last && c.servingSatId !== last) handoffs += 1
      if (c.servingSatId) last = c.servingSatId
      if (!c.online) last = null
    }
    return {
      total: totalSatellites(params),
      onlinePct: (online / samples) * 100,
      handoffs,
      periodMin: period / 60,
      params,
    }
  }, [planes, satsPerPlane, altitudeKm, userLatDeg])

  return (
    <section className="my-8 rounded-xl border border-space-600 bg-space-900/80 p-5">
      <h3 className="mb-1 text-sm font-semibold tracking-widest text-accent uppercase">
        Interactive: coverage sandbox
      </h3>
      <p className="mb-4 text-xs text-slate-400">
        Samples one orbital period for a fixed user. Online % is geometric (elevation mask) —
        not full RF capacity.
      </p>

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <Slider label="Planes" value={planes} min={1} max={36} onChange={setPlanes} />
        <Slider
          label="Sats / plane"
          value={satsPerPlane}
          min={1}
          max={40}
          onChange={setSatsPerPlane}
        />
        <Slider
          label="Altitude (km)"
          value={altitudeKm}
          min={300}
          max={1200}
          step={10}
          onChange={setAltitudeKm}
        />
        <Slider
          label="User latitude (°)"
          value={userLatDeg}
          min={-70}
          max={70}
          onChange={setUserLatDeg}
        />
      </div>

      <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
        <Tile label="Satellites" value={String(result.total)} />
        <Tile
          label="Online sample %"
          value={`${result.onlinePct.toFixed(0)}%`}
          accent={result.onlinePct > 95 ? 'signal' : result.onlinePct > 50 ? 'accent' : 'warn'}
        />
        <Tile label="Handoffs / period" value={String(result.handoffs)} />
        <Tile label="Period" value={`${result.periodMin.toFixed(1)} min`} />
      </dl>

      <div className="mt-4 h-3 overflow-hidden rounded-full bg-space-800">
        <div
          className="h-full rounded-full bg-signal transition-all"
          style={{ width: `${result.onlinePct}%` }}
        />
      </div>

      <p className="mt-4 text-xs text-slate-400">
        <Link
          to={labPath(result.params)}
          className="font-medium text-accent hover:text-white"
        >
          Open these settings in the 3D lab →
        </Link>
      </p>
    </section>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step?: number
  onChange: (n: number) => void
}) {
  return (
    <label className="block text-xs text-slate-400">
      <div className="mb-1 flex justify-between">
        <span>{label}</span>
        <span className="font-mono text-slate-200">{value}</span>
      </div>
      <input
        type="range"
        className="w-full accent-accent"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}

function Tile({
  label,
  value,
  accent,
}: {
  label: string
  value: string
  accent?: 'signal' | 'accent' | 'warn'
}) {
  const c =
    accent === 'signal'
      ? 'text-signal'
      : accent === 'warn'
        ? 'text-warn'
        : accent === 'accent'
          ? 'text-accent'
          : 'text-slate-100'
  return (
    <div className="rounded-lg border border-space-800 bg-space-950/50 px-3 py-2">
      <dt className="text-xs text-slate-500">{label}</dt>
      <dd className={`font-mono text-lg ${c}`}>{value}</dd>
    </div>
  )
}
