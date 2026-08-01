import { useMemo } from 'react'
import { CanvasTexture, DoubleSide, SRGBColorSpace } from 'three'
import { createEarthCanvasTexture } from './earthTexture'

export function Earth() {
  const texture = useMemo(() => {
    const canvas = createEarthCanvasTexture(1024)
    const tex = new CanvasTexture(canvas)
    tex.colorSpace = SRGBColorSpace
    tex.anisotropy = 4
    return tex
  }, [])

  return (
    <group>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial map={texture} roughness={0.9} metalness={0.05} />
      </mesh>

      {/* Atmosphere rim */}
      <mesh scale={1.035}>
        <sphereGeometry args={[1, 48, 48]} />
        <meshBasicMaterial
          color="#5ec8ff"
          transparent
          opacity={0.07}
          depthWrite={false}
        />
      </mesh>

      {/* Soft outer glow */}
      <mesh scale={1.08}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#4cc9f0"
          transparent
          opacity={0.035}
          depthWrite={false}
          side={DoubleSide}
        />
      </mesh>
    </group>
  )
}
