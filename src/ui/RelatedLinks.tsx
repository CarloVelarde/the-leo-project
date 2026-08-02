import { Link } from 'react-router-dom'

export type RelatedItem = {
  label: string
  to: string
  kind?: 'lesson' | 'lab' | 'glossary' | 'code' | 'home' | 'path' | 'source'
}

type RelatedLinksProps = {
  title?: string
  items: RelatedItem[]
}

const kindHint: Record<NonNullable<RelatedItem['kind']>, string> = {
  lesson: 'Lesson',
  lab: 'Lab',
  glossary: 'Glossary',
  code: 'Code',
  home: 'Home',
  path: 'Path',
  source: 'Source',
}

function isExternal(to: string): boolean {
  return /^https?:\/\//i.test(to)
}

/** Compact related-page strip — no clutter, one line per link. */
export function RelatedLinks({ title = 'Related', items }: RelatedLinksProps) {
  if (items.length === 0) return null

  return (
    <nav aria-label={title} className="my-8 border-t border-line pt-6">
      <p className="mb-3 text-[10px] font-semibold tracking-[0.2em] text-ink-faint uppercase">
        {title}
      </p>
      <ul className="space-y-2">
        {items.map((item) => {
          const external = isExternal(item.to)
          const hint = item.kind ? kindHint[item.kind] : external ? '↗' : '→'
          const className =
            'group flex items-baseline justify-between gap-3 text-sm no-underline'

          return (
            <li key={item.to + item.label}>
              {external ? (
                <a
                  href={item.to}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  <span className="text-ink group-hover:opacity-70">{item.label}</span>
                  <span className="shrink-0 text-xs text-ink-faint">{hint}</span>
                </a>
              ) : (
                <Link to={item.to} className={className}>
                  <span className="text-ink group-hover:opacity-70">{item.label}</span>
                  <span className="shrink-0 text-xs text-ink-faint">{hint}</span>
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
