export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-4 text-3xl font-semibold text-white">About Starlink Edu</h1>
      <div className="space-y-4 text-slate-300 leading-relaxed">
        <p>
          Starlink Edu is a public education project that uses Starlink-style LEO broadband as a
          case study for mega-constellations. The goal is grounded intuition — orbits, coverage,
          handoffs, and system design — with optional Advanced math for motivated learners.
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
      </div>
    </div>
  )
}
