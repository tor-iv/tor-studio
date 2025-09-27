'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function StudioTitle() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-30 cursor-pointer transition-transform duration-300 hover:scale-105"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Responsive wrapper with aspect ratio */}
      <div className="relative w-[50vw] max-w-[800px] min-w-[300px]">
        <div className="relative w-full" style={{ paddingBottom: '30%' }}>
          <Image
            src="/images/tors-bored.png"
            alt="TORS-BORED STUDIO"
            fill
            priority
            className={`object-contain transition-all duration-300 ${isHovered ? 'brightness-110 drop-shadow-lg' : 'drop-shadow-md'}`}
            style={{
              filter: isHovered ? 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.3))' : 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2))'
            }}
          />
        </div>
      </div>
    </div>
  )
}