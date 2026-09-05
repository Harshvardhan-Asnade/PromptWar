import React, { useEffect, useRef } from 'react'
import { createStaggerReveal, gsap } from '../../lib/motion'

interface StaggerRevealProps {
  children: React.ReactNode
  className?: string
  /** CSS selector for child elements to stagger. Defaults to direct children. */
  selector?: string
  stagger?: number
  y?: number
  duration?: number
  start?: string
}

/**
 * Applies staggered reveal animation to child elements.
 * Children are selected by CSS selector within the container.
 */
export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  className = '',
  selector = ':scope > *',
  stagger = 0.12,
  y = 40,
  duration = 0.9,
  start = 'top 85%',
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const targets = ref.current.querySelectorAll(selector)
    if (targets.length === 0) return

    const ctx = gsap.context(() => {
      createStaggerReveal(targets, {
        trigger: ref.current,
        start,
        stagger,
        y,
        duration,
      })
    }, ref.current)

    return () => ctx.revert()
  }, [selector, stagger, y, duration, start])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
