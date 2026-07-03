import { WORDS, DEFINITIONS } from '../constants/wordlist'
import { VALID_GUESSES } from '../constants/validGuesses'
import { WRONG_SPOT_MESSAGE, NOT_CONTAINED_MESSAGE } from '../constants/strings'
import { getGuessStatuses } from './statuses'

export const isWordInWordList = (word: string) => {
  return (
    WORDS.includes(localeAwareLowerCase(word)) ||
    VALID_GUESSES.includes(localeAwareLowerCase(word))
  )
}

export const isWinningWord = (word: string) => {
  return solution === word
}

// build a set of previously revealed letters - present and correct
// guess must use correct letters in that space and any other revealed letters
// also check if all revealed instances of a letter are used (i.e. two C's)
export const findFirstUnusedReveal = (word: string, guesses: string[]) => {
  if (guesses.length === 0) {
    return false
  }

  const lettersLeftArray = new Array<string>()
  const guess = guesses[guesses.length - 1]
  const statuses = getGuessStatuses(guess)
  const splitWord = unicodeSplit(word)
  const splitGuess = unicodeSplit(guess)

  for (let i = 0; i < splitGuess.length; i++) {
    if (statuses[i] === 'correct' || statuses[i] === 'present') {
      lettersLeftArray.push(splitGuess[i])
    }
    if (statuses[i] === 'correct' && splitWord[i] !== splitGuess[i]) {
      return WRONG_SPOT_MESSAGE(splitGuess[i], i + 1)
    }
  }

  // check for the first unused letter, taking duplicate letters
  // into account - see issue #198
  let n
  for (const letter of splitWord) {
    n = lettersLeftArray.indexOf(letter)
    if (n !== -1) {
      lettersLeftArray.splice(n, 1)
    }
  }

  if (lettersLeftArray.length > 0) {
    return NOT_CONTAINED_MESSAGE(lettersLeftArray[0])
  }
  return false
}

const segmenter = new Intl.Segmenter('es', { granularity: 'grapheme' })

export const unicodeSplit = (word: string) => {
  return Array.from(segmenter.segment(word), (s) => s.segment)
}

export const unicodeLength = (word: string) => {
  return unicodeSplit(word).length
}

export const localeAwareLowerCase = (text: string) => {
  return import.meta.env.VITE_LOCALE_STRING
    ? text.toLocaleLowerCase(import.meta.env.VITE_LOCALE_STRING)
    : text.toLowerCase()
}

export const localeAwareUpperCase = (text: string) => {
  return import.meta.env.VITE_LOCALE_STRING
    ? text.toLocaleUpperCase(import.meta.env.VITE_LOCALE_STRING)
    : text.toUpperCase()
}

export const getWordOfDay = () => {
  const epochMs = new Date('February 14, 2022 00:00:00').valueOf()
  const now = Date.now()
  const msInDay = 86400000
  const index = Math.floor((now - epochMs) / msInDay)
  const nextday = (index + 1) * msInDay + epochMs
  const solution = localeAwareUpperCase(WORDS[index % WORDS.length])
  const definition = DEFINITIONS[index % DEFINITIONS.length]

  return {
    solution: solution,
    definition: definition,
    solutionIndex: index,
    tomorrow: nextday,
  }
}

export const { solution, definition, solutionIndex, tomorrow } = getWordOfDay()
