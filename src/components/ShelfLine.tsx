interface ShelfLineProps {
  top: string
  left: string
  width: string
  angle?: number
  visible?: boolean
  shelfId?: string
}

export default function ShelfLine({
  top,
  left,
  width,
  angle = 0,
  visible = true,
  shelfId
}: ShelfLineProps) {
  console.log('ShelfLine rendering:', { top, left, width, visible, shelfId })

  return (
    <div
      className="absolute bg-red-500"
      style={{
        top,
        left,
        width,
        height: '20px',
        backgroundColor: '#ff0000',
        zIndex: 30,
        border: '2px solid black',
        fontSize: '12px',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '8px'
      }}
      data-shelf-id={shelfId}
    >
      {shelfId}
    </div>
  )
}
