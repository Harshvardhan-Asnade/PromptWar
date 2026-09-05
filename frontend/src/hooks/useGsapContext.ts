import { useEffect, useRef, useCallback } from 'react'
import { gsap } from '../lib/motion'

/**
 * Creates a GSAP context scoped to a container ref.
 * Automatically reverts all GSAP animations on unmount.
 */
export function useGsapContext(
  callback: (ctx: gsap.Context, container: HTMLDivElement) => void,
  deps: React.DependencyList = []
) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const container = containerRef.current
    const ctx = gsap.context((self) => {
      callback(self, container)
    }, container)

    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return containerRef
}

/**
 * Returns a stable callback to register elements with GSAP context.
 * Useful for ref callbacks on dynamically rendered items.
 */
export function useGsapRef<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const setRef = useCallback((el: T | null) => {
    ref.current = el
  }, [])

  return [ref, setRef] as const
}
