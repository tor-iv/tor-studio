import { ReactNode } from 'react'

interface ShelfViewBoxProps {
  top: string
  left: string
  width: string
  height: string
  angle?: number
  shelfId: string
  children?: ReactNode
  visible?: boolean
}

export default function ShelfViewBox({
  top,
  left,
  width,
  height,
  angle = 0,
  shelfId,
  children,
  visible = true
}: ShelfViewBoxProps) {
  return (
    <div
      className="absolute"
      style={{
        top,
        left,
        width,
        height,
        transform: `rotate(${angle}deg)`,
        transformOrigin: 'left top',
        zIndex: 5,
      }}
      data-shelf-viewbox={shelfId}
    >
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 100 100`}
        preserveAspectRatio="none"
        className="absolute inset-0"
      >
        {visible && (
          <rect
            x="0"
            y="0"
            width="100"
            height="100"
            fill="rgba(255, 0, 0, 0.2)"
            stroke="red"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
        )}
      </svg>

      {/* Container for pottery items */}
      <div className="absolute inset-0 flex items-end justify-center">
        {children}
      </div>
    </div>
  )
}