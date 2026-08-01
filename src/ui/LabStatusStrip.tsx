import type { LabParams, LiveSimStats } from '@/sim/types'

type LabStatusStripProps = {
  params: LabParams
  stats: LiveSimStats | null
}

/**
 * Plain-language “what is happening now” under the viewport — not a wall of numbers.
 */
export function LabStatusStrip({ params, stats }: LabStatusStripProps) {
  const online = stats?.coverage.online ?? false
  const sat = stats?.coverage.servingSatId
  const inView = stats?.coverage.satsInView ?? 0
  const elev = stats?.coverage.servingElevationDeg
  const handoffs = stats?.handoffCount ?? 0
  const flash = stats?.handoffFlash ?? false
  const total = params.planes * params.satsPerPlane

  let headline: string
  if (flash) {
    headline = 'Handoff — the dish just switched to a new serving satellite.'
  } else if (online && sat) {
    headline = `Online — linked to ${sat} (${inView} sat${inView === 1 ? '' : 's'} in view).`
  } else {
    headline = 'Offline — no satellite is high enough above the horizon for this user.'
  }

  return (
    <div className="rounded-b-xl border border-t-0 border-line bg-paper px-4 py-3 sm:px-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[10px] font-semibold tracking-[0.18em] text-ink-faint uppercase">
            What is happening
          </p>
          <p className="mt-1 text-sm font-medium text-ink">{headline}</p>
          <p className="mt-1 text-xs text-ink-muted">
            {total} satellites · {params.planes} planes · {params.altitudeKm} km altitude
            {elev != null ? ` · elevation ${elev.toFixed(0)}°` : ''}
            {handoffs > 0 ? ` · ${handoffs} handoff${handoffs === 1 ? '' : 's'} this run` : ''}
          </p>
        </div>
        <div
          className={[
            'shrink-0 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide uppercase',
            online
              ? 'bg-ink text-paper'
              : 'border border-line text-ink-muted',
          ].join(' ')}
        >
          {flash ? 'Handoff' : online ? 'Online' : 'Offline'}
        </div>
      </div>
      <p className="mt-2 text-[11px] text-ink-faint">
        Drag to rotate · scroll to zoom · orange = ground user · green line = active link
      </p>
    </div>
  )
}
