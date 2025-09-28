import React from 'react';
import type { Vase } from '../types/vase';

interface VaseItemProps {
  vase: Vase;
  onClick?: () => void;
  depthFactor?: number;
}

const VaseItem: React.FC<VaseItemProps> = ({ vase, onClick, depthFactor = 0.8 }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (vase.projectLink) {
      window.open(vase.projectLink, '_blank');
    }
  };

  // Scale vase size based on depth perspective
  const scaledWidth = Math.round(vase.size.width * depthFactor);
  const scaledHeight = Math.round(vase.size.height * depthFactor);

  return (
    <div
      className="absolute cursor-pointer transition-transform hover:scale-110 hover:z-20"
      style={{
        left: `${vase.position.x}%`,
        top: `${vase.position.y}%`,
        width: `${scaledWidth}px`,
        height: `${scaledHeight}px`,
        transform: 'translate(-50%, -50%)', // Center the vase on its position
      }}
      onClick={handleClick}
      title={vase.name}
    >
      <img
        src={vase.image}
        alt={vase.name}
        className="w-full h-full object-contain drop-shadow-lg"
        loading="lazy"
      />
    </div>
  );
};

export default VaseItem;