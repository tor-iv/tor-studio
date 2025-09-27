import ShelfSystem from './components/ShelfSystem'

export default function App() {
  return (
    <div className="relative min-w-full min-h-screen">
      {/* Background layer with scrolling capability */}
      <div className="relative z-0" style={{ minWidth: '100vw', minHeight: '100vh' }}>
        <img
          src="images/background.jpeg"
          alt="Pottery studio background"
          style={{
            width: '100%',
            height: '100%',
            minWidth: '100vw',
            minHeight: '100vh',
            objectFit: 'cover',
            display: 'block'
          }}
        />

        {/* Shelf overlay layer - positioned relative to background */}
        <div className="absolute inset-0 z-10">
          <ShelfSystem showDebugLines={true} />
        </div>
      </div>

      {/* Test overlay to verify layering */}
      <div
        className="absolute top-4 left-4 w-20 h-20 bg-yellow-400 z-20"
        style={{ border: '2px solid black' }}
      >
        TEST
      </div>

      {/* VIEWPORT DEBUG OVERLAY - Multiple visual techniques for guaranteed visibility */}

      {/* Test element to verify fixed positioning works */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: '50px',
          left: '50px',
          width: '100px',
          height: '100px',
          backgroundColor: 'magenta',
          zIndex: 200,
          border: '5px solid yellow'
        }}
      >
        FIXED TEST
      </div>

      {/* Viewport outline using multiple methods */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          border: '8px solid #00FF00',
          outline: '4px solid #FF0000',
          boxShadow: 'inset 0 0 20px #0000FF, 0 0 20px #FFFF00',
          zIndex: 100
        }}
      />

      {/* Viewport center crosshairs with inline styles */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: '50vh',
          left: 0,
          width: '100vw',
          height: '6px',
          backgroundColor: '#00FF00',
          zIndex: 100
        }}
      />
      <div
        className="fixed pointer-events-none"
        style={{
          top: 0,
          left: '50vw',
          width: '6px',
          height: '100vh',
          backgroundColor: '#00FF00',
          zIndex: 100
        }}
      />

      {/* Viewport corner labels with inline background */}
      <div
        className="fixed pointer-events-none"
        style={{
          top: '10px',
          left: '10px',
          backgroundColor: '#0000FF',
          color: 'white',
          padding: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          zIndex: 101
        }}
      >
        0,0 (top-left)
      </div>

      <div
        className="fixed pointer-events-none"
        style={{
          top: '10px',
          right: '10px',
          backgroundColor: '#0000FF',
          color: 'white',
          padding: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          zIndex: 101
        }}
      >
        100vw,0 (top-right)
      </div>

      <div
        className="fixed pointer-events-none"
        style={{
          bottom: '10px',
          left: '10px',
          backgroundColor: '#0000FF',
          color: 'white',
          padding: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          zIndex: 101
        }}
      >
        0,100vh (bottom-left)
      </div>

      <div
        className="fixed pointer-events-none"
        style={{
          bottom: '10px',
          right: '10px',
          backgroundColor: '#0000FF',
          color: 'white',
          padding: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          zIndex: 101
        }}
      >
        100vw,100vh (bottom-right)
      </div>

      <div
        className="fixed pointer-events-none"
        style={{
          top: 'calc(50vh - 16px)',
          left: 'calc(50vw + 20px)',
          backgroundColor: '#0000FF',
          color: 'white',
          padding: '8px',
          fontSize: '14px',
          fontWeight: 'bold',
          zIndex: 101
        }}
      >
        50vw,50vh (center)
      </div>
    </div>
  )
}