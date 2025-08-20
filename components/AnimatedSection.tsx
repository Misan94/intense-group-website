'use client'

import { useRef, useEffect } from 'react'
import { useFadeInOnScroll, useStaggerAnimation, useHoverAnimation } from '@/hooks/useGSAP'
import { createScrollAnimation } from '@/utils/animations'

// Example component showing how to use GSAP animations
export default function AnimatedSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Use custom hooks for animations
  useFadeInOnScroll('.animated-title', { delay: 0.2, duration: 1.2 })
  useStaggerAnimation(cardsRef, '.animated-card', { stagger: 0.15, y: 50 })
  useHoverAnimation(buttonRef, { scale: 1.05, duration: 0.3 })

  // Alternative: Use utility functions
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Animate the main section
    createScrollAnimation(sectionRef.current!, 'fadeInUp', {
      delay: 0.1,
      start: 'top 85%'
    })

    // Animate cards with stagger
    createScrollAnimation('.stagger-card', 'scaleIn', {
      stagger: 0.1,
      delay: 0.3
    })
  }, [])

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="container-max section-padding">
        {/* Animated Title */}
        <h2 
          ref={titleRef}
          className="animated-title font-dm-serif text-4xl md:text-6xl font-bold text-center mb-16"
        >
          GSAP Animations Demo
        </h2>

        {/* Animated Cards */}
        <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[1, 2, 3].map((item) => (
            <div 
              key={item}
              className="animated-card stagger-card bg-gray-50 p-8 rounded-2xl"
            >
              <h3 className="text-xl font-bold mb-4">Card {item}</h3>
              <p className="text-gray-600">
                This card animates with GSAP scroll triggers and stagger effects.
              </p>
            </div>
          ))}
        </div>

        {/* Animated Button */}
        <div className="text-center">
          <button 
            ref={buttonRef}
            className="bg-brand-red text-white px-8 py-4 rounded-full font-semibold"
          >
            Hover for Animation
          </button>
        </div>
      </div>
    </section>
  )
}
