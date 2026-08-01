import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  BufferGeometry,
  Color,
  DynamicDrawUsage,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
  Object3D,
  type InstancedMesh,
} from 'three'
import {
  evaluateCoverage,
  footprintHalfAngleRad,
  userPositionKm,
} from '@/sim/coverage'
import { generateConstellation, toRenderPosition, totalSatellites } from '@/sim/constellation'
import { HandoffTracker } from '@/sim/handoff'
import { sampleFootprintOnUnitSphere } from '@/sim/orbitGeometry'
import { orbitalPeriodMinutes, orbitalSpeedKms } from '@/sim/orbit'
import type { LabParams, LiveSimStats, SceneDisplayOptions } from '@/sim/types'

const temp = new Object3D()
const colorServing = new Color('#80ed99')
const colorInView = new Color('#5eead4')
const colorIdle = new Color('#3d8fb5')

type LabCoreProps = {
  params: LabParams
  paused: boolean
  display: SceneDisplayOptions
  onStats?: (stats: LiveSimStats) => void
  statsIntervalMs?: number
}

/**
 * Single frame-driven system: satellites, link beam, footprint, handoffs, stats.
 * Keeps sim time and coverage in lockstep.
 */
export function LabCore({
  params,
  paused,
  display,
  onStats,
  statsIntervalMs = 100,
}: LabCoreProps) {
  const meshRef = useRef<InstancedMesh>(null)
  const simTime = useRef(0)
  const handoffs = useRef(new HandoffTracker())
  const lastStatsPush = useRef(0)

  const count = Math.max(1, totalSatellites(params))

  const linkLine = useMemo(() => {
    const geo = makeLineGeo(2)
    const mat = new LineBasicMaterial({
      color: colorServing,
      transparent: true,
      opacity: 0.95,
      toneMapped: false,
    })
    const line = new Line(geo, mat)
    line.visible = false
    line.frustumCulled = false
    return line
  }, [])

  const footprintLine = useMemo(() => {
    const geo = makeLineGeo(73)
    const mat = new LineBasicMaterial({
      color: colorServing,
      transparent: true,
      opacity: 0.8,
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
  }, [
    params.planes,
    params.satsPerPlane,
    params.altitudeKm,
    params.inclinationDeg,
    params.minElevationDeg,
    params.userLatDeg,
    params.userLonDeg,
  ])

  useEffect(() => {
    return () => {
      linkLine.geometry.dispose()
      ;(linkLine.material as LineBasicMaterial).dispose()
      footprintLine.geometry.dispose()
      ;(footprintLine.material as LineBasicMaterial).dispose()
    }
  }, [linkLine, footprintLine])

  useFrame(({ clock }, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    if (!paused) {
      simTime.current += delta * params.timeScale
    }

    const t = simTime.current
    const sats = generateConstellation(params, t)
    const coverage = evaluateCoverage(params, sats)
    handoffs.current.observe(coverage.servingSatId, t)

    const inViewSet = display.showInViewHighlight ? new Set(coverage.inViewIds) : null

    for (let i = 0; i < sats.length; i++) {
      const sat = sats[i]!
      const [x, y, z] = toRenderPosition(sat.position)
      const isServing = sat.id === coverage.servingSatId
      const inView = inViewSet?.has(sat.id) ?? false

      temp.position.set(x, y, z)
      temp.scale.setScalar(isServing ? 2.4 : inView ? 1.5 : 1)
      temp.updateMatrix()
      mesh.setMatrixAt(i, temp.matrix)
      mesh.setColorAt(i, isServing ? colorServing : inView ? colorInView : colorIdle)
    }

    for (let i = sats.length; i < count; i++) {
      temp.scale.setScalar(0)
      temp.position.set(0, 0, 0)
      temp.updateMatrix()
      mesh.setMatrixAt(i, temp.matrix)
    }

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true

    // Link beam
    if (display.showLink) {
      const posAttr = linkLine.geometry.getAttribute('position') as Float32BufferAttribute
      const arr = posAttr.array as Float32Array
      if (coverage.online && coverage.servingPositionKm) {
        const user = toRenderPosition(userPositionKm(params.userLatDeg, params.userLonDeg))
        const sat = toRenderPosition(coverage.servingPositionKm)
        arr[0] = user[0]
        arr[1] = user[1]
        arr[2] = user[2]
        arr[3] = sat[0]
        arr[4] = sat[1]
        arr[5] = sat[2]
        posAttr.needsUpdate = true
        linkLine.geometry.computeBoundingSphere()
        linkLine.visible = true
      } else {
        linkLine.visible = false
      }
    } else {
      linkLine.visible = false
    }

    // Footprint of serving satellite
    if (display.showFootprint) {
      if (coverage.online && coverage.servingPositionKm) {
        const half = footprintHalfAngleRad(params.altitudeKm, params.minElevationDeg)
        const pts = sampleFootprintOnUnitSphere(coverage.servingPositionKm, half, 72)
        const posAttr = footprintLine.geometry.getAttribute(
          'position',
        ) as Float32BufferAttribute
        const arr = posAttr.array as Float32Array
        for (let i = 0; i < pts.length; i++) {
          arr[i * 3] = pts[i]![0]
          arr[i * 3 + 1] = pts[i]![1]
          arr[i * 3 + 2] = pts[i]![2]
        }
        posAttr.needsUpdate = true
        footprintLine.geometry.computeBoundingSphere()
        footprintLine.visible = true
      } else {
        footprintLine.visible = false
      }
    } else {
      footprintLine.visible = false
    }

    if (onStats) {
      const now = clock.elapsedTime * 1000
      if (now - lastStatsPush.current >= statsIntervalMs) {
        lastStatsPush.current = now
        onStats({
          orbitalPeriodMin: orbitalPeriodMinutes(params.altitudeKm),
          orbitalSpeedKms: orbitalSpeedKms(params.altitudeKm),
          totalSatellites: sats.length,
          coverage,
          simTimeSeconds: t,
          handoffCount: handoffs.current.count,
          handoffsPerSimMinute: handoffs.current.ratePerSimMinute(t),
          paused,
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
      <primitive object={footprintLine} />
    </group>
  )
}

function makeLineGeo(pointCount: number): BufferGeometry {
  const geo = new BufferGeometry()
  geo.setAttribute(
    'position',
    new Float32BufferAttribute(new Float32Array(pointCount * 3), 3),
  )
  return geo
}
