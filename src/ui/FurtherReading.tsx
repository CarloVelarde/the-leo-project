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

export function FurtherReading({
  sources,
  title = 'Go deeper',
  intro = 'Primary and high-quality third-party sources. Open what you need.',
}: FurtherReadingProps) {
  if (sources.length === 0) return null

  return (
    <section className="my-8 rounded-lg border border-line bg-paper px-5 py-5">
      <h2 className="mb-1 text-sm font-semibold tracking-wide text-ink uppercase">{title}</h2>
      <p className="mb-4 text-sm text-ink-muted">{intro}</p>
      <ul className="space-y-2">
        {sources.map((s) => (
          <li key={s.id}>
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-md border border-line px-4 py-3 no-underline transition-colors hover:border-ink"
            >
              <div className="mb-0.5 flex flex-wrap items-center gap-2">
                <span className="text-[10px] font-semibold tracking-wide text-ink-faint uppercase">
                  {kindLabel[s.kind]}
                </span>
                <span className="text-xs text-ink-faint">{s.org}</span>
              </div>
              <div className="text-sm font-medium text-ink group-hover:opacity-80">
                {s.title} ↗
              </div>
              <p className="mt-1 text-xs text-ink-muted">{s.blurb}</p>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}
