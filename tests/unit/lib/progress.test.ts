import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import {
  loadProgress,
  markModuleComplete,
  saveProgress,
  setLastModule,
  type ProgressState,
} from '@/lib/progress'
import { createMemoryStorage } from '@test/support'

describe('progress adapter (localStorage)', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', createMemoryStorage())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('starts empty when nothing is stored', () => {
    const state = loadProgress()
    expect(state.completedModuleIds).toEqual([])
    expect(state.lastModuleId).toBeNull()
    expect(state.updatedAt).toBeTruthy()
  })

  it('persists and reloads progress', () => {
    const next: ProgressState = {
      completedModuleIds: ['m1'],
      lastModuleId: 'm1',
      updatedAt: '2020-01-01T00:00:00.000Z',
    }
    saveProgress(next)
    const loaded = loadProgress()
    expect(loaded.completedModuleIds).toEqual(['m1'])
    expect(loaded.lastModuleId).toBe('m1')
    // saveProgress refreshes updatedAt
    expect(loaded.updatedAt).not.toBe('2020-01-01T00:00:00.000Z')
  })

  it('markModuleComplete appends once and sets last module', () => {
    let state = markModuleComplete('m1')
    expect(state.completedModuleIds).toEqual(['m1'])
    expect(state.lastModuleId).toBe('m1')

    state = markModuleComplete('m1')
    expect(state.completedModuleIds).toEqual(['m1'])

    state = markModuleComplete('m2')
    expect(state.completedModuleIds).toEqual(['m1', 'm2'])
    expect(state.lastModuleId).toBe('m2')
  })

  it('setLastModule does not clear completed modules', () => {
    markModuleComplete('m1')
    const state = setLastModule('m3')
    expect(state.completedModuleIds).toEqual(['m1'])
    expect(state.lastModuleId).toBe('m3')
  })

  it('recovers to empty state when storage holds invalid JSON', () => {
    localStorage.setItem('the-leo-project:progress:v1', '{not-json')
    const state = loadProgress()
    expect(state.completedModuleIds).toEqual([])
    expect(state.lastModuleId).toBeNull()
  })
})
