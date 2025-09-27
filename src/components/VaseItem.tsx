'use client'

import Image from 'next/image'
import { useState } from 'react'
import { VaseData } from '@/lib/types'
import { useResponsiveDesign, getResponsiveFontSize } from '@/hooks/useResponsiveDesign'

interface VaseItemProps {
  vaseData: VaseData
  onClick?: () => void
}

export default function VaseItem({ vaseData, onClick }: VaseItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { image, position, project } = vaseData
  const { isMobile, isTablet, screenWidth, screenHeight } = useResponsiveDesign()

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  // Use percentage-based positioning relative to container
  // Position values are already in percentages from vase-data.ts
  const percentagePosition = {
    left: `${position.x}%`,
    top: `${position.y}%`,
    width: `${position.width}%`,
    height: `${position.height}%`,
  }

  // Calculate scaling factor for text and effects based on container size
  const scalingFactor = Math.min(screenWidth / 1536, screenHeight / 1024)

  return (
    <div
      className="absolute cursor-pointer vase-container group"
      style={{
        ...percentagePosition,
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        zIndex: isHovered ? 30 : 20,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Vase Image */}
      <Image
        src={image}
        alt={project.title}
        fill
        className={`object-contain transition-all duration-300 ${
          isHovered ? 'brightness-110 drop-shadow-lg' : 'drop-shadow-md'
        }`}
        style={{
          filter: isHovered
            ? 'drop-shadow(0 12px 20px rgba(0, 0, 0, 0.4)) brightness(1.1)'
            : 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2))'
        }}
      />

      {/* Hover Overlay with Project Info */}
      {isHovered && (
        <div
          className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60 rounded-lg transition-opacity duration-300 vase-overlay"
          style={{ zIndex: 35 }}
        >
          <div
            className="text-center px-3 py-2"
            style={{
              padding: isMobile ? '8px' : isTablet ? '12px' : '16px',
            }}
          >
            <h3
              className="text-white font-bold mb-1 drop-shadow-lg"
              style={{
                fontSize: getResponsiveFontSize(18, scalingFactor),
                marginBottom: isMobile ? '4px' : '8px',
              }}
            >
              {project.title}
            </h3>
            <p
              className="text-white opacity-90 drop-shadow-md"
              style={{
                fontSize: getResponsiveFontSize(14, scalingFactor),
              }}
            >
              {project.subtitle}
            </p>

            {/* Technology Stack Preview */}
            <div
              className="mt-2 flex flex-wrap justify-center gap-1"
              style={{
                marginTop: isMobile ? '6px' : '12px',
                gap: isMobile ? '4px' : '6px',
              }}
            >
              {project.technologies.slice(0, isMobile ? 2 : 3).map((tech, index) => (
                <span
                  key={index}
                  className="bg-white bg-opacity-20 text-white rounded-full backdrop-blur-sm"
                  style={{
                    fontSize: getResponsiveFontSize(11, scalingFactor),
                    padding: isMobile ? '2px 6px' : isTablet ? '3px 8px' : '4px 10px',
                  }}
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > (isMobile ? 2 : 3) && (
                <span
                  className="text-white opacity-70"
                  style={{
                    fontSize: getResponsiveFontSize(10, scalingFactor),
                  }}
                >
                  +{project.technologies.length - (isMobile ? 2 : 3)} more
                </span>
              )}
            </div>

            {/* Click prompt */}
            <p
              className="text-white mt-3 opacity-80 animate-pulse"
              style={{
                fontSize: getResponsiveFontSize(10, scalingFactor),
                marginTop: isMobile ? '8px' : '12px',
              }}
            >
              Click to learn more
            </p>
          </div>
        </div>
      )}

      {/* Subtle glow effect for interactivity hint */}
      <div
        className={`absolute inset-0 rounded-lg transition-all duration-300 pointer-events-none ${
          isHovered ? 'ring-2 ring-white ring-opacity-30' : ''
        }`}
        style={{
          boxShadow: isHovered
            ? '0 0 20px rgba(255, 255, 255, 0.1)'
            : 'none',
        }}
      />
    </div>
  )
}