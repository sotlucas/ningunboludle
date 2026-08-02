import { Info, Sun, Moon } from 'lucide-react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ImgMate from '../../assets/mate.png'
import { useTheme } from '../../hooks/useTheme'

type Props = {
  title: ReactNode
  onInfoClick: () => void
  actions?: ReactNode
}

export const GameNavbar = ({ title, onInfoClick, actions }: Props) => {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="border-b border-border-soft">
      <div className="mx-auto flex max-w-lg items-center justify-between px-4 py-3">
        <button
          type="button"
          onClick={onInfoClick}
          aria-label="cómo jugar"
          className="text-ink-soft transition-colors hover:text-ink"
        >
          <Info className="h-5 w-5" />
        </button>

        <Link
          to="/"
          className="flex items-center gap-1.5 select-none"
          aria-label="volver a todos los juegos"
        >
          <h1 className="font-display text-xl sm:text-2xl font-bold tracking-tight text-ink">
            {title}
          </h1>
          <img className="h-6 w-6" src={ImgMate} alt="" />
        </Link>

        <div className="flex items-center gap-3">
          {actions}
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
