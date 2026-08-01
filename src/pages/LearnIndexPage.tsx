import { Link } from 'react-router-dom'
import { MODULES } from '@/content/modules'

export function LearnIndexPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-semibold text-white">Learning path</h1>
      <p className="mb-10 text-slate-400">
        Five deep modules. Main path is intuitive; open Advanced sections when you want the math.
      </p>
      <ol className="space-y-4">
        {MODULES.map((mod) => (
          <li key={mod.id}>
            <Link
              to={`/learn/${mod.slug}`}
              className="block rounded-xl border border-space-700 bg-space-900/60 p-5 no-underline transition-colors hover:border-accent/50"
            >
              <div className="mb-1 flex items-center gap-2 text-xs text-slate-500">
                <span>Module {mod.order}</span>
                {mod.status === 'stub' ? (
                  <span className="rounded bg-space-800 px-1.5 py-0.5 text-warn">Draft</span>
                ) : null}
              </div>
              <h2 className="text-lg font-medium text-white">{mod.title}</h2>
              <p className="mt-1 text-sm text-slate-400">{mod.subtitle}</p>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  )
}
