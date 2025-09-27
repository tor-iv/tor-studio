'use client'

import { useState, useEffect } from 'react'

interface BreakpointValues {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  screenWidth: number
  screenHeight: number
  aspectRatio: number
}

/**
 * Custom hook to handle responsive design breakpoints and viewport information
 * @returns Object containing breakpoint booleans and viewport dimensions
 */
export function useResponsiveDesign(): BreakpointValues {
  const [breakpoints, setBreakpoints] = useState<BreakpointValues>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 1920,
    screenHeight: 1080,
    aspectRatio: 1920 / 1080,
  })

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      const aspectRatio = width / height

      setBreakpoints({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        screenWidth: width,
        screenHeight: height,
        aspectRatio,
      })
    }

    // Set initial values
    updateBreakpoints()

    // Add event listener for window resize
    window.addEventListener('resize', updateBreakpoints)

    // Cleanup
    return () => window.removeEventListener('resize', updateBreakpoints)
  }, [])

  return breakpoints
}

/**
 * Get responsive font size based on viewport
 * @param baseSize Base font size in pixels
 * @param scalingFactor Scaling factor (calculated from viewport dimensions)
 * @returns Responsive font size as CSS string
 */
export function getResponsiveFontSize(
  baseSize: number,
  scalingFactor: number
): string {
  const scaledSize = Math.max(12, baseSize * scalingFactor)
  return `${scaledSize}px`
}