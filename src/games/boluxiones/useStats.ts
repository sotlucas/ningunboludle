import { useState } from 'react'
import { addStatsForCompletedGame, loadStats } from './stats'

export const useStats = () => {
  const [stats, setStats] = useState(() => loadStats())

  const recordGame = (won: boolean, numberOfIncorrectAttempts: number) => {
    setStats((prev) =>
      addStatsForCompletedGame(prev, won, numberOfIncorrectAttempts)
    )
  }

  return { stats, recordGame }
}
