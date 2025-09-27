import ShelfLine from './ShelfLine'
import ShelfViewBox from './ShelfViewBox'

interface ShelfSystemProps {
  showDebugLines?: boolean
}

export default function ShelfSystem({ showDebugLines = true }: ShelfSystemProps) {
  console.log('ShelfSystem rendering, showDebugLines:', showDebugLines)

  // SHELF CONFIGURATION - Easy to adjust all positions here
  const shelfConfig = {
    // Main pottery table in center of studio
    centerTable: {
      x: 20,        // vw - horizontal position from left
      y: 74,        // vh - vertical position from top
      width: 50,    // vw - shelf width
      rotation: 5   // degrees - shelf angle
    },

    // Round table on left side of studio
    roundTable: {
      x: 15,        // vw - horizontal position
      y: 75,        // vh - vertical position
      width: 25,    // vw - shelf width
      rotation: 0   // degrees - shelf angle
    },

    // Left wall shelving unit (3 shelves)
    leftWall: {
      top: {
        x: 5,         // vw - horizontal position
        y: 30,        // vh - vertical position
        width: 18,    // vw - shelf width
        rotation: 0   // degrees - shelf angle
      },
      middle: {
        x: 5,         // vw - horizontal position
        y: 45,        // vh - vertical position
        width: 18,    // vw - shelf width
        rotation: 0   // degrees - shelf angle
      },
      bottom: {
        x: 5,         // vw - horizontal position
        y: 60,        // vh - vertical position
        width: 18,    // vw - shelf width
        rotation: 0   // degrees - shelf angle
      }
    },

    // Right wall shelving unit (3 shelves)
    rightWall: {
      top: {
        x: 77,        // vw - horizontal position
        y: 30,        // vh - vertical position
        width: 18,    // vw - shelf width
        rotation: 0   // degrees - shelf angle
      },
      middle: {
        x: 77,        // vw - horizontal position
        y: 45,        // vh - vertical position
        width: 18,    // vw - shelf width
        rotation: 0   // degrees - shelf angle
      },
      bottom: {
        x: 77,        // vw - horizontal position
        y: 60,        // vh - vertical position
        width: 18,    // vw - shelf width
        rotation: 0   // degrees - shelf angle
      }
    }
  }

  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 15 }}>
      {/* VIEWPORT DEBUG: Show viewport grid and measurements */}
      {showDebugLines && (
        <>
          {/* Viewport outline border */}
          <div
            className="absolute border-4 border-blue-500 pointer-events-none"
            style={{
              top: 0,
              left: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 50
            }}
          />

          {/* Viewport center crosshairs */}
          <div
            className="absolute bg-blue-500 pointer-events-none"
            style={{
              top: '50vh',
              left: 0,
              width: '100vw',
              height: '2px',
              zIndex: 50
            }}
          />
          <div
            className="absolute bg-blue-500 pointer-events-none"
            style={{
              top: 0,
              left: '50vw',
              width: '2px',
              height: '100vh',
              zIndex: 50
            }}
          />

          {/* Viewport measurement labels */}
          <div
            className="absolute bg-blue-500 text-white text-sm px-2 py-1 pointer-events-none"
            style={{
              top: '10px',
              left: '10px',
              zIndex: 60
            }}
          >
            0,0 (top-left)
          </div>

          <div
            className="absolute bg-blue-500 text-white text-sm px-2 py-1 pointer-events-none"
            style={{
              top: '10px',
              right: '10px',
              zIndex: 60
            }}
          >
            100vw,0 (top-right)
          </div>

          <div
            className="absolute bg-blue-500 text-white text-sm px-2 py-1 pointer-events-none"
            style={{
              bottom: '10px',
              left: '10px',
              zIndex: 60
            }}
          >
            0,100vh (bottom-left)
          </div>

          <div
            className="absolute bg-blue-500 text-white text-sm px-2 py-1 pointer-events-none"
            style={{
              bottom: '10px',
              right: '10px',
              zIndex: 60
            }}
          >
            100vw,100vh (bottom-right)
          </div>

          <div
            className="absolute bg-blue-500 text-white text-sm px-2 py-1 pointer-events-none"
            style={{
              top: 'calc(50vh - 12px)',
              left: 'calc(50vw + 10px)',
              zIndex: 60
            }}
          >
            50vw,50vh (center)
          </div>
        </>
      )}

      {/* TEST: Simple red div to verify ShelfSystem is rendering */}
      <div
        className="absolute bg-red-500"
        style={{
          top: '100px',
          left: '100px',
          width: '200px',
          height: '10px',
          zIndex: 25
        }}
      >
        SHELF SYSTEM TEST
      </div>

      {/* Center table shelf */}
      <ShelfLine
        top={`${shelfConfig.centerTable.y}%`}
        left={`${shelfConfig.centerTable.x}%`}
        width={`${shelfConfig.centerTable.width}%`}
        angle={shelfConfig.centerTable.rotation}
        visible={showDebugLines}
        shelfId="center-table"
      />

      {/* Round table shelf */}
      <ShelfLine
        top={`${shelfConfig.roundTable.y}%`}
        left={`${shelfConfig.roundTable.x}%`}
        width={`${shelfConfig.roundTable.width}%`}
        angle={shelfConfig.roundTable.rotation}
        visible={showDebugLines}
        shelfId="round-table"
      />

      {/* Left wall shelves */}
      <ShelfLine
        top={`${shelfConfig.leftWall.top.y}%`}
        left={`${shelfConfig.leftWall.top.x}%`}
        width={`${shelfConfig.leftWall.top.width}%`}
        angle={shelfConfig.leftWall.top.rotation}
        visible={showDebugLines}
        shelfId="left-shelf-top"
      />

      <ShelfLine
        top={`${shelfConfig.leftWall.middle.y}%`}
        left={`${shelfConfig.leftWall.middle.x}%`}
        width={`${shelfConfig.leftWall.middle.width}%`}
        angle={shelfConfig.leftWall.middle.rotation}
        visible={showDebugLines}
        shelfId="left-shelf-middle"
      />

      <ShelfLine
        top={`${shelfConfig.leftWall.bottom.y}%`}
        left={`${shelfConfig.leftWall.bottom.x}%`}
        width={`${shelfConfig.leftWall.bottom.width}%`}
        angle={shelfConfig.leftWall.bottom.rotation}
        visible={showDebugLines}
        shelfId="left-shelf-bottom"
      />

      {/* Right wall shelves */}
      <ShelfLine
        top={`${shelfConfig.rightWall.top.y}%`}
        left={`${shelfConfig.rightWall.top.x}%`}
        width={`${shelfConfig.rightWall.top.width}%`}
        angle={shelfConfig.rightWall.top.rotation}
        visible={showDebugLines}
        shelfId="right-shelf-top"
      />

      <ShelfLine
        top={`${shelfConfig.rightWall.middle.y}%`}
        left={`${shelfConfig.rightWall.middle.x}%`}
        width={`${shelfConfig.rightWall.middle.width}%`}
        angle={shelfConfig.rightWall.middle.rotation}
        visible={showDebugLines}
        shelfId="right-shelf-middle"
      />

      <ShelfLine
        top={`${shelfConfig.rightWall.bottom.y}%`}
        left={`${shelfConfig.rightWall.bottom.x}%`}
        width={`${shelfConfig.rightWall.bottom.width}%`}
        angle={shelfConfig.rightWall.bottom.rotation}
        visible={showDebugLines}
        shelfId="right-shelf-bottom"
      />
    </div>
  )
}