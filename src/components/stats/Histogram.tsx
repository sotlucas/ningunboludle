import type { GameStats } from '../../lib/localStorage'
import { Progress } from './Progress'

type Props = {
  gameStats: GameStats
  lastGuessCount?: number
}

export const Histogram = ({ gameStats, lastGuessCount }: Props) => {
  const winDistribution = gameStats.winDistribution
  const maxValue = Math.max(...winDistribution, 1)

  return (
    <div className="flex flex-col gap-1.5">
      {winDistribution.map((value, i) => (
        <Progress
          key={i}
          index={i}
          percent={(value / maxValue) * 100}
          label={String(value)}
          isHighlighted={lastGuessCount === i + 1}
        />
      ))}
    </div>
  )
}
