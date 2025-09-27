import { ReactNode } from 'react'

interface StudioProps {
  children?: ReactNode
}

export default function Studio({ children }: StudioProps) {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src="images/background.jpeg"
          alt="Pottery studio background"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Overlay Container for positioned elements */}
      <div className="absolute inset-0 z-10">
        {children}
      </div>
    </div>
  )
}