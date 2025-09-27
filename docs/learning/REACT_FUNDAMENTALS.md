# React Fundamentals Guide

*A beginner-friendly introduction to React concepts using examples from your TORS-BORED STUDIO codebase*

## What is React?

React is a JavaScript library for building user interfaces. Think of it as a tool that helps you create interactive web pages where content can change and respond to user actions without needing to reload the entire page.

## Core Concepts

### 1. Components

Components are like building blocks for your webpage. Each component is a piece of code that returns some HTML-like content called JSX.

**Example from your code:**
```tsx
// src/components/Studio.tsx
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
      <div className="absolute inset-0 z-10">
        {children}
      </div>
    </div>
  )
}
```

**What this means:**
- `Studio` is a component (like a reusable template)
- It returns JSX (HTML-like code) that describes what should appear on screen
- This particular component creates the main background for your pottery studio

### 2. JSX (JavaScript XML)

JSX lets you write HTML-like code inside JavaScript. It looks like HTML but with some differences:

**JSX Example from your code:**
```tsx
<div className="relative w-full h-screen overflow-hidden">
  <img src="images/background.jpeg" alt="Pottery studio background" />
</div>
```

**Key differences from HTML:**
- `className` instead of `class` (because `class` is a reserved word in JavaScript)
- Self-closing tags need a `/` at the end: `<img />` not `<img>`
- You can embed JavaScript expressions using `{}`

### 3. Props (Properties)

Props are like arguments you pass to functions. They let you pass data from a parent component to a child component.

**Example from your code:**
```tsx
// In App.tsx - passing children to Studio
<Studio>
  <InteractiveVases />
</Studio>

// In Studio.tsx - receiving children as props
export default function Studio({ children }: StudioProps) {
  return (
    <div>
      {children}  {/* This renders the InteractiveVases component */}
    </div>
  )
}
```

**What this means:**
- `children` is a special prop that contains whatever is placed between component tags
- The `Studio` component receives `InteractiveVases` as its children
- Props make components reusable with different data

### 4. State

State is data that can change over time. When state changes, React automatically updates the UI.

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
    }}
  >
```

**What this means:**
- `isHovered` is a piece of state that tracks whether the mouse is over the vase
- `setIsHovered` is a function that updates this state
- When `isHovered` changes, the component re-renders with the new style

### 5. Event Handling

React lets you respond to user interactions like clicks, mouse hovers, etc.

**Example from your code:**
```tsx
// src/components/ShelfVase.tsx
const handleClick = () => {
  if (onVaseClick) {
    onVaseClick()
  }
}

return (
  <div
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    onClick={handleClick}
  >
```

**What this means:**
- `onMouseEnter`, `onMouseLeave`, `onClick` are event handlers
- They run functions when the user interacts with the element
- `() =>` is arrow function syntax (a shorthand way to write functions)

## How Your App Works

### The Component Tree

Your app is structured like a tree:

```
App (main component)
├── StudioTitle
└── Studio
    └── InteractiveVases
        ├── ShelfLine
        ├── ShelfVase
        ├── ShelfVase4
        └── VaseItem
```

### Data Flow

1. **App.tsx**: The root component that sets up the basic structure
2. **Studio.tsx**: Creates the background and container for all pottery items
3. **InteractiveVases.tsx**: Manages all the interactive pottery pieces
4. **Individual Vase Components**: Handle their own hover effects and click events

### The Virtual DOM

React uses something called the "Virtual DOM":

1. When state changes, React creates a virtual copy of what the webpage should look like
2. It compares this with the current webpage
3. It only updates the parts that actually changed
4. This makes your app fast and responsive

## Key React Principles

### 1. Declarative Programming
Instead of telling the computer HOW to do something step by step, you tell it WHAT you want the end result to look like.

**Traditional approach:**
```javascript
// Find the element
const button = document.getElementById('myButton')
// Add event listener
button.addEventListener('click', function() {
  // Manually update the DOM
  button.style.color = 'red'
})
```

**React approach:**
```tsx
const [clicked, setClicked] = useState(false)
return (
  <button
    onClick={() => setClicked(true)}
    style={{ color: clicked ? 'red' : 'blue' }}
  >
    Click me
  </button>
)
```

### 2. Component Reusability
Write once, use everywhere. Your `VaseItem` component can display any vase by passing different data via props.

### 3. Unidirectional Data Flow
Data flows down from parent to child components via props. This makes your app predictable and easier to debug.

## Common Patterns in Your Code

### 1. Conditional Rendering
```tsx
{isHovered && (
  <div className="hover-overlay">
    Hover content here
  </div>
)}
```
This means: "Only show this div if isHovered is true"

### 2. Mapping Over Arrays
```tsx
{project.technologies.map((tech, index) => (
  <span key={index}>{tech}</span>
))}
```
This means: "For each technology in the array, create a span element"

### 3. Dynamic Styling
```tsx
style={{
  transform: isHovered ? 'scale(1.02)' : 'scale(1)',
}}
```
This means: "Change the style based on the current state"

## Next Steps

Now that you understand the basics, check out:
- `CODEBASE_WALKTHROUGH.md` - Detailed explanation of each component
- `REACT_HOOKS_GUIDE.md` - Understanding useState, useEffect, and custom hooks
- `STYLING_AND_ANIMATIONS.md` - How the visual effects work