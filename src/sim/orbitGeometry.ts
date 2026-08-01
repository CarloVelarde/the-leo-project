import { EARTH_RADIUS_KM } from './constants'
import { semiMajorAxisKm } from './orbit'

/** Sample a circular orbital plane as ECI km positions. */
export function sampleOrbitRingKm(
  altitudeKm: number,
  inclinationDeg: number,
  raanRad: number,
  samples = 96,
): [number, number, number][] {
  const a = semiMajorAxisKm(altitudeKm)
  const inc = (inclinationDeg * Math.PI) / 180
  const cosR = Math.cos(raanRad)
  const sinR = Math.sin(raanRad)
  const cosI = Math.cos(inc)
  const sinI = Math.sin(inc)
  const pts: [number, number, number][] = []

  for (let i = 0; i < samples; i++) {
    const u = (2 * Math.PI * i) / samples
    const cosU = Math.cos(u)
    const sinU = Math.sin(u)
    const x = a * (cosR * cosU - sinR * sinU * cosI)
    const y = a * (sinR * cosU + cosR * sinU * cosI)
    const z = a * (sinU * sinI)
    pts.push([x, y, z])
  }
  return pts
}

/**
 * Build a closed loop of points on the unit Earth sphere forming the
 * geometric coverage footprint of a satellite (circle of central angle ψ).
 */
export function sampleFootprintOnUnitSphere(
  satKm: readonly [number, number, number],
  halfAngleRad: number,
  samples = 64,
): [number, number, number][] {
  const n = Math.hypot(satKm[0], satKm[1], satKm[2]) || 1
  const nx = satKm[0] / n
  const ny = satKm[1] / n
  const nz = satKm[2] / n

  // Orthonormal basis with n as axis
  const tmp: [number, number, number] = Math.abs(nz) < 0.9 ? [0, 0, 1] : [0, 1, 0]
  let exx = tmp[1] * nz - tmp[2] * ny
  let exy = tmp[2] * nx - tmp[0] * nz
  let exz = tmp[0] * ny - tmp[1] * nx
  const exN = Math.hypot(exx, exy, exz) || 1
  exx /= exN
  exy /= exN
  exz /= exN
  const eyx = ny * exz - nz * exy
  const eyy = nz * exx - nx * exz
  const eyz = nx * exy - ny * exx

  const cosA = Math.cos(halfAngleRad)
  const sinA = Math.sin(halfAngleRad)
  const pts: [number, number, number][] = []
  // Slightly above surface to avoid z-fighting
  const r = 1.004

  for (let i = 0; i <= samples; i++) {
    const t = (2 * Math.PI * i) / samples
    const ct = Math.cos(t)
    const st = Math.sin(t)
    const x = r * (nx * cosA + sinA * (exx * ct + eyx * st))
    const y = r * (ny * cosA + sinA * (exy * ct + eyy * st))
    const z = r * (nz * cosA + sinA * (exz * ct + eyz * st))
    pts.push([x, y, z])
  }
  return pts
}

export function kmToUnit(positionKm: readonly [number, number, number]): [number, number, number] {
  const s = 1 / EARTH_RADIUS_KM
  return [positionKm[0] * s, positionKm[1] * s, positionKm[2] * s]
}

/**
 * Filled footprint disc: center (sub-sat) + ring samples on unit sphere.
 * Returns positions (float3) and triangle indices for a Mesh.
 */
export function buildFootprintDisc(
  satKm: readonly [number, number, number],
  halfAngleRad: number,
  samples = 64,
  radiusScale = 1.003,
): { positions: Float32Array; indices: Uint16Array } {
  const n = Math.hypot(satKm[0], satKm[1], satKm[2]) || 1
  const nx = satKm[0] / n
  const ny = satKm[1] / n
  const nz = satKm[2] / n

  const tmp: [number, number, number] = Math.abs(nz) < 0.9 ? [0, 0, 1] : [0, 1, 0]
  let exx = tmp[1] * nz - tmp[2] * ny
  let exy = tmp[2] * nx - tmp[0] * nz
  let exz = tmp[0] * ny - tmp[1] * nx
  const exN = Math.hypot(exx, exy, exz) || 1
  exx /= exN
  exy /= exN
  exz /= exN
  const eyx = ny * exz - nz * exy
  const eyy = nz * exx - nx * exz
  const eyz = nx * exy - ny * exx

  const cosA = Math.cos(halfAngleRad)
  const sinA = Math.sin(halfAngleRad)
  const vertexCount = samples + 1
  const positions = new Float32Array(vertexCount * 3)

  // Center slightly above surface along nadir
  positions[0] = nx * radiusScale
  positions[1] = ny * radiusScale
  positions[2] = nz * radiusScale

  for (let i = 0; i < samples; i++) {
    const t = (2 * Math.PI * i) / samples
    const ct = Math.cos(t)
    const st = Math.sin(t)
    const x = radiusScale * (nx * cosA + sinA * (exx * ct + eyx * st))
    const y = radiusScale * (ny * cosA + sinA * (exy * ct + eyy * st))
    const z = radiusScale * (nz * cosA + sinA * (exz * ct + eyz * st))
    const o = (i + 1) * 3
    positions[o] = x
    positions[o + 1] = y
    positions[o + 2] = z
  }

  const indices = new Uint16Array(samples * 3)
  for (let i = 0; i < samples; i++) {
    const a = 0
    const b = 1 + i
    const c = 1 + ((i + 1) % samples)
    const o = i * 3
    indices[o] = a
    indices[o + 1] = b
    indices[o + 2] = c
  }

  return { positions, indices }
}

/** Project a sat position to a ground-track point slightly above the unit sphere. */
export function groundTrackPoint(
  satKm: readonly [number, number, number],
  height = 1.006,
): [number, number, number] {
  const n = Math.hypot(satKm[0], satKm[1], satKm[2]) || 1
  return [(satKm[0] / n) * height, (satKm[1] / n) * height, (satKm[2] / n) * height]
}
