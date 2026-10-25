/**
 * Presentation-only illustration of a keyboard layout.
 * It is a schematic derived solely from `layoutSize` — not a picture of any saved build.
 */

const U = 12 // one key unit in viewBox coordinates
const GAP = 1.8
const PAD = 0.45 // case padding, in units

const rep = (count, width = 1) => Array(count).fill(width)

// Rows of key widths in units. Negative numbers are horizontal gaps; `null` is a small vertical gap.
const ROWS_65 = [
  [...rep(13), 2, 1],
  [1.5, ...rep(12), 1.5, 1],
  [1.75, ...rep(11), 2.25, 1],
  [2.25, ...rep(10), 1.75, 1, 1],
  [1.25, 1.25, 1.25, 6.25, 1.25, 1.25, -0.5, 1, 1, 1],
]

const LAYOUTS = {
  '60%': [
    [...rep(13), 2],
    [1.5, ...rep(12), 1.5],
    [1.75, ...rep(11), 2.25],
    [2.25, ...rep(10), 2.75],
    [1.25, 1.25, 1.25, 6.25, 1.25, 1.25, 1.25, 1.25],
  ],
  '65%': ROWS_65,
  '75%': [[1, -0.25, ...rep(4), -0.25, ...rep(4), -0.25, ...rep(4), -0.25, 1, 1], null, ...ROWS_65],
  TKL: [
    [1, -1, ...rep(4), -0.5, ...rep(4), -0.5, ...rep(4), -0.25, 1, 1, 1],
    null,
    [...rep(13), 2, -0.25, 1, 1, 1],
    [1.5, ...rep(12), 1.5, -0.25, 1, 1, 1],
    [1.75, ...rep(11), 2.25],
    [2.25, ...rep(10), 2.75, -1.25, 1],
    [1.25, 1.25, 1.25, 6.25, 1.25, 1.25, 1.25, 1.25, -0.25, 1, 1, 1],
  ],
}

const ALICE_LEFT = [
  [1, ...rep(6)],
  [1.5, ...rep(5)],
  [1.75, ...rep(5)],
  [2.25, ...rep(5)],
  [1.5, -1, 1.5, 2.25],
]
const ALICE_RIGHT = [
  [...rep(6), 2],
  [...rep(6), 1.5],
  [...rep(5), 2.25],
  [...rep(5), 1.75, 1],
  [2.75, -1.25, 1.5],
]

function computeKeys(rows) {
  const keys = []
  let y = 0
  let width = 0
  rows.forEach((row) => {
    if (row === null) {
      y += 0.35
      return
    }
    let x = 0
    row.forEach((w) => {
      if (w < 0) {
        x += -w
        return
      }
      keys.push({ x, y, w })
      x += w
    })
    width = Math.max(width, x)
    y += 1
  })
  return { keys, width, height: y }
}

function KeyGroup({ rows, empty, accentFirst, transform }) {
  const { keys, width, height } = computeKeys(rows)
  return (
    <g transform={transform}>
      <rect
        x={-PAD * U}
        y={-PAD * U}
        width={(width + PAD * 2) * U}
        height={(height + PAD * 2) * U}
        rx={5}
        fill={empty ? 'none' : 'var(--key-case)'}
        stroke="var(--key-stroke)"
        strokeWidth={0.9}
      />
      {keys.map((key, index) => {
        const isAccent = accentFirst && !empty && index === 0
        return (
          <rect
            key={`${key.x}-${key.y}`}
            x={key.x * U + GAP / 2}
            y={key.y * U + GAP / 2}
            width={key.w * U - GAP}
            height={U - GAP}
            rx={2}
            fill={isAccent ? 'var(--accent)' : empty ? 'none' : 'var(--key)'}
            stroke={isAccent ? 'var(--accent)' : 'var(--key-stroke)'}
            strokeWidth={0.7}
            strokeDasharray={empty ? '2 2' : undefined}
            opacity={empty ? 0.8 : 1}
          />
        )
      })}
    </g>
  )
}

export default function LayoutSketch({ layoutSize, empty = false, className = '' }) {
  if (layoutSize === 'Alice') {
    const left = computeKeys(ALICE_LEFT)
    const right = computeKeys(ALICE_RIGHT)
    const split = 1.6
    const totalW = (left.width + split + right.width) * U
    const h = left.height * U
    const rightX = (left.width + split) * U
    const margin = 2.2 * U
    return (
      <svg
        viewBox={`${-margin} ${-margin} ${totalW + margin * 2} ${h + margin * 2}`}
        className={className}
        aria-hidden="true"
        focusable="false"
      >
        <KeyGroup
          rows={ALICE_LEFT}
          empty={empty}
          accentFirst
          transform={`rotate(-7 ${(left.width * U) / 2} ${h / 2})`}
        />
        <KeyGroup
          rows={ALICE_RIGHT}
          empty={empty}
          transform={`translate(${rightX} 0) rotate(7 ${(right.width * U) / 2} ${h / 2})`}
        />
      </svg>
    )
  }

  const rows = LAYOUTS[layoutSize] || LAYOUTS['65%']
  const { width, height } = computeKeys(rows)
  const margin = (PAD + 0.1) * U
  return (
    <svg
      viewBox={`${-margin} ${-margin} ${width * U + margin * 2} ${height * U + margin * 2}`}
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <KeyGroup rows={rows} empty={empty} accentFirst />
    </svg>
  )
}
