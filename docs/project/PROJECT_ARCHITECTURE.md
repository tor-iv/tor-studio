# TORS-BORED Studio - Project Architecture

*Comprehensive overview of the technical architecture, design decisions, and implementation details*

## Project Overview

**TORS-BORED Studio** is an interactive portfolio website that recreates a pottery studio experience. Users can explore various pottery pieces (representing projects) through hover interactions and click to view detailed project information.

### Key Characteristics
- **Interactive Portfolio**: Portfolio pieces are represented as pottery items in a studio setting
- **Responsive Design**: Works seamlessly across desktop, tablet, and mobile devices
- **Performance Optimized**: 60fps animations with lazy loading and PWA capabilities
- **TypeScript First**: Full type safety throughout the application

## Technology Stack

### Core Framework
- **React 19.1.1**: Latest React with modern hooks and features
- **TypeScript 5.9.2**: Full type safety and excellent developer experience
- **Vite 5.4.0**: Fast build tool with excellent hot reload

### Build & Development
- **Vite**: Modern build tool replacing Next.js for better performance
- **PWA Support**: Offline functionality via vite-plugin-pwa
- **ESLint**: Code quality and consistency
- **PostCSS**: CSS processing with autoprefixer

### Styling & Animation
- **Tailwind CSS 4.1.13**: Utility-first CSS framework
- **CSS-in-JS**: Dynamic styles for interactive elements
- **Framer Motion 12.23.21**: High-performance animations
- **CSS Filters**: Advanced visual effects (brightness, contrast, sepia, shadows)

### UI & Interaction
- **React Icons 5.5.0**: Comprehensive icon library
- **Custom Hooks**: Reusable logic for responsive design and panning
- **Event-Driven Architecture**: Modular event handling system

## Project Structure

```
tors-studio/
├── public/                     # Static assets
│   └── images/                # All pottery and background images
├── src/
│   ├── components/            # React components
│   │   ├── Studio.tsx         # Main container with background
│   │   ├── StudioTitle.tsx    # Fixed title overlay
│   │   ├── InteractiveVases.tsx # Vase orchestration
│   │   ├── VaseItem.tsx       # Reusable vase component
│   │   ├── ShelfVase.tsx      # Specific positioned vase
│   │   ├── ShelfVase4.tsx     # Another positioned vase
│   │   ├── ShelfLine.tsx      # Layout constraint container
│   │   └── TableEdgeLine.tsx  # SVG table edge visualization
│   ├── hooks/                 # Custom React hooks
│   │   ├── usePanning.ts      # Edge-based background panning
│   │   └── useResponsiveDesign.ts # Responsive breakpoints
│   ├── lib/                   # Data and utilities
│   │   ├── types.ts           # TypeScript interfaces
│   │   ├── vase-data.ts       # Project data and positioning
│   │   └── images.ts          # Image asset management
│   ├── styles/                # Global styles
│   │   └── globals.css        # Base styles and CSS variables
│   ├── App.tsx                # Root component
│   └── main.tsx               # Application entry point
├── vite.config.ts             # Vite configuration
├── tailwind.config.js         # Tailwind customization
├── tsconfig.json              # TypeScript configuration
└── package.json               # Dependencies and scripts
```

## Component Architecture

### 1. Hierarchical Structure

```
App
├── StudioTitle (fixed overlay)
└── Studio (background container)
    └── InteractiveVases (vase orchestrator)
        ├── ShelfLine (layout container)
        │   ├── TableEdgeLine (SVG visual element)
        │   ├── ShelfVase (positioned vase)
        │   ├── ShelfVase4 (positioned vase)
        │   └── VaseItem (dynamic vase)
        └── [Future: About, Modals, etc.]
```

### 2. Component Responsibilities

#### Studio.tsx
- **Purpose**: Main background container and overlay management
- **Responsibility**: Background image display, z-index layering
- **Key Features**: Full-screen layout, children prop support

#### InteractiveVases.tsx
- **Purpose**: Orchestrates all interactive pottery elements
- **Responsibility**: Event handling, vase filtering, click coordination
- **Key Features**: Central event management, data filtering

#### VaseItem.tsx
- **Purpose**: Reusable component for portfolio pieces
- **Responsibility**: Hover effects, positioning, project display
- **Key Features**: Responsive scaling, overlay content, click handling

#### Custom Hooks
- **usePanning.ts**: Edge-based background panning with smooth animations
- **useResponsiveDesign.ts**: Breakpoint detection and responsive calculations

### 3. Data Flow Architecture

```
vase-data.ts (Static Data)
     ↓
InteractiveVases.tsx (Data Processing)
     ↓
VaseItem.tsx (Rendering & Interaction)
     ↓
User Interaction Events
     ↓
Event Handlers (Console logging / Future modals)
```

## State Management

### Local State Pattern
The application uses React's built-in state management with useState hooks:

```tsx
// Hover state management
const [isHovered, setIsHovered] = useState(false)

// Responsive data
const { isMobile, isTablet, screenWidth } = useResponsiveDesign()

// Animation state
const [panningState, setPanningState] = useState({
  offsetX: 0,
  offsetY: 0,
  isPanning: false
})
```

### State Categories

1. **UI State**: Hover states, visibility toggles
2. **Layout State**: Screen dimensions, breakpoints, scaling factors
3. **Animation State**: Panning offsets, animation frame references
4. **Data State**: Filtered vase collections, project information

## Responsive Design Strategy

### Breakpoint System
```typescript
// Breakpoint definitions
isMobile: width < 768px
isTablet: width >= 768px && width < 1024px
isDesktop: width >= 1024px
```

### Scaling Approach
- **Design Base**: 1536x1024 reference design
- **Scaling Factor**: `Math.min(screenWidth / 1536, screenHeight / 1024)`
- **Responsive Elements**: Font sizes, positioning, spacing
- **Minimum Constraints**: 12px minimum font size

### Positioning Strategy
- **Percentage-Based**: All positions defined as percentages for scalability
- **Transform Origin**: Strategic transform origins for natural scaling
- **Z-Index Management**: Layered system for proper overlapping

## Animation Architecture

### CSS Transitions
```css
/* Standard transition timing */
transition: all 0.3s ease-in-out

/* Transform animations */
transform: scale(1.05) translateZ(0)
transform-origin: bottom center
```

### Performance Optimizations
- **GPU Acceleration**: `translateZ(0)` or `will-change: transform`
- **Efficient Properties**: Animate `transform`, `opacity`, `filter` only
- **RequestAnimationFrame**: Smooth 60fps animations for panning

### Filter Effects
```css
/* Hover enhancement */
filter: brightness(1.15) contrast(1.05) sepia(0.15) saturate(1.1)
        drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))

/* Normal state */
filter: brightness(1.05) contrast(1.02) sepia(0.1) saturate(1.05)
        drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))
```

## Build Configuration

### Vite Configuration
- **Base Path**: `/tors-studio/` for GitHub Pages
- **Code Splitting**: Vendor chunks for React, Framer Motion
- **Asset Optimization**: 5MB cache limit for PWA
- **Alias Support**: `@/` path aliasing

### PWA Configuration
```typescript
// Service worker patterns
globPatterns: ['**/*.{js,css,html,ico,png,svg,jpeg,jpg}']

// Manifest
name: 'TORS-BORED Studio'
short_name: 'TORS Studio'
theme_color: '#ffffff'
```

### TypeScript Configuration
- **Strict Mode**: Full type checking enabled
- **Modern Target**: ESNext for latest features
- **React JSX**: New JSX transform
- **Module Resolution**: Node-style resolution

## Performance Optimizations

### Image Optimization
- **Format Strategy**: PNG for transparency, JPEG for photos
- **Lazy Loading**: Images load when needed
- **Responsive Images**: Multiple sizes for different breakpoints
- **Preloading**: Critical images loaded early

### Bundle Optimization
- **Code Splitting**: Separate vendor and feature chunks
- **Tree Shaking**: Unused code elimination
- **Minification**: Production build optimization

### Runtime Performance
- **Virtual DOM**: React's efficient rendering
- **Memoization**: useCallback for stable function references
- **Minimal Re-renders**: Optimized state updates

## Development Workflow

### Available Scripts
```json
{
  "dev": "vite",                    // Development server
  "build": "tsc && vite build",     // Production build
  "preview": "vite preview",        // Preview production build
  "lint": "eslint . --ext ts,tsx",  // Code linting
  "type-check": "tsc --noEmit"      // Type checking only
}
```

### Development Features
- **Hot Reload**: Instant updates during development
- **Type Checking**: Real-time TypeScript validation
- **ESLint Integration**: Code quality enforcement
- **Auto Port**: Automatically opens browser on port 3000

## Deployment Architecture

### GitHub Pages
- **Build Output**: `dist/` directory
- **Base Path**: `/tors-studio/` for repository hosting
- **Static Hosting**: No server-side rendering required

### PWA Features
- **Offline Support**: Service worker caching
- **Install Prompt**: Native app-like installation
- **Background Sync**: Future enhancement capability

## Security Considerations

### Content Security
- **No External APIs**: All content is static
- **Local Images**: All assets served from same origin
- **TypeScript Safety**: Compile-time error prevention

### User Privacy
- **No Tracking**: No analytics or user tracking
- **Local Storage**: Minimal browser storage usage
- **GDPR Compliant**: No personal data collection

## Future Architecture Considerations

### Scalability
- **Modal System**: Prepared for project detail overlays
- **CMS Integration**: Data structure ready for headless CMS
- **Analytics**: Structure supports future analytics integration

### Enhancement Opportunities
- **3D Effects**: CSS 3D transforms for depth
- **Particle Systems**: Advanced visual effects
- **Audio Integration**: Sound effects for interactions
- **Gesture Support**: Touch gesture recognition

## File Size & Performance Metrics

### Bundle Analysis
- **Initial Bundle**: ~150KB (estimated)
- **Vendor Chunk**: React + React DOM (~130KB)
- **App Chunk**: Application code (~20KB)
- **Assets**: Images and fonts (varies by optimization)

### Performance Targets
- **First Contentful Paint**: <1.5s
- **Largest Contentful Paint**: <2.5s
- **Cumulative Layout Shift**: <0.1
- **First Input Delay**: <100ms

This architecture provides a solid foundation for the interactive portfolio while maintaining excellent performance and scalability for future enhancements.