'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface MobileProgressNavProps {
  className?: string
}

export default function MobileProgressNav({ className = '' }: MobileProgressNavProps) {
  const [currentSection, setCurrentSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  
  const progressBarRef = useRef<HTMLDivElement>(null)
  const sectionIndicatorRef = useRef<HTMLDivElement>(null)
  const scrollTriggers = useRef<ScrollTrigger[]>([])

  // Section mapping for mobile
  const sections = [
    { id: 'hero', name: 'Home', color: '#fe3102' },
    { id: 'story', name: 'Story', color: '#fe3102' },
    { id: 'what-we-do', name: 'Services', color: '#fe3102' },
    { id: 'business-units', name: 'Units', color: '#fe3102' },
    { id: 'anniversary', name: 'Anniversary', color: '#fe3102' },
    { id: 'contact', name: 'Contact', color: '#fe3102' }
  ]

  // Initialize scroll tracking for mobile
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Clear existing triggers
    scrollTriggers.current.forEach(trigger => trigger.kill())
    scrollTriggers.current = []

    // Create scroll triggers for each section
    sections.forEach((section) => {
      const element = document.querySelector(`#${section.id}`)
      if (!element) return

      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top center",
        end: "bottom center",
        onEnter: () => setCurrentSection(section.id),
        onEnterBack: () => setCurrentSection(section.id)
      })

      scrollTriggers.current.push(trigger)
    })

    // Global progress tracking
    const globalTrigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setScrollProgress(self.progress)
        
        // Update progress bar
        if (progressBarRef.current) {
          gsap.to(progressBarRef.current, {
            scaleX: self.progress,
            duration: 0.1,
            ease: "none"
          })
        }
        
        // Show/hide indicator based on scroll
        if (self.progress > 0.05 && !isVisible) {
          setIsVisible(true)
        } else if (self.progress <= 0.05 && isVisible) {
          setIsVisible(false)
        }
      }
    })

    scrollTriggers.current.push(globalTrigger)

    return () => {
      scrollTriggers.current.forEach(trigger => trigger.kill())
      scrollTriggers.current = []
    }
  }, [isVisible])

  // Get current section display name
  const getCurrentSectionName = () => {
    const section = sections.find(s => s.id === currentSection)
    return section ? section.name : 'Home'
  }

  return (
    <div className={`fixed top-20 left-4 right-4 z-40 transition-all duration-500 ${
      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
    } ${className}`}>
      <div className="bg-brand-black/90 backdrop-blur-md rounded-full border border-white/10 px-4 py-2 flex items-center space-x-3">
        {/* Progress bar container */}
        <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
          <div
            ref={progressBarRef}
            className="h-full bg-brand-red origin-left scale-x-0 rounded-full"
            style={{ willChange: 'transform' }}
          />
        </div>
        
        {/* Section indicator */}
        <div 
          ref={sectionIndicatorRef}
          className="text-white text-xs font-medium whitespace-nowrap"
        >
          {getCurrentSectionName()}
        </div>
        
        {/* Progress percentage */}
        <div className="text-white/70 text-xs font-medium min-w-[3rem] text-right">
          {Math.round(scrollProgress * 100)}%
        </div>
      </div>
    </div>
  )
}
