import { Link } from 'react-router-dom'
import { DEFAULT_LAB_PARAMS } from '@/sim/constants'
import type { LabParams } from '@/sim/types'
import { ConstellationScene } from '@/three/ConstellationScene'
import { labPath } from '@/lib/labParams'

type LessonMiniSimProps = {
  title?: string
  caption?: string
  params?: Partial<LabParams>
  heightClass?: string
}

export function LessonMiniSim({
  title = 'Live mini-sim',
  caption = 'Drag to orbit. Open the full lab for controls.',
  params,
  heightClass = 'h-[240px]',
}: LessonMiniSimProps) {
  const merged = { ...DEFAULT_LAB_PARAMS, timeScale: 80, ...params }

  return (
    <section className="my-6 overflow-hidden rounded-lg border border-line bg-black">
      <div className="flex items-center justify-between gap-2 border-b border-white/10 px-4 py-2">
        <h3 className="text-[10px] font-semibold tracking-[0.2em] text-white/70 uppercase">
          {title}
        </h3>
        <Link to={labPath(merged)} className="text-xs text-white/60 no-underline hover:text-white">
          Full lab →
        </Link>
      </div>
      <div className={heightClass}>
        <ConstellationScene mode="hero" params={merged} />
      </div>
      <p className="border-t border-white/10 px-4 py-2 text-xs text-white/50">{caption}</p>
    </section>
  )
}
