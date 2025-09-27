# React Hooks Guide

*Understanding useState, useEffect, useRef, useCallback, and custom hooks with examples from your project*

## What are Hooks?

Hooks are special functions in React that let you "hook into" React features. They always start with the word `use` and can only be called inside React components.

Think of hooks as tools that give your components special abilities:
- Remember data (useState)
- Respond to lifecycle events (useEffect)
- Access DOM elements (useRef)
- Optimize performance (useCallback)

## Built-in Hooks

### 1. useState - Managing Component State

`useState` lets your component remember information and update the UI when that information changes.

**Basic syntax:**
```tsx
const [value, setValue] = useState(initialValue)
```

**Example from your code:**
```tsx
// src/components/ShelfVase.tsx
const [isHovered, setIsHovered] = useState(false)

return (
  <div
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    style={{
      transform: isHovered ? 'scale(1.02)' : 'scale(1)',
      zIndex: isHovered ? 35 : 30,
    }}
  >
```

**What's happening:**
1. `useState(false)` creates state with initial value `false`
2. Returns array: `[currentValue, functionToUpdateValue]`
3. `isHovered` is the current value
4. `setIsHovered` is the function to update it
5. When `setIsHovered(true)` is called, component re-renders with new value

**More complex state example:**
```tsx
// Multiple state variables
const [isHovered, setIsHovered] = useState(false)
const [isClicked, setIsClicked] = useState(false)
const [userName, setUserName] = useState('')

// State with objects
const [user, setUser] = useState({
  name: '',
  email: '',
  age: 0
})

// Update object state (must create new object)
setUser(prevUser => ({
  ...prevUser,  // Keep existing properties
  name: 'John'  // Update only name
}))
```

### 2. useEffect - Side Effects and Lifecycle

`useEffect` lets you perform side effects (things that happen outside of rendering) like API calls, subscriptions, or manually changing the DOM.

**Basic syntax:**
```tsx
useEffect(() => {
  // Your side effect code here
}, [dependencies])
```

**Example from your code:**
```tsx
// src/hooks/useResponsiveDesign.ts
useEffect(() => {
  const updateBreakpoints = () => {
    const width = window.innerWidth
    const height = window.innerHeight

    setBreakpoints({
      isMobile: width < 768,
      isTablet: width >= 768 && width < 1024,
      isDesktop: width >= 1024,
      screenWidth: width,
      screenHeight: height,
      aspectRatio: width / height,
    })
  }

  // Set initial values
  updateBreakpoints()

  // Add event listener for window resize
  window.addEventListener('resize', updateBreakpoints)

  // Cleanup function - runs when component unmounts
  return () => window.removeEventListener('resize', updateBreakpoints)
}, []) // Empty dependency array = run once on mount
```

**What's happening:**
1. Effect runs after component mounts (appears on screen)
2. Sets up resize listener to track screen size changes
3. Returns cleanup function to remove listener when component unmounts
4. Empty `[]` means "run this effect only once"

**Different useEffect patterns:**

```tsx
// Run once on mount (like componentDidMount)
useEffect(() => {
  console.log('Component mounted')
}, [])

// Run on every render (usually avoid this)
useEffect(() => {
  console.log('Component rendered')
})

// Run when specific value changes
useEffect(() => {
  console.log('isHovered changed:', isHovered)
}, [isHovered])

// Run when any of multiple values change
useEffect(() => {
  console.log('Width or height changed')
}, [screenWidth, screenHeight])

// Cleanup (like componentWillUnmount)
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer tick')
  }, 1000)

  return () => clearInterval(timer)
}, [])
```

### 3. useRef - Accessing DOM Elements and Persistent Values

`useRef` gives you a way to access DOM elements directly or store values that persist between renders but don't trigger re-renders when changed.

**Example from your code:**
```tsx
// src/hooks/usePanning.ts
const animationRef = useRef<number | undefined>(undefined)
const velocityRef = useRef({ x: 0, y: 0 })
const targetVelocityRef = useRef({ x: 0, y: 0 })

// Using ref to store animation frame ID
const animate = useCallback(() => {
  // ... animation logic ...
  animationRef.current = requestAnimationFrame(animate)
}, [])

// Cleanup animation on unmount
useEffect(() => {
  return () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }
  }
}, [])
```

**What's happening:**
- `useRef` creates a container for values that persist between renders
- `animationRef.current` stores the animation frame ID
- Unlike state, changing a ref doesn't trigger re-render
- Perfect for storing timers, animation IDs, or DOM references

**DOM element access example:**
```tsx
function MyComponent() {
  const inputRef = useRef<HTMLInputElement>(null)

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={focusInput}>Focus Input</button>
    </div>
  )
}
```

### 4. useCallback - Performance Optimization

`useCallback` memoizes (remembers) a function so it doesn't get recreated on every render. This helps with performance when passing functions to child components.

**Example from your code:**
```tsx
// src/hooks/usePanning.ts
const calculateEdgeVelocity = useCallback((mouseX: number, mouseY: number) => {
  const { innerWidth: screenWidth, innerHeight: screenHeight } = window

  let targetX = 0
  let targetY = 0

  // Calculate velocity based on mouse position...
  if (mouseX < EDGE_ZONE) {
    const intensity = (EDGE_ZONE - mouseX) / EDGE_ZONE
    targetX = intensity * MAX_SPEED
  }
  // ... more calculation logic

  return { x: targetX, y: targetY }
}, []) // Empty dependencies = function never changes

const handleMouseMove = useCallback((e: MouseEvent) => {
  const targetVelocity = calculateEdgeVelocity(e.clientX, e.clientY)
  targetVelocityRef.current = targetVelocity

  if (!animationRef.current && (targetVelocity.x !== 0 || targetVelocity.y !== 0)) {
    animationRef.current = requestAnimationFrame(animate)
  }
}, [calculateEdgeVelocity, animate]) // Only recreate if these functions change
```

**Why use useCallback:**
- Without it, function is recreated on every render
- With it, function is only recreated when dependencies change
- Prevents unnecessary re-renders of child components
- Improves performance in complex apps

## Custom Hooks

Custom hooks are your own hooks that combine built-in hooks to create reusable logic.

### usePanning Hook

Your `usePanning` hook is a great example of a custom hook:

```tsx
// src/hooks/usePanning.ts
export function usePanning(): PanningControls {
  const [panningState, setPanningState] = useState<PanningState>({
    offsetX: 0,
    offsetY: 0,
    isPanning: false,
  })

  const animationRef = useRef<number | undefined>(undefined)
  const velocityRef = useRef({ x: 0, y: 0 })
  const targetVelocityRef = useRef({ x: 0, y: 0 })

  // Configuration constants
  const EDGE_ZONE = 50
  const MAX_SPEED = 3
  const ACCELERATION = 0.1
  const FRICTION = 0.95

  // Complex calculation function
  const calculateEdgeVelocity = useCallback((mouseX, mouseY) => {
    // ... calculation logic
  }, [])

  // Animation function
  const animate = useCallback(() => {
    // ... animation logic
  }, [])

  // Event handlers
  const handleMouseMove = useCallback((e: MouseEvent) => {
    // ... mouse handling
  }, [calculateEdgeVelocity, animate])

  const handleMouseLeave = useCallback(() => {
    targetVelocityRef.current = { x: 0, y: 0 }
  }, [])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return {
    panningState,
    handleMouseMove,
    handleMouseLeave,
  }
}
```

**What this custom hook does:**
1. Manages complex panning state and logic
2. Handles mouse events for edge-based panning
3. Manages animation frames for smooth movement
4. Provides a clean interface for components to use
5. Encapsulates all the complexity

**How to use it:**
```tsx
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
      Content that pans
    </div>
  )
}
```

### useResponsiveDesign Hook

```tsx
// src/hooks/useResponsiveDesign.ts
export function useResponsiveDesign(): BreakpointValues {
  const [breakpoints, setBreakpoints] = useState<BreakpointValues>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 1920,
    screenHeight: 1080,
    aspectRatio: 1920 / 1080,
  })

  useEffect(() => {
    const updateBreakpoints = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      setBreakpoints({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        screenWidth: width,
        screenHeight: height,
        aspectRatio: width / height,
      })
    }

    updateBreakpoints()
    window.addEventListener('resize', updateBreakpoints)
    return () => window.removeEventListener('resize', updateBreakpoints)
  }, [])

  return breakpoints
}
```

**What this hook provides:**
- Automatically tracks screen size changes
- Provides boolean flags for different device types
- Returns current screen dimensions
- Handles cleanup automatically

**Usage in components:**
```tsx
function VaseItem() {
  const { isMobile, isTablet, screenWidth } = useResponsiveDesign()

  return (
    <div
      style={{
        padding: isMobile ? '8px' : isTablet ? '12px' : '16px',
        fontSize: screenWidth < 500 ? '14px' : '18px'
      }}
    >
```

## Hook Rules

**Important rules you must follow:**

1. **Only call hooks at the top level** - not inside loops, conditions, or nested functions
```tsx
// ✅ Good
function MyComponent() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  if (count > 5) {
    // ❌ Bad - hook inside condition
    // const [error, setError] = useState('')
  }

  return <div>{count}</div>
}
```

2. **Only call hooks from React functions** - components or other hooks
```tsx
// ✅ Good - inside component
function MyComponent() {
  const [state, setState] = useState(0)
  return <div>{state}</div>
}

// ✅ Good - inside custom hook
function useCounter() {
  const [count, setCount] = useState(0)
  return { count, setCount }
}

// ❌ Bad - inside regular function
function regularFunction() {
  const [state, setState] = useState(0) // This will error!
}
```

## Common Patterns

### 1. Derived State
Instead of storing calculated values in state, calculate them during render:

```tsx
function VaseItem({ vaseData }) {
  const { screenWidth, screenHeight } = useResponsiveDesign()

  // ✅ Good - calculated during render
  const scalingFactor = Math.min(screenWidth / 1536, screenHeight / 1024)

  // ❌ Don't store calculated values in state
  // const [scalingFactor, setScalingFactor] = useState(1)

  return <div style={{ fontSize: `${16 * scalingFactor}px` }} />
}
```

### 2. State Updates with Previous Value
When new state depends on old state, use the function form:

```tsx
// ✅ Good - function form ensures you get latest state
setCount(prevCount => prevCount + 1)

// ❌ Risky - might use stale state
setCount(count + 1)
```

### 3. Multiple Related State Values
Group related state into a single object:

```tsx
// Instead of separate state for each
const [x, setX] = useState(0)
const [y, setY] = useState(0)

// Group related state
const [position, setPosition] = useState({ x: 0, y: 0 })
```

Hooks make React components powerful and flexible. They let you reuse logic between components and handle complex state management in a clean way.