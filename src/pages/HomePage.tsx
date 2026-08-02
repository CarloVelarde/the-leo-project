import { Link } from 'react-router-dom'

/** Full-bleed photographic sections — Starlink.com style, black/white type. */
const HERO =
  'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=2400&q=80'
const SECTION_EARTH =
  'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2000&q=80'
const SECTION_NIGHT =
  'https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=2000&q=80'

export function HomePage() {
  return (
    <div className="bg-paper text-ink">
      {/* Hero */}
      <section
        className="hero-media relative flex min-h-[100svh] flex-col items-center justify-center px-6 text-center text-white"
        style={{ backgroundImage: `url(${HERO})` }}
      >
        <div
          className="absolute inset-0"
          style={{ background: 'var(--hero-overlay)' }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-medium tracking-[0.35em] text-white/80 uppercase">
            Public education
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-6xl sm:leading-[1.05]">
            How Starlink-style
            <br />
            LEO satellites work
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-sm text-white/85 sm:mt-6 sm:text-lg">
            Zero space background required. Clear lessons, real sources, and a live constellation
            lab — from Internet packets to mega-constellations.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:mt-10 sm:gap-4">
            <Link
              to="/learn"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black no-underline transition-opacity hover:opacity-90 sm:px-8"
            >
              Start learning
            </Link>
            <Link
              to="/simulate"
              className="rounded-full border border-white/70 px-6 py-3 text-sm font-medium text-white no-underline transition-colors hover:bg-white/10 sm:px-8"
            >
              Open the lab
            </Link>
          </div>
        </div>
      </section>

      {/* White band — Tesla-like product copy */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Built like a course. Backed like a reference.
        </h2>
        <p className="mt-6 text-lg leading-relaxed text-ink-muted">
          Eight core modules in beginner friendly order: Internet first, then tall orbit delay,
          low orbits, fleet ops, constellation geometry, your dish, the space network, and a full
          synthesis. Optional tracks and Python go deeper when you want.
        </p>
        <div className="mt-12 grid gap-8 text-left sm:grid-cols-3">
          {[
            { t: 'From scratch', d: 'Internet foundations first. No orbital jargon required.' },
            { t: 'Page by page', d: 'Minimal scroll. Next when you are ready — not a wall of text.' },
            { t: 'Grounded sources', d: 'MDN, ESA, Starlink docs, McDowell, and more — linked inline.' },
          ].map((c) => (
            <div key={c.t} className="border-t border-line pt-6">
              <h3 className="text-sm font-semibold tracking-wide text-ink uppercase">{c.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-muted">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Photo section */}
      <section
        className="hero-media relative flex min-h-[70svh] items-end px-6 py-16 text-white"
        style={{ backgroundImage: `url(${SECTION_EARTH})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />
        <div className="relative z-10 mx-auto w-full max-w-5xl">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-5xl">
            See the constellation move.
          </h2>
          <p className="mt-4 max-w-md text-white/80">
            Change planes, altitude, and density. Watch coverage, handoffs, and light-time
            estimates update live.
          </p>
          <Link
            to="/simulate"
            className="mt-8 inline-block rounded-full bg-white px-7 py-3 text-sm font-medium text-black no-underline hover:opacity-90"
          >
            Launch lab
          </Link>
        </div>
      </section>

      {/* Pathway strip */}
      <section className="border-y border-line bg-paper-elevated px-6 py-20">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-center text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
            The path
          </h2>
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              'Internet foundations',
              'The GEO problem',
              'Why LEO',
              'Launch & ops',
              'Constellations',
              'User terminals',
              'Space network',
              'End-to-end',
            ].map((label, i) => (
              <li
                key={label}
                className="rounded-lg border border-line bg-paper px-4 py-4 text-sm text-ink"
              >
                <span className="font-mono text-xs text-ink-faint">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="mt-1 font-medium">{label}</div>
              </li>
            ))}
          </ol>
          <div className="mt-10 text-center">
            <Link
              to="/learn"
              className="inline-block rounded-full bg-inverse px-8 py-3 text-sm font-medium text-paper no-underline hover:opacity-90"
            >
              View full path
            </Link>
          </div>
        </div>
      </section>

      {/* Final photo CTA */}
      <section
        className="hero-media relative flex min-h-[60svh] flex-col items-center justify-center px-6 text-center text-white"
        style={{ backgroundImage: `url(${SECTION_NIGHT})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
            Start with a single page.
          </h2>
          <p className="mx-auto mt-4 max-w-md text-white/80">
            Module 1, page 1 — how the Internet moves data. No account required.
          </p>
          <Link
            to="/learn/internet-foundations/intro"
            className="mt-8 inline-block rounded-full bg-white px-8 py-3 text-sm font-medium text-black no-underline hover:opacity-90"
          >
            Begin Module 1
          </Link>
        </div>
      </section>
    </div>
  )
}
