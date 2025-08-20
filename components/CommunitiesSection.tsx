'use client'

import { useState, useEffect, useRef } from 'react'
import { TrendingUp, Users, Star, ArrowRight, Zap, Target } from 'lucide-react'

export default function CommunitiesSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [activeCard, setActiveCard] = useState<number | null>(null)
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

  const communities = [
    {
      id: 1,
      name: "Growth Authority",
      headline: "Are You A Marketing Leader?",
      body: "Join Growth Authority to turn your marketing into a predictable growth engine now",
      badge: "Limited slots available",
      cta: "Get more info",
      icon: <TrendingUp className="w-8 h-8" />,
      bgGradient: "from-blue-600 to-purple-600",
      accentColor: "bg-blue-500",
      features: ["Exclusive Masterclasses", "Peer Network Access", "Growth Frameworks", "1-on-1 Mentoring"],
      stats: { members: "500+", growth: "3x Average" }
    },
    {
      id: 2,
      name: "Stardust Creator Network",
      headline: "Welcome to the future of Creator Marketing",
      body: "If you're a Content Creator or looking to leverage creator marketing to boost campaign results, we have just what you need.",
      badge: "Join the network",
      cta: "Get more info",
      icon: <Star className="w-8 h-8" />,
      bgGradient: "from-pink-500 to-orange-500",
      accentColor: "bg-pink-500",
      features: ["Creator Partnerships", "Campaign Opportunities", "Performance Analytics", "Brand Matching"],
      stats: { creators: "1000+", campaigns: "200+" }
    }
  ]

  return (
    <section id="communities" ref={sectionRef} className="py-24 bg-gray-50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500 rounded-full blur-3xl"></div>
      </div>

      <div className="section-padding relative z-10">
        <div className="container-max">
          {/* Section Header */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-16">
              <span className="text-sm font-semibold text-gray-500 tracking-wider uppercase mb-4 block">
                [04] Our Communities
              </span>
              <h2 className="font-dm-serif text-4xl md:text-6xl font-bold mb-6">
                Join the movement that's
              </h2>
              <h2 className="font-dm-serif text-4xl md:text-6xl font-bold">
                <span className="text-brand-red">redefining growth</span>
              </h2>
            </div>
          </div>

          {/* Communities Grid */}
          <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {communities.map((community, index) => (
                <div 
                  key={community.id}
                  className={`group relative rounded-3xl overflow-hidden transition-all duration-500 hover:scale-105 ${
                    activeCard === community.id ? 'scale-105' : ''
                  }`}
                  onMouseEnter={() => setActiveCard(community.id)}
                  onMouseLeave={() => setActiveCard(null)}
                >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${community.bgGradient} opacity-90`}></div>
                  
                  {/* Content */}
                  <div className="relative z-10 p-8 md:p-12 text-white h-full flex flex-col">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-8">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                          {community.icon}
                        </div>
                        <div>
                          <h3 className="font-dm-serif text-2xl font-bold">{community.name}</h3>
                          <span className="text-sm bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                            {community.badge}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 space-y-6">
                      <h4 className="font-dm-serif text-3xl md:text-4xl font-bold leading-tight">
                        {community.headline}
                      </h4>
                      
                      <p className="text-lg leading-relaxed text-white/90">
                        {community.body}
                      </p>

                      {/* Features List */}
                      <div className="grid grid-cols-2 gap-3">
                        {community.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                            <span className="text-sm text-white/80">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* Stats */}
                      <div className="flex space-x-8 pt-4">
                        {Object.entries(community.stats).map(([key, value]) => (
                          <div key={key} className="text-center">
                            <div className="text-2xl font-dm-serif font-bold">{value}</div>
                            <div className="text-sm text-white/70 capitalize">{key}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTA Button */}
                    <div className="pt-8">
                      <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-all duration-300 flex items-center space-x-2 group-hover:scale-105 shadow-lg">
                        <span>{community.cta}</span>
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Floating Elements */}
                    <div className="absolute top-8 right-8 w-4 h-4 bg-white/30 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-20 right-12 w-2 h-2 bg-white/20 rounded-full animate-pulse animation-delay-200"></div>
                    <div className="absolute top-1/2 right-6 w-1 h-1 bg-white/40 rounded-full animate-pulse animation-delay-400"></div>
                  </div>

                  {/* Interactive Border Effect */}
                  <div className={`absolute inset-0 rounded-3xl transition-all duration-300 ${
                    activeCard === community.id 
                      ? 'ring-4 ring-white/30' 
                      : 'ring-1 ring-white/10'
                  }`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className={`transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="mt-20 text-center">
              <div className="bg-white rounded-3xl p-12 shadow-sm">
                <h3 className="font-dm-serif text-3xl md:text-4xl font-bold mb-6 text-brand-black">
                  Not sure which community fits you?
                </h3>
                <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                  Let's have a conversation about your goals and find the perfect community to accelerate your growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button className="btn-primary flex items-center space-x-2">
                    <span>Book a discovery call</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="btn-secondary">
                    Compare communities
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
