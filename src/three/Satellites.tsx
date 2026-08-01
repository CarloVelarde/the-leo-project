import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import type { InstancedMesh } from 'three'
import { Color, DynamicDrawUsage, Object3D } from 'three'
import { generateConstellation, toRenderPosition } from '@/sim/constellation'
import type { LabParams } from '@/sim/types'

const temp = new Object3D()
const activeColor = new Color('#80ed99')
const idleColor = new Color('#4cc9f0')

type SatellitesProps = {
  params: LabParams
  servingSatId: string | null
}

export function Satellites({ params, servingSatId }: SatellitesProps) {
  const meshRef = useRef<InstancedMesh>(null)
  const simTime = useRef(0)
  const count = Math.max(1, params.planes * params.satsPerPlane)

  useFrame((_, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    simTime.current += delta * params.timeScale
    const sats = generateConstellation(params, simTime.current)

    for (let i = 0; i < sats.length; i++) {
      const sat = sats[i]!
      const [x, y, z] = toRenderPosition(sat.position)
      temp.position.set(x, y, z)
      temp.scale.setScalar(sat.id === servingSatId ? 2.2 : 1)
      temp.updateMatrix()
      mesh.setMatrixAt(i, temp.matrix)
      mesh.setColorAt(i, sat.id === servingSatId ? activeColor : idleColor)
    }

    // Hide unused instances if count is fixed higher than current (should match)
    for (let i = sats.length; i < count; i++) {
      temp.position.set(0, 0, 0)
      temp.scale.setScalar(0)
      temp.updateMatrix()
      mesh.setMatrixAt(i, temp.matrix)
    }

    mesh.instanceMatrix.needsUpdate = true
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })

  return (
    <instancedMesh
      key={count}
      ref={meshRef}
      args={[undefined, undefined, count]}
      frustumCulled={false}
      onUpdate={(self) => {
        self.instanceMatrix.setUsage(DynamicDrawUsage)
      }}
    >
      <sphereGeometry args={[0.012, 8, 8]} />
      <meshBasicMaterial toneMapped={false} vertexColors />
    </instancedMesh>
  )
}
