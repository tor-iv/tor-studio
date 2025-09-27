# TypeScript Basics for React

*Understanding TypeScript types, interfaces, and how they make your React code safer*

## What is TypeScript?

TypeScript is JavaScript with type annotations. It helps catch errors before your code runs and makes your code more predictable and easier to understand.

Think of TypeScript as having a helpful assistant that:
- Checks if you're using functions correctly
- Warns you when you might have bugs
- Provides better autocompletion in your editor
- Makes your code self-documenting

## Basic Type Concepts

### Primitive Types

```tsx
// Basic types
let name: string = "TORS-BORED"
let count: number = 42
let isVisible: boolean = true
let value: null = null
let data: undefined = undefined
```

### Arrays

```tsx
// Array of strings
let technologies: string[] = ['React', 'TypeScript', 'Tailwind']

// Array of numbers
let coordinates: number[] = [120, 300, 140, 200]

// Alternative syntax
let items: Array<string> = ['vase1.png', 'vase2.png']
```

## Interfaces and Types

Interfaces define the shape of objects. Your project uses them extensively.

### Component Props Interfaces

**Example from your code:**
```tsx
// src/components/Studio.tsx
interface StudioProps {
  children?: ReactNode  // ? means optional
}

export default function Studio({ children }: StudioProps) {
  return <div>{children}</div>
}
```

**What this does:**
- Defines what props the Studio component expects
- `ReactNode` is a built-in type for anything React can render
- `?` makes the property optional
- TypeScript will error if you pass wrong props

### Data Structure Interfaces

**Example from your code:**
```tsx
// src/lib/types.ts
export interface ProjectData {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];           // Array of strings
  demoUrl: string | null;          // Can be string OR null
  githubUrl: string | null;
  image: string;
}

export interface VasePosition {
  x: number;      // Must be a number
  y: number;
  width: number;
  height: number;
}

export interface VaseData {
  id: string;
  image: string;
  position: VasePosition;    // Uses another interface
  project: ProjectData;      // Uses another interface
}
```

**Key concepts:**
- `string[]` means array of strings
- `string | null` means union type (can be either string or null)
- Interfaces can reference other interfaces
- Semicolons are optional but conventional

### Function Parameter Types

**Example from your code:**
```tsx
// src/components/VaseItem.tsx
interface VaseItemProps {
  vaseData: VaseData
  onClick?: () => void    // Optional function that returns nothing
}

export default function VaseItem({ vaseData, onClick }: VaseItemProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()  // TypeScript knows this is safe
    }
  }
}
```

**Function type syntax:**
- `() => void` - Function with no parameters, returns nothing
- `(id: string) => void` - Function takes string parameter
- `(x: number, y: number) => boolean` - Function takes two numbers, returns boolean

## React-Specific TypeScript

### Component Props

```tsx
// Basic component with typed props
interface ButtonProps {
  text: string
  disabled?: boolean
  onClick: () => void
}

function Button({ text, disabled = false, onClick }: ButtonProps) {
  return (
    <button disabled={disabled} onClick={onClick}>
      {text}
    </button>
  )
}

// Usage - TypeScript will check these props
<Button text="Click me" onClick={() => console.log('clicked')} />
```

### Event Handlers

**Example from your code:**
```tsx
// src/hooks/usePanning.ts
const handleMouseMove = useCallback((e: MouseEvent) => {
  const targetVelocity = calculateEdgeVelocity(e.clientX, e.clientY)
  // TypeScript knows e has clientX and clientY properties
}, [])
```

**Common event types:**
- `MouseEvent` - Mouse events (click, move, enter, leave)
- `KeyboardEvent` - Keyboard events
- `ChangeEvent<HTMLInputElement>` - Input change events
- `FormEvent<HTMLFormElement>` - Form submission events

### useState with Types

```tsx
// TypeScript can infer simple types
const [count, setCount] = useState(0)        // inferred as number
const [name, setName] = useState('')         // inferred as string
const [isVisible, setIsVisible] = useState(false)  // inferred as boolean

// Explicit types for complex objects
const [user, setUser] = useState<{
  name: string
  email: string
  age: number
}>({
  name: '',
  email: '',
  age: 0
})

// Using interfaces
interface User {
  name: string
  email: string
  age: number
}

const [user, setUser] = useState<User>({
  name: '',
  email: '',
  age: 0
})
```

### useRef with Types

**Example from your code:**
```tsx
// src/hooks/usePanning.ts
const animationRef = useRef<number | undefined>(undefined)
const velocityRef = useRef({ x: 0, y: 0 })

// DOM element refs
const inputRef = useRef<HTMLInputElement>(null)
const divRef = useRef<HTMLDivElement>(null)
```

**Common ref types:**
- `HTMLInputElement` - Input elements
- `HTMLDivElement` - Div elements
- `HTMLButtonElement` - Button elements
- `number | undefined` - For storing IDs that might not exist

## Custom Hook Types

**Example from your code:**
```tsx
// src/hooks/useResponsiveDesign.ts
interface BreakpointValues {
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
  screenWidth: number
  screenHeight: number
  aspectRatio: number
}

export function useResponsiveDesign(): BreakpointValues {
  const [breakpoints, setBreakpoints] = useState<BreakpointValues>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
    screenWidth: 1920,
    screenHeight: 1080,
    aspectRatio: 1920 / 1080,
  })

  return breakpoints
}
```

**What this provides:**
- Clear return type definition
- Autocompletion when using the hook
- Compile-time checking of property access

## Union Types

Union types let a value be one of several types.

```tsx
// From your code
demoUrl: string | null     // Can be string or null
githubUrl: string | null

// More examples
type Status = 'loading' | 'success' | 'error'  // Only these three strings
type Theme = 'light' | 'dark'
type Size = 'small' | 'medium' | 'large'

// Usage
const [status, setStatus] = useState<Status>('loading')
setStatus('success')  // ✅ Valid
setStatus('pending')  // ❌ TypeScript error
```

## Optional Properties

The `?` symbol makes properties optional.

```tsx
// From your code
interface VaseItemProps {
  vaseData: VaseData
  onClick?: () => void     // Optional - component works without it
}

// More examples
interface User {
  id: string
  name: string
  email?: string          // Optional
  avatar?: string         // Optional
}

// Valid usage
const user1: User = { id: '1', name: 'John' }
const user2: User = { id: '2', name: 'Jane', email: 'jane@example.com' }
```

## Generic Types

Generics let you create reusable types.

```tsx
// Built-in generic types you use
useState<boolean>(false)           // State that holds boolean
useRef<HTMLInputElement>(null)     // Ref that points to input element
Array<string>                      // Array of strings

// Custom generic interface
interface ApiResponse<T> {
  data: T
  success: boolean
  message: string
}

// Usage
type VaseResponse = ApiResponse<VaseData[]>
type UserResponse = ApiResponse<User>
```

## Type Assertions

Sometimes you know more about a type than TypeScript does.

```tsx
// From your code - you know this element exists
createRoot(document.getElementById('root')!).render(...)
//                                        ^ Non-null assertion

// Type assertion
const element = document.getElementById('my-id') as HTMLInputElement

// Alternative syntax
const element = <HTMLInputElement>document.getElementById('my-id')
```

## Common TypeScript Patterns in Your Code

### 1. Destructuring with Types

```tsx
// From VaseItem.tsx
const { image, position, project } = vaseData
const { isMobile, isTablet, screenWidth, screenHeight } = useResponsiveDesign()
```

TypeScript knows the types of these destructured variables based on the interface.

### 2. Function Parameters with Default Values

```tsx
// From useResponsiveDesign.ts
export function getResponsiveFontSize(
  baseSize: number,
  scalingFactor: number
): string {
  const scaledSize = Math.max(12, baseSize * scalingFactor)
  return `${scaledSize}px`
}
```

### 3. Conditional Rendering with Type Safety

```tsx
// TypeScript ensures godoVase is defined before using its properties
{godoVase && (
  <VaseItem
    vaseData={godoVase}
    onClick={() => handleVaseClick(godoVase.id)}
  />
)}
```

### 4. Array Methods with Type Safety

```tsx
// TypeScript knows map returns array of JSX elements
{project.technologies.map((tech, index) => (
  <span key={index}>{tech}</span>
))}

// TypeScript knows find returns VaseData | undefined
const godoVase = vaseData.find(vase => vase.id === 'godo')
```

## Benefits in Your Project

### 1. Autocomplete and IntelliSense

When you type `vaseData.`, your editor shows:
- `id`
- `image`
- `position`
- `project`

### 2. Error Prevention

```tsx
// TypeScript catches these errors:
<VaseItem vaseData={123} />                    // ❌ Should be VaseData object
<VaseItem vaseData={validData} onClick="hi" /> // ❌ onClick should be function
vaseData.find(vase => vase.name === 'godo')   // ❌ Property is 'id', not 'name'
```

### 3. Refactoring Safety

If you change an interface, TypeScript shows all places that need updating:

```tsx
// If you change ProjectData interface
interface ProjectData {
  id: string
  title: string
  // subtitle: string  // Remove this
  description: string
  // ... rest
}

// TypeScript will highlight everywhere that uses 'subtitle'
```

## TypeScript Configuration

Your project uses these TypeScript files:

### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ESNext",           // Use modern JavaScript
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": false,             // Only TypeScript files
    "skipLibCheck": true,
    "esModuleInterop": false,
    "allowSyntheticDefaultImports": true,
    "strict": true,               // Strict type checking
    "forceConsistentCasingInFileNames": true,
    "module": "ESNext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,               // Don't output JS (Vite handles this)
    "jsx": "react-jsx"            // Modern JSX transform
  },
  "include": [
    "src"                         // Check all files in src/
  ]
}
```

### Key settings explained:
- `"strict": true` - Enables all strict type checking
- `"jsx": "react-jsx"` - Use new JSX transform (no need to import React)
- `"noEmit": true` - Vite handles compilation, TypeScript just checks types

## Common TypeScript Errors and Solutions

### Error: "Property does not exist"
```tsx
// ❌ Error: Property 'subtitle' does not exist on type 'ProjectData'
console.log(project.subtitel)  // Typo!

// ✅ Fix: Check spelling
console.log(project.subtitle)
```

### Error: "Argument of type 'X' is not assignable to parameter of type 'Y'"
```tsx
// ❌ Error: string not assignable to number
const width: number = '100px'

// ✅ Fix: Use correct type
const width: number = 100
```

### Error: "Object is possibly 'undefined'"
```tsx
// ❌ Error: godoVase might be undefined
const title = godoVase.project.title

// ✅ Fix: Check if it exists
const title = godoVase?.project.title
// or
if (godoVase) {
  const title = godoVase.project.title
}
```

TypeScript makes your React code more reliable and easier to work with by catching errors early and providing excellent developer experience.