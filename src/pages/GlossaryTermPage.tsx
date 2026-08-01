import { Link, useParams } from 'react-router-dom'
import { getTerm } from '@/content/glossary/terms'

export function GlossaryTermPage() {
  const { termId = '' } = useParams()
  const term = getTerm(termId)

  if (!term) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="text-2xl text-white">Term not found</h1>
        <Link to="/glossary" className="mt-4 inline-block">
          ← Glossary
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <p className="mb-6 text-sm">
        <Link to="/glossary" className="text-slate-400 hover:text-white">
          Glossary
        </Link>
      </p>
      <h1 className="mb-4 text-3xl font-semibold text-white">{term.term}</h1>
      <p className="mb-4 text-lg text-slate-300">{term.short}</p>
      <p className="leading-relaxed text-slate-400">{term.body}</p>
    </div>
  )
}
