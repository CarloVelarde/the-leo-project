import { useEffect, useMemo, useState } from 'react'
import { DEFAULT_LAB_PARAMS } from '@/sim/constants'
import { evaluateCoverage } from '@/sim/coverage'
import { generateConstellation } from '@/sim/constellation'
import { Figure } from './Figure'

export function HandoffDemo() {
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [dense, setDense] = useState(false)

  const params = useMemo(
    () => ({
      ...DEFAULT_LAB_PARAMS,
      planes: dense ? 18 : 4,
      satsPerPlane: dense ? 30 : 6,
      altitudeKm: 550,
      userLatDeg: 40,
      timeScale: 1,
    }),
    [dense],
  )

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => setT((x) => x + 15), 200)
    return () => window.clearInterval(id)
  }, [playing])

  const coverage = useMemo(() => {
    const sats = generateConstellation(params, t)
    return evaluateCoverage(params, sats)
  }, [params, t])

  const history = useMemo(() => {
    const pts: { t: number; online: boolean; sat: string | null }[] = []
    for (let i = 0; i < 40; i++) {
      const ti = Math.max(0, t - (39 - i) * 15)
      const c = evaluateCoverage(params, generateConstellation(params, ti))
      pts.push({ t: ti, online: c.online, sat: c.servingSatId })
    }
    return pts
  }, [params, t])

  let handoffs = 0
  for (let i = 1; i < history.length; i++) {
    if (history[i]!.sat && history[i]!.sat !== history[i - 1]!.sat && history[i - 1]!.sat) {
      handoffs += 1
    }
  }

  return (
    <Figure
      caption="Serving satellite over sim-time. Toggle density to see gaps vs frequent handoffs."
      credit="Same circular-orbit model as the 3D lab"
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <Btn onClick={() => setPlaying((p) => !p)}>{playing ? 'Pause' : 'Play'}</Btn>
        <Btn onClick={() => setDense((d) => !d)}>
          {dense ? 'Switch to sparse' : 'Switch to dense'}
        </Btn>
      </div>

      <div className="mb-3 flex flex-wrap gap-4 text-xs text-ink-muted">
        <span>
          Status:{' '}
          <span className="font-medium text-ink">
            {coverage.online ? 'Online' : 'Offline'}
          </span>
        </span>
        <span className="font-mono">sat: {coverage.servingSatId ?? '—'}</span>
        <span>
          elev:{' '}
          <span className="font-mono">
            {coverage.servingElevationDeg?.toFixed(0) ?? '—'}°
          </span>
        </span>
        <span>
          handoffs: <span className="font-mono">{handoffs}</span>
        </span>
      </div>

      <div className="flex h-10 items-end gap-0.5">
        {history.map((h, i) => (
          <div
            key={i}
            title={h.sat ?? 'offline'}
            className="min-w-0 flex-1 rounded-sm"
            style={{
              height: h.online ? '100%' : '30%',
              background: h.online ? colorForSat(h.sat) : '#d4d4d4',
              opacity: h.online ? 0.9 : 0.5,
            }}
          />
        ))}
      </div>
      <div className="mt-1 flex justify-between text-[10px] text-ink-faint">
        <span>past</span>
        <span>sim t ≈ {t.toFixed(0)} s</span>
        <span>now</span>
      </div>
    </Figure>
  )
}

function Btn({ onClick, children }: { onClick: () => void; children: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-full border border-line px-3 py-1 text-xs text-ink hover:border-ink"
    >
      {children}
    </button>
  )
}

function colorForSat(id: string | null): string {
  if (!id) return '#a3a3a3'
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h + id.charCodeAt(i) * 17) % 360
  return `hsl(${h} 8% 35%)`
}
