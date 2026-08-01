/** Shared types for the constellation simulation model (no WebGL). */

export type LabParams = {
  /** Number of orbital planes */
  planes: number
  /** Satellites per orbital plane */
  satsPerPlane: number
  /** Orbital altitude above Earth surface (km) */
  altitudeKm: number
  /** Orbital inclination (degrees) */
  inclinationDeg: number
  /** Minimum elevation for service (degrees) */
  minElevationDeg: number
  /** Ground user latitude (degrees) */
  userLatDeg: number
  /** Ground user longitude (degrees) */
  userLonDeg: number
  /** Simulation speed multiplier */
  timeScale: number
}

export type SatelliteState = {
  id: string
  planeIndex: number
  indexInPlane: number
  /** ECEF-like unit sphere position scaled later in renderer */
  position: readonly [number, number, number]
}

export type CoverageSnapshot = {
  satsInView: number
  servingSatId: string | null
  /** One-way free-space light time to serving sat (ms), if any */
  oneWayLatencyMs: number | null
  online: boolean
}

export type SimInsights = {
  orbitalPeriodMin: number
  orbitalSpeedKms: number
  totalSatellites: number
  coverage: CoverageSnapshot
}
