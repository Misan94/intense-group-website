'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

interface NavItem {
  id: string
  label: string
  href: string
  sectionId: string
  isCTA?: boolean
}

interface ProgressNavigationProps {
  items: NavItem[]
  className?: string
}

export default function ProgressNavigation({ items, className = '' }: ProgressNavigationProps) {
  const [currentSection, setCurrentSection] = useState('hero')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [sectionProgresses, setSectionProgresses] = useState<Record<string, number>>({})
  const [isScrolling, setIsScrolling] = useState(false)
  
  const navRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<Record<string, HTMLButtonElement>>({})
  const progressFillRefs = useRef<Record<string, HTMLDivElement>>({})
  const scrollTriggers = useRef<ScrollTrigger[]>([])
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()

  // Section mapping for scroll detection
  const sections = [
    { id: 'hero', selector: '#hero' },
    { id: 'story', selector: '#story' },
    { id: 'what-we-do', selector: '#what-we-do' },
    { id: 'business-units', selector: '#business-units' },
    { id: 'anniversary', selector: '#anniversary' },
    { id: 'contact', selector: '#contact' }
  ]

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`#${sectionId}`)
    if (element) {
      const offsetTop = element.getBoundingClientRect().top + window.pageYOffset
      const offset = window.innerHeight * 0.1 // 10% offset from top
      
      window.scrollTo({
        top: offsetTop - offset,
        behavior: 'smooth'
      })
    }
  }

  // Update navigation progress based on scroll
  const updateNavigationProgress = (sectionId: string, progress: number) => {
    const clampedProgress = Math.max(0, Math.min(1, progress))
    
    setSectionProgresses(prev => ({
      ...prev,
      [sectionId]: clampedProgress
    }))

    // Animate progress fill with enhanced easing
    const progressFill = progressFillRefs.current[sectionId]
    if (progressFill) {
      gsap.to(progressFill, {
        scaleX: clampedProgress,
        duration: 0.4,
        ease: "power3.out",
        transformOrigin: "left center"
      })
    }

    // Add subtle glow effect when section is active
    const cardElement = cardRefs.current[sectionId]
    if (cardElement && clampedProgress > 0.1) {
      gsap.to(cardElement, {
        boxShadow: `0 0 20px rgba(254, 49, 2, ${clampedProgress * 0.3})`,
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }

  // Set active navigation card
  const setActiveCard = (sectionId: string) => {
    setCurrentSection(sectionId)
    
    // Animate all cards with enhanced effects
    Object.entries(cardRefs.current).forEach(([id, cardElement]) => {
      if (cardElement) {
        const isActive = id === sectionId
        const isCTA = items.find(item => item.id === id)?.isCTA
        
        if (isCTA) {
          // CTA button with pulse effect when active
          gsap.to(cardElement, {
            scale: isActive ? 1.08 : 1,
            duration: 0.5,
            ease: "back.out(1.7)"
          })
          
          if (isActive) {
            // Add pulse animation for CTA
            gsap.to(cardElement, {
              boxShadow: '0 0 25px rgba(254, 49, 2, 0.6)',
              duration: 0.6,
              ease: "power2.out"
            })
          }
        } else {
          // Regular navigation cards with sophisticated animations
          const timeline = gsap.timeline()
          
          if (isActive) {
            // Active state animation
            timeline
              .to(cardElement, {
                backgroundColor: '#fe3102',
                scale: 1.08,
                duration: 0.5,
                ease: "back.out(1.7)"
              })
              .to(cardElement, {
                boxShadow: '0 0 20px rgba(254, 49, 2, 0.4)',
                duration: 0.3,
                ease: "power2.out"
              }, "-=0.2")
          } else {
            // Inactive state animation
            timeline.to(cardElement, {
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              scale: 1,
              boxShadow: '0 0 0px rgba(254, 49, 2, 0)',
              duration: 0.4,
              ease: "power2.out"
            })
          }
          
          // Update text color with smooth transition
          const textElement = cardElement.querySelector('.nav-text')
          if (textElement) {
            gsap.to(textElement, {
              color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.7)',
              fontWeight: isActive ? '600' : '500',
              duration: 0.3,
              ease: "power2.out"
            })
          }
        }
      }
    })
  }

  // Initialize scroll triggers and progress tracking
  useEffect(() => {
    if (typeof window === 'undefined') return

    // Clear existing triggers
    scrollTriggers.current.forEach(trigger => trigger.kill())
    scrollTriggers.current = []

    // Create scroll triggers for each section
    sections.forEach((section, index) => {
      const element = document.querySelector(section.selector)
      if (!element) return

      const trigger = ScrollTrigger.create({
        trigger: element,
        start: "top center",
        end: "bottom center",
        onUpdate: (self) => {
          updateNavigationProgress(section.id, self.progress)
        },
        onEnter: () => {
          setActiveCard(section.id)
        },
        onEnterBack: () => {
          setActiveCard(section.id)
        }
      })

      scrollTriggers.current.push(trigger)
    })

    // Global scroll progress
    const globalTrigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        setScrollProgress(self.progress)
        
        // Set scrolling state with debounce
        setIsScrolling(true)
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current)
        }
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false)
        }, 150)
      }
    })

    scrollTriggers.current.push(globalTrigger)

    return () => {
      scrollTriggers.current.forEach(trigger => trigger.kill())
      scrollTriggers.current = []
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Handle card hover animations
  const handleCardHover = (sectionId: string, isHovering: boolean) => {
    const cardElement = cardRefs.current[sectionId]
    const isCTA = items.find(item => item.id === sectionId)?.isCTA
    
    if (cardElement && !isCTA && sectionId !== currentSection) {
      gsap.to(cardElement, {
        backgroundColor: isHovering ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.1)',
        scale: isHovering ? 1.02 : 1,
        duration: 0.2,
        ease: "power2.out"
      })
    }
  }

  return (
    <nav ref={navRef} className={`flex items-center space-x-2 ${className}`}>
      {items.map((item) => {
        const isActive = currentSection === item.sectionId
        const progress = sectionProgresses[item.sectionId] || 0
        
        return (
          <button
            key={item.id}
            ref={(el) => {
              if (el) cardRefs.current[item.id] = el
            }}
            onClick={() => item.isCTA ? window.open('/contact', '_blank') : scrollToSection(item.sectionId)}
            onMouseEnter={() => handleCardHover(item.id, true)}
            onMouseLeave={() => handleCardHover(item.id, false)}
            className={`
              relative overflow-hidden rounded-full transition-all duration-300 group
              ${item.isCTA 
                ? 'bg-brand-red text-white px-6 py-3 font-semibold hover:bg-brand-red/90' 
                : 'bg-white/10 backdrop-blur-sm px-4 py-2'
              }
              ${isScrolling ? 'pointer-events-none' : ''}
            `}
            style={{ willChange: 'transform, background-color' }}
          >
            {/* Progress fill background */}
            {!item.isCTA && (
              <div
                ref={(el) => {
                  if (el) progressFillRefs.current[item.id] = el
                }}
                className="absolute inset-0 bg-brand-red origin-left scale-x-0"
                style={{ willChange: 'transform' }}
              />
            )}
            
            {/* Text content */}
            <span 
              className={`
                relative z-10 nav-text text-sm font-medium tracking-wide whitespace-nowrap
                ${item.isCTA ? 'text-white' : 'text-white/70'}
              `}
            >
              {item.label}
            </span>
            
            {/* Hover glow effect */}
            {!item.isCTA && (
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            )}
          </button>
        )
      })}
    </nav>
  )
}
