/**
 * Independent geometry helpers for verifying the lab model
 * (not imported from app code under test).
 */

/** Unit orbital plane normal for RAAN Ω and inclination i (radians). */
export function orbitalPlaneNormal(raanRad: number, inclinationRad: number): [number, number, number] {
  const sinO = Math.sin(raanRad)
  const cosO = Math.cos(raanRad)
  const sinI = Math.sin(inclinationRad)
  const cosI = Math.cos(inclinationRad)
  // Angular-momentum direction ĥ for classical elements
  return [sinO * sinI, -cosO * sinI, cosI]
}

export function dot3(a: readonly number[], b: readonly number[]): number {
  return (a[0] ?? 0) * (b[0] ?? 0) + (a[1] ?? 0) * (b[1] ?? 0) + (a[2] ?? 0) * (b[2] ?? 0)
}

/** Earth-central angle (rad) between two position vectors. */
export function centralAngleRad(
  a: readonly [number, number, number],
  b: readonly [number, number, number],
): number {
  const na = Math.hypot(a[0], a[1], a[2]) || 1
  const nb = Math.hypot(b[0], b[1], b[2]) || 1
  const c = Math.min(1, Math.max(-1, dot3(a, b) / (na * nb)))
  return Math.acos(c)
}

/**
 * Independent elevation (deg) from spherical-Earth geometry:
 * elev = 90° − zenith angle of LOS from local vertical.
 */
export function independentElevationDeg(
  userKm: readonly [number, number, number],
  satKm: readonly [number, number, number],
): number {
  const los = [satKm[0] - userKm[0], satKm[1] - userKm[1], satKm[2] - userKm[2]] as const
  const losN = Math.hypot(los[0], los[1], los[2])
  const userN = Math.hypot(userKm[0], userKm[1], userKm[2])
  if (losN === 0 || userN === 0) return -90
  const cosZenith = Math.min(1, Math.max(-1, dot3(userKm, los) / (userN * losN)))
  return 90 - (Math.acos(cosZenith) * 180) / Math.PI
}

/**
 * Earth-central angle λ from SSP to min-elevation contour:
 * λ = arccos((R/a) cos ε) − ε
 */
export function independentFootprintHalfAngleRad(
  earthRadiusKm: number,
  semiMajorKm: number,
  minElevationDeg: number,
): number {
  const el = (minElevationDeg * Math.PI) / 180
  const arg = (earthRadiusKm / semiMajorKm) * Math.cos(el)
  if (arg >= 1) return 0
  if (arg <= -1) return Math.PI
  return Math.max(0, Math.acos(arg) - el)
}
