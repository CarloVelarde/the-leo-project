export function Earth() {
  return (
    <mesh>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial color="#1b3a5f" roughness={0.85} metalness={0.1} />
      {/* Thin atmosphere hint */}
      <mesh scale={1.02}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#4cc9f0" transparent opacity={0.06} />
      </mesh>
    </mesh>
  )
}
