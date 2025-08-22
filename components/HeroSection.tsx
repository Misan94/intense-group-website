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
    "DATA-DRIVEN GROWTH", 
    "AND CREATIVITY"
  ]

  // Character splitting function
  const splitTextIntoChars = (text: string, lineIndex: number) => {
    return text.split('').map((char, charIndex) => (
      <span
        key={`${lineIndex}-${charIndex}`}
        className={`kinetic-char inline-block will-change-transform char-${lineIndex}-${charIndex}`}
        style={{
          opacity: 0,
          transform: 'translateY(100px) rotateZ(5deg)',
        }}
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
        style={{
          opacity: 0,
          transform: `translateX(${wordIndex % 2 === 0 ? '-100px' : '100px'}) translateY(50px)`,
        }}
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

    // Animate each line with staggered reveals
    headlineLines.forEach((line, lineIndex) => {
      const words = headlineRef.current?.querySelectorAll(`.word-${lineIndex}-*`)
      const chars = headlineRef.current?.querySelectorAll(`.char-${lineIndex}-*`)

      if (words && chars) {
        // First: Word-level directional reveals
        tl.to(words, {
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
        .to(chars, {
          opacity: 1,
          y: 0,
          rotation: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.05
        }, lineIndex * 0.2 + 0.2)

        // Color shift effect for each character
        .to(chars, {
          color: '#fe3102', // Brand red
          duration: 0.3,
          stagger: 0.02,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut"
        }, lineIndex * 0.2 + 0.8)

        // Micro-rotations for organic feel
        .to(chars, {
          rotation: () => gsap.utils.random(-2, 2),
          duration: 0.4,
          ease: "sine.inOut",
          stagger: 0.02
        }, lineIndex * 0.2 + 0.8)
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
                className="block mb-2 last:mb-0"
                style={{ 
                  perspective: '1000px',
                  transformStyle: 'preserve-3d' 
                }}
              >
                {splitTextIntoWords(line, lineIndex)}
              </div>
            ))}
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
