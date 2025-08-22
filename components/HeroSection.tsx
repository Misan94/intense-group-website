'use client'

import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-start overflow-hidden">
      {/* Background - Natural/Outdoor Aesthetic */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-gradient-to-br from-amber-900 via-green-900 to-amber-800"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(255, 206, 84, 0.2) 0%, transparent 50%),
              linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%)
            `
          }}
        />
        {/* Additional texture overlay */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
              radial-gradient(circle at 75% 75%, rgba(255, 206, 84, 0.1) 0%, transparent 50%)
            `
          }}
        />
        {/* Gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full min-h-screen flex items-center">
        <div className="w-full">
          <div className="flex items-center min-h-[80vh]">
            
            {/* Brand Typography - Left Positioned */}
            <div className="ml-8 md:ml-12 lg:ml-16 xl:ml-20">
              <div className={`transition-all duration-1500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
                {/* Brand Name - Large Golden Typography */}
                <div className="mb-8">
                  <h1 className="font-dm-serif text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none text-yellow-400 mb-4">
                    The
                  </h1>
                  <h1 className="font-dm-serif text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none text-yellow-400 mb-4">
                    Intense
                  </h1>
                  <h1 className="font-dm-serif text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-none text-yellow-400">
                    Group
                  </h1>
                </div>
              </div>
            </div>


          </div>

          {/* Bottom Tagline */}
          <div className="absolute bottom-20 left-0 right-0">
            <div className={`section-padding transition-all duration-1500 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <div className="container-max">
                <div className="text-center">
                  <p className="text-yellow-400 text-lg md:text-xl font-light tracking-wide mb-2">
                    A DECADE OF DATA-DRIVEN GROWTH AND CREATIVITY
                  </p>
                  <p className="text-yellow-400/70 text-sm md:text-base font-light tracking-wider">
                    We unite strategy, performance, creative, data, and MarTech to move brands forward across Africa and Europe.
                  </p>
                  
                  {/* Year indicator */}
                  <div className="mt-8 flex items-center justify-center space-x-4">
                    <div className="w-8 h-px bg-yellow-400/50"></div>
                    <span className="text-yellow-400/70 text-sm font-medium">2025</span>
                    <div className="w-8 h-px bg-yellow-400/50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/4 right-10 w-2 h-2 bg-yellow-400/30 rounded-full animate-pulse"></div>
      <div className="absolute top-1/3 right-32 w-1 h-1 bg-yellow-400/50 rounded-full animate-pulse delay-300"></div>
      <div className="absolute bottom-1/3 left-20 w-1.5 h-1.5 bg-yellow-400/40 rounded-full animate-pulse delay-700"></div>
    </section>
  )
}
