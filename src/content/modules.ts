import { getSources, type Source } from './sources'

export type ModuleMeta = {
  id: string
  slug: string
  order: number
  title: string
  subtitle: string
  /** One-sentence learning promise */
  goal: string
  /** Approx. reading time minutes */
  minutes: number
  status: 'ready' | 'stub' | 'optional'
  /** Track: core path vs optional later */
  track: 'core' | 'optional'
  objectives: string[]
  keyTerms: string[]
  /** Source ids from sources.ts */
  sourceIds: string[]
  /** Lab scenario / deep-link params for coupling */
  labHint?: string
}

/** Core pathway M1–M8: internet → GEO problem → LEO → ops → constellation → terminal → network → synthesis. */
export const MODULES: ModuleMeta[] = [
  {
    id: 'm1',
    slug: 'internet-foundations',
    order: 1,
    title: 'How the Internet Actually Moves Data',
    subtitle: 'Packets, routers, latency vs bandwidth — shared vocabulary for everything after.',
    goal: 'Build a mental model of how data crosses the Internet so satellite designs make sense.',
    minutes: 18,
    status: 'ready',
    track: 'core',
    objectives: [
      'Explain packets and packet switching in plain language',
      'Distinguish latency from bandwidth and give everyday examples of each',
      'Describe the client–server model and why round-trip time (RTT) hurts interactive apps',
      'Define hop and router at a high level',
    ],
    keyTerms: ['packet', 'latency', 'bandwidth', 'router', 'hop', 'rtt', 'client-server'],
    sourceIds: [
      'mdnInternet',
      'mdnLatency',
      'hpbnLatency',
      'khanPackets',
      'crashCourseNetworks',
      'crashCourseInternet',
    ],
  },
  {
    id: 'm2',
    slug: 'geo-problem',
    order: 2,
    title: 'Why Ordinary Satellite Internet Felt Slow',
    subtitle: 'Geostationary orbit, light-time delay, and the GEO broadband trade-off.',
    goal: 'Connect Module 1 latency ideas to the physics of ~35,786 km GEO satellites.',
    minutes: 16,
    status: 'ready',
    track: 'core',
    objectives: [
      'State what GEO is and why a GEO satellite appears fixed in the sky',
      'Estimate pure light-time delay for a GEO hop and contrast with fiber experience',
      'Explain why high RTT hurts calls, games, and many web protocols',
      'Name the coverage advantage GEO still has (few satellites, wide footprint)',
    ],
    keyTerms: ['geo', 'propagation-delay', 'rtt', 'footprint', 'bent-pipe'],
    sourceIds: ['esaOrbits', 'starlinkTech', 'satsigLatency', 'mdnLatency'],
    labHint: 'Compare GEO-like distance mentally; use lab altitude extremes later.',
  },
  {
    id: 'm3',
    slug: 'leo-advantage',
    order: 3,
    title: 'Low Earth Orbit: Why Closer Changes Everything',
    subtitle: 'LEO altitudes, speed, period — and why one satellite is never enough.',
    goal: 'Understand why LEO slashes latency and forces a constellation architecture.',
    minutes: 16,
    status: 'ready',
    track: 'core',
    objectives: [
      'Define LEO using ESA-style altitude bounds and typical speeds/periods',
      'Relate lower altitude to lower propagation delay and stronger links (intuitively)',
      'Explain why a single LEO sat cannot provide continuous coverage for a user',
      'State the constellation requirement in one sentence',
    ],
    keyTerms: ['leo', 'orbital-period', 'constellation', 'coverage-gap', 'meo'],
    sourceIds: ['esaOrbits', 'starlinkTech', 'nasaOrbits'],
    labHint: 'Open lab: change altitude and watch period + latency estimates.',
  },
  {
    id: 'm4',
    slug: 'launch-and-ops',
    order: 4,
    title: 'Getting Satellites into Orbit & Keeping Them There',
    subtitle: 'Launch, raise, station-keeping, ion thrusters, and planned deorbit.',
    goal: 'See the engineering lifecycle that makes a mega-constellation possible.',
    minutes: 15,
    status: 'ready',
    track: 'core',
    objectives: [
      'Outline launch → insertion → orbit raise → service → deorbit at a high level',
      'Explain why station-keeping matters in dense LEO',
      'Describe the role of ion (electric) propulsion for Starlink-class sats',
      'Connect dense packing and frequent launches to coverage continuity',
    ],
    keyTerms: ['station-keeping', 'ion-thruster', 'deorbit', 'orbit-raise', 'waypoint'],
    sourceIds: ['starlinkTech', 'starlinkAltitudes', 'esaOrbits'],
  },
  {
    id: 'm5',
    slug: 'constellation-design',
    order: 5,
    title: 'What a Constellation Actually Is',
    subtitle: 'Shells, planes, inclination, phasing — arranging thousands of moving nodes.',
    goal: 'Read a constellation design as geometry + coverage policy, not a vague “cloud of sats.”',
    minutes: 20,
    status: 'ready',
    track: 'core',
    objectives: [
      'Define shell, orbital plane, inclination, and phasing in accessible terms',
      'Explain how many planes × sats-per-plane produce continuous coverage',
      'Describe Starlink’s multi-shell idea using public Space Safety altitude bands',
      'Use independent catalogs (e.g. McDowell) as a reality check on what is flying',
    ],
    keyTerms: ['shell', 'orbital-plane', 'inclination', 'phasing', 'walker', 'raan'],
    sourceIds: ['starlinkAltitudes', 'mcdowellStarlink', 'esaOrbits', 'wikiWalker', 'fccStarlink'],
    labHint: 'Sparse vs dense scenarios; planes × sats controls.',
  },
  {
    id: 'm6',
    slug: 'user-terminal',
    order: 6,
    title: 'Your Terminal Talking to a Fast-Moving Satellite',
    subtitle: 'Phased arrays, electronic steering, links, and handovers.',
    goal: 'Understand how a flat user terminal tracks LEO sats without a mechanical dish.',
    minutes: 18,
    status: 'ready',
    track: 'core',
    objectives: [
      'Explain electronic beam steering with phased arrays at a conceptual level',
      'Describe establish / maintain / hand over for a user link',
      'Connect elevation, footprint, and why LEO handovers are frequent',
      'Relate lab “serving sat” and handoff counters to real user experience',
    ],
    keyTerms: ['phased-array', 'handoff', 'elevation', 'user-terminal', 'beam-steering'],
    sourceIds: ['starlinkTech', 'esaOrbits'],
    labHint: 'Watch handoffs, elevation, and online/offline in the lab.',
  },
  {
    id: 'm7',
    slug: 'space-network',
    order: 7,
    title: 'The Bigger Network: Lasers, Gateways, and Routing',
    subtitle: 'Inter-satellite links, ground stations, and packets that leave the dish.',
    goal: 'See Starlink as a moving space mesh attached to the terrestrial Internet.',
    minutes: 17,
    status: 'ready',
    track: 'core',
    objectives: [
      'Distinguish user link, gateway (ground station) link, and inter-satellite link',
      'Sketch a packet path: user → sat → (optional ISLs) → gateway → Internet',
      'Explain why optical ISLs matter for long-haul and ocean coverage',
      'Frame the network as a time-varying graph (without proprietary claims)',
    ],
    keyTerms: ['isl', 'gateway', 'routing', 'space-mesh', 'ground-station'],
    sourceIds: ['starlinkTech', 'mdnInternet'],
  },
  {
    id: 'm8',
    slug: 'end-to-end',
    order: 8,
    title: 'Putting It All Together',
    subtitle: 'End-to-end path, handovers in practice, performance, and algorithm problems.',
    goal: 'Integrate Modules 1–7 into one coherent picture of LEO broadband performance.',
    minutes: 20,
    status: 'ready',
    track: 'core',
    objectives: [
      'Narrate a realistic end-to-end packet journey',
      'Connect observed latency ingredients: propagation, processing, routing, congestion',
      'Explain continuity under handovers and mobility at a systems level',
      'Name the open algorithmic problems: sat selection, scheduling, routing on a dynamic graph',
    ],
    keyTerms: ['rtt', 'handoff', 'routing', 'scheduling', 'performance'],
    sourceIds: ['starlinkTech', 'mdnLatency', 'hpbnLatency', 'mcdowellStarlink'],
    labHint: 'Revisit sparse vs dense; predict handoff rate and coverage gaps.',
  },
]

/** Optional later tracks (stubs for navigation; content expands over time). */
export const OPTIONAL_MODULES: ModuleMeta[] = [
  {
    id: 'opt-math',
    slug: 'optional-orbit-math',
    order: 101,
    title: 'Optional: Orbit math that actually helps',
    subtitle: 'Kepler period, light-time, and footprint geometry with the lab formulas.',
    goal: 'Give motivated learners the equations behind the insight panel.',
    minutes: 25,
    status: 'stub',
    track: 'optional',
    objectives: [],
    keyTerms: [],
    sourceIds: ['esaOrbits', 'nasaOrbits'],
  },
  {
    id: 'opt-debris',
    slug: 'optional-space-safety',
    order: 102,
    title: 'Optional: Debris, astronomy, and space safety',
    subtitle: 'Balanced intro to congestion, deorbit policy, and observational impacts.',
    goal: 'Frame sustainability trade-offs without hype.',
    minutes: 20,
    status: 'stub',
    track: 'optional',
    objectives: [],
    keyTerms: [],
    sourceIds: ['starlinkAltitudes', 'mcdowellStarlink'],
  },
  {
    id: 'opt-dtc',
    slug: 'optional-direct-to-cell',
    order: 103,
    title: 'Optional: Direct-to-cell and future evolution',
    subtitle: 'Phone connectivity from space and how shells continue to change.',
    goal: 'Connect lower shells and DTC variants to the core constellation story.',
    minutes: 15,
    status: 'stub',
    track: 'optional',
    objectives: [],
    keyTerms: [],
    sourceIds: ['starlinkAltitudes', 'starlinkTech'],
  },
]

export function getModuleBySlug(slug: string): ModuleMeta | undefined {
  return MODULES.find((m) => m.slug === slug) ?? OPTIONAL_MODULES.find((m) => m.slug === slug)
}

export function getModuleById(id: string): ModuleMeta | undefined {
  return MODULES.find((m) => m.id === id) ?? OPTIONAL_MODULES.find((m) => m.id === id)
}

export function sourcesForModule(mod: ModuleMeta): Source[] {
  return getSources(mod.sourceIds)
}
