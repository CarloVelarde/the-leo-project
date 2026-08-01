import { Link } from 'react-router-dom'
import { getCoreModules, getOptionalModules } from '@/content/curriculum'

export function LearnIndexPage() {
  const core = getCoreModules()
  const optional = getOptionalModules()

  return (
    <div className="bg-paper">
      <section className="border-b border-line px-6 py-16 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium tracking-[0.3em] text-ink-faint uppercase">
            Curriculum
          </p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            Learning path
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink-muted">
            Page-by-page modules. Minimal scroll — focus on one idea, then press Next. Light or
            dark mode for comfortable reading.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-12">
        <ol className="space-y-3">
          {core.map((mod) => (
            <li key={mod.id}>
              <Link
                to={`/learn/${mod.slug}/${mod.pages[0]!.id}`}
                className="group flex items-baseline justify-between gap-4 border-b border-line py-5 no-underline"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3 text-xs text-ink-faint">
                    <span className="font-mono">{String(mod.order).padStart(2, '0')}</span>
                    <span>{mod.pages.length} pages</span>
                    <span>·</span>
                    <span>~{mod.minutes} min</span>
                  </div>
                  <h2 className="mt-1 text-lg font-medium text-ink group-hover:opacity-70 sm:text-xl">
                    {mod.title}
                  </h2>
                  <p className="mt-1 text-sm text-ink-muted">{mod.subtitle}</p>
                </div>
                <span className="shrink-0 text-sm text-ink-faint group-hover:text-ink">→</span>
              </Link>
            </li>
          ))}
        </ol>

        <h2 className="mt-16 text-sm font-semibold tracking-[0.2em] text-ink-faint uppercase">
          Optional tracks
        </h2>
        <ul className="mt-4 space-y-3">
          {optional.map((mod) => (
            <li key={mod.id}>
              <Link
                to={`/learn/${mod.slug}/${mod.pages[0]!.id}`}
                className="block border-b border-line py-4 no-underline"
              >
                <h3 className="font-medium text-ink">{mod.title}</h3>
                <p className="mt-1 text-sm text-ink-muted">{mod.subtitle}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
