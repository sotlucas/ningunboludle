import { describe, it, expect } from 'vitest'
import { canContinueStreak } from './date'

// 2026-07-31 = Friday, 2026-08-01 = Saturday, 2026-08-02 = Sunday,
// 2026-08-03 = Monday, 2026-07-30 = Thursday

describe('canContinueStreak', () => {
  it('continues for consecutive days', () => {
    expect(canContinueStreak('2026-07-30', '2026-07-31')).toBe(true)
  })

  it('continues when skipping only weekend days (Friday -> Monday)', () => {
    expect(canContinueStreak('2026-07-31', '2026-08-03')).toBe(true)
  })

  it('breaks when a weekday is skipped (Thursday -> Monday)', () => {
    expect(canContinueStreak('2026-07-30', '2026-08-03')).toBe(false)
  })

  it('continues across a single weekend day (Saturday -> Sunday)', () => {
    expect(canContinueStreak('2026-08-01', '2026-08-02')).toBe(true)
  })
})
