# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is "TORS-BORED STUDIO" - a Next.js interactive portfolio project that recreates a pottery studio design. The project transforms design assets into an interactive web experience with hover animations, clickable portfolio pieces, and modal interactions.

## Technology Stack

- **Framework**: Next.js 14 (App Router) with TypeScript
- **Styling**: Tailwind CSS + CSS Modules for animations
- **Animations**: Framer Motion + CSS Transitions
- **Deployment**: Vercel with custom domain
- **PWA**: next-pwa plugin for offline functionality
- **Icons**: React Icons for contact links

## Project Structure

```
tors-studio/
├── src/app/                    # Next.js App Router pages
├── src/components/             # React components
│   ├── Studio.tsx             # Main studio container
│   ├── VaseItem.tsx           # Individual vase component
│   ├── AboutSign.tsx          # Animated about sign
│   ├── ProjectModal.tsx       # Project detail modal
│   ├── AboutModal.tsx         # About me modal
│   └── ContactSection.tsx     # Contact links
├── src/lib/                   # Utilities and data
│   ├── vase-data.ts          # Vase positioning and project info
│   └── types.ts              # TypeScript interfaces
├── public/images/            # All design assets
├── PROJECT_PLAN.md           # Complete project architecture
└── IMPLEMENTATION_STEPS.md   # 30 detailed execution steps
```

## Common Development Commands

```bash
# Project setup
npm install                    # Install dependencies
npm run dev                   # Start development server
npm run build                 # Build for production
npm run start                 # Start production server

# Development workflow
npm run lint                  # Run ESLint
npm run type-check           # Run TypeScript checking
npm run build && npm run start  # Test production build
```

## Key Architecture Concepts

### Component Design Pattern
- **VaseItem Components**: Reusable components for portfolio pieces with precise positioning, hover effects, and click handlers
- **Modal System**: Centralized modal management with smooth animations and accessibility features
- **Responsive Positioning**: Pixel-perfect positioning that adapts across device sizes

### Asset Integration Strategy
- All images stored in `public/images/` for Next.js optimization
- Image positioning based on pixel-perfect measurements from "final look.png"
- Hover overlays with project titles and subtitles
- Lazy loading with Next.js Image component

### Animation System
- CSS-in-JS animations for hover effects (scale, glow)
- Framer Motion for modal transitions
- CSS Modules for reusable animation classes
- Performance-optimized 60fps animations

## Development Phases

The project follows a structured 6-phase development approach detailed in IMPLEMENTATION_STEPS.md:

1. **Phase 1**: Next.js Setup & Basic Layout (5 steps)
2. **Phase 2**: Asset Positioning & Components (5 steps)
3. **Phase 3**: Interactive Features (6 steps)
4. **Phase 4**: Content & Data (4 steps)
5. **Phase 5**: Polish & Optimization (5 steps)
6. **Phase 6**: Deployment & Launch (5 steps)

## Image Assets Mapping

- `background.jpeg` → Main studio background
- `tors-bored.png` → Studio title (top center)
- `about.png` → Hanging sign (top right, animated)
- `vase1.png` → "TORS-BORED" project (Owl vase)
- `vase3.png` → "GODO" project (Geometric vase, center table)
- `vase2.png`, `vase4.jpeg`, `tomato.png` → Additional portfolio pieces
- `final look.png` → Reference design for positioning

## Deployment Configuration

- **Target**: Vercel with custom domain `tors-iv-portfolio.vercel.app`
- **PWA**: Offline functionality with service worker
- **Performance**: <3s load time, >90 Lighthouse score target

## Development Guidelines

- Follow pixel-perfect positioning based on final look.png reference
- Maintain 60fps animation performance
- Implement accessibility features (ARIA labels, keyboard navigation)
- Use TypeScript strict mode for all components
- Optimize images for web deployment
- Test across all device breakpoints (desktop, tablet, mobile)