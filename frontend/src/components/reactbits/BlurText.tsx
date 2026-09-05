import React from 'react'
import { motion } from 'framer-motion'
import { prefersReducedMotion } from '../../lib/motion'

interface BlurTextProps {
  text: string
  className?: string
  delay?: number
  animateBy?: 'words' | 'letters'
}

export const BlurText: React.FC<BlurTextProps> = ({
  text,
  className = '',
  delay = 0,
  animateBy = 'words',
}) => {
  const isReduced = prefersReducedMotion()

  if (isReduced) {
    return <span className={className}>{text}</span>
  }

  const elements = animateBy === 'words' ? text.split(' ') : text.split('')

  return (
    <span className={`inline-block ${className}`}>
      {elements.map((segment, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(8px)', y: 6 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + i * (animateBy === 'words' ? 0.08 : 0.02),
            ease: 'easeOut',
          }}
          className="inline-block"
        >
          {segment}
          {animateBy === 'words' && i < elements.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  )
}
