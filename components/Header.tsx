'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
import { useAdaptiveColors } from '../hooks/useAdaptiveColors'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const { adaptiveColors, isTransitioning, prefersReducedMotion } = useAdaptiveColors()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Navigation items for hamburger menu
  const navItems = [
    { name: 'Anniversary Hub', href: '#anniversary' },
    { name: 'About Us', href: '#story' },
    { name: 'Business Units', href: '#business-units' },
    { name: 'Insights', href: '#newsletter' },
    { name: 'Contact Us', href: '#contact' },
  ]

  // Dynamic styles for adaptive glassmorphism
  const headerStyle = {
    background: adaptiveColors.background,
    backdropFilter: adaptiveColors.backdropFilter,
    borderBottom: isScrolled ? `1px solid ${adaptiveColors.border}` : 'none',
    boxShadow: isScrolled 
      ? `0 8px 32px ${adaptiveColors.background.replace(/0\.\d+/, '0.1')}` 
      : 'none',
    transition: prefersReducedMotion 
      ? 'none' 
      : 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
    willChange: 'backdrop-filter, background-color, border-color'
  }

  const logoStyle = {
    filter: adaptiveColors.logoFilter,
    transition: prefersReducedMotion ? 'none' : 'filter 0.6s ease'
  }

  const textStyle = {
    color: adaptiveColors.text,
    transition: prefersReducedMotion ? 'none' : 'color 0.6s ease'
  }

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 adaptive-glassmorphism-header"
      style={headerStyle}
    >
      <nav className="section-padding py-4">
        <div className="container-max flex items-center justify-between">
          {/* Adaptive Logo */}
          <Link 
            href="/" 
            className="hover:opacity-80 flex items-center z-10"
            style={{ 
              transition: prefersReducedMotion ? 'none' : 'opacity 0.3s ease, transform 0.3s ease',
              transform: isTransitioning ? 'scale(0.98)' : 'scale(1)'
            }}
          >
            <Image
              src="/logo.png"
              alt="Intense Group"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              style={logoStyle}
              priority
            />
          </Link>

          {/* Adaptive Hamburger Menu Button */}
          <button
            onClick={toggleMenu}
            className="p-2 rounded-lg"
            style={{
              ...textStyle,
              backgroundColor: 'transparent',
              transition: prefersReducedMotion 
                ? 'none' 
                : 'all 0.3s ease, background-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (!prefersReducedMotion) {
                e.currentTarget.style.backgroundColor = adaptiveColors.hoverBackground
                e.currentTarget.style.transform = 'scale(1.05)'
              }
            }}
            onMouseLeave={(e) => {
              if (!prefersReducedMotion) {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.transform = 'scale(1)'
              }
            }}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Adaptive Hamburger Navigation */}
        <div 
          className="overflow-hidden"
          style={{
            maxHeight: isMenuOpen ? '400px' : '0px',
            opacity: isMenuOpen ? 1 : 0,
            marginTop: isMenuOpen ? '16px' : '0px',
            transition: prefersReducedMotion 
              ? 'none' 
              : 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <div 
            className="rounded-xl p-4 space-y-4"
            style={{
              background: adaptiveColors.background,
              backdropFilter: `blur(32px) saturate(200%)`,
              border: `1px solid ${adaptiveColors.border}`,
              boxShadow: `0 20px 40px ${adaptiveColors.background.replace(/0\.\d+/, '0.15')}`
            }}
          >
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block font-medium py-3 px-4 rounded-lg"
                style={{
                  ...textStyle,
                  opacity: 0.8,
                  transition: prefersReducedMotion ? 'none' : 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (!prefersReducedMotion) {
                    e.currentTarget.style.opacity = '1'
                    e.currentTarget.style.backgroundColor = adaptiveColors.hoverBackground
                    e.currentTarget.style.transform = 'translateX(4px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!prefersReducedMotion) {
                    e.currentTarget.style.opacity = '0.8'
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.transform = 'translateX(0px)'
                  }
                }}
              >
                {item.name}
              </Link>
            ))}
            <button 
              className="w-full py-3 px-4 rounded-lg font-semibold mt-4"
              style={{
                backgroundColor: '#fe3102',
                color: '#ffffff',
                transition: prefersReducedMotion ? 'none' : 'all 0.2s ease',
                transform: 'scale(1)'
              }}
              onMouseEnter={(e) => {
                if (!prefersReducedMotion) {
                  e.currentTarget.style.backgroundColor = '#d42a00'
                  e.currentTarget.style.transform = 'scale(1.02)'
                }
              }}
              onMouseLeave={(e) => {
                if (!prefersReducedMotion) {
                  e.currentTarget.style.backgroundColor = '#fe3102'
                  e.currentTarget.style.transform = 'scale(1)'
                }
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Book Consultation
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
