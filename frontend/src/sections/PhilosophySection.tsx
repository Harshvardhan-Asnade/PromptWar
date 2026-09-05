import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export const PhilosophySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const itemsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const items = itemsRef.current?.querySelectorAll('.pipeline-step')
      if (items && items.length > 0) {
        gsap.from(items, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
          opacity: 0,
          y: 40,
          stagger: 0.15,
          duration: 0.9,
          ease: 'power2.out',
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const steps = [
    {
      num: '01',
      title: 'Ideation Protocol',
      tag: 'DISCOVERY ENGINE',
      description:
        'Contextual exploration grounded in current research frontiers, student strengths, industry relevance, and academic feasibility constraints.',
      specs: ['Pydantic Schema Validation', 'Domain Relevance Scoring', 'Novelty Assessment'],
    },
    {
      num: '02',
      title: 'Architectural Blueprint',
      tag: 'SPECIFICATION ENGINE',
      description:
        'Translates chosen ideas into concrete system architecture diagrams, database schemas, component boundaries, and API interaction models.',
      specs: ['System Decomposition', 'Interface Contracts', 'Technology Stack Rationale'],
    },
    {
      num: '03',
      title: 'Execution Roadmap',
      tag: 'DELIVERY RUNTIME',
      description:
        'A phased implementation plan containing sprint objectives, risk mitigation buffers, and rubric alignment for final-year project evaluations.',
      specs: ['Milestone Sequencing', 'Test Plan Generation', 'Viva/Defense Preparation'],
    },
  ]

  return (
    <section
      ref={sectionRef}
      className="min-h-screen border-b border-[#1C202A] px-6 py-28 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-20 grid grid-cols-1 gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <span className="font-editorial-mono text-xs uppercase tracking-widest text-[#E5A93C]">
              [01 // CORE_PIPELINE]
            </span>
            <h2 className="mt-4 font-editorial-serif text-4xl leading-tight text-white md:text-5xl">
              From ambiguous vision to production blueprint.
            </h2>
          </div>
          <div className="flex items-end lg:col-span-8 lg:pl-12">
            <p className="font-sans text-base font-light leading-relaxed text-[#9CA3AF] md:text-lg">
              Generic chatbots generate shallow, unfeasible project titles. Project Forge operates
              as an automated technical lead, producing structured engineering artifacts that
              withstand academic and industry scrutiny.
            </p>
          </div>
        </div>

        <div
          ref={itemsRef}
          className="grid grid-cols-1 gap-px bg-[#1C202A] md:grid-cols-3"
        >
          {steps.map((step) => (
            <div
              key={step.num}
              className="pipeline-step flex flex-col justify-between bg-[#0B0C10] p-8 lg:p-10"
            >
              <div>
                <div className="flex items-center justify-between border-b border-[#181C26] pb-4 font-editorial-mono text-xs">
                  <span className="text-[#E5A93C] font-semibold">{step.num}</span>
                  <span className="text-[#71788E]">{step.tag}</span>
                </div>

                <h3 className="mt-6 font-editorial-serif text-2xl text-white">
                  {step.title}
                </h3>

                <p className="mt-4 font-sans text-sm font-light leading-relaxed text-[#8A90A2]">
                  {step.description}
                </p>
              </div>

              <div className="mt-10 border-t border-[#181C26] pt-6">
                <div className="font-editorial-mono text-[10px] uppercase tracking-wider text-[#6B7280]">
                  Key Deliverables
                </div>
                <ul className="mt-3 space-y-1.5 font-editorial-mono text-xs text-[#CBD5E1]">
                  {step.specs.map((spec) => (
                    <li key={spec} className="flex items-center gap-2">
                      <span className="h-1 w-1 bg-[#E5A93C]" />
                      <span>{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
