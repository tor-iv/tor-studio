import { VaseData } from './types';

// Original image dimensions for percentage calculations: 1536x1024
export const vaseData: VaseData[] = [
  {
    id: 'tors-bored',
    image: '/images/vase1.png',
    position: { x: 7.81, y: 29.3, width: 9.11, height: 19.53 }, // Converted from 120,300,140,200
    project: {
      id: 'tors-bored',
      title: 'TORS-BORED',
      subtitle: 'Auctioning Potter',
      description: 'A creative pottery auction platform where users can bid on unique handcrafted pottery pieces from talented artisans around the world.',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL'],
      demoUrl: null,
      githubUrl: 'https://github.com/username/tors-bored',
      image: '/images/vase1.png',
    },
  },
  {
    id: 'godo',
    image: '/images/vase3.png',
    position: { x: 27.34, y: 37.11, width: 7.81, height: 15.63 }, // Converted from 420,380,120,160
    project: {
      id: 'godo',
      title: 'GODO',
      subtitle: 'Find stuff to do near you and actually go',
      description: 'A location-based social app that helps users discover activities and events in their area, with features for organizing group meetups.',
      technologies: ['React Native', 'Node.js', 'MongoDB', 'Express', 'Socket.io'],
      demoUrl: null,
      githubUrl: 'https://github.com/username/godo',
      image: '/images/vase3.png',
    },
  },
  {
    id: 'side-project-1',
    image: '/images/vase2.png',
    position: { x: 44.27, y: 24.41, width: 6.51, height: 13.67 }, // Converted from 680,250,100,140
    project: {
      id: 'side-project-1',
      title: 'Creative Portfolio',
      subtitle: 'Digital Art Showcase',
      description: 'A modern web portfolio showcasing digital art and creative projects with interactive galleries and animations.',
      technologies: ['Vue.js', 'GSAP', 'CSS3', 'Firebase'],
      demoUrl: null,
      githubUrl: 'https://github.com/username/portfolio',
      image: '/images/vase2.png',
    },
  },
  {
    id: 'mini-project',
    image: '/images/vase4.jpeg',
    position: { x: 48.83, y: 31.25, width: 5.21, height: 10.74 }, // Converted from 750,320,80,110
    project: {
      id: 'mini-project',
      title: 'Weather Widget',
      subtitle: 'Minimalist Weather App',
      description: 'A clean, minimalist weather application with location-based forecasts and beautiful UI animations.',
      technologies: ['JavaScript', 'Weather API', 'CSS Grid', 'LocalStorage'],
      demoUrl: 'https://weather-widget-demo.vercel.app',
      githubUrl: 'https://github.com/username/weather-widget',
      image: '/images/vase4.jpeg',
    },
  },
  {
    id: 'tomato-project',
    image: '/images/tomato.png',
    position: { x: 20.83, y: 43.95, width: 5.86, height: 8.79 }, // Converted from 320,450,90,90
    project: {
      id: 'tomato-project',
      title: 'FoodTrack',
      subtitle: 'Recipe & Nutrition Tracker',
      description: 'A comprehensive food tracking app that helps users log meals, discover recipes, and monitor nutritional goals.',
      technologies: ['React', 'Redux', 'D3.js', 'Nutrition API', 'PWA'],
      demoUrl: null,
      githubUrl: 'https://github.com/username/foodtrack',
      image: '/images/tomato.png',
    },
  },
];