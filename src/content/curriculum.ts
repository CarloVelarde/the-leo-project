/**
 * Multi-page curriculum: each module is a sequence of short pages
 * (minimal scroll — navigate with Next / Previous).
 */

export type CurriculumPage = {
  id: string
  title: string
  /** Short label for sidebar */
  navLabel: string
}

export type CurriculumModule = {
  id: string
  slug: string
  order: number
  title: string
  subtitle: string
  goal: string
  minutes: number
  track: 'core' | 'optional'
  pages: CurriculumPage[]
}

export const CURRICULUM: CurriculumModule[] = [
  {
    id: 'm1',
    slug: 'internet-foundations',
    order: 1,
    title: 'How the Internet Actually Moves Data',
    subtitle: 'Packets, routers, latency vs bandwidth',
    goal: 'Shared vocabulary for everything that follows.',
    minutes: 18,
    track: 'core',
    pages: [
      { id: 'intro', title: 'Why start with the Internet?', navLabel: 'Intro' },
      { id: 'packets', title: 'Packets & packet switching', navLabel: 'Packets' },
      { id: 'latency', title: 'Latency vs bandwidth', navLabel: 'Latency' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'm2',
    slug: 'geo-problem',
    order: 2,
    title: 'Why Ordinary Satellite Internet Felt Slow',
    subtitle: 'The GEO problem',
    goal: 'Connect latency to ~36,000 km geometry.',
    minutes: 16,
    track: 'core',
    pages: [
      { id: 'intro', title: 'Geostationary orbit', navLabel: 'GEO' },
      { id: 'delay', title: 'Distance becomes delay', navLabel: 'Delay' },
      { id: 'tradeoffs', title: 'What GEO still wins', navLabel: 'Trade-offs' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'm3',
    slug: 'leo-advantage',
    order: 3,
    title: 'Low Earth Orbit: Why Closer Changes Everything',
    subtitle: 'LEO and the coverage problem',
    goal: 'Why lower latency forces a constellation.',
    minutes: 16,
    track: 'core',
    pages: [
      { id: 'intro', title: 'What LEO means', navLabel: 'LEO' },
      { id: 'latency', title: 'The latency win', navLabel: 'Latency' },
      { id: 'coverage', title: 'Why one sat is not enough', navLabel: 'Coverage' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'm4',
    slug: 'launch-and-ops',
    order: 4,
    title: 'Getting Satellites into Orbit & Keeping Them There',
    subtitle: 'Launch, raise, station-keep, deorbit',
    goal: 'The lifecycle behind a living fleet.',
    minutes: 15,
    track: 'core',
    pages: [
      { id: 'lifecycle', title: 'Satellite lifecycle', navLabel: 'Lifecycle' },
      { id: 'control', title: 'Station-keeping & thrusters', navLabel: 'Control' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'm5',
    slug: 'constellation-design',
    order: 5,
    title: 'What a Constellation Actually Is',
    subtitle: 'Shells, planes, inclination, phasing',
    goal: 'Read mega-constellations as geometry.',
    minutes: 20,
    track: 'core',
    pages: [
      { id: 'terms', title: 'Shells, planes, inclination', navLabel: 'Terms' },
      { id: 'density', title: 'Density & coverage', navLabel: 'Density' },
      { id: 'reality', title: 'Public data & reality checks', navLabel: 'Reality' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'm6',
    slug: 'user-terminal',
    order: 6,
    title: 'Your Terminal Talking to a Fast-Moving Satellite',
    subtitle: 'Phased arrays and handovers',
    goal: 'How a flat dish tracks LEO sats.',
    minutes: 18,
    track: 'core',
    pages: [
      { id: 'array', title: 'Phased-array terminals', navLabel: 'Arrays' },
      { id: 'handoff', title: 'Links & handovers', navLabel: 'Handovers' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'm7',
    slug: 'space-network',
    order: 7,
    title: 'The Bigger Network: Lasers, Gateways, and Routing',
    subtitle: 'User links, gateways, ISLs',
    goal: 'Packets after they leave your dish.',
    minutes: 17,
    track: 'core',
    pages: [
      { id: 'links', title: 'Three kinds of links', navLabel: 'Links' },
      { id: 'mesh', title: 'Gateways & the space mesh', navLabel: 'Mesh' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'm8',
    slug: 'end-to-end',
    order: 8,
    title: 'Putting It All Together',
    subtitle: 'End-to-end path and performance',
    goal: 'Synthesize the full system story.',
    minutes: 20,
    track: 'core',
    pages: [
      { id: 'journey', title: 'A packet’s journey', navLabel: 'Journey' },
      { id: 'performance', title: 'What latency is made of', navLabel: 'Performance' },
      { id: 'lab', title: 'Capstone experiments', navLabel: 'Lab' },
      { id: 'check', title: 'Capstone quiz', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'opt-math',
    slug: 'optional-orbit-math',
    order: 101,
    title: 'Orbit math that actually helps',
    subtitle: 'Optional · formulas behind the lab',
    goal: 'Period, light-time, and footprint geometry.',
    minutes: 25,
    track: 'optional',
    pages: [
      { id: 'period', title: 'Period & light-time', navLabel: 'Formulas' },
      { id: 'footprint', title: 'Footprint geometry', navLabel: 'Footprint' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'opt-debris',
    slug: 'optional-space-safety',
    order: 102,
    title: 'Debris, astronomy, and space safety',
    subtitle: 'Optional · sustainability framing',
    goal: 'Density, deorbit, and independent tracking.',
    minutes: 20,
    track: 'optional',
    pages: [
      { id: 'density', title: 'Why density matters', navLabel: 'Density' },
      { id: 'deorbit', title: 'Deorbit & the night sky', navLabel: 'Deorbit' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'opt-dtc',
    slug: 'optional-direct-to-cell',
    order: 103,
    title: 'Direct-to-cell and future evolution',
    subtitle: 'Optional · phones from space',
    goal: 'DTC vs dish broadband in the same architecture.',
    minutes: 18,
    track: 'optional',
    pages: [
      { id: 'contrast', title: 'Dish vs direct-to-cell', navLabel: 'Contrast' },
      { id: 'shells', title: 'Lower shells & evolution', navLabel: 'Shells' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
]

export function getCurriculumModule(slug: string): CurriculumModule | undefined {
  return CURRICULUM.find((m) => m.slug === slug)
}

export function getCoreModules(): CurriculumModule[] {
  return CURRICULUM.filter((m) => m.track === 'core')
}

export function getOptionalModules(): CurriculumModule[] {
  return CURRICULUM.filter((m) => m.track === 'optional')
}

export function getPageIndex(mod: CurriculumModule, pageId: string): number {
  return mod.pages.findIndex((p) => p.id === pageId)
}
