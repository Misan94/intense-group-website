'use client'

import { useState, useEffect, useRef } from 'react'

export default function GlobalPresenceSection() {
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
    <section id="global-presence" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="section-padding">
        <div className="container-max">
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center">
              <span className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4 block">
                [02] Our Global Presence
              </span>
              <h2 className="font-dm-serif text-4xl md:text-6xl font-bold mb-16">
                Where We Operate
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                {[
                  { city: 'London', country: 'United Kingdom', role: 'European Hub' },
                  { city: 'Barcelona', country: 'Spain', role: 'Creative Center' },
                ].map((office, index) => (
                  <div 
                    key={office.city} 
                    className={`text-center transition-all duration-1000 delay-${(index + 2) * 200} ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                  >
                    <div className="w-20 h-20 bg-brand-red rounded-full mx-auto mb-6 flex items-center justify-center">
                      <div className="w-4 h-4 bg-white rounded-full"></div>
                    </div>
                    <h3 className="font-dm-serif text-2xl font-bold text-brand-black mb-2">
                      {office.city}
                    </h3>
                    <p className="text-gray-600 mb-1">{office.country}</p>
                    <p className="text-sm text-brand-red font-semibold uppercase tracking-wide">
                      {office.role}
                    </p>
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
