import BuildCard from './BuildCard'
import LayoutSketch from './LayoutSketch'
import { AnimatePresence, motion } from 'motion/react'

// `onOpenForm` is an additive, presentation-only prop used by the empty state's "Add build" action.
export default function BuildList({ builds, onOpenForm }) {
  const heading = (
    <div className="mb-2 flex items-baseline justify-between gap-4">
      <h2 id="collection-title" className="text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        Your collection
      </h2>
      <p className="text-sm text-muted-foreground tabular-nums">
        {builds.length} {builds.length === 1 ? 'build' : 'builds'}
      </p>
    </div>
  )

  // Conditional Rendering (Point 5c)
  if (builds.length === 0) {
    return (
      <section aria-labelledby="collection-title">
        {heading}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="grid items-center gap-10 border-t border-border py-16 md:grid-cols-12 md:gap-12 md:py-24"
        >
          <div className="md:col-span-5">
            <div className="rounded-lg bg-surface px-8 py-10">
              <LayoutSketch layoutSize="65%" empty className="h-auto w-full" />
            </div>
          </div>
          <div className="md:col-span-7">
            <p className="text-3xl font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-4xl">
              Belum ada data Keyboard Build
            </p>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-muted-foreground">
              Your collection is empty for now. Add your first board, with its kit, switches, keycaps and sound, and it
              will appear here.
            </p>
            {onOpenForm && (
              <motion.button
                type="button"
                onClick={onOpenForm}
                whileTap={{ scale: 0.98 }}
                className="mt-8 inline-flex h-11 items-center gap-2 rounded-md bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
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
        </motion.div>
      </section>
    )
  }

  // Render List with unique key (Point 5a)
  return (
    <section aria-labelledby="collection-title">
      {heading}
      <motion.div layout className="border-b border-border">
        <AnimatePresence mode="popLayout">
          {builds.map((build, idx) => (
            <BuildCard
              key={build.id}
              indexNumber={builds.length - idx}
              buildName={build.buildName}
              baseKit={build.baseKit}
              layoutSize={build.layoutSize}
              mountingStyle={build.mountingStyle}
              switchModel={build.switchModel}
              switchType={build.switchType}
              keycapSet={build.keycapSet}
              soundProfile={build.soundProfile}
              estimatedCost={build.estimatedCost}
            />
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
