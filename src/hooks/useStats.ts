import { useState } from 'react'
import { addStatsForCompletedGame, loadStats } from '../lib/stats'

export const useStats = () => {
  const [stats, setStats] = useState(() => loadStats())

  const recordGame = (guessCount: number) => {
    setStats(addStatsForCompletedGame(stats, guessCount))
  }

  return { stats, recordGame }
}
