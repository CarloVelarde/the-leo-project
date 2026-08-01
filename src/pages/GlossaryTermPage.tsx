import { Link, useParams } from 'react-router-dom'
import { getTerm } from '@/content/glossary/terms'

export function GlossaryTermPage() {
  const { termId = '' } = useParams()
  const term = getTerm(termId)

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
      <p className="mb-6 text-sm">
        <Link to="/glossary" className="text-ink-muted no-underline hover:text-ink">
          Glossary
        </Link>
      </p>
      <h1 className="text-4xl font-semibold tracking-tight text-ink">{term.term}</h1>
      <p className="mt-4 text-lg text-ink-muted">{term.short}</p>
      <p className="mt-6 leading-relaxed text-ink-muted">{term.body}</p>
    </div>
  )
}
