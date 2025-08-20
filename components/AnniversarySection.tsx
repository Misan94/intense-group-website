'use client'

import { useState, useEffect, useRef } from 'react'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'

export default function AnniversarySection() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
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

  // Mock social media posts data - replace with actual live feed
  const socialPosts = [
    {
      id: 1,
      content: "Looking back at our first client presentation in 2014. The nerves, the excitement, the beginning of something special. #IntenseAt10",
      image: "/api/placeholder/300/300",
      date: "2024-01-15",
      platform: "LinkedIn"
    },
    {
      id: 2,
      content: "From 2 people in a small office to 50+ across London & Barcelona. Growth isn't just numbers—it's the stories we've built together. #IntenseAt10",
      image: "/api/placeholder/300/300",
      date: "2024-01-14",
      platform: "Instagram"
    },
    {
      id: 3,
      content: "Milestone moment: Our first AI-powered campaign that changed everything. Innovation has always been our north star. #IntenseAt10",
      image: "/api/placeholder/300/300",
      date: "2024-01-13",
      platform: "Twitter"
    },
    {
      id: 4,
      content: "The late nights, the breakthrough moments, the incredible clients who trusted us with their vision. Thank you for this decade. #IntenseAt10",
      image: "/api/placeholder/300/300",
      date: "2024-01-12",
      platform: "LinkedIn"
    },
    {
      id: 5,
      content: "Data doesn't lie: 10 years, 200+ campaigns, countless lessons learned. Here's to the next chapter. #IntenseAt10",
      image: "/api/placeholder/300/300",
      date: "2024-01-11",
      platform: "Instagram"
    }
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(socialPosts.length / 3))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(socialPosts.length / 3)) % Math.ceil(socialPosts.length / 3))
  }

  // Auto-advance carousel
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section id="anniversary" ref={sectionRef} className="py-24 bg-gradient-to-br from-gray-50 to-white">
      <div className="section-padding">
        <div className="container-max">
          {/* Section Header */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-16">
              <h2 className="font-dm-serif text-4xl md:text-6xl font-bold mb-6">
                <span className="text-brand-red">#IntenseAt10</span> — our decade in focus
              </h2>
              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                Explore milestones, lessons, and the work that defined our first ten years.
              </p>
            </div>
          </div>

          {/* Social Media Carousel */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative mb-12">
              {/* Carousel Container */}
              <div className="overflow-hidden rounded-2xl">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {Array.from({ length: Math.ceil(socialPosts.length / 3) }).map((_, slideIndex) => (
                    <div key={slideIndex} className="w-full flex-shrink-0">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                        {socialPosts.slice(slideIndex * 3, slideIndex * 3 + 3).map((post) => (
                          <div 
                            key={post.id}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
                          >
                            <div className="flex items-center justify-between mb-4">
                              <span className="text-sm font-semibold text-brand-red">#{post.platform}</span>
                              <span className="text-sm text-gray-500">{post.date}</span>
                            </div>
                            
                            <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                              <div className="w-16 h-16 bg-brand-red rounded-full flex items-center justify-center">
                                <span className="text-white font-dm-serif text-xl font-bold">#</span>
                              </div>
                            </div>
                            
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {post.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Carousel Controls */}
              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-5 h-5 text-brand-black" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10"
                aria-label="Next slide"
              >
                <ChevronRight className="w-5 h-5 text-brand-black" />
              </button>

              {/* Slide Indicators */}
              <div className="flex justify-center mt-6 space-x-2">
                {Array.from({ length: Math.ceil(socialPosts.length / 3) }).map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentSlide ? 'bg-brand-red' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center">
              <div className="bg-gradient-to-r from-brand-black to-gray-700 rounded-3xl p-12 text-white">
                <h3 className="font-dm-serif text-3xl md:text-4xl font-bold mb-6">
                  Ready to dive deeper into our story?
                </h3>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                  Discover the full journey, meet our team, and see the work that shaped our decade.
                </p>
                <button className="bg-brand-red text-white px-8 py-4 rounded-full font-semibold hover:bg-brand-red-dark transition-colors shadow-lg flex items-center space-x-2 mx-auto">
                  <span>Visit the Anniversary Hub</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
