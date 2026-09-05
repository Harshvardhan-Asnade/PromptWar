import React from 'react'
import { Container } from '../components/layout/Container'
import { TechLabel } from '../components/ui/Typography'
import { useGsapContext } from '../hooks/useGsapContext'
import { gsap, prefersReducedMotion } from '../lib/motion'

/**
 * SECTION 01 — THE QUESTION
 * Large scroll-driven typography with generous whitespace.
 * "You know how to build things." -> pause -> "But what should you build?"
 */
export const QuestionSection: React.FC = () => {
  const containerRef = useGsapContext((_, container) => {
    if (prefersReducedMotion()) return

    gsap.from('.question-statement-1', {
      scrollTrigger: {
        trigger: container,
        start: 'top 70%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })

    gsap.from('.question-pause-divider', {
      scrollTrigger: {
        trigger: '.question-pause-divider',
        start: 'top 80%',
      },
      scaleX: 0,
      transformOrigin: 'left center',
      duration: 0.8,
      ease: 'power3.inOut',
    })

    gsap.from('.question-statement-2', {
      scrollTrigger: {
        trigger: '.question-statement-2',
        start: 'top 75%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
  })

  return (
    <section
      id="question"
      ref={containerRef}
      className="relative section-spacing border-b border-border bg-[#F7F6F2] overflow-hidden"
    >
      <Container>
        {/* Section Top Tag */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-20 md:mb-28">
          <TechLabel dot>01 / THE QUESTION</TechLabel>
          <span className="type-meta text-fg-muted">FOUNDATIONAL CHALLENGE</span>
        </div>

        {/* Minimalist, High-Impact Typographic Canvas */}
        <div className="max-w-5xl mx-auto my-8 md:my-16">
          <p className="question-statement-1 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-fg leading-[1.08]">
            You know how to build things.
          </p>

          {/* Pause / Visual Separation */}
          <div className="question-pause-divider my-12 md:my-20 flex items-center gap-6">
            <div className="h-px flex-1 bg-border" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-accent font-semibold">
              THE GAP
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <p className="question-statement-2 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-fg leading-[1.08]">
            But what should you{' '}
            <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">
              build?
            </span>
          </p>

          <p className="type-body text-fg-secondary text-lg md:text-xl max-w-2xl mt-12 md:mt-16 leading-relaxed">
            Four years of computer science teaches you how to implement algorithms and deploy code.
            It rarely teaches you how to identify a problem that is technically challenging, feasible
            for your team, and worth your degree.
          </p>
        </div>
      </Container>
    </section>
  )
}
