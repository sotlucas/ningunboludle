import { useState } from 'react'
import { addStatsForCompletedGame, loadStats } from '../lib/stats'
import { recordPlayedToday } from '../lib/globalStreak'

export const useStats = () => {
  const [stats, setStats] = useState(() => loadStats())

  const recordGame = (guessCount: number) => {
    recordPlayedToday()
    setStats(addStatsForCompletedGame(stats, guessCount))
  }

  return { stats, recordGame }
}
