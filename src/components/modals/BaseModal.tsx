import type { ReactNode } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { AnimatePresence, motion } from 'motion/react'
import { X } from 'lucide-react'

type Props = {
  title: string
  children: ReactNode
  isOpen: boolean
  handleClose: () => void
}

export const BaseModal = ({ title, children, isOpen, handleClose }: Props) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          static
          open={isOpen}
          onClose={handleClose}
          className="fixed inset-0 z-50"
        >
          <motion.div
            className="fixed inset-0 bg-[#0d1420]/60 backdrop-blur-sm"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          />
          <div className="fixed inset-0 flex items-end justify-center sm:items-center">
            <DialogPanel className="contents">
              <motion.div
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: '100%', opacity: 0 }}
                transition={{ type: 'spring', damping: 28, stiffness: 320 }}
                className="relative w-full max-w-sm max-h-[88dvh] overflow-y-auto rounded-t-3xl sm:rounded-3xl bg-surface-raised border border-border shadow-[0_8px_28px_rgba(13,20,32,0.25)] px-6 pb-8 pt-3 sm:pt-6"
              >
                <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-border sm:hidden" />
                <div className="h-1 -mx-6 -mt-3 mb-5 hidden rounded-t-3xl bg-accent sm:block" />

                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute right-4 top-5 text-ink-muted transition-colors hover:text-ink"
                  aria-label="cerrar"
                >
                  <X className="h-5 w-5" />
                </button>

                {title && (
                  <DialogTitle className="text-center font-display text-xl font-bold text-ink">
                    {title}
                  </DialogTitle>
                )}
                <div className="mt-3 text-sm text-ink-soft">{children}</div>
              </motion.div>
            </DialogPanel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
