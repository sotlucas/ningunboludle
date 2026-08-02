import type { Attempt } from './useGameState'
import type { GameStats } from '../../lib/localStorage'

const gameStateKey = 'boluxiones-gameState'
const gameStatsKey = 'boluxiones-gameStats'

type StoredGameState = {
  puzzleNumber: number
  attempts: Attempt[]
}

export const saveGameStateToLocalStorage = (gameState: StoredGameState) => {
  localStorage.setItem(gameStateKey, JSON.stringify(gameState))
}

export const loadGameStateFromLocalStorage = () => {
  const state = localStorage.getItem(gameStateKey)
  return state ? (JSON.parse(state) as StoredGameState) : null
}

export const saveStatsToLocalStorage = (gameStats: GameStats) => {
  localStorage.setItem(gameStatsKey, JSON.stringify(gameStats))
}

export const loadStatsFromLocalStorage = () => {
  const stats = localStorage.getItem(gameStatsKey)
  return stats ? (JSON.parse(stats) as GameStats) : null
}
