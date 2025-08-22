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
  const [currentPhase, setCurrentPhase] = useState<'entrance' | 'hold' | 'exit'>('entrance')
  const [isCardFixed, setIsCardFixed] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)
  const stickyContainerRef = useRef<HTMLDivElement>(null)
  const contentCardRef = useRef<HTMLDivElement>(null)
  const typographyRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRefs = useRef<ScrollTrigger[]>([])

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

  // Handle scroll progress updates
  const handleScrollProgress = (progress: number) => {
    setScrollProgress(progress)
    
    if (progress < 0.33) {
      setCurrentPhase('entrance')
      setIsCardFixed(true)
    } else if (progress < 0.66) {
      setCurrentPhase('hold')
      setIsCardFixed(true)
    } else {
      setCurrentPhase('exit')
      setIsCardFixed(false)
    }
  }

  // Typography stagger animation
  const animateTypography = (progress: number) => {
    const words = ['.word-vision', '.word-arrow', '.word-impact']
    
    words.forEach((selector, index) => {
      const delay = index * 0.15
      const wordProgress = Math.max(0, Math.min(1, (progress - delay) / 0.3))
      
      gsap.to(selector, {
        opacity: wordProgress,
        y: (1 - wordProgress) * 80,
        scale: 0.95 + (wordProgress * 0.05),
        duration: 0.6,
        ease: 'power2.out'
      })
    })
  }

  // Initialize ScrollTrigger animations
  useEffect(() => {
    if (!isVisible || typeof window === 'undefined') return

    // Clear existing triggers
    scrollTriggerRefs.current.forEach(trigger => trigger.kill())
    scrollTriggerRefs.current = []

    // Main section ScrollTrigger
    const mainTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      pin: stickyContainerRef.current,
      scrub: 0.5,
      anticipatePin: 1,
      onUpdate: (self) => {
        const progress = self.progress
        handleScrollProgress(progress)
        
        // Typography animations based on scroll progress
        if (progress < 0.66) {
          animateTypography(progress * 1.5) // Accelerate for entrance
        } else {
          // Exit animations
          const exitProgress = (progress - 0.66) / 0.34
          gsap.to('.typography-word', {
            opacity: 1 - exitProgress * 0.7,
            y: -exitProgress * 50,
            duration: 0.3
          })
        }
      }
    })

    // Card positioning trigger
    const cardTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '66% top',
      onUpdate: (self) => {
        if (contentCardRef.current) {
          gsap.set(contentCardRef.current, {
            position: 'fixed',
            bottom: '2rem',
            right: '2rem',
            zIndex: 20,
            width: '400px',
            maxWidth: '90vw'
          })
        }
      }
    })

    // Card release trigger
    const releaseTrigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: '66% top',
      end: 'bottom top',
      onUpdate: (self) => {
        const progress = self.progress
        
        if (contentCardRef.current) {
          gsap.to(contentCardRef.current, {
            y: progress * 200,
            opacity: 1 - (progress * 0.3),
            duration: 0.3,
            ease: 'power2.out'
          })
        }

        // Reset card position when animation completes
        if (progress >= 1 && contentCardRef.current) {
          gsap.set(contentCardRef.current, {
            position: 'relative',
            bottom: 'auto',
            right: 'auto',
            y: 0,
            opacity: 1,
            width: 'auto',
            maxWidth: 'none'
          })
        }
      }
    })

    // Store triggers for cleanup
    scrollTriggerRefs.current = [mainTrigger, cardTrigger, releaseTrigger]

    // Initialize typography
    gsap.set('.typography-word', { 
      opacity: 0, 
      y: 80, 
      scale: 0.95,
      willChange: 'transform, opacity'
    })

    // Initialize card
    if (contentCardRef.current) {
      gsap.set(contentCardRef.current, { 
        willChange: 'transform',
        transformOrigin: 'center center'
      })
    }

    return () => {
      scrollTriggerRefs.current.forEach(trigger => trigger.kill())
      scrollTriggerRefs.current = []
    }
  }, [isVisible])

  return (
    <section 
      id="story" 
      ref={sectionRef} 
      className="relative bg-white overflow-hidden"
      style={{ height: '300vh' }} // Extended height for scroll zones
    >
      {/* Background Image - Full Coverage */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/our-story.webp)' }}
      ></div>

      {/* Sticky Container for Typography */}
      <div 
        ref={stickyContainerRef}
        className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden"
      >
        <div className="section-padding relative z-10">
          <div className="container-max">
            {/* Section Header */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="text-center mb-16">
                <span className="text-sm font-semibold text-white tracking-wider uppercase mb-4 block">
                  [01] OUR STORY
                </span>
              </div>
            </div>

            {/* Typography Container */}
            <div ref={typographyRef} className="max-w-6xl">
              <h2 className="typography-word word-vision font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-white mb-8">
                VISION
              </h2>
              <h2 className="typography-word word-arrow font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-white mb-8 flex items-center">
                <span className="inline-block transform transition-transform duration-700 hover:translate-x-2">→</span>
              </h2>
              <h2 className="typography-word word-impact font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-white">
                GLOBAL IMPACT
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed/Floating Content Card */}
      <div 
        ref={contentCardRef}
        className="lg:col-span-5 absolute bottom-8 right-8 w-96 max-w-[90vw] z-20"
        style={{ 
          transform: 'translateZ(0)', // Force GPU acceleration
          backfaceVisibility: 'hidden'
        }}
      >
        {/* Red Content Block */}
        <div className="bg-brand-red p-6 lg:p-8 rounded-2xl shadow-2xl relative">
          <div className="space-y-4">
            <p className="text-base md:text-lg text-white leading-relaxed font-medium">
              Founded in London with a bold mission to reinvent the marketing landscape, Intense Group has rapidly transformed into a multi-continent powerhouse.
            </p>
            <p className="text-base md:text-lg text-white leading-relaxed font-medium">
              Today, our cross-functional teams work seamlessly from London to Barcelona, backed by a network of specialist agencies and partners. Through proprietary tech, we deliver creative excellence, speed and transparency—redefining how brands design, sample and ship seasonal collections.
            </p>
          </div>

          {/* Inside Intense Group Button */}
          <div className="mt-6">
            <div className="inline-flex items-center">
              <div className="bg-brand-black text-white px-4 py-2 text-sm font-semibold tracking-wider uppercase rounded">
                ▶ INSIDE INTENSE GROUP
              </div>
            </div>
          </div>

          {/* Card Phase Indicator (for development) */}
          {process.env.NODE_ENV === 'development' && (
            <div className="absolute top-2 left-2 text-xs text-white bg-black bg-opacity-50 px-2 py-1 rounded">
              {currentPhase} - {Math.round(scrollProgress * 100)}%
            </div>
          )}
        </div>
      </div>

      {/* Mobile Responsive Adjustments */}
      <style jsx>{`
        @media (max-width: 1024px) {
          section {
            height: 250vh !important;
          }
        }
        @media (max-width: 768px) {
          section {
            height: 200vh !important;
          }
        }
      `}</style>
    </section>
  )
}
