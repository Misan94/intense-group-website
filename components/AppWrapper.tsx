'use client'

import { useState, useEffect } from 'react'
import PreloadTransition from './PreloadTransition'

interface AppWrapperProps {
  children: React.ReactNode
}

export default function AppWrapper({ children }: AppWrapperProps) {
  const [isPreloadComplete, setIsPreloadComplete] = useState(false)
  const [showContent, setShowContent] = useState(false)

  // Handle preload completion
  const handlePreloadComplete = () => {
    setIsPreloadComplete(true)
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowContent(true)
    }, 100)
  }

  // Check if this is the first visit or if we should show preload
  useEffect(() => {
    // You can add logic here to skip preload on subsequent visits
    // For now, always show preload
    const shouldSkipPreload = false // sessionStorage.getItem('preload-seen')
    
    if (shouldSkipPreload) {
      setIsPreloadComplete(true)
      setShowContent(true)
    }
  }, [])

  return (
    <>
      {/* Preload Transition */}
      {!isPreloadComplete && (
        <PreloadTransition onComplete={handlePreloadComplete} />
      )}

      {/* Main Content */}
      <div 
        className={`transition-opacity duration-500 ${
          showContent ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          visibility: showContent ? 'visible' : 'hidden',
          willChange: 'opacity'
        }}
      >
        {children}
      </div>
    </>
  )
}
