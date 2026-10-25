import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'

const EASE = [0.22, 1, 0.36, 1]
const EXIT_MS = 160

/**
 * Presentation-only modal wrapper built on the native <dialog> element.
 * showModal() provides modal semantics, a top-layer backdrop and makes the page behind it inert.
 * Children stay mounted while closed, so an unfinished draft is never lost by closing.
 */
export default function BuildDialog({ open, onClose, labelledBy, children }) {
  const dialogRef = useRef(null)
  const returnFocusRef = useRef(null)
  const pointerStartedOnBackdrop = useRef(false)

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return

    if (open) {
      if (!dialog.open) {
        returnFocusRef.current = document.activeElement
        dialog.showModal()
        dialog.querySelector('input, select, textarea')?.focus()
      }
      return
    }

    if (!dialog.open) return
    // Let the panel fade out before leaving the top layer.
    const timer = window.setTimeout(() => {
      dialog.close()
      const previous = returnFocusRef.current
      if (previous && previous.isConnected && typeof previous.focus === 'function') previous.focus()
    }, EXIT_MS)
    return () => window.clearTimeout(timer)
  }, [open])

  const handleCancel = (event) => {
    // Escape: route through React state so open/close stays in sync.
    event.preventDefault()
    onClose()
  }

  const handleNativeClose = () => {
    if (open) onClose()
  }

  const handlePointerDown = (event) => {
    pointerStartedOnBackdrop.current = event.target === dialogRef.current
  }

  const handleClick = (event) => {
    // Only close when both press and release happen on the backdrop (no accidental drag-outs).
    if (pointerStartedOnBackdrop.current && event.target === dialogRef.current) onClose()
    pointerStartedOnBackdrop.current = false
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={labelledBy}
      onCancel={handleCancel}
      onClose={handleNativeClose}
      onPointerDown={handlePointerDown}
      onClick={handleClick}
      className="build-dialog m-auto max-h-none w-[min(38rem,calc(100%-1.5rem))] max-w-none overflow-visible bg-transparent p-0 text-foreground"
    >
      <motion.div
        initial={false}
        animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
        transition={{ duration: open ? 0.32 : EXIT_MS / 1000, ease: EASE }}
        className="relative max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-xl border border-border bg-surface-raised shadow-[0_30px_80px_-30px_rgb(0_0_0/0.45)]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          className="absolute top-4 right-4 grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground sm:top-6 sm:right-6"
        >
          <svg
            viewBox="0 0 24 24"
            className="size-5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.75"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          </svg>
        </button>
        {children}
      </motion.div>
    </dialog>
  )
}
