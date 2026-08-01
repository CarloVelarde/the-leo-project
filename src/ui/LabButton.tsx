import { Link } from 'react-router-dom'
import { labPath } from '@/lib/labParams'
import type { LabParams } from '@/sim/types'

type LabButtonProps = {
  label?: string
  params?: Partial<LabParams>
}

/** Deep-link into the constellation lab with optional preconfigured params. */
export function LabButton({ label = 'Open in Lab', params }: LabButtonProps) {
  return (
    <p className="my-6">
      <Link
        to={labPath(params)}
        className="inline-flex items-center rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-space-950 no-underline hover:bg-white"
      >
        {label} →
      </Link>
    </p>
  )
}
