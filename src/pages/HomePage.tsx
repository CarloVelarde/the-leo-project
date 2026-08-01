import { Link } from 'react-router-dom'
import { DEFAULT_LAB_PARAMS } from '@/sim/constants'
import { ConstellationScene } from '@/three/ConstellationScene'

export function HomePage() {
  return (
    <div>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-2 lg:items-center lg:py-16">
        <div>
          <p className="mb-3 text-xs font-semibold tracking-[0.2em] text-accent uppercase">
            Public education
          </p>
          <h1 className="mb-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            How Starlink-style LEO satellites actually work
          </h1>
          <p className="mb-8 max-w-xl text-lg leading-relaxed text-slate-400">
            Zero space background required. Build intuition for orbits, mega-constellations,
            coverage, and handoffs — then open the 3D lab and change the sky yourself.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/learn"
              className="rounded-lg bg-accent px-5 py-2.5 text-sm font-semibold text-space-950 no-underline hover:bg-white"
            >
              Start learning
            </Link>
            <Link
              to="/simulate"
              className="rounded-lg border border-space-600 px-5 py-2.5 text-sm font-semibold text-slate-200 no-underline hover:border-accent hover:text-white"
            >
              Open the lab
            </Link>
          </div>
        </div>
        <div className="overflow-hidden rounded-2xl border border-space-700 bg-space-900 shadow-2xl shadow-black/40">
          <div className="h-[320px] sm:h-[400px]">
            <ConstellationScene params={{ ...DEFAULT_LAB_PARAMS, timeScale: 80 }} />
          </div>
          <p className="border-t border-space-800 px-4 py-2 text-xs text-slate-500">
            Live mini-sim — drag to orbit. Full controls in the lab.
          </p>
        </div>
      </section>
    </div>
  )
}
