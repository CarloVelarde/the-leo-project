/**
 * Multi-page curriculum: each module is a sequence of short pages
 * (minimal scroll — navigate with Next / Previous).
 *
 * Path design (beginner → systems):
 *   Internet vocabulary → GEO distance problem → LEO + regimes → fleet ops
 *   → constellation geometry → user terminal → space network → synthesis
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
    subtitle: 'Packets, delay vs capacity, three paths home',
    goal: 'Shared vocabulary for everything that follows.',
    minutes: 28,
    track: 'core',
    pages: [
      { id: 'intro', title: 'Why start with the Internet?', navLabel: 'Intro' },
      { id: 'packets', title: 'Packets and packet switching', navLabel: 'Packets' },
      { id: 'latency', title: 'Delay, capacity, and round trips', navLabel: 'Latency' },
      { id: 'paths', title: 'Fiber, cellular, satellite', navLabel: 'Paths' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'm2',
    slug: 'geo-problem',
    order: 2,
    title: 'Why Ordinary Satellite Internet Felt Slow',
    subtitle: 'Tall orbits and the delay tax',
    goal: 'Connect delay ideas to about 36,000 km of height.',
    minutes: 18,
    track: 'core',
    pages: [
      { id: 'intro', title: 'Geostationary orbit in plain language', navLabel: 'GEO' },
      { id: 'delay', title: 'Distance becomes delay', navLabel: 'Delay' },
      { id: 'tradeoffs', title: 'What GEO still wins', navLabel: 'Tradeoffs' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'm3',
    slug: 'leo-advantage',
    order: 3,
    title: 'Low Earth Orbit: Why Closer Changes Everything',
    subtitle: 'Lower orbits, lower delay, many satellites',
    goal: 'Why lower delay forces a whole fleet.',
    minutes: 22,
    track: 'core',
    pages: [
      { id: 'intro', title: 'What LEO means', navLabel: 'LEO' },
      { id: 'regimes', title: 'LEO, MEO, and GEO compared', navLabel: 'Regimes' },
      { id: 'latency', title: 'The delay win', navLabel: 'Latency' },
      { id: 'coverage', title: 'Why one satellite is not enough', navLabel: 'Coverage' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'm4',
    slug: 'launch-and-ops',
    order: 4,
    title: 'Getting Satellites into Orbit and Keeping Them There',
    subtitle: 'Launch, raise, caretaking, disposal',
    goal: 'The lifecycle behind a living fleet.',
    minutes: 20,
    track: 'core',
    pages: [
      { id: 'lifecycle', title: 'Satellite lifecycle', navLabel: 'Lifecycle' },
      { id: 'control', title: 'Station keeping and thrusters', navLabel: 'Control' },
      { id: 'deorbit', title: 'End of life and disposal', navLabel: 'Deorbit' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'm5',
    slug: 'constellation-design',
    order: 5,
    title: 'What a Constellation Actually Is',
    subtitle: 'Shells, planes, density, and shared capacity',
    goal: 'Read a fleet as planned geometry plus shared capacity.',
    minutes: 28,
    track: 'core',
    pages: [
      { id: 'terms', title: 'Shells, planes, inclination', navLabel: 'Terms' },
      { id: 'density', title: 'Density and coverage', navLabel: 'Density' },
      { id: 'capacity', title: 'Coverage is not capacity', navLabel: 'Capacity' },
      { id: 'reality', title: 'Public data and reality checks', navLabel: 'Reality' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'm6',
    slug: 'user-terminal',
    order: 6,
    title: 'Your Terminal Talking to a Fast Moving Satellite',
    subtitle: 'Radio bands, flat dishes, clear sky, handovers',
    goal: 'How a flat dish links to low orbit satellites.',
    minutes: 28,
    track: 'core',
    pages: [
      { id: 'spectrum', title: 'Radio bands and weather', navLabel: 'Spectrum' },
      { id: 'array', title: 'Phased array terminals', navLabel: 'Arrays' },
      { id: 'elevation', title: 'Elevation, clear sky, obstruction', navLabel: 'Elevation' },
      { id: 'handoff', title: 'Links and handovers', navLabel: 'Handovers' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'm7',
    slug: 'space-network',
    order: 7,
    title: 'The Bigger Network: Lasers, Gateways, and Routing',
    subtitle: 'What happens after packets leave your dish',
    goal: 'User links, scarce gateways, and the space mesh.',
    minutes: 26,
    track: 'core',
    pages: [
      { id: 'links', title: 'Three kinds of links', navLabel: 'Links' },
      { id: 'gateways', title: 'Gateways as scarce on ramps', navLabel: 'Gateways' },
      { id: 'mesh', title: 'The space mesh', navLabel: 'Mesh' },
      { id: 'payload', title: 'Simple relays vs smarter satellites', navLabel: 'Payload' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'm8',
    slug: 'end-to-end',
    order: 8,
    title: 'Putting It All Together',
    subtitle: 'Full path, performance stack, lab, honesty',
    goal: 'Synthesize the full system story: floor vs experience.',
    minutes: 28,
    track: 'core',
    pages: [
      { id: 'journey', title: 'A packet’s journey', navLabel: 'Journey' },
      { id: 'performance', title: 'What performance is made of', navLabel: 'Performance' },
      { id: 'lab', title: 'Capstone experiments', navLabel: 'Lab' },
      { id: 'honest', title: 'What we can and cannot know', navLabel: 'Honesty' },
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
    goal: 'Density, deorbit, sky impacts, and catalogs.',
    minutes: 25,
    track: 'optional',
    pages: [
      { id: 'density', title: 'Why density matters', navLabel: 'Density' },
      { id: 'deorbit', title: 'Deorbit & rules', navLabel: 'Deorbit' },
      { id: 'astronomy', title: 'Trails & the night sky', navLabel: 'Astronomy' },
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
  {
    id: 'opt-code',
    slug: 'optional-code-path',
    order: 104,
    title: 'Programmer path: models in Python',
    subtitle: 'Optional · code-alongs, sweeps, portfolio',
    goal: 'Re-express lab models and ship a small portfolio piece.',
    minutes: 30,
    track: 'optional',
    pages: [
      { id: 'why', title: 'Why code these models?', navLabel: 'Why' },
      { id: 'path', title: 'Exercise map', navLabel: 'Map' },
      { id: 'compose', title: 'Compose: delay × hops', navLabel: 'Compose' },
      { id: 'sweep', title: 'Parameter sweeps', navLabel: 'Sweep' },
      { id: 'portfolio', title: 'Portfolio capstone', navLabel: 'Portfolio' },
      { id: 'check', title: 'Check your intuition', navLabel: 'Quiz' },
    ],
  },
  {
    id: 'opt-compare',
    slug: 'optional-comparative',
    order: 105,
    title: 'Comparative design points',
    subtitle: 'Optional · LEO dish, DTC, GEO HTS, other NGSO',
    goal: 'Compare architectures on orbit, user gear, latency, and trade-offs — not brand scores.',
    minutes: 18,
    track: 'optional',
    pages: [
      { id: 'frame', title: 'How to compare systems', navLabel: 'Frame' },
      { id: 'points', title: 'Design points side by side', navLabel: 'Points' },
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
