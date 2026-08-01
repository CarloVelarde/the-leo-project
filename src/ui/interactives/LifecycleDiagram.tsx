import { Figure } from './Figure'

const STAGES = [
  { id: 'launch', label: 'Launch', desc: 'Stack to orbit' },
  { id: 'raise', label: 'Raise', desc: 'Climb + waypoints' },
  { id: 'service', label: 'Service', desc: 'Station-keeping' },
  { id: 'deorbit', label: 'Deorbit', desc: 'Safe re-entry' },
]

/** Horizontal lifecycle diagram for Module 4 / optional safety. */
export function LifecycleDiagram() {
  return (
    <Figure
      caption="High-level Starlink-class satellite lifecycle (public operational narrative)."
      credit="Based on Starlink Space Safety lifecycle overview"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between">
        {STAGES.map((s, i) => (
          <div key={s.id} className="flex flex-1 items-center gap-2">
            <div className="flex-1 rounded-lg border border-space-600 bg-space-950/60 px-3 py-3 text-center">
              <div className="text-[10px] font-semibold tracking-widest text-accent uppercase">
                {i + 1}
              </div>
              <div className="text-sm font-medium text-white">{s.label}</div>
              <div className="text-xs text-slate-500">{s.desc}</div>
            </div>
            {i < STAGES.length - 1 ? (
              <span className="hidden text-slate-600 sm:inline" aria-hidden>
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </Figure>
  )
}
