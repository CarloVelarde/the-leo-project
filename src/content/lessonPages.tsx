/**
 * Short, page-sized lesson bodies. One viewport of content + one interactive.
 */
import type { ReactNode } from 'react'
import { Advanced } from '@/ui/Advanced'
import { Callout } from '@/ui/Callout'
import { CodeAlongCard } from '@/ui/CodeAlongCard'
import { FurtherReading } from '@/ui/FurtherReading'
import { InlineSource } from '@/ui/InlineSource'
import { LabButton } from '@/ui/LabButton'
import { Objectives } from '@/ui/Objectives'
import { CoverageSandbox } from '@/ui/interactives/CoverageSandbox'
import { HandoffDemo } from '@/ui/interactives/HandoffDemo'
import { LatencyCompare } from '@/ui/interactives/LatencyCompare'
import { LessonMiniSim } from '@/ui/interactives/LessonMiniSim'
import { LifecycleDiagram } from '@/ui/interactives/LifecycleDiagram'
import { NetworkPathDiagram } from '@/ui/interactives/NetworkPathDiagram'
import { OrbitAltitudeDiagram } from '@/ui/interactives/OrbitAltitudeDiagram'
import { PacketPathViz } from '@/ui/interactives/PacketPathViz'
import { PhasedArrayDiagram } from '@/ui/interactives/PhasedArrayDiagram'
import { Quiz } from '@/ui/interactives/Quiz'
import { VideoEmbed } from '@/ui/interactives/VideoEmbed'
import { getSources } from '@/content/sources'

export function getLessonPage(slug: string, pageId: string): ReactNode | null {
  const key = `${slug}/${pageId}`
  return PAGES[key] ?? null
}

const PAGES: Record<string, ReactNode> = {
  /* ─── M1 ─── */
  'internet-foundations/intro': (
    <>
      <Objectives
        items={[
          'Explain packets and packet switching',
          'Distinguish latency from bandwidth',
          'Why RTT hurts interactive apps',
        ]}
      />
      <p>
        Before satellites, we need a shared picture of <strong>how the Internet moves data</strong>.
        You do not need to be a network engineer — only a few precise words: packet, router,
        latency, bandwidth, hop.
      </p>
      <p>
        The Internet is a <strong>network of networks</strong>. Your laptop, café Wi‑Fi, city fiber,
        undersea cables, and data centers connect so a message from <em>here</em> can reach{' '}
        <em>there</em>. See MDN’s walkthrough in <InlineSource id="mdnInternet" />.
      </p>
      <Callout title="Why this comes first" variant="key">
        Every later module — GEO delay, LEO coverage, handovers — is really a story about packets
        and latency under extreme geometry.
      </Callout>
    </>
  ),
  'internet-foundations/packets': (
    <>
      <p>
        Large messages are split into <strong>packets</strong> — small chunks with payload plus
        addressing. That design is <strong>packet switching</strong>: many users share links;
        losses hurt pieces, not whole files; paths can adapt.
      </p>
      <p>
        A <strong>router</strong> reads a destination and forwards to the next hop — like a postal
        system for bits. More hops can mean more delay (processing + queues + distance).
      </p>
      <PacketPathViz />
      <VideoEmbed
        youtubeId="aD_yi5VjF78"
        title="Packets, routers, and reliability"
        caption="Optional Khan Academy video with Vint Cerf — strong intuition, ~6 minutes."
      />
    </>
  ),
  'internet-foundations/latency': (
    <>
      <p>
        Do not mix these up: <strong>latency</strong> is delay; <strong>bandwidth</strong> is how
        much data flows per second once moving. A thick hose can still feel slow if water takes
        forever to start.
      </p>
      <p>
        <strong>RTT</strong> (round-trip time) is request + response. Calls, games, and many web
        protocols wait on RTTs. Rough human bands: ~20–40 ms feels snappy; ~500 ms+ makes
        conversation awkward. Details: <InlineSource id="mdnLatency" />,{' '}
        <InlineSource id="hpbnLatency" />.
      </p>
      <Callout title="Carry this forward" variant="note">
        Application → packets → hops → RTT limits → user experience. Next: put a satellite at
        ~36,000 km into that chain.
      </Callout>
      <Advanced title="Speed of light floor">
        Propagation delay is bounded by c. One-way time t = d/c. Fiber is slower than vacuum —
        long-haul comparisons get subtle (see HPBN).
      </Advanced>
    </>
  ),
  'internet-foundations/check': (
    <>
      <Quiz
        title="Check your intuition"
        questions={[
          {
            id: 'q1',
            prompt: 'Huge bandwidth but 600 ms RTT — what is most true?',
            options: [
              { id: 'a', label: 'Everything feels instant because bandwidth is high.' },
              {
                id: 'b',
                label: 'Interactive apps can still feel sluggish due to round trips.',
                correct: true,
              },
              { id: 'c', label: 'Latency and bandwidth are the same metric.' },
            ],
            explanation:
              'Bandwidth is capacity; latency is delay. Games and calls care about RTT.',
          },
          {
            id: 'q2',
            prompt: 'Why use packets?',
            options: [
              {
                id: 'a',
                label: 'Sharing, resilience, and flexible forwarding.',
                correct: true,
              },
              { id: 'b', label: 'Because light requires packets.' },
              { id: 'c', label: 'Routers can only store one packet forever.' },
            ],
            explanation: 'Packet switching is an architectural choice, not a physics law.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources([
          'mdnInternet',
          'mdnLatency',
          'hpbnLatency',
          'khanPackets',
          'crashCourseNetworks',
        ])}
      />
    </>
  ),

  /* ─── M2 ─── */
  'geo-problem/intro': (
    <>
      <Objectives
        items={[
          'What GEO is and why it looks fixed',
          'Why few GEO sats cover huge areas',
        ]}
      />
      <p>
        Classic “satellite Internet” usually meant <strong>geostationary (GEO)</strong> satellites
        above the equator at about <strong>35,786 km</strong>, matching Earth’s rotation so they
        appear fixed in the sky (<InlineSource id="esaOrbits" />).
      </p>
      <p>
        Superpower: aim a dish once. Coverage superpower: huge footprints — a handful of sats can
        cover most of the populated world.
      </p>
      <OrbitAltitudeDiagram />
    </>
  ),
  'geo-problem/delay': (
    <>
      <p>
        Distance becomes time. Rough pure light-time for up+down to GEO overhead: 2 × 35,786 km / c
        ≈ <strong>240 ms</strong> (<InlineSource id="satsigLatency" />). Real interactive RTT is
        often <strong>500–700+ ms</strong> with gateways and processing.
      </p>
      <p>
        Bandwidth does not fix this — a thicker hose does not shorten the hose. Starlink’s public
        tech story contrasts LEO latency with traditional satellite Internet (
        <InlineSource id="starlinkTech" />).
      </p>
      <LatencyCompare />
      <CodeAlongCard moduleSlug="geo-problem" pageId="delay" />
    </>
  ),
  'geo-problem/tradeoffs': (
    <>
      <p>
        GEO still wins for broadcast and delay-tolerant apps, mature industry, and simple fixed
        antennas. LEO is not “GEO but better at everything” — it wins latency and enables different
        terminals, at the cost of a far more complex space segment.
      </p>
      <Callout title="Bridge" variant="lab">
        If delay is mostly distance, fly lower. Next module: what LEO buys — and the continuous
        coverage problem it creates.
      </Callout>
      <LabButton
        label="Preview sparse LEO in the lab"
        params={{ planes: 4, satsPerPlane: 6, altitudeKm: 550 }}
      />
    </>
  ),
  'geo-problem/check': (
    <>
      <Quiz
        title="Check your intuition — GEO"
        questions={[
          {
            id: 'g1',
            prompt: 'Why does GEO look fixed?',
            options: [
              { id: 'a', label: 'It is not moving relative to the stars.' },
              {
                id: 'b',
                label: 'Its period matches Earth’s rotation over the equator.',
                correct: true,
              },
              { id: 'c', label: 'Thrusters hover with zero orbital speed.' },
            ],
            explanation: 'Sidereal-day period above the equator keeps the ground track fixed.',
          },
          {
            id: 'g2',
            prompt: 'Rough pure up+down light-time to GEO overhead?',
            options: [
              { id: 'a', label: '2 ms' },
              { id: 'b', label: '24 ms' },
              { id: 'c', label: '240 ms', correct: true },
            ],
            explanation: '2 × ~36,000 km / c ≈ 0.24 s. User RTT is often higher.',
          },
        ]}
      />
      <FurtherReading sources={getSources(['esaOrbits', 'starlinkTech', 'satsigLatency', 'mdnLatency'])} />
    </>
  ),

  /* ─── M3 ─── */
  'leo-advantage/intro': (
    <>
      <Objectives
        items={[
          'Define LEO (altitude, speed, period)',
          'State why constellations are required',
        ]}
      />
      <p>
        <strong>LEO</strong> is relatively close to Earth — ESA frames it as under ~2,000 km, with
        typical speeds ~7.8 km/s and periods ~90 minutes (<InlineSource id="esaOrbits" />). Below
        ~180 km, atmosphere is too dense for long stays.
      </p>
      <p>
        Starlink-class broadband lives here — not at GEO. Navigation systems often use MEO in
        between.
      </p>
    </>
  ),
  'leo-advantage/latency': (
    <>
      <p>
        Closer means far less light-time on the space hop — interactive apps become plausible again
        (<InlineSource id="starlinkTech" />). Closer also helps link budgets (stronger signals for a
        given power), enabling flatter user terminals later.
      </p>
      <LatencyCompare />
      <Callout title="Not zero latency" variant="note">
        Processing, queues, gateways, and ISLs still add delay. LEO removes the GEO distance tax —
        it does not repeal networking.
      </Callout>
      <CodeAlongCard moduleSlug="leo-advantage" pageId="latency" />
    </>
  ),
  'leo-advantage/coverage': (
    <>
      <p>
        A GEO sat lingers; a LEO sat crosses your sky in minutes. ESA: LEO communications sats
        usually work as a <strong>constellation</strong> — a net for continuous coverage (
        <InlineSource id="esaOrbits" />).
      </p>
      <LessonMiniSim
        title="Sparse LEO"
        caption="Few sats → gaps. Density is the product."
        params={{ planes: 3, satsPerPlane: 5, altitudeKm: 550, timeScale: 100 }}
      />
      <LabButton
        label="Denser shell in the lab"
        params={{ planes: 24, satsPerPlane: 40, altitudeKm: 550 }}
      />
    </>
  ),
  'leo-advantage/check': (
    <>
      <Quiz
        title="Check your intuition — LEO"
        questions={[
          {
            id: 'l1',
            prompt: 'ESA-style LEO is roughly…',
            options: [
              {
                id: 'a',
                label: 'Under ~2,000 km, ~7.8 km/s, ~90 min periods.',
                correct: true,
              },
              { id: 'b', label: 'Fixed at 35,786 km.' },
              { id: 'c', label: 'Only at lunar distance.' },
            ],
            explanation: 'Near-Earth regime for ISS and mega-constellations.',
          },
          {
            id: 'l2',
            prompt: 'Why not one LEO sat for always-on home broadband?',
            options: [
              {
                id: 'a',
                label: 'It only covers you briefly each pass.',
                correct: true,
              },
              { id: 'b', label: 'LEO sats cannot carry radios.' },
              { id: 'c', label: 'Light is slower in LEO than GEO.' },
            ],
            explanation: 'Continuous service needs many coordinated satellites.',
          },
        ]}
      />
      <FurtherReading sources={getSources(['esaOrbits', 'starlinkTech', 'nasaOrbits'])} />
    </>
  ),

  /* ─── M4 ─── */
  'launch-and-ops/lifecycle': (
    <>
      <Objectives
        items={['Outline launch → raise → service → deorbit', 'Why ops enable the constellation']}
      />
      <p>
        A constellation is a <strong>fleet</strong>: launch, raise, park in slots, station-keep,
        replace, deorbit. Starlink’s public safety docs describe insertion, waypoints, multi-year
        service, and deorbit (<InlineSource id="starlinkAltitudes" />).
      </p>
      <LifecycleDiagram />
    </>
  ),
  'launch-and-ops/control': (
    <>
      <p>
        LEO feels atmosphere and perturbations. <strong>Station-keeping</strong> holds spacing for
        coverage and safety. <strong>Ion thrusters</strong> offer efficient low thrust for raise and
        long-duration control (<InlineSource id="starlinkTech" />).
      </p>
      <p>
        Launch cadence is architecture: populate planes, replace failures, re-shell as plans evolve.
        Independent tracking (e.g. <InlineSource id="mcdowellStarlink" />) shows the living fleet.
      </p>
      <Callout title="Pedagogy" variant="note">
        We teach public problem classes — not proprietary autonomy software.
      </Callout>
    </>
  ),
  'launch-and-ops/check': (
    <>
      <Quiz
        title="Operations check"
        questions={[
          {
            id: 'o1',
            prompt: 'Station-keeping is mainly…',
            options: [
              {
                id: 'a',
                label: 'Holding assigned orbits/slots against drag and perturbations.',
                correct: true,
              },
              { id: 'b', label: 'Broadcasting TV to GEO dishes.' },
              { id: 'c', label: 'Turning thrusters off forever after launch.' },
            ],
            explanation: 'Dense LEO needs continuous control.',
          },
          {
            id: 'o2',
            prompt: 'Ion thrusters are attractive because…',
            options: [
              { id: 'a', label: 'Huge ground-launch thrust.' },
              {
                id: 'b',
                label: 'Efficient low thrust for raise and years of station-keeping.',
                correct: true,
              },
              { id: 'c', label: 'They remove the need for gateways.' },
            ],
            explanation: 'Electric propulsion trades thrust for efficiency.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources(['starlinkTech', 'starlinkAltitudes', 'mcdowellStarlink', 'esaOrbits'])}
      />
    </>
  ),

  /* ─── M5 ─── */
  'constellation-design/terms': (
    <>
      <Objectives
        items={['Define shell, plane, inclination, phasing', 'Walker-style intuition']}
      />
      <p>
        A <strong>constellation</strong> is coordinated geometry: altitude (shell), tilt
        (inclination), number of rings (planes), sats per ring, and spacing (phasing).{' '}
        <strong>RAAN</strong> orients planes around Earth.
      </p>
      <p>
        Public Starlink shells list altitudes and inclinations (e.g. 43°, 53°, 70°, ~97°) during
        multi-shell planning (<InlineSource id="starlinkAltitudes" />). Our lab uses a simplified
        even pattern — not a reverse-engineered layout.
      </p>
    </>
  ),
  'constellation-design/density': (
    <>
      <p>
        Too few planes or sats → gaps. Higher density → fewer gaps, more handovers. Inclination and
        user latitude interact for polar coverage.
      </p>
      <CoverageSandbox />
      <LessonMiniSim
        title="Dense shell"
        params={{ planes: 20, satsPerPlane: 30, altitudeKm: 550, timeScale: 70 }}
      />
      <CodeAlongCard moduleSlug="constellation-design" pageId="density" />
    </>
  ),
  'constellation-design/reality': (
    <>
      <p>
        Shell altitudes and counts are time-sensitive. Prefer{' '}
        <InlineSource id="starlinkAltitudes">Space Safety altitude docs</InlineSource> and{' '}
        <InlineSource id="mcdowellStarlink">McDowell’s catalog</InlineSource> over screenshots.
        FCC filings are the legal envelope; operations evolve inside it.
      </p>
      <LabButton
        label="High-latitude user scenario"
        params={{ planes: 12, satsPerPlane: 20, inclinationDeg: 70, userLatDeg: 70 }}
      />
    </>
  ),
  'constellation-design/check': (
    <>
      <Quiz
        title="Constellation check"
        questions={[
          {
            id: 'c1',
            prompt: 'An orbital plane is…',
            options: [
              {
                id: 'a',
                label: 'A flat slice containing a ring of satellite paths.',
                correct: true,
              },
              { id: 'b', label: 'A gateway brand name.' },
              { id: 'c', label: 'The speed of light in fiber.' },
            ],
            explanation: 'Planes are geometric rings; many wrap the Earth.',
          },
          {
            id: 'c2',
            prompt: 'Best independent check for “how many are flying”?',
            options: [
              { id: 'a', label: 'McDowell-style catalogs with dates.', correct: true },
              { id: 'b', label: 'Any viral meme.' },
              { id: 'c', label: 'Assume first FCC filing never changed.' },
            ],
            explanation: 'The fleet is dynamic; timestamps matter.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources([
          'starlinkAltitudes',
          'mcdowellStarlink',
          'esaOrbits',
          'fccStarlink',
        ])}
      />
    </>
  ),

  /* ─── M6 ─── */
  'user-terminal/array': (
    <>
      <Objectives
        items={['Phased-array electronic steering', 'Why not a mechanical GEO dish']}
      />
      <p>
        LEO sats move. Mechanically slewing a heavy dish is a poor consumer design. Public Starlink
        materials emphasize <strong>phased arrays</strong> that steer beams electronically (
        <InlineSource id="starlinkTech" />).
      </p>
      <PhasedArrayDiagram />
      <Callout title="Scope" variant="warning">
        We teach the problem class — not proprietary element counts or beam schedules.
      </Callout>
    </>
  ),
  'user-terminal/handoff': (
    <>
      <p>
        Session sketch: discover sats above min elevation → select serving sat → point beams →
        carry packets → <strong>hand over</strong> before the link dies. Good systems aim for
        make-before-break continuity.
      </p>
      <HandoffDemo />
      <LabButton
        label="Watch handoffs in 3D lab"
        params={{ planes: 12, satsPerPlane: 20, userLatDeg: 40, timeScale: 120 }}
      />
      <CodeAlongCard moduleSlug="user-terminal" pageId="handoff" />
    </>
  ),
  'user-terminal/check': (
    <>
      <Quiz
        title="Terminals & handovers"
        questions={[
          {
            id: 't1',
            prompt: 'Phased arrays steer mainly by…',
            options: [
              {
                id: 'a',
                label: 'Adjusting phases across many elements.',
                correct: true,
              },
              { id: 'b', label: 'Only mechanical dish rotation at LEO rates.' },
              { id: 'c', label: 'Turning off all but one fixed element.' },
            ],
            explanation: 'Electronic steering enables flat LEO terminals.',
          },
          {
            id: 't2',
            prompt: 'A handoff is…',
            options: [
              {
                id: 'a',
                label: 'Switching serving satellite as geometry changes.',
                correct: true,
              },
              { id: 'b', label: 'Deleting the user IP forever.' },
              { id: 'c', label: 'Moving a sat from GEO to LEO mid-call.' },
            ],
            explanation: 'Sats rise and set; attachment points must change.',
          },
        ]}
      />
      <FurtherReading sources={getSources(['starlinkTech', 'esaOrbits', 'mdnLatency'])} />
    </>
  ),

  /* ─── M7 ─── */
  'space-network/links': (
    <>
      <Objectives
        items={['User link vs gateway vs ISL', 'Sketch end-to-end paths']}
      />
      <p>
        Three links: <strong>user</strong> (terminal↔sat), <strong>gateway</strong> (sat↔ground
        station↔fiber), <strong>ISL</strong> (sat↔sat, often optical). Official materials discuss
        laser inter-satellite links at high rates (<InlineSource id="starlinkTech" />).
      </p>
      <NetworkPathDiagram />
    </>
  ),
  'space-network/mesh': (
    <>
      <p>
        Gateways are on/off ramps to the Internet you met in Module 1. ISLs let packets hop across
        the sky before descending — useful over oceans and sparse ground infrastructure.
      </p>
      <p>
        Routing is a <strong>time-varying graph</strong>: neighbors appear and disappear. Problem
        class only — not proprietary algorithms. Apps still send ordinary IP (
        <InlineSource id="mdnInternet" />).
      </p>
      <CodeAlongCard moduleSlug="space-network" pageId="mesh" />
    </>
  ),
  'space-network/check': (
    <>
      <Quiz
        title="Space network check"
        questions={[
          {
            id: 'n1',
            prompt: 'A gateway’s main job…',
            options: [
              {
                id: 'a',
                label: 'Connect the satellite network to terrestrial Internet.',
                correct: true,
              },
              { id: 'b', label: 'Mechanically steer every user dish.' },
              { id: 'c', label: 'Keep GEO sats from falling into LEO.' },
            ],
            explanation: 'Fiber on/off ramps for space access.',
          },
          {
            id: 'n2',
            prompt: 'Optical ISLs primarily…',
            options: [
              {
                id: 'a',
                label: 'Route traffic sat-to-sat before a gateway exit.',
                correct: true,
              },
              { id: 'b', label: 'Remove the need for user terminals.' },
              { id: 'c', label: 'Set orbital period to one year.' },
            ],
            explanation: 'Space mesh reduces gateway-under-every-footprint dependence.',
          },
        ]}
      />
      <FurtherReading sources={getSources(['starlinkTech', 'mdnInternet', 'hpbnLatency'])} />
    </>
  ),

  /* ─── M8 ─── */
  'end-to-end/journey': (
    <>
      <Objectives
        items={['Narrate end-to-end path', 'Name latency ingredients']}
      />
      <p>
        Video call sketch: app packets → terminal phased array → serving sat → gateway or ISL mesh
        → terrestrial Internet → reverse path — while handovers keep you online. Goal: keep RTT
        interactive, unlike GEO’s distance tax (<InlineSource id="starlinkTech" />).
      </p>
      <NetworkPathDiagram />
    </>
  ),
  'end-to-end/performance': (
    <>
      <p>
        Latency stack: propagation + processing + queueing + routing path + handover transients +
        terrestrial tail. LEO mainly attacks space-segment propagation vs GEO (
        <InlineSource id="mdnLatency" />, <InlineSource id="hpbnLatency" />).
      </p>
      <p>
        Algorithm problem classes: sat selection, beam scheduling, dynamic routing, handover
        planning, station-keeping substrate — without claiming vendor internals.
      </p>
    </>
  ),
  'end-to-end/lab': (
    <>
      <p>
        Experiments: sparse vs dense online time; altitude vs period/light-time; latitude vs shell
        design; raise min elevation and watch coverage shrink.
      </p>
      <CoverageSandbox />
      <HandoffDemo />
      <LabButton
        label="Capstone dense lab"
        params={{ planes: 30, satsPerPlane: 40, altitudeKm: 550, timeScale: 100 }}
      />
    </>
  ),
  'end-to-end/check': (
    <>
      <Quiz
        title="Capstone quiz"
        questions={[
          {
            id: 'e1',
            prompt: 'LEO primarily improves vs GEO…',
            options: [
              {
                id: 'a',
                label: 'Space-segment propagation delay via shorter paths.',
                correct: true,
              },
              { id: 'b', label: 'Removing all Earth routers.' },
              { id: 'c', label: 'Eliminating IP packets.' },
            ],
            explanation: 'Closer sats cut light-time; networking remains.',
          },
          {
            id: 'e2',
            prompt: 'End-to-end latency is only light-time to the serving sat.',
            options: [
              { id: 'a', label: 'True.' },
              {
                id: 'b',
                label: 'False — processing, queues, routing, handovers, terrestrial tails add.',
                correct: true,
              },
            ],
            explanation: 'Performance is a stack of ingredients.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources([
          'starlinkTech',
          'starlinkAltitudes',
          'mcdowellStarlink',
          'mdnLatency',
          'esaOrbits',
        ])}
      />
      <Callout title="Core path complete" variant="lab">
        Optional tracks add orbit math, space safety, and direct-to-cell — without blocking this
        foundation.
      </Callout>
    </>
  ),

  /* ─── Optional math ─── */
  'optional-orbit-math/period': (
    <>
      <p>
        Circular orbit: a = R<sub>E</sub> + h, T = 2π √(a³/μ), v = √(μ/a). Light-time t = d/c.
        Constants match the lab (`sim/constants.ts`).
      </p>
      <LatencyCompare />
      <LabButton label="Lab at 550 km" params={{ altitudeKm: 550 }} />
    </>
  ),
  'optional-orbit-math/footprint': (
    <>
      <p>
        Geometric footprint half-angle with min elevation ε uses spherical Earth geometry (lab
        draws this ring). Higher h tends to enlarge footprints; higher ε shrinks usable sky.
      </p>
      <Advanced title="Formula">
        λ = arccos((R<sub>E</sub>/a) cos ε) − ε — Earth-central angle from nadir to edge of
        visibility.
      </Advanced>
      <Callout title="Honesty" variant="warning">
        Circular Kepler + geometric elevation only — not full RF or J2.
      </Callout>
    </>
  ),
  'optional-orbit-math/check': (
    <>
      <Quiz
        title="Math check"
        questions={[
          {
            id: 'm1',
            prompt: 'Higher altitude → circular period…',
            options: [
              { id: 'a', label: 'Increases.', correct: true },
              { id: 'b', label: 'Always decreases.' },
              { id: 'c', label: 'Fixed at 90 min forever.' },
            ],
            explanation: 'T grows with a^{3/2}.',
          },
          {
            id: 'm2',
            prompt: 'Double path length at fixed c…',
            options: [
              { id: 'a', label: 'Doubles pure light-time.', correct: true },
              { id: 'b', label: 'Halves light-time.' },
              { id: 'c', label: 'No effect.' },
            ],
            explanation: 't = d/c is linear in distance.',
          },
        ]}
      />
      <FurtherReading sources={getSources(['esaOrbits', 'nasaOrbits', 'hpbnLatency'])} />
    </>
  ),

  /* ─── Optional safety ─── */
  'optional-space-safety/density': (
    <>
      <p>
        Risk scales with object count, size, and time in crowded altitudes. Operators care about
        deconflicted shells, tracking, avoidance, and disposal (
        <InlineSource id="starlinkAltitudes" />).
      </p>
      <LifecycleDiagram />
    </>
  ),
  'optional-space-safety/deorbit': (
    <>
      <p>
        Lower shells can shorten passive decay if propulsion fails — a safety argument with more
        drag trade-offs. Independent catalogs (
        <InlineSource id="mcdowellStarlink" />) verify population. Astronomy impacts are real and
        measured; prefer primary papers over headlines.
      </p>
      <Callout title="Tone" variant="note">
        Core modules teach connectivity; this track holds capability and cost together.
      </Callout>
    </>
  ),
  'optional-space-safety/check': (
    <>
      <Quiz
        title="Safety check"
        questions={[
          {
            id: 's1',
            prompt: 'Lower altitude if propulsion fails can help because…',
            options: [
              {
                id: 'a',
                label: 'Drag removes objects faster (shorter passive decay).',
                correct: true,
              },
              { id: 'b', label: 'Sats leave Earth’s gravity.' },
              { id: 'c', label: 'Light is faster below 500 km.' },
            ],
            explanation: 'Atmospheric drag rises as altitude falls.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources(['starlinkAltitudes', 'mcdowellStarlink', 'starlinkTech'])}
      />
    </>
  ),

  /* ─── Optional DTC ─── */
  'optional-direct-to-cell/contrast': (
    <>
      <p>
        Dish broadband uses high-gain phased arrays. <strong>Direct-to-cell</strong> targets
        ordinary phones — tiny antennas, brutal link budgets, often messaging-first with operator
        partnerships.
      </p>
      <OrbitAltitudeDiagram />
    </>
  ),
  'optional-direct-to-cell/shells': (
    <>
      <p>
        Public planning associates DTC with lower altitude bands while broadband occupies nearby
        LEO shells (<InlineSource id="starlinkAltitudes" />). Multi-shell design is product
        architecture under evolution — calibrate with official docs and independent tracking.
      </p>
    </>
  ),
  'optional-direct-to-cell/check': (
    <>
      <Quiz
        title="DTC check"
        questions={[
          {
            id: 'd1',
            prompt: 'DTC is harder than dish broadband mainly because…',
            options: [
              {
                id: 'a',
                label: 'Phone antennas have far less gain and power margin.',
                correct: true,
              },
              { id: 'b', label: 'Phones cannot use IP.' },
              { id: 'c', label: 'LEO cannot see phones.' },
            ],
            explanation: 'Link budget dominates; constellation geometry still required.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources(['starlinkAltitudes', 'starlinkTech', 'mcdowellStarlink'])}
      />
    </>
  ),
}
