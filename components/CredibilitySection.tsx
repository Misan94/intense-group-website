'use client'

import { useState, useEffect, useRef } from 'react'
import { Star, Award, TrendingUp } from 'lucide-react'

export default function CredibilitySection() {
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

  // Mock client logos data
  const clientLogos = [
    { name: "Microsoft", logo: "MICROSOFT" },
    { name: "Goldman Sachs", logo: "GOLDMAN SACHS" },
    { name: "Nike", logo: "NIKE" },
    { name: "Spotify", logo: "SPOTIFY" },
    { name: "Airbnb", logo: "AIRBNB" },
    { name: "Tesla", logo: "TESLA" },
    { name: "Netflix", logo: "NETFLIX" },
    { name: "Adobe", logo: "ADOBE" },
    { name: "Uber", logo: "UBER" },
    { name: "Shopify", logo: "SHOPIFY" },
    { name: "Stripe", logo: "STRIPE" },
    { name: "Zoom", logo: "ZOOM" }
  ]

  // Mock testimonials data
  const testimonials = [
    {
      quote: "Intense transformed our digital presence completely. Their AI-driven approach delivered 300% ROI in just 6 months.",
      author: "Sarah Chen",
      title: "CMO, TechFlow Solutions",
      rating: 5
    },
    {
      quote: "The creative work was outstanding, but what impressed us most was their data-driven strategy. Every decision was backed by insights.",
      author: "Marcus Rodriguez",
      title: "Brand Director, EcoLux Fashion",
      rating: 5
    },
    {
      quote: "Working with Intense felt like having an extension of our team. Their expertise in MarTech integration was game-changing.",
      author: "Emma Thompson",
      title: "Head of Digital, FinanceForward",
      rating: 5
    },
    {
      quote: "From strategy to execution, Intense delivered beyond expectations. Our customer acquisition cost dropped by 40%.",
      author: "David Park",
      title: "Growth Lead, StartupX",
      rating: 5
    },
    {
      quote: "The level of creativity combined with performance marketing expertise is unmatched. Highly recommend for scaling brands.",
      author: "Lisa Wang",
      title: "Marketing Director, RetailPlus",
      rating: 5
    }
  ]

  // Mock awards data
  const awards = [
    { name: "Agency of the Year 2023", organization: "Marketing Week" },
    { name: "Best AI Campaign", organization: "Cannes Lions" },
    { name: "Growth Marketing Excellence", organization: "Performance Marketing Awards" },
    { name: "Digital Innovation Award", organization: "Drum Awards" },
    { name: "Creative Data Award", organization: "D&AD" },
    { name: "Best Use of Technology", organization: "Campaign Awards" },
    { name: "Startup Agency of the Year", organization: "The Drum" },
    { name: "Performance Campaign of the Year", organization: "PMA Awards" }
  ]

  return (
    <section ref={sectionRef} className="py-24 bg-white overflow-hidden">
      <div className="section-padding">
        <div className="container-max">
          {/* Header */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-16">
              <p className="text-xl md:text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
                Trusted by <span className="font-semibold text-brand-red">ambitious brands</span> across finance, media, tech, fashion, and consumer goods.
              </p>
            </div>
          </div>

          {/* Client Logos Scroll */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-16">
              <div className="relative overflow-hidden">
                <div className="flex animate-scroll-left space-x-16">
                  {[...clientLogos, ...clientLogos].map((client, index) => (
                    <div 
                      key={`${client.name}-${index}`}
                      className="flex-shrink-0 flex items-center justify-center w-48 h-16 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300 group"
                    >
                      <span className="text-gray-600 font-bold text-lg group-hover:text-brand-black transition-colors">
                        {client.logo}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Testimonials Scroll */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mb-16">
              <div className="relative overflow-hidden">
                <div className="flex animate-scroll-right space-x-8">
                  {[...testimonials, ...testimonials].map((testimonial, index) => (
                    <div 
                      key={`testimonial-${index}`}
                      className="flex-shrink-0 w-96 bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100"
                    >
                      {/* Rating Stars */}
                      <div className="flex space-x-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 fill-brand-red text-brand-red" />
                        ))}
                      </div>
                      
                      {/* Quote */}
                      <blockquote className="text-gray-700 mb-6 leading-relaxed">
                        "{testimonial.quote}"
                      </blockquote>
                      
                      {/* Author */}
                      <div className="border-t border-gray-200 pt-4">
                        <div className="font-semibold text-brand-black">{testimonial.author}</div>
                        <div className="text-sm text-gray-600">{testimonial.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Awards Scroll */}
          <div className={`transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative overflow-hidden">
              <div className="flex animate-scroll-left space-x-12">
                {[...awards, ...awards].map((award, index) => (
                  <div 
                    key={`award-${index}`}
                    className="flex-shrink-0 flex items-center space-x-4 bg-gradient-to-r from-brand-black to-gray-800 text-white rounded-xl px-8 py-4 hover:from-brand-red hover:to-brand-red-dark transition-all duration-300 group"
                  >
                    <Award className="w-6 h-6 text-brand-red group-hover:text-white transition-colors" />
                    <div>
                      <div className="font-semibold text-sm">{award.name}</div>
                      <div className="text-xs text-gray-300 group-hover:text-white/80 transition-colors">{award.organization}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className={`transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <div className="text-3xl font-dm-serif font-bold text-brand-red">200+</div>
                <div className="text-gray-600 text-sm">Campaigns Delivered</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-dm-serif font-bold text-brand-black">50+</div>
                <div className="text-gray-600 text-sm">Global Brands</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-dm-serif font-bold text-brand-red">15+</div>
                <div className="text-gray-600 text-sm">Industry Awards</div>
              </div>
              <div className="space-y-2">
                <div className="text-3xl font-dm-serif font-bold text-brand-black">10</div>
                <div className="text-gray-600 text-sm">Years of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom CSS for infinite scroll animations */}
      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 60s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 80s linear infinite;
        }
        
        .animate-scroll-left:hover,
        .animate-scroll-right:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
