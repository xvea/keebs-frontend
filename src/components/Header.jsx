import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

export default function Header({
  archiveTitle,
  editionCode,
  totalCount,
  onClearAll,
  onRestoreDefaults,
  // Presentation-only additions: open the add-build dialog and switch theme.
  onOpenForm,
  theme,
  onToggleTheme,
}) {
  const isDark = theme === 'dark'
  const quietButton =
    'inline-flex h-10 items-center rounded-md px-3 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground'

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE }}
      className="sticky top-0 z-30 border-b border-border bg-background"
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-3.5 sm:px-8">
        {/* Brand */}
        <div className="flex min-w-0 items-center gap-3">
          <span
            aria-hidden="true"
            className="size-6 shrink-0 rounded-[5px] bg-accent shadow-[inset_0_-3px_0_rgb(0_0_0/0.16)]"
          />
          <p className="text-lg font-semibold tracking-tight text-foreground">{archiveTitle}</p>
          {editionCode && (
            <p className="hidden truncate border-l border-border pl-3 text-sm text-muted-foreground md:block">
              {editionCode}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {totalCount > 0 ? (
            <button
              type="button"
              onClick={onClearAll}
              className={quietButton}
              title="Remove every build to see the empty collection"
            >
              <span className="sm:hidden">Clear</span>
              <span className="hidden sm:inline">Clear all</span>
            </button>
          ) : (
            <button type="button" onClick={onRestoreDefaults} className={quietButton}>
              <span className="sm:hidden">Restore</span>
              <span className="hidden sm:inline">Restore builds</span>
            </button>
          )}

          {onToggleTheme && (
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
              title={isDark ? 'Light theme' : 'Dark theme'}
              className="grid size-10 place-items-center rounded-md text-muted-foreground transition-colors hover:bg-surface-hover hover:text-foreground"
            >
              {isDark ? (
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path
                    d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  aria-hidden="true"
                >
                  <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" strokeLinejoin="round" />
                </svg>
              )}
            </button>
          )}

          {onOpenForm && (
            <motion.button
              type="button"
              onClick={onOpenForm}
              whileTap={{ scale: 0.98 }}
              className="ml-1 inline-flex h-10 items-center gap-2 rounded-md bg-primary px-4 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              <svg
                viewBox="0 0 24 24"
                className="size-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M12 5v14M5 12h14" strokeLinecap="round" />
              </svg>
              Add build
            </motion.button>
          )}
        </div>
      </div>
    </motion.header>
  )
}
