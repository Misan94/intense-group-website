'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight, TrendingUp, Target, Zap } from 'lucide-react'

export default function FeaturedWorkSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentCase, setCurrentCase] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

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

  // Mouse tracking for micro-motion effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const caseStudies = [
    {
      id: 1,
      client: "TechFlow Solutions",
      industry: "SaaS Technology",
      brief: "Launch a new AI-powered productivity platform to enterprise market with 300% user acquisition goal in 6 months",
      approach: "Data-driven growth strategy combining performance media, creator partnerships, and AI-optimized content at scale",
      result: "450% user growth, $2.3M ARR in first year, 89% customer retention rate",
      metrics: { growth: "450%", revenue: "$2.3M", retention: "89%" },
      color: "from-blue-500 to-purple-600",
      icon: <Target className="w-8 h-8" />
    },
    {
      id: 2,
      client: "EcoLux Fashion",
      industry: "Sustainable Fashion",
      brief: "Rebrand and launch sustainable luxury fashion line targeting conscious millennials across Europe",
      approach: "Creator-led storytelling campaign with AI-powered personalization and cross-platform content strategy",
      result: "250% brand awareness increase, 180% sales growth, featured in Vogue sustainability issue",
      metrics: { awareness: "250%", sales: "180%", coverage: "12 major publications" },
      color: "from-green-500 to-teal-600",
      icon: <TrendingUp className="w-8 h-8" />
    },
    {
      id: 3,
      client: "FinanceForward",
      industry: "Financial Services",
      brief: "Digital transformation and customer acquisition for traditional banking services targeting Gen Z",
      approach: "Integrated MarTech stack with AI chatbots, personalized onboarding, and social-first creative strategy",
      result: "320% digital engagement, 95% faster onboarding, youngest customer base in sector",
      metrics: { engagement: "320%", speed: "95% faster", age: "Average 24 years" },
      color: "from-orange-500 to-red-600",
      icon: <Zap className="w-8 h-8" />
    }
  ]

  const nextCase = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentCase((prev) => (prev + 1) % caseStudies.length)
        setIsAnimating(false)
      }, 300)
    }
  }

  const prevCase = () => {
    if (!isAnimating) {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentCase((prev) => (prev - 1 + caseStudies.length) % caseStudies.length)
        setIsAnimating(false)
      }, 300)
    }
  }

  const currentStudy = caseStudies[currentCase]

  return (
    <section ref={sectionRef} className="py-24 bg-brand-black text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="absolute w-96 h-96 bg-brand-red rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
        <div 
          className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
            transition: 'transform 0.1s ease-out'
          }}
        />
      </div>

      <div className="section-padding relative z-10">
        <div className="container-max">
          {/* Kinetic Typography Header */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-20">
              <div className="overflow-hidden mb-8">
                <h2 className="font-dm-serif text-5xl md:text-7xl font-bold inline-block">
                  <span className="inline-block animate-[slideUp_1s_ease-out_0.2s_both]">Work</span>{' '}
                  <span className="inline-block animate-[slideUp_1s_ease-out_0.4s_both] text-brand-red">that</span>{' '}
                  <span className="inline-block animate-[slideUp_1s_ease-out_0.6s_both]">moved</span>{' '}
                  <span className="inline-block animate-[slideUp_1s_ease-out_0.8s_both]">the</span>{' '}
                  <span className="inline-block animate-[slideUp_1s_ease-out_1s_both] text-brand-red">needle</span>
                </h2>
              </div>
            </div>
          </div>

          {/* Interactive Case Study Carousel */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative">
              {/* Main Case Study Card */}
              <div className={`bg-gradient-to-br ${currentStudy.color} rounded-3xl p-1 transition-all duration-500 ${isAnimating ? 'scale-95 opacity-80' : 'scale-100 opacity-100'}`}>
                <div className="bg-brand-black rounded-3xl p-8 md:p-12 h-full">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <div className="space-y-8">
                      {/* Client & Industry */}
                      <div className="space-y-4">
                        <div className="flex items-center space-x-4">
                          <div className={`w-12 h-12 bg-gradient-to-br ${currentStudy.color} rounded-xl flex items-center justify-center`}>
                            {currentStudy.icon}
                          </div>
                          <div>
                            <h3 className="text-2xl font-dm-serif font-bold">{currentStudy.client}</h3>
                            <p className="text-gray-300">{currentStudy.industry}</p>
                          </div>
                        </div>
                      </div>

                      {/* The Brief */}
                      <div className="space-y-3">
                        <h4 className="text-brand-red font-semibold text-sm uppercase tracking-wider">The Brief</h4>
                        <p className="text-gray-200 leading-relaxed">{currentStudy.brief}</p>
                      </div>

                      {/* Our Approach */}
                      <div className="space-y-3">
                        <h4 className="text-brand-red font-semibold text-sm uppercase tracking-wider">Our Approach</h4>
                        <p className="text-gray-200 leading-relaxed">{currentStudy.approach}</p>
                      </div>
                    </div>

                    {/* Right Content - Results */}
                    <div className="space-y-8">
                      <div className="space-y-3">
                        <h4 className="text-brand-red font-semibold text-sm uppercase tracking-wider">The Result</h4>
                        <p className="text-white text-lg leading-relaxed">{currentStudy.result}</p>
                      </div>

                      {/* Metrics Grid */}
                      <div className="grid grid-cols-1 gap-6">
                        {Object.entries(currentStudy.metrics).map(([key, value], index) => (
                          <div 
                            key={key}
                            className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                            style={{ animationDelay: `${index * 0.1}s` }}
                          >
                            <div className="text-3xl font-dm-serif font-bold text-white mb-2">
                              {value}
                            </div>
                            <div className="text-gray-300 text-sm capitalize">
                              {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation Controls */}
              <button
                onClick={prevCase}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
                aria-label="Previous case study"
              >
                <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>
              
              <button
                onClick={nextCase}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-14 h-14 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 group"
                aria-label="Next case study"
              >
                <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
              </button>

              {/* Case Indicators */}
              <div className="flex justify-center mt-8 space-x-3">
                {caseStudies.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentCase(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentCase 
                        ? 'bg-brand-red scale-125' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to case study ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mt-16">
              <button className="bg-brand-red text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-red-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center space-x-2 mx-auto group">
                <span>View all case studies</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for kinetic typography */}
      <style jsx>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </section>
  )
}
