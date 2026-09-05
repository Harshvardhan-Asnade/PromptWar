import React, { useEffect, useRef } from 'react'
import { createReveal, gsap } from '../../lib/motion'

interface RevealProps {
  children: React.ReactNode
  /** CSS class(es) to apply to the wrapper. */
  className?: string
  /** Delay before animation starts (seconds). */
  delay?: number
  /** Vertical offset (px). */
  y?: number
  /** Horizontal offset (px). */
  x?: number
  /** Animation duration (seconds). */
  duration?: number
  /** Whether to trigger on scroll. Defaults to true. */
  scrollTrigger?: boolean
  /** ScrollTrigger start position. */
  start?: string
  /** HTML tag for the wrapper. */
  as?: React.ElementType
}

/**
 * Wraps children in a reveal animation that fades+translates into view.
 * Integrates with ScrollTrigger by default.
 */
export const Reveal: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  y = 40,
  x = 0,
  duration = 1,
  scrollTrigger = true,
  start = 'top 85%',
  as: Tag = 'div',
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    const ctx = gsap.context(() => {
      createReveal(ref.current, {
        trigger: scrollTrigger ? ref.current : null,
        start,
        y,
        x,
        duration,
        delay,
      })
    }, ref.current)

    return () => ctx.revert()
  }, [delay, y, x, duration, scrollTrigger, start])

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement>} className={className}>
      {children}
    </Tag>
  )
}
