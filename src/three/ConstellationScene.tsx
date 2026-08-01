import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars } from '@react-three/drei'
import { useCallback, useState } from 'react'
import { computeInsights } from '@/sim/insights'
import type { LabParams, LiveSimStats, SceneDisplayOptions } from '@/sim/types'
import { Earth } from './Earth'
import { LabCore } from './LabCore'
import { OrbitRings } from './OrbitRings'
import { UserMarker } from './UserMarker'

const DEFAULT_DISPLAY: SceneDisplayOptions = {
  showOrbitRings: true,
  showFootprint: true,
  showLink: true,
  showInViewHighlight: true,
}

type ConstellationSceneProps = {
  params: LabParams
  className?: string
  /** Compact hero mode: slightly lighter stars */
  mode?: 'lab' | 'hero'
  paused?: boolean
  display?: Partial<SceneDisplayOptions>
  onStats?: (stats: LiveSimStats) => void
}

export function ConstellationScene({
  params,
  className,
  mode = 'lab',
  paused = false,
  display: displayOverride,
  onStats,
}: ConstellationSceneProps) {
  const display: SceneDisplayOptions = {
    ...DEFAULT_DISPLAY,
    ...displayOverride,
  }

  const [online, setOnline] = useState(() => computeInsights(params, 0).coverage.online)

  const handleStats = useCallback(
    (stats: LiveSimStats) => {
      setOnline(stats.coverage.online)
      onStats?.(stats)
    },
    [onStats],
  )

  return (
    <div className={className ?? 'relative h-full min-h-[320px] w-full'}>
      <Canvas camera={{ position: [0, 1.15, 2.65], fov: 42 }} dpr={[1, 2]}>
        <color attach="background" args={['#05070f']} />
        <ambientLight intensity={0.28} />
        <directionalLight position={[4.5, 2.5, 3.5]} intensity={1.35} />
        <directionalLight position={[-3, -1, -2]} intensity={0.15} color="#8ecae6" />
        <Stars
          radius={90}
          depth={50}
          count={mode === 'hero' ? 2500 : 5000}
          factor={3}
          fade
          speed={0.35}
        />
        <Earth />
        {display.showOrbitRings ? <OrbitRings params={params} /> : null}
        <LabCore
          params={params}
          paused={paused}
          display={display}
          onStats={handleStats}
          statsIntervalMs={mode === 'hero' ? 200 : 80}
        />
        <UserMarker params={params} online={online} />
        <OrbitControls
          enablePan={false}
          minDistance={1.55}
          maxDistance={7}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.7}
        />
      </Canvas>
    </div>
  )
}
