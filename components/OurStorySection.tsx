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
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/our-story.webp)' }}
      ></div>
      <div className="section-padding relative z-10">
        <div className="container-max">
          {/* Section Header */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4 block">
                [01] OUR STORY
              </span>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            {/* Left Side - Large Typography */}
            <div className="lg:col-span-7">
              <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <h2 className="font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-white mb-4">
                  FROM VISION
                </h2>
                <h2 className="font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-white mb-4">
                  TO
                </h2>
                <h2 className="font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-white">
                  GLOBAL
                </h2>
                <h2 className="font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-white">
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


        </div>
      </div>
    </section>
  )
}
