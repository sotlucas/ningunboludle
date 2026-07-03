import type { GameStats } from '../../lib/localStorage'
import {
  TOTAL_TRIES_TEXT,
  SUCCESS_RATE_TEXT,
  CURRENT_STREAK_TEXT,
  BEST_STREAK_TEXT,
} from '../../constants/strings'

type Props = {
  gameStats: GameStats
}

const StatItem = ({
  label,
  value,
}: {
  label: string
  value: string | number
}) => {
  return (
    <div className="flex w-1/4 flex-col items-center justify-center gap-0.5 text-center">
      <div className="font-mono text-2xl font-medium text-ink">{value}</div>
      <div className="text-[11px] uppercase tracking-wide text-ink-muted">
        {label}
      </div>
    </div>
  )
}

export const StatBar = ({ gameStats }: Props) => {
  return (
    <div className="flex justify-center gap-2 rounded-2xl border border-border-soft bg-surface py-4">
      <StatItem label={TOTAL_TRIES_TEXT} value={gameStats.totalGames} />
      <StatItem
        label={SUCCESS_RATE_TEXT}
        value={`${gameStats.successRate}%`}
      />
      <StatItem label={CURRENT_STREAK_TEXT} value={gameStats.currentStreak} />
      <StatItem label={BEST_STREAK_TEXT} value={gameStats.bestStreak} />
    </div>
  )
}
