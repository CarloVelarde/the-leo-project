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

/** Core pathway: internet → GEO → LEO → ops → constellation → terminal → network → synthesis. */
export const MODULES: ModuleMeta[] = [
  {
    id: 'm1',
    slug: 'internet-foundations',
    order: 1,
    title: 'How the Internet Actually Moves Data',
    subtitle: 'Packets, delay vs capacity, three paths home. Shared vocabulary for everything after.',
    goal: 'Build a mental model of how data crosses the Internet so satellite designs make sense.',
    minutes: 24,
    status: 'ready',
    track: 'core',
    objectives: [
      'Explain packets and packet switching in plain language',
      'Distinguish latency from bandwidth and give everyday examples of each',
      'Explain why RTT multiplies protocol cost (e.g. TCP handshake) and how loss differs from delay',
      'Contrast fiber, cellular, and satellite as access paths that still carry IP',
    ],
    keyTerms: [
      'packet',
      'latency',
      'bandwidth',
      'router',
      'hop',
      'rtt',
      'client-server',
      'ip',
      'tcp',
      'jitter',
    ],
    sourceIds: [
      'mdnInternet',
      'mdnLatency',
      'hpbnLatency',
      'hpbnTcp',
      'khanPackets',
      'crashCourseNetworks',
      'crashCourseInternet',
      'codeOrgInternet',
    ],
  },
  {
    id: 'm2',
    slug: 'geo-problem',
    order: 2,
    title: 'Why Ordinary Satellite Internet Felt Slow',
    subtitle: 'Tall orbits and why classic satellite internet felt slow.',
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
    keyTerms: ['geo', 'propagation-delay', 'rtt', 'footprint', 'bent-pipe', 'sidereal-day'],
    sourceIds: ['esaOrbits', 'starlinkTech', 'satsigLatency', 'mdnLatency', 'nasaEarthdataOrbits'],
    labHint: 'Compare GEO-like distance mentally; use lab altitude extremes later.',
  },
  {
    id: 'm3',
    slug: 'leo-advantage',
    order: 3,
    title: 'Low Earth Orbit: Why Closer Changes Everything',
    subtitle: 'Lower orbits, lower delay, and why one satellite is never enough.',
    goal: 'Understand why LEO slashes latency and forces a constellation architecture.',
    minutes: 20,
    status: 'ready',
    track: 'core',
    objectives: [
      'Define LEO using ESA/NASA-style altitude bounds and typical speeds/periods',
      'Compare LEO, MEO, and GEO on altitude, coverage, and latency floor',
      'Relate lower altitude to lower propagation delay',
      'Explain why a single LEO sat cannot provide continuous coverage',
    ],
    keyTerms: ['leo', 'orbital-period', 'constellation', 'coverage-gap', 'meo', 'ngso'],
    sourceIds: ['esaOrbits', 'starlinkTech', 'nasaOrbits', 'nasaLeoFaq', 'cboLeo'],
    labHint: 'Open lab: change altitude and watch period + latency estimates.',
  },
  {
    id: 'm4',
    slug: 'launch-and-ops',
    order: 4,
    title: 'Getting Satellites into Orbit & Keeping Them There',
    subtitle: 'Launch, raise, caretaking thrusters, and planned disposal.',
    goal: 'See the engineering lifecycle that makes a mega-constellation possible.',
    minutes: 18,
    status: 'ready',
    track: 'core',
    objectives: [
      'Outline launch → insertion → orbit raise → service → deorbit at a high level',
      'Explain why station-keeping matters in dense LEO',
      'Describe the role of electric propulsion for Starlink-class sats',
      'Connect disposal design to long-term space safety',
    ],
    keyTerms: ['station-keeping', 'ion-thruster', 'deorbit', 'orbit-raise', 'waypoint', 'ephemeris'],
    sourceIds: ['starlinkTech', 'starlinkAltitudes', 'starlinkBestPractices', 'esaOrbits', 'fccDeorbit5y'],
  },
  {
    id: 'm5',
    slug: 'constellation-design',
    order: 5,
    title: 'What a Constellation Actually Is',
    subtitle: 'Shells, planes, density, and why coverage is not capacity.',
    goal: 'Read a constellation design as geometry + shared capacity, not a vague “cloud of sats.”',
    minutes: 26,
    status: 'ready',
    track: 'core',
    objectives: [
      'Define shell, orbital plane, inclination, and phasing in accessible terms',
      'Explain how many planes × sats-per-plane produce continuous coverage',
      'Distinguish coverage (geometry) from capacity (shared spectrum and beams)',
      'Describe multi-shell planning using public Space Safety altitude bands (dated)',
      'Use independent catalogs (e.g. McDowell) as a reality check on what is flying',
    ],
    keyTerms: [
      'shell',
      'orbital-plane',
      'inclination',
      'phasing',
      'walker',
      'raan',
      'spot-beam',
      'capacity-density',
    ],
    sourceIds: [
      'starlinkAltitudes',
      'mcdowellStarlink',
      'esaOrbits',
      'wikiWalker',
      'fccStarlink',
      'celestrak',
      'cboLeo',
      'isocLeo',
    ],
    labHint: 'Sparse vs dense scenarios; planes × sats controls.',
  },
  {
    id: 'm6',
    slug: 'user-terminal',
    order: 6,
    title: 'Your Terminal Talking to a Fast-Moving Satellite',
    subtitle: 'Radio bands, flat dishes, clear sky, and handovers.',
    goal: 'Understand how a flat user terminal links to LEO sats — radio class and geometry.',
    minutes: 26,
    status: 'ready',
    track: 'core',
    objectives: [
      'Name Ku/Ka-class band roles and the capacity vs weather trade',
      'Explain electronic beam steering with phased arrays at a conceptual level',
      'Define elevation, min elevation, and obstruction as real outage causes',
      'Describe establish / maintain / hand over for a user link',
      'Relate lab “serving sat” and handoff counters to real user experience',
    ],
    keyTerms: [
      'phased-array',
      'handoff',
      'elevation',
      'user-terminal',
      'beam-steering',
      'pass',
      'slant-range',
      'ku-band',
      'ka-band',
      'rain-fade',
      'obstruction',
      'link-budget',
    ],
    sourceIds: [
      'starlinkTech',
      'esaOrbits',
      'esaFrequency',
      'radarPhasedArray',
      'cboLeo',
    ],
    labHint: 'Watch handoffs, elevation, and online/offline in the lab.',
  },
  {
    id: 'm7',
    slug: 'space-network',
    order: 7,
    title: 'The Bigger Network: Lasers, Gateways, and Routing',
    subtitle: 'What happens after packets leave your dish.',
    goal: 'See Starlink as a moving space mesh attached to the terrestrial Internet.',
    minutes: 24,
    status: 'ready',
    track: 'core',
    objectives: [
      'Distinguish user link, gateway (ground station) link, and inter-satellite link',
      'Explain gateways as scarce fiber on-ramps (diversity, congestion, remote paths)',
      'Sketch a packet path: user → sat → (optional ISLs) → gateway → Internet',
      'Explain why optical ISLs matter for long-haul and ocean coverage',
      'Contrast bent-pipe relay intuition with regenerative / mesh ideas',
    ],
    keyTerms: [
      'isl',
      'gateway',
      'routing',
      'space-mesh',
      'ground-station',
      'bent-pipe',
      'regenerative',
      'ka-band',
    ],
    sourceIds: ['starlinkTech', 'mdnInternet', 'nasaLcrd', 'esaFrequency', 'isocLeo', 'cboLeo'],
  },
  {
    id: 'm8',
    slug: 'end-to-end',
    order: 8,
    title: 'Putting It All Together',
    subtitle: 'Full path, performance stack, lab limits, and honesty.',
    goal: 'Integrate Modules 1–7 into one coherent picture of LEO broadband performance.',
    minutes: 26,
    status: 'ready',
    track: 'core',
    objectives: [
      'Narrate a realistic end-to-end packet journey',
      'Separate geometric light-time floor from mean RTT, jitter, and outages',
      'Predict failures: obstruction, congestion, weather, handoff blips',
      'Use the lab as geometry coach while naming what it does not model',
      'Name open algorithmic problems without proprietary claims',
    ],
    keyTerms: [
      'rtt',
      'handoff',
      'routing',
      'scheduling',
      'performance',
      'jitter',
      'capacity-density',
      'obstruction',
    ],
    sourceIds: [
      'starlinkTech',
      'mdnLatency',
      'hpbnLatency',
      'mcdowellStarlink',
      'starlinkAltitudes',
      'esaFrequency',
      'cboLeo',
    ],
    labHint: 'Sparse vs dense; min elevation; latitude; remember capacity is not simulated.',
  },
]

/** Optional side tracks — full lessons, not required for the core story. */
export const OPTIONAL_MODULES: ModuleMeta[] = [
  {
    id: 'opt-math',
    slug: 'optional-orbit-math',
    order: 101,
    title: 'Optional: Orbit math that actually helps',
    subtitle: 'Kepler period, light-time, and footprint geometry with the lab formulas.',
    goal: 'Give motivated learners the equations behind the insight panel.',
    minutes: 25,
    status: 'ready',
    track: 'optional',
    objectives: [
      'Compute circular-orbit period from altitude',
      'Compute pure light-time from distance',
      'Relate footprint geometry to altitude and elevation',
    ],
    keyTerms: ['orbital-period', 'propagation-delay', 'footprint', 'slant-range'],
    sourceIds: ['esaOrbits', 'nasaOrbits', 'hpbnLatency', 'satsigLatency', 'orbitalMechanicsSpace'],
  },
  {
    id: 'opt-debris',
    slug: 'optional-space-safety',
    order: 102,
    title: 'Optional: Debris, astronomy, and space safety',
    subtitle: 'Balanced intro to congestion, deorbit policy, and observational impacts.',
    goal: 'Frame sustainability trade-offs without hype.',
    minutes: 25,
    status: 'ready',
    track: 'optional',
    objectives: [
      'Explain density and altitude effects on debris risk',
      'Describe deorbit as part of constellation design',
      'Name astronomy impacts (trails, brightness) with primary sources',
      'Use independent catalogs for population claims',
    ],
    keyTerms: ['deorbit', 'station-keeping', 'shell', 'ephemeris', 'kessler'],
    sourceIds: [
      'starlinkAltitudes',
      'starlinkBestPractices',
      'starlinkDemisability',
      'mcdowellStarlink',
      'nasaDebrisFaq',
      'esaDebris2025',
      'iauCps',
      'satcon1',
      'fccDeorbit5y',
    ],
  },
  {
    id: 'opt-dtc',
    slug: 'optional-direct-to-cell',
    order: 103,
    title: 'Optional: Direct-to-cell and future evolution',
    subtitle: 'Phone connectivity from space and how shells continue to change.',
    goal: 'Connect lower shells and DTC variants to the core constellation story.',
    minutes: 18,
    status: 'ready',
    track: 'optional',
    objectives: [
      'Contrast dish broadband vs direct-to-cell constraints',
      'Relate DTC to lower shell planning',
      'Watch multi-shell evolution with calibrated sources',
    ],
    keyTerms: ['shell', 'user-terminal', 'phased-array', 'direct-to-cell', 'link-budget'],
    sourceIds: ['starlinkAltitudes', 'starlinkTech', 'mcdowellStarlink', 'esaOrbits'],
  },
  {
    id: 'opt-code',
    slug: 'optional-code-path',
    order: 104,
    title: 'Optional: Programmer path',
    subtitle: 'Python models, parameter sweeps, and a portfolio brief.',
    goal: 'Map code-alongs, sweep parameters, and ship a labeled toy model.',
    minutes: 30,
    status: 'ready',
    track: 'optional',
    objectives: [
      'State why code re-expresses models already taught conceptually',
      'Locate each exercise on the core path',
      'Compose light-time and hop count; sweep altitude/mask parameters',
      'Describe a portfolio deliverable with explicit model assumptions',
    ],
    keyTerms: ['propagation-delay', 'orbital-period', 'hop', 'handoff', 'routing'],
    sourceIds: ['hpbnLatency', 'esaOrbits', 'orbitalMechanicsSpace'],
  },
  {
    id: 'opt-compare',
    slug: 'optional-comparative',
    order: 105,
    title: 'Optional: Comparative design points',
    subtitle: 'LEO dish, direct-to-cell, GEO HTS, and other NGSO as architecture choices.',
    goal: 'Compare systems on orbit, terminal, latency floor, and capacity trade-offs without brand war.',
    minutes: 18,
    status: 'ready',
    track: 'optional',
    objectives: [
      'List axes for comparing broadband satellite architectures',
      'Contrast LEO dish, DTC, GEO HTS, and other NGSO design points',
      'Date-stamp public claims and refuse proprietary algorithm stories',
    ],
    keyTerms: ['leo', 'geo', 'ngso', 'direct-to-cell', 'constellation', 'gateway'],
    sourceIds: [
      'starlinkTech',
      'starlinkAltitudes',
      'onewebTech',
      'kuiperOverview',
      'esaOrbits',
      'cboLeo',
      'isocLeo',
      'fccSpace',
      'ituSpace',
    ],
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
