import React from 'react'
import { Container } from '../components/layout/Container'
import { TechLabel } from '../components/ui/Typography'
import { useGsapContext } from '../hooks/useGsapContext'
import { gsap, prefersReducedMotion } from '../lib/motion'

/**
 * 03 — THE SHIFT
 * Transforming scattered input factors into singular engineering clarity.
 */
export const ShiftSection: React.FC = () => {
  const containerRef = useGsapContext(() => {
    if (prefersReducedMotion()) return

    gsap.from('.shift-factor', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 35,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
    })

    gsap.from('.shift-resolution', {
      scrollTrigger: {
        trigger: '.shift-resolution-container',
        start: 'top 80%',
      },
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: 'power3.out',
    })
  })

  const factors = [
    {
      index: '01',
      title: 'Your skills.',
      meta: 'CAPABILITIES',
      description: 'The languages, frameworks, and foundational CS concepts your team actually knows.',
      examples: ['Python', 'FastAPI', 'React', 'PyTorch'],
    },
    {
      index: '02',
      title: 'Your interests.',
      meta: 'DOMAIN FOCUS',
      description: 'The real-world sectors, technical challenges, or research topics that genuinely excite you.',
      examples: ['Autonomous AI', 'Bioinformatics', 'Consensus Networks', 'Edge Telemetry'],
    },
    {
      index: '03',
      title: 'Your constraints.',
      meta: 'GROUND TRUTH',
      description: 'Your real semester calendar, team size, available GPU hardware, and grading criteria.',
      examples: ['3 Students', '8 Weeks', 'Production Grade', 'Defense Ready'],
    },
  ]

  return (
    <section
      id="shift"
      ref={containerRef}
      className="relative section-spacing border-b border-border bg-canvas overflow-hidden"
    >
      <Container>
        {/* Section Metadata Header */}
        <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-16 md:mb-20">
          <TechLabel dot>03 / THE SHIFT</TechLabel>
          <span className="type-meta text-fg-faint">CHAOS TO SYNTHESIS</span>
        </div>

        {/* Input Factors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16 md:mb-24">
          {factors.map((factor) => (
            <div
              key={factor.index}
              className="shift-factor p-6 md:p-8 border border-border bg-surface flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between border-b border-border/50 pb-3 mb-6">
                  <span className="type-meta text-accent">{factor.index} // INPUT</span>
                  <span className="type-meta text-fg-faint">{factor.meta}</span>
                </div>
                <h3 className="type-h2 text-fg mb-4">{factor.title}</h3>
                <p className="type-body text-fg-secondary text-sm leading-relaxed mb-6">
                  {factor.description}
                </p>
              </div>

              {/* Tag representations */}
              <div className="pt-4 border-t border-border/40 flex flex-wrap gap-1.5">
                {factor.examples.map((item, idx) => (
                  <span
                    key={idx}
                    className="font-mono text-[0.625rem] text-fg-muted uppercase px-2 py-0.5 bg-surface-subtle border border-border/60"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Connective Convergence Statement */}
        <div className="shift-resolution-container pt-8 border-t border-border max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-px w-10 bg-accent" />
            <span className="type-label text-accent tracking-[0.2em]">SYNTHESIS VECTOR</span>
          </div>

          <div className="space-y-4 md:space-y-6">
            <h2 className="shift-resolution type-display text-fg-muted">
              One direction.
            </h2>
            <h2 className="shift-resolution type-display text-fg">
              Your project.
            </h2>
          </div>

          <p className="shift-resolution type-body text-fg-secondary mt-8 max-w-2xl text-base md:text-lg leading-relaxed">
            Project Forge eliminates the noise of thousands of generic lists. It converges your
            team's unique variables into a singular, high-conviction engineering direction designed
            to succeed in final review.
          </p>
        </div>
      </Container>
    </section>
  )
}
