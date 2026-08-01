import { getSource } from '@/content/sources'

type InlineSourceProps = {
  id: string
  children?: string
}

export function InlineSource({ id, children }: InlineSourceProps) {
  const s = getSource(id)
  if (!s) return <span>{children ?? id}</span>
  return (
    <a
      href={s.url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-ink underline decoration-ink/30 underline-offset-2 hover:decoration-ink"
      title={`${s.org}: ${s.blurb}`}
    >
      {children ?? s.title}
    </a>
  )
}
