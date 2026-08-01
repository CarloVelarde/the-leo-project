/**
 * Procedural Earth-like texture (no network dependency).
 * Soft oceans, continent blobs, subtle city lights, and a night side tint via material.
 */
export function createEarthCanvasTexture(size = 1024): HTMLCanvasElement {
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  if (!ctx) return canvas

  // Ocean base
  const ocean = ctx.createLinearGradient(0, 0, size, size)
  ocean.addColorStop(0, '#0b1f3a')
  ocean.addColorStop(0.5, '#123a5f')
  ocean.addColorStop(1, '#0a2744')
  ctx.fillStyle = ocean
  ctx.fillRect(0, 0, size, size)

  // Soft noise field for water variation
  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = 4 + Math.random() * 18
    ctx.fillStyle = `rgba(40, 120, 160, ${0.02 + Math.random() * 0.04})`
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  // Continent-like blobs (equirectangular-ish bands)
  const lands: Array<{ cx: number; cy: number; rx: number; ry: number; rot: number }> = [
    { cx: 0.18, cy: 0.38, rx: 0.14, ry: 0.22, rot: -0.3 }, // Americas-ish
    { cx: 0.22, cy: 0.62, rx: 0.08, ry: 0.16, rot: 0.2 },
    { cx: 0.48, cy: 0.35, rx: 0.12, ry: 0.2, rot: 0.1 }, // Europe/Africa-ish
    { cx: 0.52, cy: 0.55, rx: 0.1, ry: 0.18, rot: -0.15 },
    { cx: 0.72, cy: 0.32, rx: 0.18, ry: 0.14, rot: 0.05 }, // Asia-ish
    { cx: 0.78, cy: 0.48, rx: 0.1, ry: 0.12, rot: 0.3 },
    { cx: 0.82, cy: 0.68, rx: 0.1, ry: 0.08, rot: 0 }, // Australia-ish
    { cx: 0.55, cy: 0.82, rx: 0.16, ry: 0.07, rot: 0 }, // Antarctica band
  ]

  for (const land of lands) {
    ctx.save()
    ctx.translate(land.cx * size, land.cy * size)
    ctx.rotate(land.rot)
    const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, land.rx * size)
    grd.addColorStop(0, '#3d7a4a')
    grd.addColorStop(0.55, '#2f5d3a')
    grd.addColorStop(1, 'rgba(20, 60, 40, 0)')
    ctx.fillStyle = grd
    ctx.beginPath()
    ctx.ellipse(0, 0, land.rx * size, land.ry * size, 0, 0, Math.PI * 2)
    ctx.fill()
    ctx.restore()
  }

  // Ice caps
  const pole = ctx.createLinearGradient(0, 0, 0, size * 0.12)
  pole.addColorStop(0, 'rgba(220, 235, 255, 0.85)')
  pole.addColorStop(1, 'rgba(220, 235, 255, 0)')
  ctx.fillStyle = pole
  ctx.fillRect(0, 0, size, size * 0.12)
  const poleS = ctx.createLinearGradient(0, size, 0, size * 0.88)
  poleS.addColorStop(0, 'rgba(220, 235, 255, 0.9)')
  poleS.addColorStop(1, 'rgba(220, 235, 255, 0)')
  ctx.fillStyle = poleS
  ctx.fillRect(0, size * 0.88, size, size * 0.12)

  // City lights (subtle bright dots on land bands)
  for (let i = 0; i < 900; i++) {
    const x = Math.random() * size
    const y = size * (0.2 + Math.random() * 0.55)
    ctx.fillStyle = `rgba(255, 220, 140, ${0.08 + Math.random() * 0.2})`
    ctx.fillRect(x, y, 1.2, 1.2)
  }

  // Latitude / longitude grid (educational)
  ctx.strokeStyle = 'rgba(120, 180, 220, 0.12)'
  ctx.lineWidth = 1
  for (let i = 1; i < 12; i++) {
    const y = (i / 12) * size
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(size, y)
    ctx.stroke()
  }
  for (let i = 1; i < 24; i++) {
    const x = (i / 24) * size
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, size)
    ctx.stroke()
  }

  return canvas
}
