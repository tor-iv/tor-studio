import { useState } from 'react'

interface ShelfVaseProps {
  onVaseClick?: () => void
}

export default function ShelfVase({ onVaseClick }: ShelfVaseProps) {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (onVaseClick) {
      onVaseClick()
    }
  }

  return (
    <div
      className="absolute cursor-pointer shelf-vase-container"
      style={{
        // Position on central table above existing pottery
        left: '48%',
        top: '38%',
        width: '10%',
        height: '16%',
        transform: 'translate(-50%, -50%)',
        zIndex: isHovered ? 35 : 30,
        transformOrigin: 'bottom center',
        // Temporary debug background to verify positioning
        // backgroundColor: 'rgba(255, 0, 0, 0.3)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Natural shadow beneath vase */}
      <div
        className="absolute"
        style={{
          bottom: '-8%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '80%',
          height: '10%',
          background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%)',
          borderRadius: '50%',
          filter: 'blur(3px)',
        }}
      />

      {/* Vase Image with natural blending */}
      <img
        src="images/vase3.png"
        alt="Pottery piece on shelf"
        className="absolute inset-0 w-full h-full object-contain transition-all duration-300"
        style={{
          filter: isHovered
            ? 'brightness(1.15) contrast(1.05) sepia(0.15) saturate(1.1) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))'
            : 'brightness(1.05) contrast(1.02) sepia(0.1) saturate(1.05) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
          transformOrigin: 'bottom center',
        }}
      />

      {/* Subtle glow effect for interactivity */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(circle at center, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
            borderRadius: '50%',
          }}
        />
      )}
    </div>
  )
}
