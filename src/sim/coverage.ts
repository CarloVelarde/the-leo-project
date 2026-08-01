import { EARTH_RADIUS_KM } from './constants'
import { oneWayLightTimeMs, semiMajorAxisKm } from './orbit'
import type { CoverageSnapshot, LabParams, SatelliteState } from './types'

/** Convert geodetic lat/lon (deg) to ECEF km on the Earth surface. */
export function userPositionKm(latDeg: number, lonDeg: number): [number, number, number] {
  const lat = (latDeg * Math.PI) / 180
  const lon = (lonDeg * Math.PI) / 180
  const cosLat = Math.cos(lat)
  return [
    EARTH_RADIUS_KM * cosLat * Math.cos(lon),
    EARTH_RADIUS_KM * cosLat * Math.sin(lon),
    EARTH_RADIUS_KM * Math.sin(lat),
  ]
}

function dot(a: readonly number[], b: readonly number[]): number {
  return a[0]! * b[0]! + a[1]! * b[1]! + a[2]! * b[2]!
}

function norm(v: readonly number[]): number {
  return Math.sqrt(dot(v, v))
}

/**
 * Elevation angle (deg) of a satellite as seen from the user.
 * Simplified spherical Earth geometry.
 */
export function elevationDeg(
  userKm: readonly [number, number, number],
  satKm: readonly [number, number, number],
): number {
  const los = [satKm[0] - userKm[0], satKm[1] - userKm[1], satKm[2] - userKm[2]] as const
  const losN = norm(los)
  const userN = norm(userKm)
  if (losN === 0 || userN === 0) return -90
  // local zenith ≈ user position unit vector
  const cosZenith = dot(userKm, los) / (userN * losN)
  const elev = 90 - (Math.acos(Math.min(1, Math.max(-1, cosZenith))) * 180) / Math.PI
  return elev
}

export function evaluateCoverage(
  params: LabParams,
  satellites: SatelliteState[],
): CoverageSnapshot {
  const user = userPositionKm(params.userLatDeg, params.userLonDeg)
  let bestId: string | null = null
  let bestElev = -Infinity
  let bestRange = Infinity
  let inView = 0

  for (const sat of satellites) {
    const elev = elevationDeg(user, sat.position)
    if (elev >= params.minElevationDeg) {
      inView += 1
      const range = norm([
        sat.position[0] - user[0],
        sat.position[1] - user[1],
        sat.position[2] - user[2],
      ])
      // Prefer highest elevation; tie-break nearer
      if (elev > bestElev || (elev === bestElev && range < bestRange)) {
        bestElev = elev
        bestRange = range
        bestId = sat.id
      }
    }
  }

  const online = bestId !== null
  return {
    satsInView: inView,
    servingSatId: bestId,
    oneWayLatencyMs: online ? oneWayLightTimeMs(bestRange) : null,
    online,
  }
}

/** Rough footprint half-angle (radians) on Earth for a min elevation mask. */
export function footprintHalfAngleRad(altitudeKm: number, minElevationDeg: number): number {
  const a = semiMajorAxisKm(altitudeKm)
  const el = (minElevationDeg * Math.PI) / 180
  // spherical Earth central angle η from nadir to edge of visibility
  const sinEta = (a / EARTH_RADIUS_KM) * Math.cos(el)
  if (sinEta >= 1) return Math.PI / 2
  const eta = Math.asin(sinEta) - el
  return Math.max(0, eta)
}
