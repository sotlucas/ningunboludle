import { Share2 } from 'lucide-react'
import { motion } from 'motion/react'
import { shareStatus } from '../../lib/share'
import { SHARE_TEXT } from '../../constants/strings'

type Props = {
  guesses: string[]
  isGameLost: boolean
  onShared: () => void
}

export const ShareButton = ({ guesses, isGameLost, onShared }: Props) => {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-accent-hover"
      onClick={() => {
        shareStatus(guesses, isGameLost, false, false, false, onShared)
      }}
    >
      <Share2 className="h-4 w-4" />
      {SHARE_TEXT}
    </motion.button>
  )
}
