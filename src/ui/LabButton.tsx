import { Link } from 'react-router-dom'
import { labPath } from '@/lib/labParams'
import type { LabParams } from '@/sim/types'

type LabButtonProps = {
  label?: string
  params?: Partial<LabParams>
}

export function LabButton({ label = 'Open in Lab', params }: LabButtonProps) {
  return (
    <span className="my-2 inline-block">
      <Link
        to={labPath(params)}
        className="inline-flex items-center rounded-full bg-inverse px-5 py-2.5 text-sm font-medium text-paper no-underline transition-opacity hover:opacity-90"
      >
        {label} →
      </Link>
    </span>
  )
}
