import { useEffect } from "react"
import { useContainer } from "./hooks"
import { twMerge } from "tailwind-merge"

export type TileTransitionStatus = "solved" | "attempt" | "wrong" | undefined

export type TileData = {
  word: string
  selected: boolean
  status: TileTransitionStatus
  setSelected: (selected: boolean) => void
  dx: number
  dy: number
}

export type Position = {
  i: number,
  j: number
}

function getFontSize(wordLength: number) {
  if (wordLength < 8) {
    return "text-md"
  } else if (wordLength < 14) {
    return "text-sm"
  } else if (wordLength < 20) {
    return "text-xs"
  } else {
    return "text-[10px]"
  }
}

export function Tile({ setTileHeight, tileData, containerWidth }: { setTileHeight: (height: number) => void, tileData: TileData, containerWidth?: number }) {

  const { word, status, selected, setSelected, dx, dy } = tileData
  const fontSize = getFontSize(Math.max(...word.split('\n').map(partial => partial.length)))

  const { ref: tileRef, height: tileHeight, width: tileWidth } = useContainer()

  useEffect(() => {
    if (tileHeight) {
      setTileHeight(tileHeight)
    }
  }, [tileHeight, setTileHeight])

  const onClick = () => {
    setSelected(!selected)
  }

  const singleTranslation = containerWidth && tileWidth ? tileWidth + (containerWidth - 4 * tileWidth) / 3 : 0
  const translateX = (dx) * singleTranslation
  const translateY = (dy) * singleTranslation

  const zIndex = 16

  let animation = ''
  if (status === "attempt") {
    animation = 'animate-bounce-attempt'
  } else if (status === "wrong") {
    animation = 'animate-shake-wrong'
  }

  return <div ref={tileRef} key={word} onClick={onClick}
    className={twMerge("cursor-pointer aspect-square transition")}
    style={{
      transform: `translate(${translateX}px, ${translateY}px)`,
      transitionDuration: `400ms`,
      transitionDelay: `1000ms`,
      opacity: status === 'solved' ? 0 : 1,
      zIndex: zIndex
    }}
  >
    <div className={twMerge(
      "w-full h-full rounded-lg border transition",
      selected ? 'bg-accent border-accent' : 'bg-surface-raised border-border',
      animation
    )}>

      <div key={word} className={
        twMerge('flex h-full w-full items-center justify-center font-bold uppercase select-none whitespace-pre-wrap break-words text-center leading-tight px-1',
          fontSize,
          selected ? 'text-white' : 'text-ink'
        )}>{word}</div>
    </div>
  </div>
}