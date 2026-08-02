import { Link } from 'react-router-dom'
import { getCoreModules, getOptionalModules } from '@/content/curriculum'

export function LearnIndexPage() {
  const core = getCoreModules()
  const optional = getOptionalModules()

  return (
    <div className="bg-paper">
      <section className="border-b border-line px-4 py-12 sm:px-6 sm:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-medium tracking-[0.3em] text-ink-faint uppercase">
            Curriculum
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-ink sm:text-5xl">
            Learning path
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base text-ink-muted sm:mt-5 sm:text-lg">
            Built for curious beginners with no space background. Friendly explanations, short
            pages, quizzes, and a 3D lab. Sources and a glossary stay one click away.
          </p>
          <p className="mx-auto mt-3 max-w-lg text-sm text-ink-faint sm:mt-4">
            Path: Internet basics → why tall satellites felt slow → low orbits → fleet ops →
            constellation geometry → your dish → space network → full story.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-10 sm:px-6 sm:py-12">
        <h2 className="text-sm font-semibold tracking-[0.2em] text-ink-faint uppercase">
          Core path
        </h2>
        <ol className="mt-4 space-y-3">
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
        <p className="mt-2 text-sm text-ink-muted">
          Depth after the core path — math, safety, direct-to-cell, and Python models.
        </p>
        <ul className="mt-4 space-y-3">
          {optional.map((mod) => (
            <li key={mod.id}>
              <Link
                to={`/learn/${mod.slug}/${mod.pages[0]!.id}`}
                className="group flex items-baseline justify-between gap-4 border-b border-line py-4 no-underline"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-3 text-xs text-ink-faint">
                    <span>{mod.pages.length} pages</span>
                    <span>·</span>
                    <span>~{mod.minutes} min</span>
                  </div>
                  <h3 className="mt-1 font-medium text-ink group-hover:opacity-70">{mod.title}</h3>
                  <p className="mt-1 text-sm text-ink-muted">{mod.subtitle}</p>
                </div>
                <span className="shrink-0 text-sm text-ink-faint group-hover:text-ink">→</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap gap-4 text-sm">
          <Link to="/glossary" className="text-ink-muted no-underline hover:text-ink">
            Glossary →
          </Link>
          <Link to="/code" className="text-ink-muted no-underline hover:text-ink">
            Code-alongs →
          </Link>
          <Link to="/simulate" className="text-ink-muted no-underline hover:text-ink">
            3D lab →
          </Link>
          <Link to="/" className="text-ink-muted no-underline hover:text-ink">
            Home →
          </Link>
        </div>
      </section>
    </div>
  )
}
