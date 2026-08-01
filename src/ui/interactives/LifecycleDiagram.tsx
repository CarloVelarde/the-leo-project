import { Figure } from './Figure'

const STAGES = [
  { id: 'launch', label: 'Launch', desc: 'Stack to orbit' },
  { id: 'raise', label: 'Raise', desc: 'Climb + waypoints' },
  { id: 'service', label: 'Service', desc: 'Station-keeping' },
  { id: 'deorbit', label: 'Deorbit', desc: 'Safe re-entry' },
]

export function LifecycleDiagram() {
  return (
    <Figure
      caption="High-level Starlink-class satellite lifecycle."
      credit="Based on public Starlink Space Safety lifecycle overview"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:justify-between">
        {STAGES.map((s, i) => (
          <div key={s.id} className="flex flex-1 items-center gap-2">
            <div className="flex-1 rounded-lg border border-line bg-paper-elevated px-3 py-3 text-center">
              <div className="font-mono text-[10px] text-ink-faint">
                {String(i + 1).padStart(2, '0')}
              </div>
              <div className="text-sm font-medium text-ink">{s.label}</div>
              <div className="text-xs text-ink-faint">{s.desc}</div>
            </div>
            {i < STAGES.length - 1 ? (
              <span className="hidden text-ink-faint sm:inline" aria-hidden>
                →
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </Figure>
  )
}
