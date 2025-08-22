'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const backgroundRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setIsVisible(true)
    
    // Subtle parallax effect on scroll
    const handleScroll = () => {
      if (backgroundRef.current) {
        const scrolled = window.pageYOffset
        const rate = scrolled * -0.3
        backgroundRef.current.style.transform = `translate3d(0, ${rate}px, 0)`
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-end overflow-hidden">
      {/* Environmental Background */}
      <div className="absolute inset-0 z-0">
        {/* Background Image with Parallax */}
        <div 
          ref={backgroundRef}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          style={{ willChange: 'transform' }}
        >
          {/* Image Placeholder - Environmental Mountain/Lake Scene */}
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('data:image/svg+xml;base64,${btoa(`
                <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Sky Gradient -->
                  <defs>
                    <linearGradient id="skyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:#87CEEB;stop-opacity:1" />
                      <stop offset="50%" style="stop-color:#B0E0E6;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#F0F8FF;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="mountainGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:#696969;stop-opacity:1" />
                      <stop offset="100%" style="stop-color:#2F4F4F;stop-opacity:1" />
                    </linearGradient>
                    <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" style="stop-color:#4682B4;stop-opacity:0.8" />
                      <stop offset="100%" style="stop-color:#1E3A8A;stop-opacity:0.9" />
                    </linearGradient>
                  </defs>
                  
                  <!-- Sky -->
                  <rect width="1920" height="700" fill="url(#skyGradient)"/>
                  
                  <!-- Mountains (Background) -->
                  <polygon points="0,600 400,300 800,450 1200,200 1600,400 1920,350 1920,700 0,700" fill="#8B9DC3" opacity="0.6"/>
                  
                  <!-- Mountains (Midground) -->
                  <polygon points="0,650 300,400 600,500 900,300 1200,450 1500,250 1920,400 1920,700 0,700" fill="url(#mountainGradient)" opacity="0.8"/>
                  
                  <!-- Mountains (Foreground) -->
                  <polygon points="0,700 200,500 500,600 800,400 1100,550 1400,350 1700,500 1920,450 1920,700" fill="#2F4F4F"/>
                  
                  <!-- Lake/Water -->
                  <rect y="700" width="1920" height="380" fill="url(#waterGradient)"/>
                  
                  <!-- Mountain Reflections in Water -->
                  <polygon points="0,700 200,900 500,800 800,1000 1100,850 1400,1050 1700,900 1920,950 1920,700" fill="#1E3A8A" opacity="0.3"/>
                  
                  <!-- Atmospheric Clouds -->
                  <ellipse cx="300" cy="200" rx="150" ry="40" fill="white" opacity="0.7"/>
                  <ellipse cx="800" cy="150" rx="200" ry="50" fill="white" opacity="0.6"/>
                  <ellipse cx="1400" cy="180" rx="180" ry="45" fill="white" opacity="0.8"/>
                  
                  <!-- Foreground Elements -->
                  <ellipse cx="100" cy="950" rx="80" ry="20" fill="#228B22" opacity="0.6"/>
                  <ellipse cx="1800" cy="980" rx="100" ry="25" fill="#228B22" opacity="0.5"/>
                  
                  <!-- Text: "Environmental Placeholder" -->
                  <text x="960" y="540" font-family="Arial, sans-serif" font-size="48" font-weight="bold" text-anchor="middle" fill="white" opacity="0.9">
                    ENVIRONMENTAL HERO BACKGROUND
                  </text>
                  <text x="960" y="590" font-family="Arial, sans-serif" font-size="24" text-anchor="middle" fill="white" opacity="0.7">
                    Replace with high-resolution mountain/lake landscape image
                  </text>
                </svg>
              `)})`,
              backgroundPosition: 'center center',
              backgroundSize: 'cover'
            }}
          />
          
          {/* Subtle Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </div>

      {/* Main Content - Left Aligned */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-start">
        <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
          <div className="flex items-center justify-start min-h-screen">
            
            {/* Left-Aligned Typography */}
            <div className="max-w-2xl text-left">
              <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                
                {/* Main Headline */}
                <h1 className="font-dm-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight text-white mb-6">
                  <span className={`block transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    GROWTH AS
                  </span>
                  <span className={`block transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    ENVIRONMENTAL
                  </span>
                  <span className={`block transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    RESPONSIBILITY
                  </span>
                </h1>
                
                {/* Subtext */}
                <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                  <p className="text-white/90 text-lg md:text-xl font-light leading-relaxed max-w-lg mb-8">
                    Telling powerful stories that move brands from profit-only to purpose-driven growth across Africa and Europe.
                  </p>
                  
                  {/* Call to Action */}
                  <div className="flex justify-start space-x-4">
                    <button className="bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-full font-medium hover:bg-white/20 transition-all duration-300 border border-white/20">
                      Our Impact Story
                    </button>
                    <button className="bg-white text-black px-8 py-4 rounded-full font-medium hover:bg-white/90 transition-all duration-300 shadow-lg">
                      Start Your Journey
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Responsive Mobile Layout */}
      <div className="lg:hidden absolute inset-0 z-10 flex items-center justify-center">
        <div className="w-full max-w-4xl mx-auto px-4 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Mobile Headline */}
            <h1 className="font-dm-serif text-3xl md:text-4xl font-bold leading-tight text-white mb-6">
              <span className={`block transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                GROWTH AS
              </span>
              <span className={`block transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                ENVIRONMENTAL
              </span>
              <span className={`block transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                RESPONSIBILITY
              </span>
            </h1>
            
            {/* Mobile Subtext */}
            <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-white/90 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-8">
                Telling powerful stories that move brands from profit-only to purpose-driven growth across Africa and Europe.
              </p>
              
              {/* Mobile CTAs */}
              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-white/10 backdrop-blur-sm text-white px-6 py-3 rounded-full font-medium hover:bg-white/20 transition-all duration-300 border border-white/20">
                  Our Impact Story
                </button>
                <button className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-white/90 transition-all duration-300 shadow-lg">
                  Start Your Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Decorative Elements */}
      <div className="absolute top-1/4 left-10 w-1 h-1 bg-white/30 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 left-32 w-1.5 h-1.5 bg-white/40 rounded-full animate-pulse delay-300"></div>
      <div className="absolute bottom-1/3 right-20 w-2 h-2 bg-white/20 rounded-full animate-pulse delay-700"></div>
      
      {/* Bottom Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center space-x-2 text-white/60 text-sm">
            <div className="w-8 h-px bg-white/30"></div>
            <span className="font-light tracking-wider">SCROLL TO EXPLORE</span>
            <div className="w-8 h-px bg-white/30"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
