'use client'

import { useState, useEffect, useCallback } from 'react'

// Section color mapping based on website analysis
const sectionColorMap = {
  'hero': { 
    bg: 'white', 
    accent: 'black',
    background: 'rgba(22, 21, 25, 0.08)',
    border: 'rgba(22, 21, 25, 0.12)',
    text: '#161519',
    logoFilter: 'brightness-0 invert',
    backdropFilter: 'blur(20px) saturate(160%)'
  },
  'story': { 
    bg: 'white', 
    accent: 'red',
    background: 'rgba(254, 49, 2, 0.06)',
    border: 'rgba(254, 49, 2, 0.15)',
    text: '#161519',
    logoFilter: 'brightness-0 invert',
    backdropFilter: 'blur(22px) saturate(170%) hue-rotate(5deg)'
  },
  'what-we-do': { 
    bg: 'black', 
    accent: 'red',
    background: 'rgba(255, 255, 255, 0.10)',
    border: 'rgba(255, 255, 255, 0.18)',
    text: '#ffffff',
    logoFilter: 'none',
    backdropFilter: 'blur(24px) saturate(200%)'
  },
  'beliefs': { 
    bg: 'white', 
    accent: 'black',
    background: 'rgba(22, 21, 25, 0.08)',
    border: 'rgba(22, 21, 25, 0.12)',
    text: '#161519',
    logoFilter: 'brightness-0 invert',
    backdropFilter: 'blur(20px) saturate(160%)'
  },
  'anniversary': { 
    bg: 'white', 
    accent: 'red',
    background: 'rgba(254, 49, 2, 0.06)',
    border: 'rgba(254, 49, 2, 0.15)',
    text: '#161519',
    logoFilter: 'brightness-0 invert',
    backdropFilter: 'blur(22px) saturate(170%) hue-rotate(5deg)'
  },
  'featured-work': { 
    bg: 'black', 
    accent: 'white',
    background: 'rgba(255, 255, 255, 0.10)',
    border: 'rgba(255, 255, 255, 0.18)',
    text: '#ffffff',
    logoFilter: 'none',
    backdropFilter: 'blur(24px) saturate(200%)'
  },
  'credibility': { 
    bg: 'gray', 
    accent: 'black',
    background: 'rgba(22, 21, 25, 0.06)',
    border: 'rgba(22, 21, 25, 0.10)',
    text: '#161519',
    logoFilter: 'brightness-0 invert',
    backdropFilter: 'blur(18px) saturate(150%)'
  },
  'timeline': { 
    bg: 'white', 
    accent: 'black',
    background: 'rgba(22, 21, 25, 0.08)',
    border: 'rgba(22, 21, 25, 0.12)',
    text: '#161519',
    logoFilter: 'brightness-0 invert',
    backdropFilter: 'blur(20px) saturate(160%)'
  },
  'communities': { 
    bg: 'gradient', 
    accent: 'mixed',
    background: 'rgba(22, 21, 25, 0.07)',
    border: 'rgba(22, 21, 25, 0.11)',
    text: '#161519',
    logoFilter: 'brightness-0 invert',
    backdropFilter: 'blur(21px) saturate(165%)'
  },
  'newsletter': { 
    bg: 'gray-gradient', 
    accent: 'red',
    background: 'rgba(254, 49, 2, 0.05)',
    border: 'rgba(254, 49, 2, 0.12)',
    text: '#161519',
    logoFilter: 'brightness-0 invert',
    backdropFilter: 'blur(19px) saturate(155%) hue-rotate(3deg)'
  }
}

type SectionKey = keyof typeof sectionColorMap
type AdaptiveColors = typeof sectionColorMap[SectionKey]

export const useAdaptiveColors = () => {
  const [currentSection, setCurrentSection] = useState<SectionKey>('hero')
  const [adaptiveColors, setAdaptiveColors] = useState<AdaptiveColors>(sectionColorMap.hero)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Debounced section change to prevent rapid transitions
  const debouncedSectionChange = useCallback((newSection: SectionKey) => {
    setIsTransitioning(true)
    
    setTimeout(() => {
      setCurrentSection(newSection)
      setAdaptiveColors(sectionColorMap[newSection])
      setIsTransitioning(false)
    }, 100) // 100ms debounce
  }, [])

  useEffect(() => {
    // Create intersection observer for section detection
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px', // Trigger when section is 20% from top
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id as SectionKey
          
          // Only update if it's a valid section and different from current
          if (sectionColorMap[sectionId] && sectionId !== currentSection) {
            debouncedSectionChange(sectionId)
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    // Observe all sections
    const sections = document.querySelectorAll('section[id]')
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      observer.disconnect()
    }
  }, [currentSection, debouncedSectionChange])

  // Responsive backdrop filter adjustments
  const getResponsiveBackdropFilter = useCallback(() => {
    if (typeof window === 'undefined') return adaptiveColors.backdropFilter

    const width = window.innerWidth
    const baseFilter = adaptiveColors.backdropFilter

    if (width < 768) {
      // Mobile: Reduce blur for performance
      return baseFilter.replace(/blur\((\d+)px\)/, (match, blur) => {
        const reducedBlur = Math.max(12, parseInt(blur) - 8)
        return `blur(${reducedBlur}px)`
      }).replace(/saturate\((\d+)%\)/, (match, saturation) => {
        const reducedSaturation = Math.max(120, parseInt(saturation) - 40)
        return `saturate(${reducedSaturation}%)`
      })
    } else if (width < 1024) {
      // Tablet: Slightly reduce effects
      return baseFilter.replace(/blur\((\d+)px\)/, (match, blur) => {
        const reducedBlur = Math.max(16, parseInt(blur) - 4)
        return `blur(${reducedBlur}px)`
      }).replace(/saturate\((\d+)%\)/, (match, saturation) => {
        const reducedSaturation = Math.max(140, parseInt(saturation) - 20)
        return `saturate(${reducedSaturation}%)`
      })
    }

    return baseFilter
  }, [adaptiveColors.backdropFilter])

  // Enhanced colors with responsive adjustments
  const enhancedColors = {
    ...adaptiveColors,
    backdropFilter: getResponsiveBackdropFilter(),
    // Add hover states
    hoverBackground: adaptiveColors.background.replace(/0\.\d+/, (match) => {
      const opacity = parseFloat(match)
      return (opacity + 0.03).toFixed(2)
    }),
    // Add active states
    activeBackground: adaptiveColors.background.replace(/0\.\d+/, (match) => {
      const opacity = parseFloat(match)
      return (opacity + 0.05).toFixed(2)
    })
  }

  return { 
    currentSection, 
    adaptiveColors: enhancedColors, 
    isTransitioning,
    // Utility function to check if reduced motion is preferred
    prefersReducedMotion: typeof window !== 'undefined' 
      ? window.matchMedia('(prefers-reduced-motion: reduce)').matches 
      : false
  }
}
