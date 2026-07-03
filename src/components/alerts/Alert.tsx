import { AnimatePresence, motion } from 'motion/react'
import classnames from 'classnames'

type Props = {
  isOpen: boolean
  message: string
  variant?: 'success' | 'error'
}

export const Alert = ({ isOpen, message, variant = 'error' }: Props) => {
  const classes = classnames(
    'fixed z-50 top-16 left-1/2 -translate-x-1/2 max-w-xs rounded-xl px-4 py-2.5 shadow-[0_8px_28px_rgba(13,20,32,0.25)] pointer-events-none',
    {
      'bg-[#B85430] text-white': variant === 'error',
      'bg-accent text-white': variant === 'success',
    }
  )

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={classes}
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.2 }}
        >
          <p className="text-center text-sm font-medium">{message}</p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
