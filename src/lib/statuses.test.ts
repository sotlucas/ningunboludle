import { describe, it, expect, vi } from 'vitest'

vi.mock('./words', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./words')>()
  return { ...actual, solution: 'CACHA' }
})

const { getGuessStatuses, getStatuses } = await import('./statuses')

describe('getGuessStatuses', () => {
  it('marks correct, present and absent letters', () => {
    // solution: CACHA, guess: CHACO -> C correct, H present, A present, C present, O absent
    expect(getGuessStatuses('CHACO')).toEqual([
      'correct',
      'present',
      'present',
      'present',
      'absent',
    ])
  })

  it('does not over-count a duplicated guess letter beyond the solution occurrences', () => {
    // solution CACHA has two A's, both already matched at positions 1 and 4;
    // the extra A at position 2 must be absent, not present.
    expect(getGuessStatuses('CAAHA')).toEqual([
      'correct',
      'correct',
      'absent',
      'correct',
      'correct',
    ])
  })

  it('only marks as many duplicate letters as present as exist in the solution', () => {
    // solution CACHA has exactly two A's, both consumed by the two correct
    // matches at positions 1 and 4; the remaining A's in an all-A guess
    // must all be absent.
    expect(getGuessStatuses('AAAAA')).toEqual([
      'absent',
      'correct',
      'absent',
      'absent',
      'correct',
    ])
  })
})

describe('getStatuses', () => {
  it('aggregates per-letter keyboard status across guesses, correct beating present/absent', () => {
    const statuses = getStatuses(['CHACO'])
    expect(statuses['C']).toBe('correct')
    expect(statuses['H']).toBe('present')
    expect(statuses['A']).toBe('present')
    expect(statuses['O']).toBe('absent')
  })
})
