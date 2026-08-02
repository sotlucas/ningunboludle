import { useEffect, useRef, useState } from "react"
import type { Position, TileData, TileTransitionStatus } from "./Tile"
import type { Solution } from "./components/SolutionRow"
import { shuffleSubsetInplace } from "./arrayUtil"
import { loadGameStateFromLocalStorage, saveGameStateToLocalStorage } from "./localStorage"
import { useStats } from "./useStats"

export type Attempt = {
  correct: boolean
  words: string[]
  by: 'auto' | 'user'
}

export type Grouping = {
  group: string
  difficulty: number
  words: string[]
}

const orderedPositions = createOrderedPositions()

export function useGameState({ groupings, shuffleInitial, oneAwayFn, puzzleNumber }: { groupings: Grouping[], shuffleInitial: boolean, oneAwayFn: () => void, puzzleNumber: number }) {

  const { stats, recordGame } = useStats()

  const [data, setData] = useState<{ word: string, status: TileTransitionStatus }[]>(() => [])
  const wordList = data.flatMap(d => d.word)
  const [gameEnded, setGameEnded] = useState(false)
  const [gameWon, setGameWon] = useState(false)
  const [positions, setPositions] = useState<Position[]>(() => orderedPositions)
  const [selectedWords, setSelectedWords] = useState<string[]>(() => [])
  const [attempts, setAttempts] = useState<Attempt[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.puzzleNumber !== puzzleNumber) return []
    return loaded.attempts
  })
  const isRestoringRef = useRef(attempts.length > 0)

  const words = data.map(d => d.word)

  const correctAttempts = attempts.filter(attempt => attempt.correct)
  const numberOfIncorrectAttempts = attempts.length - correctAttempts.length
  const noOfAttemptsRemaining = Math.max(4 - numberOfIncorrectAttempts, 0)

  const wordsOutOfPlay = correctAttempts.flatMap(attempt => attempt.words)
  const wordsInPlay = wordList.filter(word => !wordsOutOfPlay.includes(word))

  const solutions: Solution[] = correctAttempts.map(attempt => (groupings.find(grouping => grouping.group === areSameGroup(attempt.words, groupings)!)!))

  useEffect(() => {
    setData(prevData => {
      if (prevData.length > 0) return prevData
      const words = groupings.flatMap(grouping => grouping.words)
      const shuffledWords = shuffleInitial ? shuffleSubsetInplace([...words], words.map((_, index) => index)) : [...words]
      return shuffledWords.map(word => ({ word: word, status: undefined }))
    })
  }, [groupings, shuffleInitial])

  useEffect(() => {
    saveGameStateToLocalStorage({ puzzleNumber, attempts })
  }, [attempts, puzzleNumber])

  useEffect(() => {
    if (noOfAttemptsRemaining === 0 || solutions.length === 4) {
      setGameEnded(true)
    }
  }, [noOfAttemptsRemaining, solutions])

  useEffect(() => {
    if (gameEnded) {
      autoSolve()
      if (solutions.length === 4) {
        setGameWon(true)
      }

      try {
        console.log('event sent!')
        if ((window as any).gtag as any) {
          (window as any).gtag('event', 'game_result', {
            'won': solutions.length === 4,
            'num_solutions': solutions.length
          })
        }
      }
      catch {}
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameEnded])

  function addAttempt(attempt: Attempt) {
    setAttempts(prev => [...prev, attempt])
  }

  function setTileStatus(word: string, status: TileTransitionStatus) {
    setData(data => data.map(d => d.word === word ? { ...d, status: status } : d))
  }

  function shuffle() {
    const indicesInPlay = wordsInPlay.map(value => words.findIndex(v => v === value))
    setData((data) => shuffleSubsetInplace([...data], indicesInPlay))
  }

  function deselectAll() {
    setSelectedWords(() => [])
  }

  function submit(submittedWords: string[], autoAttempt: boolean = false) {
    if (submittedWords.length !== 4) return

    const correct = !!areSameGroup(submittedWords, groupings)
    addAttempt({ correct: correct, words: submittedWords, by: autoAttempt ? 'auto' : 'user' })

    if (autoAttempt) return

    const willBeCorrectCount = correctAttempts.length + (correct ? 1 : 0)
    const willBeIncorrectCount = numberOfIncorrectAttempts + (correct ? 0 : 1)

    if (correct && willBeCorrectCount === 4) {
      recordGame(true, numberOfIncorrectAttempts)
    } else if (!correct && willBeIncorrectCount === 4) {
      recordGame(false, 4)
    }
  }

  function applyAllAttemptsInstantly(allAttempts: Attempt[]) {
    let solvedCount = 0
    let updatedPositions = positions
    for (const attempt of allAttempts) {
      if (attempt.correct) {
        updatedPositions = computeTopPositions(updatedPositions, attempt.words, solvedCount)
        attempt.words.forEach(word => setTileStatus(word, "restored"))
        solvedCount++
      }
    }
    setPositions(updatedPositions)
  }

  const processedAttemptsCountRef = useRef(0)

  useEffect(() => {
    if (data.length === 0) return

    if (isRestoringRef.current) {
      isRestoringRef.current = false
      applyAllAttemptsInstantly(attempts)
      processedAttemptsCountRef.current = attempts.length
      return
    }

    const newAttempts = attempts.slice(processedAttemptsCountRef.current)
    if (newAttempts.length === 0) return

    let updatedPositions = positions
    let solvedCount = attempts.slice(0, processedAttemptsCountRef.current).filter(attempt => attempt.correct).length

    newAttempts.forEach((attempt, offset) => {
      const delay = offset * 2_100

      if (attempt.correct) {
        const rowIndex = Math.min(solvedCount, 3)
        updatedPositions = computeTopPositions(updatedPositions, attempt.words, rowIndex)
        solvedCount++
        setTimeout(() => setTileStatus(attempt.words[0], "attempt"), delay)
        setTimeout(() => setTileStatus(attempt.words[1], "attempt"), delay + 100)
        setTimeout(() => setTileStatus(attempt.words[2], "attempt"), delay + 200)
        setTimeout(() => setTileStatus(attempt.words[3], "attempt"), delay + 300)
        setTimeout(() => setTileStatus(attempt.words[0], "solved"), delay + 1_000)
        setTimeout(() => setTileStatus(attempt.words[1], "solved"), delay + 1_000)
        setTimeout(() => setTileStatus(attempt.words[2], "solved"), delay + 1_000)
        setTimeout(() => setTileStatus(attempt.words[3], "solved"), delay + 1_000)
        setTimeout(() => deselectAll(), delay + 1_900)
      } else if (oneAway(attempt.words, groupings)) {
        oneAwayFn()
        setTimeout(() => setTileStatus(attempt.words[0], "attempt"), delay)
        setTimeout(() => setTileStatus(attempt.words[1], "attempt"), delay + 100)
        setTimeout(() => setTileStatus(attempt.words[2], "attempt"), delay + 200)
        setTimeout(() => setTileStatus(attempt.words[3], "attempt"), delay + 300)
        setTimeout(() => setTileStatus(attempt.words[0], "wrong"), delay + 1_000)
        setTimeout(() => setTileStatus(attempt.words[1], "wrong"), delay + 1_000)
        setTimeout(() => setTileStatus(attempt.words[2], "wrong"), delay + 1_000)
        setTimeout(() => setTileStatus(attempt.words[3], "wrong"), delay + 1_000)
      } else {
        setTimeout(() => setTileStatus(attempt.words[0], "attempt"), delay)
        setTimeout(() => setTileStatus(attempt.words[1], "attempt"), delay + 100)
        setTimeout(() => setTileStatus(attempt.words[2], "attempt"), delay + 200)
        setTimeout(() => setTileStatus(attempt.words[3], "attempt"), delay + 300)
        setTimeout(() => setTileStatus(attempt.words[0], "wrong"), delay + 1_000)
        setTimeout(() => setTileStatus(attempt.words[1], "wrong"), delay + 1_000)
        setTimeout(() => setTileStatus(attempt.words[2], "wrong"), delay + 1_000)
        setTimeout(() => setTileStatus(attempt.words[3], "wrong"), delay + 1_000)
      }
    })

    setPositions(updatedPositions)
    processedAttemptsCountRef.current = attempts.length
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempts, data])

  function wordToPosition(positions: Position[], srcWord: string, dstPosition: Position): Position[] {

    const srcIndex = words.findIndex(word => word === srcWord)
    const srcPosition = positions.at(srcIndex)!

    return positions.map((position, index) => {
      if (dstPosition.i === position.i && dstPosition.j === position.j) {
        return srcPosition
      } else if (srcIndex === index) {
        return dstPosition
      } else {
        return position
      }
    })
  }

  function computeTopPositions(basePositions: Position[], words: string[], row: number): Position[] {
    let updatedPositions = [...basePositions]
    updatedPositions = wordToPosition(updatedPositions, words[0], { i: row, j: 0 })
    updatedPositions = wordToPosition(updatedPositions, words[1], { i: row, j: 1 })
    updatedPositions = wordToPosition(updatedPositions, words[2], { i: row, j: 2 })
    updatedPositions = wordToPosition(updatedPositions, words[3], { i: row, j: 3 })
    return updatedPositions
  }

  function addSelectedWord(word: string) {
    setSelectedWords(prev => {
      if (prev.length >= 4) {
        return prev
      }
      return [...prev, word]
    })
  }

  function removeSelectedWord(word: string) {
    setSelectedWords(prev => prev.filter(prev => prev !== word))
  }

  function findUnsolvedGroupings() {
    return groupings.filter(grouping => !solutions.includes(grouping))
  }

  const [autoSolveEnded, setAutoSolveEnded] = useState(false)

  async function autoSolve() {

    const unsolvedGroupings = findUnsolvedGroupings()

    for (const grouping of unsolvedGroupings) {
      await new Promise(resolve => setTimeout(() => {
        setSelectedWords(grouping.words)
        submit(grouping.words, true)
        return resolve(true)
      }, 2_500));
    }
    setTimeout(() => setAutoSolveEnded(true), 3_000)
  }

  function wordToDifficulty(word: string): number {
    return groupings.filter(grouping => grouping.words.includes(word)).at(0)!.difficulty
  }

  function getEmojiRepresentation() {
    const userAttempts = attempts.filter(attempt => attempt.by === 'user')
    return userAttempts.map(attempt =>
      attempt.words.map(word => difficultyToEmoji(wordToDifficulty(word)))
    )
  }

  const emojiRepresentation = getEmojiRepresentation()

  const tileDatas: TileData[] = data.map((d, index) => {
    const word = d.word
    return {
      word: word,  // data
      status: d.status,  // data
      selected: selectedWords.includes(word),  // derived data
      setSelected: (selected: boolean) => {  // actions
        if (selected && wordsInPlay.includes(word)) {
          addSelectedWord(word)
        } else {
          removeSelectedWord(word)
        }
      },
      dx: positions.at(index)!.j - orderedPositions.at(index)!.j,
      dy: positions.at(index)!.i - orderedPositions.at(index)!.i,
    }
  })

  const canDeselect = !gameEnded && selectedWords.length > 0
  const canSubmit = !gameEnded && selectedWords.length === 4
  return {
    tileDatas: tileDatas,
    shuffle: shuffle,
    canDeselect: canDeselect,
    deselectAll: deselectAll,
    canSubmit: canSubmit,
    submit: () => submit(selectedWords),
    emojiRepresentation: emojiRepresentation,
    solutions: solutions,
    noOfAttemptsRemaining: noOfAttemptsRemaining,
    gameEnded: gameEnded,
    gameWon: gameWon,
    autoSolveEnded: autoSolveEnded,
    stats: stats,
    numberOfIncorrectAttempts: numberOfIncorrectAttempts,
  }
}

function createOrderedPositions() {
  const orderedPositions = []
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      orderedPositions.push({ i: i, j: j })
    }
  }
  return orderedPositions
}

function areSameGroup(words: string[], groupings: Grouping[]): string | undefined {
  const groups = words.map(word => findGroup(word, groupings))
  if (new Set(groups).size === 1) {
    return groups[0]
  }
  return undefined
}

function findGroup(word: string, groupings: Grouping[]) {
  return groupings.find(grouping => grouping.words.includes(word))!.group
}

function difficultyToEmoji(difficulty: number): string {
  if (difficulty === 1) {
    return '🟨'
  } else if (difficulty === 2) {
    return '🟩'
  } else if (difficulty === 3) {
    return '🟦'
  } else if (difficulty === 4) {
    return '🟪'
  }
  return ''
}

function oneAway(words: string[], groupings: Grouping[]): boolean {
  const groups = words.map(word => findGroup(word, groupings))
  const groupSet = new Set(groups)
  return groupSet.size === 2 && Array.from(groupSet.values()).every(word => {
    const numMatches = groups.filter(w => w === word).length
    return numMatches === 1 || numMatches === 3
  })
}