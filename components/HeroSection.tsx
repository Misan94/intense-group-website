'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white overflow-hidden">


      <div className="section-padding relative z-10 w-full">
        <div className="container-max text-center">
          {/* Main Heading */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h1 className="font-dm-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              A decade of{' '}
              <span className="relative inline-block">
                growth, creativity,
                <div className="absolute -bottom-2 left-0 right-0 h-1 bg-brand-red transform scale-x-0 animate-[scaleX_1s_ease-out_0.5s_forwards] origin-left"></div>
              </span>
            </h1>
            <h1 className="font-dm-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              <span className="text-brand-red">data & AI</span>
            </h1>
          </div>

          {/* CTA Button */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="flex justify-center items-center mb-16">
              <button className="btn-primary text-lg px-8 py-4 hover:scale-105 transform transition-all duration-200">
                Explore #IntenseAt10
              </button>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-500 mb-2">Scroll to explore</span>
              <ChevronDown 
                size={24} 
                className="text-gray-400 animate-bounce cursor-pointer hover:text-brand-red transition-colors"
                onClick={() => {
                  document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })
                }}
              />
            </div>
          </div>
        </div>
      </div>


    </section>
  )
}
