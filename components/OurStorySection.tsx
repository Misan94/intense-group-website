'use client'

import { useState, useEffect, useRef } from 'react'

export default function OurStorySection() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="story" ref={sectionRef} className="py-24 bg-white">
      <div className="section-padding">
        <div className="container-max">
          {/* Section Header */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4 block">
                [01] Our Story
              </span>
              <h2 className="font-dm-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
                from vision
              </h2>
              <h2 className="font-dm-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-8">
                to{' '}
                <span className="relative inline-block">
                  global
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-brand-red"></div>
                </span>
              </h2>
              <h2 className="font-dm-serif text-4xl md:text-6xl lg:text-7xl font-bold">
                impact
              </h2>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="space-y-6">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Founded in <span className="font-semibold text-brand-red">Dhaka</span> with a bold mission to reinvent the fashion supply chain, NITEX has rapidly transformed into a multi-continent powerhouse.
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Today, our cross-functional teams work seamlessly from <span className="font-semibold text-brand-black">Dhaka to London, Barcelona and New York</span>, backed by a network of certified factories in Bangladesh.
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Through proprietary tech, we deliver <span className="font-semibold text-brand-red">creative excellence, speed and transparency</span>—redefining how brands design, sample and ship seasonal collections.
                </p>
              </div>

              <div className="mt-12">
                <button className="btn-primary">
                  Inside Nitex
                </button>
              </div>
            </div>

            {/* Right Visual */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="relative">
                {/* Main Visual Container */}
                <div className="bg-gray-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-brand-red rounded-full mx-auto mb-6 flex items-center justify-center">
                      <span className="text-white font-dm-serif text-2xl font-bold">N</span>
                    </div>
                    <h3 className="font-dm-serif text-2xl font-bold mb-2">Global Network</h3>
                    <p className="text-gray-600">Multi-continent operations</p>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-brand-red rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 -right-4 w-12 h-12 bg-brand-black rounded-full opacity-30"></div>
                <div className="absolute top-1/2 -right-6 w-6 h-6 bg-brand-red rounded-full opacity-40"></div>
              </div>
            </div>
          </div>

          {/* Global Offices */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mt-20 text-center">
              <h3 className="font-dm-serif text-2xl md:text-3xl font-bold mb-8">Our Global Presence</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                {[
                  { city: 'London', country: 'United Kingdom', role: 'European Hub' },
                  { city: 'Barcelona', country: 'Spain', role: 'Design Center' },
                ].map((office, index) => (
                  <div key={office.city} className={`text-center animate-fade-in animation-delay-${index * 200}`}>
                    <div className="w-16 h-16 bg-brand-gray rounded-full mx-auto mb-4 flex items-center justify-center">
                      <div className="w-3 h-3 bg-brand-red rounded-full"></div>
                    </div>
                    <h4 className="font-semibold text-brand-black">{office.city}</h4>
                    <p className="text-sm text-gray-600">{office.country}</p>
                    <p className="text-xs text-gray-500 mt-1">{office.role}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
