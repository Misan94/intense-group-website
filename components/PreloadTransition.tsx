'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface PreloadTransitionProps {
  onComplete: () => void
}

export default function PreloadTransition({ onComplete }: PreloadTransitionProps) {
  const [transitionPhase, setTransitionPhase] = useState<'initial' | 'rising' | 'complete'>('initial')
  const [showSkipButton, setShowSkipButton] = useState(false)
  
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

  // Split text into individual characters for animation
  const splitTextIntoChars = (element: HTMLElement) => {
    const text = element.textContent || ''
    element.innerHTML = text.split('').map(char => 
      `<span class="inline-block char" style="will-change: transform, opacity;">${char === ' ' ? '&nbsp;' : char}</span>`
    ).join('')
  }

  // Get responsive animation values
  const getAnimationValues = () => {
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth < 1024
    
    return {
      initialY: 0,
      finalY: isMobile ? -300 : isTablet ? -400 : -500,
      duration: isMobile ? 1.5 : 2,
      staggerDelay: isMobile ? 0.03 : 0.05,
      totalDuration: isMobile ? 3 : 4
    }
  }

  // Create main animation timeline
  const createAnimationTimeline = () => {
    if (!typographyRef.current || !containerRef.current) return

    const values = getAnimationValues()
    
    // Split each line into characters
    const lines = typographyRef.current.querySelectorAll('h1')
    lines.forEach(line => splitTextIntoChars(line as HTMLElement))

    // Create main timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setTransitionPhase('complete')
        setTimeout(onComplete, 300)
      }
    })

    // Phase 1: Initial fade-in of characters (0-1s)
    tl.set('.char', {
      y: 50,
      opacity: 0,
      rotationX: -90
    })
    .to('.char', {
      y: 0,
      opacity: 1,
      rotationX: 0,
      duration: 0.8,
      stagger: values.staggerDelay,
      ease: "back.out(1.7)"
    })

    // Phase 2: Rising animation (1-3s)
    tl.to(typographyRef.current, {
      y: values.finalY,
      duration: values.duration,
      ease: "power3.inOut",
      delay: 0.5,
      onStart: () => setTransitionPhase('rising')
    })

    // Phase 3: Background and container transition (3-4s)
    tl.to(containerRef.current, {
      backgroundColor: 'rgba(0, 0, 0, 0)',
      duration: 0.8,
      ease: "power2.inOut"
    }, "-=0.5")
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.2")

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
    onComplete()
  }

  // Initialize animation
  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      // Skip animation for accessibility
      setTimeout(onComplete, 500)
      return
    }

    const initAnimation = async () => {
      // Preload resources
      await preloadResources()
      
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        timelineRef.current = createAnimationTimeline()
      }, 100)
    }

    initAnimation()

    // Show skip button after 2 seconds
    skipTimerRef.current = setTimeout(() => {
      setShowSkipButton(true)
    }, 2000)

    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill()
      }
      if (skipTimerRef.current) {
        clearTimeout(skipTimerRef.current)
      }
    }
  }, [onComplete])

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-black flex items-end justify-start overflow-hidden"
      style={{ willChange: 'opacity, background-color' }}
    >
      {/* Main Typography */}
      <div 
        ref={typographyRef}
        className="ml-8 md:ml-12 lg:ml-16 xl:ml-20 mb-20 md:mb-24 lg:mb-28"
        style={{ willChange: 'transform' }}
      >
        <h1 className="font-dm-serif text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none text-yellow-400 mb-4">
          The
        </h1>
        <h1 className="font-dm-serif text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none text-yellow-400 mb-4">
          Intense
        </h1>
        <h1 className="font-dm-serif text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none text-yellow-400">
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

      {/* Loading Indicator */}
      <div className="fixed bottom-8 left-8 md:left-12 lg:left-16 xl:left-20">
        <div className="flex items-center space-x-3">
          <div className="w-1 h-1 bg-yellow-400/50 rounded-full animate-pulse"></div>
          <div className="w-1 h-1 bg-yellow-400/50 rounded-full animate-pulse delay-150"></div>
          <div className="w-1 h-1 bg-yellow-400/50 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  )
}
