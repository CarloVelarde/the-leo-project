import { useMemo } from 'react'
import { DoubleSide, Quaternion, Vector3 } from 'three'
import { userPositionKm } from '@/sim/coverage'
import { toRenderPosition } from '@/sim/constellation'
import type { LabParams } from '@/sim/types'

type UserMarkerProps = {
  params: LabParams
  online: boolean
}

const _up = new Vector3(0, 0, 1)
const _n = new Vector3()
const _q = new Quaternion()

export function UserMarker({ params, online }: UserMarkerProps) {
  const { pos, quat } = useMemo(() => {
    const p = toRenderPosition(userPositionKm(params.userLatDeg, params.userLonDeg))
    _n.set(p[0], p[1], p[2]).normalize()
    _q.setFromUnitVectors(_up, _n)
    return {
      pos: p as [number, number, number],
      quat: _q.clone(),
    }
  }, [params.userLatDeg, params.userLonDeg])

  return (
    <group position={pos} quaternion={quat}>
      <mesh>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshBasicMaterial color={online ? '#f4a261' : '#c45c26'} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0, 0.02]}>
        <sphereGeometry args={[0.01, 8, 8]} />
        <meshBasicMaterial color="#ffe0c2" toneMapped={false} />
      </mesh>
      <mesh rotation={[0, 0, 0]}>
        <ringGeometry args={[0.04, 0.055, 32]} />
        <meshBasicMaterial
          color={online ? '#80ed99' : '#f4a261'}
          transparent
          opacity={0.75}
          toneMapped={false}
          side={DoubleSide}
        />
      </mesh>
    </group>
  )
}
