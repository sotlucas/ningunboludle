import { useEffect, useState } from 'react'
import { Grid } from './components/grid/Grid'
import { Keyboard } from './components/keyboard/Keyboard'
import { InfoModal } from './components/modals/InfoModal'
import { StatsModal } from './components/modals/StatsModal'
import { GAME_COPIED_MESSAGE } from './constants/strings'
import { WELCOME_INFO_MODAL_MS } from './constants/settings'
import { loadGameStateFromLocalStorage } from './lib/localStorage'
import { AlertContainer } from './components/alerts/AlertContainer'
import { useAlert } from './context/AlertContext'
import { Navbar } from './components/navbar/Navbar'
import { useGameState } from './hooks/useGameState'
import { usePageMeta } from './hooks/usePageMeta'
import { GAMES } from './constants/games'
import { GameLoadingScreen } from './components/GameLoadingScreen'

const boludleMeta = GAMES.find((game) => game.slug === 'boludle')!
const SIMULATED_LOADING_MS = 900

function GamePage() {
  usePageMeta({
    title: boludleMeta.tabTitle,
    description: boludleMeta.tabDescription,
    icon: boludleMeta.icon,
    url: `https://boludle.sotlucas.dev${boludleMeta.path}`,
  })

  const { showSuccess: showSuccessAlert } = useAlert()
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false)
  // captured synchronously on first render, before useGameState's own
  // effect has a chance to persist the (possibly empty) game state
  const [hadSavedGameOnMount] = useState(() => !!loadGameStateFromLocalStorage())
  const [showLoading, setShowLoading] = useState(true)
  const [simulatedReady, setSimulatedReady] = useState(false)

  const {
    guesses,
    currentGuess,
    isGameWon,
    isGameLost,
    isRevealing,
    isShaking,
    stats,
    onChar,
    onDelete,
    onEnter,
  } = useGameState(() => setIsStatsModalOpen(true))

  useEffect(() => {
    if (!hadSavedGameOnMount) {
      setTimeout(() => {
        setIsInfoModalOpen(true)
      }, WELCOME_INFO_MODAL_MS)
    }
  }, [hadSavedGameOnMount])

  useEffect(() => {
    const timeout = setTimeout(() => setSimulatedReady(true), SIMULATED_LOADING_MS)
    return () => clearTimeout(timeout)
  }, [])

  if (showLoading) {
    return (
      <GameLoadingScreen
        game={boludleMeta}
        ready={simulatedReady}
        onExitComplete={() => setShowLoading(false)}
      />
    )
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar
        setIsInfoModalOpen={setIsInfoModalOpen}
        setIsStatsModalOpen={setIsStatsModalOpen}
      />
      <div className="mx-auto flex w-full max-w-lg grow flex-col px-3 pb-8 pt-4">
        <div className="flex grow items-center justify-center pb-6">
          <Grid
            guesses={guesses}
            currentGuess={currentGuess}
            isRevealing={isRevealing}
            isShaking={isShaking}
          />
        </div>
        <Keyboard
          onChar={onChar}
          onDelete={onDelete}
          onEnter={onEnter}
          guesses={guesses}
          isRevealing={isRevealing}
        />
        <InfoModal
          isOpen={isInfoModalOpen}
          handleClose={() => setIsInfoModalOpen(false)}
        />
        <StatsModal
          isOpen={isStatsModalOpen}
          handleClose={() => setIsStatsModalOpen(false)}
          guesses={guesses}
          gameStats={stats}
          isGameLost={isGameLost}
          isGameWon={isGameWon}
          handleShareToClipboard={() => showSuccessAlert(GAME_COPIED_MESSAGE)}
        />
        <AlertContainer />
      </div>
    </div>
  )
}

export default GamePage
