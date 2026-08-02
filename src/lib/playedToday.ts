import { loadGameStateFromLocalStorage } from './localStorage'
import { solution } from './words'
import { MAX_CHALLENGES } from '../constants/settings'

export const isBoludleCompletedToday = () => {
  const loaded = loadGameStateFromLocalStorage()
  if (loaded?.solution !== solution) return false
  return (
    loaded.guesses.includes(solution) ||
    loaded.guesses.length === MAX_CHALLENGES
  )
}
