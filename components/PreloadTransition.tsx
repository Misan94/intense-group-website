'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Image from 'next/image'

interface PreloadTransitionProps {
  onComplete: () => void
}

export default function PreloadTransition({ onComplete }: PreloadTransitionProps) {
  const [transitionPhase, setTransitionPhase] = useState<'initial' | 'zooming' | 'revealing' | 'complete'>('initial')
  const [showSkipButton, setShowSkipButton] = useState(false)
  
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLDivElement>(null)
  const backgroundRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const timelineRef = useRef<gsap.core.Timeline | null>(null)
  const skipTimerRef = useRef<NodeJS.Timeout>()

  // Preload critical resources
  const preloadResources = async () => {
    try {
      // Preload logo image
      const logoImage = new window.Image()
      logoImage.src = '/logo.png'
      await new Promise((resolve, reject) => {
        logoImage.onload = resolve
        logoImage.onerror = reject
      })
      
      // Preload fonts
      await document.fonts.load('bold 1em "DM Serif Display"')
      await document.fonts.load('normal 1em "Quicksand"')
      return true
    } catch (error) {
      console.warn('Resource preloading failed:', error)
      return true // Continue anyway
    }
  }

  // Get responsive animation values
  const getAnimationValues = () => {
    const isMobile = window.innerWidth < 768
    const isTablet = window.innerWidth < 1024
    
    return {
      // Zoom levels - start extremely zoomed in
      initialScale: isMobile ? 15 : isTablet ? 20 : 25,
      finalScale: 1,
      // Animation durations
      zoomDuration: isMobile ? 2 : 2.5,
      revealDuration: isMobile ? 1 : 1.5,
      totalDuration: isMobile ? 3.5 : 4
    }
  }

  // Create cinematic logo zoom timeline
  const createAnimationTimeline = () => {
    if (!logoRef.current || !containerRef.current || !backgroundRef.current || !overlayRef.current) return

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

    // Initial state - extreme zoom with overlay
    tl.set(logoRef.current, {
      scale: values.initialScale,
      opacity: 1,
      transformOrigin: 'center center'
    })
    .set(overlayRef.current, {
      opacity: 0.8
    })
    .set(backgroundRef.current, {
      opacity: 0
    })

    // Phase 1: Zoom out reveal (0-2.5s)
    tl.to(logoRef.current, {
      scale: values.finalScale,
      duration: values.zoomDuration,
      ease: "power2.out",
      onStart: () => setTransitionPhase('zooming')
    })
    .to(overlayRef.current, {
      opacity: 0,
      duration: values.zoomDuration * 0.7,
      ease: "power2.inOut"
    }, 0.3)

    // Phase 2: Background reveal (2s-4s)
    tl.to(backgroundRef.current, {
      opacity: 1,
      duration: values.revealDuration,
      ease: "power2.inOut",
      onStart: () => setTransitionPhase('revealing')
    }, "-=0.5")

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

    const initAnimation = async () => {
      // Preload resources
      await preloadResources()
      
      // Small delay to ensure DOM is ready
      setTimeout(() => {
        timelineRef.current = createAnimationTimeline()
      }, 200)
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
      className="fixed inset-0 z-[9999] bg-black overflow-hidden flex items-center justify-center"
      style={{ willChange: 'transform' }}
    >
      {/* Background Elements - Hidden Initially */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 opacity-0"
        style={{ willChange: 'opacity' }}
      >
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/20 via-green-900/20 to-amber-800/20" />
        
        {/* Subtle Pattern Overlay */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255, 206, 84, 0.1) 0%, transparent 50%)
            `
          }}
        />
      </div>

      {/* Logo Container */}
      <div 
        ref={logoRef}
        className="relative z-10 flex items-center justify-center"
        style={{ 
          willChange: 'transform',
          transformOrigin: 'center center'
        }}
      >
        <Image
          src="/logo.png"
          alt="Intense Group"
          width={200}
          height={67}
          className="w-auto h-16 md:h-20 lg:h-24 object-contain brightness-0 invert"
          priority
          style={{ willChange: 'transform' }}
        />
      </div>

      {/* Dark Overlay - Fades Out During Animation */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 z-5"
        style={{ willChange: 'opacity' }}
      />

      {/* Skip Button */}
      {showSkipButton && (
        <button
          onClick={skipAnimation}
          className="fixed top-8 right-8 text-white/70 hover:text-white text-sm font-medium transition-colors duration-200 z-20"
          aria-label="Skip animation"
        >
          Skip →
        </button>
      )}

      {/* Phase Indicator */}
      <div className="fixed bottom-8 left-8 z-20">
        <div className="flex items-center space-x-3">
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            transitionPhase === 'initial' ? 'bg-white' : 'bg-white/30'
          }`} />
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            transitionPhase === 'zooming' ? 'bg-white' : 'bg-white/30'
          }`} />
          <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
            transitionPhase === 'revealing' ? 'bg-white' : 'bg-white/30'
          }`} />
        </div>
      </div>
    </div>
  )
}
