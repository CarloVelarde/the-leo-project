import { Link, useParams } from 'react-router-dom'
import { getRelatedTerms, getTerm } from '@/content/glossary/terms'
import { getModuleById } from '@/content/modules'

export function GlossaryTermPage() {
  const { termId = '' } = useParams()
  const term = getTerm(termId)
  const related = term ? getRelatedTerms(term.id) : []
  const modules =
    term?.moduleIds
      ?.map((id) => getModuleById(id))
      .filter(Boolean)
      .map((m) => m!) ?? []

  if (!term) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <h1 className="text-2xl text-ink">Term not found</h1>
        <Link to="/glossary" className="mt-4 inline-block text-ink-muted">
          ← Glossary
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <p className="mb-6 flex flex-wrap gap-3 text-sm">
        <Link to="/glossary" className="text-ink-muted no-underline hover:text-ink">
          Glossary
        </Link>
        <span className="text-ink-faint">·</span>
        <Link to="/learn" className="text-ink-muted no-underline hover:text-ink">
          Learning path
        </Link>
        <span className="text-ink-faint">·</span>
        <Link to="/" className="text-ink-muted no-underline hover:text-ink">
          Home
        </Link>
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-ink">{term.term}</h1>
      <p className="mt-4 text-lg text-ink-muted">{term.short}</p>
      <p className="mt-6 leading-relaxed text-ink-muted">{term.body}</p>

      {modules.length > 0 ? (
        <section className="mt-10 border-t border-line pt-6">
          <p className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-ink-faint uppercase">
            Appears in
          </p>
          <ul className="space-y-2">
            {modules.map((m) => (
              <li key={m.id}>
                <Link
                  to={`/learn/${m.slug}`}
                  className="text-sm text-ink no-underline hover:opacity-70"
                >
                  {m.track === 'core' ? `Module ${m.order}` : 'Optional'} · {m.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {related.length > 0 ? (
        <section className="mt-8 border-t border-line pt-6">
          <p className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-ink-faint uppercase">
            Related terms
          </p>
          <ul className="space-y-2">
            {related.map((t) => (
              <li key={t.id}>
                <Link
                  to={`/glossary/${t.id}`}
                  className="text-sm text-ink no-underline hover:opacity-70"
                >
                  {t.term}
                  <span className="mt-0.5 block text-xs text-ink-muted">{t.short}</span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </div>
  )
}
