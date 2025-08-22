'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface PreloadTransitionProps {
  onComplete: () => void
}

export default function PreloadTransition({ onComplete }: PreloadTransitionProps) {
  const [transitionPhase, setTransitionPhase] = useState<'initial' | 'rising' | 'complete'>('initial')
  const [showSkipButton, setShowSkipButton] = useState(false)
  const [fontSize, setFontSize] = useState('text-6xl md:text-7xl lg:text-8xl xl:text-9xl')
  
  const containerRef = useRef<HTMLDivElement>(null)
  const typographyRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const skipTimerRef = useRef<NodeJS.Timeout>()

  // Preload critical resources
  const preloadResources = async () => {
    try {
      // Preload fonts
      await document.fonts.load('bold 1em "DM Serif Display"')
      await document.fonts.load('normal 1em "Quicksand"')
      return true
    } catch (error) {
      console.warn('Font preloading failed:', error)
      return true // Continue anyway
    }
  }

  // Calculate responsive font size to ensure text fits
  const getResponsiveTextSize = () => {
    const screenWidth = window.innerWidth
    const screenHeight = window.innerHeight
    
    if (screenWidth < 640) {
      return 'text-4xl md:text-5xl' // Mobile
    } else if (screenWidth < 1024) {
      return 'text-5xl md:text-6xl lg:text-7xl' // Tablet
    } else if (screenHeight < 700) {
      return 'text-6xl md:text-7xl lg:text-8xl' // Short desktop screens
    } else {
      return 'text-6xl md:text-7xl lg:text-8xl xl:text-9xl' // Full desktop
    }
  }

  // Get responsive animation values
  const getAnimationValues = () => {
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth < 1024
    
    return {
      finalY: isMobile ? -250 : isTablet ? -350 : -450,
      duration: isMobile ? 1.5 : 2,
      totalDuration: 3 // Fixed 3 seconds total
    }
  }

  // Calculate initial position to ensure full text visibility
  const getInitialPosition = () => {
    const isMobile = window.innerWidth < 768
    return {
      bottom: isMobile ? 40 : 60,
      left: isMobile ? 16 : 32
    }
  }

  // Create simplified animation timeline
  const createAnimationTimeline = () => {
    if (!typographyRef.current || !containerRef.current) return

    const values = getAnimationValues()
    
    // Create main timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setTransitionPhase('complete')
        // Instant hide and show content
        if (containerRef.current) {
          containerRef.current.style.display = 'none'
        }
        onComplete()
      }
    })

    // Phase 1: Instant show (0s)
    tl.set(typographyRef.current, {
      opacity: 1,
      y: 0,
      visibility: 'visible'
    })

    // Phase 2: Rising animation (0.5s delay, then 2s duration)
    tl.to(typographyRef.current, {
      y: values.finalY,
      duration: values.duration,
      ease: "power3.inOut",
      delay: 0.5,
      onStart: () => setTransitionPhase('rising')
    })

    return tl
  }

  // Skip animation
  const skipAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.kill()
    }
    if (skipTimerRef.current) {
      clearTimeout(skipTimerRef.current)
    }
    setTransitionPhase('complete')
    if (containerRef.current) {
      containerRef.current.style.display = 'none'
    }
    onComplete()
  }

  // Initialize animation
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Skip animation for accessibility
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.display = 'none'
        }
        onComplete()
      }, 500)
      return
    }

    // Set responsive font size
    setFontSize(getResponsiveTextSize())

    const initAnimation = async () => {
      // Preload resources
      await preloadResources()
      
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        timelineRef.current = createAnimationTimeline()
      }, 100)
    }

    initAnimation()

    // Show skip button after 1.5 seconds
    skipTimerRef.current = setTimeout(() => {
      setShowSkipButton(true)
    }, 1500)

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      if (skipTimerRef.current) {
        clearTimeout(skipTimerRef.current)
      }
    }
  }, [onComplete])

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setFontSize(getResponsiveTextSize())
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const position = getInitialPosition()

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black overflow-visible"
      style={{ 
        willChange: 'transform',
        padding: '40px'
      }}
    >
      {/* Main Typography */}
      <div 
        ref={typographyRef}
        className="absolute"
        style={{ 
          bottom: `${position.bottom}px`,
          left: `${position.left}px`,
          willChange: 'transform',
          maxWidth: `calc(100vw - ${position.left * 2}px)`,
          lineHeight: '0.85'
        }}
      >
        <h1 className={`font-dm-serif ${fontSize} font-bold leading-none text-yellow-400 mb-2`}>
          The
        </h1>
        <h1 className={`font-dm-serif ${fontSize} font-bold leading-none text-yellow-400 mb-2`}>
          Intense
        </h1>
        <h1 className={`font-dm-serif ${fontSize} font-bold leading-none text-yellow-400`}>
          Group
        </h1>
      </div>

      {/* Skip Button */}
      {showSkipButton && (
        <button
          onClick={skipAnimation}
          className="fixed top-8 right-8 text-yellow-400/70 hover:text-yellow-400 text-sm font-medium transition-colors duration-200 z-10"
          aria-label="Skip animation"
        >
          Skip →
        </button>
      )}
    </div>
  )
}
