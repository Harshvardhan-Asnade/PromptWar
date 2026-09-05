import React, { useRef, useEffect, useCallback } from 'react'
import { prefersReducedMotion } from '../../lib/motion'

interface Ripple {
  x: number
  y: number
  radius: number
  maxRadius: number
  opacity: number
  speed: number
  color: string
}

interface WaterRippleCanvasProps {
  className?: string
  accentColor?: string // hex or rgb
}

export const WaterRippleCanvas: React.FC<WaterRippleCanvasProps> = ({
  className = '',
  accentColor = 'rgba(255, 90, 31, 0.12)',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const ripplesRef = useRef<Ripple[]>([])
  const animFrameRef = useRef<number | null>(null)
  const lastSpawnRef = useRef<number>(0)
  const isHoveredRef = useRef<boolean>(false)
  const isVisibleRef = useRef<boolean>(true)
  const renderRef = useRef<() => void>(() => {})

  // Draw loop
  const render = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || !isVisibleRef.current) {
      animFrameRef.current = null
      return
    }
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const activeRipples: Ripple[] = []

    for (let i = 0; i < ripplesRef.current.length; i++) {
      const r = ripplesRef.current[i]
      r.radius += r.speed
      // Progressive dissipation of opacity
      r.opacity *= 0.965

      if (r.opacity > 0.005 && r.radius < r.maxRadius) {
        // Outer wave crest
        ctx.save()
        ctx.beginPath()
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2)
        ctx.strokeStyle = r.color.replace('0.12', (r.opacity * 0.22).toFixed(3))
        ctx.lineWidth = 1.5
        ctx.stroke()

        // Subtle secondary caustic refraction ring
        if (r.radius > 12) {
          ctx.beginPath()
          ctx.arc(r.x, r.y, Math.max(0, r.radius - 8), 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255, 255, 255, ${(r.opacity * 0.35).toFixed(3)})`
          ctx.lineWidth = 1
          ctx.stroke()
        }

        ctx.restore()
        activeRipples.push(r)
      }
    }

    ripplesRef.current = activeRipples

    // If ripples still active and canvas visible, continue loop; else stop
    if (activeRipples.length > 0 && isVisibleRef.current) {
      animFrameRef.current = requestAnimationFrame(() => renderRef.current())
    } else {
      animFrameRef.current = null
    }
  }, [])

  useEffect(() => {
    renderRef.current = render
  }, [render])

  const startAnimation = useCallback(() => {
    if (animFrameRef.current === null && isVisibleRef.current) {
      animFrameRef.current = requestAnimationFrame(() => renderRef.current())
    }
  }, [])

  // Resize canvas to match container
  const updateCanvasSize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.scale(dpr, dpr)
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return

    const canvas = canvasRef.current
    if (!canvas) return

    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)

    // Pause animation when scrolled offscreen
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting && ripplesRef.current.length > 0 && animFrameRef.current === null) {
          animFrameRef.current = requestAnimationFrame(() => renderRef.current())
        } else if (!entry.isIntersecting && animFrameRef.current !== null) {
          cancelAnimationFrame(animFrameRef.current)
          animFrameRef.current = null
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      observer.disconnect()
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current)
        animFrameRef.current = null
      }
    }
  }, [updateCanvasSize])

  // Public/Parent event listeners attached to parent container
  useEffect(() => {
    if (prefersReducedMotion()) return

    const canvas = canvasRef.current
    const parent = canvas?.parentElement
    if (!parent) return

    const spawnRipple = (clientX: number, clientY: number, intensity = 1) => {
      const now = performance.now()
      // Throttle spawn rate to 40ms for high performance
      if (now - lastSpawnRef.current < 40) return
      lastSpawnRef.current = now

      const rect = parent.getBoundingClientRect()
      const x = clientX - rect.left
      const y = clientY - rect.top
      const maxRadius = Math.max(rect.width, rect.height) * 0.85

      ripplesRef.current.push({
        x,
        y,
        radius: 4,
        maxRadius,
        opacity: 0.85 * intensity,
        speed: 2.2 + Math.random() * 0.8,
        color: accentColor,
      })

      startAnimation()
    }

    const handlePointerMove = (e: PointerEvent) => {
      spawnRipple(e.clientX, e.clientY, 0.75)
    }

    const handlePointerEnter = (e: PointerEvent) => {
      isHoveredRef.current = true
      spawnRipple(e.clientX, e.clientY, 1.2)
    }

    const handlePointerLeave = () => {
      isHoveredRef.current = false
      // Accelerate graceful dissipation so ripples settle smoothly
      for (const r of ripplesRef.current) {
        r.opacity *= 0.65
        r.speed *= 0.7
      }
    }

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const t = e.touches[0]
        spawnRipple(t.clientX, t.clientY, 1.0)
      }
    }

    parent.addEventListener('pointermove', handlePointerMove, { passive: true })
    parent.addEventListener('pointerenter', handlePointerEnter, { passive: true })
    parent.addEventListener('pointerleave', handlePointerLeave, { passive: true })
    parent.addEventListener('touchstart', handleTouchStart, { passive: true })

    return () => {
      parent.removeEventListener('pointermove', handlePointerMove)
      parent.removeEventListener('pointerenter', handlePointerEnter)
      parent.removeEventListener('pointerleave', handlePointerLeave)
      parent.removeEventListener('touchstart', handleTouchStart)
    }
  }, [accentColor, startAnimation])

  // If user prefers reduced motion, render nothing for zero overhead
  if (typeof window !== 'undefined' && prefersReducedMotion()) {
    return null
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 rounded-2xl ${className}`}
    />
  )
}
