import React, { useRef } from 'react'
import { Container } from '../components/layout/Container'
import { TechLabel } from '../components/ui/Typography'
import { useGsapContext } from '../hooks/useGsapContext'
import { gsap, prefersReducedMotion } from '../lib/motion'

/**
 * SECTION 06 — WHAT PROJECT FORGE DELIVERS
 * Horizontally evolving editorial sequence:
 * IDEA → BLUEPRINT → REVIEW → IMPROVEMENT → MENTOR
 * Each stage occupies meaningful visual space with short title, explanation, and metadata.
 */
export const DeliverySequenceSection: React.FC = () => {
  const horizontalTrackRef = useRef<HTMLDivElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)

  const containerRef = useGsapContext(() => {
    if (prefersReducedMotion()) return
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return
    if (!horizontalTrackRef.current || !pinContainerRef.current) return

    const track = horizontalTrackRef.current
    const totalScroll = track.scrollWidth - window.innerWidth + 120

    gsap.to(track, {
      x: -totalScroll,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${totalScroll}`,
        pin: pinContainerRef.current,
        scrub: 1,
        invalidateOnRefresh: true,
      },
    })
  })

  const stages = [
    {
      number: '01',
      title: 'IDEA',
      subtitle: 'Tailored Ideation',
      explanation: 'Generates 3 calibrated project concepts uniquely tuned to your stack and domain curiosity.',
      meta: 'API // POST /api/projects/generate',
      deliverable: '3 Scored Project Possibilities',
    },
    {
      number: '02',
      title: 'BLUEPRINT',
      subtitle: 'System Architecture',
      explanation: 'Transforms the selected idea into an end-to-end specification with tech stacks and milestones.',
      meta: 'SPEC // 8-WEEK MODULAR ROADMAP',
      deliverable: 'Component Architecture & APIs',
    },
    {
      number: '03',
      title: 'REVIEW',
      subtitle: 'Feasibility Audit',
      explanation: 'Identifies external risks, dataset requirements, and grading criteria before you start building.',
      meta: 'AUDIT // 4-METRIC SCORING SUITE',
      deliverable: 'Strengths, Weaknesses, Risks',
    },
    {
      number: '04',
      title: 'IMPROVEMENT',
      subtitle: 'Scope Hardening',
      explanation: 'AI recommendations to harden weak spots, increase innovation, and calibrate difficulty.',
      meta: 'ENGINE // AUTOMATED REFACTORING',
      deliverable: 'Defense Talking Points',
    },
    {
      number: '05',
      title: 'MENTOR',
      subtitle: 'Contextual Guidance',
      explanation: 'An AI mentor that understands your exact blueprint schema and answers questions all semester.',
      meta: 'AGENT // PROJECT-AWARE ADVISOR',
      deliverable: 'Contextual Problem Solving',
    },
  ]

  return (
    <section
      id="delivers"
      ref={containerRef}
      className="relative border-b border-border bg-[#F7F6F2] overflow-hidden"
    >
      <div ref={pinContainerRef} className="lg:min-h-screen lg:flex lg:flex-col lg:justify-between py-12 md:py-16">
        <Container className="w-full">
          {/* Section Top Tag */}
          <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-8">
            <div className="flex items-center gap-3">
              <TechLabel dot>06 / WHAT WE DELIVER</TechLabel>
              <span className="text-border">|</span>
              <span className="type-meta text-accent font-semibold">THE 5-STAGE ARTIFACT</span>
            </div>
            <span className="type-meta text-fg-muted hidden sm:inline">
              HORIZONTAL SEQUENCE
            </span>
          </div>

          <div className="max-w-2xl mb-8 md:mb-12">
            <h2 className="type-h2 text-fg font-extrabold tracking-tight mb-2">
              From conception to defense.
            </h2>
            <p className="type-body text-fg-secondary text-sm md:text-base">
              A comprehensive system that accompanies your capstone journey at every milestone.
            </p>
          </div>
        </Container>

        {/* Horizontal Track (pinned on desktop, stacked on mobile) */}
        <div className="w-full overflow-x-hidden my-auto py-4">
          <div
            ref={horizontalTrackRef}
            className="flex flex-col lg:flex-row gap-6 md:gap-8 px-4 sm:px-8 lg:px-16 w-full lg:w-max"
          >
            {stages.map((stage) => (
              <div
                key={stage.number}
                className="w-full lg:w-[420px] p-8 md:p-10 bg-surface border border-border flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.03)] group hover:border-accent transition-colors duration-300 relative"
              >
                <div>
                  <div className="flex items-baseline justify-between border-b border-border pb-5 mb-6">
                    <span className="font-display font-extrabold text-4xl text-fg-faint group-hover:text-accent transition-colors duration-300">
                      {stage.number}
                    </span>
                    <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-accent">
                      {stage.subtitle}
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-3xl text-fg mb-4 tracking-tight">
                    {stage.title}
                  </h3>

                  <p className="type-body text-fg-secondary text-sm leading-relaxed mb-8">
                    {stage.explanation}
                  </p>
                </div>

                <div className="pt-6 border-t border-border/80">
                  <span className="type-meta text-fg-faint block mb-1">
                    {stage.meta}
                  </span>
                  <span className="font-mono text-xs text-fg font-medium">
                    {stage.deliverable}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Cue */}
        <Container className="w-full hidden lg:block mt-8">
          <div className="flex items-center justify-between pt-4 border-t border-border text-fg-muted">
            <span className="type-meta">SCROLL DRIVEN HORIZONTAL TRAVERSAL</span>
            <span className="type-meta">06 / 07</span>
          </div>
        </Container>
      </div>
    </section>
  )
}
