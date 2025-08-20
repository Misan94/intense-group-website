'use client'

import { useState, useEffect, useRef } from 'react'
import { Zap, Target, Globe, Truck } from 'lucide-react'

export default function WhatWeDoSection() {
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

  const services = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Strategy that aligns teams and targets',
      description: 'Unified strategic direction that brings teams together around clear, measurable objectives'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Creative that earns attention',
      description: 'Compelling creative work that cuts through the noise and drives engagement'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Performance media that compounds ROI',
      description: 'Data-driven media strategies that maximize return on investment over time'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Data & AI that sharpen decisions',
      description: 'Advanced analytics and artificial intelligence to inform smarter business choices'
    }
  ]

  return (
    <section id="what-we-do" ref={sectionRef} className="py-24 bg-gray-50">
      <div className="section-padding">
        <div className="container-max">
          {/* Section Header */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4 block">
                [02] What We Do
              </span>
              <h2 className="font-dm-serif text-4xl md:text-6xl font-bold">
                We Drive Revenue Growth
              </h2>
            </div>
          </div>

          {/* Services Grid */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {services.map((service, index) => (
                <div 
                  key={service.title}
                  className={`bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 animate-fade-in animation-delay-${index * 200}`}
                >
                  <div className="w-16 h-16 bg-brand-red rounded-2xl flex items-center justify-center text-white mb-6">
                    {service.icon}
                  </div>
                  <h3 className="font-dm-serif text-xl font-bold mb-4">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Services */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              {/* AI Application Design & Development */}
              <div className="text-center">
                <div className="bg-white rounded-3xl p-12 shadow-sm">
                  <div className="w-16 h-16 bg-brand-red rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
                    <Zap className="w-8 h-8" />
                  </div>
                  <h3 className="font-dm-serif text-2xl md:text-3xl font-bold mb-6">
                    AI Application Design & Development
                  </h3>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    Custom AI solutions designed and developed to solve specific business challenges and unlock new opportunities for growth.
                  </p>
                </div>
              </div>

              {/* Custom AI Solutions */}
              <div className="text-center">
                <div className="bg-white rounded-3xl p-12 shadow-sm">
                  <div className="w-16 h-16 bg-brand-black rounded-2xl flex items-center justify-center text-white mb-6 mx-auto">
                    <Target className="w-8 h-8" />
                  </div>
                  <h3 className="font-dm-serif text-2xl md:text-3xl font-bold mb-6">
                    Custom AI Solutions
                  </h3>
                  <p className="text-gray-700 mb-8 leading-relaxed">
                    Tailored artificial intelligence implementations that integrate seamlessly with your existing systems and workflows.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center">
              <button 
                className="btn-primary text-lg px-8 py-4 hover:scale-105 transform transition-all duration-200"
                onClick={() => {
                  document.getElementById('how-we-help')?.scrollIntoView({ behavior: 'smooth' })
                }}
              >
                See our services
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
