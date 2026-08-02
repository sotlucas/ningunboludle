import { loadGameStateFromLocalStorage } from './localStorage'
import { getPuzzleNumber } from './share'

export const isBoluxionesCompletedToday = () => {
  const loaded = loadGameStateFromLocalStorage()
  if (loaded?.puzzleNumber !== getPuzzleNumber()) return false
  const correct = loaded.attempts.filter((attempt) => attempt.correct).length
  const incorrect = loaded.attempts.length - correct
  return correct === 4 || incorrect === 4
}
