# TORS-BORED Studio - Component API Reference

*Complete API documentation for all components, hooks, and utilities*

## Component Overview

The TORS-BORED Studio application is built with a modular component architecture. Each component has a specific responsibility and well-defined API.

### Component Hierarchy
```
App
├── StudioTitle
└── Studio
    └── InteractiveVases
        └── ShelfLine
            ├── TableEdgeLine
            ├── ShelfVase
            ├── ShelfVase4
            └── VaseItem
```

---

## Core Components

### App.tsx

**Purpose**: Root application component that sets up the basic layout structure.

**Props**: None

**Usage**:
```typescript
import App from './App'

// Rendered in main.tsx
<App />
```

**Structure**:
```typescript
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

**Responsibilities**:
- Sets up main semantic structure
- Combines title and studio components
- Provides entry point for the application

---

### Studio.tsx

**Purpose**: Main background container that provides the pottery studio environment.

**Props**:
```typescript
interface StudioProps {
  children?: ReactNode
}
```

**API**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | No | Components to render over the background |

**Usage**:
```typescript
import Studio from './components/Studio'

<Studio>
  <InteractiveVases />
</Studio>
```

**Features**:
- Full-screen background image display
- Layered overlay system with z-index management
- Responsive background sizing with `object-cover`
- Container for all interactive elements

**CSS Classes**:
- `.relative`: Positioning context for absolute children
- `.w-full.h-screen`: Full viewport coverage
- `.overflow-hidden`: Prevents scrollbars

---

### StudioTitle.tsx

**Purpose**: Fixed title overlay that displays the studio name with hover effects.

**Props**: None

**State**:
```typescript
const [isHovered, setIsHovered] = useState(false)
```

**Usage**:
```typescript
import StudioTitle from './components/StudioTitle'

<StudioTitle />
```

**Features**:
- Fixed positioning at top center
- Responsive sizing (50vw with constraints)
- Hover effects with scale and drop shadow
- Aspect ratio maintained via padding-bottom

**Responsive Behavior**:
- **Width**: 50vw with max-width: 800px, min-width: 300px
- **Aspect Ratio**: 30% height relative to width
- **Hover Effects**: 5% scale increase with enhanced shadow

---

### InteractiveVases.tsx

**Purpose**: Orchestrates all interactive pottery elements and manages their click events.

**Props**: None

**State**: None (uses local functions for event handling)

**Event Handlers**:
```typescript
const handleVaseClick = (vaseId: string) => void
const handleShelfVaseClick = () => void
const handleVase4Click = () => void
```

**Usage**:
```typescript
import InteractiveVases from './components/InteractiveVases'

<InteractiveVases />
```

**Data Processing**:
```typescript
// Filters vase data for specific vases
const godoVase = vaseData.find(vase => vase.id === 'godo')
```

**Features**:
- Central event coordination
- Data filtering and distribution
- Console logging for debugging
- Prepared for modal integration

---

### ShelfLine.tsx

**Purpose**: Layout container that provides positioning constraints and scaling context for shelf items.

**Props**:
```typescript
interface ShelfLineProps {
  children: React.ReactNode
}
```

**API**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `React.ReactNode` | Yes | Components to position within the shelf line |

**CSS Custom Properties**:
```typescript
style={{
  '--shelf-line-position': `${shelfLinePosition}%`,
  '--scaling-factor': scalingFactor,
} as React.CSSProperties}
```

**Usage**:
```typescript
import ShelfLine from './components/ShelfLine'

<ShelfLine>
  <VaseItem vaseData={data} />
  <ShelfVase onVaseClick={handler} />
</ShelfLine>
```

**Features**:
- Provides consistent positioning reference
- Calculates responsive scaling factor
- Sets CSS custom properties for child components

---

### VaseItem.tsx

**Purpose**: Reusable component for displaying portfolio pieces with hover effects and project information.

**Props**:
```typescript
interface VaseItemProps {
  vaseData: VaseData
  onClick?: () => void
}
```

**API**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `vaseData` | `VaseData` | Yes | Complete vase and project information |
| `onClick` | `() => void` | No | Callback for click events |

**State**:
```typescript
const [isHovered, setIsHovered] = useState(false)
```

**Usage**:
```typescript
import VaseItem from './components/VaseItem'

const vaseData = {
  id: 'project-id',
  image: 'images/vase.png',
  position: { x: 25, y: 30, width: 8, height: 12 },
  project: { /* project details */ }
}

<VaseItem
  vaseData={vaseData}
  onClick={() => console.log('Clicked!')}
/>
```

**Features**:
- Percentage-based positioning
- Responsive scaling with screen size
- Hover overlay with project information
- Technology stack display with responsive limits
- Smooth transitions and transforms

**Responsive Behavior**:
- **Mobile**: Shows 2 technologies + "more" indicator
- **Tablet/Desktop**: Shows 3 technologies + "more" indicator
- **Scaling**: Font sizes scale with screen size
- **Transform Origin**: `center` for natural scaling

---

### ShelfVase.tsx

**Purpose**: Specifically positioned vase component for the center table location.

**Props**:
```typescript
interface ShelfVaseProps {
  onVaseClick?: () => void
}
```

**API**:
| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `onVaseClick` | `() => void` | No | Callback for click events |

**State**:
```typescript
const [isHovered, setIsHovered] = useState(false)
```

**Fixed Positioning**:
```typescript
style={{
  left: '48%',
  top: '38%',
  width: '10%',
  height: '16%',
  transform: 'translate(-50%, -50%)',
}}
```

**Usage**:
```typescript
import ShelfVase from './components/ShelfVase'

<ShelfVase onVaseClick={() => console.log('Shelf vase clicked')} />
```

**Features**:
- Hardcoded positioning for center table
- Realistic shadow effect with radial gradient
- Progressive filter enhancement on hover
- Transform origin at bottom center
- Scale and glow effects

**Visual Effects**:
- **Shadow**: Radial gradient with blur filter
- **Hover Filters**: Brightness, contrast, sepia, saturation adjustments
- **Transform**: 2% scale increase with bottom-center origin

---

### ShelfVase4.tsx

**Purpose**: Another specifically positioned vase component (similar to ShelfVase but different location).

**Props**:
```typescript
interface ShelfVase4Props {
  onVaseClick?: () => void
}
```

**API**: Same as ShelfVase.tsx

**Usage**: Same pattern as ShelfVase with different positioning values.

---

### TableEdgeLine.tsx

**Purpose**: SVG component that renders a visual representation of the round table's front edge.

**Props**: None

**Usage**:
```typescript
import TableEdgeLine from './components/TableEdgeLine'

<TableEdgeLine />
```

**Features**:
- SVG-based curved line following table edge
- Responsive scaling with screen size
- Gradient coloring for realistic depth
- Drop shadow filter for dimensionality
- Pointer events disabled (visual only)

**SVG Structure**:
```xml
<svg width="100%" height="60" viewBox="0 0 1536 60">
  <defs>
    <linearGradient id="tableEdgeGradient">...</linearGradient>
    <filter id="tableShadow">...</filter>
  </defs>
  <path d="M 200 30 Q 400 15 768 10 Q 1136 15 1336 30" />
</svg>
```

---

## Custom Hooks

### useResponsiveDesign()

**Purpose**: Provides responsive design utilities and breakpoint information.

**Returns**:
```typescript
interface BreakpointValues {
  isMobile: boolean      // < 768px
  isTablet: boolean      // 768px - 1024px
  isDesktop: boolean     // > 1024px
  screenWidth: number    // Current window width
  screenHeight: number   // Current window height
  aspectRatio: number    // Width / height ratio
}
```

**Usage**:
```typescript
import { useResponsiveDesign } from '../hooks/useResponsiveDesign'

function MyComponent() {
  const { isMobile, screenWidth, screenHeight } = useResponsiveDesign()

  const scalingFactor = Math.min(screenWidth / 1536, screenHeight / 1024)

  return (
    <div style={{
      padding: isMobile ? '8px' : '16px',
      fontSize: `${16 * scalingFactor}px`
    }}>
      Content
    </div>
  )
}
```

**Features**:
- Automatic breakpoint detection
- Real-time screen dimension tracking
- Window resize event handling
- Automatic cleanup on unmount

**Helper Function**:
```typescript
export function getResponsiveFontSize(
  baseSize: number,
  scalingFactor: number
): string
```

**Usage of Helper**:
```typescript
const { screenWidth, screenHeight } = useResponsiveDesign()
const scalingFactor = Math.min(screenWidth / 1536, screenHeight / 1024)
const fontSize = getResponsiveFontSize(18, scalingFactor)

<h3 style={{ fontSize }}>Title</h3>
```

---

### usePanning()

**Purpose**: Provides edge-based background panning functionality with smooth animations.

**Returns**:
```typescript
interface PanningControls {
  panningState: PanningState
  handleMouseMove: (e: MouseEvent) => void
  handleMouseLeave: () => void
}

interface PanningState {
  offsetX: number
  offsetY: number
  isPanning: boolean
}
```

**Usage**:
```typescript
import { usePanning } from '../hooks/usePanning'

function MyComponent() {
  const { panningState, handleMouseMove, handleMouseLeave } = usePanning()

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `translate(${panningState.offsetX}px, ${panningState.offsetY}px)`
      }}
    >
      Background content
    </div>
  )
}
```

**Configuration Constants**:
```typescript
const EDGE_ZONE = 50        // Pixels from edge to start panning
const MAX_SPEED = 3         // Maximum pan speed in pixels per frame
const ACCELERATION = 0.1    // How quickly velocity changes
const FRICTION = 0.95       // Velocity decay when not near edge
const IMAGE_WIDTH = 1536    // Background image width
const IMAGE_HEIGHT = 1024   // Background image height
```

**Features**:
- Edge-based velocity calculation
- Smooth acceleration and friction
- Boundary constraints based on image overflow
- RequestAnimationFrame optimization
- Automatic cleanup on unmount

---

## Data Types & Interfaces

### VaseData Interface

```typescript
interface VaseData {
  id: string
  image: string
  position: VasePosition
  project: ProjectData
}
```

### VasePosition Interface

```typescript
interface VasePosition {
  x: number      // Percentage from left (0-100)
  y: number      // Percentage from top (0-100)
  width: number  // Percentage width (0-100)
  height: number // Percentage height (0-100)
}
```

### ProjectData Interface

```typescript
interface ProjectData {
  id: string
  title: string
  subtitle: string
  description: string
  technologies: string[]
  demoUrl: string | null
  githubUrl: string | null
  image: string
}
```

---

## Utility Functions

### Responsive Design Utilities

#### getResponsiveFontSize()

**Purpose**: Calculate responsive font size with minimum constraints.

**Signature**:
```typescript
function getResponsiveFontSize(
  baseSize: number,
  scalingFactor: number
): string
```

**Parameters**:
- `baseSize`: Base font size in pixels
- `scalingFactor`: Multiplier based on screen size

**Returns**: CSS font size string (e.g., "16px")

**Example**:
```typescript
const scalingFactor = Math.min(screenWidth / 1536, screenHeight / 1024)
const fontSize = getResponsiveFontSize(18, scalingFactor)
// Returns: "18px" on design size, "9px" on half size (minimum 12px)
```

---

## Event Handling Patterns

### Standard Click Handler Pattern

```typescript
interface ComponentProps {
  onClick?: () => void
}

export default function Component({ onClick }: ComponentProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return <div onClick={handleClick}>Content</div>
}
```

### Hover State Pattern

```typescript
export default function Component() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
      }}
      className="transition-all duration-300"
    >
      Content
    </div>
  )
}
```

---

## Animation Specifications

### Standard Transition

```css
/* Applied via Tailwind class */
.transition-all.duration-300 {
  transition: all 0.3s ease-in-out;
}
```

### Transform Patterns

```typescript
// Scale on hover
transform: isHovered ? 'scale(1.05)' : 'scale(1)'

// Center positioning
transform: 'translate(-50%, -50%)'

// Combined transforms
transform: `translate(${x}px, ${y}px) scale(${scale})`
```

### Filter Effects

```typescript
// Standard hover enhancement
filter: isHovered
  ? 'brightness(1.15) contrast(1.05) sepia(0.15) saturate(1.1) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))'
  : 'brightness(1.05) contrast(1.02) sepia(0.1) saturate(1.05) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))'
```

---

## Performance Considerations

### Efficient Animation Properties

**GPU-Accelerated Properties** (prefer these):
- `transform`
- `opacity`
- `filter`

**Avoid Animating** (causes layout recalculation):
- `width`, `height`
- `top`, `left`, `right`, `bottom`
- `margin`, `padding`

### Component Optimization

**Use React.memo()** for components with stable props:
```typescript
import { memo } from 'react'

const OptimizedComponent = memo(function MyComponent({ data }) {
  return <div>{data.title}</div>
})
```

**Use useCallback()** for event handlers passed to children:
```typescript
const handleClick = useCallback(() => {
  // Handler logic
}, [dependencies])
```

This API reference provides the complete interface documentation for working with the TORS-BORED Studio components and utilities.