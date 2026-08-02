import type { SatelliteState } from '@/sim/types'

/** Minimal satellite for coverage / geometry tests (ids + ECI km position). */
export function sat(
  id: string,
  position: readonly [number, number, number],
  meta: Partial<Pick<SatelliteState, 'planeIndex' | 'indexInPlane'>> = {},
): SatelliteState {
  return {
    id,
    planeIndex: meta.planeIndex ?? 0,
    indexInPlane: meta.indexInPlane ?? 0,
    position,
  }
}
