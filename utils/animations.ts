import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Animation presets
export const animationPresets = {
  // Fade in from bottom
  fadeInUp: {
    from: { opacity: 0, y: 30 },
    to: { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
  },
  
  // Fade in from left
  fadeInLeft: {
    from: { opacity: 0, x: -30 },
    to: { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }
  },
  
  // Fade in from right
  fadeInRight: {
    from: { opacity: 0, x: 30 },
    to: { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }
  },
  
  // Scale in
  scaleIn: {
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1, duration: 1, ease: 'back.out(1.7)' }
  },
  
  // Slide in from top
  slideInDown: {
    from: { opacity: 0, y: -30 },
    to: { opacity: 1, y: 0, duration: 1, ease: 'power2.out' }
  }
}

// Create scroll-triggered animation
export const createScrollAnimation = (
  element: string | Element | Element[],
  preset: keyof typeof animationPresets,
  options: {
    trigger?: string | Element
    start?: string
    end?: string
    delay?: number
    stagger?: number
    toggleActions?: string
  } = {}
) => {
  if (typeof window === 'undefined') return

  const {
    trigger,
    start = 'top 80%',
    end = 'bottom 20%',
    delay = 0,
    stagger = 0,
    toggleActions = 'play none none reverse'
  } = options

  const animation = animationPresets[preset]
  const triggerElement = trigger || element

  return gsap.fromTo(element, animation.from, {
    ...animation.to,
    delay,
    stagger,
    scrollTrigger: {
      trigger: triggerElement,
      start,
      end,
      toggleActions,
    }
  })
}

// Create hover animation
export const createHoverAnimation = (
  element: string | Element,
  options: {
    scale?: number
    rotation?: number
    duration?: number
    ease?: string
  } = {}
) => {
  if (typeof window === 'undefined') return

  const {
    scale = 1.05,
    rotation = 0,
    duration = 0.3,
    ease = 'power2.out'
  } = options

  const el = typeof element === 'string' ? document.querySelector(element) : element
  if (!el) return

  const hoverIn = () => {
    gsap.to(el, {
      scale,
      rotation,
      duration,
      ease
    })
  }

  const hoverOut = () => {
    gsap.to(el, {
      scale: 1,
      rotation: 0,
      duration,
      ease
    })
  }

  el.addEventListener('mouseenter', hoverIn)
  el.addEventListener('mouseleave', hoverOut)

  return () => {
    el.removeEventListener('mouseenter', hoverIn)
    el.removeEventListener('mouseleave', hoverOut)
  }
}

// Create stagger animation
export const createStaggerAnimation = (
  elements: string | Element[],
  preset: keyof typeof animationPresets,
  options: {
    stagger?: number
    delay?: number
    trigger?: string | Element
  } = {}
) => {
  if (typeof window === 'undefined') return

  const {
    stagger = 0.1,
    delay = 0,
    trigger
  } = options

  const animation = animationPresets[preset]
  const els = typeof elements === 'string' ? document.querySelectorAll(elements) : elements

  return gsap.fromTo(els, animation.from, {
    ...animation.to,
    delay,
    stagger,
    scrollTrigger: trigger ? {
      trigger,
      start: 'top 80%',
      toggleActions: 'play none none reverse'
    } : undefined
  })
}

// Timeline for complex animations
export const createTimeline = (options: gsap.TimelineVars = {}) => {
  return gsap.timeline(options)
}

// Utility to refresh ScrollTrigger (useful after dynamic content changes)
export const refreshScrollTrigger = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.refresh()
  }
}

// Clean up all ScrollTriggers
export const killAllScrollTriggers = () => {
  if (typeof window !== 'undefined') {
    ScrollTrigger.getAll().forEach(trigger => trigger.kill())
  }
}

// Page transition animations
export const pageTransitions = {
  fadeIn: (element: string | Element, duration: number = 1) => {
    return gsap.fromTo(element, 
      { opacity: 0 }, 
      { opacity: 1, duration, ease: 'power2.out' }
    )
  },
  
  slideUp: (element: string | Element, duration: number = 1) => {
    return gsap.fromTo(element,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration, ease: 'power2.out' }
    )
  }
}

// Loading animation
export const createLoadingAnimation = (element: string | Element) => {
  if (typeof window === 'undefined') return

  return gsap.to(element, {
    rotation: 360,
    duration: 1,
    ease: 'none',
    repeat: -1
  })
}
