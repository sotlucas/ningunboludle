import { describe, it, expect, beforeEach } from 'vitest'
import { addStatsForCompletedGame } from './stats'
import type { GameStats } from './localStorage'

const emptyStats = (): GameStats => ({
  winDistribution: [0, 0, 0, 0, 0, 0],
  gamesFailed: 0,
  currentStreak: 0,
  bestStreak: 0,
  totalGames: 0,
  successRate: 0,
})

beforeEach(() => {
  localStorage.clear()
})

describe('addStatsForCompletedGame', () => {
  it('records a win, bumping the distribution bucket and the streak', () => {
    // count === 0 means the game was won on the very first guess
    const stats = addStatsForCompletedGame(emptyStats(), 0)

    expect(stats.totalGames).toBe(1)
    expect(stats.gamesFailed).toBe(0)
    expect(stats.winDistribution).toEqual([1, 0, 0, 0, 0, 0])
    expect(stats.currentStreak).toBe(1)
    expect(stats.bestStreak).toBe(1)
    expect(stats.successRate).toBe(100)
  })

  it('records a loss (count >= MAX_CHALLENGES), resetting the current streak', () => {
    const afterWin = addStatsForCompletedGame(emptyStats(), 0)
    const afterLoss = addStatsForCompletedGame(afterWin, 6)

    expect(afterLoss.totalGames).toBe(2)
    expect(afterLoss.gamesFailed).toBe(1)
    expect(afterLoss.currentStreak).toBe(0)
    expect(afterLoss.bestStreak).toBe(1)
    expect(afterLoss.successRate).toBe(50)
  })

  it('keeps the best streak when the current streak drops', () => {
    let stats = emptyStats()
    stats = addStatsForCompletedGame(stats, 0)
    stats = addStatsForCompletedGame(stats, 1)
    stats = addStatsForCompletedGame(stats, 2)
    expect(stats.currentStreak).toBe(3)
    expect(stats.bestStreak).toBe(3)

    stats = addStatsForCompletedGame(stats, 6)
    expect(stats.currentStreak).toBe(0)
    expect(stats.bestStreak).toBe(3)
  })
})
