import { useEffect, useState } from "react"
import { twMerge } from "tailwind-merge"

export function Button({ label, onSubmit, active, filled, timeoutAfterClick, onClickInactive }:
  { label: string, onSubmit: () => void, active: boolean, filled?: boolean, timeoutAfterClick: number, onClickInactive?: () => void }) {
  const [justClicked, setJustClicked] = useState(false)
  const disabled = !active || justClicked

  useEffect(() => {
    if (justClicked) {
      setTimeout(() => setJustClicked(false), timeoutAfterClick)
    }
  }, [justClicked, timeoutAfterClick])

  function onClick() {
    if (!active && onClickInactive) {
      onClickInactive()
    } 
    if(!disabled) {
      setJustClicked(true)
      onSubmit()
    }
  }

  return <button
    onClick={onClick}
    className={twMerge(
      "rounded-xl font-semibold text-center py-2 px-4 border border-solid select-none shadow-sm",
      "transition duration-300",
      filled
        ? "bg-accent text-white border-accent hover:bg-accent-hover"
        : "bg-surface-raised text-ink border-border hover:bg-accent-dim",
      disabled && "opacity-50",
    )}>
    {label}
  </button>
}