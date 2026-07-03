import { motion } from 'motion/react'
import { MAX_WORD_LENGTH } from '../../constants/settings'
import { Cell } from './Cell'
import { unicodeSplit } from '../../lib/words'

type Props = {
  guess: string
  isShaking: boolean
}

export const CurrentRow = ({ guess, isShaking }: Props) => {
  const splitGuess = unicodeSplit(guess)
  const emptyCells = Array.from(Array(MAX_WORD_LENGTH - splitGuess.length))

  return (
    <motion.div
      className="flex justify-center"
      animate={isShaking ? { x: [0, -8, 8, -8, 8, 0] } : { x: 0 }}
      transition={{ duration: 0.25 }}
    >
      {splitGuess.map((letter, i) => (
        <Cell key={i} value={letter} />
      ))}
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </motion.div>
  )
}
