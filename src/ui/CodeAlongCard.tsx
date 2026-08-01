import { Link } from 'react-router-dom'
import { getExerciseForPage } from '@/code/exercises'

type CodeAlongCardProps = {
  moduleSlug: string
  pageId: string
}

/** Optional entry point on a lesson page — never blocks Next. */
export function CodeAlongCard({ moduleSlug, pageId }: CodeAlongCardProps) {
  const ex = getExerciseForPage(moduleSlug, pageId)
  if (!ex) return null

  return (
    <aside className="my-8 rounded-xl border border-line bg-paper-elevated px-5 py-4">
      <p className="text-[10px] font-semibold tracking-[0.2em] text-ink-faint uppercase">
        Optional · Python · ~{ex.minutes} min
      </p>
      <h3 className="mt-1 text-base font-semibold tracking-tight text-ink">{ex.title}</h3>
      <p className="mt-1 text-sm text-ink-muted">{ex.summary}</p>
      <div className="mt-4">
        <Link
          to={`/code/${ex.id}`}
          className="inline-flex rounded-full bg-inverse px-5 py-2 text-sm font-medium text-paper no-underline hover:opacity-90"
        >
          Open code-along →
        </Link>
      </div>
      <p className="mt-3 text-[11px] text-ink-faint">
        In-browser Python. Does not block the lesson — continue anytime.
      </p>
    </aside>
  )
}
