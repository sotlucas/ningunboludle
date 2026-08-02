import { BarChart3 } from 'lucide-react'
import { GameNavbar } from '../../../components/navbar/GameNavbar'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
}

export const Navbar = ({ setIsInfoModalOpen, setIsStatsModalOpen }: Props) => {
  return (
    <GameNavbar
      title={
        <>
          Conexiones <span className="text-accent">Argentinas</span>
        </>
      }
      onInfoClick={() => setIsInfoModalOpen(true)}
      actions={
        <button
          type="button"
          onClick={() => setIsStatsModalOpen(true)}
          aria-label="estadísticas"
          className="text-ink-soft transition-colors hover:text-ink"
        >
          <BarChart3 className="h-5 w-5" />
        </button>
      }
    />
  )
}
