import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  BufferGeometry,
  Color,
  CylinderGeometry,
  DoubleSide,
  DynamicDrawUsage,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Quaternion,
  Vector3,
  type InstancedMesh,
} from 'three'
import { toRenderPosition } from '@/sim/constellation'
import { HandoffTracker } from '@/sim/handoff'
import { buildFootprintDisc } from '@/sim/orbitGeometry'
import {
  computeLabFrame,
  LAB_FOOTPRINT_SAMPLES,
  labInstanceCount,
} from '@/sim/labFrame'
import type { LabParams, LiveSimStats, SceneDisplayOptions, SimFocusState } from '@/sim/types'

const temp = new Object3D()
const colorServing = new Color('#80ed99')
const colorInView = new Color('#5eead4')
const colorIdle = new Color('#3d8fb5')
const colorFlash = new Color('#f0fff4')

const _vUser = new Vector3()
const _vSat = new Vector3()
const _vMid = new Vector3()
const _vDir = new Vector3()
const _vY = new Vector3(0, 1, 0)
const _q = new Quaternion()

const TRACK_CAPACITY = 180

type LabCoreProps = {
  params: LabParams
  paused: boolean
  display: SceneDisplayOptions
  onStats?: (stats: LiveSimStats) => void
  statsIntervalMs?: number
  /** Increment to force sim clock + handoff + track reset */
  resetToken?: number
  focusRef?: React.MutableRefObject<SimFocusState>
}

/**
 * Single frame-driven system: satellites, link beam, footprint, ground track,
 * handoffs, and stats. Keeps sim time and coverage in lockstep.
 */
export function LabCore({
  params,
  paused,
  display,
  onStats,
  statsIntervalMs = 100,
  resetToken = 0,
  focusRef,
}: LabCoreProps) {
  const meshRef = useRef<InstancedMesh>(null)
  const simTime = useRef(0)
  const handoffs = useRef(new HandoffTracker())
  const lastStatsPush = useRef(0)
  const lastServingId = useRef<string | null>(null)
  const flashUntil = useRef(0)
  const trackCount = useRef(0)
  const trackWrite = useRef(0)
  const trackBuf = useRef(new Float32Array(TRACK_CAPACITY * 3))
  const trackSampleAcc = useRef(0)

  const count = labInstanceCount(params)

  const linkLine = useMemo(() => {
    const geo = makeLineGeo(2)
    const mat = new LineBasicMaterial({
      color: colorServing,
      transparent: true,
      opacity: 0.55,
      toneMapped: false,
    })
    const line = new Line(geo, mat)
    line.visible = false
    line.frustumCulled = false
    return line
  }, [])

  const linkBeam = useMemo(() => {
    const geo = new CylinderGeometry(1, 1, 1, 8, 1, true)
    const mat = new MeshBasicMaterial({
      color: colorServing,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
      toneMapped: false,
    })
    const mesh = new Mesh(geo, mat)
    mesh.visible = false
    mesh.frustumCulled = false
    return mesh
  }, [])

  const footprintLine = useMemo(() => {
    const geo = makeLineGeo(LAB_FOOTPRINT_SAMPLES + 1)
    const mat = new LineBasicMaterial({
      color: colorServing,
      transparent: true,
      opacity: 0.9,
      toneMapped: false,
    })
    const line = new Line(geo, mat)
    line.visible = false
    line.frustumCulled = false
    return line
  }, [])

  const footprintDisc = useMemo(() => {
    const { positions, indices } = buildFootprintDisc(
      [0, 0, EARTH_PLACEHOLDER],
      0.2,
      LAB_FOOTPRINT_SAMPLES,
    )
    const geo = new BufferGeometry()
    geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
    geo.setIndex(Array.from(indices))
    const mat = new MeshBasicMaterial({
      color: '#80ed99',
      transparent: true,
      opacity: 0.14,
      depthWrite: false,
      side: DoubleSide,
      toneMapped: false,
    })
    const mesh = new Mesh(geo, mat)
    mesh.visible = false
    mesh.frustumCulled = false
    return mesh
  }, [])

  const groundTrack = useMemo(() => {
    const geo = makeLineGeo(TRACK_CAPACITY)
    const mat = new LineBasicMaterial({
      color: '#f4a261',
      transparent: true,
      opacity: 0.85,
      toneMapped: false,
    })
    const line = new Line(geo, mat)
    line.visible = false
    line.frustumCulled = false
    return line
  }, [])

  useEffect(() => {
    simTime.current = 0
    handoffs.current.reset(0)
    lastStatsPush.current = 0
    lastServingId.current = null
    flashUntil.current = 0
    trackCount.current = 0
    trackWrite.current = 0
    trackSampleAcc.current = 0
  }, [
    params.planes,
    params.satsPerPlane,
    params.altitudeKm,
    params.inclinationDeg,
    params.minElevationDeg,
    params.userLatDeg,
    params.userLonDeg,
    resetToken,
  ])

  useEffect(() => {
    return () => {
      disposeLine(linkLine)
      linkBeam.geometry.dispose()
      ;(linkBeam.material as MeshBasicMaterial).dispose()
      disposeLine(footprintLine)
      footprintDisc.geometry.dispose()
      ;(footprintDisc.material as MeshBasicMaterial).dispose()
      disposeLine(groundTrack)
    }
  }, [linkLine, linkBeam, footprintLine, footprintDisc, groundTrack])

  useFrame(({ clock }, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    if (!paused) {
      simTime.current += delta * params.timeScale
    }

    const t = simTime.current
    const wall = clock.elapsedTime
    // Pure frame: constellation, coverage, footprints — same as tests.
    const frame = computeLabFrame(params, t)
    const { satellites: sats, coverage, renderPositions, userRender } = frame
    const prevHandoffs = handoffs.current.count
    handoffs.current.observe(coverage.servingSatId, t)
    if (handoffs.current.count > prevHandoffs) {
      flashUntil.current = wall + 0.55
      // New serving sat → fresh ground track
      trackCount.current = 0
      trackWrite.current = 0
    }

    const flashing = wall < flashUntil.current
    const inViewSet = display.showInViewHighlight ? new Set(coverage.inViewIds) : null

    for (let i = 0; i < sats.length; i++) {
      const sat = sats[i]!
      const [x, y, z] = renderPositions[i]!
      const isServing = sat.id === coverage.servingSatId
      const inView = inViewSet?.has(sat.id) ?? false

      temp.position.set(x, y, z)
      let scale = isServing ? 2.4 : inView ? 1.5 : 1
      if (isServing && flashing) scale = 3.4
      temp.scale.setScalar(scale)
      temp.updateMatrix()
      mesh.setMatrixAt(i, temp.matrix)

      let c = isServing ? colorServing : inView ? colorInView : colorIdle
      if (isServing && flashing) c = colorFlash
      mesh.setColorAt(i, c)
    }

    for (let i = sats.length; i < count; i++) {
      temp.scale.setScalar(0)
      temp.position.set(0, 0, 0)
      temp.updateMatrix()
      mesh.setMatrixAt(i, temp.matrix)
    }

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

    _vUser.set(userRender[0], userRender[1], userRender[2])

    // Link beam + line (endpoints = user + serving render positions)
    if (display.showLink && coverage.online && coverage.servingPositionKm) {
      const satR = toRenderPosition(coverage.servingPositionKm)
      _vSat.set(satR[0], satR[1], satR[2])

      const posAttr = linkLine.geometry.getAttribute('position') as Float32BufferAttribute
      const arr = posAttr.array as Float32Array
      arr[0] = _vUser.x
      arr[1] = _vUser.y
      arr[2] = _vUser.z
      arr[3] = _vSat.x
      arr[4] = _vSat.y
      arr[5] = _vSat.z
      posAttr.needsUpdate = true
      linkLine.geometry.computeBoundingSphere()
      linkLine.visible = true
      ;(linkLine.material as LineBasicMaterial).opacity = flashing ? 0.95 : 0.55

      _vDir.copy(_vSat).sub(_vUser)
      const len = _vDir.length()
      _vMid.copy(_vUser).add(_vSat).multiplyScalar(0.5)
      _q.setFromUnitVectors(_vY, _vDir.clone().normalize())
      linkBeam.position.copy(_vMid)
      linkBeam.quaternion.copy(_q)
      linkBeam.scale.set(flashing ? 0.01 : 0.006, len, flashing ? 0.01 : 0.006)
      ;(linkBeam.material as MeshBasicMaterial).opacity = flashing ? 0.55 : 0.32
      linkBeam.visible = true
    } else {
      linkLine.visible = false
      linkBeam.visible = false
    }

    // Footprint outline + filled disc from pure frame geometry
    if (display.showFootprint && frame.footprintRingUnit && frame.footprintDisc) {
      const ring = frame.footprintRingUnit
      const posAttr = footprintLine.geometry.getAttribute('position') as Float32BufferAttribute
      const arr = posAttr.array as Float32Array
      for (let i = 0; i < ring.length; i++) {
        arr[i * 3] = ring[i]![0]
        arr[i * 3 + 1] = ring[i]![1]
        arr[i * 3 + 2] = ring[i]![2]
      }
      posAttr.needsUpdate = true
      footprintLine.geometry.computeBoundingSphere()
      footprintLine.visible = true

      const discPos = footprintDisc.geometry.getAttribute('position') as Float32BufferAttribute
      ;(discPos.array as Float32Array).set(frame.footprintDisc.positions)
      discPos.needsUpdate = true
      footprintDisc.geometry.computeBoundingSphere()
      footprintDisc.visible = true
      ;(footprintDisc.material as MeshBasicMaterial).opacity = flashing ? 0.22 : 0.14
    } else {
      footprintLine.visible = false
      footprintDisc.visible = false
    }

    // Ground track of serving sat (sub-satellite path)
    if (display.showGroundTrack && frame.groundTrackSample) {
      trackSampleAcc.current += delta * Math.max(1, params.timeScale / 40)
      if (trackSampleAcc.current >= 1 || trackCount.current === 0) {
        trackSampleAcc.current = 0
        const pt = frame.groundTrackSample
        const w = trackWrite.current % TRACK_CAPACITY
        trackBuf.current[w * 3] = pt[0]
        trackBuf.current[w * 3 + 1] = pt[1]
        trackBuf.current[w * 3 + 2] = pt[2]
        trackWrite.current = w + 1
        trackCount.current = Math.min(TRACK_CAPACITY, trackCount.current + 1)
      }

      const n = trackCount.current
      const posAttr = groundTrack.geometry.getAttribute('position') as Float32BufferAttribute
      const arr = posAttr.array as Float32Array
      // Rewrite in chronological order
      const start = trackWrite.current - n
      for (let i = 0; i < n; i++) {
        const src = ((start + i) % TRACK_CAPACITY + TRACK_CAPACITY) % TRACK_CAPACITY
        arr[i * 3] = trackBuf.current[src * 3]!
        arr[i * 3 + 1] = trackBuf.current[src * 3 + 1]!
        arr[i * 3 + 2] = trackBuf.current[src * 3 + 2]!
      }
      // Hide unused vertices by repeating last point
      const last = Math.max(0, n - 1)
      for (let i = n; i < TRACK_CAPACITY; i++) {
        arr[i * 3] = arr[last * 3]!
        arr[i * 3 + 1] = arr[last * 3 + 1]!
        arr[i * 3 + 2] = arr[last * 3 + 2]!
      }
      posAttr.needsUpdate = true
      groundTrack.geometry.setDrawRange(0, Math.max(2, n))
      groundTrack.geometry.computeBoundingSphere()
      groundTrack.visible = n >= 2
    } else {
      groundTrack.visible = false
    }

    // Focus for camera
    if (focusRef) {
      const u = userRender
      const len = Math.hypot(u[0], u[1], u[2]) || 1
      focusRef.current.userUnit = [u[0] / len, u[1] / len, u[2] / len]
      if (coverage.servingPositionKm) {
        const s = toRenderPosition(coverage.servingPositionKm)
        focusRef.current.servingUnit = [s[0], s[1], s[2]]
      } else {
        focusRef.current.servingUnit = null
      }
      focusRef.current.handoffFlash = flashing ? 1 : 0
      focusRef.current.simTimeSeconds = t
    }

    lastServingId.current = coverage.servingSatId

    if (onStats) {
      const now = wall * 1000
      if (now - lastStatsPush.current >= statsIntervalMs) {
        lastStatsPush.current = now
        onStats({
          orbitalPeriodMin: frame.orbitalPeriodMin,
          orbitalSpeedKms: frame.orbitalSpeedKms,
          totalSatellites: frame.totalSatellites,
          coverage,
          simTimeSeconds: t,
          handoffCount: handoffs.current.count,
          handoffsPerSimMinute: handoffs.current.ratePerSimMinute(t),
          paused,
          handoffFlash: flashing,
        })
      }
    }
  })

  return (
    <group>
      <instancedMesh
        key={count}
        ref={meshRef}
        args={[undefined, undefined, count]}
        frustumCulled={false}
        onUpdate={(self) => {
          self.instanceMatrix.setUsage(DynamicDrawUsage)
        }}
      >
        <sphereGeometry args={[0.011, 8, 8]} />
        <meshBasicMaterial toneMapped={false} vertexColors />
      </instancedMesh>

      <primitive object={linkLine} />
      <primitive object={linkBeam} />
      <primitive object={footprintDisc} />
      <primitive object={footprintLine} />
      <primitive object={groundTrack} />
    </group>
  )
}

/** Placeholder radial for initial disc allocation (never shown with this value). */
const EARTH_PLACEHOLDER = 6371

function makeLineGeo(pointCount: number): BufferGeometry {
  const geo = new BufferGeometry()
  geo.setAttribute(
    'position',
    new Float32BufferAttribute(new Float32Array(pointCount * 3), 3),
  )
  return geo
}

function disposeLine(line: Line): void {
  line.geometry.dispose()
  ;(line.material as LineBasicMaterial).dispose()
}
