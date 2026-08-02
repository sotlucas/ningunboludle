import { twMerge } from 'tailwind-merge'
import { useEffect, useState } from 'react'
import { SolutionRow } from './components/SolutionRow'
import { useAlertState, useContainer, useDelay } from './hooks'
import { useGroupings } from './words'
import { InfoModal } from './modals/InfoModal'
import { EndScreenModal } from './modals/EndScreenModal'
import { useGameState, type Grouping } from './useGameState'
import { loadGameStateFromLocalStorage } from './localStorage'
import { getPuzzleNumber } from './share'
import { Navbar } from './components/Navbar'
import { Tile } from './Tile'
import { Button } from './components/Button'
import { usePageMeta } from '../../hooks/usePageMeta'
import { GAMES } from '../../constants/games'
import { GameLoadingScreen } from '../../components/GameLoadingScreen'

const conexionesMeta = GAMES.find((game) => game.slug === 'conexiones')!

function RemainingDot({ active }: { active?: boolean }) {
  const color = active ? 'text-yellow-400' : 'text-ink-muted'
  return (
    <svg
      className={twMerge('w-5 h-5 ms-1', color)}
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 22 20"
    >
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
    </svg>
  )
}

function Alert({ label, visible }: { label: string; visible: boolean }) {
  return (
    <div
      className={twMerge(
        'pointer-events-none absolute left-1/2 -top-2 -translate-x-1/2 -translate-y-full z-50 transition duration-500 select-none',
        visible ? 'opacity-100' : 'opacity-0'
      )}
    >
      <div className="whitespace-nowrap rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_28px_rgba(13,20,32,0.25)]">
        {label}
      </div>
    </div>
  )
}

function getDateArgentina() {
  const date = new Date() // utc
  date.setHours(date.getHours() - 3)
  return date
}

export default function BoluxionesApp() {
  usePageMeta({
    title: conexionesMeta.tabTitle,
    description: conexionesMeta.tabDescription,
    icon: conexionesMeta.icon,
    url: `https://boludle.sotlucas.dev${conexionesMeta.path}`,
  })

  const groupings = useGroupings(getDateArgentina())
  const puzzleNumber = getPuzzleNumber()
  const [showLoading, setShowLoading] = useState(true)

  if (showLoading) {
    return (
      <GameLoadingScreen
        game={conexionesMeta}
        ready={!!groupings}
        onExitComplete={() => setShowLoading(false)}
      />
    )
  }

  return <BoluxionesGame groupings={groupings!} puzzleNumber={puzzleNumber} />
}

function BoluxionesGame({
  groupings,
  puzzleNumber,
}: {
  groupings: Grouping[]
  puzzleNumber: number
}) {
  const { label, active, triggerAlert } = useAlertState()

  const {
    tileDatas,
    shuffle,
    canDeselect,
    deselectAll,
    submit,
    canSubmit,
    solutions,
    noOfAttemptsRemaining,
    gameWon,
    autoSolveEnded,
    emojiRepresentation,
    stats,
  } = useGameState({
    groupings,
    shuffleInitial: true,
    oneAwayFn: () => triggerAlert('Estás a una palabra...', 500, 2_000),
    puzzleNumber,
  })

  const noOfAttemptsRemainingDelayed = useDelay(noOfAttemptsRemaining, 1_000)

  const { ref: containerRef, width: containerWidth } = useContainer()
  const [tileHeight, setTileHeight] = useState<number>()

  const [isInfoOpen, setIsInfoOpen] = useState(() => !loadGameStateFromLocalStorage())
  const [isStatsOpen, setIsStatsOpen] = useState(false)

  useEffect(() => {
    if (autoSolveEnded) {
      setIsStatsOpen(true)
    }
  }, [autoSolveEnded])

  function share() {
    setIsStatsOpen(true)
  }

  return (
    <div className="flex min-h-dvh flex-col">
      <InfoModal isOpen={isInfoOpen} handleClose={() => setIsInfoOpen(false)} />
      <EndScreenModal
        isOpen={isStatsOpen}
        handleClose={() => setIsStatsOpen(false)}
        emojiRepresentation={emojiRepresentation}
        gameStats={stats}
        gameEnded={autoSolveEnded}
        gameWon={gameWon}
        onShare={() => triggerAlert('Copiado', 0, 5_000)}
      />
      <Navbar setIsInfoModalOpen={setIsInfoOpen} setIsStatsModalOpen={setIsStatsOpen} />
      <div className="mx-auto flex w-full max-w-lg grow flex-col px-3 pb-8 pt-4">
        <div className="flex justify-center items-center">
          <div className="relative flex items-center gap-1 text-ink-soft">
            <span className="select-none">
              Creá cuatro grupos de cuatro palabras!
            </span>
            <Alert label={label} visible={active} />
          </div>
        </div>
        <div className="mt-4">
          <div className="flex justify-center w-full ">
            <div ref={containerRef} className="relative w-full max-w-[500px]">
              <div className="absolute w-full h-full">
                <div className="flex flex-col gap-y-2">
                  <SolutionRow solution={solutions.at(0)} height={tileHeight} />
                  <SolutionRow solution={solutions.at(1)} height={tileHeight} />
                  <SolutionRow solution={solutions.at(2)} height={tileHeight} />
                  <SolutionRow solution={solutions.at(3)} height={tileHeight} />
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {tileDatas.map((tileData, index) => (
                  <Tile
                    key={index}
                    setTileHeight={setTileHeight}
                    tileData={tileData}
                    containerWidth={containerWidth}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center w-full gap-2 items-center text-ink-soft">
          <div className="select-none">Intentos restantes</div>
          <div className="flex">
            {Array.from(Array(noOfAttemptsRemainingDelayed)).map((_, i) => (
              <RemainingDot key={`on-${i}`} active />
            ))}
            {Array.from(Array(4 - noOfAttemptsRemainingDelayed)).map((_, i) => (
              <RemainingDot key={`off-${i}`} />
            ))}
          </div>
        </div>
        <div className="mt-6 gap-x-4 flex justify-center">
          {autoSolveEnded ? (
            <Button
              label="Compartir"
              onSubmit={share}
              active
              filled
              timeoutAfterClick={100}
            />
          ) : (
            <>
              <Button
                label="Shuffle"
                onSubmit={shuffle}
                active
                timeoutAfterClick={100}
              />
              <Button
                label="Deseleccionar"
                onSubmit={deselectAll}
                active={canDeselect}
                timeoutAfterClick={100}
              />
              <Button
                label="Enviar"
                onSubmit={submit}
                active={canSubmit}
                filled
                timeoutAfterClick={3_000}
                onClickInactive={() =>
                  triggerAlert('Seleccioná cuatro palabras', 0, 3_000)
                }
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}
