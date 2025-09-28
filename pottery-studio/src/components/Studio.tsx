import React, { useState, useRef, useEffect } from 'react';

interface StudioProps {}

const Studio: React.FC<StudioProps> = () => {
  const [debugMode, setDebugMode] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageDimensions({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight
      });
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    // Set initial window size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate minimum size to fill viewport while maintaining aspect ratio
  const getImageStyle = () => {
    if (imageDimensions.width === 0 || imageDimensions.height === 0 || windowSize.width === 0) {
      return { width: '100vw', height: '100vh' };
    }

    const viewportAspect = windowSize.width / windowSize.height;
    const imageAspect = imageDimensions.width / imageDimensions.height;

    let displayWidth, displayHeight;

    if (imageAspect > viewportAspect) {
      // Image is wider than viewport aspect ratio
      displayHeight = Math.max(windowSize.height, imageDimensions.height);
      displayWidth = displayHeight * imageAspect;
    } else {
      // Image is taller than viewport aspect ratio
      displayWidth = Math.max(windowSize.width, imageDimensions.width);
      displayHeight = displayWidth / imageAspect;
    }

    return {
      width: `${displayWidth}px`,
      height: `${displayHeight}px`
    };
  };

  const imageStyle = getImageStyle();

  return (
    <div className="relative min-h-screen overflow-auto">
      {/* Image Container */}
      <div className="relative" style={imageStyle}>
        {/* Background Image */}
        <img
          ref={imageRef}
          src="/images/background.jpeg"
          alt="Pottery Studio"
          className="block w-full h-full object-cover"
          onLoad={handleImageLoad}
          style={{ minWidth: '100vw', minHeight: '100vh' }}
        />

        {/* Single Test Shelf Line - positioned relative to image */}
        {imageDimensions.width > 0 && (
          <div
            className="absolute bg-red-500 z-10"
            style={{
              // Position line on a prominent shelf (approximately 38% down, 5% from left)
              top: `${0.38 * parseInt(imageStyle.height)}px`,
              left: `${0.05 * parseInt(imageStyle.width)}px`,
              width: `${0.18 * parseInt(imageStyle.width)}px`,
              height: '3px',
              boxShadow: debugMode ? '0 0 4px rgba(255, 0, 0, 0.8)' : 'none'
            }}
          />
        )}
      </div>

      {/* Fixed UI Elements - positioned relative to viewport */}
      {/* Studio Title */}
      <div className="fixed top-4 sm:top-8 left-1/2 transform -translate-x-1/2 z-50">
        <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-green-800 text-center drop-shadow-lg">
          TORS-BORED STUDIO
        </h1>
      </div>

      {/* Debug Controls */}
      <div className="fixed top-4 sm:top-8 left-4 sm:left-8 z-50">
        <button
          onClick={() => setDebugMode(!debugMode)}
          className={`px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors ${
            debugMode
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-gray-200 hover:bg-gray-300 text-black'
          }`}
        >
          {debugMode ? 'Hide Debug' : 'Show Debug'}
        </button>

        {/* Debug Info */}
        {debugMode && (
          <div className="mt-2 bg-black bg-opacity-70 text-white text-xs p-2 rounded">
            <div>Natural: {imageDimensions.width}x{imageDimensions.height}</div>
            <div>Display: {imageStyle.width} x {imageStyle.height}</div>
            <div>Viewport: {windowSize.width}x{windowSize.height}</div>
          </div>
        )}
      </div>

      {/* About Button */}
      <div className="fixed top-4 sm:top-8 right-4 sm:right-8 z-50">
        <button className="bg-orange-200 hover:bg-orange-300 px-2 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm text-black font-semibold transition-colors">
          ABOUT
        </button>
      </div>
    </div>
  );
};

export default Studio;