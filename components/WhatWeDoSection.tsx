'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function WhatWeDoSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [transitionProgress, setTransitionProgress] = useState(0)
  const [isInTransition, setIsInTransition] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)
  const stickyContentRef = useRef<HTMLDivElement>(null)
  const typographyRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const infoBoxesRef = useRef<HTMLDivElement>(null)
  const transitionTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  // Card data for all 5 services
  const cards = [
    {
      id: 0,
      title: "GROWTH STRATEGY",
      infoBox1: "STRATEGIC ALIGNMENT",
      infoBox2: "MEASURABLE TARGETS"
    },
    {
      id: 1,
      title: "CREATIVE EXCELLENCE",
      infoBox1: "ATTENTION-EARNING CREATIVE",
      infoBox2: "ENGAGEMENT DRIVEN"
    },
    {
      id: 2,
      title: "PERFORMANCE MEDIA",
      infoBox1: "COMPOUND ROI GROWTH",
      infoBox2: "DATA-DRIVEN OPTIMIZATION"
    },
    {
      id: 3,
      title: "DATA SCIENCE",
      infoBox1: "INTELLIGENT DECISIONS",
      infoBox2: "ADVANCED ANALYTICS"
    },
    {
      id: 4,
      title: "CUSTOM AI SOLUTIONS",
      infoBox1: "BESPOKE AI APPLICATIONS",
      infoBox2: "SEAMLESS INTEGRATION"
    }
  ]

  // Initialize intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Split text into animated spans with character-level control
  const createAnimatedText = (text: string, className: string = '') => {
    return text.split(' ').map((word, wordIndex) => (
      <span 
        key={wordIndex} 
        className={`inline-block animated-word word-${wordIndex} ${className}`}
        style={{ marginRight: word === 'IN' ? '0' : '0.3em' }}
      >
        {word.split('').map((char, charIndex) => (
          <span 
            key={charIndex}
            className={`inline-block animated-char char-${wordIndex}-${charIndex}`}
          >
            {char}
          </span>
        ))}
      </span>
    ))
  }

  // Calculate card zone based on scroll progress
  const calculateCardZone = (scrollProg: number) => {
    const totalCards = 5
    const zoneSize = 1 / totalCards // 0.2 per card
    const currentZone = Math.floor(scrollProg / zoneSize)
    const zoneProgress = (scrollProg % zoneSize) / zoneSize
    
    // Clamp to valid range
    const clampedZone = Math.max(0, Math.min(currentZone, totalCards - 1))
    
    // Special handling for the last card - no transitions after it
    if (clampedZone === totalCards - 1) {
      return {
        activeCard: totalCards - 1,
        nextCard: totalCards - 1,
        zoneProgress,
        transitionProgress: 1,
        isInTransition: false
      }
    }
    
    // Determine if in transition phase (15-85% of zone) for non-final cards
    const transitionStart = 0.15
    const transitionEnd = 0.85
    const inTransition = zoneProgress >= transitionStart && zoneProgress <= transitionEnd
    
    if (inTransition) {
      const transProgress = (zoneProgress - transitionStart) / (transitionEnd - transitionStart)
      return {
        activeCard: clampedZone,
        nextCard: clampedZone + 1,
        zoneProgress,
        transitionProgress: transProgress,
        isInTransition: true
      }
    } else {
      // In hold phase
      const finalCard = zoneProgress > 0.5 ? clampedZone + 1 : clampedZone
      return {
        activeCard: finalCard,
        nextCard: finalCard,
        zoneProgress,
        transitionProgress: zoneProgress < 0.5 ? 0 : 1,
        isInTransition: false
      }
    }
  }

  // Create transition timeline (paused, controlled by scroll)
  const createTransitionTimeline = () => {
    const tl = gsap.timeline({ paused: true })
    
    // Exit phase (0 - 0.5)
    tl.to('.animated-word', {
      x: -100,
      opacity: 0,
      duration: 0.5,
      stagger: 0.02,
      ease: 'power2.in'
    }, 0)
    .to(imageRef.current, {
      scale: 0.9,
      opacity: 0,
      rotation: -2,
      duration: 0.5,
      ease: 'power2.in'
    }, 0)
    .to('.info-box', {
      y: 50,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.in'
    }, 0)

    // Enter phase (0.5 - 1.0)
    .set('.animated-word', { x: 100 }, 0.5)
    .set(imageRef.current, { scale: 1.1, rotation: 2 }, 0.5)
    .set('.info-box', { y: 30 }, 0.5)
    
    .to('.animated-word', {
      x: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.02,
      ease: 'power2.out'
    }, 0.5)
    .to(imageRef.current, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, 0.5)
    .to('.info-box', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out'
    }, 0.5)

    return tl
  }

  // Handle scroll progress updates
  const handleScrollProgress = (progress: number) => {
    const zoneData = calculateCardZone(progress)
    
    setScrollProgress(progress)
    setIsInTransition(zoneData.isInTransition)
    setTransitionProgress(zoneData.transitionProgress)
    
    if (zoneData.isInTransition) {
      // During transition, update timeline progress
      if (transitionTimelineRef.current) {
        // Update content at midpoint (0.5)
        if (zoneData.transitionProgress < 0.5) {
          setCurrentCard(zoneData.activeCard)
        } else {
          setCurrentCard(zoneData.nextCard)
        }
        
        // Update timeline progress
        transitionTimelineRef.current.progress(zoneData.transitionProgress)
      }
    } else {
      // In hold phase, set static state
      setCurrentCard(zoneData.activeCard)
      
      // Reset timeline to appropriate state
      if (transitionTimelineRef.current) {
        transitionTimelineRef.current.progress(zoneData.transitionProgress)
      }
    }
    
    // Update progress bar
    if (progressBarRef.current) {
      gsap.set(progressBarRef.current, { scaleX: progress })
    }
  }

  // Initialize ScrollTrigger and transition timeline
  useEffect(() => {
    if (!isVisible || typeof window === 'undefined') return

    // Create transition timeline
    const transitionTL = createTransitionTimeline()
    transitionTimelineRef.current = transitionTL

    // Main ScrollTrigger for the section
    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: stickyContentRef.current,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        handleScrollProgress(self.progress)
      },
      onRefresh: () => {
        // Reset to first card on refresh
        setCurrentCard(0)
        setScrollProgress(0)
        setTransitionProgress(0)
        setIsInTransition(false)
      }
    })

    scrollTriggerRef.current = scrollTrigger

    // Initialize first card state
    gsap.set('.animated-word', { opacity: 1, x: 0 })
    gsap.set(imageRef.current, { opacity: 1, scale: 1, rotation: 0 })
    gsap.set('.info-box', { opacity: 1, y: 0 })

    return () => {
      scrollTrigger.kill()
      transitionTL.kill()
    }
  }, [isVisible])

  // Handle dot navigation with smooth scrolling
  const goToCard = (targetIndex: number) => {
    if (!sectionRef.current) return
    
    // Calculate scroll position for the target card
    const sectionTop = sectionRef.current.offsetTop
    const targetProgress = (targetIndex / 5) + (0.1 / 5) // Center of target zone
    const sectionHeight = sectionRef.current.offsetHeight
    const targetScroll = sectionTop + (targetProgress * sectionHeight * 0.8) // 80% to center the card
    
    // Smooth scroll to target
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    })
  }

  // Get active dot based on current card and transition progress
  const getActiveDot = () => {
    if (isInTransition && transitionProgress > 0.5) {
      return Math.min(currentCard + 1, cards.length - 1)
    }
    return currentCard
  }

  return (
    <section 
      id="what-we-do" 
      ref={sectionRef} 
      className="relative bg-white"
      style={{ height: '500vh' }} // 5x viewport height for scroll zones
    >
      {/* Scroll Container */}
      <div className="relative w-full h-full">
        
        {/* Sticky Content */}
        <div 
          ref={stickyContentRef}
          className="sticky top-0 h-screen w-full flex flex-col justify-center py-24 overflow-hidden"
        >
          <div className="section-padding">
            <div className="container-max">
              
              {/* Section Header */}
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="text-center mb-16">
                  <span className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4 block">
                    [02] WHAT WE DO
                  </span>
                </div>
              </div>

              {/* Main Content Layout */}
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start min-h-[500px]">
                  
                  {/* Left Side - Typography Area (60%) */}
                  <div className="lg:col-span-7">
                    <div ref={typographyRef} className="space-y-4">
                      <h2 className="font-dm-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight text-brand-black">
                        {createAnimatedText(cards[currentCard].title)}
                      </h2>
                    </div>
                  </div>

                  {/* Right Side - Image Area (40%) */}
                  <div className="lg:col-span-5">
                    <div 
                      ref={imageRef}
                      className="relative h-96 lg:h-[500px] bg-gray-200 rounded-2xl overflow-hidden"
                      style={{ willChange: 'transform' }}
                    >
                      {/* Industrial machinery placeholder */}
                      <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400"></div>
                      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
                      
                      {/* Placeholder elements to simulate machinery */}
                      <div className="absolute top-1/4 left-1/4 w-16 h-16 bg-gray-500 rounded-full opacity-60"></div>
                      <div className="absolute top-1/2 right-1/4 w-8 h-24 bg-gray-600 rounded-lg opacity-70"></div>
                      <div className="absolute bottom-1/4 left-1/3 w-20 h-8 bg-gray-500 rounded opacity-50"></div>
                      
                      {/* Overlay text */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="text-xs text-white font-medium opacity-80">
                          INDUSTRIAL PRECISION MEETS DIGITAL INNOVATION
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info Boxes */}
                <div ref={infoBoxesRef} className="mt-12 lg:mt-16">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
                    <div className="info-box bg-[#c8ff00] p-6 lg:p-8 rounded-2xl" style={{ willChange: 'transform' }}>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-brand-black rounded-full"></div>
                        <span className="font-bold text-brand-black text-lg tracking-wide">
                          {cards[currentCard].infoBox1}
                        </span>
                      </div>
                    </div>
                    <div className="info-box bg-[#c8ff00] p-6 lg:p-8 rounded-2xl" style={{ willChange: 'transform' }}>
                      <div className="flex items-center space-x-3">
                        <div className="w-3 h-3 bg-brand-black rounded-full"></div>
                        <span className="font-bold text-brand-black text-lg tracking-wide">
                          {cards[currentCard].infoBox2}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fixed Navigation & Progress - Bottom of sticky content */}
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            
            {/* Dot Navigation */}
            <div className="flex items-center justify-center mb-4 space-x-4 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
              {cards.map((_, index) => {
                const activeDot = getActiveDot()
                return (
                  <button
                    key={index}
                    onClick={() => goToCard(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      activeDot === index 
                        ? 'bg-brand-red scale-125' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to card ${index + 1}`}
                  />
                )
              })}
            </div>
            
            {/* Progress Bar */}
            <div className="max-w-xs mx-auto">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  ref={progressBarRef}
                  className="h-full bg-brand-red origin-left scale-x-0"
                  style={{ willChange: 'transform' }}
                ></div>
              </div>
            </div>

            {/* Scroll Progress Indicator */}
            <div className="text-center mt-2">
              <span className="text-xs text-gray-500 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                {Math.round(scrollProgress * 100)}% • Card {currentCard + 1} of {cards.length}
              </span>
            </div>
          </div>
        </div>

        {/* CTA Section - At the very end */}
        <div className="absolute bottom-0 left-0 right-0 py-16 bg-white">
          <div className="section-padding">
            <div className="container-max">
              <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="text-center">
                  <button 
                    className="btn-primary text-lg px-8 py-4 hover:scale-105 transform transition-all duration-200"
                    onClick={() => {
                      document.getElementById('communities')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                  >
                    See our services
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
