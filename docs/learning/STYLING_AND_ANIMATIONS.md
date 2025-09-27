# Styling and Animations Guide

*Understanding CSS, Tailwind, and animations in your React project*

## Overview of Styling Approaches

Your project uses multiple styling approaches:
1. **Tailwind CSS** - Utility-first CSS framework
2. **Inline styles** - JavaScript objects for dynamic styling
3. **CSS transitions** - Smooth animations between states
4. **CSS filters** - Visual effects on images

## Tailwind CSS Fundamentals

Tailwind provides small utility classes that do one thing each. Instead of writing custom CSS, you combine these classes.

### Layout Classes

**Example from your code:**
```tsx
// src/components/Studio.tsx
<div className="relative w-full h-screen overflow-hidden">
  <div className="absolute inset-0 w-full h-full">
    <img className="absolute inset-0 w-full h-full object-cover" />
  </div>
</div>
```

**Class breakdown:**
- `relative`: `position: relative`
- `w-full`: `width: 100%`
- `h-screen`: `height: 100vh` (full viewport height)
- `overflow-hidden`: `overflow: hidden`
- `absolute`: `position: absolute`
- `inset-0`: `top: 0; right: 0; bottom: 0; left: 0`
- `object-cover`: `object-fit: cover` (image fills container, maintains aspect ratio)

### Flexbox Classes

**Example from your code:**
```tsx
// src/components/VaseItem.tsx
<div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60">
```

**Class breakdown:**
- `flex`: `display: flex`
- `flex-col`: `flex-direction: column`
- `justify-center`: `justify-content: center` (center along main axis)
- `items-center`: `align-items: center` (center along cross axis)
- `bg-black`: `background-color: black`
- `bg-opacity-60`: `background-color: rgba(0, 0, 0, 0.6)`

### Spacing Classes

```tsx
// Various spacing examples from your code
<div className="text-center px-3 py-2">  // padding-x: 0.75rem, padding-y: 0.5rem
<div className="mt-2 flex flex-wrap justify-center gap-1">  // margin-top: 0.5rem, gap: 0.25rem
<h3 className="text-white font-bold mb-1">  // margin-bottom: 0.25rem
```

**Spacing scale:**
- `p-1`: `padding: 0.25rem` (4px)
- `p-2`: `padding: 0.5rem` (8px)
- `p-3`: `padding: 0.75rem` (12px)
- `p-4`: `padding: 1rem` (16px)
- Similar for margin (`m-`), padding-x (`px-`), padding-y (`py-`), etc.

### Text Classes

```tsx
<h3 className="text-white font-bold mb-1 drop-shadow-lg">
<p className="text-white opacity-90 drop-shadow-md">
```

**Class breakdown:**
- `text-white`: `color: white`
- `font-bold`: `font-weight: bold`
- `drop-shadow-lg`: `filter: drop-shadow(0 10px 8px rgba(0, 0, 0, 0.04))`
- `opacity-90`: `opacity: 0.9`

## Inline Styles (CSS-in-JS)

Inline styles in React are JavaScript objects where CSS properties become camelCase keys.

### Static Inline Styles

```tsx
// src/components/ShelfVase.tsx
<div
  style={{
    left: '48%',
    top: '38%',
    width: '10%',
    height: '16%',
    transform: 'translate(-50%, -50%)',
    zIndex: isHovered ? 35 : 30,
  }}
>
```

**CSS property conversions:**
- `background-color` → `backgroundColor`
- `z-index` → `zIndex`
- `margin-top` → `marginTop`
- `border-radius` → `borderRadius`

### Dynamic Inline Styles

Dynamic styles change based on state or props:

```tsx
// src/components/VaseItem.tsx
style={{
  ...percentagePosition,  // Spread operator to merge objects
  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  zIndex: isHovered ? 30 : 20,
}}
```

**What's happening:**
- `...percentagePosition` spreads (copies) all properties from that object
- Ternary operator `condition ? valueIfTrue : valueIfFalse`
- Properties are calculated when component renders

### Complex Style Objects

```tsx
// src/components/ShelfVase.tsx
<div
  style={{
    bottom: '-8%',
    left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    height: '10%',
    background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 50%, transparent 100%)',
    borderRadius: '50%',
    filter: 'blur(3px)',
  }}
/>
```

This creates a realistic shadow effect using:
- Radial gradient for natural shadow shape
- Blur filter for soft edges
- Positioning for placement under vase

## CSS Transitions

Transitions create smooth animations between style changes.

### Basic Transitions

```tsx
// src/components/VaseItem.tsx
<img
  className="w-full h-full object-contain transition-all duration-300"
  style={{
    filter: isHovered ? 'brightness(1.1)' : 'brightness(1)',
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  }}
/>
```

**Tailwind transition classes:**
- `transition-all`: Animates all properties that change
- `duration-300`: Animation takes 300ms
- Also available: `duration-150`, `duration-500`, `duration-700`

### Custom Transitions

```tsx
// src/components/ShelfVase.tsx
<img
  className="absolute inset-0 w-full h-full object-contain transition-all duration-300"
  style={{
    transform: isHovered ? 'scale(1.02)' : 'scale(1)',
    transformOrigin: 'bottom center',
  }}
/>
```

**Key concepts:**
- `transformOrigin`: Point around which transformations happen
- `'bottom center'`: Scale from the bottom center (like vase sitting on table)
- `transition-all`: Smoothly animates transform, filter, and other property changes

## CSS Filters

Filters apply visual effects to elements. Your project uses them extensively for realistic lighting effects.

### Image Enhancement Filters

```tsx
// src/components/ShelfVase.tsx
style={{
  filter: isHovered
    ? 'brightness(1.15) contrast(1.05) sepia(0.15) saturate(1.1) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))'
    : 'brightness(1.05) contrast(1.02) sepia(0.1) saturate(1.05) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
}}
```

**Filter functions explained:**
- `brightness(1.15)`: Makes image 15% brighter (1.0 = normal)
- `contrast(1.05)`: Increases contrast by 5%
- `sepia(0.15)`: Adds 15% sepia tone (warm, brownish tint)
- `saturate(1.1)`: Increases color saturation by 10%
- `drop-shadow(x y blur color)`: Adds shadow with offset, blur, and color

### Progressive Enhancement

Your project uses different filter intensities for different states:

**Normal state:**
```css
filter: brightness(1.05) contrast(1.02) sepia(0.1) saturate(1.05) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))
```

**Hover state:**
```css
filter: brightness(1.15) contrast(1.05) sepia(0.15) saturate(1.1) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))
```

This creates a subtle "coming to life" effect when hovering.

## Responsive Design

Your project handles different screen sizes dynamically.

### Responsive Utilities

```tsx
// src/components/VaseItem.tsx
const { isMobile, isTablet, screenWidth, screenHeight } = useResponsiveDesign()

return (
  <div
    style={{
      padding: isMobile ? '8px' : isTablet ? '12px' : '16px',
    }}
  >
```

### Dynamic Font Sizing

```tsx
// src/hooks/useResponsiveDesign.ts
export function getResponsiveFontSize(
  baseSize: number,
  scalingFactor: number
): string {
  const scaledSize = Math.max(12, baseSize * scalingFactor)
  return `${scaledSize}px`
}

// Usage in component
const scalingFactor = Math.min(screenWidth / 1536, screenHeight / 1024)

<h3
  style={{
    fontSize: getResponsiveFontSize(18, scalingFactor),
  }}
>
```

**How it works:**
1. Calculate scale factor based on screen vs design size
2. Multiply base font size by scale factor
3. Ensure minimum readable size (12px)
4. Return CSS-compatible string

## Animation Patterns

### Hover Effects

```tsx
// Pattern 1: Scale and glow
<div
  style={{
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    boxShadow: isHovered ? '0 0 20px rgba(255, 255, 255, 0.1)' : 'none',
  }}
  className="transition-all duration-300"
>

// Pattern 2: Filter enhancement
<img
  style={{
    filter: isHovered
      ? 'brightness(1.1) drop-shadow(0 12px 20px rgba(0, 0, 0, 0.4))'
      : 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.2))'
  }}
  className="transition-all duration-300"
/>
```

### Conditional Content

```tsx
// Show overlay only on hover
{isHovered && (
  <div className="absolute inset-0 bg-black bg-opacity-60 transition-opacity duration-300">
    <h3>{project.title}</h3>
    <p>{project.subtitle}</p>
  </div>
)}
```

### Animation Timing

**Common durations in your project:**
- `duration-300` (300ms): Standard hover effects
- Fast enough to feel responsive
- Slow enough to feel smooth
- Good for scale, opacity, filter changes

## Performance Considerations

### Efficient Animations

**Properties that animate smoothly:**
- `transform` (scale, translate, rotate)
- `opacity`
- `filter`

**Properties to avoid animating:**
- `width`, `height` (causes layout recalculation)
- `top`, `left` (use `transform` instead)
- `margin`, `padding` (causes layout shifts)

### GPU Acceleration

```tsx
// Force GPU acceleration for smooth animations
style={{
  transform: 'translateZ(0)', // or translate3d(0,0,0)
  willChange: 'transform',
}}
```

## Common Styling Patterns in Your Project

### 1. Overlay Pattern
```tsx
<div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-60">
  {/* Content */}
</div>
```

### 2. Shadow Pattern
```tsx
<div
  style={{
    background: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, transparent 100%)',
    filter: 'blur(3px)',
  }}
/>
```

### 3. Responsive Sizing Pattern
```tsx
const scalingFactor = Math.min(screenWidth / 1536, screenHeight / 1024)
const responsiveSize = getResponsiveFontSize(baseSize, scalingFactor)
```

### 4. State-Based Styling Pattern
```tsx
style={{
  transform: isHovered ? 'scale(1.05)' : 'scale(1)',
  zIndex: isHovered ? 30 : 20,
}}
className="transition-all duration-300"
```

This combination of Tailwind utilities, dynamic inline styles, and CSS transitions creates a rich, interactive experience that responds smoothly to user interactions.