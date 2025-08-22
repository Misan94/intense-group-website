'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function OurStorySection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [transitionPhase, setTransitionPhase] = useState<'static' | 'transitioning' | 'complete'>('static')
  const [imageTransitionProgress, setImageTransitionProgress] = useState(0)
  
  const sectionRef = useRef<HTMLElement>(null)
  const stickyContentRef = useRef<HTMLDivElement>(null)
  const placeholderImageRef = useRef<HTMLDivElement>(null)
  const backgroundImageRef = useRef<HTMLDivElement>(null)
  const contentOverlayRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  // Calculate image transition phases
  const calculateImageTransition = (progress: number) => {
    if (progress < 0.2) {
      return { phase: 'static' as const, progress: 0 }
    } else if (progress > 0.8) {
      return { phase: 'complete' as const, progress: 1 }
    } else {
      const transitionProgress = (progress - 0.2) / 0.6
      return { phase: 'transitioning' as const, progress: transitionProgress }
    }
  }

  // Apply animation states
  const applyStaticState = () => {
    if (placeholderImageRef.current) {
      gsap.set(placeholderImageRef.current, {
        scale: 1,
        opacity: 1
      })
    }
    if (backgroundImageRef.current) {
      gsap.set(backgroundImageRef.current, {
        scale: 0.1,
        opacity: 0
      })
    }
    if (contentOverlayRef.current) {
      gsap.set(contentOverlayRef.current, {
        opacity: 0
      })
    }
  }

  const applyTransitionState = (progress: number) => {
    if (placeholderImageRef.current) {
      gsap.set(placeholderImageRef.current, {
        scale: 1 + (progress * 0.2),
        opacity: 1 - progress
      })
    }
    if (backgroundImageRef.current) {
      gsap.set(backgroundImageRef.current, {
        scale: 0.1 + (progress * 0.9),
        opacity: progress
      })
    }
    if (contentOverlayRef.current) {
      gsap.set(contentOverlayRef.current, {
        opacity: 0.3 + (progress * 0.4)
      })
    }
  }

  const applyCompleteState = () => {
    if (placeholderImageRef.current) {
      gsap.set(placeholderImageRef.current, {
        scale: 1.2,
        opacity: 0
      })
    }
    if (backgroundImageRef.current) {
      gsap.set(backgroundImageRef.current, {
        scale: 1,
        opacity: 1
      })
    }
    if (contentOverlayRef.current) {
      gsap.set(contentOverlayRef.current, {
        opacity: 0.7
      })
    }
  }

  // Handle image transition based on scroll progress
  const handleImageTransition = (progress: number) => {
    const transitionData = calculateImageTransition(progress)
    
    setScrollProgress(progress)
    setTransitionPhase(transitionData.phase)
    setImageTransitionProgress(transitionData.progress)
    
    switch(transitionData.phase) {
      case 'static':
        applyStaticState()
        break
      case 'transitioning':
        applyTransitionState(transitionData.progress)
        break
      case 'complete':
        applyCompleteState()
        break
    }
  }

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

  // Initialize ScrollTrigger for image transition
  useEffect(() => {
    if (!isVisible || typeof window === 'undefined') return

    const scrollTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: stickyContentRef.current,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        handleImageTransition(self.progress)
      },
      onRefresh: () => {
        setScrollProgress(0)
        setTransitionPhase('static')
        setImageTransitionProgress(0)
        applyStaticState()
      }
    })

    scrollTriggerRef.current = scrollTrigger

    // Initialize static state
    applyStaticState()

    return () => {
      scrollTrigger.kill()
    }
  }, [isVisible])

  return (
    <section 
      id="story" 
      ref={sectionRef} 
      className="relative bg-white"
      style={{ height: '300vh' }} // 3x viewport height for smooth transition
    >
      {/* Background Image Layer */}
      <div 
        ref={backgroundImageRef}
        className="fixed inset-0 z-0"
        style={{ 
          backgroundImage: `url('/our-story.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          willChange: 'transform, opacity',
          transformOrigin: 'center center'
        }}
      />
      
      {/* Content Overlay */}
      <div 
        ref={contentOverlayRef}
        className="fixed inset-0 bg-black z-10"
        style={{ willChange: 'opacity' }}
      />
      
      {/* Sticky Content */}
      <div 
        ref={stickyContentRef}
        className="sticky top-0 h-screen flex items-center py-24 overflow-hidden z-20"
      >
        <div className="section-padding relative w-full">
          <div className="container-max">
            {/* Section Header */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center mb-16">
                <span className={`text-sm font-semibold tracking-wider uppercase mb-4 block transition-colors duration-500 ${
                  transitionPhase === 'complete' ? 'text-white' : 'text-gray-500'
                }`}>
                  [01] OUR STORY
                </span>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
              {/* Left Side - Large Typography */}
              <div className="lg:col-span-7">
                <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <h2 className={`font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight mb-4 transition-colors duration-500 ${
                    transitionPhase === 'complete' ? 'text-white' : 'text-brand-black'
                  }`}>
                    FROM VISION
                  </h2>
                  <div className="flex items-center mb-4">
                    <h2 className={`font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight mr-4 transition-colors duration-500 ${
                      transitionPhase === 'complete' ? 'text-white' : 'text-brand-black'
                    }`}>
                      TO
                    </h2>
                    {/* Placeholder Image - transitions to background */}
                    <div 
                      ref={placeholderImageRef}
                      className="w-16 h-20 md:w-20 md:h-24 lg:w-24 lg:h-28 rounded-lg flex-shrink-0 overflow-hidden"
                      style={{ 
                        backgroundImage: `url('/our-story.webp')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        willChange: 'transform, opacity',
                        transformOrigin: 'center center'
                      }}
                    />
                  </div>
                  <h2 className={`font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight transition-colors duration-500 ${
                    transitionPhase === 'complete' ? 'text-white' : 'text-brand-black'
                  }`}>
                    GLOBAL
                  </h2>
                  <h2 className={`font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight transition-colors duration-500 ${
                    transitionPhase === 'complete' ? 'text-white' : 'text-brand-black'
                  }`}>
                    IMPACT
                  </h2>
                </div>
              </div>

              {/* Right Side - Content Block */}
              <div className="lg:col-span-5">
                <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  {/* Red Content Block */}
                  <div className="bg-brand-red p-8 lg:p-10 rounded-2xl relative">
                    <div className="space-y-6">
                      <p className="text-lg md:text-xl text-white leading-relaxed font-medium">
                        Founded in London with a bold mission to reinvent the marketing landscape, Intense Group has rapidly transformed into a multi-continent powerhouse.
                      </p>
                      <p className="text-lg md:text-xl text-white leading-relaxed font-medium">
                        Today, our cross-functional teams work seamlessly from London to Barcelona, backed by a network of specialist agencies and partners. Through proprietary tech, we deliver creative excellence, speed and transparency—redefining how brands design, sample and ship seasonal collections.
                      </p>
                    </div>

                    {/* Inside Intense Group Button */}
                    <div className="mt-8">
                      <div className="inline-flex items-center">
                        <div className="bg-brand-black text-white px-4 py-2 text-sm font-semibold tracking-wider uppercase">
                          ▶ INSIDE INTENSE GROUP
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Offices */}
            <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="mt-20 text-center">
                <h3 className={`font-dm-serif text-2xl md:text-3xl font-bold mb-8 transition-colors duration-500 ${
                  transitionPhase === 'complete' ? 'text-white' : 'text-brand-black'
                }`}>
                  Our Global Presence
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {[
                    { city: 'London', country: 'United Kingdom', role: 'European Hub' },
                    { city: 'Barcelona', country: 'Spain', role: 'Creative Center' },
                  ].map((office, index) => (
                    <div key={office.city} className={`text-center animate-fade-in animation-delay-${index * 200}`}>
                      <div className="w-16 h-16 bg-brand-gray rounded-full mx-auto mb-4 flex items-center justify-center">
                        <div className="w-3 h-3 bg-brand-red rounded-full"></div>
                      </div>
                      <h4 className={`font-semibold transition-colors duration-500 ${
                        transitionPhase === 'complete' ? 'text-white' : 'text-brand-black'
                      }`}>
                        {office.city}
                      </h4>
                      <p className={`text-sm transition-colors duration-500 ${
                        transitionPhase === 'complete' ? 'text-gray-300' : 'text-gray-600'
                      }`}>
                        {office.country}
                      </p>
                      <p className={`text-xs mt-1 transition-colors duration-500 ${
                        transitionPhase === 'complete' ? 'text-gray-400' : 'text-gray-500'
                      }`}>
                        {office.role}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
