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
          {/* Hero Background Image - Optimized with Next.js Image */}
          <Image
            src="/hero-section.png"
            alt="Environmental hero background"
            fill
            className="object-cover object-center"
            priority
            quality={90}
            sizes="100vw"
          />
          
          {/* Subtle Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </div>

      {/* Main Content - Aligned with Our Story Section */}
      <div className="relative z-10 w-full min-h-screen flex items-center">
        <div className="section-padding w-full">
          <div className="container-max">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center min-h-screen">
              
              {/* Left-Aligned Typography - Same positioning as Our Story */}
              <div className="lg:col-span-7">
                <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                  
                  {/* Main Headline - Moderate professional sizing */}
                  <h1 className="font-dm-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight tracking-tight text-white mb-6">
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
              
              {/* Right Side - Empty space for balance */}
              <div className="lg:col-span-5 hidden lg:block">
                {/* This space intentionally left empty for visual balance */}
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
            <h1 className="font-dm-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-white mb-6">
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
