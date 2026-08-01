import { Link } from 'react-router-dom'
import { GLOSSARY } from '@/content/glossary/terms'

export function GlossaryPage() {
  const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term))

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-semibold text-white">Glossary</h1>
      <p className="mb-10 text-slate-400">Core terms for the v1 learning path.</p>
      <ul className="divide-y divide-space-800 rounded-xl border border-space-700">
        {sorted.map((t) => (
          <li key={t.id}>
            <Link
              to={`/glossary/${t.id}`}
              className="block px-5 py-4 no-underline hover:bg-space-900"
            >
              <span className="font-medium text-white">{t.term}</span>
              <p className="mt-1 text-sm text-slate-400">{t.short}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
