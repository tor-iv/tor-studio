import React, { useState } from 'react';
import type { Vase, ShelfPosition } from '../types/vase';
import VaseItem from './VaseItem';

interface ViewBoxProps {
  position: ShelfPosition;
  vases: Vase[];
  debugMode?: boolean;
}

const ViewBox: React.FC<ViewBoxProps> = ({ position, vases, debugMode = false }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Filter vases for this shelf
  const shelfVases = vases.filter(vase => vase.shelfId === position.id);

  // Calculate perspective-based sizing
  const depthFactor = position.depth || 0.8;
  const viewBoxHeight = Math.round(50 * depthFactor); // Scale ViewBox height based on depth

  const style: React.CSSProperties = {
    position: 'absolute',
    top: `calc(${position.top} - ${viewBoxHeight}px)`, // Position above the shelf line
    width: position.width,
    height: `${viewBoxHeight}px`, // ViewBox height scaled by depth
    backgroundColor: debugMode
      ? 'rgba(0, 255, 0, 0.2)'
      : isHovered
        ? 'rgba(255, 255, 255, 0.1)'
        : 'transparent',
    border: debugMode
      ? '2px solid rgba(0, 255, 0, 0.8)'
      : isHovered
        ? '2px dashed rgba(255, 255, 255, 0.5)'
        : 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    zIndex: 10,
    transition: 'all 0.3s ease',
    pointerEvents: 'auto',
  };

  if (position.left) {
    style.left = position.left;
  } else if (position.right) {
    style.right = position.right;
  }

  return (
    <div
      style={style}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => console.log(`Clicked ViewBox: ${position.id}`)}
      data-viewbox-id={position.id}
      title={`Shelf: ${position.id}`}
    >
      {/* Render vases in this ViewBox */}
      {shelfVases.map(vase => (
        <VaseItem key={vase.id} vase={vase} depthFactor={depthFactor} />
      ))}

      {/* Show shelf name when hovered and no vases, or always in debug mode */}
      {(debugMode || (isHovered && shelfVases.length === 0)) && (
        <div className="flex items-center justify-center h-full text-white text-xs font-semibold bg-black bg-opacity-50 rounded">
          {position.id}
        </div>
      )}
    </div>
  );
};

export default ViewBox;