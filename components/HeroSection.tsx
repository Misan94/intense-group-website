'use client'

import { useState, useEffect } from 'react'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-end overflow-hidden">
      {/* Plain White Background */}
      <div className="absolute inset-0 z-0 bg-white">
        {/* No background image - plain white background */}
      </div>

      {/* Main Content - Centralized */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center">
        <div className="w-full max-w-6xl mx-auto px-4 text-center">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            
            {/* Main Headline - Centered */}
                               <h1 className="font-fraunces text-5xl md:text-[5rem] lg:text-[6.5rem] xl:text-[8rem] font-bold leading-none tracking-tight text-black mb-6">
              <span className={`block transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                A DECADE OF
              </span>
              <span className={`block transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                DATA-DRIVEN GROWTH
              </span>
              <span className={`block transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                AND CREATIVITY
              </span>
            </h1>
            
            {/* Subtext - Centered */}
            <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <p className="text-gray-700 text-lg md:text-xl font-light leading-relaxed max-w-3xl mx-auto mb-8">
                We unite strategy, performance, creative, data and MarTech to move brands forward across Africa and Europe.
              </p>
              
              {/* Call to Action - Centered */}
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button className="bg-brand-red text-white px-8 py-4 rounded-full font-medium hover:bg-brand-red-dark transition-all duration-300 shadow-lg">
                  Explore #IntenseAt10
                </button>
                <button className="bg-transparent text-black px-8 py-4 rounded-full font-medium hover:bg-gray-100 transition-all duration-300 border-2 border-black">
                  Book a Discovery Call
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>


      
      {/* Bottom Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className={`transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="flex items-center space-x-2 text-gray-500 text-sm">
            <div className="w-8 h-px bg-gray-300"></div>
            <span className="font-light tracking-wider">SCROLL TO EXPLORE</span>
            <div className="w-8 h-px bg-gray-300"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
