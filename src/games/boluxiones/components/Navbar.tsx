import { Info, Sun, Moon } from 'lucide-react'
import { Link } from 'react-router-dom'
import ImgMate from '../../../assets/mate.png'
import { useTheme } from '../../../hooks/useTheme'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
}

export const Navbar = ({ setIsInfoModalOpen }: Props) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b border-border-soft">
      <div className="bg-accent-dim px-4 py-2 text-center">
        <p className="text-xs italic text-ink-soft">
          Jugá a nuestro otro juego:{' '}
          <Link className="font-semibold text-accent underline" to="/boludle">
            Boludle
          </Link>
        </p>
      </div>
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={() => setIsInfoModalOpen(true)}
          aria-label="cómo jugar"
          className="text-ink-soft transition-colors hover:text-ink"
        >
          <Info className="h-5 w-5" />
        </button>

        <Link
          to="/"
          className="flex items-center gap-1.5 select-none"
          aria-label="volver al inicio"
        >
          <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink">
            Conexiones <span className="text-accent">Argentinas</span>
          </h1>
          <img className="h-6 w-6" src={ImgMate} alt="" />
        </Link>

        <div className="flex items-center gap-3">
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
        </div>
      </div>
    </header>
  )
}
