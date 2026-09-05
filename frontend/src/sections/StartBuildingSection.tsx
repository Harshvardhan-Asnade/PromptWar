import React from 'react'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { TechLabel } from '../components/ui/Typography'
import { useGsapContext } from '../hooks/useGsapContext'
import { gsap, prefersReducedMotion } from '../lib/motion'

/**
 * SECTION 07 — FINAL CTA
 * Large, simple, bright final call-to-action and Phase 4 Discovery route placeholder.
 * "YOUR NEXT PROJECT STARTS HERE. Let's find the one worth building."
 */
export const StartBuildingSection: React.FC = () => {
  const containerRef = useGsapContext(() => {
    if (prefersReducedMotion()) return

    gsap.from('.final-cta-content', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 40,
      opacity: 0,
      duration: 0.9,
      stagger: 0.15,
      ease: 'power3.out',
    })
  })

  return (
    <section
      id="start"
      ref={containerRef}
      className="relative section-spacing border-b border-border bg-[#F7F6F2] overflow-hidden"
    >
      <Container>
        {/* Top Tag */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-16 md:mb-24">
          <TechLabel dot>07 / START BUILDING</TechLabel>
          <span className="type-meta text-fg-muted">ACTION PORTAL</span>
        </div>

        {/* Climax Typographic Canvas */}
        <div className="final-cta-content max-w-4xl mx-auto text-center py-6 md:py-14">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 bg-accent-light border border-accent/30 mb-8">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
              READY FOR DISCOVERY
            </span>
          </div>

          <h2 className="font-display font-extrabold text-4xl sm:text-6xl md:text-7xl lg:text-8xl text-fg tracking-tight mb-8 uppercase leading-[1.02]">
            YOUR NEXT PROJECT<br />
            <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">
              STARTS HERE.
            </span>
          </h2>

          <p className="type-body text-fg-secondary text-lg md:text-2xl max-w-xl mx-auto mb-12 font-normal leading-relaxed">
            Let's find the one worth building.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-20">
            <Button
              variant="primary"
              size="lg"
              href="#discovery"
              className="group flex items-center gap-3 px-10 py-4 text-xs font-semibold tracking-widest shadow-[0_4px_20px_rgba(255,90,31,0.3)]"
            >
              <span>START BUILDING</span>
              <svg
                className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Button>

            <Button
              variant="secondary"
              size="lg"
              href="#problem"
              className="px-8 py-4 text-xs font-semibold"
            >
              Review Philosophy
            </Button>
          </div>
        </div>

        {/* Phase 4 Route Anchor Placeholder */}
        <div
          id="discovery"
          className="final-cta-content max-w-2xl mx-auto p-8 md:p-12 bg-surface border-2 border-dashed border-border text-center shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
        >
          <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-wider">
              ROUTE // /discovery
            </span>
            <Badge variant="warning" dot>
              PHASE 4 GATEWAY
            </Badge>
          </div>

          <h3 className="font-display font-extrabold text-2xl md:text-3xl text-fg mb-3 tracking-tight">
            Student Discovery Experience
          </h3>

          <p className="type-body text-fg-secondary text-sm max-w-lg mx-auto mb-8 leading-relaxed">
            In Phase 4, you will describe your technical proficiencies, semester constraints, and
            domain interests to immediately generate 3 evaluated project blueprints.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-border">
            {[
              { step: '01', title: 'Skills Matrix' },
              { step: '02', title: 'Domain Scope' },
              { step: '03', title: 'Team Capacity' },
              { step: '04', title: 'Blueprint Engine' },
            ].map((item) => (
              <div key={item.step} className="p-3 bg-surface-subtle border border-border text-left">
                <span className="font-mono text-[0.625rem] text-accent font-semibold block mb-0.5">
                  STEP {item.step}
                </span>
                <span className="font-display font-semibold text-xs text-fg">
                  {item.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
