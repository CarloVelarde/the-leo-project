import { Link } from 'react-router-dom'
import { MODULES, OPTIONAL_MODULES } from '@/content/modules'

export function LearnIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-semibold text-white">Learning path</h1>
      <p className="mb-4 text-slate-400">
        Eight core modules from Internet fundamentals to end-to-end LEO broadband. No space
        background required — we assume technical comfort (algebra-level math), not orbital
        mechanics. Open <span className="text-slate-300">Advanced</span> sections and{' '}
        <span className="text-slate-300">Go deeper</span> links when you want more.
      </p>
      <p className="mb-10 text-sm text-slate-500">
        Pathway: packets & latency → GEO problem → LEO → launch/ops → constellation geometry →
        user terminal → space network → synthesis.
      </p>

      <ol className="space-y-4">
        {MODULES.map((mod) => (
          <li key={mod.id}>
            <Link
              to={`/learn/${mod.slug}`}
              className="block rounded-xl border border-space-700 bg-space-900/60 p-5 no-underline transition-colors hover:border-accent/50"
            >
              <div className="mb-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                <span>Module {mod.order}</span>
                <span>·</span>
                <span>~{mod.minutes} min</span>
                {mod.status === 'ready' ? (
                  <span className="rounded bg-signal/15 px-1.5 py-0.5 text-signal">Ready</span>
                ) : (
                  <span className="rounded bg-space-800 px-1.5 py-0.5 text-warn">Draft</span>
                )}
              </div>
              <h2 className="text-lg font-medium text-white">{mod.title}</h2>
              <p className="mt-1 text-sm text-slate-400">{mod.subtitle}</p>
              <p className="mt-2 text-xs text-slate-500">{mod.goal}</p>
            </Link>
          </li>
        ))}
      </ol>

      <h2 className="mt-14 mb-3 text-xl font-semibold text-white">Optional tracks</h2>
      <p className="mb-6 text-sm text-slate-400">
        Side paths for later — not required for the core story. Some are still stubs.
      </p>
      <ul className="space-y-3">
        {OPTIONAL_MODULES.map((mod) => (
          <li key={mod.id}>
            <div className="rounded-xl border border-space-800 bg-space-950/40 px-5 py-4">
              <div className="text-xs text-slate-500">
                {mod.status === 'stub' ? 'Coming later' : 'Optional'} · ~{mod.minutes} min
              </div>
              <h3 className="mt-1 font-medium text-slate-200">{mod.title}</h3>
              <p className="mt-1 text-sm text-slate-500">{mod.subtitle}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
