import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Vector3 } from 'three'
import type { CameraMode, SimFocusState } from '@/sim/types'

type CameraRigProps = {
  mode: CameraMode
  focusRef: React.MutableRefObject<SimFocusState>
  enabled?: boolean
}

type ControlsHandle = {
  target: Vector3
  update: () => void
}

const _target = new Vector3()
const _cam = new Vector3()
const _user = new Vector3()
const _serving = new Vector3()
const _away = new Vector3()

/**
 * Free orbit by default; smooth follow modes keep framing educational moments
 * (user site or active serving satellite).
 */
export function CameraRig({ mode, focusRef, enabled = true }: CameraRigProps) {
  const controlsRef = useRef<ControlsHandle | null>(null)
  const { camera } = useThree()
  const userDragged = useRef(false)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  useFrame(() => {
    if (!enabled || mode === 'free') return
    const controls = controlsRef.current
    if (!controls || userDragged.current) return

    const focus = focusRef.current
    _user.set(focus.userUnit[0], focus.userUnit[1], focus.userUnit[2])

    if (mode === 'user') {
      const n = _user.normalize()
      _target.copy(n).multiplyScalar(1.0)
      _cam.copy(n).multiplyScalar(2.15)
      camera.position.lerp(_cam, 0.06)
      controls.target.lerp(_target, 0.08)
      controls.update()
      return
    }

    if (mode === 'serving' && focus.servingUnit) {
      _serving.set(focus.servingUnit[0], focus.servingUnit[1], focus.servingUnit[2])
      _target.copy(_serving)
      _away.copy(_serving).normalize().multiplyScalar(2.45)
      _cam.copy(_away).addScaledVector(_user, 0.15)
      camera.position.lerp(_cam, 0.07)
      controls.target.lerp(_target, 0.1)
      controls.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef as never}
      enablePan={false}
      minDistance={1.55}
      maxDistance={7}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.7}
      onStart={() => {
        userDragged.current = true
        if (resumeTimer.current) clearTimeout(resumeTimer.current)
      }}
      onEnd={() => {
        if (mode === 'free') {
          userDragged.current = false
          return
        }
        resumeTimer.current = setTimeout(() => {
          userDragged.current = false
        }, 1200)
      }}
    />
  )
}
