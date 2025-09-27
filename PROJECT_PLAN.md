# TORS-BORED STUDIO - Next.js Interactive Portfolio

## Project Overview
Interactive pottery studio website recreating the "final look.png" design using Next.js, deployable on Vercel. Features hover animations, clickable portfolio pieces, and an engaging about section.

## Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + CSS Modules for animations
- **Deployment**: Vercel (Custom domain: tors-iv-portfolio.vercel.app)
- **Image Optimization**: Next.js Image component
- **Animations**: Framer Motion + CSS Transitions
- **PWA**: Next.js PWA plugin for offline functionality
- **Icons**: React Icons for contact links

## Project Structure
```
tors-studio/
├── public/
│   └── images/           # All current PNG/JPEG assets
├── src/
│   ├── app/
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Main studio page
│   │   └── globals.css   # Global styles
│   ├── components/
│   │   ├── Studio.tsx    # Main studio container
│   │   ├── VaseItem.tsx  # Individual vase component
│   │   ├── AboutSign.tsx # Animated about sign
│   │   ├── ProjectModal.tsx # Project detail modal
│   │   ├── AboutModal.tsx   # About me modal
│   │   ├── ContactSection.tsx # Contact links
│   │   └── StudioTitle.tsx  # Main title component
│   ├── lib/
│   │   ├── vase-data.ts  # Vase positioning and project info
│   │   └── types.ts      # TypeScript interfaces
│   └── styles/
│       ├── studio.module.css    # Studio-specific styles
│       └── animations.module.css # Animation classes
├── package.json
├── next.config.js
├── tailwind.config.js
├── vercel.json          # Vercel configuration
└── public/
    ├── manifest.json    # PWA manifest
    ├── sw.js           # Service worker
    └── icons/          # PWA icons
```

## Asset Integration Plan

### Image Assets Mapping
- `background.jpeg` → Main studio background
- `tors-bored.png` → Studio title (positioned top center)
- `about.png` → Hanging sign (top right, animated)
- `vase1.png` → Owl vase (shelf position TBD)
- `vase2.png` → Light textured vase (shelf position TBD)
- `vase3.png` → Geometric vase (center table)
- `vase4.jpeg` → Green bottle vase (shelf position TBD)
- `tomato.png` → Tomato piece (shelf position TBD)

## Component Architecture

### 1. Studio Component (Main Container)
```tsx
// Manages overall layout and state
- Background image layer
- Overlay elements positioning
- Modal state management
- Responsive design handling
```

### 2. VaseItem Component
```tsx
interface VaseItemProps {
  src: string;
  alt: string;
  position: { x: number; y: number };
  project: ProjectData;
  size: { width: number; height: number };
}

// Features:
- Hover animations (scale, glow)
- Hover text overlay (title + subtitle)
- Click handlers for project modal
- Pixel-perfect positioning to match final look.png
- Lazy loading with Next.js Image
```

### 3. AboutSign Component
```tsx
// Features:
- Hover detection in top-right area
- CSS swing animation on rope
- Click to expand AboutModal with personal info
- Smooth transitions
```

### 4. AboutModal Component
```tsx
// Features:
- Education background
- Hobbies and interests
- Personal photos
- Professional journey
- Integrated ContactSection
```

### 5. ContactSection Component
```tsx
// Features:
- Email link
- LinkedIn profile
- GitHub profile
- Additional social links
- React Icons integration
```

### 6. ProjectModal Component
```tsx
interface ProjectModalProps {
  project: ProjectData | null;
  isOpen: boolean;
  onClose: () => void;
}

// Features:
- Slide-in animation
- Project details display
- Title and subtitle from hover
- Technology stack used
- Live demo and GitHub links
- Close on backdrop click
```

## Development Phases

### Phase 1: Next.js Setup & Basic Layout
- [ ] Initialize Next.js project with TypeScript
- [ ] Configure Tailwind CSS and Framer Motion
- [ ] Set up PWA configuration with next-pwa
- [ ] Set up project structure
- [ ] Add all image assets to public folder
- [ ] Create basic Studio component with background
- [ ] Configure Vercel deployment settings

### Phase 2: Asset Positioning & Components
- [ ] Implement VaseItem components with pixel-perfect positioning
- [ ] Add hover text overlays (title + subtitle)
- [ ] Add StudioTitle component with proper styling
- [ ] Create responsive design breakpoints
- [ ] Implement hover states with scale and glow effects

### Phase 3: Interactive Features
- [ ] Build ProjectModal with project data structure
- [ ] Add click handlers for each vase
- [ ] Implement AboutSign with hover/click animations
- [ ] Create AboutModal with education, hobbies, photos
- [ ] Build ContactSection with social links
- [ ] Create smooth transitions between states

### Phase 4: Content & Data
- [ ] Define project data for vases:
  - vase1: "TORS-BORED" - "Auctioning Potter"
  - vase3: "GODO" - "Find stuff to do near you and actually go"
  - Additional vases with titles/subtitles
- [ ] Create about content (education, hobbies, photos)
- [ ] Add contact information (email, LinkedIn, GitHub)
- [ ] Implement image optimization

### Phase 5: Polish & Optimization
- [ ] Add loading states and error handling
- [ ] Implement accessibility features
- [ ] Optimize images and performance
- [ ] Test responsive design
- [ ] Cross-browser testing

### Phase 6: Deployment
- [ ] Configure Vercel deployment
- [ ] Set up custom domain: tors-iv-portfolio.vercel.app
- [ ] Configure PWA service worker
- [ ] Test offline functionality
- [ ] Test production build
- [ ] Deploy to Vercel

## Animation Specifications

### Vase Hover Effects
```css
/* Scale and glow on hover */
.vase-item:hover {
  transform: scale(1.1);
  filter: drop-shadow(0 0 20px rgba(255, 255, 255, 0.3));
  transition: all 0.3s ease-in-out;
}

/* Text overlay on hover */
.vase-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.vase-item:hover .vase-overlay {
  opacity: 1;
}
```

### About Sign Animation
```css
/* Swing down animation */
.about-sign {
  transform-origin: top center;
  transition: transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}

.about-sign.animated {
  transform: rotate(0deg) translateY(20px);
}
```

### Modal Animations
- Slide in from right: `translateX(100%) → translateX(0)`
- Backdrop fade: `opacity: 0 → opacity: 1`
- Duration: 300ms ease-in-out

## Vase Positioning Strategy

Based on "final look.png" analysis (pixel-perfect matching):
1. **Center Table**: vase3.png (geometric/"GODO") - main focal point
2. **Left Shelves**: vase1.png (owl/"TORS-BORED"), vase4.jpeg (bottle)
3. **Right Shelves**: vase2.png (textured), tomato.png
4. **Exact coordinates** measured from final look.png using CSS absolute positioning
5. **Responsive breakpoints** maintain relative positions across devices

## Responsive Design Breakpoints

- **Desktop**: 1200px+ (original design)
- **Tablet**: 768px-1199px (adjusted positioning)
- **Mobile**: <768px (stacked/simplified layout)

## Vercel Deployment Configuration

### vercel.json
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "domains": ["tors-iv-portfolio.vercel.app"]
}
```

### PWA Configuration
```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  // Next.js config
})
```

### Environment Setup
- No environment variables needed initially
- PWA service worker for offline functionality
- Future: Analytics, CMS integration if needed

## Success Metrics
1. **Visual Accuracy**: Pixel-perfect match to final look.png layout
2. **Interaction Quality**: Smooth 60fps animations
3. **Performance**: <3s load time, >90 Lighthouse score
4. **Offline Functionality**: Works without internet connection
5. **Accessibility**: WCAG 2.1 AA compliance
6. **Responsiveness**: Works on all device sizes

## Specific Project Data

### Confirmed Vase Projects
1. **vase1.png (Owl Vase)**
   - Title: "TORS-BORED"
   - Subtitle: "Auctioning Potter"
   - Description: [To be defined]

2. **vase3.png (Geometric Vase)**
   - Title: "GODO"
   - Subtitle: "Find stuff to do near you and actually go"
   - Description: [To be defined]

3. **Additional Vases** (vase2, vase4, tomato)
   - Titles/subtitles to be defined
   - Project descriptions to be added

### About Section Content
- Education background
- Hobbies and interests
- Personal photos
- Professional journey
- Contact information (email, LinkedIn, GitHub)

## Future Enhancements
- [ ] Add more project pieces
- [ ] Implement blog/news section
- [ ] Integration with CMS for content management
- [ ] Advanced animations (3D effects, particle systems)
- [ ] Performance analytics with Vercel Analytics