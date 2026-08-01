/**
 * Curated high-quality sources for the learning path.
 * Prefer primary/official docs, then well-known educational or independent technical sources.
 */

export type SourceKind =
  | 'official'
  | 'edu'
  | 'video'
  | 'paper'
  | 'independent'
  | 'reference'

export type Source = {
  id: string
  title: string
  url: string
  kind: SourceKind
  org: string
  blurb: string
}

export const SOURCES: Record<string, Source> = {
  mdnInternet: {
    id: 'mdnInternet',
    title: 'How does the Internet work?',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Web_mechanics/How_does_the_Internet_work',
    kind: 'edu',
    org: 'MDN Web Docs',
    blurb: 'Accessible explanation of networks, routers, and packets for technical beginners.',
  },
  mdnLatency: {
    id: 'mdnLatency',
    title: 'Understanding latency',
    url: 'https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Understanding_latency',
    kind: 'edu',
    org: 'MDN Web Docs',
    blurb: 'Defines latency, round-trip delay, and why it matters for real user experience.',
  },
  hpbnLatency: {
    id: 'hpbnLatency',
    title: 'Primer on Latency and Bandwidth',
    url: 'https://hpbn.co/primer-on-latency-and-bandwidth/',
    kind: 'reference',
    org: 'High Performance Browser Networking (Ilya Grigorik)',
    blurb: 'Gold-standard technical primer on latency vs bandwidth and the speed of light.',
  },
  khanPackets: {
    id: 'khanPackets',
    title: 'Packets, routers, and reliability',
    url: 'https://www.khanacademy.org/computing/code-org/computers-and-the-internet/internet-works/v/the-internet-packet-routers-and-reliability',
    kind: 'video',
    org: 'Khan Academy / Code.org',
    blurb: 'Short video with Vint Cerf on packets, routers, and reliable delivery.',
  },
  khanWhatIsInternet: {
    id: 'khanWhatIsInternet',
    title: 'What is the Internet?',
    url: 'https://www.khanacademy.org/computing/computers-and-internet/xcae6f4a7ff015e7d:the-internet/xcae6f4a7ff015e7d:introducing-the-internet/v/what-is-the-internet',
    kind: 'video',
    org: 'Khan Academy',
    blurb: 'Vint Cerf on what the Internet is (and who is “in charge”).',
  },
  crashCourseNetworks: {
    id: 'crashCourseNetworks',
    title: 'Computer Networks — Crash Course CS #28',
    url: 'https://www.youtube.com/watch?v=3QhU9jd03a0',
    kind: 'video',
    org: 'Crash Course Computer Science',
    blurb: 'Visual intro to LANs, packet switching, switches, and TCP/IP ideas.',
  },
  crashCourseInternet: {
    id: 'crashCourseInternet',
    title: 'The Internet — Crash Course CS #29',
    url: 'https://www.youtube.com/watch?v=AEaKrq3SpW8',
    kind: 'video',
    org: 'Crash Course Computer Science',
    blurb: 'DNS, IP packets, TCP vs UDP — excellent intuition for later modules.',
  },
  starlinkTech: {
    id: 'starlinkTech',
    title: 'Starlink Technology',
    url: 'https://www.starlink.com/technology',
    kind: 'official',
    org: 'Starlink / SpaceX',
    blurb: 'Official overview of LEO design, phased arrays, optical ISLs, and ion thrusters.',
  },
  starlinkAltitudes: {
    id: 'starlinkAltitudes',
    title: 'Starlink Constellation Altitudes',
    url: 'https://space-safety.starlink.com/docs/space-safety-articles/constellation_altitudes/',
    kind: 'official',
    org: 'Starlink Space Safety',
    blurb: 'Current/planned shell altitudes, inclinations, lifecycle, and deorbit rationale (as of 2026 planning).',
  },
  esaOrbits: {
    id: 'esaOrbits',
    title: 'Types of orbits',
    url: 'https://www.esa.int/Enabling_Support/Space_Transportation/Types_of_orbits',
    kind: 'official',
    org: 'European Space Agency',
    blurb: 'Authoritative beginner-friendly GEO/LEO/MEO definitions and why constellations exist.',
  },
  mcdowellStarlink: {
    id: 'mcdowellStarlink',
    title: 'Starlink Statistics (Jonathan McDowell)',
    url: 'https://planet4589.org/space/con/star/stats.html',
    kind: 'independent',
    org: 'Jonathan McDowell / planet4589.org',
    blurb: 'Widely cited independent catalog of Starlink satellites on orbit by shell and status.',
  },
  mcdowellStarlinkIndex: {
    id: 'mcdowellStarlinkIndex',
    title: 'Starlink pages index',
    url: 'https://planet4589.org/space/con/star/',
    kind: 'independent',
    org: 'Jonathan McDowell',
    blurb: 'Entry point to McDowell’s Starlink tracking tables and notes.',
  },
  satsigLatency: {
    id: 'satsigLatency',
    title: 'Geostationary satellite latency',
    url: 'https://www.satsig.net/latency.htm',
    kind: 'reference',
    org: 'SatSig / technical note',
    blurb: 'Clear light-time math for GEO one-hop delay (~240 ms up+down at nadir).',
  },
  fccStarlink: {
    id: 'fccStarlink',
    title: 'FCC SpaceX/Starlink authorization materials',
    url: 'https://www.fcc.gov/document/fcc-authorizes-spacex-provide-broadband-satellite-services',
    kind: 'official',
    org: 'U.S. Federal Communications Commission',
    blurb: 'Regulatory authorizations and public records underlying constellation design claims.',
  },
  nasaOrbits: {
    id: 'nasaOrbits',
    title: 'What Is an Orbit?',
    url: 'https://www.nasa.gov/audience/forstudents/5-8/features/nasa-knows/what-is-orbit-58.html',
    kind: 'edu',
    org: 'NASA',
    blurb: 'Simple orbit intuition suitable before optional math sections.',
  },
  wikiWalker: {
    id: 'wikiWalker',
    title: 'Walker constellation (overview)',
    url: 'https://en.wikipedia.org/wiki/Satellite_constellation',
    kind: 'reference',
    org: 'Wikipedia (starting point)',
    blurb: 'High-level constellation taxonomy; follow citations for peer-reviewed depth.',
  },
  ietf: {
    id: 'ietf',
    title: 'How the Internet Works (IETF educational materials)',
    url: 'https://www.internetsociety.org/internet/how-it-works/',
    kind: 'edu',
    org: 'Internet Society',
    blurb: 'Non-profit overview of Internet architecture and governance context.',
  },
}

export function getSource(id: string): Source | undefined {
  return SOURCES[id]
}

export function getSources(ids: string[]): Source[] {
  return ids.map((id) => SOURCES[id]).filter(Boolean) as Source[]
}
