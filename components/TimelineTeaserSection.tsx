'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, Calendar, TrendingUp, Users, Zap } from 'lucide-react'

export default function TimelineTeaserSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentMoment, setCurrentMoment] = useState(0)
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

  // Key moments in the company's journey
  const timelineMoments = [
    {
      year: "2014",
      title: "Day One",
      description: "Two founders, one vision: to revolutionize how brands grow through data and creativity.",
      icon: <Users className="w-6 h-6" />,
      color: "from-blue-500 to-blue-600"
    },
    {
      year: "2016",
      title: "First Major Win",
      description: "Landed our first enterprise client and delivered 300% ROI in 6 months.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-green-500 to-green-600"
    },
    {
      year: "2018",
      title: "AI Integration",
      description: "Pioneered AI-driven marketing strategies, setting new industry standards.",
      icon: <Zap className="w-6 h-6" />,
      color: "from-purple-500 to-purple-600"
    },
    {
      year: "2020",
      title: "Global Expansion",
      description: "Opened our European offices and scaled to serve brands across continents.",
      icon: <Calendar className="w-6 h-6" />,
      color: "from-orange-500 to-orange-600"
    },
    {
      year: "2024",
      title: "Year Ten",
      description: "Celebrating a decade of growth, innovation, and partnerships that moved the needle.",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-brand-red to-red-600"
    }
  ]

  // Auto-cycle through moments
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMoment((prev) => (prev + 1) % timelineMoments.length)
    }, 3000)

    return () => clearInterval(timer)
  }, [timelineMoments.length])

  return (
    <section ref={sectionRef} className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-red rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-3xl"></div>
      </div>

      <div className="section-padding relative z-10">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
              <div className="space-y-8">
                {/* Main Headlines */}
                <div className="space-y-4">
                  <h2 className="font-dm-serif text-4xl md:text-6xl font-bold text-brand-black">
                    From day one
                  </h2>
                  <h2 className="font-dm-serif text-4xl md:text-6xl font-bold">
                    to <span className="text-brand-red">year ten</span>
                  </h2>
                </div>

                {/* Description */}
                <p className="text-xl text-gray-700 leading-relaxed">
                  Scroll the moments that shaped how we build growth.
                </p>

                {/* Timeline Preview */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex space-x-2">
                      {timelineMoments.map((_, index) => (
                        <div
                          key={index}
                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                            index === currentMoment ? 'bg-brand-red scale-125' : 'bg-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">
                      {timelineMoments[currentMoment].year}
                    </span>
                  </div>

                  {/* Current Moment Display */}
                  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                    <div className="flex items-start space-x-4">
                      <div className={`w-12 h-12 bg-gradient-to-br ${timelineMoments[currentMoment].color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                        {timelineMoments[currentMoment].icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-dm-serif text-xl font-bold text-brand-black mb-2">
                          {timelineMoments[currentMoment].title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {timelineMoments[currentMoment].description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4">
                  <button className="btn-secondary flex items-center space-x-2 group">
                    <span>See the interactive timeline</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Right Content - Growth CTA */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
              <div className="bg-gradient-to-br from-brand-black to-gray-800 rounded-3xl p-12 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red rounded-full blur-2xl"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-500 rounded-full blur-2xl"></div>
                </div>

                <div className="relative z-10 text-center">
                  <h3 className="font-dm-serif text-3xl md:text-4xl font-bold mb-6">
                    Ready to accelerate growth?
                  </h3>
                  
                  <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                    Let's write the next chapter of your brand's story together. From strategy to execution, we're here to move your needle.
                  </p>

                  <div className="space-y-4">
                    <button className="bg-brand-red text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-red-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 w-full">
                      Book a consultation
                    </button>
                    
                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span>Available this week</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-500 rounded-full"></div>
                      <span>Free strategy session</span>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute top-6 left-6 w-3 h-3 bg-brand-red rounded-full opacity-60 animate-pulse"></div>
                <div className="absolute bottom-8 right-8 w-2 h-2 bg-blue-400 rounded-full opacity-40 animate-pulse animation-delay-200"></div>
                <div className="absolute top-1/2 left-8 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse animation-delay-400"></div>
              </div>
            </div>
          </div>

          {/* Bottom Visual Timeline Preview */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mt-20">
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-brand-red via-blue-500 to-brand-red"></div>
                
                {/* Timeline Points */}
                <div className="flex justify-between items-start">
                  {timelineMoments.map((moment, index) => (
                    <div 
                      key={moment.year}
                      className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                        index === currentMoment ? 'scale-110' : 'hover:scale-105'
                      }`}
                      onClick={() => setCurrentMoment(index)}
                    >
                      <div className={`w-4 h-4 rounded-full bg-gradient-to-br ${moment.color} mb-3 ${
                        index === currentMoment ? 'ring-4 ring-white shadow-lg' : ''
                      }`}></div>
                      <div className="text-center">
                        <div className="text-sm font-bold text-brand-black">{moment.year}</div>
                        <div className="text-xs text-gray-600 mt-1 max-w-20">{moment.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}


