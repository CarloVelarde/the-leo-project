/**
 * Lesson bodies: clear, beginner friendly, one idea per page.
 * Voice: calm high school science teacher. Explain terms on first use.
 * Models: circular orbits, geometric elevation, parametric shells. No proprietary claims.
 */
import type { ReactNode } from 'react'
import { Advanced } from '@/ui/Advanced'
import { Callout } from '@/ui/Callout'
import { CodeAlongCard } from '@/ui/CodeAlongCard'
import { FurtherReading } from '@/ui/FurtherReading'
import { InlineSource } from '@/ui/InlineSource'
import { LabButton } from '@/ui/LabButton'
import { Objectives } from '@/ui/Objectives'
import { RelatedLinks } from '@/ui/RelatedLinks'
import { AccessPathDiagram } from '@/ui/interactives/AccessPathDiagram'
import { CapacityVsCoverage } from '@/ui/interactives/CapacityVsCoverage'
import { ComparativeDesignCard } from '@/ui/interactives/ComparativeDesignCard'
import { CoverageSandbox } from '@/ui/interactives/CoverageSandbox'
import { GatewayScarcity } from '@/ui/interactives/GatewayScarcity'
import { HandoffDemo } from '@/ui/interactives/HandoffDemo'
import { KeyNumbers } from '@/ui/interactives/KeyNumbers'
import { LatencyCompare } from '@/ui/interactives/LatencyCompare'
import { LatencyStack } from '@/ui/interactives/LatencyStack'
import { LessonMiniSim } from '@/ui/interactives/LessonMiniSim'
import { LifecycleDiagram } from '@/ui/interactives/LifecycleDiagram'
import { MediaFigure } from '@/ui/interactives/MediaFigure'
import { NetworkPathDiagram } from '@/ui/interactives/NetworkPathDiagram'
import { ObstructionDiagram } from '@/ui/interactives/ObstructionDiagram'
import { OrbitAltitudeDiagram } from '@/ui/interactives/OrbitAltitudeDiagram'
import { OrbitRegimesTable } from '@/ui/interactives/OrbitRegimesTable'
import { PacketPathViz } from '@/ui/interactives/PacketPathViz'
import { PhasedArrayDiagram } from '@/ui/interactives/PhasedArrayDiagram'
import { Quiz } from '@/ui/interactives/Quiz'
import { ShellAltitudeCard } from '@/ui/interactives/ShellAltitudeCard'
import { SpectrumBandsCard } from '@/ui/interactives/SpectrumBandsCard'
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
          'Picture how data moves across the Internet',
          'Learn a few words you will reuse later: packet, delay, hop',
          'See why satellites are “just another path” for the same apps',
        ]}
      />
      <p>
        Welcome. This course explains how <strong>Starlink style satellite internet</strong> works.
        You do not need any space background. You also do not need to be a network engineer.
      </p>
      <p>
        We start with the plain Internet, not rockets. Why? Because a satellite system still carries
        the same kind of messages your phone and laptop already send: videos, game moves, web pages.
        If you understand <em>what</em> is traveling, the satellite story makes sense later.
      </p>
      <p>
        Think of the Internet as a <strong>network of networks</strong>. Your home WiFi, your city
        cables, long ocean cables, and big computer buildings (data centers) all connect so a
        message from <em>here</em> can reach <em>there</em>. A friendly walkthrough lives on MDN:{' '}
        <InlineSource id="mdnInternet" />.
      </p>
      <Callout title="Words you will meet soon" variant="key">
        <strong>Packet</strong> = a small labeled chunk of data. <strong>Latency</strong> = delay
        (how long you wait). <strong>Bandwidth</strong> = how much data can flow per second once it
        starts. <strong>Hop</strong> = one step from one machine to the next along the path.
      </Callout>
      <Callout title="Why this module comes first" variant="note">
        Later modules talk about tall orbits and moving satellites. Underneath, every story is still
        about packets and delay. Learn the shared language first.
      </Callout>
      <VideoEmbed
        youtubeId="Dxcc6ycZ73M"
        title="What is the Internet?"
        caption="Optional Code.org video with Vint Cerf, about 5 minutes."
      />
      <RelatedLinks
        items={[
          { label: 'Glossary: packet', to: '/glossary/packet', kind: 'glossary' },
          { label: 'Full learning path', to: '/learn', kind: 'path' },
        ]}
      />
    </>
  ),
  'internet-foundations/packets': (
    <>
      <p>
        Imagine mailing a long book. You could send the whole book in one huge box. If the box is
        lost, everything is gone. The Internet instead tears the book into many small envelopes.
        Each envelope is a <strong>packet</strong>.
      </p>
      <p>
        A packet holds two kinds of stuff:
      </p>
      <ul>
        <li>
          <strong>Payload</strong>: the actual piece of your message (a bit of a photo, a slice of a
          video, part of a web page).
        </li>
        <li>
          <strong>Addressing info</strong>: labels that say where the packet should go, and often
          how to put the pieces back in order.
        </li>
      </ul>
      <p>
        That design is called <strong>packet switching</strong>. Many people share the same cables.
        If one packet is lost, you only resend that piece. If one road is blocked, packets can take
        another route.
      </p>
      <p>
        A <strong>router</strong> is a machine that reads the address on a packet and sends it to
        the next stop. That next stop is a <strong>hop</strong>. A trip across the Internet is a
        chain of hops, like changing trains several times. Extra hops can add extra waiting
        (machines thinking, lines of packets waiting, and pure travel time).
      </p>
      <PacketPathViz />
      <Callout title="Quick check for yourself" variant="note">
        If your video freezes, it is often not “the whole Internet broke.” Often a few packets were
        delayed or dropped, and the app is waiting to refill the picture.
      </Callout>
      <VideoEmbed
        youtubeId="AYdF7b3nMto"
        title="Packets, routing and reliability"
        caption="Optional Code.org video, about 6 minutes. Strong intuition."
      />
      <RelatedLinks
        items={[
          { label: 'Next: delay vs capacity', to: '/learn/internet-foundations/latency', kind: 'lesson' },
          { label: 'Glossary: hop', to: '/glossary/hop', kind: 'glossary' },
        ]}
      />
    </>
  ),
  'internet-foundations/latency': (
    <>
      <p>
        People say “fast internet” and mean two different things. Separating them will save you
        confusion for the rest of the course.
      </p>
      <p>
        <strong>Latency</strong> is <em>delay</em>: how long until something useful happens. If you
        ask a question and wait three seconds for the answer to start, that wait is latency.
      </p>
      <p>
        <strong>Bandwidth</strong> is <em>capacity</em>: how much data can flow per second once it is
        moving. A thick garden hose can pour a lot of water. But if the hose is a kilometer long,
        you still wait for water to arrive.
      </p>
      <p>
        ISP ads that shout “500 Mbps” are almost always talking about bandwidth, not how snappy a
        video call feels.
      </p>
      <KeyNumbers
        items={[
          { label: 'Latency', value: 'delay', hint: 'How long you wait' },
          { label: 'Bandwidth', value: 'capacity', hint: 'How wide the pipe is' },
          { label: 'RTT', value: 'there and back', hint: 'What many apps pay' },
        ]}
      />
      <p>
        <strong>RTT</strong> means <strong>round trip time</strong>: the time for a request to go
        out and a reply to come back. Video calls, games, and many web apps wait on RTTs. Rough
        human feel: about 20 to 40 milliseconds feels snappy. Around 500 milliseconds and higher
        makes conversation feel awkward. More detail: <InlineSource id="mdnLatency" />,{' '}
        <InlineSource id="hpbnLatency" />.
      </p>
      <p>
        <strong>TCP</strong> is a common way programs send reliable streams of packets (your
        browser often uses it). Opening a TCP connection often costs about <strong>one full
        RTT</strong> of handshake before useful app data flows. High bandwidth does not shrink that
        handshake. Only lower RTT does. See <InlineSource id="hpbnTcp" /> if you want depth.
      </p>
      <p>
        <strong>Loss</strong> is different from delay. Loss means a packet never arrived. The
        sender may wait and resend, which can add another RTT of waiting. A “slow” feeling can be
        high delay, high loss, or both. It is not always “a thin pipe.”
      </p>
      <Callout title="Carry this forward" variant="key">
        App → packets → hops → RTT (and sometimes loss) → how the app feels. Next page: the same
        packets can travel over fiber, cell towers, or satellites.
      </Callout>
      <Advanced title="Light as a speed limit">
        Signals cannot travel infinitely fast. In empty space, light is about 300,000 km per
        second. One way time is roughly distance divided by that speed. Glass fiber is a bit
        slower than empty space. You do not need the formula yet. Just know: distance creates a
        minimum wait.
      </Advanced>
    </>
  ),
  'internet-foundations/paths': (
    <>
      <p>
        Your apps still send <strong>IP packets</strong> (the standard labeled envelopes of the
        Internet) whether the last stretch of the trip is:
      </p>
      <ul>
        <li>
          <strong>Fiber</strong>: light guided through glass cables under streets or oceans.
        </li>
        <li>
          <strong>Cellular</strong>: radio to a nearby tower, then usually fiber deeper in.
        </li>
        <li>
          <strong>Satellite</strong>: radio up to a spacecraft, then down again (and often into
          fiber after that).
        </li>
      </ul>
      <p>The medium changes. The idea of packets does not.</p>
      <AccessPathDiagram />
      <p>
        Rough intuition for later modules:
      </p>
      <ul>
        <li>Home fiber often has a low delay on the last stretch.</li>
        <li>Cell service adds radio and scheduling steps.</li>
        <li>
          Satellite adds height. Height means travel time. Very tall orbits (you will meet GEO)
          create a big wait. Lower orbits (LEO) shrink that wait a lot.
        </li>
      </ul>
      <p>
        Satellite access also needs a path back into the normal Internet, often through a{' '}
        <strong>gateway</strong> on the ground (a special ground station with big antennas and
        fiber). We unpack gateways in Module 7.
      </p>
      <Callout title="Bridge to Module 2" variant="lab">
        Next we put a satellite almost 36,000 km up and measure the delay tax. Same packets. Wild
        geometry.
      </Callout>
      <RelatedLinks
        items={[
          { label: 'Module 2: why classic satellite felt slow', to: '/learn/geo-problem/intro', kind: 'lesson' },
          {
            label: 'Crash Course: Computer Networks (video)',
            to: 'https://www.youtube.com/watch?v=3QhU9jd03a0',
            kind: 'source',
          },
        ]}
      />
    </>
  ),
  'internet-foundations/check': (
    <>
      <p>
        Quick review before Module 2. No tricks. These check the ideas, not trivia.
      </p>
      <Quiz
        title="Check your intuition"
        questions={[
          {
            id: 'q1',
            prompt: 'Huge bandwidth but 600 ms round trip time. What is most true?',
            options: [
              { id: 'a', label: 'Everything feels instant because bandwidth is high.' },
              {
                id: 'b',
                label: 'Interactive apps can still feel sluggish because of round trips.',
                correct: true,
              },
              { id: 'c', label: 'Latency and bandwidth are the same metric.' },
            ],
            explanation:
              'Bandwidth is capacity. Latency is delay. Games and calls care a lot about round trip time.',
          },
          {
            id: 'q2',
            prompt: 'Why split messages into packets?',
            options: [
              {
                id: 'a',
                label: 'Sharing links, surviving losses of small pieces, and flexible routing.',
                correct: true,
              },
              { id: 'b', label: 'Because light requires packets by physics law.' },
              { id: 'c', label: 'Routers can only store one packet forever.' },
            ],
            explanation: 'Packet switching is a design choice, not a law of nature.',
          },
          {
            id: 'q3',
            prompt: 'Fiber, cellular, and satellite broadband differ mainly in…',
            options: [
              { id: 'a', label: 'Whether they can carry IP packets at all.' },
              {
                id: 'b',
                label: 'The physical path and its delay and constraints.',
                correct: true,
              },
              { id: 'c', label: 'Whether packets need destinations.' },
            ],
            explanation: 'Same Internet idea. Different media and path shapes.',
          },
          {
            id: 'q4',
            prompt: 'Opening a TCP connection often costs roughly…',
            options: [
              { id: 'a', label: 'Zero time if bandwidth is high.' },
              {
                id: 'b',
                label: 'About one round trip before useful app data can flow.',
                correct: true,
              },
              { id: 'c', label: 'Exactly one satellite orbit.' },
            ],
            explanation: 'Reliability setup pays in round trips, not in megabits.',
          },
        ]}
      />
      <Callout title="You now have" variant="key">
        Packets, routers, hops, latency vs bandwidth, RTT, and three home paths. Module 2 applies
        delay to a very tall orbit.
      </Callout>
      <FurtherReading
        sources={getSources([
          'mdnInternet',
          'mdnLatency',
          'hpbnLatency',
          'hpbnTcp',
          'khanPackets',
          'codeOrgInternet',
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
          'What GEO means in plain language',
          'Why a GEO satellite can look fixed in the sky',
          'Why a few GEO satellites can cover huge areas',
        ]}
      />
      <p>
        For years, “satellite internet” usually meant satellites in a special high parking spot
        called <strong>GEO</strong>: geostationary orbit. “Geo” relates to Earth. “Stationary”
        means it appears still from the ground.
      </p>
      <p>
        A GEO satellite sits about <strong>35,786 km</strong> above the equator (that is tens of
        thousands of kilometers up). It moves with Earth’s rotation so it stays over the same
        longitude. From your backyard it can look glued in place. Sources:{' '}
        <InlineSource id="esaOrbits" />, <InlineSource id="nasaEarthdataOrbits" />.
      </p>
      <p>
        Superpowers of GEO:
      </p>
      <ul>
        <li>Aim a dish once and leave it.</li>
        <li>
          Huge <strong>footprint</strong> (the area on Earth the satellite can see and serve). A
          few satellites can cover most populated land. The poles are the weak spot.
        </li>
      </ul>
      <OrbitAltitudeDiagram />
      <Callout title="Review from Module 1" variant="note">
        Packets still travel. The new problem is pure distance. Distance becomes waiting time.
      </Callout>
      <Advanced title="Sidereal day (optional detail)">
        GEO’s orbital period matches a sidereal day (about 23 hours 56 minutes), not exactly 24
        solar hours. One careful sentence is enough. You do not need this for the main story.
      </Advanced>
    </>
  ),
  'geo-problem/delay': (
    <>
      <p>
        Light and radio waves are fast, but not instant. Rough pure travel time for a signal that
        goes up to a GEO satellite overhead and back down is about{' '}
        <strong>240 milliseconds</strong> (about a quarter of a second). That is just geometry:{' '}
        2 × 35,786 km divided by the speed of light. See <InlineSource id="satsigLatency" />.
      </p>
      <p>
        Real user round trip time is often <strong>500 to 700+ milliseconds</strong> because of
        gateways, processing, and the rest of the Internet path. That is long enough that video
        calls and many games feel laggy.
      </p>
      <KeyNumbers
        items={[
          { label: 'GEO height', value: '35,786 km', hint: 'Above the equator' },
          { label: 'One way light', value: '~119 ms', hint: 'Straight up (zenith)' },
          { label: 'Up and down', value: '~240 ms', hint: 'Pure light time' },
          { label: 'User RTT', value: '500–700+ ms', hint: 'Typical classic sat feel' },
        ]}
        caption="Light time is a floor. Real systems sit above it."
      />
      <p>
        More bandwidth does not fix this. A thicker hose does not make a longer hose shorter.
        Starlink’s public tech story contrasts lower orbit delay with classic satellite internet (
        <InlineSource id="starlinkTech" />).
      </p>
      <LatencyCompare />
      <Callout title="Analogy" variant="note">
        Texting a friend on the opposite side of a huge canyon. You can shout louder (more
        bandwidth), but the echo still takes time (latency).
      </Callout>
      <CodeAlongCard moduleSlug="geo-problem" pageId="delay" />
    </>
  ),
  'geo-problem/tradeoffs': (
    <>
      <p>
        GEO is not “bad.” It is a different design. It still wins for:
      </p>
      <ul>
        <li>Broadcast and TV style one to many delivery</li>
        <li>Apps that can wait (big file transfers with patience)</li>
        <li>Simple fixed antennas that do not track moving sats</li>
        <li>A mature industry that already knows how to run few large satellites</li>
      </ul>
      <p>
        LEO (low Earth orbit, next module) is not “GEO but better at everything.” LEO wins on
        delay and enables flat user antennas, at the cost of a much more complex space fleet.
      </p>
      <p>
        Classic GEO broadband is often a <strong>bent pipe</strong> mental model: your dish talks
        to the satellite, the satellite mainly relays to a ground gateway, and the gateway joins
        the normal Internet. Like bouncing a flashlight off a mirror. Module 7 adds smarter space
        networks.
      </p>
      <p>
        Networking pain is not only “calls feel laggy.” A high RTT path is a{' '}
        <strong>long fat pipe</strong>: lots of capacity, lots of delay. TCP handshakes and recovery
        pay many round trips (Module 1). Buffered movie streaming can hide delay. Interactive apps
        cannot. See <InlineSource id="hpbnTcp" />, <InlineSource id="hpbnLatency" />.
      </p>
      <Callout title="Bridge" variant="lab">
        If delay is mostly distance, fly lower. Next module: what low orbits buy, and the new
        problem they create (you need many satellites).
      </Callout>
      <LabButton
        label="Preview a sparse low orbit fleet in the lab"
        params={{ planes: 4, satsPerPlane: 6, altitudeKm: 550 }}
      />
      <RelatedLinks
        items={[
          { label: 'Module 3: low Earth orbit', to: '/learn/leo-advantage/intro', kind: 'lesson' },
          { label: 'Glossary: bent pipe', to: '/glossary/bent-pipe', kind: 'glossary' },
        ]}
      />
    </>
  ),
  'geo-problem/check': (
    <>
      <Quiz
        title="Check your intuition: GEO"
        questions={[
          {
            id: 'g1',
            prompt: 'Why does a GEO satellite look fixed in the sky?',
            options: [
              { id: 'a', label: 'It is not moving relative to the stars.' },
              {
                id: 'b',
                label: 'Its orbital period matches Earth’s rotation over the equator.',
                correct: true,
              },
              { id: 'c', label: 'Thrusters hover with zero orbital speed.' },
            ],
            explanation:
              'Matching Earth’s rotation keeps the ground track fixed. The satellite is still moving in space.',
          },
          {
            id: 'g2',
            prompt: 'Rough pure up and down light time to GEO overhead?',
            options: [
              { id: 'a', label: '2 ms' },
              { id: 'b', label: '24 ms' },
              { id: 'c', label: '240 ms', correct: true },
            ],
            explanation: 'About 2 × 36,000 km / speed of light ≈ 0.24 s. User RTT is often higher.',
          },
        ]}
      />
      <Callout title="You now have" variant="key">
        GEO height, light time floor, why classic sat internet felt slow, and what GEO still does
        well.
      </Callout>
      <FurtherReading
        sources={getSources([
          'esaOrbits',
          'nasaEarthdataOrbits',
          'starlinkTech',
          'satsigLatency',
          'mdnLatency',
        ])}
      />
    </>
  ),

  /* ─── M3 ─── */
  'leo-advantage/intro': (
    <>
      <Objectives
        items={[
          'What LEO means (height, speed, period in everyday terms)',
          'Why continuous service needs many satellites',
        ]}
      />
      <p>
        <strong>LEO</strong> means <strong>low Earth orbit</strong>: relatively close to Earth.
        Space agencies often describe LEO as under about <strong>2,000 km</strong> high. Typical
        speeds are about <strong>7.8 km per second</strong>. One loop around Earth often takes
        about <strong>90 minutes</strong>. See <InlineSource id="esaOrbits" /> and{' '}
        <InlineSource id="nasaLeoFaq" />.
      </p>
      <p>
        Below roughly 160 to 180 km, the thin air of the upper atmosphere creates enough drag that
        satellites cannot stay for long without constant boosting. So “low” still means well above
        airplanes.
      </p>
      <MediaFigure
        src="https://images.unsplash.com/photo-1446776877081-d282a0f896e2?auto=format&fit=crop&w=1600&q=80"
        alt="Earth from orbit with a thin blue atmosphere"
        caption="LEO sits just above the atmosphere: close enough for lower delay, fast enough that satellites race across the sky."
        credit="Photo: NASA / Unsplash (illustrative)"
      />
      <p>
        Starlink style home internet lives in this LEO neighborhood, not at GEO’s 36,000 km.
        Navigation systems like GPS often use a middle band (MEO). Next page compares the three.
      </p>
      <Callout title="Everyday picture" variant="note">
        GEO is like a faraway helicopter that hovers over one spot. LEO is like a fast plane that
        crosses your sky and is gone in minutes. To keep service, you need many planes in a
        planned pattern.
      </Callout>
    </>
  ),
  'leo-advantage/regimes': (
    <>
      <p>
        Three altitude “neighborhoods” show up again and again. Memorize the order of magnitude,
        not every edge case.
      </p>
      <OrbitRegimesTable />
      <OrbitAltitudeDiagram />
      <Callout title="Common misconception" variant="warning">
        Higher orbit is not faster. For simple circular orbits, higher altitude means lower speed
        and a longer time to complete one loop.
      </Callout>
      <p>
        <strong>Quick labels:</strong>
      </p>
      <ul>
        <li>
          <strong>LEO</strong>: low, fast, short loop, small moving footprint.
        </li>
        <li>
          <strong>MEO</strong>: middle (think GPS style heights for many systems).
        </li>
        <li>
          <strong>GEO</strong>: very high, appears fixed, huge footprint, large delay.
        </li>
      </ul>
      <RelatedLinks
        items={[
          { label: 'Glossary: GEO', to: '/glossary/geo', kind: 'glossary' },
          { label: 'Glossary: MEO', to: '/glossary/meo', kind: 'glossary' },
          { label: 'Optional: orbit math', to: '/learn/optional-orbit-math/period', kind: 'lesson' },
        ]}
      />
    </>
  ),
  'leo-advantage/latency': (
    <>
      <p>
        Closer means far less light travel time on the space hop. Interactive apps become
        realistic again (<InlineSource id="starlinkTech" />). At about 550 km straight overhead,
        pure one way light time is about <strong>1.8 milliseconds</strong>, versus about{' '}
        <strong>119 milliseconds</strong> for GEO.
      </p>
      <KeyNumbers
        items={[
          { label: 'LEO 550 km one way', value: '~1.8 ms', hint: 'Pure light time' },
          { label: 'GEO one way', value: '~119 ms', hint: 'Zenith path' },
          { label: 'Rough ratio', value: '~65×', hint: 'Geometry, not magic' },
        ]}
        caption="Real user delay is higher than pure light time. Processing, routing, and paths still add."
      />
      <LatencyCompare />
      <Callout title="Not zero delay" variant="note">
        LEO removes the huge GEO distance tax. It does not cancel networking. Queues, gateways,
        handovers, and the rest of the Internet still matter (Module 8 stacks them).
      </Callout>
      <p>
        Closer also helps radio strength for a given power (a link budget idea we keep light). That
        is part of why flat user terminals become possible later.
      </p>
      <CodeAlongCard moduleSlug="leo-advantage" pageId="latency" />
    </>
  ),
  'leo-advantage/coverage': (
    <>
      <p>
        A GEO satellite lingers in your sky. A LEO satellite crosses and leaves. ESA notes that LEO
        communications satellites usually work as a <strong>constellation</strong>: a coordinated
        group that acts like a moving net so service can stay continuous (
        <InlineSource id="esaOrbits" />). A public primer on large LEO fleets:{' '}
        <InlineSource id="cboLeo" />.
      </p>
      <p>
        One LEO satellite is never enough for always on home internet. You need many, carefully
        spaced. Module 5 turns that into shells, planes, and density.
      </p>
      <Callout title="Preview" variant="note">
        Continuous coverage (a satellite is usable) is not the same as high speed for every user.
        Module 5 separates “online” from “how much capacity you share.”
      </Callout>
      <LessonMiniSim
        title="Sparse LEO"
        caption="Few satellites → gaps. Density is the product."
        params={{ planes: 3, satsPerPlane: 5, altitudeKm: 550, timeScale: 100 }}
      />
      <LabButton
        label="Try a denser shell in the lab"
        params={{ planes: 24, satsPerPlane: 40, altitudeKm: 550 }}
      />
      <RelatedLinks
        items={[
          { label: 'Module 5: constellation design', to: '/learn/constellation-design/terms', kind: 'lesson' },
          { label: 'M5: coverage vs capacity', to: '/learn/constellation-design/capacity', kind: 'lesson' },
          { label: 'Open 3D lab', to: '/simulate', kind: 'lab' },
        ]}
      />
    </>
  ),
  'leo-advantage/check': (
    <>
      <Quiz
        title="Check your intuition: LEO"
        questions={[
          {
            id: 'l1',
            prompt: 'ESA and NASA style LEO is roughly…',
            options: [
              {
                id: 'a',
                label: 'Under about 2,000 km, about 7.8 km/s, about 90 minute loops.',
                correct: true,
              },
              { id: 'b', label: 'Fixed at 35,786 km.' },
              { id: 'c', label: 'Only at the distance of the Moon.' },
            ],
            explanation: 'Near Earth neighborhood for the ISS and mega constellations.',
          },
          {
            id: 'l2',
            prompt: 'Why not one LEO satellite for always on home broadband?',
            options: [
              {
                id: 'a',
                label: 'It only covers you briefly each pass.',
                correct: true,
              },
              { id: 'b', label: 'LEO satellites cannot carry radios.' },
              { id: 'c', label: 'Light is slower in LEO than in GEO.' },
            ],
            explanation: 'Continuous service needs many coordinated satellites.',
          },
          {
            id: 'l3',
            prompt: 'For circular orbits, raising altitude…',
            options: [
              { id: 'a', label: 'Always increases orbital speed.' },
              {
                id: 'b',
                label: 'Lengthens the period and lowers orbital speed.',
                correct: true,
              },
              { id: 'c', label: 'Has no effect on period.' },
            ],
            explanation: 'Higher parking spots mean slower loops for circular orbits.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources(['esaOrbits', 'nasaLeoFaq', 'starlinkTech', 'nasaOrbits', 'cboLeo'])}
      />
    </>
  ),

  /* ─── M4 ─── */
  'launch-and-ops/lifecycle': (
    <>
      <Objectives
        items={[
          'Outline launch → raise → service → dispose',
          'See a constellation as a living fleet, not a one time dump of satellites',
        ]}
      />
      <p>
        A constellation is a <strong>fleet</strong>, like a bus network. Buses are added, moved to
        routes, kept on schedule, replaced, and retired. Satellites go through a similar life.
      </p>
      <p>
        Public Starlink safety docs describe insertion after launch, temporary waypoints, years of
        service, and planned deorbit (bringing the satellite down in a controlled way). See{' '}
        <InlineSource id="starlinkAltitudes" />.
      </p>
      <LifecycleDiagram />
      <MediaFigure
        src="https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?auto=format&fit=crop&w=1600&q=80"
        alt="Rocket launch plume at night"
        caption="Dense low orbit fleets depend on frequent launch and continuous operations, not a single “put them up and forget” event."
        credit="Photo: SpaceX / Unsplash (illustrative launch)"
      />
      <Callout title="Words" variant="note">
        <strong>Orbit raise</strong> = climbing from the drop off height toward the service shell.{' '}
        <strong>Waypoint</strong> = a temporary parking height used while moving into place.
      </Callout>
    </>
  ),
  'launch-and-ops/control': (
    <>
      <p>
        Low orbit is not a perfect vacuum. Thin air and other small forces nudge satellites off
        their planned slots. <strong>Station keeping</strong> means small thruster burns that hold
        spacing for coverage and safety, like gently steering to stay in lane.
      </p>
      <p>
        <strong>Ion thrusters</strong> (a kind of electric propulsion) give a gentle, efficient
        push for long periods. Public Starlink materials discuss thrusters for raise, caretaking,
        and end of life (<InlineSource id="starlinkTech" />). Early vehicles and later vehicles may
        use different propellants. We care about the idea: efficient low thrust, not brand details.
      </p>
      <p>
        Launch cadence is part of the architecture: fill orbital planes, replace failures, adjust
        shells as plans evolve. Independent tracking such as{' '}
        <InlineSource id="mcdowellStarlink" /> shows a living fleet.
      </p>
      <Callout title="Honesty" variant="warning">
        We teach public problem classes. We do not claim to know proprietary control software.
      </Callout>
    </>
  ),
  'launch-and-ops/deorbit': (
    <>
      <p>
        End of life is part of good design. Leaving dead metal in busy orbits is like abandoning
        cars in the middle of a highway.
      </p>
      <p>
        Public best practices emphasize propulsive deorbit while the satellite is still healthy,
        sharing position predictions (ephemeris), and not leaving dead mass in crowded shells (
        <InlineSource id="starlinkBestPractices" />).
      </p>
      <p>
        Lower service altitudes can shorten <strong>passive decay</strong> (falling naturally from
        drag) if thrusters fail. That is one reason operators discuss lowering shells. U.S. FCC
        licensing moved LEO disposal norms toward “as soon as practical, within 5 years” after end
        of mission for licensees (<InlineSource id="fccDeorbit5y" />). That is national licensing,
        not a global space police force.
      </p>
      <Callout title="Optional depth" variant="lab">
        The optional track on debris, astronomy, and space safety covers catalogs, sky trails, and
        balanced risk language.
      </Callout>
      <RelatedLinks
        items={[
          {
            label: 'Optional: space safety',
            to: '/learn/optional-space-safety/density',
            kind: 'lesson',
          },
          { label: 'Glossary: deorbit', to: '/glossary/deorbit', kind: 'glossary' },
        ]}
      />
    </>
  ),
  'launch-and-ops/check': (
    <>
      <Quiz
        title="Operations check"
        questions={[
          {
            id: 'o1',
            prompt: 'Station keeping is mainly…',
            options: [
              {
                id: 'a',
                label: 'Holding assigned orbits and slots against drag and other small forces.',
                correct: true,
              },
              { id: 'b', label: 'Broadcasting TV to GEO dishes.' },
              { id: 'c', label: 'Turning thrusters off forever after launch.' },
            ],
            explanation: 'Dense low orbit needs continuous caretaking.',
          },
          {
            id: 'o2',
            prompt: 'Ion thrusters are attractive because…',
            options: [
              { id: 'a', label: 'Huge ground launch thrust.' },
              {
                id: 'b',
                label: 'Efficient low thrust for raise and years of station keeping.',
                correct: true,
              },
              { id: 'c', label: 'They remove the need for gateways.' },
            ],
            explanation: 'Electric propulsion trades raw kick for efficiency.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources([
          'starlinkTech',
          'starlinkAltitudes',
          'starlinkBestPractices',
          'mcdowellStarlink',
          'fccDeorbit5y',
          'esaOrbits',
        ])}
      />
    </>
  ),

  /* ─── M5 ─── */
  'constellation-design/terms': (
    <>
      <Objectives
        items={[
          'Define shell, plane, inclination, and phasing in plain language',
          'See a constellation as planned geometry, not a random cloud',
        ]}
      />
      <p>
        A <strong>constellation</strong> is a coordinated team of satellites. To read a design,
        learn a few geometry words:
      </p>
      <ul>
        <li>
          <strong>Shell</strong>: a set of satellites at a shared design height (and related
          geometry). Think of a layer of a cake around Earth.
        </li>
        <li>
          <strong>Orbital plane</strong>: a flat ring slice that contains one loop of paths. Many
          planes wrap Earth like orange segments.
        </li>
        <li>
          <strong>Inclination</strong>: how tilted the plane is relative to the equator. High tilt
          helps high latitude users (far north or south).
        </li>
        <li>
          <strong>Phasing</strong>: spacing of satellites along a plane so they do not clump.
        </li>
        <li>
          <strong>RAAN</strong> (optional jargon): how a plane is rotated around Earth. Spreading
          RAAN spreads coverage in longitude.
        </li>
      </ul>
      <p>
        Public multi shell planning lists heights and inclinations such as 43°, 53°, 70°, about 97°
        (<InlineSource id="starlinkAltitudes" />). Our 3D lab uses a simplified even pattern. It is
        not a reverse engineered Starlink layout.
      </p>
      <Callout title="Analogy" variant="note">
        City buses: routes (planes), how many buses per route (sats per plane), and staggered
        schedules (phasing) decide whether you wait 2 minutes or 40.
      </Callout>
    </>
  ),
  'constellation-design/density': (
    <>
      <p>
        Too few planes or too few satellites per plane → coverage gaps. Higher density → fewer gaps,
        and usually more handovers (switches from one satellite to the next). Inclination and your
        latitude interact: polar users need high inclination planes.
      </p>
      <p>
        Continuous coverage is only half the product. Next page: why “always online” still does not
        mean “always fast.”
      </p>
      <CoverageSandbox />
      <LessonMiniSim
        title="Dense shell"
        params={{ planes: 20, satsPerPlane: 30, altitudeKm: 550, timeScale: 70 }}
      />
      <CodeAlongCard moduleSlug="constellation-design" pageId="density" />
    </>
  ),
  'constellation-design/capacity': (
    <>
      <Objectives
        items={[
          'Coverage (geometry) vs capacity (shared resources)',
          'Why local congestion can dominate speed',
        ]}
      />
      <p>
        <strong>Coverage</strong> answers: is a usable satellite in the sky for you right now?
      </p>
      <p>
        <strong>Capacity</strong> answers: how much shared radio resource can your session get?
        Spectrum (airwaves), power, and beam time are limited and shared with neighbors.
      </p>
      <CapacityVsCoverage />
      <p>
        Satellites serve many users with many small <strong>spot beams</strong>, like cell towers
        in the sky rather than one giant WiFi bubble. Reusing frequencies multiplies capacity. It
        also creates scheduling and interference as real jobs. We teach the problem class, not
        proprietary beam maps (<InlineSource id="cboLeo" />, <InlineSource id="isocLeo" />).
      </p>
      <Callout title="Dinner time test" variant="key">
        Dense sky plus many neighbors streaming → you can stay online while speed drops. More
        satellites help coverage first. Capacity still depends on spectrum and load.
      </Callout>
      <CodeAlongCard
        moduleSlug="constellation-design"
        pageId="capacity"
        exerciseId="coverage-mc"
      />
      <RelatedLinks
        items={[
          { label: 'M6: radio bands', to: '/learn/user-terminal/spectrum', kind: 'lesson' },
          { label: 'Glossary: spot beam', to: '/glossary/spot-beam', kind: 'glossary' },
          { label: 'Next: reality checks', to: '/learn/constellation-design/reality', kind: 'lesson' },
        ]}
      />
    </>
  ),
  'constellation-design/reality': (
    <>
      <p>
        Shell heights and satellite counts are <strong>time sensitive</strong>. Prefer{' '}
        <InlineSource id="starlinkAltitudes">Space Safety altitude docs</InlineSource> over
        marketing copy that may still say “about 550 km.” Cross check with{' '}
        <InlineSource id="mcdowellStarlink">McDowell’s catalog</InlineSource> and{' '}
        <InlineSource id="celestrak">CelesTrak</InlineSource>. FCC filings are the legal envelope.
        Operations evolve inside it.
      </p>
      <ShellAltitudeCard />
      <LabButton
        label="High latitude user scenario"
        params={{ planes: 12, satsPerPlane: 20, inclinationDeg: 70, userLatDeg: 70 }}
      />
      <Callout title="Habit" variant="note">
        Date every count. “How many satellites” without a date is half a fact.
      </Callout>
      <RelatedLinks
        items={[
          { label: 'Optional: space safety', to: '/learn/optional-space-safety/density', kind: 'lesson' },
          {
            label: 'McDowell Starlink stats',
            to: 'https://planet4589.org/space/con/star/stats.html',
            kind: 'source',
          },
        ]}
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
            explanation: 'Planes are geometric rings. Many wrap the Earth.',
          },
          {
            id: 'c2',
            prompt: 'Best independent check for “how many are flying”?',
            options: [
              { id: 'a', label: 'Catalogs like McDowell’s with dates.', correct: true },
              { id: 'b', label: 'Any viral meme.' },
              { id: 'c', label: 'Assume the first filing never changed.' },
            ],
            explanation: 'The fleet is dynamic. Timestamps matter.',
          },
          {
            id: 'c3',
            prompt: 'A satellite is overhead and the link is up, but downloads crawl. Most likely…',
            options: [
              {
                id: 'a',
                label: 'Coverage failed. Geometry cannot explain online status.',
              },
              {
                id: 'b',
                label: 'Capacity is shared. Congestion or load may dominate.',
                correct: true,
              },
              { id: 'c', label: 'Light is slower when many people use WiFi.' },
            ],
            explanation: 'Online is geometry. Speed is often shared capacity.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources([
          'starlinkAltitudes',
          'mcdowellStarlink',
          'celestrak',
          'esaOrbits',
          'fccStarlink',
          'cboLeo',
          'isocLeo',
        ])}
      />
    </>
  ),

  /* ─── M6 ─── */
  'user-terminal/spectrum': (
    <>
      <Objectives
        items={[
          'Why radio band “classes” matter',
          'Capacity vs weather trade in plain language',
        ]}
      />
      <p>
        Before the flat dish, name the medium: radio waves in licensed bands (channels of the
        airwaves that regulators assign). Engineers group bands by frequency with letter names.
      </p>
      <p>
        Rough idea: higher frequency often allows more data capacity, but rain and moisture steal
        more signal. That loss is <strong>rain fade</strong>. See{' '}
        <InlineSource id="esaFrequency" />.
      </p>
      <SpectrumBandsCard />
      <p>
        Public architecture pattern for Starlink class systems: user links often discussed in a{' '}
        <strong>Ku class</strong> neighborhood; high rate links to ground stations in higher bands
        (Ka class and above). Treat that as a design pattern, not a reverse engineered channel map
        (<InlineSource id="starlinkTech" />).
      </p>
      <Callout title="Scope" variant="warning">
        No secret schedules or exact channel tables here. Learn why bands matter, then how the
        terminal steers energy.
      </Callout>
      <RelatedLinks
        items={[
          { label: 'M5: coverage vs capacity', to: '/learn/constellation-design/capacity', kind: 'lesson' },
          { label: 'Glossary: rain fade', to: '/glossary/rain-fade', kind: 'glossary' },
          { label: 'Next: phased arrays', to: '/learn/user-terminal/array', kind: 'lesson' },
        ]}
      />
    </>
  ),
  'user-terminal/array': (
    <>
      <Objectives
        items={[
          'What a phased array does in one sentence',
          'Why LEO needs electronic steering instead of a slow motor dish',
        ]}
      />
      <p>
        LEO satellites move across the sky. A heavy dish that motors around can work in labs. For a
        home product it is awkward. Public Starlink materials emphasize{' '}
        <strong>phased arrays</strong>: many small antenna elements that steer the beam by timing
        their signals, with little or no mechanical slewing (<InlineSource id="starlinkTech" />).
        Concept primer: <InlineSource id="radarPhasedArray" />.
      </p>
      <PhasedArrayDiagram />
      <p>
        Analogy: a stadium wave. If people stand up at slightly different times, the wave travels.
        Phased arrays do something similar with radio waves so the beam points where you want.
      </p>
      <p>
        The satellite side also forms beams toward users (many small cells). We skip element counts
        and secret schedules. The idea is enough.
      </p>
      <Callout title="Scope" variant="warning">
        Problem class only, not proprietary hardware recipes.
      </Callout>
    </>
  ),
  'user-terminal/elevation': (
    <>
      <p>
        <strong>Elevation</strong> is how high a satellite sits above your local horizon. 0° means
        on the horizon. 90° means straight overhead (zenith).
      </p>
      <p>
        Networks set a <strong>minimum elevation</strong>. Lower minimums allow longer passes but
        worse geometry (longer path through air, more trees in the way). Higher minimums improve
        average link quality but shrink usable sky.
      </p>
      <p>
        <strong>Slant range</strong> is the straight line distance from you to the satellite, not
        just the satellite’s altitude. Low elevation means a longer slant path.
      </p>
      <ObstructionDiagram />
      <p>
        <strong>Obstruction</strong> is the everyday failure mode: trees, roofs, chimneys, or a car
        roof block the line of sight even when a map says a satellite is “above” the minimum angle.
        Clear field of view often matters more than memorizing shell heights.
      </p>
      <LessonMiniSim
        title="Watch elevation"
        caption="Raise min elevation in the full lab to shrink coverage."
        params={{ planes: 12, satsPerPlane: 18, altitudeKm: 550, timeScale: 90 }}
      />
      <LabButton
        label="Lab with a stricter elevation mask"
        params={{ planes: 12, satsPerPlane: 20, minElevationDeg: 40, userLatDeg: 40 }}
      />
      <CodeAlongCard moduleSlug="user-terminal" pageId="elevation" exerciseId="elevation-gate" />
      <CodeAlongCard moduleSlug="user-terminal" pageId="elevation" exerciseId="contact-window" />
      <RelatedLinks
        items={[
          { label: 'Glossary: elevation', to: '/glossary/elevation', kind: 'glossary' },
          { label: 'Glossary: obstruction', to: '/glossary/obstruction', kind: 'glossary' },
          { label: 'Glossary: slant range', to: '/glossary/slant-range', kind: 'glossary' },
        ]}
      />
    </>
  ),
  'user-terminal/handoff': (
    <>
      <p>
        A session sketch (what the system is trying to do, not a secret algorithm):
      </p>
      <ol>
        <li>Find satellites above min elevation with a clear path.</li>
        <li>Pick a serving satellite.</li>
        <li>Point beams and carry packets.</li>
        <li>
          <strong>Hand off</strong> (hand over) to the next satellite before the first one sets.
        </li>
      </ol>
      <p>
        Good systems aim for smooth overlap when two satellites are usable (make before break).
        Geometry forces handovers. Load and policy can also change who serves you. Users may see
        brief blips. We name the problem class, not any vendor’s code.
      </p>
      <HandoffDemo />
      <LabButton
        label="Watch handoffs in the 3D lab"
        params={{ planes: 12, satsPerPlane: 20, userLatDeg: 40, timeScale: 120 }}
      />
      <CodeAlongCard moduleSlug="user-terminal" pageId="handoff" exerciseId="handoff-count" />
      <CodeAlongCard moduleSlug="user-terminal" pageId="handoff" exerciseId="handoff-policy" />
    </>
  ),
  'user-terminal/check': (
    <>
      <Quiz
        title="Terminals and radio path"
        questions={[
          {
            id: 't0',
            prompt: 'Compared with lower microwave bands, Ka class links generally…',
            options: [
              {
                id: 'a',
                label: 'Offer more bandwidth potential and more rain fade.',
                correct: true,
              },
              { id: 'b', label: 'Ignore weather completely.' },
              { id: 'c', label: 'Only work at GEO altitude.' },
            ],
            explanation: 'Capacity vs moisture attenuation is the core band trade.',
          },
          {
            id: 't1',
            prompt: 'Phased arrays steer mainly by…',
            options: [
              {
                id: 'a',
                label: 'Adjusting timing (phase) across many small elements.',
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
              { id: 'c', label: 'Moving a satellite from GEO to LEO mid call.' },
            ],
            explanation: 'Satellites rise and set. Attachment points must change.',
          },
          {
            id: 't3',
            prompt: 'Service fails with satellites “in the sky” on a map. Most common real cause?',
            options: [
              {
                id: 'a',
                label: 'Obstruction or not enough clear sky above min elevation.',
                correct: true,
              },
              { id: 'b', label: 'Earth stopped rotating.' },
              { id: 'c', label: 'Packets cannot use IP over radio.' },
            ],
            explanation: 'Line of sight beats orbit trivia for many outages.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources([
          'starlinkTech',
          'esaFrequency',
          'radarPhasedArray',
          'esaOrbits',
          'cboLeo',
          'mdnLatency',
        ])}
      />
    </>
  ),

  /* ─── M7 ─── */
  'space-network/links': (
    <>
      <Objectives
        items={[
          'Name three kinds of links',
          'Sketch a packet path after it leaves your dish',
        ]}
      />
      <p>
        After your terminal talks to a satellite, packets can still take several radio or laser
        steps. Three roles to remember:
      </p>
      <ul>
        <li>
          <strong>User link</strong>: your dish (or phone) ↔ serving satellite.
        </li>
        <li>
          <strong>Gateway link</strong>: satellite ↔ ground station ↔ fiber Internet.
        </li>
        <li>
          <strong>ISL</strong> (inter satellite link): satellite ↔ satellite, often with lasers.
        </li>
      </ul>
      <p>
        Official materials discuss laser links at high data rates (
        <InlineSource id="starlinkTech" />). NASA’s LCRD program is public context for optical
        space links (<InlineSource id="nasaLcrd" />).
      </p>
      <NetworkPathDiagram />
      <RelatedLinks
        items={[
          { label: 'Next: gateway scarcity', to: '/learn/space-network/gateways', kind: 'lesson' },
          { label: 'Glossary: ISL', to: '/glossary/isl', kind: 'glossary' },
        ]}
      />
    </>
  ),
  'space-network/gateways': (
    <>
      <Objectives
        items={[
          'Gateways as fiber on ramps',
          'Why density, diversity, and load matter',
        ]}
      />
      <p>
        A <strong>gateway</strong> (ground station) is where space traffic meets the normal
        Internet from Module 1. Think of highway on ramps: antennas, radio gear, and fiber.
        Almost every consumer bit still needs an exit onto that fabric (
        <InlineSource id="isocLeo" />).
      </p>
      <GatewayScarcity />
      <p>
        Gateways are scarce infrastructure. Sites, spectrum, power, and backhaul (the fat pipe into
        the rest of the Internet) are finite. Laser links between satellites let traffic reach a
        gateway that is not under your footprint. They do not make gateways free or infinite.
      </p>
      <Callout title="Failure modes to picture" variant="note">
        No satellite in view · gateway far or overloaded · laser path unavailable · heavy rain on a
        high frequency feeder. Geometry and capacity both show up after the dish.
      </Callout>
      <Advanced title="Spectrum is shared">
        Radio bands are licensed and coordinated (national regulators plus international
        frameworks such as the ITU). Constellations do not own the sky. Calm framing only, not a
        law course (<InlineSource id="fccSpace" />, <InlineSource id="ituSpace" />).
      </Advanced>
      <RelatedLinks
        items={[
          { label: 'M5: coverage vs capacity', to: '/learn/constellation-design/capacity', kind: 'lesson' },
          { label: 'Glossary: gateway', to: '/glossary/gateway', kind: 'glossary' },
          { label: 'Next: space mesh', to: '/learn/space-network/mesh', kind: 'lesson' },
        ]}
      />
    </>
  ),
  'space-network/mesh': (
    <>
      <p>
        ISLs form a <strong>space mesh</strong>: packets hop from satellite to satellite before
        descending. Useful over oceans, poles, and land with few gateways (
        <InlineSource id="starlinkTech" />, <InlineSource id="nasaLcrd" />).
      </p>
      <p>
        Routing is a <strong>time varying graph</strong>: neighbors appear and disappear as
        geometry changes. Counting hops is a first discrete model. Weighted delay is a better
        floor estimate. Neither is a proprietary routing recipe. Apps still send ordinary IP (
        <InlineSource id="mdnInternet" />).
      </p>
      <Callout title="Analogy" variant="note">
        City streets that rearrange every few minutes. You still need a path to an on ramp (the
        gateway). Lasers are extra bridges between moving islands.
      </Callout>
      <CodeAlongCard moduleSlug="space-network" pageId="mesh" exerciseId="path-hops" />
      <CodeAlongCard moduleSlug="space-network" pageId="mesh" exerciseId="weighted-path" />
      <CodeAlongCard moduleSlug="space-network" pageId="mesh" exerciseId="isl-from-geometry" />
    </>
  ),
  'space-network/payload': (
    <>
      <p>
        Two teaching labels for what the satellite does with your traffic:
      </p>
      <ul>
        <li>
          <strong>Bent pipe / transparent</strong>: mostly amplify and retransmit, like a radio
          mirror. Classic GEO mental model.
        </li>
        <li>
          <strong>Regenerative</strong>: can decode, process, and route onboard. Fits multi hop mesh
          more naturally, at the cost of complexity.
        </li>
      </ul>
      <p>
        Real systems sit on a spectrum between those poles. Do not claim any operator’s exact
        stack. Band patterns (Ku class user access vs higher band feeders) stay public design
        patterns (<InlineSource id="esaFrequency" />).
      </p>
      <Advanced title="Rain fade (again)">
        Higher frequencies carry more capacity potential but suffer more rain fade. Link design and
        site diversity mitigate. It is physics, not a software bug.
      </Advanced>
      <RelatedLinks
        items={[
          { label: 'Glossary: regenerative', to: '/glossary/regenerative', kind: 'glossary' },
          { label: 'Module 8: end to end', to: '/learn/end-to-end/journey', kind: 'lesson' },
        ]}
      />
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
                label: 'Connect the satellite network to the terrestrial Internet.',
                correct: true,
              },
              { id: 'b', label: 'Mechanically steer every user dish.' },
              { id: 'c', label: 'Keep GEO satellites from falling into LEO.' },
            ],
            explanation: 'Fiber on ramps for space access.',
          },
          {
            id: 'n2',
            prompt: 'Optical ISLs primarily…',
            options: [
              {
                id: 'a',
                label: 'Route traffic satellite to satellite before a gateway exit.',
                correct: true,
              },
              { id: 'b', label: 'Remove the need for user terminals.' },
              { id: 'c', label: 'Set orbital period to one year.' },
            ],
            explanation: 'Space mesh reduces “gateway under every footprint” dependence.',
          },
          {
            id: 'n3',
            prompt: 'ISLs mean gateways are unnecessary for consumer Internet.',
            options: [
              { id: 'a', label: 'True. Lasers replace fiber forever.' },
              {
                id: 'b',
                label: 'False. Most traffic still exits to the terrestrial Internet somewhere.',
                correct: true,
              },
              { id: 'c', label: 'Only true at GEO altitude.' },
            ],
            explanation: 'ISLs change which gateway you use. They do not erase the ground Internet.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources([
          'starlinkTech',
          'nasaLcrd',
          'esaFrequency',
          'isocLeo',
          'cboLeo',
          'mdnInternet',
          'hpbnLatency',
        ])}
      />
    </>
  ),

  /* ─── M8 ─── */
  'end-to-end/journey': (
    <>
      <Objectives
        items={['Narrate one full packet trip', 'Connect Modules 1 through 7 in order']}
      />
      <p>
        Picture a video call. Your app creates packets (Module 1). Your phased array terminal
        talks to a serving LEO satellite (Module 6). The satellite may bounce to a nearby gateway
        or hop through laser links first (Module 7). Then ordinary Internet routing reaches the
        other person. The reverse path comes back. Meanwhile handovers keep you attached as
        satellites set (Module 6). The goal is interactive RTT, unlike GEO’s distance tax (
        <InlineSource id="starlinkTech" />).
      </p>
      <NetworkPathDiagram />
      <Callout title="Next" variant="note">
        That path has many delay sources, not just satellite altitude. The next page unpacks the
        full stack.
      </Callout>
      <RelatedLinks
        items={[
          { label: 'M1: packets', to: '/learn/internet-foundations/packets', kind: 'lesson' },
          { label: 'M5: capacity', to: '/learn/constellation-design/capacity', kind: 'lesson' },
          { label: 'M6: elevation and obstruction', to: '/learn/user-terminal/elevation', kind: 'lesson' },
          { label: 'M7: mesh', to: '/learn/space-network/mesh', kind: 'lesson' },
        ]}
      />
    </>
  ),
  'end-to-end/performance': (
    <>
      <Objectives
        items={[
          'Separate geometric floor from user experience',
          'Name several ingredients of delay, jitter, and outages',
        ]}
      />
      <p>
        LEO mainly attacks <strong>space segment travel time</strong> versus GEO. That is
        necessary, not enough. Mean round trip time, <strong>jitter</strong> (how much delay
        wobbles), loss, and outages come from a stack of ingredients (
        <InlineSource id="mdnLatency" />, <InlineSource id="hpbnLatency" />).
      </p>
      <LatencyStack />
      <KeyNumbers
        items={[
          { label: 'Floor', value: 'd / c', hint: 'Travel time only' },
          { label: 'Mean RTT', value: 'stack sum', hint: 'Typical round trip' },
          { label: 'Jitter', value: 'wobble', hint: 'How RTT varies' },
          { label: 'Outage', value: 'no path', hint: 'Trees, rain, gaps' },
        ]}
        caption="A low marketing delay and a choppy call can both be true in different conditions."
      />
      <p>
        Open problem classes (no vendor claims): which satellite to pick, how to schedule beams,
        how to route on a moving graph, how to plan handovers, how to balance load.
      </p>
      <Callout title="Kill the myth" variant="key">
        “LEO has zero latency” confuses a lower geometric floor with the full experience. Online is
        not always fast. Short light time is not zero jitter.
      </Callout>
      <RelatedLinks
        items={[
          { label: 'M5: coverage vs capacity', to: '/learn/constellation-design/capacity', kind: 'lesson' },
          { label: 'M6: spectrum and rain fade', to: '/learn/user-terminal/spectrum', kind: 'lesson' },
          { label: 'Glossary: jitter', to: '/glossary/jitter', kind: 'glossary' },
        ]}
      />
    </>
  ),
  'end-to-end/lab': (
    <>
      <Objectives
        items={['Predict coverage from geometry', 'Name what the lab does not simulate']}
      />
      <p>
        Use the lab as a <strong>geometry coach</strong>, then name what it leaves out.
      </p>
      <ol>
        <li>
          <strong>Sparse vs dense</strong>: online time and gaps (Modules 3 and 5).
        </li>
        <li>
          <strong>Raise min elevation</strong>: usable sky shrinks (Module 6). Real installs also
          need clear view past trees and roofs.
        </li>
        <li>
          <strong>Latitude vs inclination</strong>: high latitude users need high inclination
          planes.
        </li>
        <li>
          <strong>Think capacity (not in the sim)</strong>: dense sky plus busy cell can stay online
          and still feel slow (Module 5).
        </li>
      </ol>
      <CoverageSandbox />
      <HandoffDemo />
      <CapacityVsCoverage />
      <div className="my-4 flex flex-wrap gap-3">
        <LabButton
          label="Capstone dense lab"
          params={{ planes: 30, satsPerPlane: 40, altitudeKm: 550, timeScale: 100 }}
        />
        <LabButton
          label="Strict elevation mask"
          params={{ planes: 12, satsPerPlane: 20, minElevationDeg: 40, userLatDeg: 40 }}
        />
        <LabButton
          label="High latitude"
          params={{ planes: 12, satsPerPlane: 20, inclinationDeg: 70, userLatDeg: 70 }}
        />
      </div>
      <Callout title="Lab honesty" variant="warning">
        Circular orbits, geometric elevation, simplified shells. No full radio model, weather,
        queues, or beam schedules. Geometry lessons transfer. Treat measured product RTT as a
        different layer.
      </Callout>
      <CodeAlongCard moduleSlug="end-to-end" pageId="lab" />
    </>
  ),
  'end-to-end/honest': (
    <>
      <p>
        Good engineering education draws a bright line between <strong>public architecture</strong>{' '}
        and <strong>proprietary control software</strong>.
      </p>
      <ul>
        <li>
          <strong>Safe to teach:</strong> LEO vs GEO geometry, shells as height × inclination,
          phased array concept, band class weather trade, gateway vs ISL roles, coverage vs
          capacity, obstruction, electric propulsion, catalog literacy.
        </li>
        <li>
          <strong>Not claimed here:</strong> exact beam schedules, handover logic internals, ISL
          routing metrics, per cell capacity formulas, or “the lab is Starlink.”
        </li>
      </ul>
      <p>
        Date every count and altitude. Prefer Space Safety docs for shell plans. Prefer McDowell for
        “what is flying.” Our lab is a labeled model: useful, incomplete by design.
      </p>
      <Callout title="Optional next" variant="lab">
        Optional tracks: orbit math, space safety, direct to cell, programmer path, and comparative
        design points.
      </Callout>
      <RelatedLinks
        items={[
          { label: 'Optional: orbit math', to: '/learn/optional-orbit-math/period', kind: 'lesson' },
          { label: 'Optional: space safety', to: '/learn/optional-space-safety/density', kind: 'lesson' },
          { label: 'Optional: code path', to: '/learn/optional-code-path/why', kind: 'code' },
          { label: 'Optional: compare systems', to: '/learn/optional-comparative/frame', kind: 'lesson' },
          { label: 'Home', to: '/', kind: 'home' },
        ]}
      />
    </>
  ),
  'end-to-end/check': (
    <>
      <p>Capstone check. Use the whole path, not one module in isolation.</p>
      <Quiz
        title="Capstone quiz"
        questions={[
          {
            id: 'e1',
            prompt: 'LEO primarily improves versus GEO…',
            options: [
              {
                id: 'a',
                label: 'Space segment travel time via shorter paths.',
                correct: true,
              },
              { id: 'b', label: 'Removing all Earth routers.' },
              { id: 'c', label: 'Eliminating IP packets.' },
            ],
            explanation: 'Closer satellites cut light time. Networking remains.',
          },
          {
            id: 'e2',
            prompt: 'Online with a LEO satellite overhead, but the call is choppy. Best reading?',
            options: [
              {
                id: 'a',
                label: 'Impossible. LEO light time guarantees perfect calls.',
              },
              {
                id: 'b',
                label:
                  'Jitter, loss, queues, handoffs, path choice, or the ground Internet can still hurt.',
                correct: true,
              },
              { id: 'c', label: 'Packets cannot travel faster than GEO RTT.' },
            ],
            explanation: 'Mean light time is not the whole experience.',
          },
          {
            id: 'e3',
            prompt: 'Tree line blocks the northern sky. Satellites exist, service drops. Primary issue?',
            options: [
              {
                id: 'a',
                label: 'Obstruction / not enough clear field of view.',
                correct: true,
              },
              { id: 'b', label: 'GEO altitude was used by mistake.' },
              { id: 'c', label: 'Bandwidth is infinite so geometry never matters.' },
            ],
            explanation: 'Line of sight is part of the system (Module 6).',
          },
          {
            id: 'e4',
            prompt: 'Dense constellation, dinner time, many neighbors streaming. Downloads crawl.',
            options: [
              {
                id: 'a',
                label: 'Coverage failed. No satellite can be in view.',
              },
              {
                id: 'b',
                label: 'Shared capacity / congestion. Online is not an exclusive pipe.',
                correct: true,
              },
              { id: 'c', label: 'Light is slower after sunset.' },
            ],
            explanation: 'Coverage vs capacity (Module 5).',
          },
          {
            id: 'e5',
            prompt: 'Which claim is appropriate in this course?',
            options: [
              {
                id: 'a',
                label: 'Public geometry and problem classes. The lab is labeled, not the real network.',
                correct: true,
              },
              { id: 'b', label: 'We reverse engineered exact Starlink beam schedules.' },
              { id: 'c', label: 'LEO repeals the speed of light.' },
            ],
            explanation: 'Trust comes from labeled models and sources.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources([
          'starlinkTech',
          'starlinkAltitudes',
          'mcdowellStarlink',
          'mdnLatency',
          'hpbnLatency',
          'esaOrbits',
          'esaFrequency',
          'cboLeo',
        ])}
      />
      <Callout title="Core path complete" variant="lab">
        Optional tracks add math, safety, direct to cell, Python, and comparative design without
        blocking this foundation.
      </Callout>
    </>
  ),

  /* ─── Optional math ─── */
  'optional-orbit-math/period': (
    <>
      <p>
        This track is for learners who want the formulas behind the lab. Still the same simplified
        model: circular orbits, no fancy gravity extras.
      </p>
      <p>
        Radius of the orbit path: a = Earth radius + altitude. Period (time for one loop): T = 2π ×
        square root of (a³ / μ). Light time: t = distance / c. Constants match the lab.
      </p>
      <KeyNumbers
        items={[
          { label: 'Earth radius', value: '6371 km', hint: 'Mean teaching value' },
          { label: 'μ', value: '3.986×10⁵', hint: 'km³/s²' },
          { label: 'c', value: '2.998×10⁵', hint: 'km/s' },
        ]}
      />
      <LatencyCompare />
      <LabButton label="Lab at 550 km" params={{ altitudeKm: 550 }} />
      <RelatedLinks
        items={[
          { label: 'Code: orbital period', to: '/code/orbital-period', kind: 'code' },
          {
            label: 'Free reference: orbital-mechanics.space',
            to: 'https://orbital-mechanics.space/',
            kind: 'source',
          },
        ]}
      />
    </>
  ),
  'optional-orbit-math/footprint': (
    <>
      <p>
        The geometric footprint is the region on Earth where a satellite is above a minimum
        elevation. Higher altitude tends to enlarge the footprint. Higher minimum elevation shrinks
        usable sky. The lab draws this idea as a ring.
      </p>
      <Advanced title="Formula">
        Earth central angle from nadir to edge: λ = arccos((R_E / a) cos ε) − ε, where ε is min
        elevation. You can skip the algebra and keep the intuition.
      </Advanced>
      <Callout title="Honesty" variant="warning">
        Circular Kepler geometry only. Not full radio engineering and not full Earth gravity
        models.
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
              { id: 'c', label: 'Fixed at 90 minutes forever.' },
            ],
            explanation: 'Period grows with a to the power 3/2.',
          },
          {
            id: 'm2',
            prompt: 'Double path length at fixed speed of light…',
            options: [
              { id: 'a', label: 'Doubles pure light time.', correct: true },
              { id: 'b', label: 'Halves light time.' },
              { id: 'c', label: 'No effect.' },
            ],
            explanation: 't = d / c is linear in distance.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources([
          'esaOrbits',
          'nasaOrbits',
          'hpbnLatency',
          'satsigLatency',
          'orbitalMechanicsSpace',
        ])}
      />
    </>
  ),

  /* ─── Optional safety ─── */
  'optional-space-safety/density': (
    <>
      <p>
        Low Earth orbit is a shared, finite neighborhood. Risk scales with how many objects are
        there, how big they are, and how long they stay. Historical debris also comes from
        explosions, collisions, and weapons tests, not only mega constellations (
        <InlineSource id="nasaDebrisFaq" />, <InlineSource id="esaDebris2025" />).
      </p>
      <p>
        Maneuverable fleets can dodge. Dead mass cannot. Operators care about shell planning,
        tracking, avoidance, and disposal (<InlineSource id="starlinkAltitudes" />).
      </p>
      <LifecycleDiagram />
      <Callout title="Careful language" variant="note">
        Prefer “rising conjunction risk” before claiming a full cascade. Cascade physics is real.
        Timescales and “are we in it now” stay model dependent.
      </Callout>
    </>
  ),
  'optional-space-safety/deorbit': (
    <>
      <p>
        Lower shells can shorten passive decay if propulsion fails, with service trade offs. Public
        demisability materials describe propulsive deorbit and ocean targeting goals (
        <InlineSource id="starlinkDemisability" />). Present operator claims as claims. Compare with
        independent catalogs (<InlineSource id="mcdowellStarlink" />).
      </p>
      <p>
        U.S. FCC licensing shortened the old 25 year LEO disposal benchmark toward a 5 year norm
        for licensees (<InlineSource id="fccDeorbit5y" />). That is national licensing, not a
        complete global solution.
      </p>
    </>
  ),
  'optional-space-safety/astronomy': (
    <>
      <p>
        Moving satellites leave trails in telescope images. Radio astronomy can face interference
        concerns. Community work (SATCON, IAU CPS) sets brightness and coordination targets (
        <InlineSource id="satcon1" />, <InlineSource id="iauCps" />).
      </p>
      <p>
        Mitigations (darker coatings, attitude, public ephemerides for masking) help. Many
        astronomers argue engagement is not the same as solved as fleets grow. Fair classroom
        stance: impacts are real, uneven, and partly mitigable.
      </p>
      <Callout title="Tone" variant="note">
        Core modules teach connectivity. This track holds capability and cost together: no doom, no
        PR only.
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
              { id: 'b', label: 'Satellites leave Earth’s gravity.' },
              { id: 'c', label: 'Light is faster below 500 km.' },
            ],
            explanation: 'Atmospheric drag rises as altitude falls.',
          },
          {
            id: 's2',
            prompt: 'Best practice when citing “how many satellites”?',
            options: [
              {
                id: 'a',
                label: 'Use dated independent catalogs and define “working” vs “in orbit.”',
                correct: true,
              },
              { id: 'b', label: 'Copy any undated social post.' },
              { id: 'c', label: 'Assume marketing numbers never change.' },
            ],
            explanation: 'Fleets and definitions change. Date your sources.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources([
          'starlinkAltitudes',
          'starlinkBestPractices',
          'starlinkDemisability',
          'mcdowellStarlink',
          'nasaDebrisFaq',
          'esaDebris2025',
          'iauCps',
          'satcon1',
          'fccDeorbit5y',
        ])}
      />
    </>
  ),

  /* ─── Optional DTC ─── */
  'optional-direct-to-cell/contrast': (
    <>
      <p>
        Dish broadband uses a high gain phased array on your roof. <strong>Direct to cell</strong>{' '}
        aims at ordinary phones. Phone antennas are tiny. The radio budget is brutal. Service often
        starts messaging first with mobile operator partnerships. It is not the same product as
        home Starlink internet.
      </p>
      <OrbitAltitudeDiagram />
      <RelatedLinks
        items={[
          { label: 'Glossary: link budget', to: '/glossary/link-budget', kind: 'glossary' },
          { label: 'Glossary: direct to cell', to: '/glossary/direct-to-cell', kind: 'glossary' },
        ]}
      />
    </>
  ),
  'optional-direct-to-cell/shells': (
    <>
      <p>
        Public planning associates direct to cell with lower altitude bands while broadband
        occupies nearby LEO shells (<InlineSource id="starlinkAltitudes" />). Multi shell design is
        product architecture under evolution. Calibrate with official docs and independent
        tracking.
      </p>
      <ShellAltitudeCard />
    </>
  ),
  'optional-direct-to-cell/check': (
    <>
      <Quiz
        title="Direct to cell check"
        questions={[
          {
            id: 'd1',
            prompt: 'Direct to cell is harder than dish broadband mainly because…',
            options: [
              {
                id: 'a',
                label: 'Phone antennas have far less gain and power margin.',
                correct: true,
              },
              { id: 'b', label: 'Phones cannot use IP.' },
              { id: 'c', label: 'LEO cannot see phones.' },
            ],
            explanation: 'Link budget dominates. Constellation geometry is still required.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources(['starlinkAltitudes', 'starlinkTech', 'mcdowellStarlink', 'esaOrbits'])}
      />
    </>
  ),

  /* ─── Optional code path ─── */
  'optional-code-path/why': (
    <>
      <Objectives
        items={[
          'Why optional Python re expresses lab models',
          'Same constants as the 3D lab',
        ]}
      />
      <p>
        The main path stays conceptual. Code alongs re express high signal models in about 10 to 15
        minutes of Python: light time, period, coverage, elevation, handoffs, graphs, sweeps.
      </p>
      <p>
        Same assumptions as the lab: circular orbits, geometric elevation, simplified shells. Code
        never blocks Next on a lesson page.
      </p>
      <Callout title="Programmer angle" variant="key">
        Handoffs and mesh routing are discrete computer science problems wearing space costumes.
        Useful practice beyond aerospace.
      </Callout>
    </>
  ),
  'optional-code-path/path': (
    <>
      <p>Map of shipped exercises to core modules:</p>
      <ul>
        <li>
          <strong>Light time GEO vs LEO</strong> after Module 2 Delay
        </li>
        <li>
          <strong>Orbital period vs altitude</strong> after Module 3 Latency
        </li>
        <li>
          <strong>Coverage sparse vs dense</strong> after Module 5 Density
        </li>
        <li>
          <strong>Coverage Monte Carlo</strong> after Module 5 Capacity
        </li>
        <li>
          <strong>Elevation gate</strong> and <strong>Contact windows</strong> after Module 6
          Elevation
        </li>
        <li>
          <strong>Count handoffs</strong> and <strong>Handoff policy</strong> after Module 6
          Handovers
        </li>
        <li>
          <strong>Path hops / weighted / ISL geometry</strong> after Module 7 Mesh
        </li>
        <li>
          <strong>Compose and altitude sweep</strong> on this track
        </li>
        <li>
          <strong>Portfolio brief</strong> on the next pages
        </li>
      </ul>
      <RelatedLinks
        items={[
          { label: 'All code alongs', to: '/code', kind: 'code' },
          { label: 'Module 6 elevation', to: '/learn/user-terminal/elevation', kind: 'lesson' },
          { label: 'Module 7 mesh', to: '/learn/space-network/mesh', kind: 'lesson' },
        ]}
      />
    </>
  ),
  'optional-code-path/compose': (
    <>
      <p>
        Capstone idea: pure light time along a path is not just altitude. Multiply one hop delay by
        hop count for a toy estimate. Real systems add processing and non straight paths. The toy
        still builds intuition.
      </p>
      <CodeAlongCard moduleSlug="optional-code-path" pageId="compose" />
      <CodeAlongCard moduleSlug="end-to-end" pageId="lab" />
    </>
  ),
  'optional-code-path/sweep': (
    <>
      <Objectives
        items={['Vary altitude and related floors', 'Read a small sensitivity table']}
      />
      <p>
        Engineering literacy often means <strong>parameter sweeps</strong>, not a single magic
        number. Change altitude → period and light time floor change. Change elev mask → coverage
        samples change (Module 5 and 6 exercises).
      </p>
      <CodeAlongCard moduleSlug="optional-code-path" pageId="sweep" exerciseId="sweep-altitude" />
      <Callout title="Honesty" variant="warning">
        Sweeps over geometric floors only. They do not prove product RTT or capacity under load.
      </Callout>
      <RelatedLinks
        items={[
          { label: 'Module 8: performance stack', to: '/learn/end-to-end/performance', kind: 'lesson' },
          { label: 'Next: portfolio', to: '/learn/optional-code-path/portfolio', kind: 'lesson' },
        ]}
      />
    </>
  ),
  'optional-code-path/portfolio': (
    <>
      <Objectives
        items={['Pick a small portfolio deliverable', 'Label assumptions explicitly']}
      />
      <p>
        Finish one labeled project you can show. Prefer composition of exercises you already
        passed. No backend. No TLE required.
      </p>
      <ul>
        <li>
          <strong>Path delay explorer</strong>: light time × hops or weighted graph. Table of
          floors.
        </li>
        <li>
          <strong>Coverage report</strong>: sparse vs dense or Monte Carlo samples at a min elev
          mask.
        </li>
        <li>
          <strong>Handoff timeline</strong>: serving id sequence → counts and dwell.
        </li>
        <li>
          <strong>Mesh snapshot</strong>: geometry → ISL edges → BFS or Dijkstra.
        </li>
      </ul>
      <Callout title="Assumption card (required)" variant="key">
        Always state: circular Kepler, geometric elevation, no RF/weather/queues, not Starlink
        internals, date any fleet counts.
      </Callout>
      <CodeAlongCard
        moduleSlug="optional-code-path"
        pageId="portfolio"
        exerciseId="isl-from-geometry"
      />
      <RelatedLinks
        items={[
          { label: 'All code alongs', to: '/code', kind: 'code' },
          { label: 'Module 8 honesty', to: '/learn/end-to-end/honest', kind: 'lesson' },
        ]}
      />
    </>
  ),
  'optional-code-path/check': (
    <>
      <Quiz
        title="Code path check"
        questions={[
          {
            id: 'cp1',
            prompt: 'These exercises should use…',
            options: [
              {
                id: 'a',
                label: 'The same μ, Earth radius, and c constants as the lab.',
                correct: true,
              },
              { id: 'b', label: 'Random constants each run.' },
              { id: 'c', label: 'Proprietary Starlink routing code.' },
            ],
            explanation: 'One model contract everywhere builds trust.',
          },
          {
            id: 'cp2',
            prompt: 'BFS hop count on a toy mesh…',
            options: [
              {
                id: 'a',
                label: 'Equals exact Starlink latency in milliseconds.',
              },
              {
                id: 'b',
                label: 'Is a discrete model of path length, not full radio latency.',
                correct: true,
              },
              { id: 'c', label: 'Requires a GPU.' },
            ],
            explanation: 'Hops are not milliseconds. Still the right first graph model.',
          },
          {
            id: 'cp3',
            prompt: 'A good portfolio write up always includes…',
            options: [
              {
                id: 'a',
                label: 'Claimed reverse engineered beam schedules.',
              },
              {
                id: 'b',
                label: 'Explicit model assumptions and limits.',
                correct: true,
              },
              { id: 'c', label: 'Undated satellite counts as eternal facts.' },
            ],
            explanation: 'Labeled toys are trustworthy. Secret sauce claims are not.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources(['hpbnLatency', 'esaOrbits', 'orbitalMechanicsSpace'])}
      />
    </>
  ),

  /* ─── Optional comparative ─── */
  'optional-comparative/frame': (
    <>
      <Objectives
        items={['Axes for fair comparison', 'Design points vs brand wars']}
      />
      <p>
        After the core path you can compare systems without picking a team. Useful axes:
      </p>
      <ul>
        <li>
          <strong>Orbit regime</strong> (how high, how many satellites)
        </li>
        <li>
          <strong>User equipment</strong> (flat dish, phone, VSAT)
        </li>
        <li>
          <strong>Latency floor</strong> (geometry first)
        </li>
        <li>
          <strong>Gateway and ISL model</strong>
        </li>
        <li>
          <strong>Capacity sharing</strong>
        </li>
        <li>
          <strong>Mission</strong> (home broadband, phone, enterprise)
        </li>
      </ul>
      <p>
        Public operator pages are marketing. Catalogs and regulators are better for “what is
        flying” and “what is licensed.” Date every number (<InlineSource id="cboLeo" />,{' '}
        <InlineSource id="isocLeo" />).
      </p>
      <Callout title="Tone" variant="note">
        Compare architectures. Do not invent proprietary routing or rank “secret sauce.”
      </Callout>
    </>
  ),
  'optional-comparative/points': (
    <>
      <p>
        Starlink style dish broadband is one design point. Direct to cell, classic GEO high
        throughput systems, and other non GEO fleets (public materials from operators such as
        OneWeb or Project Kuiper) vary shells, gateways, and user gear (
        <InlineSource id="starlinkTech" />, <InlineSource id="onewebTech" />,{' '}
        <InlineSource id="kuiperOverview" />).
      </p>
      <ComparativeDesignCard />
      <p>
        Spectrum and market access still sit under national and international frameworks (
        <InlineSource id="fccSpace" />, <InlineSource id="ituSpace" />). Calm context, not a
        regulatory deep dive.
      </p>
      <RelatedLinks
        items={[
          { label: 'Optional: direct to cell', to: '/learn/optional-direct-to-cell/contrast', kind: 'lesson' },
          { label: 'Module 5: capacity', to: '/learn/constellation-design/capacity', kind: 'lesson' },
          { label: 'Core complete: Module 8', to: '/learn/end-to-end/journey', kind: 'lesson' },
        ]}
      />
    </>
  ),
  'optional-comparative/check': (
    <>
      <Quiz
        title="Comparative check"
        questions={[
          {
            id: 'cmp1',
            prompt: 'Best way to compare satellite broadband systems in this course?',
            options: [
              {
                id: 'a',
                label:
                  'Architecture axes (orbit, terminal, latency floor, capacity) with dated sources.',
                correct: true,
              },
              { id: 'b', label: 'Undated social media speed tests only.' },
              { id: 'c', label: 'Assume all LEO systems are identical to GEO.' },
            ],
            explanation: 'Design points plus honesty beat brand scorecards.',
          },
          {
            id: 'cmp2',
            prompt: 'GEO high throughput vs LEO dish broadband: primary latency difference is…',
            options: [
              {
                id: 'a',
                label: 'Geometric path length (and thus light time floor).',
                correct: true,
              },
              { id: 'b', label: 'Whether IP packets are allowed.' },
              { id: 'c', label: 'GEO not using gateways ever.' },
            ],
            explanation: 'Altitude drives the classic interactive gap.',
          },
        ]}
      />
      <FurtherReading
        sources={getSources([
          'starlinkTech',
          'starlinkAltitudes',
          'onewebTech',
          'kuiperOverview',
          'esaOrbits',
          'cboLeo',
          'isocLeo',
          'fccSpace',
          'ituSpace',
        ])}
      />
    </>
  ),
}
