import { Link } from 'react-router-dom'

export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-semibold text-white">About Starlink Edu</h1>
      <div className="space-y-4 text-slate-300 leading-relaxed">
        <p>
          Starlink Edu is a public education project that uses Starlink-style LEO broadband as a
          case study for mega-constellations. The core path starts from Internet fundamentals —
          not from orbital jargon — so technical learners with zero space background can build
          real intuition.
        </p>
        <p>
          <strong className="text-slate-100">Learning design:</strong> eight core modules
          (packets → GEO problem → LEO → operations → constellation geometry → user terminal →
          space network → synthesis), optional later tracks, Advanced expanders for math, and a
          3D lab coupled to the lessons.
        </p>
        <p>
          <strong className="text-slate-100">Sources:</strong> we prioritize primary and
          high-quality references — MDN, ESA, Starlink Technology and Space Safety docs, FCC
          public materials, independent tracking (Jonathan McDowell), Khan Academy, Crash Course,
          and technical primers such as High Performance Browser Networking. Each module ends with
          curated “Go deeper” links.
        </p>
        <p>
          The constellation lab uses simplified physics: circular Keplerian orbits, geometric
          elevation masks, and parametric shells (not live TLEs). Assumptions are shown in the lab.
        </p>
        <p>
          This site is not affiliated with SpaceX or Starlink. We teach public engineering
          consensus and problem classes; we do not reverse-engineer proprietary algorithms.
        </p>
        <p className="text-sm text-slate-500">
          Progress is stored locally in your browser for now. A future backend may support
          syncing progress and saved lab states across devices.
        </p>
        <p>
          <Link to="/learn" className="text-accent hover:text-white">
            Start the learning path →
          </Link>
        </p>
      </div>
    </div>
  )
}
