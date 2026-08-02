import { afterEach, beforeEach, expect, vi } from 'vitest'
import { loadProgress, markModuleComplete, setLastModule } from '@/lib/progress'
import { createMemoryStorage, feature, scenario } from '@test/support'

feature('Learning progress', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createMemoryStorage())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  scenario('completing modules builds a resume path the learner can continue', () => {
    markModuleComplete('internet-foundations')
    markModuleComplete('geo-problem')
    setLastModule('leo-advantage')

    const state = loadProgress()
    expect(state.completedModuleIds).toEqual(['internet-foundations', 'geo-problem'])
    expect(state.lastModuleId).toBe('leo-advantage')
  })

  scenario('re-completing a module does not duplicate progress entries', () => {
    markModuleComplete('internet-foundations')
    markModuleComplete('internet-foundations')
    expect(loadProgress().completedModuleIds).toEqual(['internet-foundations'])
  })
})
