import React, { useRef, useEffect } from 'react'
import { prefersReducedMotion } from '../../lib/motion'

interface ForgedSurfaceCanvasProps {
  className?: string
}

/**
 * ForgedSurfaceCanvas — Refined WebGL/Canvas Hero Field
 * Simulates a soft forged material / liquid surface wave in warm Project Forge tones.
 * Responds subtly to pointer coordinates with spring lerping.
 * Auto-pauses GPU RAF loop via IntersectionObserver when offscreen.
 * Respects prefers-reduced-motion and mobile low-power constraints.
 */
export const ForgedSurfaceCanvas: React.FC<ForgedSurfaceCanvasProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animFrameRef = useRef<number | null>(null)
  const isVisibleRef = useRef<boolean>(true)
  const pointerRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0.5,
    y: 0.5,
    targetX: 0.5,
    targetY: 0.5,
  })

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (prefersReducedMotion()) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    let width = 0
    let height = 0
    let time = 0

    let cachedGradients: CanvasGradient[] = []

    const resize = () => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      // Use lower DPR on mobile for max GPU efficiency
      const dpr = isMobile ? 1 : Math.min(window.devicePixelRatio || 1, 1.75)
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)

      // Precompute ribbon gradients once on resize instead of every RAF frame (Phase 2.7)
      cachedGradients = []
      const ribbons = isMobile ? 3 : 5
      for (let r = 0; r < ribbons; r++) {
        const yOffset = height * (0.45 + r * 0.12)
        const alpha = (0.025 + r * 0.018).toFixed(3)
        const gradient = ctx.createLinearGradient(0, yOffset - 50, width, height)
        gradient.addColorStop(0, `rgba(255, 90, 31, ${alpha})`)
        gradient.addColorStop(0.5, `rgba(255, 140, 70, ${(Number(alpha) * 0.7).toFixed(3)})`)
        gradient.addColorStop(1, `rgba(247, 246, 242, 0.01)`)
        cachedGradients.push(gradient)
      }
    }

    resize()
    window.addEventListener('resize', resize)

    // IntersectionObserver to pause loop when scrolled out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting
        if (entry.isIntersecting && animFrameRef.current === null) {
          animFrameRef.current = requestAnimationFrame(render)
        }
      },
      { threshold: 0.05 }
    )
    observer.observe(canvas)

    // Track pointer subtly
    const handlePointerMove = (e: PointerEvent) => {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      pointerRef.current.targetX = (e.clientX - rect.left) / rect.width
      pointerRef.current.targetY = (e.clientY - rect.top) / rect.height
    }

    window.addEventListener('pointermove', handlePointerMove, { passive: true })

    // Wave rendering loop
    const render = () => {
      if (!isVisibleRef.current) {
        animFrameRef.current = null
        return
      }

      // Smooth pointer lerp
      pointerRef.current.x += (pointerRef.current.targetX - pointerRef.current.x) * 0.04
      pointerRef.current.y += (pointerRef.current.targetY - pointerRef.current.y) * 0.04

      time += isMobile ? 0.008 : 0.014

      ctx.clearRect(0, 0, width, height)

      const px = pointerRef.current.x
      const py = pointerRef.current.y

      // Number of wave ribbons (fewer on mobile for peak performance)
      const ribbons = isMobile ? 3 : 5

      for (let r = 0; r < ribbons; r++) {
        ctx.beginPath()
        const yOffset = height * (0.45 + r * 0.12)
        const waveAmp = (25 + r * 8) * (0.8 + (1 - py) * 0.4)
        const freq = 0.0028 + r * 0.0006

        ctx.moveTo(0, height)
        ctx.lineTo(0, yOffset)

        // Step by 16px on desktop, 28px on mobile
        const step = isMobile ? 28 : 16
        for (let x = 0; x <= width; x += step) {
          const distToCursor = Math.abs(x / width - px)
          const pointerDistortion = Math.sin(distToCursor * Math.PI) * 18

          const y =
            yOffset +
            Math.sin(x * freq + time + r * 1.4) * waveAmp +
            Math.cos(x * freq * 1.5 - time * 0.8) * (waveAmp * 0.45) -
            pointerDistortion * (py * 0.5)

          ctx.lineTo(x, y)
        }

        ctx.lineTo(width, height)
        ctx.closePath()

        // Use precomputed gradient (0 per-frame heap allocations)
        ctx.fillStyle = cachedGradients[r] || 'rgba(255, 90, 31, 0.05)'
        ctx.fill()
      }

      animFrameRef.current = requestAnimationFrame(render)
    }

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', handlePointerMove)
      observer.disconnect()
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current)
      }
    }
  }, [])

  if (typeof window !== 'undefined' && prefersReducedMotion()) {
    return (
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-b from-[#FFF0E9]/30 to-transparent ${className}`}
        aria-hidden="true"
      />
    )
  }

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none z-0 ${className}`}
    />
  )
}
