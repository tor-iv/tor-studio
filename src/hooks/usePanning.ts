
import { useState, useEffect, useRef, useCallback } from 'react'

interface PanningState {
  offsetX: number
  offsetY: number
  isPanning: boolean
}

interface PanningControls {
  panningState: PanningState
  handleMouseMove: (e: MouseEvent) => void
  handleMouseLeave: () => void
}

/**
 * Custom hook for handling edge-based panning functionality
 * @returns Object containing panning state and mouse handlers
 */
export function usePanning(): PanningControls {
  const [panningState, setPanningState] = useState<PanningState>({
    offsetX: 0,
    offsetY: 0,
    isPanning: false,
  })

  const animationRef = useRef<number | undefined>(undefined)
  const velocityRef = useRef({ x: 0, y: 0 })
  const targetVelocityRef = useRef({ x: 0, y: 0 })

  // Configuration
  const EDGE_ZONE = 50 // pixels from edge to start panning
  const MAX_SPEED = 3 // maximum pan speed in pixels per frame
  const ACCELERATION = 0.1 // how quickly velocity changes
  const FRICTION = 0.95 // velocity decay when not near edge

  // Image dimensions (actual background image size)
  const IMAGE_WIDTH = 1536
  const IMAGE_HEIGHT = 1024

  const calculateEdgeVelocity = useCallback((mouseX: number, mouseY: number) => {
    const { innerWidth: screenWidth, innerHeight: screenHeight } = window

    let targetX = 0
    let targetY = 0

    // Calculate horizontal velocity based on mouse position
    if (mouseX < EDGE_ZONE) {
      // Near left edge - pan right to reveal left side of image
      const intensity = (EDGE_ZONE - mouseX) / EDGE_ZONE
      targetX = intensity * MAX_SPEED
    } else if (mouseX > screenWidth - EDGE_ZONE) {
      // Near right edge - pan left to reveal right side of image
      const intensity = (mouseX - (screenWidth - EDGE_ZONE)) / EDGE_ZONE
      targetX = -intensity * MAX_SPEED
    }

    // Calculate vertical velocity based on mouse position
    if (mouseY < EDGE_ZONE) {
      // Near top edge - pan down to reveal top of image
      const intensity = (EDGE_ZONE - mouseY) / EDGE_ZONE
      targetY = intensity * MAX_SPEED
    } else if (mouseY > screenHeight - EDGE_ZONE) {
      // Near bottom edge - pan up to reveal bottom of image
      const intensity = (mouseY - (screenHeight - EDGE_ZONE)) / EDGE_ZONE
      targetY = -intensity * MAX_SPEED
    }

    return { x: targetX, y: targetY }
  }, [])

  const animate = useCallback(() => {
    const currentVelocity = velocityRef.current
    const targetVelocity = targetVelocityRef.current

    // Smoothly interpolate towards target velocity
    currentVelocity.x += (targetVelocity.x - currentVelocity.x) * ACCELERATION
    currentVelocity.y += (targetVelocity.y - currentVelocity.y) * ACCELERATION

    // Apply friction when target velocity is 0
    if (targetVelocity.x === 0) currentVelocity.x *= FRICTION
    if (targetVelocity.y === 0) currentVelocity.y *= FRICTION

    // Stop if velocity is very small
    if (Math.abs(currentVelocity.x) < 0.01) currentVelocity.x = 0
    if (Math.abs(currentVelocity.y) < 0.01) currentVelocity.y = 0

    const isPanning = currentVelocity.x !== 0 || currentVelocity.y !== 0

    if (isPanning) {
      setPanningState(prev => {
        const { innerWidth: screenWidth, innerHeight: screenHeight } = window

        // Calculate scale factors for the background image
        const scaleX = screenWidth / IMAGE_WIDTH
        const scaleY = screenHeight / IMAGE_HEIGHT
        const scale = Math.max(scaleX, scaleY) // object-cover behavior

        // Calculate the actual rendered image dimensions
        const renderedWidth = IMAGE_WIDTH * scale
        const renderedHeight = IMAGE_HEIGHT * scale

        // Calculate how much of the image extends beyond the viewport
        const overflowX = Math.max(0, renderedWidth - screenWidth)
        const overflowY = Math.max(0, renderedHeight - screenHeight)

        // Maximum pan distance is half the overflow (to center the viewable area)
        const maxPanX = overflowX / 2
        const maxPanY = overflowY / 2

        // Debug logging
        console.log('Debug panning:', {
          screenWidth,
          screenHeight,
          renderedWidth,
          renderedHeight,
          overflowX,
          overflowY,
          maxPanX,
          maxPanY,
          currentVelocity,
          prevOffset: { x: prev.offsetX, y: prev.offsetY }
        })

        // Apply boundaries: can pan from -maxPan to +maxPan
        // This allows viewing the entire image within its boundaries
        const newOffsetX = Math.max(-maxPanX, Math.min(maxPanX, prev.offsetX + currentVelocity.x))
        const newOffsetY = Math.max(-maxPanY, Math.min(maxPanY, prev.offsetY + currentVelocity.y))

        return {
          offsetX: newOffsetX,
          offsetY: newOffsetY,
          isPanning: true,
        }
      })

      animationRef.current = requestAnimationFrame(animate)
    } else {
      setPanningState(prev => ({ ...prev, isPanning: false }))
    }
  }, [])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const targetVelocity = calculateEdgeVelocity(e.clientX, e.clientY)
    targetVelocityRef.current = targetVelocity

    // Start animation if not already running and we have velocity
    if (!animationRef.current && (targetVelocity.x !== 0 || targetVelocity.y !== 0)) {
      animationRef.current = requestAnimationFrame(animate)
    }
  }, [calculateEdgeVelocity, animate])

  const handleMouseLeave = useCallback(() => {
    targetVelocityRef.current = { x: 0, y: 0 }
  }, [])

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return {
    panningState,
    handleMouseMove,
    handleMouseLeave,
  }
}
