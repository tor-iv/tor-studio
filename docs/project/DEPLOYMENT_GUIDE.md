# TORS-BORED Studio - Deployment Guide

*Complete guide for deploying the TORS-BORED Studio to GitHub Pages and other platforms*

## Overview

This guide covers deployment options for the TORS-BORED Studio project, with primary focus on GitHub Pages deployment. The project is configured for static hosting with PWA capabilities.

## Current Configuration

The project is pre-configured for GitHub Pages deployment with the following settings:

### Vite Configuration
```typescript
// vite.config.ts
export default defineConfig({
  base: '/tors-studio/',  // Repository name for GitHub Pages
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          motion: ['framer-motion']
        }
      }
    }
  }
})
```

### PWA Configuration
```typescript
VitePWA({
  registerType: 'autoUpdate',
  workbox: {
    globPatterns: ['**/*.{js,css,html,ico,png,svg,jpeg,jpg}'],
    maximumFileSizeToCacheInBytes: 5 * 1024 * 1024 // 5MB
  },
  manifest: {
    name: 'TORS-BORED Studio',
    short_name: 'TORS Studio',
    description: 'Interactive pottery studio portfolio',
    theme_color: '#ffffff'
  }
})
```

## GitHub Pages Deployment

### Method 1: GitHub Actions (Recommended)

This method automatically deploys when you push to the main branch.

#### Step 1: Create GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v4

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'

    - name: Install dependencies
      run: npm ci

    - name: Build project
      run: npm run build

    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      if: github.ref == 'refs/heads/main'
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

#### Step 2: Configure Repository Settings

1. **Go to repository Settings**
2. **Navigate to Pages section**
3. **Set Source to "Deploy from a branch"**
4. **Select branch: `gh-pages`**
5. **Select folder: `/ (root)`**

#### Step 3: Deploy

```bash
# Commit and push your changes
git add .
git commit -m "Add GitHub Actions deployment"
git push origin main

# GitHub Actions will automatically deploy
# Check Actions tab for deployment status
```

### Method 2: Manual Deployment

For one-time or manual deployments:

#### Step 1: Install GitHub Pages CLI

```bash
npm install -g gh-pages
```

#### Step 2: Add Deploy Script

Add to `package.json`:

```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

#### Step 3: Deploy

```bash
# Build and deploy
npm run deploy

# Your site will be available at:
# https://your-username.github.io/tors-studio/
```

### Verification

After deployment, verify your site:

1. **Visit the URL**: `https://your-username.github.io/tors-studio/`
2. **Check PWA functionality**: Open dev tools → Application → Service Workers
3. **Test all features**: Hover effects, click interactions, responsive design
4. **Verify assets**: All images should load correctly

## Alternative Deployment Platforms

### Vercel Deployment

#### Step 1: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 2: Configure for Vercel

Update `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/',  // Root path for Vercel
  // ... rest of configuration
})
```

#### Step 3: Deploy

```bash
# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? (select your account)
# - Link to existing project? No
# - Project name? tors-studio
# - Directory? ./
# - Override settings? No
```

#### Step 4: Production Deployment

```bash
# Deploy to production
vercel --prod
```

### Netlify Deployment

#### Method 1: Drag and Drop

1. **Build the project**:
   ```bash
   npm run build
   ```

2. **Visit Netlify**: Go to [netlify.com](https://netlify.com)

3. **Drag and drop**: Drag the `dist` folder to Netlify

#### Method 2: Git Integration

1. **Push to GitHub**: Ensure code is in GitHub repository

2. **Connect to Netlify**:
   - Go to Netlify dashboard
   - Click "New site from Git"
   - Choose GitHub
   - Select your repository

3. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: `18`

4. **Deploy**: Netlify will automatically deploy on git push

### Static Hosting Services

#### Surge.sh

```bash
# Install Surge
npm install -g surge

# Build project
npm run build

# Deploy
cd dist
surge

# Follow prompts for domain name
```

#### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login
firebase login

# Initialize
firebase init hosting

# Configure:
# - Public directory: dist
# - Single page app: Yes
# - Overwrite index.html: No

# Build and deploy
npm run build
firebase deploy
```

## Environment Configuration

### Environment Variables

For different deployment environments, create environment files:

#### `.env.production`
```bash
VITE_APP_ENV=production
VITE_BASE_URL=https://your-username.github.io/tors-studio/
```

#### `.env.development`
```bash
VITE_APP_ENV=development
VITE_BASE_URL=http://localhost:3000/
```

### Using Environment Variables

```typescript
// In your components
const baseUrl = import.meta.env.VITE_BASE_URL
const environment = import.meta.env.VITE_APP_ENV
```

## Custom Domain Setup

### GitHub Pages with Custom Domain

#### Step 1: Configure DNS

Add these DNS records with your domain provider:

```
Type: CNAME
Name: www
Value: your-username.github.io

Type: A
Name: @
Values:
  185.199.108.153
  185.199.109.153
  185.199.110.153
  185.199.111.153
```

#### Step 2: Configure Repository

1. **Add CNAME file** to `public/` directory:
   ```bash
   echo "your-domain.com" > public/CNAME
   ```

2. **Update repository settings**:
   - Go to Settings → Pages
   - Add your custom domain
   - Enable "Enforce HTTPS"

#### Step 3: Update Configuration

Update `vite.config.ts` for custom domain:

```typescript
export default defineConfig({
  base: '/',  // Root path for custom domain
  // ... rest of configuration
})
```

## Performance Optimization

### Build Optimization

#### Analyze Bundle Size

```bash
# Install bundle analyzer
npm install -g rollup-plugin-visualizer

# Add to vite.config.ts
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    VitePWA(/* config */),
    visualizer({
      filename: 'dist/stats.html',
      open: true
    })
  ]
})

# Build and analyze
npm run build
# Opens stats.html in browser
```

#### Image Optimization

```bash
# Install image optimization tools
npm install -g imagemin-cli imagemin-webp

# Optimize images
imagemin public/images/*.{jpg,png} --out-dir=public/images/ --plugin=webp
```

### CDN Configuration

For better performance, consider using a CDN:

#### Cloudflare Setup

1. **Create Cloudflare account**
2. **Add your domain**
3. **Update DNS to Cloudflare nameservers**
4. **Enable caching and minification**

#### Configuration for CDN

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'assets/[name].[hash].js',
        entryFileNames: 'assets/[name].[hash].js',
      }
    }
  }
})
```

## Monitoring & Analytics

### Core Web Vitals

Add to `index.html`:

```html
<script>
  import {getCLS, getFID, getFCP, getLCP, getTTFB} from 'web-vitals';

  function sendToAnalytics(metric) {
    // Send to your analytics service
    console.log(metric);
  }

  getCLS(sendToAnalytics);
  getFID(sendToAnalytics);
  getFCP(sendToAnalytics);
  getLCP(sendToAnalytics);
  getTTFB(sendToAnalytics);
</script>
```

### Error Tracking

Add error tracking service:

```typescript
// In main.tsx
window.addEventListener('error', (event) => {
  console.error('Global error:', event.error)
  // Send to error tracking service
})

window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason)
  // Send to error tracking service
})
```

## Deployment Checklist

### Pre-deployment

- [ ] `npm run type-check` passes without errors
- [ ] `npm run lint` passes without warnings
- [ ] `npm run build` completes successfully
- [ ] All images optimized and under 500KB
- [ ] Environment variables configured
- [ ] Base URL configured correctly
- [ ] PWA manifest configured

### Testing

- [ ] Test build locally with `npm run preview`
- [ ] Verify all images load correctly
- [ ] Test hover effects and interactions
- [ ] Verify responsive design on mobile
- [ ] Test PWA installation
- [ ] Check console for errors

### Post-deployment

- [ ] Site loads correctly at deployed URL
- [ ] All assets load without 404 errors
- [ ] Interactive features work as expected
- [ ] PWA service worker registers correctly
- [ ] Performance metrics acceptable (< 3s load time)
- [ ] Mobile experience tested
- [ ] SEO metadata present

## Troubleshooting Deployment

### Common Issues

#### Assets Not Loading

**Problem**: Images or CSS not loading on deployed site

**Solutions**:
1. Check base URL configuration in `vite.config.ts`
2. Verify asset paths don't start with `/`
3. Check if files exist in `dist/` after build

#### PWA Not Working

**Problem**: Service worker not registering

**Solutions**:
1. Check HTTPS is enabled (required for PWA)
2. Verify manifest.json is accessible
3. Check service worker scope

#### Build Fails on CI

**Problem**: GitHub Actions build fails

**Solutions**:
1. Check Node.js version compatibility
2. Verify all dependencies in package.json
3. Check for environment-specific issues

### Debug Commands

```bash
# Check build output
ls -la dist/

# Verify asset references
grep -r "src=" dist/index.html

# Test production build locally
npm run build && npm run preview

# Check PWA manifest
curl https://your-site.com/manifest.json
```

This deployment guide provides comprehensive instructions for deploying the TORS-BORED Studio to various platforms while maintaining optimal performance and PWA functionality.