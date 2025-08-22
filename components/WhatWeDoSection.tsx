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
  const [isScrollTriggerActive, setIsScrollTriggerActive] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)
  const stickyContentRef = useRef<HTMLDivElement>(null)
  const typographyRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const infoBoxesRef = useRef<HTMLDivElement>(null)
  const transitionTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)


  // Card data for all 5 services
  const cards = [
    {
      id: 0,
      title: "GROWTH STRATEGY",
      description: "We turn business goals into an execution roadmap, clear KPIs, roles, and an operating cadence that keeps every team in sync.",
      infoBox1: "STRATEGIC ALIGNMENT",
      infoBox2: "MEASURABLE TARGETS"
    },
    {
      id: 1,
      title: "CREATIVE EXCELLENCE",
      description: "Insight-led ideas, crafted for each platform, that stop the scroll and start conversations, built to drive brand and demand.",
      infoBox1: "ATTENTION-EARNING CREATIVE",
      infoBox2: "ENGAGEMENT DRIVEN"
    },
    {
      id: 2,
      title: "PERFORMANCE MEDIA",
      description: "Full-funnel plans with constant testing and smart reallocation, so every pound works harder and results improve quarter after quarter.",
      infoBox1: "COMPOUND ROI GROWTH",
      infoBox2: "DATA-DRIVEN OPTIMIZATION"
    },
    {
      id: 3,
      title: "DATA SCIENCE",
      description: "We connect your data, surface leading indicators, and use AI to guide faster, smarter moves with measurement you can trust.",
      infoBox1: "INTELLIGENT DECISIONS",
      infoBox2: "ADVANCED ANALYTICS"
    },
    {
      id: 4,
      title: "CUSTOM AI SOLUTIONS",
      description: "We design and build useful AI apps, assistants and automations rooted in real workflows and measured by outcomes.",
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
    .to('.service-description', {
      x: -50,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in'
    }, 0.1)
    .to(imageRef.current, {
      scale: 0.9,
      opacity: 0,
      rotation: -2,
      duration: 0.5,
      ease: 'power2.in'
    }, 0)
    .to('.bullet-item', {
      y: 30,
      opacity: 0,
      duration: 0.4,
      stagger: 0.1,
      ease: 'power2.in'
    }, 0)
    .to('.bullet-char', {
      y: -10,
      opacity: 0,
      duration: 0.3,
      stagger: 0.02,
      ease: 'power2.in'
    }, 0)
    .to('.connecting-line', {
      scaleY: 0,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    }, 0.1)

    // Enter phase (0.5 - 1.0)
    .set('.animated-word', { x: 100 }, 0.5)
    .set('.service-description', { x: 50 }, 0.5)
    .set(imageRef.current, { scale: 1.1, rotation: 2 }, 0.5)
    .set('.bullet-item', { y: 20 }, 0.5)
    .set('.bullet-char', { y: 10, opacity: 0 }, 0.5)
    .set('.connecting-line', { scaleY: 0 }, 0.5)
    
    .to('.animated-word', {
      x: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.02,
      ease: 'power2.out'
    }, 0.5)
    .to('.service-description', {
      x: 0,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, 0.6)
    .to(imageRef.current, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 0.5,
      ease: 'power2.out'
    }, 0.5)
    .to('.bullet-item', {
      y: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.15,
      ease: 'power2.out'
    }, 0.7)
    .to('.bullet-char', {
      y: 0,
      opacity: 1,
      duration: 0.4,
      stagger: 0.03,
      ease: 'power2.out'
    }, 0.8)
    .to('.connecting-line', {
      scaleY: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    }, 0.85)

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
      onEnter: () => {
        setIsScrollTriggerActive(true)
      },
      onLeave: () => {
        setIsScrollTriggerActive(false)
      },
      onEnterBack: () => {
        setIsScrollTriggerActive(true)
      },
      onLeaveBack: () => {
        setIsScrollTriggerActive(false)
      },
      onRefresh: () => {
        // Reset to first card on refresh
        setCurrentCard(0)
        setScrollProgress(0)
        setTransitionProgress(0)
        setIsInTransition(false)
        setIsScrollTriggerActive(false)
      }
    })

    scrollTriggerRef.current = scrollTrigger

    // Initialize first card state
    gsap.set('.animated-word', { opacity: 1, x: 0 })
    gsap.set('.service-description', { opacity: 1, x: 0 })
    gsap.set(imageRef.current, { opacity: 1, scale: 1, rotation: 0 })
    gsap.set('.bullet-item', { opacity: 1, y: 0 })
    gsap.set('.bullet-char', { opacity: 1, y: 0 })
    gsap.set('.connecting-line', { opacity: 1, scaleY: 1 })

    return () => {
      scrollTrigger.kill()
      transitionTL.kill()
    }
  }, [isVisible])



  return (
    <section 
      id="what-we-do" 
      ref={sectionRef} 
      className="relative bg-brand-black"
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
                  <span className="text-sm font-semibold text-white/70 tracking-wider uppercase mb-4 block">
                    [02] WHAT WE DO
                  </span>
                </div>
              </div>

              {/* Main Content Layout */}
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start min-h-[500px]">
                  
                  {/* Left Side - Typography Area (60%) */}
                  <div className="lg:col-span-7">
                    <div ref={typographyRef} className="space-y-6">
                      <h2 className="font-dm-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white">
                        {createAnimatedText(cards[currentCard].title)}
                      </h2>
                      <p className="service-description text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-2xl">
                        {cards[currentCard].description}
                      </p>
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

                {/* Sophisticated Bullet List */}
                <div ref={infoBoxesRef} className="mt-12 lg:mt-16">
                  <div className="max-w-3xl">
                    <div className="space-y-6">
                      {/* Bullet Item 1 */}
                      <div className="bullet-item flex items-start space-x-4 group" style={{ willChange: 'transform' }}>
                        {/* Custom Checkmark Bullet */}
                        <div className="bullet-point flex-shrink-0 mt-1">
                          <div className="relative w-6 h-6">
                            {/* Checkmark background circle */}
                            <div className="absolute inset-0 bg-brand-red rounded-full opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-red/30"></div>
                            {/* Checkmark icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg 
                                className="w-3.5 h-3.5 text-white transition-all duration-300 group-hover:scale-110" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={3} 
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 bg-brand-red rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                          </div>
                        </div>
                        
                        {/* Bullet Text */}
                        <div className="bullet-text flex-1">
                          <span className="text-white/90 text-lg font-medium leading-relaxed tracking-wide transition-all duration-300 group-hover:text-white">
                            {cards[currentCard].infoBox1.split('').map((char, index) => (
                              <span 
                                key={index}
                                className={`bullet-char inline-block transition-all duration-100 ${char === ' ' ? 'w-2' : ''}`}
                                style={{ 
                                  animationDelay: `${index * 50}ms`,
                                  willChange: 'transform, opacity'
                                }}
                              >
                                {char === ' ' ? '\u00A0' : char}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>

                      {/* Connecting Line */}
                      <div className="connecting-line ml-3 w-px h-4 bg-gradient-to-b from-brand-red/60 to-brand-red/20"></div>

                      {/* Bullet Item 2 */}
                      <div className="bullet-item flex items-start space-x-4 group" style={{ willChange: 'transform' }}>
                        {/* Custom Checkmark Bullet */}
                        <div className="bullet-point flex-shrink-0 mt-1">
                          <div className="relative w-6 h-6">
                            {/* Checkmark background circle */}
                            <div className="absolute inset-0 bg-brand-red rounded-full opacity-90 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-brand-red/30"></div>
                            {/* Checkmark icon */}
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg 
                                className="w-3.5 h-3.5 text-white transition-all duration-300 group-hover:scale-110" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                              >
                                <path 
                                  strokeLinecap="round" 
                                  strokeLinejoin="round" 
                                  strokeWidth={3} 
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            </div>
                            {/* Subtle glow effect */}
                            <div className="absolute inset-0 bg-brand-red rounded-full blur-md opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                          </div>
                        </div>
                        
                        {/* Bullet Text */}
                        <div className="bullet-text flex-1">
                          <span className="text-white/90 text-lg font-medium leading-relaxed tracking-wide transition-all duration-300 group-hover:text-white">
                            {cards[currentCard].infoBox2.split('').map((char, index) => (
                              <span 
                                key={index}
                                className={`bullet-char inline-block transition-all duration-100 ${char === ' ' ? 'w-2' : ''}`}
                                style={{ 
                                  animationDelay: `${index * 50}ms`,
                                  willChange: 'transform, opacity'
                                }}
                              >
                                {char === ' ' ? '\u00A0' : char}
                              </span>
                            ))}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>



        {/* CTA Section - At the very end */}
        <div className="absolute bottom-0 left-0 right-0 py-16 bg-brand-black">
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
