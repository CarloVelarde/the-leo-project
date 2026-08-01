import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { LAB_PARAM_RANGES } from '@/sim/constants'
import { computeInsights } from '@/sim/insights'
import { SCENARIOS } from '@/sim/scenarios'
import type {
  CameraMode,
  LabParams,
  LiveSimStats,
  SceneDisplayOptions,
} from '@/sim/types'
import { labParamsFromSearch, labParamsToSearch } from '@/lib/labParams'
import { ConstellationScene } from '@/three/ConstellationScene'
import { AssumptionsDrawer } from '@/ui/AssumptionsDrawer'
import { InsightPanel } from '@/ui/InsightPanel'
import { SceneLegend } from '@/ui/SceneLegend'

const DEFAULT_DISPLAY: SceneDisplayOptions = {
  showOrbitRings: true,
  showFootprint: true,
  showLink: true,
  showInViewHighlight: true,
  showGroundTrack: true,
}

export function SimulatePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const params = useMemo(
    () => labParamsFromSearch(searchParams.toString()),
    [searchParams],
  )

  const [stats, setStats] = useState<LiveSimStats | null>(() => ({
    ...computeInsights(params, 0),
    simTimeSeconds: 0,
    handoffCount: 0,
    handoffsPerSimMinute: null,
    paused: false,
    handoffFlash: false,
  }))
  const [paused, setPaused] = useState(false)
  const [resetToken, setResetToken] = useState(0)
  const [cameraMode, setCameraMode] = useState<CameraMode>('free')
  const [display, setDisplay] = useState<SceneDisplayOptions>(DEFAULT_DISPLAY)

  const onStats = useCallback((next: LiveSimStats) => {
    setStats(next)
  }, [])

  function update(partial: Partial<LabParams>) {
    setSearchParams(labParamsToSearch({ ...params, ...partial }), { replace: true })
  }

  function toggleDisplay(key: keyof SceneDisplayOptions) {
    setDisplay((d) => ({ ...d, [key]: !d[key] }))
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Constellation lab
          </h1>
          <p className="mt-2 text-ink-muted">
            Density, altitude, coverage, and handoffs — live.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <GhostBtn onClick={() => setPaused((p) => !p)}>
            {paused ? 'Resume' : 'Pause'}
          </GhostBtn>
          <GhostBtn onClick={() => setResetToken((n) => n + 1)}>Reset time</GhostBtn>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => {
              setSearchParams(labParamsToSearch(s.params), { replace: true })
              setResetToken((n) => n + 1)
            }}
            className="rounded-full border border-line px-3 py-1 text-xs text-ink-muted hover:border-ink hover:text-ink"
            title={s.description}
          >
            {s.title}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="relative overflow-hidden rounded-xl border border-line bg-black">
          <div className="absolute top-3 right-3 z-10 flex flex-wrap justify-end gap-1">
            {(
              [
                ['free', 'Free'],
                ['user', 'User'],
                ['serving', 'Sat'],
              ] as const
            ).map(([mode, label]) => (
              <button
                key={mode}
                type="button"
                onClick={() => setCameraMode(mode)}
                className={[
                  'rounded-full px-2.5 py-1 text-[11px] font-medium',
                  cameraMode === mode
                    ? 'bg-white text-black'
                    : 'border border-white/30 bg-black/50 text-white/80 hover:border-white/60',
                ].join(' ')}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="h-[min(62vh,560px)]">
            <ConstellationScene
              params={params}
              mode="lab"
              paused={paused}
              resetToken={resetToken}
              cameraMode={cameraMode}
              display={display}
              onStats={onStats}
            />
          </div>
          <SceneLegend />
          <p className="border-t border-white/10 px-4 py-2 text-xs text-white/50">
            Drag to orbit · scroll to zoom · green link · orange ground track
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <InsightPanel params={params} stats={stats} />
          <DisplayToggles display={display} onToggle={toggleDisplay} />
          <Controls params={params} onChange={update} />
          <AssumptionsDrawer />
        </div>
      </div>
    </div>
  )
}

function GhostBtn({ onClick, children }: { onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-line px-4 py-2 text-xs font-medium text-ink hover:border-ink"
    >
      {children}
    </button>
  )
}

function DisplayToggles({
  display,
  onToggle,
}: {
  display: SceneDisplayOptions
  onToggle: (key: keyof SceneDisplayOptions) => void
}) {
  const items: { key: keyof SceneDisplayOptions; label: string }[] = [
    { key: 'showOrbitRings', label: 'Orbit rings' },
    { key: 'showFootprint', label: 'Coverage footprint' },
    { key: 'showLink', label: 'User link' },
    { key: 'showInViewHighlight', label: 'Highlight in-view' },
    { key: 'showGroundTrack', label: 'Ground track' },
  ]

  return (
    <div className="rounded-lg border border-line bg-paper p-4">
      <h2 className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-ink-faint uppercase">
        Display
      </h2>
      <div className="flex flex-col gap-2">
        {items.map(({ key, label }) => (
          <label key={key} className="flex cursor-pointer items-center gap-2 text-xs text-ink-muted">
            <input
              type="checkbox"
              className="accent-ink"
              checked={display[key]}
              onChange={() => onToggle(key)}
            />
            {label}
          </label>
        ))}
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
    <div className="rounded-lg border border-line bg-paper p-4">
      <h2 className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-ink-faint uppercase">
        Controls
      </h2>
      <div className="space-y-3">
        <Slider label="Planes" value={params.planes} {...LAB_PARAM_RANGES.planes} onChange={(planes) => onChange({ planes })} />
        <Slider label="Sats / plane" value={params.satsPerPlane} {...LAB_PARAM_RANGES.satsPerPlane} onChange={(satsPerPlane) => onChange({ satsPerPlane })} />
        <Slider label="Altitude (km)" value={params.altitudeKm} {...LAB_PARAM_RANGES.altitudeKm} onChange={(altitudeKm) => onChange({ altitudeKm })} />
        <Slider label="Inclination (°)" value={params.inclinationDeg} {...LAB_PARAM_RANGES.inclinationDeg} onChange={(inclinationDeg) => onChange({ inclinationDeg })} />
        <Slider label="Min elevation (°)" value={params.minElevationDeg} {...LAB_PARAM_RANGES.minElevationDeg} onChange={(minElevationDeg) => onChange({ minElevationDeg })} />
        <Slider label="User latitude (°)" value={params.userLatDeg} {...LAB_PARAM_RANGES.userLatDeg} onChange={(userLatDeg) => onChange({ userLatDeg })} />
        <Slider label="User longitude (°)" value={params.userLonDeg} {...LAB_PARAM_RANGES.userLonDeg} onChange={(userLonDeg) => onChange({ userLonDeg })} />
        <Slider label="Time scale" value={params.timeScale} {...LAB_PARAM_RANGES.timeScale} onChange={(timeScale) => onChange({ timeScale })} />
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
    <label className="block text-xs text-ink-muted">
      <div className="mb-1 flex justify-between gap-2">
        <span>{label}</span>
        <span className="font-mono text-ink">{value}</span>
      </div>
      <input
        type="range"
        className="w-full accent-ink"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
    </label>
  )
}
