import { Figure } from './Figure'

/**
 * Usable sky: min elevation ring vs trees/buildings blocking line of sight.
 */
export function ObstructionDiagram() {
  return (
    <Figure
      caption="Service needs a clear path above min elevation. Trees and roofs often fail the user before “wrong orbit altitude” does."
      credit="Conceptual field-of-view sketch — not a site survey tool"
    >
      <svg viewBox="0 0 640 260" className="mx-auto h-auto w-full max-w-xl" role="img">
        <title>Elevation mask and obstruction blocking sky</title>
        <rect width="640" height="260" className="fill-paper-elevated" rx="4" />

        {/* Ground */}
        <line x1="40" y1="200" x2="600" y2="200" stroke="currentColor" className="text-line-strong" strokeWidth="2" />
        <text x="50" y="220" className="fill-ink-faint" fontSize="11">
          Horizon
        </text>

        {/* User */}
        <circle cx="200" cy="200" r="7" className="fill-ink" />
        <text x="200" y="240" textAnchor="middle" className="fill-ink" fontSize="11">
          Terminal
        </text>

        {/* Min elevation cone (schematic) */}
        <path
          d="M 200 200 L 120 90 L 280 90 Z"
          fill="none"
          stroke="currentColor"
          className="text-signal"
          strokeWidth="1.5"
          strokeDasharray="4 3"
          opacity="0.9"
        />
        <text x="200" y="78" textAnchor="middle" className="fill-ink-muted" fontSize="11">
          Usable sky (above min elev)
        </text>

        {/* Clear sat */}
        <circle cx="230" cy="100" r="6" className="fill-signal" />
        <line x1="200" y1="200" x2="230" y2="106" stroke="currentColor" className="text-signal" strokeWidth="1.5" />
        <text x="250" y="104" className="fill-ink" fontSize="11">
          Sat A · clear
        </text>

        {/* Blocked sat behind tree */}
        <circle cx="380" cy="95" r="6" className="fill-ink-faint" />
        <line
          x1="200"
          y1="200"
          x2="380"
          y2="95"
          stroke="currentColor"
          className="text-ink-faint"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        {/* Tree / building block */}
        <rect x="300" y="140" width="36" height="60" rx="2" className="fill-ink-muted" opacity="0.85" />
        <polygon points="318,100 290,145 346,145" className="fill-ink-muted" opacity="0.9" />
        <text x="400" y="90" className="fill-ink-muted" fontSize="11">
          Sat B · blocked
        </text>
        <text x="318" y="220" textAnchor="middle" className="fill-ink-faint" fontSize="10">
          Tree / roof
        </text>

        {/* Low elev zone */}
        <text x="90" y="175" className="fill-warn" fontSize="10">
          Low elev · long path
        </text>
      </svg>
    </Figure>
  )
}
