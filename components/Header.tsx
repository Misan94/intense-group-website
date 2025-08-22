'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeTab, setActiveTab] = useState(0)

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
    { name: 'ANNIVERSARY HUB', href: '#anniversary' },
    { name: 'ABOUT US', href: '#story' },
    { name: 'BUSINESS UNITS', href: '#communities' },
    { name: 'INSIGHTS', href: '#newsletter' },
    { name: 'CONTACT US', href: '#contact' },
  ]

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-brand-black/95 backdrop-blur-md shadow-lg' : 'bg-brand-black/80 backdrop-blur-sm'
      }`}
    >
      <nav className="section-padding py-3">
        <div className="container-max flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="hover:opacity-80 transition-opacity duration-300 flex items-center"
          >
            <Image
              src="/logo.png"
              alt="Intense Group"
              width={140}
              height={45}
              className="h-12 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation - Tab Style */}
          <div className="hidden lg:flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1">
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setActiveTab(index)}
                className={`px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 rounded-full relative ${
                  activeTab === index 
                    ? 'bg-white/20 text-white shadow-sm' 
                    : 'text-white/70 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <button className="ml-2 px-6 py-3 bg-brand-red hover:bg-brand-red/90 text-white font-semibold text-sm tracking-wide rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
              BOOK DISCOVERY CALL
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="lg:hidden p-3 text-white hover:bg-white/10 rounded-full transition-all duration-300"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMenuOpen 
              ? 'max-h-96 opacity-100 mt-4' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="bg-brand-black/95 backdrop-blur-md rounded-2xl shadow-xl p-6 space-y-4 border border-white/10">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className="block text-white/70 hover:text-white font-semibold py-3 px-4 rounded-full hover:bg-white/10 transition-all duration-300"
              >
                {item.name}
              </Link>
            ))}
            <button 
              className="w-full mt-4 px-6 py-3 bg-brand-red hover:bg-brand-red/90 text-white font-semibold text-sm tracking-wide rounded-full transition-all duration-300 shadow-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              BOOK DISCOVERY CALL
            </button>
          </div>
        </div>
      </nav>
    </header>
  )
}
