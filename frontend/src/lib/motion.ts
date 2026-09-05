import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register GSAP plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

/**
 * Checks if the user has requested reduced motion.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Returns animation values respecting reduced motion preferences.
 * When reduced motion is active, disables transforms and shortens durations.
 */
function motionSafe<T extends Record<string, unknown>>(values: T, fallback?: Partial<T>): T {
  if (prefersReducedMotion()) {
    return {
      ...values,
      y: 0,
      x: 0,
      scale: 1,
      rotation: 0,
      duration: 0.01,
      stagger: 0,
      ...fallback,
    } as T
  }
  return values
}

/* ============================================================
   REUSABLE ANIMATION PRESETS
   ============================================================ */

export interface RevealOptions {
  trigger?: Element | null
  start?: string
  y?: number
  x?: number
  duration?: number
  delay?: number
  ease?: string
  stagger?: number
}

/**
 * Fade + translate reveal for a single element or NodeList.
 * Integrates with ScrollTrigger when a trigger is supplied.
 */
export function createReveal(
  targets: gsap.TweenTarget,
  options: RevealOptions = {}
) {
  const {
    trigger,
    start = 'top 85%',
    y = 50,
    x = 0,
    duration = 1,
    delay = 0,
    ease = 'power3.out',
    stagger = 0,
  } = options

  const fromVars = motionSafe({
    opacity: 0,
    y,
    x,
    duration,
    delay,
    ease,
    stagger,
    ...(trigger
      ? {
          scrollTrigger: {
            trigger,
            start,
            toggleActions: 'play none none none',
          },
        }
      : {}),
  })

  return gsap.from(targets, fromVars)
}

/**
 * Staggered reveal for a collection of child elements.
 */
export function createStaggerReveal(
  targets: gsap.TweenTarget,
  options: RevealOptions = {}
) {
  return createReveal(targets, {
    stagger: 0.12,
    y: 40,
    duration: 0.9,
    ease: 'power2.out',
    ...options,
  })
}

/**
 * Clip-path reveal: wipes from hidden to visible.
 * Useful for cinematic image/section transitions.
 */
export function createClipReveal(
  target: gsap.TweenTarget,
  options: {
    trigger?: Element | null
    start?: string
    duration?: number
    delay?: number
    direction?: 'bottom' | 'left' | 'right' | 'top'
  } = {}
) {
  const {
    trigger,
    start = 'top 80%',
    duration = 1.2,
    delay = 0,
    direction = 'bottom',
  } = options

  if (prefersReducedMotion()) {
    gsap.set(target, { clipPath: 'inset(0% 0% 0% 0%)' })
    return
  }

  const clipFrom: Record<string, string> = {
    bottom: 'inset(100% 0% 0% 0%)',
    top: 'inset(0% 0% 100% 0%)',
    left: 'inset(0% 100% 0% 0%)',
    right: 'inset(0% 0% 0% 100%)',
  }

  const tweenVars: gsap.TweenVars = {
    clipPath: 'inset(0% 0% 0% 0%)',
    duration,
    delay,
    ease: 'power3.inOut',
  }

  if (trigger) {
    tweenVars.scrollTrigger = {
      trigger,
      start,
      toggleActions: 'play none none none',
    }
  }

  gsap.set(target, { clipPath: clipFrom[direction] })
  return gsap.to(target, tweenVars)
}

/**
 * Hover interaction preset. Returns handlers to attach on mouse enter/leave.
 */
export function createHoverInteraction(
  element: HTMLElement,
  options: {
    y?: number
    scale?: number
    duration?: number
    ease?: string
  } = {}
) {
  const { y = -2, scale = 1, duration = 0.35, ease = 'power2.out' } = options

  if (prefersReducedMotion()) return { enter: () => {}, leave: () => {} }

  const enter = () => {
    gsap.to(element, { y, scale, duration, ease })
  }

  const leave = () => {
    gsap.to(element, { y: 0, scale: 1, duration, ease })
  }

  return { enter, leave }
}

/**
 * Create a parallax effect on scroll for background elements.
 */
export function createParallax(
  target: gsap.TweenTarget,
  options: {
    trigger?: Element | null
    speed?: number
    start?: string
    end?: string
  } = {}
) {
  if (prefersReducedMotion()) return

  const {
    trigger,
    speed = 0.3,
    start = 'top bottom',
    end = 'bottom top',
  } = options

  gsap.to(target, {
    y: () => speed * 100,
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || (target as Element),
      start,
      end,
      scrub: true,
    },
  })
}

// Re-export for convenience
export { gsap, ScrollTrigger }
