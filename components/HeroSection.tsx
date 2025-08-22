'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)

  // Text content for kinetic animation
  const headlineLines = [
    "A DECADE OF",
    "DATA-DRIVEN GROWTH" // Will transition to "CREATIVITY"
  ]

  // Liquid transition states
  const [currentSecondLine, setCurrentSecondLine] = useState("DATA-DRIVEN GROWTH")
  const [isTransitioning, setIsTransitioning] = useState(false)
  const liquidContainerRef = useRef<HTMLDivElement>(null)

  // Character splitting function
  const splitTextIntoChars = (text: string, lineIndex: number) => {
    return text.split('').map((char, charIndex) => (
      <span
        key={`${lineIndex}-${charIndex}`}
        className={`kinetic-char inline-block will-change-transform char-${lineIndex}-${charIndex}`}
      >
        {char === ' ' ? '\u00A0' : char}
      </span>
    ))
  }

  // Split words for directional reveals
  const splitTextIntoWords = (text: string, lineIndex: number) => {
    return text.split(' ').map((word, wordIndex) => (
      <span
        key={`${lineIndex}-${wordIndex}`}
        className={`kinetic-word inline-block will-change-transform word-${lineIndex}-${wordIndex}`}
      >
        {splitTextIntoChars(word, lineIndex)}
        {wordIndex < text.split(' ').length - 1 && <span className="inline-block w-4"></span>}
      </span>
    ))
  }

  useEffect(() => {
    setIsVisible(true)
    
    // Start kinetic typography animation after component mounts
    const timer = setTimeout(() => {
      startKineticAnimation()
    }, 500)

    return () => clearTimeout(timer)
  }, [])

  // Liquid Typography Flow Transition
  const createLiquidTransition = () => {
    if (!liquidContainerRef.current) return

    const tl = gsap.timeline()
    
    // Phase 1: Melting Effect (GROWTH melts down)
    const growthChars = liquidContainerRef.current.querySelectorAll('.growth-char')
    
    tl.to(growthChars, {
      y: (i) => 50 + Math.random() * 30, // Varied drip distances
      scaleY: (i) => 0.1 + Math.random() * 0.3, // Liquid stretch
      scaleX: (i) => 1.2 + Math.random() * 0.5, // Liquid spread
      opacity: 0.8,
      duration: 1.2,
      ease: "power2.in",
      stagger: {
        amount: 0.6,
        from: "random"
      }
    })
    
    // Phase 2: Liquid pooling and bubbling
    .to('.liquid-pool', {
      scaleX: 1.5,
      scaleY: 0.3,
      opacity: 0.9,
      duration: 0.8,
      ease: "elastic.out(1, 0.3)"
    }, "-=0.4")
    
    // Phase 3: Bubble formation and rise
    .to('.liquid-bubble', {
      y: -100,
      scale: (i) => 0.8 + Math.random() * 0.4,
      opacity: 1,
      duration: 1.0,
      ease: "power2.out",
      stagger: 0.1
    }, "-=0.2")
    
    // Phase 4: Formation of CREATIVITY
    .to('.creativity-char', {
      y: 0,
      scaleY: 1,
      scaleX: 1,
      opacity: 1,
      rotation: 0,
      duration: 1.5,
      ease: "elastic.out(1.2, 0.3)",
      stagger: {
        amount: 0.8,
        from: "center"
      }
    }, "-=0.5")
    
    // Phase 5: Gradient shimmer effect
    .to('.liquid-shimmer', {
      x: '200%',
      duration: 1.5,
      ease: "power2.inOut"
    }, "-=1.0")

    return tl
  }

  // Start liquid transition after initial animation
  const startLiquidCycle = () => {
    const liquidTl = createLiquidTransition()
    
    if (liquidTl) {
      liquidTl.call(() => {
        setCurrentSecondLine("CREATIVITY")
        setIsTransitioning(false)
      })
      
      // Loop back after showing CREATIVITY
      setTimeout(() => {
        setCurrentSecondLine("DATA-DRIVEN GROWTH")
        setIsTransitioning(true)
        startLiquidCycle()
      }, 4000)
    }
  }

  const startKineticAnimation = () => {
    if (!headlineRef.current) return

    const tl = gsap.timeline({
      onComplete: () => setAnimationComplete(true)
    })

    // Set initial states and animate
    gsap.set(".kinetic-word", { opacity: 0, x: -100, y: 50 })
    gsap.set(".kinetic-char", { opacity: 0, y: 100, rotation: 5 })

    // Animate each line with staggered reveals
    headlineLines.forEach((line, lineIndex) => {
      // Get all words and chars for this line
      const lineWords = Array.from(headlineRef.current?.querySelectorAll(`[class*="word-${lineIndex}-"]`) || [])
      const lineChars = Array.from(headlineRef.current?.querySelectorAll(`[class*="char-${lineIndex}-"]`) || [])

      if (lineWords.length > 0 && lineChars.length > 0) {
        // First: Word-level directional reveals
        tl.to(lineWords, {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.5)",
          stagger: {
            amount: 0.3,
            from: lineIndex % 2 === 0 ? "start" : "end"
          }
        }, lineIndex * 0.2)

        // Then: Character-level typewriter with bounce
        .to(lineChars, {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.05
        }, lineIndex * 0.2 + 0.2)

        // Color shift effect for each character
        .to(lineChars, {
          color: '#fe3102', // Brand red
          duration: 0.3,
          stagger: 0.02,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        }, lineIndex * 0.2 + 0.8)

        // Micro-rotations for organic feel
        .to(lineChars, {
          rotation: () => gsap.utils.random(-2, 2),
          duration: 0.4,
          ease: "sine.inOut",
          stagger: 0.02
        }, lineIndex * 0.2 + 1.0)
      }
    })

    // Animate subtext and CTA
    tl.to(subtextRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.5")
    .to(ctaRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.3")
    .call(() => {
      // Start liquid transition cycle after initial animation
      setTimeout(() => {
        setIsTransitioning(true)
        startLiquidCycle()
      }, 2000)
    })
  }

  return (
    <section 
      ref={heroRef}
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Plain White Background */}
      <div className="absolute inset-0 z-0 bg-white">
        {/* Clean white background for kinetic typography */}
      </div>

      {/* Main Content - Kinetic Typography */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-4 text-center">
          
          {/* Kinetic Typography Headline with Liquid Transition */}
          <h1 
            ref={headlineRef}
            className="font-fraunces text-[2.7rem] md:text-[4.5rem] lg:text-[5.85rem] xl:text-[7.2rem] font-bold leading-none tracking-tight text-black mb-6"
          >
            {/* First Line - Static */}
            <div 
              className="block mb-2"
              style={{ 
                perspective: '1000px',
                transformStyle: 'preserve-3d' 
              }}
            >
              {splitTextIntoWords(headlineLines[0], 0)}
            </div>

            {/* Second Line - Liquid Transition Container */}
            <div 
              ref={liquidContainerRef}
              className="block relative"
              style={{ 
                perspective: '1000px',
                transformStyle: 'preserve-3d',
                minHeight: '1.2em',
                overflow: 'visible'
              }}
            >
              {/* Liquid Shimmer Effect */}
              <div 
                className="liquid-shimmer absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(254, 49, 2, 0.3) 50%, transparent 100%)',
                  transform: 'translateX(-100%)',
                  zIndex: 10
                }}
              />

              {/* Current Text Display */}
              <div className="relative z-5">
                {currentSecondLine === "DATA-DRIVEN GROWTH" ? (
                  <div className="flex flex-wrap justify-center">
                    {currentSecondLine.split('').map((char, charIndex) => (
                      <span
                        key={`growth-${charIndex}`}
                        className={`kinetic-char growth-char inline-block will-change-transform`}
                        style={{ transformOrigin: 'center bottom' }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap justify-center">
                    {currentSecondLine.split('').map((char, charIndex) => (
                      <span
                        key={`creativity-${charIndex}`}
                        className={`kinetic-char creativity-char inline-block will-change-transform`}
                        style={{ 
                          transformOrigin: 'center bottom',
                          opacity: 0,
                          transform: 'translateY(100px) scaleY(0.1)'
                        }}
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Liquid Pool Effect */}
              <div 
                className="liquid-pool absolute bottom-0 left-1/2"
                style={{
                  width: '200px',
                  height: '20px',
                  background: 'radial-gradient(ellipse, rgba(0,0,0,0.6) 0%, transparent 70%)',
                  borderRadius: '50%',
                  opacity: 0,
                  transform: 'translateX(-50%) scaleX(0) scaleY(0)'
                }}
              />

              {/* Liquid Bubbles */}
              {[...Array(6)].map((_, i) => (
                <div
                  key={`bubble-${i}`}
                  className="liquid-bubble absolute"
                  style={{
                    width: `${8 + Math.random() * 12}px`,
                    height: `${8 + Math.random() * 12}px`,
                    background: 'radial-gradient(circle, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 70%, transparent 100%)',
                    borderRadius: '50%',
                    left: `${30 + i * 25}%`,
                    bottom: '20px',
                    opacity: 0,
                    transform: 'scale(0)'
                  }}
                />
              ))}
            </div>
          </h1>
          
          {/* Animated Subtext */}
          <div 
            ref={subtextRef}
            className="opacity-0 transform translate-y-8"
          >
            <p className="font-inter text-gray-700 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-8">
              We unite strategy, performance, creative, data and MarTech to move brands forward across Africa and Europe.
            </p>
          </div>
          
          {/* Animated Call to Action */}
          <div 
            ref={ctaRef}
            className="opacity-0 transform translate-y-8 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <button className="bg-brand-red text-white px-8 py-4 rounded-full font-medium hover:bg-brand-red-dark transition-all duration-300 shadow-lg hover:scale-105 transform">
              Explore #IntenseAt10
            </button>
            <button className="bg-transparent text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 border-2 border-black hover:scale-105 transform">
              Book a Discovery Call
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Indicator - Only show after animation completes */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${animationComplete ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex items-center space-x-2 text-gray-500 text-sm">
          <div className="w-8 h-px bg-gray-300"></div>
          <span className="font-light tracking-wider">SCROLL TO EXPLORE</span>
          <div className="w-8 h-px bg-gray-300"></div>
        </div>
      </div>
    </section>
  )
}
