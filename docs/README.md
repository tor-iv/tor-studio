# TORS-BORED Studio Documentation

Welcome to the complete documentation for the TORS-BORED Studio project! This documentation is organized into two main sections to help you both learn React/frontend development and understand this specific project.

## 📚 Documentation Structure

### 🎓 Learning Documentation (`docs/learning/`)
*For learning React and frontend development concepts*

These guides use examples from the TORS-BORED Studio codebase to teach React and frontend development:

1. **[React Fundamentals](learning/REACT_FUNDAMENTALS.md)** - Core React concepts with your code examples
2. **[Codebase Walkthrough](learning/CODEBASE_WALKTHROUGH.md)** - Line-by-line explanation of components
3. **[React Hooks Guide](learning/REACT_HOOKS_GUIDE.md)** - useState, useEffect, and custom hooks
4. **[Styling & Animations](learning/STYLING_AND_ANIMATIONS.md)** - CSS, Tailwind, and animation techniques
5. **[TypeScript Basics](learning/TYPESCRIPT_BASICS.md)** - TypeScript with React
6. **[Glossary](learning/GLOSSARY.md)** - Quick reference for React/frontend terms

### 🚀 Project Documentation (`docs/project/`)
*For working with this specific repository*

These guides are specific to the TORS-BORED Studio project:

1. **[Project Architecture](project/PROJECT_ARCHITECTURE.md)** - Technical architecture overview
2. **[Development Guide](project/DEVELOPMENT_GUIDE.md)** - Development workflow and best practices
3. **[Component API](project/COMPONENT_API.md)** - Detailed API for all components and hooks
4. **[Troubleshooting](project/TROUBLESHOOTING.md)** - Common issues and solutions
5. **[Feature Roadmap](project/FEATURE_ROADMAP.md)** - Current status and planned features
6. **[Deployment Guide](project/DEPLOYMENT_GUIDE.md)** - Deploy to GitHub Pages and other platforms

## 🎯 Quick Start Guides

### For Learning React
**New to React?** Start here:
1. [React Fundamentals](learning/REACT_FUNDAMENTALS.md) - Get the basics
2. [Codebase Walkthrough](learning/CODEBASE_WALKTHROUGH.md) - See concepts in action
3. [React Hooks Guide](learning/REACT_HOOKS_GUIDE.md) - Understand state and effects

### For Working on This Project
**Want to develop features?** Start here:
1. [Development Guide](project/DEVELOPMENT_GUIDE.md) - Set up your environment
2. [Component API](project/COMPONENT_API.md) - Understand the components
3. [Project Architecture](project/PROJECT_ARCHITECTURE.md) - See the big picture

### For Deploying This Project
**Ready to deploy?** Go here:
1. [Deployment Guide](project/DEPLOYMENT_GUIDE.md) - Complete deployment instructions

## 🔍 Finding What You Need

### I want to...

**Learn React concepts** → `docs/learning/`
- **Understand components** → [React Fundamentals](learning/REACT_FUNDAMENTALS.md)
- **Learn about state** → [React Hooks Guide](learning/REACT_HOOKS_GUIDE.md)
- **Understand styling** → [Styling & Animations](learning/STYLING_AND_ANIMATIONS.md)
- **Get TypeScript help** → [TypeScript Basics](learning/TYPESCRIPT_BASICS.md)

**Work on this project** → `docs/project/`
- **Set up development** → [Development Guide](project/DEVELOPMENT_GUIDE.md)
- **Add new features** → [Component API](project/COMPONENT_API.md)
- **Fix issues** → [Troubleshooting](project/TROUBLESHOOTING.md)
- **Deploy the site** → [Deployment Guide](project/DEPLOYMENT_GUIDE.md)

**Look up terms** → [Glossary](learning/GLOSSARY.md)

## 📖 Reading Order

### For Complete Beginners
1. [React Fundamentals](learning/REACT_FUNDAMENTALS.md)
2. [Codebase Walkthrough](learning/CODEBASE_WALKTHROUGH.md)
3. [React Hooks Guide](learning/REACT_HOOKS_GUIDE.md)
4. [Development Guide](project/DEVELOPMENT_GUIDE.md)

### For Experienced Developers
1. [Project Architecture](project/PROJECT_ARCHITECTURE.md)
2. [Component API](project/COMPONENT_API.md)
3. [Development Guide](project/DEVELOPMENT_GUIDE.md)

### For Contributors
1. [Development Guide](project/DEVELOPMENT_GUIDE.md)
2. [Component API](project/COMPONENT_API.md)
3. [Feature Roadmap](project/FEATURE_ROADMAP.md)
4. [Troubleshooting](project/TROUBLESHOOTING.md)

## 🛠️ Development Quick Reference

### Common Commands
```bash
# Start development
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Linting
npm run lint

# Deploy to GitHub Pages
npm run deploy
```

### Key Files
- **Components**: `src/components/`
- **Hooks**: `src/hooks/`
- **Data**: `src/lib/vase-data.ts`
- **Types**: `src/lib/types.ts`
- **Config**: `vite.config.ts`

## 🤝 Contributing

When adding new features or fixing issues:

1. **Read the guides**: Check [Development Guide](project/DEVELOPMENT_GUIDE.md)
2. **Understand the API**: Review [Component API](project/COMPONENT_API.md)
3. **Check the roadmap**: See [Feature Roadmap](project/FEATURE_ROADMAP.md)
4. **Test thoroughly**: Follow [Troubleshooting](project/TROUBLESHOOTING.md) for testing

## 📝 Updating Documentation

When modifying components or adding features:

- **Update Component API** if you change component interfaces
- **Update Development Guide** if you change workflows
- **Update Troubleshooting** if you encounter new issues
- **Update Feature Roadmap** when completing features

## 🎨 Project Overview

TORS-BORED Studio is an interactive portfolio website that recreates a pottery studio experience. Users explore pottery pieces (representing projects) through hover interactions and can click to view detailed project information.

**Tech Stack**: React 19, TypeScript, Vite, Tailwind CSS, Framer Motion
**Deployment**: GitHub Pages with PWA support
**Features**: Responsive design, smooth animations, interactive portfolio pieces

---

*This documentation is designed to grow with the project. If you find areas that need improvement or have suggestions, feel free to contribute!*