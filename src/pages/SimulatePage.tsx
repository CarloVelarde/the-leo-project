import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LAB_PARAM_RANGES } from '@/sim/constants'
import { computeInsights } from '@/sim/insights'
import { SCENARIOS } from '@/sim/scenarios'
import type { LabParams } from '@/sim/types'
import { labParamsFromSearch, labParamsToSearch } from '@/lib/labParams'
import { ConstellationScene } from '@/three/ConstellationScene'
import { AssumptionsDrawer } from '@/ui/AssumptionsDrawer'
import { InsightPanel } from '@/ui/InsightPanel'

export function SimulatePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useMemo(
    () => labParamsFromSearch(searchParams.toString()),
    [searchParams],
  )
  const insights = useMemo(() => computeInsights(params, 0), [params])

  function update(partial: Partial<LabParams>) {
    const next = { ...params, ...partial }
    setSearchParams(labParamsToSearch(next), { replace: true })
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-white">Constellation lab</h1>
          <p className="text-slate-400">
            Change density and altitude. Watch coverage and latency estimates update.
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setSearchParams(labParamsToSearch(s.params), { replace: true })}
            className="rounded-full border border-space-600 px-3 py-1 text-xs text-slate-300 hover:border-accent hover:text-white"
            title={s.description}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="overflow-hidden rounded-2xl border border-space-700 bg-space-900">
          <div className="h-[min(60vh,520px)]">
            <ConstellationScene params={params} />
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <InsightPanel params={params} insights={insights} />
          <Controls params={params} onChange={update} />
          <AssumptionsDrawer />
        </div>
      </div>
    </div>
  )
}

function Controls({
  params,
  onChange,
}: {
  params: LabParams
  onChange: (partial: Partial<LabParams>) => void
}) {
  return (
    <div className="rounded-xl border border-space-700 bg-space-900/90 p-4">
      <h2 className="mb-3 text-xs font-semibold tracking-widest text-slate-400 uppercase">
        Controls
      </h2>
      <div className="space-y-3">
        <Slider
          label="Planes"
          value={params.planes}
          {...LAB_PARAM_RANGES.planes}
          onChange={(planes) => onChange({ planes })}
        />
        <Slider
          label="Sats / plane"
          value={params.satsPerPlane}
          {...LAB_PARAM_RANGES.satsPerPlane}
          onChange={(satsPerPlane) => onChange({ satsPerPlane })}
        />
        <Slider
          label="Altitude (km)"
          value={params.altitudeKm}
          {...LAB_PARAM_RANGES.altitudeKm}
          onChange={(altitudeKm) => onChange({ altitudeKm })}
        />
        <Slider
          label="Inclination (°)"
          value={params.inclinationDeg}
          {...LAB_PARAM_RANGES.inclinationDeg}
          onChange={(inclinationDeg) => onChange({ inclinationDeg })}
        />
        <Slider
          label="Min elevation (°)"
          value={params.minElevationDeg}
          {...LAB_PARAM_RANGES.minElevationDeg}
          onChange={(minElevationDeg) => onChange({ minElevationDeg })}
        />
        <Slider
          label="User latitude (°)"
          value={params.userLatDeg}
          {...LAB_PARAM_RANGES.userLatDeg}
          onChange={(userLatDeg) => onChange({ userLatDeg })}
        />
        <Slider
          label="Time scale"
          value={params.timeScale}
          {...LAB_PARAM_RANGES.timeScale}
          onChange={(timeScale) => onChange({ timeScale })}
        />
      </div>
    </div>
  )
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  step: number
  onChange: (n: number) => void
}) {
  return (
    <label className="block text-xs text-slate-400">
      <div className="mb-1 flex justify-between gap-2">
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
