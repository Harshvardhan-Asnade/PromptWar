import React from 'react'
import { Container } from '../components/layout/Container'
import { TechLabel } from '../components/ui/Typography'
import { useGsapContext } from '../hooks/useGsapContext'
import { gsap, prefersReducedMotion } from '../lib/motion'

/**
 * SECTION 05 — THE PROMISE
 * Giant scroll-driven typographic declaration in bright editorial style.
 * FROM WHAT YOU KNOW -> TO WHAT YOU CAN BUILD.
 */
export const PromiseSection: React.FC = () => {
  const containerRef = useGsapContext(() => {
    if (prefersReducedMotion()) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 70%',
      },
    })

    tl.from('.promise-line-1', {
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
      .from(
        '.promise-line-divider',
        {
          scaleX: 0,
          transformOrigin: 'left center',
          duration: 0.8,
          ease: 'power2.inOut',
        },
        '-=0.4'
      )
      .from(
        '.promise-line-2',
        {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.4'
      )
      .from(
        '.promise-subtext',
        {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: 'power3.out',
        },
        '-=0.3'
      )
  })

  return (
    <section
      id="promise"
      ref={containerRef}
      className="relative section-spacing border-b border-border bg-surface overflow-hidden"
    >
      <Container>
        {/* Top Tag */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-20 md:mb-28">
          <TechLabel dot>05 / THE PROMISE</TechLabel>
          <span className="type-meta text-fg-muted">MISSION DECLARATION</span>
        </div>

        {/* Giant Typographic Statement */}
        <div className="max-w-5xl mx-auto text-left md:text-center">
          <h2 className="promise-line-1 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-fg-secondary uppercase leading-[1.02]">
            FROM WHAT YOU KNOW
          </h2>

          <div className="promise-line-divider my-8 md:my-14 flex items-center justify-center gap-6">
            <span className="h-0.5 w-16 md:w-28 bg-accent" />
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent font-semibold">
              TRANSFORMATION
            </span>
            <span className="h-0.5 w-16 md:w-28 bg-accent" />
          </div>

          <h2 className="promise-line-2 font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-fg uppercase leading-[1.02]">
            TO WHAT YOU CAN{' '}
            <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">
              BUILD.
            </span>
          </h2>

          <p className="promise-subtext type-body text-fg-secondary text-lg md:text-2xl max-w-2xl mx-auto mt-12 md:mt-16 font-normal leading-relaxed">
            Project Forge turns your skills, interests and constraints into practical project
            directions — then helps you plan, evaluate and improve them.
          </p>
        </div>
      </Container>
    </section>
  )
}
