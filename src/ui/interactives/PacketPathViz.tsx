import { useEffect, useState } from 'react'
import { Figure } from './Figure'

const HOPS = [
  { id: 'client', label: 'Your device', x: 40 },
  { id: 'r1', label: 'Router', x: 160 },
  { id: 'r2', label: 'ISP core', x: 280 },
  { id: 'r3', label: 'Backbone', x: 400 },
  { id: 'server', label: 'Server', x: 520 },
]

/** Animated multi-hop packet visualization for Module 1. */
export function PacketPathViz() {
  const [hop, setHop] = useState(0)
  const [playing, setPlaying] = useState(true)

  useEffect(() => {
    if (!playing) return
    const id = window.setInterval(() => {
      setHop((h) => (h + 1) % HOPS.length)
    }, 900)
    return () => window.clearInterval(id)
  }, [playing])

  const packetX = HOPS[hop]!.x

  return (
    <Figure
      caption="Packets hop from router to router. Each hop can add delay; the full path sets latency."
      credit="Schematic — real paths have many more hops and can change"
    >
      <div className="mb-3 flex gap-2">
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          className="rounded-md border border-space-600 px-2 py-1 text-xs text-slate-200 hover:border-accent"
        >
          {playing ? 'Pause' : 'Play'}
        </button>
        <button
          type="button"
          onClick={() => setHop(0)}
          className="rounded-md border border-space-600 px-2 py-1 text-xs text-slate-200 hover:border-accent"
        >
          Reset
        </button>
      </div>
      <svg viewBox="0 0 560 140" className="h-auto w-full" role="img">
        <title>Packet moving across network hops</title>
        <line x1="40" y1="70" x2="520" y2="70" stroke="#2a3658" strokeWidth="3" />
        {HOPS.map((h, i) => (
          <g key={h.id}>
            <circle
              cx={h.x}
              cy={70}
              r={i === hop ? 14 : 10}
              fill={i === hop ? '#4cc9f0' : '#1c2540'}
              stroke="#4cc9f0"
              strokeWidth="1.5"
            />
            <text
              x={h.x}
              y={110}
              textAnchor="middle"
              fill="#94a3b8"
              fontSize="11"
            >
              {h.label}
            </text>
          </g>
        ))}
        {/* packet */}
        <rect
          x={packetX - 10}
          y={52}
          width="20"
          height="14"
          rx="3"
          fill="#80ed99"
          className="transition-all duration-500"
        />
        <text x={packetX} y={40} textAnchor="middle" fill="#80ed99" fontSize="10">
          packet
        </text>
      </svg>
      <p className="mt-2 text-center text-xs text-slate-400">
        Current hop: <span className="font-mono text-accent">{HOPS[hop]!.label}</span> (
        {hop + 1}/{HOPS.length})
      </p>
    </Figure>
  )
}
