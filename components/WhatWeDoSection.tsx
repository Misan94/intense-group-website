'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function WhatWeDoSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const typographyRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const infoBoxesRef = useRef<HTMLDivElement>(null)
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  // Card data for all 5 services
  const cards = [
    {
      id: 0,
      title: "THE NEW STANDARD IN",
      subtitle: "GROWTH STRATEGY",
      infoBox1: "STRATEGIC ALIGNMENT",
      infoBox2: "MEASURABLE TARGETS"
    },
    {
      id: 1,
      title: "THE NEW STANDARD IN",
      subtitle: "CREATIVE EXCELLENCE",
      infoBox1: "ATTENTION-EARNING CREATIVE",
      infoBox2: "ENGAGEMENT DRIVEN"
    },
    {
      id: 2,
      title: "THE NEW STANDARD IN",
      subtitle: "PERFORMANCE MEDIA",
      infoBox1: "COMPOUND ROI GROWTH",
      infoBox2: "DATA-DRIVEN OPTIMIZATION"
    },
    {
      id: 3,
      title: "THE NEW STANDARD IN",
      subtitle: "DATA & AI SOLUTIONS",
      infoBox1: "INTELLIGENT DECISIONS",
      infoBox2: "ADVANCED ANALYTICS"
    },
    {
      id: 4,
      title: "THE NEW STANDARD IN",
      subtitle: "CUSTOM AI DEVELOPMENT",
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

  // Split text into animated spans
  const createAnimatedText = (text: string, className: string = '') => {
    return text.split(' ').map((word, index) => (
      <span 
        key={index} 
        className={`inline-block animated-word ${className}`}
        style={{ marginRight: word === 'IN' ? '0' : '0.3em' }}
      >
        {word}
      </span>
    ))
  }

  // Create card transition timeline
  const createCardTransition = (fromIndex: number, toIndex: number) => {
    const tl = gsap.timeline()
    
    // Phase 1: Exit Animation (0.8s)
    tl.to('.animated-word', {
      x: -100,
      opacity: 0,
      duration: 0.8,
      stagger: 0.05,
      ease: 'power2.in'
    })
    .to(imageRef.current, {
      scale: 0.9,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in'
    }, '<')
    .to('.info-box', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power2.in'
    }, '<')

    // Phase 2: Content Switch (0.2s)
    .call(() => {
      setCurrentCard(toIndex)
    })
    .set('.animated-word', { x: 100 })
    .set(imageRef.current, { scale: 1.1, rotation: 2 })
    .set('.info-box', { y: 30 })

    // Phase 3: Enter Animation (1.0s)
    .to('.animated-word', {
      x: 0,
      opacity: 1,
      duration: 1.0,
      stagger: 0.05,
      ease: 'power2.out'
    })
    .to(imageRef.current, {
      scale: 1,
      opacity: 1,
      rotation: 0,
      duration: 1.0,
      ease: 'power2.out'
    }, '<0.2')
    .to('.info-box', {
      y: 0,
      opacity: 1,
      duration: 1.0,
      stagger: 0.1,
      ease: 'power2.out'
    }, '<0.3')

    return tl
  }

  // Initialize GSAP master timeline
  useEffect(() => {
    if (!isVisible || typeof window === 'undefined') return

    // Create master timeline
    const masterTL = gsap.timeline({ 
      repeat: -1,
      paused: isPaused
    })

    // Add each card with transitions
    cards.forEach((card, index) => {
      const nextIndex = (index + 1) % cards.length
      
      if (index === 0) {
        // First card - just show it
        masterTL.set('.animated-word', { opacity: 1, x: 0 })
        .set(imageRef.current, { opacity: 1, scale: 1 })
        .set('.info-box', { opacity: 1, y: 0 })
        .to({}, { duration: 4 }) // Hold for 4 seconds
      } else {
        // Add transition to next card
        masterTL.add(createCardTransition(index - 1, index))
        .to({}, { duration: 3 }) // Hold for 3 seconds after transition
      }
    })

    // Add final transition back to first card
    masterTL.add(createCardTransition(cards.length - 1, 0))

    // Progress bar animation
    const progressTL = gsap.timeline({ repeat: -1 })
    progressTL.to(progressRef.current, {
      scaleX: 1,
      duration: 4,
      ease: 'none'
    })
    .set(progressRef.current, { scaleX: 0 })

    masterTimelineRef.current = masterTL
    masterTL.play()

    return () => {
      masterTL.kill()
      progressTL.kill()
    }
  }, [isVisible, isPaused])

  // Handle dot navigation
  const goToCard = (index: number) => {
    if (masterTimelineRef.current) {
      setCurrentCard(index)
      // Calculate timeline position for the card
      const cardDuration = 7 // 2s transition + 4s hold + 1s buffer
      masterTimelineRef.current.seek(index * cardDuration)
    }
  }

  // Handle hover pause/play
  const handleMouseEnter = () => {
    setIsPaused(true)
    if (masterTimelineRef.current) {
      masterTimelineRef.current.pause()
    }
  }

  const handleMouseLeave = () => {
    setIsPaused(false)
    if (masterTimelineRef.current) {
      masterTimelineRef.current.play()
    }
  }

  return (
    <section 
      id="what-we-do" 
      ref={sectionRef} 
      className="py-24 bg-white relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start min-h-[600px]">
              
              {/* Left Side - Typography Area (60%) */}
              <div className="lg:col-span-7">
                <div ref={typographyRef} className="space-y-4">
                  <h2 className="font-dm-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight text-brand-black">
                    {createAnimatedText(cards[currentCard].title)}
                  </h2>
                  <h2 className="font-dm-serif text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none tracking-tight text-brand-black">
                    {createAnimatedText(cards[currentCard].subtitle)}
                  </h2>
                </div>
              </div>

              {/* Right Side - Image Area (40%) */}
              <div className="lg:col-span-5">
                <div 
                  ref={imageRef}
                  className="relative h-96 lg:h-[500px] bg-gray-200 rounded-2xl overflow-hidden"
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
                <div className="info-box bg-[#c8ff00] p-6 lg:p-8 rounded-2xl">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-brand-black rounded-full"></div>
                    <span className="font-bold text-brand-black text-lg tracking-wide">
                      {cards[currentCard].infoBox1}
                    </span>
                  </div>
                </div>
                <div className="info-box bg-[#c8ff00] p-6 lg:p-8 rounded-2xl">
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

          {/* Navigation Controls */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex items-center justify-center mt-16 space-x-4">
              {/* Dot Navigation */}
              {cards.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToCard(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentCard === index 
                      ? 'bg-brand-red scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to card ${index + 1}`}
                />
              ))}
            </div>
            
            {/* Progress Bar */}
            <div className="mt-8 max-w-xs mx-auto">
              <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                <div 
                  ref={progressRef}
                  className="h-full bg-brand-red origin-left scale-x-0"
                ></div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mt-16">
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
    </section>
  )
}
