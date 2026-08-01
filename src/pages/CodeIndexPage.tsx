import { Link } from 'react-router-dom'
import { CODE_EXERCISES } from '@/code/exercises'
import { getCurriculumModule } from '@/content/curriculum'

export function CodeIndexPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-[10px] font-semibold tracking-[0.2em] text-ink-faint uppercase">
        Optional
      </p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink">Code-alongs</h1>
      <p className="mt-3 text-ink-muted">
        Short Python exercises that re-express ideas from the lessons. In-browser. Never required
        to finish a module.
      </p>

      <ul className="mt-10 divide-y divide-line border-y border-line">
        {CODE_EXERCISES.map((ex) => {
          const mod = getCurriculumModule(ex.moduleSlug)
          return (
            <li key={ex.id}>
              <Link
                to={`/code/${ex.id}`}
                className="block py-5 no-underline transition-opacity hover:opacity-70"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="text-lg font-medium text-ink">{ex.title}</h2>
                  <span className="text-xs text-ink-faint">~{ex.minutes} min</span>
                </div>
                <p className="mt-1 text-sm text-ink-muted">{ex.summary}</p>
                <p className="mt-2 text-xs text-ink-faint">
                  After: {mod?.title ?? ex.moduleSlug}
                </p>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
