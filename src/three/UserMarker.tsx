import { userPositionKm } from '@/sim/coverage'
import { toRenderPosition } from '@/sim/constellation'
import type { LabParams } from '@/sim/types'

type UserMarkerProps = {
  params: LabParams
}

export function UserMarker({ params }: UserMarkerProps) {
  const pos = toRenderPosition(userPositionKm(params.userLatDeg, params.userLonDeg))

  return (
    <mesh position={pos}>
      <sphereGeometry args={[0.025, 16, 16]} />
      <meshBasicMaterial color="#f4a261" />
    </mesh>
  )
}
