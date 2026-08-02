import { DEFAULT_LAB_PARAMS } from '@/sim/constants'
import type { LabParams } from '@/sim/types'

/** Build lab params from defaults + overrides (tests never mutate shared defaults). */
export function labParams(overrides: Partial<LabParams> = {}): LabParams {
  return { ...DEFAULT_LAB_PARAMS, ...overrides }
}

/** Pedagogical LEO shell used often in docs and demos. */
export const LEO_SHELL_550 = labParams({
  altitudeKm: 550,
  inclinationDeg: 53,
  planes: 12,
  satsPerPlane: 20,
})

/** GEO altitude for contrast scenarios (still circular-Kepler model). */
export const GEO_LIKE = labParams({
  altitudeKm: 35_786,
  inclinationDeg: 0,
  planes: 1,
  satsPerPlane: 3,
  minElevationDeg: 10,
})
