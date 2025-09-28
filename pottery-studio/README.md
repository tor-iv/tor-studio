# Tors-Bored Studio

A React-based interactive pottery studio website showcasing projects as vases positioned on shelves.

## Features

- **Full-screen background**: Responsive pottery studio background image with aspect ratio preservation
- **Interactive shelves**: Positioned anchor lines with hover-enabled ViewBoxes
- **Vase positioning**: Percentage-based positioning system for consistent placement across screen sizes
- **Perspective scaling**: Vases and ViewBoxes scale based on depth to simulate perspective
- **Visual debugging**: Toggle debug mode to see all shelf lines and ViewBox boundaries
- **Project links**: Each vase can link to a project (GitHub, portfolio, etc.)
- **Responsive design**: Works across desktop, tablet, and mobile devices with viewport-based scaling

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Deploy to GitHub Pages
npm run deploy
```

## Project Structure

```
src/
├── components/
│   ├── Studio.tsx          # Main studio component
│   ├── ShelfSystem.tsx     # Manages shelf positioning
│   ├── ShelfLine.tsx       # Visible shelf anchor lines
│   ├── ViewBox.tsx         # Interactive areas above shelves
│   └── VaseItem.tsx        # Individual vase components
├── data/
│   └── vasesData.ts        # Vase configuration and project links
├── types/
│   └── vase.ts             # TypeScript type definitions
└── App.tsx                 # Main app component
```

## Adding New Projects

To add a new project vase:

1. Add your vase image to the `public/images/` directory
2. Update `src/data/vasesData.ts` with your vase configuration:

```typescript
{
  id: 'unique-id',
  name: 'Project Name',
  image: '/images/your-vase.png',
  shelfId: 'top-left', // Choose from available shelf IDs
  position: { x: 50, y: 50 }, // Percentage position within ViewBox
  size: { width: 40, height: 60 }, // Size in pixels
  projectLink: 'https://your-project-link.com',
}
```

## Available Shelf IDs

- **Left wall**: `left-top`, `left-upper-mid`, `left-mid`, `left-lower-mid`, `left-bottom`
- **Right wall**: `right-top`, `right-upper-mid`, `right-mid`, `right-lower-mid`, `right-bottom`
- **Window table**: `window-table` - Table under the back window
- **Round table**: `round-table` - Foreground round table

## Debug Mode

Click the "Show Debug" button in the top-left to:
- Highlight all shelf lines in red
- Show ViewBox boundaries in green
- Display shelf IDs on all ViewBoxes
- Verify positioning alignment with background image

## Deployment

The project is configured for GitHub Pages deployment. Run `npm run deploy` to build and deploy to your gh-pages branch.

## Tech Stack

- React 19 + TypeScript
- Vite for build tooling
- Tailwind CSS for styling
- GitHub Pages for hosting
