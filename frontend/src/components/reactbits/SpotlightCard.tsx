import React, { useRef, useState } from 'react'

interface SpotlightCardProps {
  children: React.ReactNode
  className?: string
  spotlightColor?: string
  borderColor?: string
}

export const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor = 'rgba(255, 90, 31, 0.08)',
  borderColor = 'rgba(255, 90, 31, 0.3)',
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: -500, y: -500 })
  const [opacity, setOpacity] = useState<number>(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setOpacity(1)
  }

  const handleMouseLeave = () => {
    setOpacity(0)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-3xl border border-[#E4E2DC] bg-white transition-shadow duration-300 hover:shadow-xl ${className}`}
    >
      {/* Spotlight illumination */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 70%)`,
        }}
      />
      {/* Spotlight border glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl transition-opacity duration-300"
        style={{
          opacity,
          border: `1px solid ${borderColor}`,
          maskImage: `radial-gradient(280px circle at ${position.x}px ${position.y}px, black, transparent 80%)`,
          WebkitMaskImage: `radial-gradient(280px circle at ${position.x}px ${position.y}px, black, transparent 80%)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  )
}
