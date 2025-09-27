# Vase Positioning Fix - Scale-Independent Layout

## Current Issues

Based on the screenshot, the vases are not maintaining their correct positions relative to the background image when the viewport scales. The main problems are:

1. **Incorrect Scaling Calculation**: The current implementation calculates scaling based on the container dimensions but doesn't properly account for how the background image is being displayed (`object-cover`).

2. **Aspect Ratio Mismatch**: The Studio component sets a 3:2 aspect ratio but the background image dimensions are 1536x1024 (3:2), yet the scaling calculations aren't properly aligned with how the image actually renders.

3. **Absolute Positioning Issues**: Vases are positioned absolutely but their reference point isn't properly anchored to the background image's rendered dimensions.

## Root Cause Analysis

### Background Image Behavior
- Background uses `object-cover` which scales the image to cover the entire container
- At different viewport sizes, different portions of the image may be cropped
- The vases need to track the visible portion of the background, not the container dimensions

### Current Scaling Logic Flaws
```typescript
// Current problematic code in VaseItem.tsx
const containerWidth = Math.min(screenWidth, screenHeight * (3/2));
const containerHeight = Math.min(screenHeight, screenWidth * (2/3));
const scalingFactor = Math.min(containerWidth / 1536, containerHeight / 1024)
```

This assumes the full 1536x1024 image is always visible, which isn't true with `object-cover`.

## Solution Approach

### 1. Fix Studio Container Layout
- Remove fixed aspect ratio constraint
- Let the container fill the viewport naturally
- Ensure the background image scaling is predictable

### 2. Implement Proper Image-Relative Positioning
- Calculate the actual rendered dimensions of the background image
- Determine the visible portion of the image
- Position vases relative to the image content, not the container

### 3. New Positioning Algorithm

```typescript
// Proposed approach:
// 1. Get the actual rendered size of the background image
// 2. Calculate the scale factor based on how the image is displayed
// 3. Position vases based on percentage positions relative to the image

interface ImageDimensions {
  renderedWidth: number;
  renderedHeight: number;
  offsetX: number; // horizontal offset if image is centered
  offsetY: number; // vertical offset if image is centered
}
```

## Required Changes

### 1. Studio.tsx Changes
- Remove hardcoded aspect ratio
- Add data attributes or ref to track background image dimensions
- Consider using `object-fit: contain` with a background color instead of `cover` for predictable positioning

### 2. VaseItem.tsx Changes
- Rewrite scaling calculation to account for actual image rendering
- Use percentage-based positioning relative to the image dimensions
- Add proper offset calculations for centered images

### 3. Alternative: Percentage-Based Positioning
Convert all absolute pixel positions to percentages:
```typescript
// Instead of:
position: { x: 120, y: 300, width: 140, height: 200 }

// Use:
position: {
  x: 7.8125,    // (120/1536) * 100
  y: 29.297,    // (300/1024) * 100
  width: 9.115, // (140/1536) * 100
  height: 19.53 // (200/1024) * 100
}
```

### 4. Responsive Utilities Update
Create a new utility function to handle image-relative positioning:
```typescript
export function getImageRelativePosition(
  imageNaturalWidth: number,
  imageNaturalHeight: number,
  containerWidth: number,
  containerHeight: number,
  objectFit: 'cover' | 'contain',
  vasePosition: { x: number, y: number, width: number, height: number }
) {
  // Calculate how the image is rendered within the container
  // Return adjusted position for the vase
}
```

## Implementation Steps

1. **Update Studio Component**
   - Change background image handling to be more predictable
   - Add mechanism to track actual image dimensions

2. **Create Position Calculation Utility**
   - Build a utility that correctly calculates vase positions based on image rendering
   - Account for different object-fit scenarios

3. **Update Vase Data**
   - Convert positions to percentage-based values
   - Or keep pixel values but ensure they're relative to the original image dimensions

4. **Update VaseItem Component**
   - Use new positioning calculation
   - Ensure positions are relative to the visible portion of the background

5. **Test Across Breakpoints**
   - Verify positions remain correct at all viewport sizes
   - Test with different aspect ratios
   - Ensure vases stay aligned with their intended spots on the background

## Quick Fix (Immediate Solution)

For an immediate fix, switch to percentage-based positioning:

1. Convert all vase positions to percentages of the original image dimensions
2. Use CSS percentage positioning instead of pixel values
3. Ensure the container that holds the vases matches the background image container exactly

This approach will maintain relative positions regardless of scale, though it may not handle all edge cases perfectly.

## Testing Checklist

- [ ] Vases maintain position on desktop (1920x1080)
- [ ] Vases maintain position on laptop (1366x768)
- [ ] Vases maintain position on tablet (768x1024)
- [ ] Vases maintain position on mobile (375x667)
- [ ] Vases maintain position when browser is resized
- [ ] Vases maintain position in both portrait and landscape orientations
- [ ] No vases appear outside the visible background image area