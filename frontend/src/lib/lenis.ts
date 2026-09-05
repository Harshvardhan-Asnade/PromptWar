import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export interface SmoothScrollInstance {
  lenis: Lenis
  destroy: () => void
}

/**
 * Creates and connects a Lenis smooth-scroll instance with GSAP ScrollTrigger ticker.
 */
export function initSmoothScroll(): SmoothScrollInstance {
  const isReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  const lenis = new Lenis({
    duration: isReduced ? 0.01 : 1.2,
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: !isReduced,
  })

  // Synchronize Lenis scroll events with ScrollTrigger
  lenis.on('scroll', ScrollTrigger.update)

  if (!isReduced) {
    // Integrate with GSAP animation frame ticker
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(tickerCallback)
    gsap.ticker.lagSmoothing(0)

    return {
      lenis,
      destroy: () => {
        gsap.ticker.remove(tickerCallback)
        lenis.destroy()
      },
    }
  }

  return {
    lenis,
    destroy: () => {
      lenis.destroy()
    },
  }
}
