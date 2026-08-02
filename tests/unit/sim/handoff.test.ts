import { describe, expect, it } from 'vitest'
import { HandoffTracker } from '@/sim/handoff'

describe('HandoffTracker', () => {
  it('does not count the first observation as a handoff', () => {
    const tracker = new HandoffTracker()
    tracker.observe('p0-s0', 0)
    expect(tracker.count).toBe(0)
  })

  it('counts a switch from one serving sat to another', () => {
    const tracker = new HandoffTracker()
    tracker.observe('a', 0)
    tracker.observe('b', 10)
    expect(tracker.count).toBe(1)
  })

  it('does not count a pure drop offline (serving → null)', () => {
    const tracker = new HandoffTracker()
    tracker.observe('a', 0)
    tracker.observe(null, 5)
    expect(tracker.count).toBe(0)
  })

  it('counts reconnect after outage (null → sat)', () => {
    const tracker = new HandoffTracker()
    tracker.observe('a', 0)
    tracker.observe(null, 5)
    tracker.observe('b', 10)
    expect(tracker.count).toBe(1)
  })

  it('ignores repeated observations of the same serving sat', () => {
    const tracker = new HandoffTracker()
    tracker.observe('a', 0)
    tracker.observe('a', 1)
    tracker.observe('a', 2)
    expect(tracker.count).toBe(0)
  })

  it('returns null rate until 30 sim-seconds have elapsed', () => {
    const tracker = new HandoffTracker()
    tracker.observe('a', 0)
    tracker.observe('b', 10)
    expect(tracker.ratePerSimMinute(20)).toBeNull()
    expect(tracker.ratePerSimMinute(30)).not.toBeNull()
  })

  it('reports handoffs per sim-minute over the window', () => {
    const tracker = new HandoffTracker()
    tracker.observe('a', 0)
    tracker.observe('b', 15)
    tracker.observe('c', 30)
    // 2 handoffs in 60s → 2 per sim-minute
    tracker.observe('c', 60)
    expect(tracker.count).toBe(2)
    expect(tracker.ratePerSimMinute(60)).toBeCloseTo(2, 5)
  })

  it('reset clears counts and re-arms first observation', () => {
    const tracker = new HandoffTracker()
    tracker.observe('a', 0)
    tracker.observe('b', 5)
    expect(tracker.count).toBe(1)

    tracker.reset(100)
    expect(tracker.count).toBe(0)
    tracker.observe('c', 100)
    expect(tracker.count).toBe(0)
    tracker.observe('d', 110)
    expect(tracker.count).toBe(1)
  })
})
