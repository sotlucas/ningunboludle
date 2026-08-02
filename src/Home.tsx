import { Link } from 'react-router-dom'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from './hooks/useTheme'
import { GAMES, type GameMeta } from './constants/games'
import ImgMate from './assets/mate.png'

type GameCardProps = {
  game: GameMeta
}

function GameCard({ game }: GameCardProps) {
  return (
    <Link
      to={game.path}
      className="group flex flex-col rounded-2xl border border-border bg-surface-raised p-6 shadow-sm transition hover:border-accent hover:shadow-[0_8px_28px_rgba(13,20,32,0.15)]"
    >
      <img className="h-10 w-10 select-none" src={game.icon} alt="" />
      <h2 className="mt-3 font-display text-2xl font-bold tracking-tight text-ink">
        {game.title}
      </h2>
      <p className="mt-1 text-sm text-ink-soft">{game.cardDescription}</p>
      <span className="mt-4 text-sm font-semibold text-accent group-hover:underline">
        Jugar →
      </span>
    </Link>
  )
}

function Home() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-lg items-center justify-end px-4 py-3">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={
            theme === 'dark' ? 'cambiar a modo claro' : 'cambiar a modo oscuro'
          }
          className="text-ink-soft transition-colors hover:text-ink"
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>
      </header>

      <div className="mx-auto flex w-full max-w-lg grow flex-col justify-center px-4 pb-16">
        <div className="mb-8 flex flex-col items-center text-center select-none">
          <h1 className="mt-3 font-display text-3xl font-bold tracking-tight text-ink">
            Jueguitos <span className="text-accent">Argentinos</span>
            <img
              className="ml-2 inline h-7 w-7 align-middle"
              src={ImgMate}
              alt=""
            />
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Elegí un juego para jugar
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {GAMES.map((game) => (
            <GameCard key={game.slug} game={game} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home
