import LayoutSketch from './LayoutSketch'
import { motion } from 'motion/react'

export default function BuildCard({
  indexNumber,
  buildName,
  baseKit,
  layoutSize,
  mountingStyle,
  switchModel,
  switchType,
  keycapSet,
  soundProfile,
  estimatedCost,
}) {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(Number(estimatedCost) || 0)

  const details = [
    { label: 'Switches', value: switchModel, note: `${switchType} switch` },
    { label: 'Keycaps', value: keycapSet },
    { label: 'Mounting', value: mountingStyle },
    { label: 'Sound profile', value: soundProfile },
  ]

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group grid gap-6 border-t border-border py-9 md:grid-cols-12 md:gap-10 lg:py-12"
    >
      {/* Illustrative layout sketch — derived from layoutSize, not a photo of the build */}
      <figure className="md:col-span-5 lg:col-span-4">
        <div className="rounded-lg bg-surface px-6 py-9 transition-colors duration-300 group-hover:bg-surface-hover sm:px-8">
          <LayoutSketch
            layoutSize={layoutSize}
            className="h-auto w-full transition-transform duration-500 ease-out group-hover:-translate-y-0.5"
          />
        </div>
        <figcaption className="mt-3 flex items-baseline justify-between text-xs text-muted-foreground">
          <span>
            <span className="font-medium text-foreground">{layoutSize}</span> layout
          </span>
          <span>Illustration</span>
        </figcaption>
      </figure>

      <div className="min-w-0 md:col-span-7 lg:col-span-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between lg:gap-10">
          <div className="min-w-0">
            <p className="font-mono-tech text-xs text-muted-foreground">No. {String(indexNumber).padStart(2, '0')}</p>
            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.02em] text-balance text-foreground sm:text-[2rem] sm:leading-tight">
              {buildName}
            </h3>
            <p className="mt-2 text-[15px] text-muted-foreground">{baseKit}</p>
          </div>

          <p className="shrink-0 lg:pt-6 lg:text-right">
            <span className="block text-xs text-muted-foreground">Estimated value</span>
            <span className="mt-0.5 block text-lg font-semibold text-foreground tabular-nums">{formattedPrice}</span>
          </p>
        </div>

        <dl className="mt-8 grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2 xl:grid-cols-4">
          {details.map((detail) => (
            <div key={detail.label} className="min-w-0">
              <dt className="text-xs text-muted-foreground">{detail.label}</dt>
              <dd className="mt-1 text-sm leading-snug font-medium break-words text-foreground">{detail.value}</dd>
              {detail.note && <dd className="mt-0.5 text-xs text-muted-foreground">{detail.note}</dd>}
            </div>
          ))}
        </dl>
      </div>
    </motion.article>
  )
}
