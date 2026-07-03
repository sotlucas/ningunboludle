import { useEffect, useState } from 'react'
import classnames from 'classnames'
import { motion } from 'motion/react'
import type { CharStatus } from '../../lib/statuses'
import { REVEAL_TIME_MS } from '../../constants/settings'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
}

const STATUS_CLASSES: Record<CharStatus, string> = {
  correct: 'bg-correct border-correct text-white',
  present: 'bg-present border-present text-white',
  absent: 'bg-absent border-absent text-white',
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const delayMs = position * REVEAL_TIME_MS
  const flipDurationS = (REVEAL_TIME_MS * 1.4) / 1000

  // Colors must flip in at the midpoint of the flip animation, when the
  // cell is edge-on and effectively invisible, rather than at mount time.
  const [showStatus, setShowStatus] = useState(!shouldReveal)

  useEffect(() => {
    if (!shouldReveal) {
      setShowStatus(true)
      return
    }
    setShowStatus(false)
    const timeout = setTimeout(
      () => setShowStatus(true),
      delayMs + (flipDurationS * 1000) / 2
    )
    return () => clearTimeout(timeout)
  }, [shouldReveal, delayMs, flipDurationS])

  const classes = classnames(
    'w-14 h-14 border-2 flex items-center justify-center mx-0.5 text-3xl font-sans font-bold rounded-lg',
    status && showStatus
      ? STATUS_CLASSES[status]
      : 'bg-surface-raised border-border text-ink',
    { 'border-accent': isFilled }
  )

  return (
    <div style={{ perspective: '400px' }}>
      <motion.div
        className={classes}
        style={{ transformStyle: 'preserve-3d' }}
        initial={shouldReveal ? { rotateX: 0 } : false}
        animate={
          shouldReveal
            ? { rotateX: [0, 90, 0] }
            : isCompleted
              ? { rotateX: 0 }
              : isFilled
                ? { scale: [0.85, 1] }
                : undefined
        }
        transition={
          shouldReveal
            ? {
                duration: flipDurationS,
                times: [0, 0.5, 1],
                delay: delayMs / 1000,
                ease: 'easeIn',
              }
            : { duration: 0.1 }
        }
      >
        {value}
      </motion.div>
    </div>
  )
}
