import { BaseModal } from '../../../components/modals/BaseModal'
import { Tile } from '../Tile'

function DemoTile({ word, selected = false }: { word: string; selected?: boolean }) {
  return (
    <Tile
      setTileHeight={() => {}}
      tileData={{
        word: word,
        selected: selected,
        status: undefined,
        setSelected: () => {},
        dx: 0,
        dy: 0,
      }}
    />
  )
}
type Props = {
  isOpen: boolean
  handleClose: () => void
}

export const InfoModal = ({ isOpen, handleClose }: Props) => {
  return (
    <BaseModal title="Cómo jugar" isOpen={isOpen} handleClose={handleClose}>
      <div className="text-sm text-ink-soft text-left">
        <p>Encontrá grupos de cuatro palabras que tengan algo en común.</p>
        <p>
          • Selecciona cuatro elementos y tocá 'Enviar' para verificar si tu
          suposición es correcta.
        </p>
        <p>• Podés cometer cuatro errores como máximo.</p>

        <p className="mt-4">Ejemplo: grupo de palabras de insultos infantiles</p>
        <div className="mt-4 grid grid-cols-4 gap-2 cursor-none p-2 bg-surface rounded-lg">
          <DemoTile word="Jacarandá" />
          <DemoTile word="Bobo" selected />
          <DemoTile word="Nacional" />
          <DemoTile word="Celtán" />
          <DemoTile word="Salame" selected />
          <DemoTile word="Ceibo" />
          <DemoTile word="Pingüino" />
          <DemoTile word="Pato" />
          <DemoTile word="Leon" />
          <DemoTile word="Lenteja" selected />
          <DemoTile word="Arrayán" />
          <DemoTile word="Ley" />
          <DemoTile word="Argentino" />
          <DemoTile word="Austral" />
          <DemoTile word="Papafrita" selected />
          <DemoTile word="Gato" />
        </div>

        <p className="mt-4 italic text-center">
          ¡Ojo, pueden haber palabras que parezcan pertenecer a múltiples
          categorías!
        </p>
        <p className="mt-4">
          Cada grupo que vas descubriendo está asociado a un color que indica su
          dificultad:
        </p>
        <div>
          <p>🟨 Baja</p>
          <p>🟩 Media</p>
          <p>🟦 Alta</p>
          <p>🟪 Muy Alta</p>
        </div>

        <div className="mt-6 italic text-center">
          Por los creadores de{' '}
          <span
            className="underline font-bold"
            onClick={() => window.open('https://www.boludle.com')}
          >
            Boludle.com
          </span>
          . Contactanos en{' '}
          <span
            className="underline font-bold"
            onClick={() => window.open('https://www.twitter.com/boludle')}
          >
            Twitter
          </span>{' '}
          o <span className="underline font-bold">mili@boludle.com</span>.
        </div>
      </div>
    </BaseModal>
  )
}
