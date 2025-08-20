'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

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

  const navItems = [
    { name: 'Anniversary Hub', href: '#anniversary' },
    { name: 'About Us', href: '#story' },
    { name: 'Business Units', href: '#communities' },
    { name: 'Insights', href: '#newsletter' },
    { name: 'Contact Us', href: '#contact' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="section-padding py-4">
        <div className="container-max flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="hover:opacity-80 transition-opacity duration-300 flex items-center"
          >
            <Image
              src="/logo.png"
              alt="Intense Group"
              width={120}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-brand-gray-dark hover:text-brand-black font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-brand-red transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
            <button className="btn-primary ml-4">
              Get Started
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden p-2 text-brand-black hover:bg-brand-gray rounded-lg transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 mt-4' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="bg-white rounded-lg shadow-lg p-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-brand-gray-dark hover:text-brand-black font-medium py-2 transition-colors"
              >
                {item.name}
              </Link>
            ))}
            <button className="btn-primary w-full mt-4">
              Get Started
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
