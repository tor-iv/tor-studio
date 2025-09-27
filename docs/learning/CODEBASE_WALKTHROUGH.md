# Codebase Walkthrough

*A detailed explanation of every component in your TORS-BORED STUDIO project*

## Project Structure Overview

```
src/
├── main.tsx              # App entry point
├── App.tsx               # Root component
├── components/           # All UI components
│   ├── Studio.tsx        # Main background container
│   ├── StudioTitle.tsx   # Fixed title component
│   ├── InteractiveVases.tsx  # Manages all vases
│   ├── VaseItem.tsx      # Reusable vase component
│   ├── ShelfVase.tsx     # Specific vase on shelf
│   ├── ShelfVase4.tsx    # Another shelf vase
│   └── ShelfLine.tsx     # Shelf container
├── hooks/                # Custom React hooks
│   ├── usePanning.ts     # Edge-based panning logic
│   └── useResponsiveDesign.ts  # Responsive breakpoints
├── lib/                  # Data and utilities
│   ├── types.ts          # TypeScript interfaces
│   ├── vase-data.ts      # Project data
│   └── images.ts         # Image imports
└── styles/
    └── globals.css       # Global styles
```

## File-by-File Breakdown

### Entry Point: main.tsx

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/globals.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

**What this does:**
- Finds the HTML element with id 'root' in your HTML file
- Creates a React root and renders your App component inside it
- `StrictMode` helps catch bugs during development
- Imports global CSS styles

### Root Component: App.tsx

```tsx
import Studio from './components/Studio'
import StudioTitle from './components/StudioTitle'
import InteractiveVases from './components/InteractiveVases'

export default function App() {
  return (
    <main>
      <StudioTitle />
      <Studio>
        <InteractiveVases />
      </Studio>
    </main>
  )
}
```

**What this does:**
- Combines the main pieces of your app
- `StudioTitle` is positioned independently (fixed title)
- `Studio` provides the background
- `InteractiveVases` contains all the clickable pottery

**Data flow:** App → Studio → InteractiveVases → Individual Vases

### Background Container: Studio.tsx

```tsx
interface StudioProps {
  children?: ReactNode  // Type definition for child components
}

export default function Studio({ children }: StudioProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="images/background.jpeg"
          alt="Pottery studio background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Overlay Container for positioned elements */}
      <div className="absolute inset-0 z-10">
        {children}
      </div>
    </div>
  )
}
```

**What this does:**
- Creates a full-screen container (`h-screen w-full`)
- Sets the background image with `object-cover` (fills container, maintains aspect ratio)
- Creates a layered structure with z-index
- `{children}` renders whatever is passed between `<Studio></Studio>` tags

**CSS Classes Explained:**
- `relative`: Positioning context for absolute children
- `absolute inset-0`: Positions element at all edges (top:0, right:0, bottom:0, left:0)
- `object-cover`: Makes image fill container while maintaining aspect ratio
- `z-10`: Stacking order (higher numbers appear on top)

### Vase Manager: InteractiveVases.tsx

```tsx
import VaseItem from './VaseItem'
import ShelfVase from './ShelfVase'
import ShelfVase4 from './ShelfVase4'
import ShelfLine from './ShelfLine'
import { vaseData } from '../lib/vase-data'

export default function InteractiveVases() {
  // Event handlers for different vases
  const handleVaseClick = (vaseId: string) => {
    console.log(`Clicked on vase: ${vaseId}`)
    // TODO: Open project modal
  }

  const handleShelfVaseClick = () => {
    console.log('Clicked on shelf vase')
    // TODO: Open project modal for shelf vase
  }

  // Get specific vase data
  const godoVase = vaseData.find(vase => vase.id === 'godo')

  return (
    <ShelfLine>
      <ShelfVase onVaseClick={handleShelfVaseClick} />
      <ShelfVase4 onVaseClick={handleVase4Click} />

      {godoVase && (
        <VaseItem
          vaseData={godoVase}
          onClick={() => handleVaseClick(godoVase.id)}
        />
      )}
    </ShelfLine>
  )
}
```

**What this does:**
- Orchestrates all the interactive pottery pieces
- Defines click handlers for each vase type
- Filters data to get specific vases
- Passes data and functions to child components via props

**Key patterns:**
- `find()` searches array for matching item
- `&&` is conditional rendering (only render if condition is true)
- Functions are passed as props to handle events

### Reusable Vase: VaseItem.tsx

This is a complex component, so let's break it down section by section:

#### Props and State
```tsx
interface VaseItemProps {
  vaseData: VaseData    // Project data for this vase
  onClick?: () => void  // Optional click handler
}

export default function VaseItem({ vaseData, onClick }: VaseItemProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { image, position, project } = vaseData
  const { isMobile, isTablet, screenWidth, screenHeight } = useResponsiveDesign()
```

**What this means:**
- Component receives vase data and optional click function
- Tracks hover state locally
- Destructures data for easier access
- Gets responsive design info from custom hook

#### Positioning Logic
```tsx
const percentagePosition = {
  left: `${position.x}%`,
  top: `${position.y}%`,
  width: `${position.width}%`,
  height: `${position.height}%`,
}

const scalingFactor = Math.min(screenWidth / 1536, screenHeight / 1024)
```

**What this means:**
- Converts position data to CSS percentage values
- Calculates scaling factor based on screen size vs design size (1536x1024)
- Ensures vases maintain correct relative sizes across devices

#### Hover Effects
```tsx
<div
  style={{
    ...percentagePosition,
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    zIndex: isHovered ? 30 : 20,
  }}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
```

**What this means:**
- Spreads position styles into the element
- Scales up slightly on hover for feedback
- Brings hovered vase to front with higher z-index
- Mouse events update the hover state

#### Conditional Content
```tsx
{isHovered && (
  <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60">
    <h3>{project.title}</h3>
    <p>{project.subtitle}</p>
    {project.technologies.map((tech, index) => (
      <span key={index}>{tech}</span>
    ))}
  </div>
)}
```

**What this means:**
- Only shows overlay when hovered
- Creates centered flex layout
- Displays project information
- Maps over technology array to create multiple spans

### Specific Vase: ShelfVase.tsx

```tsx
export default function ShelfVase({ onVaseClick }: ShelfVaseProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="absolute cursor-pointer shelf-vase-container"
      style={{
        left: '48%',
        top: '38%',
        width: '10%',
        height: '16%',
        transform: 'translate(-50%, -50%)',
        zIndex: isHovered ? 35 : 30,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onVaseClick}
    >
      {/* Natural shadow */}
      <div style={{
        bottom: '-8%',
        background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, transparent 100%)',
        filter: 'blur(3px)',
      }} />

      {/* Vase image with filters */}
      <img
        src="images/vase3.png"
        style={{
          filter: isHovered
            ? 'brightness(1.15) contrast(1.05) sepia(0.15) saturate(1.1)'
            : 'brightness(1.05) contrast(1.02) sepia(0.1) saturate(1.05)',
          transform: isHovered ? 'scale(1.02)' : 'scale(1)',
        }}
      />
    </div>
  )
}
```

**What this does:**
- Creates a specifically positioned vase (hardcoded coordinates)
- Adds realistic shadow with radial gradient
- Applies image filters for visual effects
- `translate(-50%, -50%)` centers the element on its position point

**CSS Filter Effects:**
- `brightness()`: Makes image lighter/darker
- `contrast()`: Adjusts color contrast
- `sepia()`: Adds brownish tone
- `saturate()`: Intensifies colors
- `drop-shadow()`: Adds shadow effect

## Data Flow Example

Here's how data moves through your app:

1. **vase-data.ts**: Contains project information
```tsx
export const vaseData: VaseData[] = [
  {
    id: 'godo',
    image: '/images/vase3.png',
    position: { x: 27.34, y: 37.11, width: 7.81, height: 15.63 },
    project: {
      title: 'GODO',
      subtitle: 'Find stuff to do near you',
      // ... more project data
    }
  }
]
```

2. **InteractiveVases.tsx**: Finds and passes data
```tsx
const godoVase = vaseData.find(vase => vase.id === 'godo')
return (
  <VaseItem
    vaseData={godoVase}
    onClick={() => handleVaseClick(godoVase.id)}
  />
)
```

3. **VaseItem.tsx**: Receives and uses data
```tsx
export default function VaseItem({ vaseData, onClick }: VaseItemProps) {
  const { image, position, project } = vaseData
  return (
    <div onClick={onClick}>
      <img src={image} alt={project.title} />
      <h3>{project.title}</h3>
    </div>
  )
}
```

## Event Flow Example

When a user hovers over a vase:

1. Mouse enters vase area
2. `onMouseEnter` event fires
3. `setIsHovered(true)` is called
4. Component re-renders with new state
5. CSS styles change based on `isHovered` value
6. Visual effects (scale, glow, overlay) appear
7. Mouse leaves → `onMouseLeave` → `setIsHovered(false)` → effects disappear

## File Dependencies

- **main.tsx** → App.tsx
- **App.tsx** → Studio.tsx, StudioTitle.tsx, InteractiveVases.tsx
- **InteractiveVases.tsx** → VaseItem.tsx, ShelfVase.tsx, ShelfVase4.tsx, ShelfLine.tsx, vase-data.ts
- **VaseItem.tsx** → types.ts, useResponsiveDesign.ts
- **ShelfVase.tsx** → (no dependencies, self-contained)

This structure makes the code modular and reusable. Each component has a specific responsibility and can be tested or modified independently.