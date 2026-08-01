import { useEffect, useState } from 'react'
import type { LabParams } from '@/sim/types'
import { labParamsToSearch } from '@/lib/labParams'
import { DEFAULT_LAB_PARAMS } from '@/sim/constants'

const STORAGE_KEY = 'starlink-edu:lab-coach-done'

export type LabCoachAction =
  | { type: 'applyParams'; params: Partial<LabParams> }
  | { type: 'setCamera'; mode: 'free' | 'user' | 'serving' }
  | { type: 'highlight'; target: 'scenarios' | 'insights' | 'controls' | 'display' | null }

type Step = {
  id: string
  title: string
  body: string
  action?: LabCoachAction
  cta?: string
}

const STEPS: Step[] = [
  {
    id: 'welcome',
    title: 'What you are looking at',
    body: 'The globe is Earth. Dots are satellites. The orange marker is a ground user (like a Starlink dish). A green line means that user has a link to a serving satellite.',
    cta: 'Got it',
  },
  {
    id: 'look',
    title: 'Drag the sky',
    body: 'Click and drag on the globe to rotate the camera. Scroll to zoom. Use Free cam / Follow user / Follow sat in the top-right of the viewport to change framing.',
    action: { type: 'setCamera', mode: 'free' },
    cta: 'Next',
  },
  {
    id: 'online',
    title: 'Watch Online vs Offline',
    body: 'Under the globe, “What is happening” says whether the user is Online. If no satellite is high enough above the horizon, the link drops. We will load a sparse constellation so gaps are obvious.',
    action: {
      type: 'applyParams',
      params: { planes: 3, satsPerPlane: 5, altitudeKm: 550, timeScale: 90 },
    },
    cta: 'Load sparse sky',
  },
  {
    id: 'dense',
    title: 'Fill the sky',
    body: 'More planes and satellites close the gaps — but handoffs become more frequent as the serving sat keeps changing. Try a denser shell now and watch the status strip.',
    action: {
      type: 'applyParams',
      params: { planes: 18, satsPerPlane: 28, altitudeKm: 550, timeScale: 70 },
    },
    cta: 'Load dense shell',
  },
  {
    id: 'altitude',
    title: 'Altitude changes physics',
    body: 'Use the Altitude slider on the right: orbital period and light-time estimates in Live insights change. Higher sats see more ground but add delay.',
    action: { type: 'highlight', target: 'controls' },
    cta: 'Next',
  },
  {
    id: 'experiments',
    title: 'Use experiments anytime',
    body: 'The “Try an experiment” chips above the globe are guided starting points. Reopen this guide with “How this lab works” whenever you need a refresher.',
    action: { type: 'highlight', target: 'scenarios' },
    cta: 'Start exploring',
  },
]

type LabCoachProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  onAction: (action: LabCoachAction) => void
}

export function LabCoach({ open, onOpenChange, onAction }: LabCoachProps) {
  const [step, setStep] = useState(0)

  useEffect(() => {
    if (open) setStep(0)
  }, [open])

  function finish() {
    onOpenChange(false)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
    onAction({ type: 'highlight', target: null })
  }

  function advance() {
    const current = STEPS[step]!
    if (current.action) onAction(current.action)

    if (step >= STEPS.length - 1) {
      finish()
      return
    }
    setStep((s) => s + 1)
  }

  if (!open) return null

  const s = STEPS[step]!

  return (
    <div className="mb-6 rounded-xl border border-line bg-paper p-5 shadow-sm">
      <div className="mb-1 h-1 w-full overflow-hidden rounded-full bg-paper-elevated">
        <div
          className="h-full bg-ink transition-all duration-300"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.2em] text-ink-faint uppercase">
            Lab guide · {step + 1}/{STEPS.length}
          </p>
          <h2 className="mt-1 text-lg font-semibold tracking-tight text-ink">{s.title}</h2>
        </div>
        <button type="button" onClick={finish} className="text-xs text-ink-faint hover:text-ink">
          Skip
        </button>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={advance}
          className="rounded-full bg-inverse px-5 py-2 text-sm font-medium text-paper hover:opacity-90"
        >
          {s.cta ?? 'Next'}
        </button>
        {step > 0 ? (
          <button
            type="button"
            onClick={() => setStep((x) => Math.max(0, x - 1))}
            className="rounded-full border border-line px-4 py-2 text-sm text-ink-muted hover:border-ink hover:text-ink"
          >
            Back
          </button>
        ) : null}
      </div>
    </div>
  )
}

export function shouldAutoOpenLabCoach(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) !== '1'
  } catch {
    return true
  }
}

export function applyCoachParamsToSearch(params: Partial<LabParams>): string {
  return labParamsToSearch({ ...DEFAULT_LAB_PARAMS, ...params })
}
