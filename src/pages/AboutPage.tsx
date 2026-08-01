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
          <strong className="font-semibold text-ink">Learning design:</strong> eight page-by-page
          modules, optional side tracks, Advanced expanders, and a 3D lab. Prefer white reading
          surfaces; switch to dark mode when you want it.
        </p>
        <p>
          <strong className="font-semibold text-ink">Sources:</strong> MDN, ESA, Starlink Technology
          and Space Safety docs, FCC materials, Jonathan McDowell, Khan Academy, Crash Course, and
          High Performance Browser Networking — linked from each module.
        </p>
        <p>
          The lab uses simplified physics (circular orbits, geometric elevation). Not affiliated
          with SpaceX. We do not reverse-engineer proprietary algorithms.
        </p>
        <p>
          <Link to="/learn" className="font-medium text-ink underline-offset-4 hover:underline">
            Start the learning path →
          </Link>
        </p>
      </div>
    </div>
  )
}
