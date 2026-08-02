import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { GLOSSARY } from '@/content/glossary/terms'

function matchesQuery(term: string, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true

  const normalized = term.toLowerCase()
  if (normalized.startsWith(q)) return true

  // Match word starts inside multi-word terms, e.g. "trip" → "RTT (round-trip time)"
  const words = normalized.split(/[^a-z0-9+]+/).filter(Boolean)
  return words.some((w) => w.startsWith(q))
}

export function GlossaryPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const sorted = [...GLOSSARY].sort((a, b) => a.term.localeCompare(b.term))
    return sorted.filter((t) => matchesQuery(t.term, query))
  }, [query])

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <h1 className="text-4xl font-semibold tracking-tight text-ink">Glossary</h1>
      <p className="mt-3 text-ink-muted">
        Terms for the full path — Internet, orbits, constellation, terminals, and space network.
        Each term links to related words and modules.
      </p>

      <div className="mt-8">
        <label htmlFor="glossary-search" className="sr-only">
          Search glossary
        </label>
        <input
          id="glossary-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search terms…"
          autoComplete="off"
          spellCheck={false}
          className="w-full rounded-full border border-line bg-paper px-5 py-3 text-sm text-ink outline-none transition-colors placeholder:text-ink-faint focus:border-ink"
        />
        {query.trim() ? (
          <p className="mt-2 text-xs text-ink-faint">
            {filtered.length === 0
              ? `No terms starting with “${query.trim()}”`
              : `${filtered.length} match${filtered.length === 1 ? '' : 'es'}`}
          </p>
        ) : null}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 text-sm text-ink-muted">
          Try a shorter prefix, e.g. <button type="button" className="underline" onClick={() => setQuery('ban')}>ban</button> for bandwidth.
        </p>
      ) : (
        <ul className="mt-8 divide-y divide-line border-y border-line">
          {filtered.map((t) => (
            <li key={t.id}>
              <Link to={`/glossary/${t.id}`} className="block py-5 no-underline hover:opacity-70">
                <span className="font-medium text-ink">{t.term}</span>
                <p className="mt-1 text-sm text-ink-muted">{t.short}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
