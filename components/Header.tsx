'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'
// Removed ProgressNavigation and MobileProgressNav imports - using hamburger menu for all screen sizes

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-brand-black/95 backdrop-blur-md shadow-lg border-b border-white/10' 
          : 'bg-gradient-to-b from-brand-black/80 to-transparent backdrop-blur-sm'
      }`}
    >
      <nav className="section-padding py-4">
        <div className="container-max flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="hover:opacity-80 transition-opacity duration-300 flex items-center z-10"
          >
            <Image
              src="/logo.png"
              alt="Intense Group"
              width={120}
              height={40}
              className="h-10 w-auto object-contain brightness-0 invert"
              priority
            />
          </Link>

          {/* Hamburger Menu Button (All Screen Sizes) */}
          <button
            onClick={toggleMenu}
            className="p-2 text-white hover:bg-white/10 rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Hamburger Navigation (All Screen Sizes) */}
        <div 
          className={`transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 mt-4' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="bg-brand-black/95 backdrop-blur-md rounded-lg border border-white/10 p-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-white/70 hover:text-white font-medium py-3 px-4 rounded-lg hover:bg-white/5 transition-all duration-200"
              >
                {item.name}
              </Link>
            ))}
            <button 
              className="bg-brand-red text-white w-full py-3 px-4 rounded-lg font-semibold hover:bg-brand-red/90 transition-colors mt-4"
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
