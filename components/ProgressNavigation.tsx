'use client'

import { useState, useEffect } from 'react'

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

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.querySelector(`#${sectionId}`)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
  }

  // Simple scroll detection for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'story', 'what-we-do', 'business-units', 'anniversary', 'contact']
      
      for (const sectionId of sections) {
        const element = document.querySelector(`#${sectionId}`)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setCurrentSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`flex items-center space-x-2 ${className}`}>
      {items.map((item) => {
        const isActive = currentSection === item.sectionId
        const isCTA = item.isCTA

        return (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.sectionId)}
            className={`
              px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 
              border backdrop-blur-sm hover:scale-105
              ${isCTA 
                ? 'bg-brand-red text-white hover:bg-brand-red-dark border-brand-red shadow-lg' 
                : isActive 
                  ? 'bg-white/20 text-white border-white/40' 
                  : 'bg-white/10 text-white/70 hover:bg-white/15 hover:text-white border-white/20'
              }
            `}
            style={{ minWidth: isCTA ? '140px' : '100px' }}
          >
            <span className="tracking-wide">
              {item.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}