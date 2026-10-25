import { motion } from 'motion/react'

export default function BuildSummary({ builds }) {
  const totalBuilds = builds.length

  const totalValuation = builds.reduce((sum, item) => sum + (Number(item.estimatedCost) || 0), 0)

  const linearCount = builds.filter((b) => b.switchType === 'Linear').length
  const tactileCount = builds.filter((b) => b.switchType === 'Tactile').length
  const clickyCount = builds.filter((b) => b.switchType === 'Clicky').length

  const formattedCurrency = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(totalValuation)

  const metrics = [
    {
      id: 'builds',
      label: 'Builds',
      value: String(totalBuilds),
      subtext: 'In your collection',
    },
    {
      id: 'value',
      label: 'Estimated value',
      value: formattedCurrency,
      subtext: 'Across every build',
    },
    {
      id: 'switches',
      label: 'Switch mix',
      value: `${linearCount} · ${tactileCount} · ${clickyCount}`,
      subtext: 'Linear, tactile and clicky',
    },
    {
      id: 'mounting',
      label: 'Latest mounting',
      value: totalBuilds > 0 ? builds[0].mountingStyle.replace(' Mount', '') : '—',
      subtext: 'From the most recent build',
    },
  ]

  return (
    <motion.section
      aria-label="Collection summary"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
    >
      <dl className="grid grid-cols-2 gap-x-8 gap-y-7">
        {metrics.map((metric) => (
          <div key={metric.id} className="border-t border-border pt-3">
            <dt className="text-sm text-muted-foreground">{metric.label}</dt>
            <dd className="mt-1.5 text-lg font-semibold tracking-tight text-foreground tabular-nums">{metric.value}</dd>
            <dd className="mt-0.5 text-xs text-muted-foreground">{metric.subtext}</dd>
          </div>
        ))}
      </dl>
    </motion.section>
  )
}
