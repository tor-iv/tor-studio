import React from 'react';

interface ShelfPosition {
  id: string;
  top: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
}

interface ShelfLineProps {
  position: ShelfPosition;
  debugMode?: boolean;
}

const ShelfLine: React.FC<ShelfLineProps> = ({ position, debugMode = false }) => {
  const style: React.CSSProperties = {
    position: 'absolute',
    top: position.top,
    width: position.width,
    height: debugMode ? '4px' : '2px',
    backgroundColor: debugMode ? 'rgba(255, 0, 0, 0.8)' : 'rgba(139, 69, 19, 0.8)', // Red in debug mode
    zIndex: 5,
    boxShadow: debugMode ? '0 0 4px rgba(255, 0, 0, 0.5)' : 'none',
  };

  if (position.left) {
    style.left = position.left;
  } else if (position.right) {
    style.right = position.right;
  }

  return (
    <div
      style={style}
      className="pointer-events-none"
      data-shelf-id={position.id}
    />
  );
};

export default ShelfLine;