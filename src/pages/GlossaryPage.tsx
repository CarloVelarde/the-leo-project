import { Link } from 'react-router-dom'
import { GLOSSARY } from '@/content/glossary/terms'

export function GlossaryPage() {
  const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term))

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Glossary</h1>
      <p className="mt-3 text-ink-muted">Core terms for the learning path.</p>
      <ul className="mt-10 divide-y divide-line border-y border-line">
        {sorted.map((t) => (
          <li key={t.id}>
            <Link to={`/glossary/${t.id}`} className="block py-5 no-underline hover:opacity-70">
              <span className="font-medium text-ink">{t.term}</span>
              <p className="mt-1 text-sm text-ink-muted">{t.short}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
