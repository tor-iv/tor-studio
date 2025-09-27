'use client'

import { useResponsiveDesign } from '@/hooks/useResponsiveDesign'

interface ShelfLineProps {
  children: React.ReactNode
}

export default function ShelfLine({ children }: ShelfLineProps) {
  const { screenWidth, screenHeight } = useResponsiveDesign()

  // Calculate the shelf line position based on the middle table surface
  // This creates a horizontal reference line that all shelf items will align to
  const shelfLinePosition = 45 // Percentage from top where the shelf line sits

  // Calculate scaling factor to maintain proportions
  const scalingFactor = Math.min(screenWidth / 1536, screenHeight / 1024)

  return (
    <div className="relative w-full h-full">
      {/* Shelf constraint container */}
      <div
        className="relative w-full h-full"
        style={{
          '--shelf-line-position': `${shelfLinePosition}%`,
          '--scaling-factor': scalingFactor,
        } as React.CSSProperties}
      >
        {children}
      </div>
    </div>
  )
}
