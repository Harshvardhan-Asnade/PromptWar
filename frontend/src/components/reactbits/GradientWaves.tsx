import React from 'react'
import { prefersReducedMotion } from '../../lib/motion'

interface GradientWavesProps {
  className?: string
}

export const GradientWaves: React.FC<GradientWavesProps> = ({ className = '' }) => {
  const isReduced = prefersReducedMotion()

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none opacity-45 ${className}`}
    >
      <svg
        className="w-full h-full object-cover"
        viewBox="0 0 1440 600"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.12" />
            <stop offset="50%" stopColor="#FF8554" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FFF0E9" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="wave-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#E4E2DC" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        <path
          d="M0,160 C320,280, 420,40, 720,160 C1020,280, 1120,80, 1440,160 L1440,600 L0,600 Z"
          fill="url(#wave-grad-1)"
          className={isReduced ? '' : 'animate-pulse'}
          style={{ animationDuration: '8s' }}
        />
        <path
          d="M0,260 C280,120, 520,340, 840,220 C1160,100, 1280,300, 1440,240 L1440,600 L0,600 Z"
          fill="url(#wave-grad-2)"
        />
      </svg>
    </div>
  )
}
