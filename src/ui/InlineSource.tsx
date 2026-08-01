import { getSource } from '@/content/sources'

type InlineSourceProps = {
  id: string
  children?: string
}

/** Inline citation-style link into the curated source catalog. */
export function InlineSource({ id, children }: InlineSourceProps) {
  const s = getSource(id)
  if (!s) return <span>{children ?? id}</span>
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-accent underline decoration-dotted underline-offset-2 hover:text-white"
      title={`${s.org}: ${s.blurb}`}
    >
      {children ?? s.title}
    </a>
  )
}
