import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('./words', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./words')>()
  return { ...actual, solution: 'CACHA', solutionIndex: 42 }
})

const { generateEmojiGrid, shareStatus } = await import('./share')

describe('generateEmojiGrid', () => {
  it('maps correct/present/absent statuses to the right tiles', () => {
    const grid = generateEmojiGrid(['CAAHA'], ['🟩', '🟨', '⬜'])
    // solution CACHA vs guess CAAHA -> correct,correct,absent,correct,correct
    expect(grid).toBe('🟩🟩⬜🟩🟩')
  })

  it('joins multiple guess rows with newlines', () => {
    const grid = generateEmojiGrid(['CAAHA', 'CACHA'], ['🟩', '🟨', '⬜'])
    expect(grid.split('\n')).toHaveLength(2)
    expect(grid.split('\n')[1]).toBe('🟩🟩🟩🟩🟩')
  })
})

describe('shareStatus', () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn() } })
  })

  it('copies the day index, result and emoji grid to the clipboard', () => {
    const onShared = vi.fn()
    shareStatus(['CACHA'], false, false, false, false, onShared)

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'boludle.sotlucas.dev #42 1/6\n\n🟩🟩🟩🟩🟩\n\n#boludle'
    )
    expect(onShared).toHaveBeenCalledTimes(1)
  })

  it('marks a loss with an X instead of the guess count', () => {
    shareStatus(['CAAHA'], true, false, false, false, vi.fn())

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      'boludle.sotlucas.dev #42 X/6\n\n🟩🟩⬜🟩🟩\n\n#boludle'
    )
  })
})
