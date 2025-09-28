import React from 'react';
import ShelfLine from './ShelfLine';
import ViewBox from './ViewBox';
import type { Vase } from '../types/vase';

interface ShelfSystemProps {
  vases: Vase[];
  debugMode?: boolean;
}

// Define shelf positions with perspective scaling (depth simulation)
const shelfPositions = [
  // Left wall shelves (analyzing the actual painting) - perspective: close to viewer
  { id: 'left-top', top: '18%', left: '5%', width: '18%', height: '3%', depth: 0.8 },
  { id: 'left-upper-mid', top: '28%', left: '5%', width: '18%', height: '3%', depth: 0.8 },
  { id: 'left-mid', top: '38%', left: '5%', width: '18%', height: '3%', depth: 0.8 },
  { id: 'left-lower-mid', top: '48%', left: '5%', width: '18%', height: '3%', depth: 0.8 },
  { id: 'left-bottom', top: '58%', left: '5%', width: '18%', height: '3%', depth: 0.8 },

  // Right wall shelves (multiple levels visible) - perspective: close to viewer
  { id: 'right-top', top: '18%', right: '5%', width: '20%', height: '3%', depth: 0.8 },
  { id: 'right-upper-mid', top: '28%', right: '5%', width: '20%', height: '3%', depth: 0.8 },
  { id: 'right-mid', top: '38%', right: '5%', width: '20%', height: '3%', depth: 0.8 },
  { id: 'right-lower-mid', top: '48%', right: '5%', width: '20%', height: '3%', depth: 0.8 },
  { id: 'right-bottom', top: '58%', right: '5%', width: '20%', height: '3%', depth: 0.8 },

  // Window table (back center under window) - perspective: far from viewer
  { id: 'window-table', top: '42%', left: '40%', width: '20%', height: '4%', depth: 0.5 },

  // Round foreground table - perspective: closest to viewer
  { id: 'round-table', top: '72%', left: '35%', width: '30%', height: '6%', depth: 1.0 },
];

const ShelfSystem: React.FC<ShelfSystemProps> = ({ vases, debugMode = false }) => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      {shelfPositions.map((shelf) => (
        <div key={shelf.id}>
          {/* Shelf Line - visible anchor line */}
          <ShelfLine position={shelf} debugMode={debugMode} />

          {/* ViewBox - invisible interactive area above shelf */}
          <ViewBox position={shelf} vases={vases} debugMode={debugMode} />
        </div>
      ))}
    </div>
  );
};

export default ShelfSystem;