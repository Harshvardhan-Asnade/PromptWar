import React from 'react'
import { Container } from '../components/layout/Container'
import { TechLabel } from '../components/ui/Typography'
import { useGsapContext } from '../hooks/useGsapContext'
import { gsap, prefersReducedMotion } from '../lib/motion'

/**
 * SECTION 03 — THE INPUTS
 * Three large editorial blocks representing the raw ingredients of discovery.
 * 01 / YOUR SKILLS
 * 02 / YOUR INTERESTS
 * 03 / YOUR CONSTRAINTS
 */
export const InputsSection: React.FC = () => {
  const containerRef = useGsapContext(() => {
    if (prefersReducedMotion()) return

    gsap.from('.input-editorial-block', {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 75%',
      },
      y: 45,
      opacity: 0,
      duration: 0.9,
      stagger: 0.16,
      ease: 'power3.out',
    })
  })

  const inputBlocks = [
    {
      number: '01',
      tag: 'CAPABILITIES // GROUND TRUTH',
      title: 'YOUR SKILLS',
      explanation:
        'The technical foundations your team actually commands. Not aspirational buzzwords, but real proficiencies in languages, runtimes, and libraries.',
      examples: ['Python / FastAPI', 'TypeScript / React', 'PyTorch / ML', 'PostgreSQL / SQL', 'Embedded / C++'],
    },
    {
      number: '02',
      tag: 'DOMAINS // CURIOSITY',
      title: 'YOUR INTERESTS',
      explanation:
        'The industries and human challenges that genuinely excite you. High-conviction projects emerge when engineering serves a domain you care about.',
      examples: ['Autonomous Systems', 'Healthcare & Diagnostics', 'Consensus Networks', 'Edge Telemetry', 'Creative AI'],
    },
    {
      number: '03',
      tag: 'BOUNDARY // CALIBRATION',
      title: 'YOUR CONSTRAINTS',
      explanation:
        'The hard boundaries that determine success. Your calendar weeks, team head count, GPU compute access, and defense milestones.',
      examples: ['3 Developers', '8-Week Horizon', 'Production Ready', 'Defense Benchmarks', 'Zero Cloud Costs'],
    },
  ]

  return (
    <section
      id="inputs"
      ref={containerRef}
      className="relative section-spacing border-b border-border bg-[#F7F6F2] overflow-hidden"
    >
      <Container>
        {/* Section Top Tag */}
        <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-16 md:mb-24">
          <TechLabel dot>03 / THE INPUTS</TechLabel>
          <span className="type-meta text-fg-muted">FOUNDATIONAL VARIABLES</span>
        </div>

        {/* Section Header Statement */}
        <div className="max-w-3xl mb-16 md:mb-20">
          <h2 className="type-h1 text-fg font-extrabold tracking-tight mb-4">
            Three variables. One formula.
          </h2>
          <p className="type-body text-fg-secondary text-base md:text-lg">
            Before writing a single line of project code, Project Forge calibrates your unique
            trio of variables into a coherent problem space.
          </p>
        </div>

        {/* Three Large Editorial Blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {inputBlocks.map((block) => (
            <div
              key={block.number}
              className="input-editorial-block p-8 md:p-10 bg-surface border border-border flex flex-col justify-between shadow-[0_4px_24px_rgba(0,0,0,0.02)] relative group hover:border-accent transition-colors duration-300"
            >
              {/* Top Row: Huge Number + Small Technical Tag */}
              <div>
                <div className="flex items-baseline justify-between border-b border-border/80 pb-6 mb-8">
                  <span className="font-display font-extrabold text-5xl md:text-6xl text-fg-faint group-hover:text-accent transition-colors duration-300">
                    {block.number}
                  </span>
                  <span className="font-mono text-[0.6875rem] font-semibold uppercase tracking-widest text-fg-muted">
                    {block.tag}
                  </span>
                </div>

                <h3 className="font-display font-extrabold text-2xl md:text-3xl text-fg mb-4 tracking-tight">
                  {block.title}
                </h3>

                <p className="type-body text-fg-secondary text-sm md:text-base leading-relaxed mb-8">
                  {block.explanation}
                </p>
              </div>

              {/* Bottom Tags */}
              <div className="pt-6 border-t border-border/60">
                <div className="flex flex-wrap gap-2">
                  {block.examples.map((ex, i) => (
                    <span
                      key={i}
                      className="font-mono text-[0.6875rem] text-fg-secondary px-2.5 py-1 bg-surface-subtle border border-border/70"
                    >
                      {ex}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
