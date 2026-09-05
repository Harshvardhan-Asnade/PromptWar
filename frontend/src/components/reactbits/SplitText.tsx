import React from 'react'
import { motion } from 'framer-motion'
import { prefersReducedMotion } from '../../lib/motion'

interface SplitTextProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
}

export const SplitText: React.FC<SplitTextProps> = ({
  text,
  className = '',
  delay = 0,
  stagger = 0.03,
}) => {
  const isReduced = prefersReducedMotion()
  const words = text.split(' ')

  if (isReduced) {
    return <span className={className}>{text}</span>
  }

  return (
    <span className={`inline-block overflow-hidden ${className}`}>
      {words.map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.45,
                delay: delay + (wordIndex * 5 + charIndex) * stagger,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </span>
  )
}
