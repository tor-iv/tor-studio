# TORS-BORED Studio - Development Guide

*Complete guide for developing, extending, and maintaining the TORS-BORED Studio project*

## Getting Started

### Prerequisites
- **Node.js**: Version 18.0.0 or higher
- **npm**: Version 8.0.0 or higher (comes with Node.js)
- **Git**: For version control
- **Modern Browser**: Chrome, Firefox, Safari, or Edge

### Initial Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd tors-studio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open browser**
   - Automatically opens to `http://localhost:3000`
   - If not, manually navigate to the URL

### Verify Installation
You should see:
- ✅ Background pottery studio image
- ✅ "TORS-BORED STUDIO" title at the top
- ✅ Interactive pottery pieces with hover effects
- ✅ Console logs when clicking on vases

## Available Scripts

### Development Scripts

#### `npm run dev`
**Purpose**: Start development server with hot reload
**Output**:
- Starts Vite development server on port 3000
- Automatically opens browser
- Shows compilation status and errors

```bash
npm run dev

# Expected output:
#   VITE v5.4.0  ready in 500ms
#   ➜  Local:   http://localhost:3000/
#   ➜  Network: use --host to expose
```

#### `npm run type-check`
**Purpose**: Run TypeScript compiler without emitting files
**Use Case**: Verify type safety before committing

```bash
npm run type-check

# Success output: (no output means no errors)
# Error output: shows file locations and error descriptions
```

#### `npm run lint`
**Purpose**: Check code quality and style consistency
**Scope**: All `.ts` and `.tsx` files

```bash
npm run lint

# Success: (no output)
# Errors: Shows file, line, and rule violations
```

### Production Scripts

#### `npm run build`
**Purpose**: Create optimized production build
**Process**: TypeScript compilation → Vite bundling

```bash
npm run build

# Output directory: dist/
# Includes: HTML, JS, CSS, and asset files
```

#### `npm run preview`
**Purpose**: Preview production build locally
**Requirement**: Must run `npm run build` first

```bash
npm run build && npm run preview

# Serves production build on http://localhost:4173
```

## Development Workflow

### Daily Development

1. **Start development session**
   ```bash
   npm run dev
   ```

2. **Make changes to components**
   - Edit files in `src/components/`
   - Changes hot-reload automatically
   - TypeScript errors show in terminal and browser

3. **Test changes**
   - Verify hover effects work
   - Check responsive behavior
   - Test different screen sizes in browser dev tools

4. **Run quality checks**
   ```bash
   npm run type-check  # Check TypeScript
   npm run lint        # Check code style
   ```

5. **Commit changes**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

### Adding New Features

#### Adding a New Vase/Project

1. **Add image to public/images/**
   ```bash
   # Add your image file
   cp new-vase.png public/images/
   ```

2. **Update vase-data.ts**
   ```typescript
   // src/lib/vase-data.ts
   export const vaseData: VaseData[] = [
     // ... existing vases
     {
       id: 'new-project',
       image: 'images/new-vase.png',
       position: { x: 15, y: 25, width: 8, height: 12 }, // Percentage values
       project: {
         id: 'new-project',
         title: 'Project Title',
         subtitle: 'Project Subtitle',
         description: 'Detailed project description...',
         technologies: ['React', 'TypeScript', 'etc'],
         demoUrl: 'https://demo-url.com',
         githubUrl: 'https://github.com/username/repo',
         image: 'images/new-vase.png',
       },
     },
   ]
   ```

3. **Add to InteractiveVases.tsx**
   ```typescript
   // src/components/InteractiveVases.tsx
   const newProjectVase = vaseData.find(vase => vase.id === 'new-project')

   return (
     <ShelfLine>
       {/* Existing vases */}
       {newProjectVase && (
         <VaseItem
           vaseData={newProjectVase}
           onClick={() => handleVaseClick(newProjectVase.id)}
         />
       )}
     </ShelfLine>
   )
   ```

#### Creating a Custom Positioned Vase

For vases that need specific positioning (like ShelfVase.tsx):

1. **Create new component**
   ```typescript
   // src/components/MyCustomVase.tsx
   import { useState } from 'react'

   interface MyCustomVaseProps {
     onVaseClick?: () => void
   }

   export default function MyCustomVase({ onVaseClick }: MyCustomVaseProps) {
     const [isHovered, setIsHovered] = useState(false)

     return (
       <div
         className="absolute cursor-pointer"
         style={{
           left: '25%',    // Adjust position
           top: '35%',     // Adjust position
           width: '8%',    // Adjust size
           height: '14%',  // Adjust size
           transform: 'translate(-50%, -50%)',
           zIndex: isHovered ? 35 : 30,
         }}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
         onClick={onVaseClick}
       >
         <img
           src="images/your-vase.png"
           alt="Your vase description"
           className="absolute inset-0 w-full h-full object-contain transition-all duration-300"
           style={{
             filter: isHovered
               ? 'brightness(1.15) contrast(1.05) drop-shadow(0 8px 16px rgba(0, 0, 0, 0.4))'
               : 'brightness(1.05) contrast(1.02) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3))',
             transform: isHovered ? 'scale(1.02)' : 'scale(1)',
           }}
         />
       </div>
     )
   }
   ```

2. **Import and use in InteractiveVases.tsx**

### Code Style Guidelines

#### TypeScript Best Practices

1. **Always define interfaces for props**
   ```typescript
   // ✅ Good
   interface ComponentProps {
     title: string
     onClick?: () => void
   }

   // ❌ Avoid
   function Component(props: any) { ... }
   ```

2. **Use descriptive variable names**
   ```typescript
   // ✅ Good
   const scalingFactor = Math.min(screenWidth / 1536, screenHeight / 1024)
   const isHovered = false

   // ❌ Avoid
   const sf = Math.min(sw / 1536, sh / 1024)
   const h = false
   ```

3. **Prefer const over let when possible**
   ```typescript
   // ✅ Good
   const handleClick = () => { ... }
   const [isVisible, setIsVisible] = useState(false)

   // ❌ Only when reassignment needed
   let currentIndex = 0
   currentIndex += 1
   ```

#### React Best Practices

1. **Use functional components with hooks**
   ```typescript
   // ✅ Good
   export default function MyComponent() {
     const [state, setState] = useState(false)
     return <div>{state}</div>
   }
   ```

2. **Extract event handlers**
   ```typescript
   // ✅ Good
   const handleClick = () => {
     console.log('Clicked!')
   }

   return <button onClick={handleClick}>Click me</button>

   // ❌ Avoid inline handlers for complex logic
   return <button onClick={() => { /* complex logic */ }}>Click me</button>
   ```

3. **Use meaningful component and file names**
   ```
   ✅ VaseItem.tsx, ShelfVase.tsx, InteractiveVases.tsx
   ❌ Item.tsx, Vase.tsx, Container.tsx
   ```

#### CSS and Styling Guidelines

1. **Prefer Tailwind classes for static styles**
   ```typescript
   // ✅ Good
   <div className="absolute inset-0 flex items-center justify-center">

   // ❌ Avoid custom CSS for common layouts
   <div style={{ position: 'absolute', display: 'flex' }}>
   ```

2. **Use inline styles for dynamic values**
   ```typescript
   // ✅ Good for dynamic values
   <div style={{
     transform: isHovered ? 'scale(1.05)' : 'scale(1)',
     zIndex: isHovered ? 30 : 20
   }}>

   // ✅ Good for complex calculations
   <div style={{
     left: `${position.x}%`,
     top: `${position.y}%`
   }}>
   ```

3. **Use CSS transitions for smooth animations**
   ```typescript
   <div className="transition-all duration-300">
   ```

## Debugging Tips

### Common Development Issues

#### Hot Reload Not Working
```bash
# Check if Vite server is running
npm run dev

# If issues persist, restart the server
# Ctrl+C to stop, then npm run dev again
```

#### TypeScript Errors
```bash
# Check for type errors
npm run type-check

# Common fixes:
# 1. Add missing interface properties
# 2. Check import/export statements
# 3. Verify file extensions (.ts vs .tsx)
```

#### Images Not Loading
1. **Check file path**: Images must be in `public/images/`
2. **Verify file name**: Case-sensitive on production
3. **Check image format**: PNG, JPEG, SVG supported

```typescript
// ✅ Correct path
<img src="images/vase1.png" alt="Vase" />

// ❌ Incorrect paths
<img src="/images/vase1.png" alt="Vase" />    // Extra leading slash
<img src="src/images/vase1.png" alt="Vase" /> // Wrong directory
```

#### Performance Issues
1. **Check browser dev tools** → Performance tab
2. **Monitor React DevTools** for unnecessary re-renders
3. **Use React.memo()** for expensive components
4. **Verify image sizes** aren't too large

### Development Tools

#### Browser DevTools
- **Elements tab**: Inspect HTML/CSS
- **Console tab**: View error messages and logs
- **Network tab**: Check asset loading
- **Performance tab**: Analyze render performance

#### VS Code Extensions (Recommended)
- **TypeScript and JavaScript Language Features**: Built-in TypeScript support
- **Tailwind CSS IntelliSense**: Autocompletion for Tailwind classes
- **ES7+ React/Redux/React-Native snippets**: React code snippets
- **Auto Rename Tag**: Automatically renames paired HTML/JSX tags

#### Useful Browser Commands
```javascript
// In browser console - check responsive design hook
window.innerWidth   // Current window width
window.innerHeight  // Current window height

// Check if component is receiving props correctly
// (Add temporarily in component)
console.log('Props received:', props)
```

## Testing Your Changes

### Manual Testing Checklist

#### Basic Functionality
- [ ] Page loads without errors
- [ ] All images display correctly
- [ ] Title appears at top of page
- [ ] Vases are positioned correctly

#### Hover Effects
- [ ] Vases scale up on hover
- [ ] Hover overlays appear with project info
- [ ] Filter effects (brightness, shadow) work
- [ ] Transitions are smooth (300ms)

#### Click Interactions
- [ ] Console logs appear when clicking vases
- [ ] No JavaScript errors in console
- [ ] Multiple clicks work consistently

#### Responsive Design
- [ ] Test on mobile view (< 768px)
- [ ] Test on tablet view (768px - 1024px)
- [ ] Test on desktop view (> 1024px)
- [ ] Scaling factors work correctly
- [ ] Text remains readable at all sizes

#### Performance
- [ ] Page loads within 3 seconds
- [ ] Animations run at 60fps
- [ ] No memory leaks during interactions
- [ ] Images load progressively

### Browser Testing
Test in multiple browsers:
- [ ] Chrome (primary development browser)
- [ ] Firefox
- [ ] Safari (if on Mac)
- [ ] Edge

## Common Development Patterns

### Adding New Interactive Elements

1. **Create component with hover state**
2. **Position using percentage-based coordinates**
3. **Add smooth transitions**
4. **Implement click handling**
5. **Test across screen sizes**

### Modifying Existing Components

1. **Understand component's purpose** (see COMPONENT_API.md)
2. **Check prop interfaces** before making changes
3. **Test existing functionality** after modifications
4. **Update TypeScript types** if needed

### Performance Optimization

1. **Use React.memo()** for components that don't change often
2. **Implement useCallback()** for event handlers passed to children
3. **Optimize images** before adding to public/images/
4. **Monitor bundle size** with build analyzer

This development guide should help you work efficiently with the TORS-BORED Studio codebase. For component-specific information, see COMPONENT_API.md, and for troubleshooting specific issues, check TROUBLESHOOTING.md.