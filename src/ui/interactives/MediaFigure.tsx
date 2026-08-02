type MediaFigureProps = {
  src: string
  alt: string
  caption: string
  credit?: string
  href?: string
}

/**
 * External educational photo with caption + credit.
 * Prefer Unsplash/Wikimedia/official public assets; always credit.
 */
export function MediaFigure({ src, alt, caption, credit, href }: MediaFigureProps) {
  const img = (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className="aspect-[16/10] w-full object-cover"
    />
  )

  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-line bg-paper">
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {img}
        </a>
      ) : (
        img
      )}
      <figcaption className="border-t border-line px-4 py-3 text-xs text-ink-muted">
        <span className="text-ink-muted">{caption}</span>
        {credit ? <span className="mt-1 block text-ink-faint">{credit}</span> : null}
      </figcaption>
    </figure>
  )
}
