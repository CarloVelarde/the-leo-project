import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">About</h1>
      <div className="mt-8 space-y-5 text-base leading-relaxed text-ink-muted">
        <p>
          Starlink Edu is a public education project that uses Starlink-style LEO broadband as a
          case study for mega-constellations. The path starts from Internet fundamentals — not
          orbital jargon — so technical learners with zero space background can build real
          intuition.
        </p>
        <p>
          <strong className="font-semibold text-ink">Learning design:</strong> eight core
          page-by-page modules (Internet → GEO → LEO → ops → constellation → terminal → network →
          synthesis), optional tracks (orbit math, space safety, direct-to-cell, programmer path),
          Advanced expanders, glossary, and a 3D lab. Prefer white reading surfaces; dark mode when
          you want it.
        </p>
        <p>
          <strong className="font-semibold text-ink">Sources:</strong> MDN, ESA, NASA, Starlink
          Technology and Space Safety docs, FCC materials, Jonathan McDowell, CelesTrak, IAU/SATCON,
          Code.org, Crash Course, and High Performance Browser Networking — linked from each module.
        </p>
        <p>
          The lab uses simplified physics (circular orbits, geometric elevation, parametric shells).
          Shell altitudes and fleet counts are time-sensitive — we prefer dated public docs over
          marketing slogans. Not affiliated with SpaceX. We do not reverse-engineer proprietary
          algorithms.
        </p>
        <p className="flex flex-wrap gap-4">
          <Link to="/learn" className="font-medium text-ink underline-offset-4 hover:underline">
            Learning path →
          </Link>
          <Link to="/glossary" className="font-medium text-ink underline-offset-4 hover:underline">
            Glossary →
          </Link>
          <Link to="/code" className="font-medium text-ink underline-offset-4 hover:underline">
            Code-alongs →
          </Link>
          <Link to="/simulate" className="font-medium text-ink underline-offset-4 hover:underline">
            Lab →
          </Link>
        </p>
      </div>
    </div>
  )
}
