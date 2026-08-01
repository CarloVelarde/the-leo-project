export type GlossaryTerm = {
  id: string
  term: string
  short: string
  body: string
}

/** Seed glossary for v1 terminology. Expand as modules land. */
export const GLOSSARY: GlossaryTerm[] = [
  {
    id: 'leo',
    term: 'LEO',
    short: 'Low Earth Orbit — typically a few hundred to ~2,000 km altitude.',
    body: 'Low Earth Orbit. Satellites move quickly relative to the ground, enabling lower latency than GEO, but requiring many satellites and frequent handoffs for continuous service.',
  },
  {
    id: 'geo',
    term: 'GEO',
    short: 'Geostationary orbit — ~35,786 km, appears fixed in the sky.',
    body: 'Geostationary Earth Orbit. A satellite above the equator with a ~24-hour period stays fixed relative to a ground observer. Great for continuous coverage with one sat, but high latency and large terminals historically.',
  },
  {
    id: 'orbital-plane',
    term: 'Orbital plane',
    short: 'A flat slice of space containing a ring of satellite orbits.',
    body: 'An orbital plane is defined by inclination and orientation (RAAN). Mega-constellations use many planes so that coverage is continuous as Earth rotates and satellites move.',
  },
  {
    id: 'handoff',
    term: 'Handoff',
    short: 'Switching the user from one serving satellite to another.',
    body: 'Because LEO satellites race across the sky, a user terminal must switch satellites regularly while trying to keep the connection seamless.',
  },
  {
    id: 'gateway',
    term: 'Gateway',
    short: 'Ground station linking the satellite network to the internet.',
    body: 'Also called a ground station. Traffic often goes user → satellite → gateway → terrestrial internet, unless inter-satellite links route around the globe first.',
  },
  {
    id: 'isl',
    term: 'ISL',
    short: 'Inter-satellite link — often laser links between satellites.',
    body: 'Inter-satellite links let data hop satellite-to-satellite in space, reducing dependence on nearby ground gateways for long-haul paths.',
  },
  {
    id: 'phased-array',
    term: 'Phased array',
    short: 'Antenna that steers beams electronically without mechanical dishes.',
    body: 'By controlling the phase of many small antenna elements, a terminal or satellite can point beams electronically — key to flat user terminals and agile satellite beams.',
  },
  {
    id: 'footprint',
    term: 'Footprint',
    short: 'The region on Earth a satellite can serve at a given time.',
    body: 'Roughly the area where the satellite is above a minimum elevation angle for a user. Higher altitude → larger footprint; lower altitude → smaller cells and often lower latency.',
  },
]

export function getTerm(id: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.id === id)
}
