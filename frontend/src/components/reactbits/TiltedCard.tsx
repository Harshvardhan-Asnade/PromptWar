import React, { useRef, useState } from 'react'
import { prefersReducedMotion } from '../../lib/motion'

interface TiltedCardProps {
  children: React.ReactNode
  className?: string
  maxTilt?: number
}

export const TiltedCard: React.FC<TiltedCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [tilt, setTilt] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const isReduced = prefersReducedMotion()

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isReduced || !cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    const tiltX = ((y - centerY) / centerY) * -maxTilt
    const tiltY = ((x - centerX) / centerX) * maxTilt

    setTilt({ x: tiltX, y: tiltY })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: isReduced
          ? 'none'
          : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </div>
  )
}
