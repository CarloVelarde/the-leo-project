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
  mdnWebWorks: {
    id: 'mdnWebWorks',
    title: 'How the web works',
    url: 'https://developer.mozilla.org/en-US/docs/Learn_web_development/Getting_started/Web_standards/How_the_web_works',
    kind: 'edu',
    org: 'MDN Web Docs',
    blurb: 'Client/server, DNS, HTTP, and why messages are split into packets.',
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
  hpbnTcp: {
    id: 'hpbnTcp',
    title: 'Building Blocks of TCP',
    url: 'https://hpbn.co/building-blocks-of-tcp/',
    kind: 'reference',
    org: 'High Performance Browser Networking',
    blurb: 'Handshake costs ~1 RTT; reliability vs timeliness — useful Advanced depth after M1.',
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
  codeOrgInternet: {
    id: 'codeOrgInternet',
    title: 'How the Internet Works (video series)',
    url: 'https://code.org/en-US/resources/videos',
    kind: 'video',
    org: 'Code.org',
    blurb: 'Classroom series: Internet, wires, IP/DNS, packets — free for education.',
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
    blurb: 'Official overview of LEO design, phased arrays, optical ISLs, and thrusters. Marketing tone — pair with Space Safety docs for altitudes.',
  },
  starlinkAltitudes: {
    id: 'starlinkAltitudes',
    title: 'Starlink Constellation Altitudes',
    url: 'https://space-safety.starlink.com/docs/space-safety-articles/constellation_altitudes/',
    kind: 'official',
    org: 'Starlink Space Safety',
    blurb: 'Planned shell altitudes, inclinations, lifecycle, and deorbit rationale. Prefer over marketing “~550 km” for current planning.',
  },
  starlinkBestPractices: {
    id: 'starlinkBestPractices',
    title: 'Space Safety Best Practices',
    url: 'https://space-safety.starlink.com/docs/space-safety-articles/best_practices/',
    kind: 'official',
    org: 'Starlink Space Safety',
    blurb: 'Operator-stated practices: propulsion, ephemeris sharing, proactive deorbit.',
  },
  starlinkDemisability: {
    id: 'starlinkDemisability',
    title: 'Approach to Satellite Demisability',
    url: 'https://starlink.com/public-files/Starlink_Approach_to_Satellite_Demisability.pdf',
    kind: 'official',
    org: 'Starlink / SpaceX',
    blurb: 'Public PDF on propulsive deorbit, ocean reentry targets, and demise design claims.',
  },
  esaOrbits: {
    id: 'esaOrbits',
    title: 'Types of orbits',
    url: 'https://www.esa.int/Enabling_Support/Space_Transportation/Types_of_orbits',
    kind: 'official',
    org: 'European Space Agency',
    blurb: 'Authoritative beginner-friendly GEO/LEO/MEO definitions and why constellations exist.',
  },
  esaFrequency: {
    id: 'esaFrequency',
    title: 'Satellite frequency bands',
    url: 'https://www.esa.int/Applications/Connectivity_and_Secure_Communications/Satellite_frequency_bands',
    kind: 'official',
    org: 'European Space Agency',
    blurb: 'Ku, Ka, and higher bands explained for satellite communications.',
  },
  esaDebris2025: {
    id: 'esaDebris2025',
    title: 'ESA Space Environment Report 2025',
    url: 'https://www.esa.int/Space_Safety/Space_Debris/ESA_Space_Environment_Report_2025',
    kind: 'official',
    org: 'European Space Agency',
    blurb: 'Annual picture of the orbital debris and traffic environment.',
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
  celestrak: {
    id: 'celestrak',
    title: 'CelesTrak',
    url: 'https://celestrak.org/',
    kind: 'independent',
    org: 'CelesTrak',
    blurb: 'Public orbital element sets and group files (including Starlink) for catalog literacy.',
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
  fccDeorbit5y: {
    id: 'fccDeorbit5y',
    title: 'FCC 5-year satellite deorbit rule',
    url: 'https://www.fcc.gov/document/fcc-adopts-new-5-year-rule-deorbiting-satellites-0',
    kind: 'official',
    org: 'U.S. Federal Communications Commission',
    blurb: 'LEO disposal as soon as practicable and no later than 5 years after end of mission (U.S. licensing).',
  },
  nasaOrbits: {
    id: 'nasaOrbits',
    title: 'What Is an Orbit?',
    url: 'https://www.nasa.gov/audience/forstudents/5-8/features/nasa-knows/what-is-orbit-58.html',
    kind: 'edu',
    org: 'NASA',
    blurb: 'Simple orbit intuition suitable before optional math sections.',
  },
  nasaLeoFaq: {
    id: 'nasaLeoFaq',
    title: 'What is Low Earth Orbit? (LEO Economy FAQ)',
    url: 'https://www.nasa.gov/humans-in-space/leo-economy-frequently-asked-questions/',
    kind: 'official',
    org: 'NASA',
    blurb: 'Official NASA framing of LEO (≤ ~2,000 km) for the commercial LEO economy.',
  },
  nasaEarthdataOrbits: {
    id: 'nasaEarthdataOrbits',
    title: 'Orbits (Earth observation data basics)',
    url: 'https://www.earthdata.nasa.gov/learn/earth-observation-data-basics/orbits',
    kind: 'edu',
    org: 'NASA Earthdata',
    blurb: 'LEO / MEO / GSO altitudes and GEO vs geosynchronous in plain language.',
  },
  nasaLcrd: {
    id: 'nasaLcrd',
    title: 'Laser Communications Relay Demonstration (LCRD)',
    url: 'https://www.nasa.gov/directorates/stmd/tech-demo-missions-program/laser-communications-relay-demonstration-lcrd-overview/',
    kind: 'official',
    org: 'NASA',
    blurb: 'Public intro to optical space links — context for ISL concepts without proprietary claims.',
  },
  nasaDebrisFaq: {
    id: 'nasaDebrisFaq',
    title: 'Orbital Debris FAQ',
    url: 'https://orbitaldebris.jsc.nasa.gov/faq/',
    kind: 'official',
    org: 'NASA Orbital Debris Program Office',
    blurb: 'Authoritative FAQ on debris sources, risk, and mitigation.',
  },
  wikiWalker: {
    id: 'wikiWalker',
    title: 'Satellite constellation (overview)',
    url: 'https://en.wikipedia.org/wiki/Satellite_constellation',
    kind: 'reference',
    org: 'Wikipedia (starting point)',
    blurb: 'High-level constellation taxonomy; follow citations for peer-reviewed depth.',
  },
  ietf: {
    id: 'ietf',
    title: 'How the Internet Works',
    url: 'https://www.internetsociety.org/internet/how-it-works/',
    kind: 'edu',
    org: 'Internet Society',
    blurb: 'Non-profit overview of Internet architecture and governance context.',
  },
  isocLeo: {
    id: 'isocLeo',
    title: 'Perspectives on LEO Satellites',
    url: 'https://www.internetsociety.org/resources/doc/2022/perspectives-on-leo-satellites/',
    kind: 'edu',
    org: 'Internet Society',
    blurb: 'Accessible connectivity overview of LEO broadband systems.',
  },
  cboLeo: {
    id: 'cboLeo',
    title: 'Large Constellations of Low-Altitude Satellites: A Primer',
    url: 'https://www.cbo.gov/publication/59175',
    kind: 'reference',
    org: 'U.S. Congressional Budget Office',
    blurb: 'Policy-oriented primer on why mega-constellations need so many satellites (2023).',
  },
  radarPhasedArray: {
    id: 'radarPhasedArray',
    title: 'Phased Array Antenna',
    url: 'https://www.radartutorial.eu/06.antennas/Phased%20Array%20Antenna.en.html',
    kind: 'edu',
    org: 'RadarTutorial.eu',
    blurb: 'Clear conceptual intro to phased arrays and electronic beam steering.',
  },
  iauCps: {
    id: 'iauCps',
    title: 'IAU Centre for the Protection of the Dark and Quiet Sky',
    url: 'https://cps.iau.org/',
    kind: 'official',
    org: 'International Astronomical Union',
    blurb: 'Astronomy community hub for satellite constellation impacts and mitigation.',
  },
  satcon1: {
    id: 'satcon1',
    title: 'SATCON1 Report',
    url: 'https://aas.org/sites/default/files/2020-08/SATCON1-Report.pdf',
    kind: 'paper',
    org: 'AAS / NOIRLab',
    blurb: 'Foundational report on constellation impacts on optical/IR astronomy.',
  },
  orbitalMechanicsSpace: {
    id: 'orbitalMechanicsSpace',
    title: 'Orbital Mechanics & Astrodynamics',
    url: 'https://orbital-mechanics.space/',
    kind: 'edu',
    org: 'orbital-mechanics.space (Weber)',
    blurb: 'Free undergrad-friendly orbital mechanics reference for optional math depth.',
  },
  onewebTech: {
    id: 'onewebTech',
    title: 'Eutelsat OneWeb — network overview',
    url: 'https://oneweb.net/network',
    kind: 'official',
    org: 'Eutelsat OneWeb',
    blurb: 'Public LEO broadband network framing — use for design-point comparison, dated.',
  },
  kuiperOverview: {
    id: 'kuiperOverview',
    title: 'Project Kuiper overview',
    url: 'https://www.aboutamazon.com/what-we-do/devices-services/project-kuiper',
    kind: 'official',
    org: 'Amazon / Project Kuiper',
    blurb: 'Operator overview of another NGSO broadband constellation (marketing; date claims).',
  },
  ituSpace: {
    id: 'ituSpace',
    title: 'ITU Radiocommunication — space services',
    url: 'https://www.itu.int/en/ITU-R/',
    kind: 'official',
    org: 'International Telecommunication Union',
    blurb: 'Global spectrum and GSO/NGSO coordination framework — not a beginner orbit textbook.',
  },
  fccSpace: {
    id: 'fccSpace',
    title: 'FCC Space Bureau / satellite coordination',
    url: 'https://www.fcc.gov/space',
    kind: 'official',
    org: 'U.S. Federal Communications Commission',
    blurb: 'U.S. licensing and international satellite coordination entry point.',
  },
}

export function getSource(id: string): Source | undefined {
  return SOURCES[id]
}

export function getSources(ids: string[]): Source[] {
  return ids.map((id) => SOURCES[id]).filter(Boolean) as Source[]
}
