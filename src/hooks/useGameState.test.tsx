import { describe, it, expect, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import type { ReactNode } from 'react'
import { AlertProvider } from '../context/AlertContext'
import { useGameState } from './useGameState'
import { solution, unicodeSplit } from '../lib/words'

const wrapper = ({ children }: { children: ReactNode }) => (
  <AlertProvider>{children}</AlertProvider>
)

describe('useGameState', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('shakes the current row and does not submit a too-short guess', () => {
    const { result } = renderHook(() => useGameState(), { wrapper })

    act(() => {
      result.current.onChar('A')
    })
    act(() => {
      result.current.onEnter()
    })

    expect(result.current.isShaking).toBe(true)
    expect(result.current.guesses).toHaveLength(0)
  })

  it('submits the solution and marks the game as won', () => {
    const { result } = renderHook(() => useGameState(), { wrapper })

    for (const letter of unicodeSplit(solution)) {
      act(() => {
        result.current.onChar(letter)
      })
    }
    act(() => {
      result.current.onEnter()
    })

    expect(result.current.guesses).toEqual([solution])
    expect(result.current.isGameWon).toBe(true)
    expect(result.current.currentGuess).toBe('')
  })

  it('deleting a character removes the last grapheme', () => {
    const { result } = renderHook(() => useGameState(), { wrapper })

    act(() => {
      result.current.onChar('B')
    })
    act(() => {
      result.current.onChar('A')
    })
    act(() => {
      result.current.onDelete()
    })

    expect(result.current.currentGuess).toBe('B')
  })
})
