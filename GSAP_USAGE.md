# GSAP Animation Usage Guide

This project now includes GSAP (GreenSock Animation Platform) for advanced animations. Here's how to use it effectively.

## Installation Complete ✅

GSAP is already installed and configured with:
- Core GSAP library
- ScrollTrigger plugin for scroll-based animations
- Custom hooks for easy integration
- Utility functions for common animations

## Quick Start

### 1. Using Custom Hooks (Recommended)

```tsx
import { useFadeInOnScroll, useStaggerAnimation, useHoverAnimation } from '@/hooks/useGSAP'

function MyComponent() {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Fade in elements on scroll
  useFadeInOnScroll('.fade-element', { delay: 0.2, duration: 1 })
  
  // Stagger animate children
  useStaggerAnimation(containerRef, '.child-element', { stagger: 0.1 })
  
  // Hover animation
  useHoverAnimation(buttonRef, { scale: 1.05 })

  return (
    <div ref={containerRef}>
      <h1 className="fade-element">Animated Title</h1>
      <div className="child-element">Card 1</div>
      <div className="child-element">Card 2</div>
      <button ref={buttonRef}>Hover Me</button>
    </div>
  )
}
```

### 2. Using Utility Functions

```tsx
import { createScrollAnimation, createHoverAnimation } from '@/utils/animations'

useEffect(() => {
  // Animate on scroll
  createScrollAnimation('.my-element', 'fadeInUp', {
    delay: 0.3,
    stagger: 0.1
  })
  
  // Add hover effect
  const cleanup = createHoverAnimation('.hover-element', {
    scale: 1.1,
    duration: 0.3
  })
  
  return cleanup
}, [])
```

### 3. Direct GSAP Usage

```tsx
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

useEffect(() => {
  gsap.registerPlugin(ScrollTrigger)
  
  gsap.fromTo('.element', 
    { opacity: 0, y: 50 },
    { 
      opacity: 1, 
      y: 0, 
      duration: 1,
      scrollTrigger: {
        trigger: '.element',
        start: 'top 80%'
      }
    }
  )
}, [])
```

## Available Hooks

### `useFadeInOnScroll`
Fades in elements when they enter the viewport.
```tsx
useFadeInOnScroll('.selector', {
  delay: 0.2,      // Animation delay
  duration: 1,     // Animation duration
  y: 30,          // Starting Y offset
  stagger: 0.1    // Stagger between multiple elements
})
```

### `useSlideInAnimation`
Slides elements in from different directions.
```tsx
useSlideInAnimation(elementRef, 'left', {
  delay: 0,
  duration: 1,
  distance: 50
})
```

### `useStaggerAnimation`
Animates child elements with a stagger effect.
```tsx
useStaggerAnimation(containerRef, '.child', {
  delay: 0,
  duration: 0.8,
  stagger: 0.1,
  y: 30
})
```

### `useTextReveal`
Reveals text with a typewriter-like effect.
```tsx
useTextReveal(textRef, {
  delay: 0,
  duration: 1,
  splitBy: 'words' // 'chars' | 'words' | 'lines'
})
```

### `useHoverAnimation`
Adds hover animations to elements.
```tsx
useHoverAnimation(elementRef, {
  scale: 1.05,
  duration: 0.3,
  ease: 'power2.out'
})
```

### `useParallax`
Creates parallax scrolling effects.
```tsx
useParallax(elementRef, {
  speed: 0.5,        // Parallax speed
  direction: 'up'    // 'up' | 'down'
})
```

## Animation Presets

Available in `/utils/animations.ts`:
- `fadeInUp` - Fade in from bottom
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right
- `scaleIn` - Scale in with bounce
- `slideInDown` - Slide in from top

## Best Practices

### 1. Performance
- Use `will-change: transform` CSS for animated elements
- Clean up animations on component unmount
- Use `ScrollTrigger.refresh()` after dynamic content changes

### 2. Accessibility
- Respect `prefers-reduced-motion` media query
- Provide alternative non-animated experiences

```tsx
useEffect(() => {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  
  if (!prefersReducedMotion.matches) {
    // Only animate if user hasn't requested reduced motion
    useFadeInOnScroll('.element')
  }
}, [])
```

### 3. SSR Compatibility
All hooks and utilities include SSR checks (`typeof window !== 'undefined'`).

## Common Patterns

### Page Transitions
```tsx
import { pageTransitions } from '@/utils/animations'

// On route change
pageTransitions.fadeIn('main', 0.5)
```

### Loading States
```tsx
import { createLoadingAnimation } from '@/utils/animations'

const loadingAnimation = createLoadingAnimation('.spinner')
// Kill animation when done
loadingAnimation?.kill()
```

### Complex Timelines
```tsx
import { createTimeline } from '@/utils/animations'

const tl = createTimeline()
tl.fromTo('.element1', { opacity: 0 }, { opacity: 1, duration: 1 })
  .fromTo('.element2', { x: -50 }, { x: 0, duration: 1 }, '-=0.5')
  .to('.element3', { rotation: 360, duration: 2 })
```

## Troubleshooting

### ScrollTrigger Issues
```tsx
import { refreshScrollTrigger, killAllScrollTriggers } from '@/utils/animations'

// After dynamic content changes
refreshScrollTrigger()

// Clean up on unmount
useEffect(() => {
  return () => killAllScrollTriggers()
}, [])
```

### Performance Issues
- Use `transform` and `opacity` properties (GPU accelerated)
- Avoid animating `width`, `height`, `top`, `left`
- Use `will-change: transform` sparingly

## Examples in Components

Check out these components for GSAP usage examples:
- `/components/AnimatedSection.tsx` - Comprehensive example
- `/components/HeroSection.tsx` - Hero animations
- `/components/FeaturedWorkSection.tsx` - Complex interactions

## Resources

- [GSAP Documentation](https://greensock.com/docs/)
- [ScrollTrigger Docs](https://greensock.com/docs/v3/Plugins/ScrollTrigger)
- [GSAP Cheat Sheet](https://greensock.com/cheatsheet/)

Happy animating! 🎬✨
