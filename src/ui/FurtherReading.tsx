import type { Source, SourceKind } from '@/content/sources'

const kindLabel: Record<SourceKind, string> = {
  official: 'Official',
  edu: 'Education',
  video: 'Video',
  paper: 'Paper',
  independent: 'Independent',
  reference: 'Reference',
}

type FurtherReadingProps = {
  sources: Source[]
  title?: string
  intro?: string
}

/** Curated external resources — always open in a new tab. */
export function FurtherReading({
  sources,
  title = 'Go deeper',
  intro = 'High-quality third-party and primary sources. Open what you need; the main path stands alone.',
}: FurtherReadingProps) {
  if (sources.length === 0) return null

  return (
    <section className="my-10 rounded-xl border border-space-600 bg-space-900/70 p-5">
      <h2 className="mb-1 text-lg font-semibold text-white">{title}</h2>
      <p className="mb-4 text-sm text-slate-400">{intro}</p>
      <ul className="space-y-3">
        {sources.map((s) => (
          <li key={s.id}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-lg border border-space-700 bg-space-950/50 px-4 py-3 no-underline transition-colors hover:border-accent/50"
            >
              <div className="mb-1 flex flex-wrap items-center gap-2">
                <span className="rounded bg-space-800 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-accent uppercase">
                  {kindLabel[s.kind]}
                </span>
                <span className="text-xs text-slate-500">{s.org}</span>
              </div>
              <div className="font-medium text-slate-100 group-hover:text-white">{s.title} ↗</div>
              <p className="mt-1 text-sm text-slate-400">{s.blurb}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
