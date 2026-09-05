import React from 'react'
import { Container } from '../components/layout/Container'
import { SpotlightCard } from '../components/reactbits'

/**
 * LANDING SECTION 3 — HOW IT WORKS (03 / 05)
 * Cinematic 4-step sequence showing the transformation from student constraints to defensible project.
 */
export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      num: '01',
      title: 'TELL US ABOUT YOU',
      desc: 'Select your verified programming languages, frameworks, interests, team headcount, and semester timeline.',
      meta: 'INPUTS / CONSTRAINTS',
    },
    {
      num: '02',
      title: 'DISCOVER PROJECTS',
      desc: 'Our Groq AI engine synthesizes 3 distinct, technically rigorous final-year project blueprints tailored to your capabilities.',
      meta: 'GENERATION / SELECTION',
    },
    {
      num: '03',
      title: 'CHALLENGE THE IDEA',
      desc: 'Run a critical feasibility audit to evaluate single points of failure, timeline bottlenecks, and viva defense risks.',
      meta: 'FEASIBILITY AUDIT',
    },
    {
      num: '04',
      title: 'BUILD THE BLUEPRINT',
      desc: 'Harden your architecture with actionable scope adjustments, verified tech stack specs, and a milestone roadmap.',
      meta: 'HARDENED BLUEPRINT',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-[#F7F6F2] border-b border-border relative overflow-hidden">
      <Container>
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
                03 / SYSTEM FLOW
              </span>
              <span className="text-border">|</span>
              <span className="font-mono text-xs text-fg-muted uppercase">END-TO-END METHODOLOGY</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#111111] leading-[1.1] uppercase">
              HOW PROJECT FORGE <br />
              <span className="text-accent">TRANSFORMS YOUR BUILD.</span>
            </h2>
          </div>

          <p className="text-sm text-[#5F5F5A] max-w-sm font-sans">
            Four disciplined milestones bridging the gap between student uncertainty and capstone defense readiness.
          </p>
        </div>

        {/* 4 Steps Grid with Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <SpotlightCard
              key={step.num}
              className="p-8 flex flex-col justify-between"
              spotlightColor="rgba(255, 90, 31, 0.12)"
              borderColor="rgba(255, 90, 31, 0.4)"
            >
              <div>
                <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#F0EFEB]">
                  <span className="text-3xl font-black font-mono text-accent">{step.num}</span>
                  <span className="text-[10px] font-mono text-[#9E9E98] uppercase tracking-wider">
                    PHASE {step.num}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-[#111111] tracking-tight uppercase mb-3">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5F5F5A] font-sans leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-[#F0EFEB] flex items-center justify-between">
                <span className="font-mono text-[10px] text-accent font-bold uppercase tracking-wider">
                  {step.meta}
                </span>
                <span className="text-accent text-xs">→</span>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </Container>
    </section>
  )
}
