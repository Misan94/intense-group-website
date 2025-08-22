'use client'

import { useState, useEffect } from 'react'

interface MobileProgressNavProps {
  className?: string
}

export default function MobileProgressNav({ className = '' }: MobileProgressNavProps) {
  const [currentSection, setCurrentSection] = useState('hero')

  // Section mapping for mobile
  const sections = [
    { id: 'hero', name: 'Home' },
    { id: 'story', name: 'Story' },
    { id: 'what-we-do', name: 'Services' },
    { id: 'business-units', name: 'Units' },
    { id: 'anniversary', name: 'Anniversary' },
    { id: 'contact', name: 'Contact' }
  ]

  // Simple scroll detection for mobile
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = sections.map(s => s.id)
      
      for (const sectionId of sectionIds) {
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

  const currentSectionName = sections.find(s => s.id === currentSection)?.name || 'Home'

  return (
    <div className={`${className}`}>
      {/* Simple mobile section indicator */}
      <div className="flex justify-center py-2 border-t border-white/10">
        <div className="text-white/60 text-xs font-medium tracking-wider">
          {currentSectionName.toUpperCase()}
        </div>
      </div>
    </div>
  )
}