import { describe, it, expect } from 'vitest'
import { getWordOfDay, isWordInWordList, unicodeSplit, unicodeLength } from './words'
import { WORDS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'

describe('getWordOfDay', () => {
  const epochMs = new Date('February 14, 2022 00:00:00').valueOf()
  const originalNow = Date.now

  const withMockedNow = (ms: number, run: () => void) => {
    Date.now = () => ms
    try {
      run()
    } finally {
      Date.now = originalNow
    }
  }

  it('picks WORDS[0] on the epoch day', () => {
    withMockedNow(epochMs + 12 * 60 * 60 * 1000, () => {
      const day = getWordOfDay()
      expect(day.solutionIndex).toBe(0)
      expect(day.solution).toBe(WORDS[0].toUpperCase())
    })
  })

  it('advances to the next word on the following day', () => {
    withMockedNow(epochMs + 86400000 + 12 * 60 * 60 * 1000, () => {
      const day = getWordOfDay()
      expect(day.solutionIndex).toBe(1)
      expect(day.solution).toBe(WORDS[1].toUpperCase())
    })
  })

  it('cycles back to WORDS[0] after WORDS.length days', () => {
    withMockedNow(
      epochMs + WORDS.length * 86400000 + 12 * 60 * 60 * 1000,
      () => {
        const day = getWordOfDay()
        expect(day.solutionIndex).toBe(WORDS.length)
        expect(day.solution).toBe(WORDS[0].toUpperCase())
      }
    )
  })
})

describe('isWordInWordList', () => {
  it('accepts words from both the solution pool and the extended valid-guess list', () => {
    expect(isWordInWordList(WORDS[0])).toBe(true)
    expect(isWordInWordList(VALID_GUESSES[0])).toBe(true)
  })

  it('rejects words outside both lists', () => {
    expect(isWordInWordList('zzzzz')).toBe(false)
  })
})

describe('unicodeSplit / unicodeLength', () => {
  it('treats ñ and accented letters as a single grapheme', () => {
    expect(unicodeSplit('BAÑO')).toEqual(['B', 'A', 'Ñ', 'O'])
    expect(unicodeLength('BAÑO')).toBe(4)
    expect(unicodeLength('café')).toBe(4)
  })
})
