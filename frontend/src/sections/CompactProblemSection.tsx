import React from 'react'
import { Container } from '../components/layout/Container'
import { BlurText } from '../components/reactbits'

/**
 * LANDING SECTION 2 — COMPACT PROBLEM (02 / 05)
 * Presents the core dilemma with 3 compact concepts and React Bits BlurText.
 */
export const CompactProblemSection: React.FC = () => {
  const concepts = [
    {
      num: '01',
      title: 'SKILLS',
      desc: 'What you already know.',
      detail: 'Languages, frameworks, databases, and algorithms you have tested in practice.',
    },
    {
      num: '02',
      title: 'INTERESTS',
      desc: 'What you actually care about.',
      detail: 'Robotics, healthcare, fintech, generative AI, cybersecurity, or systems design.',
    },
    {
      num: '03',
      title: 'CONSTRAINTS',
      desc: 'What you can realistically build.',
      detail: 'Semester timeline, team member capacity, hardware access, and defense criteria.',
    },
  ]

  return (
    <section id="problem" className="py-20 sm:py-24 bg-[#F7F6F2] border-b border-border relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex items-center gap-3 mb-4">
            <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
              02 / THE BOTTLENECK
            </span>
            <span className="text-border">|</span>
            <span className="font-mono text-xs text-fg-muted uppercase">REALITY CHECK</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#111111] leading-[1.1] uppercase">
            <BlurText text="YOU KNOW HOW TO CODE." animateBy="words" />
            <br />
            <span className="text-[#5F5F5A]">
              <BlurText text="YOU JUST DON'T KNOW WHAT TO BUILD NEXT." delay={0.25} animateBy="words" />
            </span>
          </h2>
        </div>

        {/* 3 Compact Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {concepts.map((c) => (
            <div
              key={c.num}
              className="bg-white border border-[#E4E2DC] rounded-3xl p-8 shadow-2xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="font-mono text-xs text-accent font-bold mb-4 flex items-center justify-between">
                  <span>{c.num}</span>
                  <span className="w-2 h-2 rounded-full bg-accent/40" />
                </div>
                <h3 className="text-2xl font-black font-display text-[#111111] tracking-tight uppercase mb-2">
                  {c.title}
                </h3>
                <p className="text-base font-semibold text-[#111111] font-sans mb-3">
                  {c.desc}
                </p>
                <p className="text-xs text-[#5F5F5A] font-sans leading-relaxed">
                  {c.detail}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-[#F0EFEB] font-mono text-[10px] text-[#9E9E98] uppercase">
                INPUT PARAMETER
              </div>
            </div>
          ))}
        </div>

        {/* Closing Statement */}
        <div className="bg-[#111111] text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-accent/20 rounded-full blur-3xl pointer-events-none" />
          <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest block mb-2">
            THE SYNTHESIS
          </span>
          <h3 className="text-2xl sm:text-4xl font-black font-display tracking-tight uppercase">
            PROJECT FORGE CONNECTS ALL THREE.
          </h3>
          <p className="text-xs sm:text-sm text-[#E4E2DC]/80 font-sans max-w-xl mx-auto mt-3">
            Not random prompts or generic SaaS boilerplate. A mathematically constrained engineering problem tailored precisely to your team.
          </p>
        </div>
      </Container>
    </section>
  )
}
