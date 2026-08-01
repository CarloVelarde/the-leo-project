import { DEFAULT_LAB_PARAMS } from './constants'
import type { LabParams } from './types'

export type Scenario = {
  id: string
  title: string
  description: string
  params: LabParams
}

export const SCENARIOS: Scenario[] = [
  {
    id: 'sparse',
    title: 'Sparse constellation',
    description: 'Few satellites — expect coverage gaps and long offline stretches.',
    params: {
      ...DEFAULT_LAB_PARAMS,
      planes: 4,
      satsPerPlane: 6,
      altitudeKm: 550,
    },
  },
  {
    id: 'dense',
    title: 'Dense LEO shell',
    description: 'Many planes and sats — continuous service with frequent handoffs.',
    params: {
      ...DEFAULT_LAB_PARAMS,
      planes: 24,
      satsPerPlane: 40,
      altitudeKm: 550,
    },
  },
  {
    id: 'high-altitude',
    title: 'Higher altitude',
    description: 'Larger footprints and longer period — latency rises with altitude.',
    params: {
      ...DEFAULT_LAB_PARAMS,
      planes: 12,
      satsPerPlane: 20,
      altitudeKm: 1100,
    },
  },
  {
    id: 'high-latitude',
    title: 'High-latitude user',
    description: 'User near 70°N — inclination and plane design matter more.',
    params: {
      ...DEFAULT_LAB_PARAMS,
      userLatDeg: 70,
      userLonDeg: 25,
      inclinationDeg: 70,
    },
  },
  {
    id: 'default',
    title: 'Default lab',
    description: 'Balanced pedagogical starting point (~mid-latitude user).',
    params: { ...DEFAULT_LAB_PARAMS },
  },
]

export function getScenario(id: string): Scenario | undefined {
  return SCENARIOS.find((s) => s.id === id)
}
