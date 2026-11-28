// Draws a rainbow loom bracelet: a ring of overlapping rubber band loops
// with a C clip in place of one loop, so we don't need any photos.
export function BraceletArt({
  colors,
  size = 240,
}: {
  colors: ReadonlyArray<string>
  size?: number
}) {
  const count = 14
  const radius = 35
  const loops = Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2 - Math.PI / 2
    return {
      x: 50 + radius * Math.cos(angle),
      y: 50 + radius * Math.sin(angle),
      rotate: (angle * 180) / Math.PI + 90,
      color: colors[i % colors.length],
    }
  })

  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      role="img"
      aria-label="Illustration of a rainbow loom bracelet"
      className="max-w-full"
    >
      {loops.map((l, i) =>
        i === 0 ? null : (
          <g key={i} transform={`translate(${l.x} ${l.y}) rotate(${l.rotate})`}>
            <ellipse
              rx="10"
              ry="5.2"
              fill="none"
              stroke="rgba(0,0,0,0.22)"
              strokeWidth="3.6"
            />
            <ellipse
              rx="10"
              ry="5.2"
              fill="none"
              stroke={l.color}
              strokeWidth="2.6"
            />
          </g>
        ),
      )}
      <CClip x={50} y={50 - radius} />
    </svg>
  )
}

// A plastic "C" clip. It takes the place of one loop in the chain, turned so
// its opening faces outward and the two neighboring loops are held inside it.
function CClip({ x, y }: { x: number; y: number }) {
  const d =
    'M -3 -3.4 L -5.2 -3.4 Q -7 -3.4 -7 -1.4 L -7 1.4 Q -7 3.4 -5.2 3.4 L 5.2 3.4 Q 7 3.4 7 1.4 L 7 -1.4 Q 7 -3.4 5.2 -3.4 L 3 -3.4'
  const color = '#18181b'
  const edge = 'rgba(255,255,255,0.35)'
  return (
    <g transform={`translate(${x} ${y})`}>
      <path
        d={d}
        fill="none"
        stroke={edge}
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  )
}
