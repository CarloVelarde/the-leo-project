import { useMemo } from 'react'
import {
  BufferGeometry,
  Float32BufferAttribute,
  Line,
  LineBasicMaterial,
} from 'three'
import { sampleOrbitRingKm } from '@/sim/orbitGeometry'
import { toRenderPosition } from '@/sim/constellation'
import type { LabParams } from '@/sim/types'

type OrbitRingsProps = {
  params: LabParams
  /** Cap drawn rings for performance when planes are many */
  maxRings?: number
}

export function OrbitRings({ params, maxRings = 24 }: OrbitRingsProps) {
  const lines = useMemo(() => {
    const n = Math.min(params.planes, maxRings)
    const material = new LineBasicMaterial({
      color: '#4cc9f0',
      transparent: true,
      opacity: 0.22,
      toneMapped: false,
    })
    const result: Line[] = []

    for (let p = 0; p < n; p++) {
      const raan = (2 * Math.PI * p) / params.planes
      const kmPts = sampleOrbitRingKm(params.altitudeKm, params.inclinationDeg, raan, 96)
      const positions = new Float32Array((kmPts.length + 1) * 3)
      for (let i = 0; i < kmPts.length; i++) {
        const [x, y, z] = toRenderPosition(kmPts[i]!)
        positions[i * 3] = x
        positions[i * 3 + 1] = y
        positions[i * 3 + 2] = z
      }
      positions[kmPts.length * 3] = positions[0]!
      positions[kmPts.length * 3 + 1] = positions[1]!
      positions[kmPts.length * 3 + 2] = positions[2]!

      const geo = new BufferGeometry()
      geo.setAttribute('position', new Float32BufferAttribute(positions, 3))
      result.push(new Line(geo, material))
    }
    return result
  }, [params.planes, params.altitudeKm, params.inclinationDeg, maxRings])

  return (
    <group>
      {lines.map((line, i) => (
        <primitive key={i} object={line} />
      ))}
    </group>
  )
}
