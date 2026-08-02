import { twMerge } from "tailwind-merge"
import { useDelay } from "../hooks"
import type { Grouping } from "../useGameState"

export type Solution = Grouping

export function SolutionRow({ height, solution }: { height?: number, solution?: Solution }) {

  const active = useDelay(!!solution, 1_500)

  const colorClass = difficultyToColorClass(solution?.difficulty ?? -1)
  return (

    <div
      hidden={!active}
      className={twMerge(
        "w-full select-none transition rounded-lg animate-bounce text-[#12233a]",
        colorClass,
        active ? 'opacity-100' : 'opacity-0',
        active && "animate-scale-big-normal"
      )}
      style={{ height: height }}>
      <div className="flex flex-col h-full justify-center items-center uppercase">
        <div className="text-center font-bold">{solution?.group}</div>
        <div className="text-center">{solution?.words.join(', ')}</div>
      </div>
    </div>
  )
}

function difficultyToColorClass(difficulty: number) {
  if (difficulty === 1) {
    return 'bg-diff-1'
  } else if (difficulty === 2) {
    return 'bg-diff-2'
  } else if (difficulty === 3) {
    return 'bg-diff-3'
  } else if (difficulty === 4) {
    return 'bg-diff-4'
  }

  return 'bg-ink'
}