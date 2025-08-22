'use client'

import { useState, useEffect } from 'react'
import PreloadTransition from './PreloadTransition'

interface AppWrapperProps {
  children: React.ReactNode
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const [isPreloadComplete, setIsPreloadComplete] = useState(false)

  // Handle preload completion - instant show
  const handlePreloadComplete = () => {
    setIsPreloadComplete(true)
  }

  // Check if this is the first visit or if we should show preload
  useEffect(() => {
    // You can add logic here to skip preload on subsequent visits
    // For now, always show preload
    const shouldSkipPreload = false // sessionStorage.getItem('preload-seen')
    
    if (shouldSkipPreload) {
      setIsPreloadComplete(true)
    }
  }, [])

  return (
    <>
      {/* Preload Transition */}
      {!isPreloadComplete && (
        <PreloadTransition onComplete={handlePreloadComplete} />
      )}

      {/* Main Content - Show instantly when preload completes */}
      <div 
        style={{ 
          display: isPreloadComplete ? 'block' : 'none'
        }}
      >
        {children}
      </div>
    </>
  )
}
