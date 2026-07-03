import type { ReactNode } from 'react'
import classnames from 'classnames'
import { motion } from 'motion/react'
import type { CharStatus } from '../../lib/statuses'
import { MAX_WORD_LENGTH, REVEAL_TIME_MS } from '../../constants/settings'

type Props = {
  children?: ReactNode
  value: string
  width?: number
  status?: CharStatus
  onClick: (value: string) => void
  isRevealing?: boolean
}

const STATUS_CLASSES: Record<CharStatus, string> = {
  correct: 'bg-correct text-white',
  present: 'bg-present text-white',
  absent: 'bg-absent text-white',
}

export const Key = ({
  children,
  status,
  width = 40,
  value,
  onClick,
  isRevealing,
}: Props) => {
  const keyDelayMs = REVEAL_TIME_MS * MAX_WORD_LENGTH

  const classes = classnames(
    'flex items-center justify-center rounded-lg mx-0.5 text-sm font-sans font-semibold cursor-pointer select-none shadow-sm',
    {
      transition: isRevealing,
      'bg-surface-raised text-ink hover:bg-accent-dim active:bg-accent-dim':
        !status,
      [value === 'Ñ' ? 'ring-2 ring-accent' : '']: value === 'Ñ' && !status,
    },
    status ? STATUS_CLASSES[status] : undefined
  )

  const styles = {
    transitionDelay: isRevealing ? `${keyDelayMs}ms` : 'unset',
    width: `${width}px`,
    height: '54px',
  }

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    onClick(value)
    event.currentTarget.blur()
  }

  return (
    <motion.button
      style={styles}
      className={classes}
      onClick={handleClick}
      whileTap={{ scale: 0.9 }}
    >
      {children || value}
    </motion.button>
  )
}
