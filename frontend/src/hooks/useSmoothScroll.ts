import { useEffect, useRef } from 'react'
import type Lenis from 'lenis'
import { initSmoothScroll } from '../lib/lenis'

/**
 * Reusable hook that mounts Lenis smooth scrolling with GSAP ticker sync,
 * and handles lifecycle cleanup on unmount.
 */
export function useSmoothScroll() {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const { lenis, destroy } = initSmoothScroll()
    lenisRef.current = lenis

    return () => {
      destroy()
      lenisRef.current = null
    }
  }, [])

  return lenisRef
}
