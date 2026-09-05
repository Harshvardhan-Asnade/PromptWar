import React from 'react'
import { Container } from '../components/layout/Container'
import { TechLabel } from '../components/ui/Typography'
import { useGsapContext } from '../hooks/useGsapContext'
import { gsap, prefersReducedMotion } from '../lib/motion'

/**
 * SECTION 02 — THE PROBLEM
 * Editorial typographic layout without boxed dashboard cards.
 * "Too many ideas." -> "Too little direction." -> "Too much complexity."
 * -> "Finding the right project shouldn't feel this hard."
 */
export const ProblemSection: React.FC = () => {
  const containerRef = useGsapContext(() => {
    if (prefersReducedMotion()) return

    gsap.from('.problem-row', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.18,
      ease: 'power3.out',
    })

    gsap.from('.problem-climax', {
      scrollTrigger: {
        trigger: '.problem-climax',
        start: 'top 80%',
      },
      y: 30,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
  })

  const issues = [
    {
      index: '01',
      title: 'Too many ideas.',
      description:
        'Endless lists of generic tutorial projects. E-commerce clones and standard classifiers that fail to showcase actual engineering curiosity.',
    },
    {
      index: '02',
      title: 'Too little direction.',
      description:
        'No institutional benchmark to know whether an idea is technically deep enough for review, or relevant to current industry demands.',
    },
    {
      index: '03',
      title: 'Too much complexity.',
      description:
        'Over-ambitious architectures designed on whiteboards that collapse under real-world semester deadlines and team resource limits.',
    },
  ]

  return (
    <section
      id="problem"
      ref={containerRef}
      className="relative section-spacing border-b border-border bg-surface overflow-hidden"
    >
      <Container>
        {/* Top Metadata Header */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-16 md:mb-24">
          <TechLabel dot>02 / THE PROBLEM</TechLabel>
          <span className="type-meta text-fg-muted">IMPEDIMENT ANALYSIS</span>
        </div>

        {/* Editorial Rows */}
        <div className="space-y-12 md:space-y-16 max-w-5xl mb-20 md:mb-28">
          {issues.map((item) => (
            <div
              key={item.index}
              className="problem-row border-b border-border/70 pb-10 md:pb-14 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-baseline"
            >
              <div className="md:col-span-2 font-mono text-sm uppercase tracking-widest text-accent font-semibold">
                {item.index} //
              </div>
              <div className="md:col-span-5 font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-fg">
                {item.title}
              </div>
              <div className="md:col-span-5 type-body text-fg-secondary text-base leading-relaxed">
                {item.description}
              </div>
            </div>
          ))}
        </div>

        {/* Climax Statement */}
        <div className="problem-climax max-w-4xl pt-4">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-0.5 w-8 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.18em] text-accent font-semibold">
              THE CORE REALITY
            </span>
          </div>

          <h3 className="font-display text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-fg leading-[1.08]">
            Finding the right project{' '}
            <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">
              shouldn't feel this hard.
            </span>
          </h3>

          <p className="type-body text-fg-secondary text-lg md:text-xl mt-8 max-w-2xl leading-relaxed">
            When you align your real capabilities with a calibrated problem space, engineering stops
            feeling like academic friction and becomes an inspiring build journey.
          </p>
        </div>
      </Container>
    </section>
  )
}
