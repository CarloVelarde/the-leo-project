import { DEFAULT_LAB_PARAMS } from '@/sim/constants'
import type { LabParams } from '@/sim/types'
import { ConstellationScene } from '@/three/ConstellationScene'
import { labPath } from '@/lib/labParams'
import { Link } from 'react-router-dom'

type LessonMiniSimProps = {
  title?: string
  caption?: string
  params?: Partial<LabParams>
  heightClass?: string
}

/** Compact 3D constellation embed for lessons. */
export function LessonMiniSim({
  title = 'Live mini-sim',
  caption = 'Drag to orbit. Open the full lab for controls.',
  params,
  heightClass = 'h-[280px]',
}: LessonMiniSimProps) {
  const merged = { ...DEFAULT_LAB_PARAMS, timeScale: 80, ...params }

  return (
    <section className="my-8 overflow-hidden rounded-xl border border-space-700 bg-space-900">
      <div className="flex items-center justify-between gap-2 border-b border-space-800 px-4 py-2">
        <h3 className="text-xs font-semibold tracking-widest text-accent uppercase">{title}</h3>
        <Link
          to={labPath(merged)}
          className="text-xs text-slate-400 no-underline hover:text-white"
        >
          Full lab →
        </Link>
      </div>
      <div className={heightClass}>
        <ConstellationScene mode="hero" params={merged} />
      </div>
      <p className="border-t border-space-800 px-4 py-2 text-xs text-slate-500">{caption}</p>
    </section>
  )
}
