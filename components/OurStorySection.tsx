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
    <section id="story" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
      <div className="section-padding">
        <div className="container-max">
          {/* Section Header */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-20">
              <span className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4 block">
                [01] OUR STORY
              </span>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start mt-8">
            {/* Left Side - Large Typography */}
            <div className="lg:col-span-7">
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-brand-black mb-4">
                  FROM VISION
                </h2>
                <div className="flex items-center mb-4">
                  <h2 className="font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-brand-black mr-4">
                    TO
                  </h2>
                  {/* Image placeholder - matching the design */}
                  <div className="w-16 h-20 md:w-20 md:h-24 lg:w-24 lg:h-28 bg-gray-300 rounded-lg flex-shrink-0"></div>
                </div>
                <h2 className="font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-brand-black">
                  GLOBAL
                </h2>
                <h2 className="font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-brand-black">
                  IMPACT
                </h2>
              </div>
            </div>

            {/* Right Side - Content Block */}
            <div className="lg:col-span-5">
              <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                {/* Red Content Block */}
                <div className="bg-brand-red p-8 lg:p-10 rounded-2xl relative">
                  <div className="space-y-6">
                    <p className="text-lg md:text-xl text-white leading-relaxed font-medium">
                      Founded in London with a bold mission to reinvent the marketing landscape, Intense Group has rapidly transformed into a multi-continent powerhouse.
                    </p>
                    <p className="text-lg md:text-xl text-white leading-relaxed font-medium">
                      Today, our cross-functional teams work seamlessly from London to Barcelona, backed by a network of specialist agencies and partners. Through proprietary tech, we deliver creative excellence, speed and transparency—redefining how brands design, sample and ship seasonal collections.
                    </p>
                  </div>

                  {/* Inside Intense Group Button */}
                  <div className="mt-8">
                    <div className="inline-flex items-center">
                      <div className="bg-brand-black text-white px-4 py-2 text-sm font-semibold tracking-wider uppercase">
                        ▶ INSIDE INTENSE GROUP
                      </div>
                    </div>
                  </div>
                </div>
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
                  { city: 'Barcelona', country: 'Spain', role: 'Creative Center' },
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
