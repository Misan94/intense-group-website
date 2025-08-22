'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Clock, TrendingUp, Zap } from 'lucide-react'

export default function BeliefsSection() {
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

  const businessUnits = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Intense Digital',
      description: 'Data-driven growth marketing, AI Applications & Custom AI Solutions to drive revenue growth.',
      cta: 'View unit',
      bgColor: 'bg-red-50',
      iconBg: 'bg-brand-red'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Purple Stardust',
      description: 'Creator Marketing + Creatives that shift culture and drive conversion.',
      cta: 'View unit',
      bgColor: 'bg-purple-50',
      iconBg: 'bg-purple-600'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: 'Palet',
      description: 'Marketing technology that turns data into advantage.',
      cta: 'View unit',
      bgColor: 'bg-blue-50',
      iconBg: 'bg-blue-600'
    },
    {
      icon: <ArrowRight className="w-8 h-8" />,
      title: 'Intense UK',
      description: 'Growth Marketing + Creator Marketing + Creatives under one roof to drive business growth for the UK and Europe.',
      cta: 'View unit',
      bgColor: 'bg-gray-50',
      iconBg: 'bg-brand-black'
    }
  ]

  return (
    <section id="business-units" ref={sectionRef} className="py-24 bg-white">
      <div className="section-padding">
        <div className="container-max">
          {/* Section Header */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4 block">
                [03] Our Business Units
              </span>
              <h2 className="font-dm-serif text-4xl md:text-6xl font-bold">
                One group, four specialist engines—
              </h2>
              <h2 className="font-dm-serif text-4xl md:text-6xl font-bold">
                working as one.
              </h2>
            </div>
          </div>

          {/* Business Units Grid */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {businessUnits.map((unit, index) => (
                <div 
                  key={unit.title}
                  className={`${unit.bgColor} rounded-3xl p-8 hover:scale-105 transition-all duration-300 animate-fade-in animation-delay-${index * 200}`}
                >
                  <div className={`${unit.iconBg} w-16 h-16 rounded-2xl flex items-center justify-center text-white mb-6`}>
                    {unit.icon}
                  </div>
                  
                  <h3 className="font-dm-serif text-2xl font-bold mb-4 text-brand-black">
                    {unit.title}
                  </h3>
                  
                  <p className="text-gray-700 leading-relaxed mb-8">
                    {unit.description}
                  </p>
                  
                  <button className="flex items-center space-x-2 text-brand-black font-semibold hover:text-brand-red transition-colors group">
                    <span>{unit.cta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
