export default function TableEdgeLine() {
  // Configurable line properties
  const lineAngle = -3        // Rotation angle in degrees (negative = clockwise)
  const lineLength = 80       // Length as percentage of viewport width
  const lineHeight = 50       // Vertical position as percentage from top
  const lineThickness = 10    // Line thickness in pixels

  // Debug mode - set to true for high visibility colors during development
  const debugMode = false

  // Note: SVG calculations removed since we're using CSS div for simplicity

  return (
    <div
      className="pointer-events-none"
      style={{
        position: 'fixed',
        top: `${lineHeight}%`,
        left: '0',
        width: '100vw',
        height: '50px',
        zIndex: debugMode ? 9999 : 50,  // Reasonable z-index for production
        // Transform tricks to create new stacking context
        transform: 'translateZ(0)',
        willChange: 'transform',
        isolation: 'isolate',
        // Debug styling only when needed
        backgroundColor: debugMode ? 'rgba(255, 0, 255, 0.8)' : undefined,
        border: debugMode ? '5px solid lime' : undefined,
        boxShadow: debugMode ? '0 0 20px red' : undefined
      }}
    >
      {/* Styled table edge line */}
      <div
        style={{
          position: 'absolute',
          left: '10%',
          top: '50%',
          width: '80%',
          height: `${lineThickness}px`,
          background: debugMode
            ? 'red'
            : 'linear-gradient(to right, #654321 0%, #8B4513 25%, #A0522D 50%, #8B4513 75%, #654321 100%)',
          transform: `translateY(-50%) rotate(${lineAngle}deg)`,
          boxShadow: debugMode
            ? '0 2px 10px black'
            : '0 2px 6px rgba(0,0,0,0.4), 0 1px 2px rgba(0,0,0,0.2)',
          borderRadius: '2px',
          opacity: debugMode ? 1 : 0.8
        }}
      />

      {/* Debug text only in debug mode */}
      {debugMode && (
        <div
          style={{
            position: 'absolute',
            top: '5px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '12px',
            fontWeight: 'bold',
            textShadow: '1px 1px 2px black'
          }}
        >
          TABLE EDGE LINE - DEBUG MODE
        </div>
      )}
    </div>
  )
}