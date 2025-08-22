'use client'

import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export default function OurStorySection() {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [wavePhase, setWavePhase] = useState(0)
  
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const typographyContainerRef = useRef<HTMLDivElement>(null)
  const characterRefs = useRef<HTMLSpanElement[]>([])
  const redCardRef = useRef<HTMLDivElement>(null)
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)
  const animationFrameRef = useRef<number | null>(null)

  // Initialize intersection observer
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

  // Wave calculation function
  const calculateWavePosition = (charIndex: number, totalChars: number, progress: number, time: number) => {
    const frequency = 2
    const amplitude = window.innerWidth >= 1024 ? 30 : window.innerWidth >= 768 ? 20 : 10
    const speed = progress * 2 + time * 0.001
    const offset = (charIndex / totalChars) * Math.PI * 2
    
    return {
      y: Math.sin(speed + offset) * amplitude * progress,
      opacity: 0.7 + (Math.sin(speed + offset) * 0.3),
      scale: 0.95 + (Math.sin(speed + offset) * 0.05)
    }
  }

  // Color interpolation function
  const interpolateColor = (progress: number) => {
    const phase = (progress * 4) % 2
    if (phase <= 1) {
      // White to light gray
      const gray = Math.round(255 - (55 * phase))
      const opacity = 1.0 - (0.2 * phase)
      return { r: gray, g: gray, b: gray, opacity }
    } else {
      // Light gray to white
      const phase2 = phase - 1
      const gray = Math.round(200 + (55 * phase2))
      const opacity = 0.8 + (0.2 * phase2)
      return { r: gray, g: gray, b: gray, opacity }
    }
  }

  // Video zoom calculation
  const calculateVideoZoom = (progress: number) => {
    if (progress <= 0.25) {
      // Entry phase: 1.0 → 1.1
      return 1.0 + (0.1 * (progress / 0.25))
    } else if (progress <= 0.75) {
      // Active phase: 1.1 → 1.2 → 1.1
      const activeProgress = (progress - 0.25) / 0.5
      const sineWave = Math.sin(activeProgress * Math.PI * 2)
      return 1.1 + (0.1 * sineWave * 0.5)
    } else {
      // Exit phase: 1.1 → 1.0
      const exitProgress = (progress - 0.75) / 0.25
      return 1.1 - (0.1 * exitProgress)
    }
  }

  // Apply wave animation to characters
  const applyWaveAnimation = (progress: number, time: number) => {
    characterRefs.current.forEach((charElement, index) => {
      if (!charElement) return

      const totalChars = characterRefs.current.length
      const wavePos = calculateWavePosition(index, totalChars, progress, time)
      const color = interpolateColor(progress)

      gsap.set(charElement, {
        y: wavePos.y,
        opacity: wavePos.opacity,
        scale: wavePos.scale,
        color: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.opacity})`,
        willChange: 'transform, opacity, color'
      })
    })

    // Apply video zoom
    if (videoRef.current) {
      const zoom = calculateVideoZoom(progress)
      gsap.set(videoRef.current, {
        scale: zoom,
        transformOrigin: 'center center',
        willChange: 'transform'
      })
    }
  }

  // Animation loop
  const animationLoop = (time: number) => {
    setWavePhase(time)
    applyWaveAnimation(scrollProgress, time)
    animationFrameRef.current = requestAnimationFrame(animationLoop)
  }

  // Split text into character spans
  const createCharacterSpans = (text: string, wordIndex: number) => {
    return text.split('').map((char, charIndex) => {
      const globalIndex = wordIndex * 20 + charIndex // Rough global positioning
      return (
        <span
          key={`${wordIndex}-${charIndex}`}
          ref={(el) => {
            if (el) characterRefs.current[globalIndex] = el
          }}
          className="inline-block will-change-transform"
          style={{ 
            marginRight: char === ' ' ? '0.3em' : '0',
            transformOrigin: 'center bottom'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      )
    })
  }

  // Initialize ScrollTrigger and animation
  useEffect(() => {
    if (!isVisible || typeof window === 'undefined') return

    // Clear existing animation
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
    if (scrollTriggerRef.current) {
      scrollTriggerRef.current.kill()
    }

    // Initialize characters with starting positions
    gsap.set(characterRefs.current, {
      y: 100,
      opacity: 0,
      scale: 0.8,
      willChange: 'transform, opacity, color'
    })

    // Create ScrollTrigger
    scrollTriggerRef.current = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top center',
      end: 'bottom center',
      scrub: 0.5,
      onUpdate: (self) => {
        const progress = self.progress
        setScrollProgress(progress)
      },
      onEnter: () => {
        // Start animation loop
        animationFrameRef.current = requestAnimationFrame(animationLoop)
        
        // Initial character entrance
        gsap.to(characterRefs.current, {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.5,
          stagger: 0.05,
          ease: 'back.out(1.7)'
        })
      },
      onLeave: () => {
        // Stop animation loop
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      },
      onEnterBack: () => {
        // Restart animation loop
        animationFrameRef.current = requestAnimationFrame(animationLoop)
      },
      onLeaveBack: () => {
        // Stop animation loop
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current)
        }
      }
    })

    return () => {
      if (scrollTriggerRef.current) {
        scrollTriggerRef.current.kill()
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [isVisible, scrollProgress])

  return (
    <section id="story" ref={sectionRef} className="py-24 bg-white relative overflow-hidden">
             {/* Background Video */}
       <video 
         ref={videoRef}
         className="absolute inset-0 w-full h-full object-cover"
         autoPlay
         muted
         loop
         playsInline
         style={{ willChange: 'transform' }}
       >
         <source src="/our-story.webm" type="video/webm" />
         {/* Fallback for browsers that don't support webm */}
         Your browser does not support the video tag.
       </video>
      <div className="section-padding relative z-10">
        <div className="container-max">
          {/* Section Header */}
          <div className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="text-center mb-16">
                              <span className="text-sm font-semibold text-white tracking-wider uppercase mb-4 block">
                  [01] OUR STORY
                </span>
            </div>
          </div>

          {/* Main Content Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
                         {/* Left Side - Large Typography */}
             <div className="lg:col-span-7">
               <div 
                 ref={typographyContainerRef}
                 className={`transition-all duration-1000 delay-300 text-left ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
               >
                 <h2 className="font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-white mb-4 text-left">
                   {createCharacterSpans('VISION.', 0)}
                 </h2>
                 <h2 className="font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-white mb-4 text-left">
                   {createCharacterSpans('ACTION.', 1)}
                 </h2>
                 <h2 className="font-dm-serif text-6xl md:text-8xl lg:text-9xl xl:text-[10rem] font-bold leading-none tracking-tight text-white text-left">
                   {createCharacterSpans('GLOBAL IMPACT.', 2)}
                 </h2>
               </div>
             </div>

            {/* Right Side - Content Block */}
            <div className="lg:col-span-5">
              <div 
                ref={redCardRef}
                className={`transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              >
                {/* Red Content Block */}
                <div className="bg-brand-red p-8 lg:p-10 rounded-2xl relative" style={{ willChange: 'transform' }}>
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
