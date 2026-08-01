type VideoEmbedProps = {
  youtubeId?: string
  src?: string
  title: string
  caption?: string
  startSeconds?: number
}

function extractId(input: string): string {
  if (/^[\w-]{11}$/.test(input)) return input
  try {
    const u = new URL(input)
    if (u.hostname.includes('youtu.be')) return u.pathname.slice(1)
    const v = u.searchParams.get('v')
    if (v) return v
  } catch {
    /* fall through */
  }
  return input
}

export function VideoEmbed({
  youtubeId,
  src,
  title,
  caption,
  startSeconds,
}: VideoEmbedProps) {
  const id = extractId(youtubeId ?? src ?? '')
  const start = startSeconds ? `&start=${startSeconds}` : ''
  const embed = `https://www.youtube-nocookie.com/embed/${id}?rel=0${start}`

  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-line bg-paper">
      <div className="relative aspect-video w-full bg-black">
        <iframe
          className="absolute inset-0 h-full w-full"
          src={embed}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      </div>
      <figcaption className="border-t border-line px-4 py-3 text-xs text-ink-muted">
        <span className="font-medium text-ink">{title}</span>
        {caption ? <span className="mt-1 block text-ink-faint">{caption}</span> : null}
      </figcaption>
    </figure>
  )
}
