import { StatBar } from '../stats/StatBar'
import { Histogram } from '../stats/Histogram'
import type { GameStats } from '../../lib/localStorage'
import { BaseModal } from './BaseModal'
import { DefinitionReveal } from './DefinitionReveal'
import { CountdownToNextWord } from './CountdownToNextWord'
import { ShareButton } from './ShareButton'
import { STATISTICS_TITLE, GUESS_DISTRIBUTION_TEXT } from '../../constants/strings'

type Props = {
  isOpen: boolean
  handleClose: () => void
  guesses: string[]
  gameStats: GameStats
  isGameLost: boolean
  isGameWon: boolean
  handleShareToClipboard: () => void
}

export const StatsModal = ({
  isOpen,
  handleClose,
  guesses,
  gameStats,
  isGameLost,
  isGameWon,
  handleShareToClipboard,
}: Props) => {
  const isGameOver = isGameLost || isGameWon

  return (
    <BaseModal
      title={isGameOver ? '' : STATISTICS_TITLE}
      isOpen={isOpen}
      handleClose={handleClose}
    >
      <div className="flex flex-col gap-5">
        {isGameOver && (
          <>
            <DefinitionReveal />
            <div className="flex items-center justify-between gap-3">
              <CountdownToNextWord />
            </div>
            <ShareButton
              guesses={guesses}
              isGameLost={isGameLost}
              onShared={handleShareToClipboard}
            />
          </>
        )}

        <div>
          {isGameOver && (
            <h4 className="mb-2 text-center font-display text-lg font-bold text-ink">
              {STATISTICS_TITLE}
            </h4>
          )}
          <StatBar gameStats={gameStats} />
        </div>

        {gameStats.totalGames > 0 && (
          <div>
            <h4 className="mb-2 text-center text-xs font-semibold uppercase tracking-wide text-ink-muted">
              {GUESS_DISTRIBUTION_TEXT}
            </h4>
            <Histogram
              gameStats={gameStats}
              lastGuessCount={isGameWon ? guesses.length : undefined}
            />
          </div>
        )}

        <div className="text-center text-xs text-ink-muted">
          mandanos sugerencias via{' '}
          <a
            href="https://twitter.com/boludle"
            className="font-medium text-accent underline"
          >
            Twitter
          </a>{' '}
          o via{' '}
          <a
            href="mailto:info@boludle.com"
            className="font-medium text-accent underline"
          >
            mail
          </a>
        </div>
      </div>
    </BaseModal>
  )
}
