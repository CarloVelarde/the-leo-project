import { Figure } from './Figure'

/** Static SVG comparing LEO / MEO / GEO scale (not to exact linear scale — labeled). */
export function OrbitAltitudeDiagram() {
  return (
    <Figure
      caption="Orbit regimes used in this course. Distances are schematic (GEO is much farther than the drawing can show to scale)."
      credit="Conceptual diagram for Starlink Edu · values from ESA orbit classifications"
    >
      <svg viewBox="0 0 640 320" className="mx-auto h-auto w-full max-w-xl" role="img">
        <title>LEO, MEO, and GEO altitude comparison</title>
        {/* Space */}
        <rect width="640" height="320" fill="#05070f" rx="8" />
        {/* Earth */}
        <circle cx="200" cy="160" r="52" fill="#1b3a5f" stroke="#4cc9f0" strokeWidth="1.5" />
        <text x="200" y="164" textAnchor="middle" fill="#94a3b8" fontSize="11">
          Earth
        </text>

        {/* LEO ring */}
        <circle
          cx="200"
          cy="160"
          r="78"
          fill="none"
          stroke="#80ed99"
          strokeWidth="2"
          strokeDasharray="4 3"
        />
        <circle cx="268" cy="120" r="5" fill="#80ed99" />
        <text x="290" y="110" fill="#80ed99" fontSize="12" fontWeight="600">
          LEO
        </text>
        <text x="290" y="126" fill="#94a3b8" fontSize="10">
          &lt; ~2,000 km · ~7.8 km/s · ~90 min
        </text>

        {/* MEO ring */}
        <circle
          cx="200"
          cy="160"
          r="120"
          fill="none"
          stroke="#4cc9f0"
          strokeWidth="1.5"
          strokeDasharray="6 4"
          opacity="0.85"
        />
        <circle cx="310" cy="100" r="5" fill="#4cc9f0" />
        <text x="330" y="96" fill="#4cc9f0" fontSize="12" fontWeight="600">
          MEO
        </text>
        <text x="330" y="112" fill="#94a3b8" fontSize="10">
          e.g. GNSS ~20,000 km
        </text>

        {/* GEO */}
        <circle
          cx="200"
          cy="160"
          r="155"
          fill="none"
          stroke="#f4a261"
          strokeWidth="1.5"
          opacity="0.9"
        />
        <circle cx="355" cy="160" r="7" fill="#f4a261" />
        <text x="375" y="156" fill="#f4a261" fontSize="12" fontWeight="600">
          GEO
        </text>
        <text x="375" y="172" fill="#94a3b8" fontSize="10">
          ~35,786 km · appears fixed
        </text>

        {/* Starlink band callout */}
        <rect x="24" y="250" width="280" height="48" rx="6" fill="#12182b" stroke="#2a3658" />
        <text x="38" y="270" fill="#cbd5e1" fontSize="11">
          Starlink broadband shells (public docs):
        </text>
        <text x="38" y="288" fill="#80ed99" fontSize="11">
          roughly hundreds of km (LEO) — not GEO
        </text>
      </svg>
    </Figure>
  )
}
