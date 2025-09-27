# TORS-BORED Studio - Troubleshooting Guide

*Common issues, solutions, and debugging techniques for the TORS-BORED Studio project*

## Development Issues

### Server & Build Problems

#### Development Server Won't Start

**Problem**: `npm run dev` fails or hangs

**Common Causes & Solutions**:

1. **Port 3000 already in use**
   ```bash
   # Check what's using port 3000
   lsof -i :3000

   # Kill the process (replace PID with actual process ID)
   kill -9 <PID>

   # Or use different port
   npm run dev -- --port 3001
   ```

2. **Node modules corruption**
   ```bash
   # Clear node modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Cache issues**
   ```bash
   # Clear Vite cache
   rm -rf node_modules/.vite
   npm run dev
   ```

#### Build Fails

**Problem**: `npm run build` produces errors

**Common Causes & Solutions**:

1. **TypeScript errors**
   ```bash
   # Check for type errors first
   npm run type-check

   # Fix reported type issues, then rebuild
   npm run build
   ```

2. **Missing dependencies**
   ```bash
   # Reinstall dependencies
   npm install
   npm run build
   ```

3. **Memory issues during build**
   ```bash
   # Increase Node.js memory limit
   NODE_OPTIONS="--max-old-space-size=4096" npm run build
   ```

### TypeScript Issues

#### Type Errors

**Problem**: TypeScript compiler shows type errors

**Common Scenarios**:

1. **Property doesn't exist on type**
   ```typescript
   // ❌ Error: Property 'subtitle' does not exist
   console.log(project.subtitel)  // Typo!

   // ✅ Fix: Check spelling
   console.log(project.subtitle)
   ```

2. **Object is possibly undefined**
   ```typescript
   // ❌ Error: Object is possibly 'undefined'
   const title = godoVase.project.title

   // ✅ Fix: Check if exists
   const title = godoVase?.project.title

   // ✅ Alternative: Use conditional
   if (godoVase) {
     const title = godoVase.project.title
   }
   ```

3. **Argument type mismatch**
   ```typescript
   // ❌ Error: Argument of type 'string' is not assignable to parameter of type 'number'
   const width: number = '100px'

   // ✅ Fix: Use correct type
   const width: number = 100
   const widthStyle: string = '100px'
   ```

#### Import/Export Issues

**Problem**: Module import errors

**Common Scenarios**:

1. **Cannot find module**
   ```typescript
   // ❌ Error: Cannot find module './Component'
   import Component from './Component'

   // ✅ Fix: Add correct file extension
   import Component from './Component.tsx'
   ```

2. **Default export issues**
   ```typescript
   // If component uses named export
   export const MyComponent = () => { ... }

   // ❌ Wrong import
   import MyComponent from './MyComponent'

   // ✅ Correct import
   import { MyComponent } from './MyComponent'
   ```

### Image Loading Issues

#### Images Not Displaying

**Problem**: Images don't load or show broken image icons

**Debugging Steps**:

1. **Check file path**
   ```typescript
   // ✅ Correct for Vite
   <img src="images/vase1.png" alt="Vase" />

   // ❌ Common mistakes
   <img src="/images/vase1.png" alt="Vase" />    // Extra leading slash
   <img src="./images/vase1.png" alt="Vase" />   // Relative path
   <img src="src/images/vase1.png" alt="Vase" /> // Wrong directory
   ```

2. **Verify file exists**
   ```bash
   # Check if file exists in correct location
   ls public/images/vase1.png

   # Check file permissions
   ls -la public/images/
   ```

3. **Check file format**
   ```bash
   # Vite supports these formats
   # PNG, JPEG, JPG, SVG, GIF, WebP

   # Check actual file type
   file public/images/vase1.png
   ```

4. **Case sensitivity issues**
   ```typescript
   // File: public/images/Vase1.PNG

   // ❌ Won't work on Linux/production
   <img src="images/vase1.png" alt="Vase" />

   // ✅ Match exact case
   <img src="images/Vase1.PNG" alt="Vase" />
   ```

#### Image Loading Performance

**Problem**: Images load slowly or cause layout shifts

**Solutions**:

1. **Optimize image sizes**
   ```bash
   # Check image file sizes
   ls -lh public/images/

   # Images should be < 500KB each
   # Use online tools to compress if needed
   ```

2. **Add loading states**
   ```typescript
   const [imageLoaded, setImageLoaded] = useState(false)

   <img
     src="images/vase1.png"
     alt="Vase"
     onLoad={() => setImageLoaded(true)}
     style={{ opacity: imageLoaded ? 1 : 0 }}
   />
   ```

### Component Issues

#### Hover Effects Not Working

**Problem**: Mouse hover effects don't trigger

**Common Causes**:

1. **Z-index issues**
   ```typescript
   // Element might be behind another element
   <div style={{ zIndex: 10 }}>  // Increase z-index
     <img onMouseEnter={handler} />
   </div>
   ```

2. **Pointer events disabled**
   ```typescript
   // Check for pointer-events: none
   <div className="pointer-events-none">  // Remove this class
     <img onMouseEnter={handler} />
   </div>
   ```

3. **Event handler not bound**
   ```typescript
   // ❌ Missing state update
   <div onMouseEnter={() => {}}>

   // ✅ Proper state update
   <div onMouseEnter={() => setIsHovered(true)}>
   ```

#### Positioning Issues

**Problem**: Elements appear in wrong positions

**Debugging Steps**:

1. **Check positioning values**
   ```typescript
   // Add temporary debug background
   style={{
     left: '48%',
     top: '38%',
     backgroundColor: 'rgba(255, 0, 0, 0.3)',  // Debug red background
   }}
   ```

2. **Verify transform origin**
   ```typescript
   // For centered positioning
   style={{
     transform: 'translate(-50%, -50%)',
     transformOrigin: 'center',
   }}
   ```

3. **Check parent container**
   ```typescript
   // Parent needs relative positioning for absolute children
   <div className="relative">  // Add this if missing
     <div className="absolute" style={{ left: '50%' }}>
   ```

### Animation & Performance Issues

#### Choppy Animations

**Problem**: Animations are not smooth (< 60fps)

**Solutions**:

1. **Use GPU-accelerated properties**
   ```typescript
   // ✅ Good - GPU accelerated
   style={{
     transform: 'scale(1.05)',
     opacity: 0.8,
     filter: 'blur(2px)',
   }}

   // ❌ Avoid - causes layout recalculation
   style={{
     width: '120px',
     left: '100px',
     marginTop: '10px',
   }}
   ```

2. **Force GPU acceleration**
   ```typescript
   style={{
     transform: 'translateZ(0)',  // Force GPU layer
     willChange: 'transform',     // Hint to browser
   }}
   ```

3. **Check for too many elements**
   ```bash
   # In browser dev tools, check for:
   # - Too many DOM elements (> 1000)
   # - Multiple overlapping elements
   # - Complex CSS selectors
   ```

#### Memory Leaks

**Problem**: Page becomes slower over time

**Common Causes & Solutions**:

1. **Event listeners not cleaned up**
   ```typescript
   useEffect(() => {
     const handleResize = () => { /* handler */ }
     window.addEventListener('resize', handleResize)

     // ✅ Always return cleanup function
     return () => window.removeEventListener('resize', handleResize)
   }, [])
   ```

2. **Animation frames not cancelled**
   ```typescript
   useEffect(() => {
     const animationId = requestAnimationFrame(animate)

     // ✅ Cancel animation on cleanup
     return () => cancelAnimationFrame(animationId)
   }, [])
   ```

### Responsive Design Issues

#### Layout Breaks on Mobile

**Problem**: Layout doesn't work on mobile devices

**Debugging Steps**:

1. **Test responsive breakpoints**
   ```typescript
   // Add debug info
   const { isMobile, isTablet, screenWidth } = useResponsiveDesign()
   console.log({ isMobile, isTablet, screenWidth })
   ```

2. **Check minimum sizes**
   ```typescript
   // Ensure minimums are set
   style={{
     fontSize: Math.max(12, baseSize * scalingFactor) + 'px',
     minWidth: '300px',
   }}
   ```

3. **Test touch interactions**
   ```typescript
   // Add touch event handlers for mobile
   <div
     onTouchStart={() => setIsHovered(true)}
     onTouchEnd={() => setIsHovered(false)}
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
   >
   ```

#### Scaling Issues

**Problem**: Elements too small or too large on different screens

**Solutions**:

1. **Check scaling factor calculation**
   ```typescript
   // Debug scaling factor
   const scalingFactor = Math.min(screenWidth / 1536, screenHeight / 1024)
   console.log('Scaling factor:', scalingFactor)

   // Ensure it's applied correctly
   style={{
     fontSize: `${18 * scalingFactor}px`,
     transform: `scale(${scalingFactor})`,
   }}
   ```

2. **Add max/min constraints**
   ```typescript
   const clampedScale = Math.max(0.5, Math.min(1.5, scalingFactor))
   ```

## Browser Compatibility Issues

### Safari Issues

**Problem**: Features work in Chrome but not Safari

**Common Solutions**:

1. **CSS Grid/Flexbox differences**
   ```css
   /* Add Safari prefixes if needed */
   display: -webkit-flex;
   display: flex;
   ```

2. **Transform origin differences**
   ```typescript
   style={{
     WebkitTransformOrigin: 'bottom center',
     transformOrigin: 'bottom center',
   }}
   ```

### Mobile Browser Issues

**Problem**: Touch interactions don't work properly

**Solutions**:

1. **Add touch-action CSS**
   ```css
   .interactive-element {
     touch-action: manipulation;
   }
   ```

2. **Prevent zoom on double-tap**
   ```css
   .vase-item {
     touch-action: manipulation;
     user-select: none;
   }
   ```

## Deployment Issues

### GitHub Pages Deployment

**Problem**: Site doesn't load correctly on GitHub Pages

**Common Causes**:

1. **Incorrect base path**
   ```typescript
   // vite.config.ts should have correct base
   export default defineConfig({
     base: '/tors-studio/',  // Repository name
   })
   ```

2. **Asset paths wrong**
   ```bash
   # Check built files in dist/
   ls dist/

   # Verify asset paths in dist/index.html
   cat dist/index.html | grep -E 'src=|href='
   ```

3. **404 errors for images**
   ```bash
   # Check if images copied to dist
   ls dist/images/

   # If missing, check vite.config.ts public directory setting
   ```

### Build Size Issues

**Problem**: Build output too large

**Solutions**:

1. **Analyze bundle size**
   ```bash
   # Install bundle analyzer
   npm install --save-dev rollup-plugin-visualizer

   # Add to vite.config.ts plugins array
   import { visualizer } from 'rollup-plugin-visualizer'

   plugins: [
     react(),
     visualizer()
   ]
   ```

2. **Optimize images**
   ```bash
   # Compress images before building
   # Use online tools or imagemin CLI
   npm install -g imagemin-cli
   imagemin public/images/* --out-dir=public/images/
   ```

## Debugging Tools & Techniques

### Browser DevTools

#### Performance Debugging
```javascript
// In browser console
// Check component re-renders
React DevTools Profiler

// Check animation performance
Performance tab → Record → Interact with vases → Stop

// Check memory usage
Memory tab → Take heap snapshot
```

#### Network Debugging
```javascript
// Check asset loading
Network tab → Reload page → Check for:
// - Failed requests (red)
// - Slow loading assets (> 2s)
// - Large asset sizes (> 1MB)
```

### Console Debugging

#### Add Debug Logging
```typescript
// Add to components for debugging
useEffect(() => {
  console.log('Component mounted:', { props, state })
}, [])

// Debug hover state
useEffect(() => {
  console.log('Hover state changed:', isHovered)
}, [isHovered])

// Debug responsive values
const { isMobile, screenWidth } = useResponsiveDesign()
console.log('Responsive:', { isMobile, screenWidth })
```

#### Performance Monitoring
```typescript
// Monitor render performance
const renderStart = performance.now()

// ... component render logic

const renderEnd = performance.now()
console.log(`Render took ${renderEnd - renderStart} ms`)
```

### Common Error Messages

#### "Cannot read property of undefined"
```typescript
// ❌ Error: Cannot read property 'title' of undefined
console.log(project.title)

// ✅ Fix: Add optional chaining
console.log(project?.title)

// ✅ Or check if exists
if (project && project.title) {
  console.log(project.title)
}
```

#### "React Hook useEffect has missing dependencies"
```typescript
// ❌ ESLint warning
useEffect(() => {
  someFunction(someValue)
}, [])  // Missing someValue in dependencies

// ✅ Fix: Add dependencies
useEffect(() => {
  someFunction(someValue)
}, [someValue])

// ✅ Or use useCallback if function
const memoizedFunction = useCallback(() => {
  someFunction(someValue)
}, [someValue])
```

## Prevention Tips

### Development Best Practices

1. **Always test in multiple browsers**
2. **Use TypeScript strict mode**
3. **Run linting before committing**
4. **Test responsive design regularly**
5. **Monitor console for warnings**
6. **Use React DevTools for debugging**

### Pre-deployment Checklist

- [ ] `npm run type-check` passes
- [ ] `npm run lint` passes
- [ ] `npm run build` succeeds
- [ ] `npm run preview` works correctly
- [ ] Images load on all devices
- [ ] Hover effects work on desktop
- [ ] Touch interactions work on mobile
- [ ] No console errors or warnings

This troubleshooting guide should help you resolve most common issues in the TORS-BORED Studio project. For additional help, refer to the component API documentation or development guide.