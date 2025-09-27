'use client'

import Image from 'next/image'
import { ReactNode } from 'react'

interface StudioProps {
  children?: ReactNode
}

export default function Studio({ children }: StudioProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src="/images/background.jpeg"
          alt="Pottery studio background"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Overlay Container for positioned elements */}
      <div className="absolute inset-0 z-10">
        {children}
      </div>
    </div>
  )
}