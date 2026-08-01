import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useMemo } from 'react'
import { computeInsights } from '@/sim/insights'
import type { LabParams } from '@/sim/types'
import { Earth } from './Earth'
import { Satellites } from './Satellites'
import { UserMarker } from './UserMarker'

type ConstellationSceneProps = {
  params: LabParams
  className?: string
}

export function ConstellationScene({ params, className }: ConstellationSceneProps) {
  // Insights at t=0 for serving sat highlight seed; satellites animate independently.
  const insights = useMemo(() => computeInsights(params, 0), [params])

  return (
    <div className={className ?? 'h-full min-h-[320px] w-full'}>
      <Canvas camera={{ position: [0, 1.2, 2.8], fov: 45 }} dpr={[1, 2]}>
        <color attach="background" args={['#05070f']} />
        <ambientLight intensity={0.35} />
        <directionalLight position={[5, 3, 5]} intensity={1.1} />
        <Stars radius={80} depth={40} count={4000} factor={3} fade speed={0.4} />
        <Earth />
        <Satellites params={params} servingSatId={insights.coverage.servingSatId} />
        <UserMarker params={params} />
        <OrbitControls enablePan={false} minDistance={1.6} maxDistance={6} />
      </Canvas>
    </div>
  )
}
