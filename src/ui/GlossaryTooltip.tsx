import { Link } from 'react-router-dom'
import { getTerm } from '@/content/glossary/terms'

type GlossaryTooltipProps = {
  termId: string
  children?: string
}

/** Inline glossary reference — expands later with hover cards if desired. */
export function GlossaryTooltip({ termId, children }: GlossaryTooltipProps) {
  const term = getTerm(termId)
  const label = children ?? term?.term ?? termId

  return (
    <Link
      to={`/glossary/${termId}`}
      className="decoration-accent/50 underline decoration-dotted underline-offset-2"
      title={term?.short}
    >
      {label}
    </Link>
  )
}
