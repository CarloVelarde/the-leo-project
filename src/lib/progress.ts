/**
 * Local learning progress.
 * v1: localStorage only. Designed so a future backend can swap the adapter.
 */

const STORAGE_KEY = 'the-leo-project:progress:v1'

export type ProgressState = {
  completedModuleIds: string[]
  lastModuleId: string | null
  updatedAt: string
}

const emptyProgress = (): ProgressState => ({
  completedModuleIds: [],
  lastModuleId: null,
  updatedAt: new Date().toISOString(),
})

export function loadProgress(): ProgressState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyProgress()
    return { ...emptyProgress(), ...JSON.parse(raw) } as ProgressState
  } catch {
    return emptyProgress()
  }
}

export function saveProgress(state: ProgressState): void {
  const next = { ...state, updatedAt: new Date().toISOString() }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}

export function markModuleComplete(moduleId: string): ProgressState {
  const current = loadProgress()
  const completedModuleIds = current.completedModuleIds.includes(moduleId)
    ? current.completedModuleIds
    : [...current.completedModuleIds, moduleId]
  const next: ProgressState = {
    ...current,
    completedModuleIds,
    lastModuleId: moduleId,
  }
  saveProgress(next)
  return next
}

export function setLastModule(moduleId: string): ProgressState {
  const next: ProgressState = {
    ...loadProgress(),
    lastModuleId: moduleId,
  }
  saveProgress(next)
  return next
}
