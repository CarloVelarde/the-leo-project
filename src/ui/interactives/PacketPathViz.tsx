import { useEffect, useState } from 'react'
import { Figure } from './Figure'

const HOPS = [
  { id: 'client', label: 'Your device', x: 40 },
  { id: 'r1', label: 'Router', x: 160 },
  { id: 'r2', label: 'ISP core', x: 280 },
  { id: 'r3', label: 'Backbone', x: 400 },
  { id: 'server', label: 'Server', x: 520 },
]

export function PacketPathViz() {
  const [hop, setHop] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => setHop((h) => (h + 1) % HOPS.length), 900)
    return () => window.clearInterval(id)
  }, [playing])

  const packetX = HOPS[hop]!.x

  return (
    <Figure
      caption="Packets hop from router to router. Each hop can add delay."
      credit="Schematic — real paths have many more hops"
    >
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="rounded-full border border-line px-3 py-1 text-xs text-ink hover:border-ink"
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <button
          type="button"
          onClick={() => setHop(0)}
          className="rounded-full border border-line px-3 py-1 text-xs text-ink hover:border-ink"
        >
          Reset
        </button>
      </div>
      <svg viewBox="0 0 560 140" className="h-auto w-full" role="img">
        <title>Packet moving across network hops</title>
        <line x1="40" y1="70" x2="520" y2="70" stroke="currentColor" className="text-line" strokeWidth="2" />
        {HOPS.map((h, i) => (
          <g key={h.id}>
            <circle
              cx={h.x}
              cy={70}
              r={i === hop ? 12 : 9}
              fill={i === hop ? '#171a20' : '#f4f4f4'}
              stroke="#171a20"
              strokeWidth="1.5"
            />
            <text x={h.x} y={110} textAnchor="middle" fill="#5c5e62" fontSize="11">
              {h.label}
            </text>
          </g>
        ))}
        <rect x={packetX - 10} y={54} width="20" height="12" rx="2" fill="#171a20" />
        <text x={packetX} y={42} textAnchor="middle" fill="#171a20" fontSize="10">
          packet
        </text>
      </svg>
      <p className="mt-2 text-center text-xs text-ink-muted">
        Current hop:{' '}
        <span className="font-mono text-ink">
          {HOPS[hop]!.label} ({hop + 1}/{HOPS.length})
        </span>
      </p>
    </Figure>
  )
}
