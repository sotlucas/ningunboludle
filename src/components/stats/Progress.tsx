import { motion } from 'motion/react'

type Props = {
  index: number
  percent: number
  label: string
  isHighlighted?: boolean
}

export const Progress = ({ index, percent, label, isHighlighted }: Props) => {
  return (
    <div className="flex items-center gap-2">
      <div className="w-3 font-mono text-xs text-ink-muted">{index + 1}</div>
      <div className="h-5 flex-1 overflow-hidden rounded-md bg-surface">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.max(percent, 6)}%` }}
          transition={{ duration: 0.5, delay: 0.1 * index, ease: 'easeOut' }}
          className={`flex h-full items-center justify-end rounded-md px-2 font-mono text-xs font-medium text-white ${
            isHighlighted ? 'bg-accent' : 'bg-ink-muted/70'
          }`}
        >
          {label}
        </motion.div>
      </div>
    </div>
  )
}
