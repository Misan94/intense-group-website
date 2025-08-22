'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animationComplete, setAnimationComplete] = useState(false)
  const [isGlitching, setIsGlitching] = useState(false)
  const [showCreativity, setShowCreativity] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const headlineRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const glitchRef = useRef<HTMLDivElement>(null)

  // Text content for kinetic animation
  const headlineLines = [
    "A DECADE OF",
    "DATA-DRIVEN"
  ]

  // Rotating words for glitch transition
  const rotatingWords = ["GROWTH", "CREATIVITY", "STRATEGY"]
  const [currentWordIndex, setCurrentWordIndex] = useState(0)

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

    // Start glitch transition after initial animation
    tl.call(() => {
      setTimeout(() => {
        startGlitchTransition()
      }, 2000) // Wait 2 seconds after initial animation
    })
  }

  const startGlitchTransition = () => {
    if (!headlineRef.current) return
    
    setIsGlitching(true)
    
    // Target the rotating word span specifically
    const rotatingWordElement = headlineRef.current.querySelector('.rotating-word')
    if (!rotatingWordElement) return

    const currentWord = rotatingWords[currentWordIndex]
    const nextWordIndex = (currentWordIndex + 1) % rotatingWords.length
    const nextWord = rotatingWords[nextWordIndex]

    const glitchTimeline = gsap.timeline({
      onComplete: () => {
        setIsGlitching(false)
        setCurrentWordIndex(nextWordIndex)
        // Start next transition after 3 seconds
        setTimeout(() => {
          startGlitchTransition()
        }, 3000)
      }
    })

    // Phase 1: Digital Glitch Corruption (0-0.8s)
    glitchTimeline
      .to(rotatingWordElement, {
        duration: 0.1,
        repeat: 8,
        yoyo: true,
        ease: "none",
        textShadow: "2px 0 #ff0000, -2px 0 #00ffff, 4px 0 #ffff00", // RGB separation
        x: () => gsap.utils.random(-5, 5),
        skewX: () => gsap.utils.random(-10, 10),
      })

    // Phase 2: Scan Lines Effect (0.8-1.2s)
    .to(rotatingWordElement, {
      duration: 0.4,
      backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.1) 2px, rgba(0,0,0,0.1) 4px)",
      backgroundSize: "100% 4px",
      ease: "power2.inOut"
    })

    // Phase 3: Binary Reveal (1.2-1.8s)
    .call(() => {
      // Convert current word to binary representation
      const binaryText = currentWord.split('').map(char => 
        char.charCodeAt(0).toString(2).padStart(8, '0')
      ).join(' ')
      
      if (rotatingWordElement) {
        rotatingWordElement.textContent = binaryText
        gsap.set(rotatingWordElement, {
          fontFamily: "monospace",
          fontSize: "0.6em",
          color: "#00ff00",
          textShadow: "0 0 10px #00ff00"
        })
      }
    })

    // Phase 4: Pixel Shifting & Reconstruction (1.8-2.5s)
    .to(rotatingWordElement, {
      duration: 0.3,
      scale: 0.8,
      opacity: 0.3,
      filter: "blur(2px)",
      ease: "power2.in"
    })
    .to(rotatingWordElement, {
      duration: 0.4,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      ease: "elastic.out(1, 0.5)"
    })

    // Phase 5: Final Reconstruction to next word
    .call(() => {
      if (rotatingWordElement) {
        rotatingWordElement.textContent = nextWord
        gsap.set(rotatingWordElement, {
          fontFamily: "var(--font-fraunces)",
          fontSize: "1em",
          color: "#000000",
          textShadow: "none",
          backgroundImage: "none"
        })
      }
    })
    
    // Final RGB recombination effect
    .from(rotatingWordElement, {
      duration: 0.5,
      textShadow: "3px 0 #ff0000, -3px 0 #00ffff",
      ease: "power2.out"
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
          
          {/* Kinetic Typography Headline */}
          <h1 
            ref={headlineRef}
            className="font-fraunces text-[2.7rem] md:text-[4.5rem] lg:text-[5.85rem] xl:text-[7.2rem] font-bold leading-none tracking-tight text-black mb-6"
          >
            {headlineLines.map((line, lineIndex) => (
              <div 
                key={lineIndex}
                className={`block mb-2 last:mb-0 line-${lineIndex}`}
                style={{ 
                  perspective: '1000px',
                  transformStyle: 'preserve-3d' 
                }}
              >
                {splitTextIntoWords(line, lineIndex)}
              </div>
            ))}
            
            {/* Rotating Word Line */}
            <div 
              className="block mb-2 last:mb-0 line-2"
              style={{ 
                perspective: '1000px',
                transformStyle: 'preserve-3d' 
              }}
            >
              <span className="rotating-word font-fraunces text-[2.7rem] md:text-[4.5rem] lg:text-[5.85rem] xl:text-[7.2rem] font-bold leading-none tracking-tight text-black">
                {rotatingWords[currentWordIndex]}
              </span>
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
