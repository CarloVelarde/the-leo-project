/**
 * Tracks serving-satellite handoffs over simulation time.
 * Pure TS — no React / WebGL.
 */
export class HandoffTracker {
  private lastServingId: string | null = null
  private handoffCount = 0
  private initialized = false
  private windowStartSimSec = 0
  private windowHandoffs = 0

  reset(simTimeSeconds = 0): void {
    this.lastServingId = null
    this.handoffCount = 0
    this.initialized = false
    this.windowStartSimSec = simTimeSeconds
    this.windowHandoffs = 0
  }

  /**
   * Observe current serving sat. Counts a handoff when the id changes
   * after the first observation (including online→offline→online).
   */
  observe(servingSatId: string | null, simTimeSeconds: number): void {
    if (!this.initialized) {
      this.lastServingId = servingSatId
      this.initialized = true
      this.windowStartSimSec = simTimeSeconds
      return
    }

    if (servingSatId !== this.lastServingId) {
      // Count satellite-to-satellite switches and reconnects after outage.
      if (servingSatId !== null || this.lastServingId !== null) {
        // Prefer counting only when we gain/switch a serving sat (not pure drop).
        if (servingSatId !== null && servingSatId !== this.lastServingId) {
          this.handoffCount += 1
          this.windowHandoffs += 1
        }
      }
      this.lastServingId = servingSatId
    }
  }

  get count(): number {
    return this.handoffCount
  }

  /** Handoffs per sim-minute over the tracking window (null if < 30s sim). */
  ratePerSimMinute(simTimeSeconds: number): number | null {
    const elapsed = simTimeSeconds - this.windowStartSimSec
    if (elapsed < 30) return null
    return (this.windowHandoffs / elapsed) * 60
  }
}
