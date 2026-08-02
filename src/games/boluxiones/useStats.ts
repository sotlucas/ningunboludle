import { useState } from 'react'
import { addStatsForCompletedGame, loadStats } from './stats'
import { recordPlayedToday } from '../../lib/globalStreak'

export const useStats = () => {
  const [stats, setStats] = useState(() => loadStats())

  const recordGame = (won: boolean, numberOfIncorrectAttempts: number) => {
    recordPlayedToday()
    setStats((prev) =>
      addStatsForCompletedGame(prev, won, numberOfIncorrectAttempts),
    )
  }

  return { stats, recordGame }
}
