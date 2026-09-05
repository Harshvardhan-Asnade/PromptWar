import React, { useEffect, useState, useRef } from 'react'

/**
 * Minimal, high-performance desktop custom cursor.
 * Disabled on touch screens and under prefers-reduced-motion.
 */
export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isEnabled] = useState(() => {
    if (typeof window === 'undefined') return false
    const isFinePointer = window.matchMedia('(pointer: fine)').matches
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    return isFinePointer && !isReduced
  })

  useEffect(() => {
    if (!isEnabled) return

    const onMouseMove = (e: MouseEvent) => {
      if (!cursorRef.current) return
      setIsVisible(true)
      cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
    }

    const onMouseLeave = () => setIsVisible(false)
    const onMouseEnter = () => setIsVisible(true)

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      if (
        target?.closest('a') ||
        target?.closest('button') ||
        target?.closest('[role="button"]') ||
        target?.closest('[data-cursor="pointer"]')
      ) {
        setIsHovered(true)
      } else {
        setIsHovered(false)
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)
    window.addEventListener('mouseover', onOver, { passive: true })

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      window.removeEventListener('mouseover', onOver)
    }
  }, [isEnabled])

  if (!isEnabled) return null

  return (
    <div
      ref={cursorRef}
      className={[
        'fixed top-0 left-0 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-150 ease-out',
        isVisible ? 'opacity-100' : 'opacity-0',
        isHovered
          ? 'w-7 h-7 bg-accent/15 border border-accent scale-100'
          : 'w-2.5 h-2.5 bg-accent scale-100',
      ].join(' ')}
      style={{ willChange: 'transform' }}
    />
  )
}
