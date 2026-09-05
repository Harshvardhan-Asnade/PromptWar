import React, { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../../lib/motion'

interface CountUpProps {
  end: number
  start?: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export const CountUp: React.FC<CountUpProps> = ({
  end,
  start = 0,
  duration = 1.2,
  prefix = '',
  suffix = '',
  className = '',
}) => {
  const isReduced = prefersReducedMotion()
  const [count, setCount] = useState<number>(isReduced ? end : start)

  useEffect(() => {
    if (isReduced) return

    let startTime: number | null = null
    let animationFrame: number

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1)
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      const current = Math.floor(start + (end - start) * easeOutQuart)
      setCount(current)

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step)
      } else {
        setCount(end)
      }
    }

    animationFrame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, start, duration, isReduced])

  return (
    <span className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  )
}
