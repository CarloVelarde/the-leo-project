import { useState } from 'react'
import { Figure } from './Figure'

type Mode = 'gateway' | 'isl'

export function NetworkPathDiagram() {
  const [mode, setMode] = useState<Mode>('gateway')

  return (
    <Figure
      caption={
        mode === 'gateway'
          ? 'Gateway path: user → sat → ground gateway → Internet.'
          : 'Mesh path: user → sat → optical ISL hops → distant gateway → Internet.'
      }
      credit="Conceptual — not a proprietary routing map"
    >
      <div className="mb-3 flex flex-wrap gap-2">
        <ModeBtn active={mode === 'gateway'} onClick={() => setMode('gateway')}>
          Via gateway
        </ModeBtn>
        <ModeBtn active={mode === 'isl'} onClick={() => setMode('isl')}>
          Via laser ISLs
        </ModeBtn>
      </div>
      <svg viewBox="0 0 640 220" className="h-auto w-full" role="img">
        <title>End-to-end satellite network path</title>
        <rect width="640" height="220" fill="#fafafa" rx="4" />
        <path d="M 40 200 Q 320 120 600 200" fill="none" stroke="#e5e5e5" strokeWidth="40" />
        <text x="320" y="210" textAnchor="middle" fill="#8e8e8e" fontSize="10">
          Earth
        </text>
        <circle cx="120" cy="168" r="8" fill="#171a20" />
        <text x="120" y="190" textAnchor="middle" fill="#171a20" fontSize="11">
          User
        </text>
        <circle cx="200" cy="70" r="8" fill="#171a20" />
        <text x="200" y="52" textAnchor="middle" fill="#171a20" fontSize="11">
          Sat A
        </text>
        {mode === 'isl' ? (
          <>
            <circle cx="320" cy="50" r="8" fill="#5c5e62" />
            <text x="320" y="32" textAnchor="middle" fill="#5c5e62" fontSize="11">
              Sat B
            </text>
            <circle cx="440" cy="70" r="8" fill="#5c5e62" />
            <text x="440" y="52" textAnchor="middle" fill="#5c5e62" fontSize="11">
              Sat C
            </text>
            <line x1="208" y1="70" x2="312" y2="50" stroke="#5c5e62" strokeWidth="2" strokeDasharray="4 2" />
            <line x1="328" y1="50" x2="432" y2="70" stroke="#5c5e62" strokeWidth="2" strokeDasharray="4 2" />
          </>
        ) : null}
        <rect
          x={mode === 'isl' ? 500 : 360}
          y="150"
          width="48"
          height="28"
          rx="4"
          fill="#fff"
          stroke="#171a20"
        />
        <text x={mode === 'isl' ? 524 : 384} y="168" textAnchor="middle" fill="#171a20" fontSize="10">
          GW
        </text>
        <ellipse cx="580" cy="100" rx="40" ry="24" fill="#fff" stroke="#171a20" />
        <text x="580" y="104" textAnchor="middle" fill="#171a20" fontSize="10">
          Internet
        </text>
        <line x1="126" y1="160" x2="194" y2="78" stroke="#171a20" strokeWidth="2" />
        {mode === 'gateway' ? (
          <>
            <line x1="208" y1="78" x2="380" y2="150" stroke="#171a20" strokeWidth="2" />
            <line x1="408" y1="155" x2="545" y2="110" stroke="#8e8e8e" strokeWidth="2" />
          </>
        ) : (
          <>
            <line x1="448" y1="78" x2="520" y2="150" stroke="#171a20" strokeWidth="2" />
            <line x1="548" y1="155" x2="555" y2="115" stroke="#8e8e8e" strokeWidth="2" />
          </>
        )}
      </svg>
    </Figure>
  )
}

function ModeBtn({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'rounded-full bg-inverse px-3 py-1 text-xs font-medium text-paper'
          : 'rounded-full border border-line px-3 py-1 text-xs text-ink-muted hover:border-ink hover:text-ink'
      }
    >
      {children}
    </button>
  )
}
