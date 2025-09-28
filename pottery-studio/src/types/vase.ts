export interface Vase {
  id: string;
  name: string;
  image: string;
  shelfId: string;
  position: {
    x: number; // Percentage within the ViewBox
    y: number; // Percentage within the ViewBox
  };
  size: {
    width: number; // Pixels
    height: number; // Pixels
  };
  projectLink?: string;
}

export interface ShelfPosition {
  id: string;
  top: string;
  left?: string;
  right?: string;
  width: string;
  height: string;
  depth?: number; // Perspective depth factor (0.5 = far, 1.0 = close)
}