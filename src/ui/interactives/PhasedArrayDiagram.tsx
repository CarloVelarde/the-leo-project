import { useState } from 'react'
import { Figure } from './Figure'

/** Interactive beam-steering illustration for phased arrays. */
export function PhasedArrayDiagram() {
  const [angle, setAngle] = useState(25)

  const rad = ((-angle) * Math.PI) / 180
  const beamLen = 90
  const bx = 200 + Math.sin(rad) * beamLen
  const by = 150 - Math.cos(rad) * beamLen

  return (
    <Figure
      caption="Many small elements act together. Changing relative phase steers the beam without rotating the panel."
      credit="Conceptual illustration — not a measured antenna pattern"
    >
      <label className="mb-3 block text-xs text-slate-400">
        <div className="mb-1 flex justify-between">
          <span>Beam steer angle</span>
          <span className="font-mono text-slate-200">{angle}°</span>
        </div>
        <input
          type="range"
          min={-50}
          max={50}
          value={angle}
          onChange={(e) => setAngle(Number(e.target.value))}
          className="w-full accent-accent"
        />
      </label>
      <svg viewBox="0 0 400 200" className="mx-auto h-auto w-full max-w-md" role="img">
        <title>Phased array electronic beam steering</title>
        <rect width="400" height="200" fill="#05070f" rx="4" />
        {/* panel */}
        <rect x="80" y="150" width="240" height="16" rx="2" fill="#1c2540" stroke="#4cc9f0" />
        {Array.from({ length: 12 }, (_, i) => (
          <rect
            key={i}
            x={90 + i * 18}
            y={152}
            width="12"
            height="12"
            fill="#4cc9f0"
            opacity={0.5 + (i % 3) * 0.15}
          />
        ))}
        <text x="200" y="185" textAnchor="middle" fill="#94a3b8" fontSize="11">
          flat user terminal (elements)
        </text>
        {/* beam */}
        <line x1="200" y1="150" x2={bx} y2={by} stroke="#80ed99" strokeWidth="3" />
        <polygon
          points={`200,150 ${bx - 12},${by + 8} ${bx + 12},${by + 8}`}
          fill="#80ed99"
          opacity="0.25"
          transform={`rotate(${-angle} 200 150)`}
        />
        <circle cx={bx} cy={by} r="7" fill="#80ed99" />
        <text x={bx + 14} y={by} fill="#80ed99" fontSize="11">
          sat
        </text>
      </svg>
    </Figure>
  )
}
