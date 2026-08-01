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
  /** Position in km (ECI-like frame used by the lab). */
  position: readonly [number, number, number]
}

export type CoverageSnapshot = {
  satsInView: number
  servingSatId: string | null
  /** One-way free-space light time to serving sat (ms), if any */
  oneWayLatencyMs: number | null
  online: boolean
  /** Elevation of serving satellite (deg), if online */
  servingElevationDeg: number | null
  /** Slant range to serving satellite (km), if online */
  rangeKm: number | null
  /** Serving sat position (km), if online */
  servingPositionKm: readonly [number, number, number] | null
  /** IDs of satellites currently above min elevation */
  inViewIds: readonly string[]
}

export type SimInsights = {
  orbitalPeriodMin: number
  orbitalSpeedKms: number
  totalSatellites: number
  coverage: CoverageSnapshot
}

/** Frame-level stats pushed from the 3D lab to the UI. */
export type LiveSimStats = SimInsights & {
  simTimeSeconds: number
  handoffCount: number
  /** Estimated handoffs per sim-minute (null until enough time/history). */
  handoffsPerSimMinute: number | null
  paused: boolean
  /** True for a short window after a serving-sat switch */
  handoffFlash: boolean
}

export type SceneDisplayOptions = {
  showOrbitRings: boolean
  showFootprint: boolean
  showLink: boolean
  showInViewHighlight: boolean
  showGroundTrack: boolean
}

/** Camera framing mode for the lab. */
export type CameraMode = 'free' | 'user' | 'serving'

/** Mutable focus snapshot written each frame for camera rigs / overlays. */
export type SimFocusState = {
  userUnit: [number, number, number]
  servingUnit: [number, number, number] | null
  handoffFlash: number
  simTimeSeconds: number
}
