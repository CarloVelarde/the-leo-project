export type ModuleMeta = {
  id: string
  slug: string
  order: number
  title: string
  subtitle: string
  status: 'ready' | 'stub'
}

/** v1 syllabus M1–M5 (narrow + deep). Content bodies live under content/modules/. */
export const MODULES: ModuleMeta[] = [
  {
    id: 'm1',
    slug: 'why-leo',
    order: 1,
    title: 'Why LEO? Starlink in context',
    subtitle: 'GEO vs LEO, system pieces, and what a constellation is.',
    status: 'stub',
  },
  {
    id: 'm2',
    slug: 'orbits',
    order: 2,
    title: 'Orbits without fear',
    subtitle: 'Altitude, period, and how satellites move overhead.',
    status: 'stub',
  },
  {
    id: 'm3',
    slug: 'constellation-design',
    order: 3,
    title: 'Designing a mega-constellation',
    subtitle: 'Planes, density, and covering the planet.',
    status: 'stub',
  },
  {
    id: 'm4',
    slug: 'beams-and-handoffs',
    order: 4,
    title: 'Staying connected: beams & handoffs',
    subtitle: 'Footprints, elevation, and why LEO keeps switching satellites.',
    status: 'stub',
  },
  {
    id: 'm5',
    slug: 'what-makes-it-special',
    order: 5,
    title: 'What makes it special',
    subtitle: 'Phased arrays, gateways, ISL concepts, and capacity limits.',
    status: 'stub',
  },
]

export function getModuleBySlug(slug: string): ModuleMeta | undefined {
  return MODULES.find((m) => m.slug === slug)
}

export function getModuleById(id: string): ModuleMeta | undefined {
  return MODULES.find((m) => m.id === id)
}
