import { Canvas } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import { useCallback, useRef, useState } from 'react'
import { computeInsights } from '@/sim/insights'
import type {
  CameraMode,
  LabParams,
  LiveSimStats,
  SceneDisplayOptions,
  SimFocusState,
} from '@/sim/types'
import { CameraRig } from './CameraRig'
import { Earth } from './Earth'
import { LabCore } from './LabCore'
import { OrbitRings } from './OrbitRings'
import { UserMarker } from './UserMarker'

const DEFAULT_DISPLAY: SceneDisplayOptions = {
  showOrbitRings: true,
  showFootprint: true,
  showLink: true,
  showInViewHighlight: true,
  showGroundTrack: true,
}

function initialFocus(params: LabParams): SimFocusState {
  const insights = computeInsights(params, 0)
  return {
    userUnit: [0, 0, 1],
    servingUnit: insights.coverage.servingPositionKm
      ? ([
          insights.coverage.servingPositionKm[0] / 6371,
          insights.coverage.servingPositionKm[1] / 6371,
          insights.coverage.servingPositionKm[2] / 6371,
        ] as [number, number, number])
      : null,
    handoffFlash: 0,
    simTimeSeconds: 0,
  }
}

type ConstellationSceneProps = {
  params: LabParams
  className?: string
  mode?: 'lab' | 'hero'
  paused?: boolean
  resetToken?: number
  cameraMode?: CameraMode
  display?: Partial<SceneDisplayOptions>
  onStats?: (stats: LiveSimStats) => void
}

export function ConstellationScene({
  params,
  className,
  mode = 'lab',
  paused = false,
  resetToken = 0,
  cameraMode = 'free',
  display: displayOverride,
  onStats,
}: ConstellationSceneProps) {
  const display: SceneDisplayOptions = {
    ...DEFAULT_DISPLAY,
    ...(mode === 'hero' ? { showGroundTrack: false } : null),
    ...displayOverride,
  }

  const focusRef = useRef<SimFocusState>(initialFocus(params))
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
          resetToken={resetToken}
          focusRef={focusRef}
        />
        <UserMarker params={params} online={online} />
        <CameraRig mode={cameraMode} focusRef={focusRef} />
      </Canvas>
    </div>
  )
}
