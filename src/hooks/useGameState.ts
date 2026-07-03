import { useEffect, useState } from 'react'
import {
  WIN_MESSAGES,
  NOT_ENOUGH_LETTERS_MESSAGE,
  WORD_NOT_FOUND_MESSAGE,
  CORRECT_WORD_MESSAGE,
} from '../constants/strings'
import {
  MAX_WORD_LENGTH,
  MAX_CHALLENGES,
  REVEAL_TIME_MS,
  GAME_LOST_INFO_DELAY,
} from '../constants/settings'
import { isWordInWordList, isWinningWord, solution, unicodeLength, unicodeSplit } from '../lib/words'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from '../lib/localStorage'
import { useAlert } from '../context/AlertContext'
import { useStats } from './useStats'

export const useGameState = (onGameEnd?: () => void) => {
  const { showError: showErrorAlert, showSuccess: showSuccessAlert } =
    useAlert()
  const { stats, recordGame } = useStats()

  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [isGameLost, setIsGameLost] = useState(false)
  const [isRevealing, setIsRevealing] = useState(false)
  const [isShaking, setIsShaking] = useState(false)

  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded?.solution !== solution) {
      return []
    }
    const gameWasWon = loaded.guesses.includes(solution)
    if (gameWasWon) {
      setIsGameWon(true)
    }
    if (loaded.guesses.length === MAX_CHALLENGES && !gameWasWon) {
      setIsGameLost(true)
      showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
        persist: true,
      })
    }
    return loaded.guesses
  })

  const clearShake = () => {
    setIsShaking(false)
  }

  useEffect(() => {
    saveGameStateToLocalStorage({ guesses, solution })
  }, [guesses])

  useEffect(() => {
    if (isGameWon) {
      const winMessage =
        WIN_MESSAGES[Math.floor(Math.random() * WIN_MESSAGES.length)]
      const delayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH

      showSuccessAlert(winMessage, { delayMs, onClose: onGameEnd })
    }

    if (isGameLost) {
      setTimeout(() => {
        onGameEnd?.()
      }, GAME_LOST_INFO_DELAY)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isGameWon, isGameLost])

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    }
  }

  const onDelete = () => {
    setCurrentGuess(unicodeSplit(currentGuess).slice(0, -1).join(''))
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }

    if (!(unicodeLength(currentGuess) === MAX_WORD_LENGTH)) {
      setIsShaking(true)
      return showErrorAlert(NOT_ENOUGH_LETTERS_MESSAGE, {
        onClose: clearShake,
      })
    }

    if (!isWordInWordList(currentGuess)) {
      setIsShaking(true)
      return showErrorAlert(WORD_NOT_FOUND_MESSAGE, {
        onClose: clearShake,
      })
    }

    setIsRevealing(true)
    // turn this back off after all
    // chars have been revealed
    setTimeout(() => {
      setIsRevealing(false)
    }, REVEAL_TIME_MS * MAX_WORD_LENGTH)

    const winningWord = isWinningWord(currentGuess)

    if (
      unicodeLength(currentGuess) === MAX_WORD_LENGTH &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])
      setCurrentGuess('')

      if (winningWord) {
        recordGame(guesses.length)
        setIsGameWon(true)
        return
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        recordGame(guesses.length + 1)
        setIsGameLost(true)
        showErrorAlert(CORRECT_WORD_MESSAGE(solution), {
          persist: true,
          delayMs: REVEAL_TIME_MS * MAX_WORD_LENGTH + 1,
        })
      }
    }
  }

  return {
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
  }
}
