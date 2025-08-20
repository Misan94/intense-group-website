'use client'

import { useState, useEffect, useRef } from 'react'
import { Mail, ArrowRight, CheckCircle } from 'lucide-react'

export default function NewsletterSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSubmitted(true)
    }, 1500)
  }

  return (
    <section id="newsletter" ref={sectionRef} className="py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 bg-brand-red rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-500 rounded-full blur-2xl"></div>
      </div>

      <div className="section-padding relative z-10">
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            {/* Section Header */}
            <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="mb-12">
                <h2 className="font-dm-serif text-4xl md:text-6xl font-bold mb-6 text-brand-black">
                  Stay ahead, <span className="text-brand-red">once a month</span>
                </h2>
                <p className="text-xl md:text-2xl text-gray-700 leading-relaxed">
                  No fluff. Just field-tested ideas and case learnings.
                </p>
              </div>
            </div>

            {/* Newsletter Form */}
            <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {!isSubmitted ? (
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 max-w-2xl mx-auto">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                        <Mail className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl text-lg focus:outline-none focus:ring-2 focus:ring-brand-red focus:border-transparent transition-all duration-200"
                        required
                      />
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isLoading || !email}
                      className="w-full bg-brand-red text-white px-8 py-4 rounded-2xl font-semibold hover:bg-brand-red-dark transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
                    >
                      {isLoading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Subscribing...</span>
                        </>
                      ) : (
                        <>
                          <span>Subscribe to Growth Insights</span>
                          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Trust Indicators */}
                  <div className="mt-8 flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-8 text-sm text-gray-600">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>No spam, ever</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>Unsubscribe anytime</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>5,000+ subscribers</span>
                    </div>
                  </div>
                </div>
              ) : (
                // Success State
                <div className="bg-green-50 rounded-3xl p-8 md:p-12 border border-green-200 max-w-2xl mx-auto">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-dm-serif text-2xl font-bold text-green-800 mb-4">
                      Welcome to the community!
                    </h3>
                    <p className="text-green-700 text-lg">
                      You'll receive your first newsletter with field-tested growth insights within the next few days.
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* What to Expect */}
            <div className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">📊</span>
                  </div>
                  <h4 className="font-semibold text-brand-black mb-2">Case Studies</h4>
                  <p className="text-gray-600 text-sm">Real campaign breakdowns with metrics and learnings</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-black rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">🚀</span>
                  </div>
                  <h4 className="font-semibold text-brand-black mb-2">Growth Tactics</h4>
                  <p className="text-gray-600 text-sm">Actionable strategies you can implement immediately</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-bold text-lg">🎯</span>
                  </div>
                  <h4 className="font-semibold text-brand-black mb-2">Industry Insights</h4>
                  <p className="text-gray-600 text-sm">Trends and predictions from our frontline experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}