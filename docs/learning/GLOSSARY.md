# React & Frontend Glossary

*Quick reference for all React, frontend, and web development terms used in your project*

## React Core Terms

### Component
A reusable piece of UI that returns JSX. Components are like functions that return HTML-like code.
```tsx
function MyComponent() {
  return <div>Hello World</div>
}
```

### JSX (JavaScript XML)
HTML-like syntax that you write inside JavaScript. Gets converted to regular JavaScript function calls.
```tsx
const element = <h1>Hello, world!</h1>
```

### Props (Properties)
Data passed from parent component to child component. Like function arguments but for components.
```tsx
<VaseItem vaseData={data} onClick={handler} />
```

### State
Data that can change over time. When state changes, the component re-renders.
```tsx
const [count, setCount] = useState(0)
```

### Virtual DOM
React's internal representation of the UI. React compares this with the real DOM and only updates what changed.

### Re-render
When React updates a component because its state or props changed.

### Hooks
Special functions that let you "hook into" React features. Always start with `use`.

### Lifecycle
The phases a component goes through: mounting (appearing), updating (changing), and unmounting (disappearing).

## React Hooks

### useState
Hook for managing state in functional components.
```tsx
const [value, setValue] = useState(initialValue)
```

### useEffect
Hook for side effects (API calls, subscriptions, manual DOM changes).
```tsx
useEffect(() => {
  // Side effect code
}, [dependencies])
```

### useRef
Hook for accessing DOM elements or storing mutable values that don't trigger re-renders.
```tsx
const ref = useRef(null)
```

### useCallback
Hook for memoizing functions to prevent unnecessary re-renders.
```tsx
const memoizedCallback = useCallback(() => {
  // Function code
}, [dependencies])
```

### Custom Hook
Your own hook that combines built-in hooks. Must start with `use`.
```tsx
function useCounter() {
  const [count, setCount] = useState(0)
  return { count, setCount }
}
```

## JavaScript/TypeScript Terms

### Arrow Functions
Shorter way to write functions using `=>` syntax.
```tsx
const add = (a, b) => a + b
// Same as: function add(a, b) { return a + b }
```

### Destructuring
Extracting values from objects or arrays into separate variables.
```tsx
const { name, age } = person
const [first, second] = array
```

### Spread Operator (...)
Expands arrays or objects.
```tsx
const newArray = [...oldArray, newItem]
const newObject = { ...oldObject, newProp: value }
```

### Template Literals
Strings with embedded expressions using backticks.
```tsx
const message = `Hello ${name}, you are ${age} years old`
```

### Ternary Operator
Shorthand for if-else statements.
```tsx
const result = condition ? valueIfTrue : valueIfFalse
```

### Interface (TypeScript)
Defines the shape/structure of an object.
```tsx
interface User {
  name: string
  age: number
}
```

### Union Types (TypeScript)
Value can be one of several types.
```tsx
type Status = 'loading' | 'success' | 'error'
```

### Optional Properties (TypeScript)
Properties that might or might not exist.
```tsx
interface Props {
  required: string
  optional?: number
}
```

## CSS & Styling Terms

### CSS-in-JS
Writing CSS styles as JavaScript objects.
```tsx
const styles = {
  backgroundColor: 'blue',
  fontSize: '16px'
}
```

### Inline Styles
CSS styles written directly in JSX using the `style` attribute.
```tsx
<div style={{ color: 'red', margin: '10px' }}>
```

### CSS Classes
Predefined styles applied using the `className` attribute.
```tsx
<div className="container flex items-center">
```

### Tailwind CSS
Utility-first CSS framework with small, single-purpose classes.
```tsx
<div className="bg-blue-500 text-white p-4 rounded">
```

### CSS Transitions
Smooth animations between CSS property changes.
```css
transition: all 0.3s ease
```

### CSS Transforms
Change element appearance (scale, rotate, translate) without affecting layout.
```css
transform: scale(1.1) rotate(45deg)
```

### CSS Filters
Apply visual effects like blur, brightness, contrast.
```css
filter: brightness(1.2) blur(2px)
```

### Flexbox
CSS layout method for arranging items in rows or columns.
```css
display: flex;
justify-content: center;
align-items: center;
```

### CSS Grid
CSS layout system for creating complex layouts with rows and columns.

### Responsive Design
Making websites work well on different screen sizes.

### Breakpoints
Screen size thresholds where design changes (mobile, tablet, desktop).

### Media Queries
CSS rules that apply only at certain screen sizes.
```css
@media (max-width: 768px) {
  /* Mobile styles */
}
```

## Event Handling

### Event Handler
Function that runs when an event occurs (click, hover, keyboard input).
```tsx
const handleClick = () => {
  console.log('Clicked!')
}
```

### Event Object
Information about the event that occurred.
```tsx
const handleMouseMove = (event) => {
  console.log(event.clientX, event.clientY)
}
```

### Synthetic Events
React's wrapper around native browser events for consistency.

### Event Bubbling
When an event starts at the target element and bubbles up to parent elements.

### Event Delegation
Handling events on parent elements instead of individual child elements.

## Performance Terms

### Re-render
When React updates a component and its children.

### Memoization
Caching results to avoid expensive recalculations.

### Optimization
Improving performance by reducing unnecessary work.

### Bundle Size
Total size of JavaScript files sent to the browser.

### Code Splitting
Breaking code into smaller chunks that load when needed.

### Lazy Loading
Loading content only when it's needed (like images when they come into view).

## Development Tools

### Vite
Fast build tool for modern web development.

### npm (Node Package Manager)
Tool for installing and managing JavaScript packages.

### Package.json
File that lists project dependencies and scripts.

### ESLint
Tool that checks code for potential errors and style issues.

### TypeScript Compiler (tsc)
Converts TypeScript code to JavaScript.

### Development Server
Local server that runs your app during development.

### Build Process
Converting source code into optimized files for production.

### Hot Reload
Automatically updating the page when code changes during development.

## Browser Terms

### DOM (Document Object Model)
Browser's representation of HTML as objects that JavaScript can modify.

### Viewport
Visible area of a webpage in the browser window.

### Client-Side
Code that runs in the user's browser.

### Server-Side
Code that runs on the web server.

### API (Application Programming Interface)
Way for different software to communicate.

### HTTP Request
Message sent to a server asking for data.

### CORS (Cross-Origin Resource Sharing)
Security feature that controls which websites can access resources.

## File & Project Structure

### Component Tree
Hierarchical structure of how components contain other components.

### Module
JavaScript file that exports code for other files to import.

### Import/Export
Way to share code between files.
```tsx
import Component from './Component'
export default MyComponent
```

### Relative Path
File path relative to current file location.
```tsx
import './styles.css'
import Component from '../components/Component'
```

### Absolute Path
Full file path from project root.
```tsx
import Component from '/src/components/Component'
```

## Animation Terms

### Keyframes
Specific points in an animation timeline.

### Easing
How an animation accelerates and decelerates.

### Duration
How long an animation takes to complete.

### Delay
Time to wait before starting an animation.

### Frame Rate
How many animation frames per second (60fps is smooth).

### GPU Acceleration
Using graphics card for smoother animations.

### Transform Origin
Point around which transformations (scale, rotate) happen.

## State Management

### Local State
State that belongs to a single component.

### Global State
State shared across multiple components.

### State Update
Changing state value, which triggers re-render.

### Immutability
Not changing existing objects/arrays, but creating new ones.

### State Lifting
Moving state up to a common parent component.

## Common Patterns

### Conditional Rendering
Showing/hiding elements based on conditions.
```tsx
{isVisible && <div>Visible content</div>}
```

### List Rendering
Creating multiple elements from an array.
```tsx
{items.map(item => <Item key={item.id} data={item} />)}
```

### Higher-Order Component (HOC)
Component that wraps other components to add functionality.

### Render Props
Passing a function as a prop to share code between components.

### Composition
Building complex components by combining simpler ones.

## Data Flow

### Unidirectional Data Flow
Data flows down from parent to child components via props.

### Props Drilling
Passing props through multiple component layers.

### Event Bubbling (React)
Child components calling parent functions via props.

### Data Binding
Connecting UI elements to data values.

## Common Abbreviations

- **UI**: User Interface
- **UX**: User Experience
- **SPA**: Single Page Application
- **PWA**: Progressive Web App
- **CSS**: Cascading Style Sheets
- **HTML**: HyperText Markup Language
- **JS**: JavaScript
- **TS**: TypeScript
- **DOM**: Document Object Model
- **API**: Application Programming Interface
- **HTTP**: HyperText Transfer Protocol
- **URL**: Uniform Resource Locator
- **JSON**: JavaScript Object Notation
- **AJAX**: Asynchronous JavaScript and XML
- **CORS**: Cross-Origin Resource Sharing
- **CDN**: Content Delivery Network

This glossary covers the main terms you'll encounter when working with React and frontend development. Keep it handy as a quick reference!