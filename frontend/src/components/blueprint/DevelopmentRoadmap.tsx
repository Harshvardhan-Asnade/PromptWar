import React, { useRef, useState, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import type { ProjectIdea } from '../../types/discovery'
import { prefersReducedMotion } from '../../lib/motion'

interface DevelopmentRoadmapProps {
  project: ProjectIdea
}

export const DevelopmentRoadmap: React.FC<DevelopmentRoadmapProps> = ({ project }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const pinRef = useRef<HTMLDivElement>(null)
  const [activeMilestone, setActiveMilestone] = useState<number>(0)

  const milestones = project.roadmap && project.roadmap.length > 0
    ? project.roadmap
    : [
        'Weeks 1-2: Requirements, data schema definition, and literature review',
        'Weeks 3-4: Baseline core logic, data synthesis, and early test pipeline',
        'Weeks 5-6: Microservice integration, API contract hardening, and UI client',
        'Weeks 7-8: Stress testing, rubric benchmark evaluations, and viva defense demo',
      ]

  useEffect(() => {
    if (prefersReducedMotion() || typeof window === 'undefined' || window.innerWidth < 1024) {
      return
    }

    gsap.registerPlugin(ScrollTrigger)

    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 20%',
      end: () => `+=${milestones.length * 280}`,
      pin: pinRef.current,
      scrub: 0.5,
      onUpdate: (self) => {
        const step = Math.min(
          milestones.length - 1,
          Math.floor(self.progress * milestones.length)
        )
        setActiveMilestone(step)
      },
    })

    return () => {
      st.kill()
    }
  }, [milestones.length])

  return (
    <section id="roadmap" ref={containerRef} className="py-14 border-b border-[#E4E2DC] scroll-mt-32">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
        <span className="font-mono text-xs font-bold text-[#FF5A1F] uppercase tracking-widest">
          SECTION 08 // TIMELINE & ROADMAP
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] font-display tracking-tight">
            DEVELOPMENT ROADMAP
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5F5F5A] max-w-xl font-sans">
            Calibrated for realistic academic milestones, observable sprint boundaries, and viva grading checkpoints.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs text-[#767571]">
          <span>TOTAL MILESTONES:</span>
          <span className="font-bold text-[#111111]">0{milestones.length} SPRINTS</span>
        </div>
      </div>

      {/* Pinned Desktop Interactive Presentation / Mobile Accessible List */}
      <div ref={pinRef} className="bg-white border border-[#E4E2DC] rounded-3xl p-6 sm:p-10 shadow-sm">
        {/* Progress Bar Header */}
        <div className="flex items-center justify-between border-b border-[#E4E2DC] pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F]" />
            <span className="font-mono text-xs font-bold text-[#111111] uppercase">
              SPRINT PROGRESSION
            </span>
          </div>

          <div className="font-mono text-xs">
            <span className="text-[#FF5A1F] font-bold">0{activeMilestone + 1}</span>
            <span className="text-[#767571]"> / 0{milestones.length}</span>
          </div>
        </div>

        {/* Milestone Cards Track */}
        <div className="space-y-4">
          {milestones.map((milestoneText, idx) => {
            const isCurrent = idx === activeMilestone
            const isCompleted = idx < activeMilestone

            return (
              <div
                key={idx}
                onClick={() => setActiveMilestone(idx)}
                className={`p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isCurrent
                    ? 'bg-[#FFF0E9]/60 border-[#FF5A1F] shadow-sm scale-[1.01]'
                    : isCompleted
                    ? 'bg-[#F7F6F2] border-[#E4E2DC] opacity-75'
                    : 'bg-white border-[#E4E2DC] opacity-40'
                }`}
              >
                <div className="flex items-start gap-4">
                  {/* Step Bubble */}
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                      isCurrent
                        ? 'bg-[#FF5A1F] text-white shadow-md'
                        : isCompleted
                        ? 'bg-[#111111] text-white'
                        : 'bg-[#E4E2DC] text-[#767571]'
                    }`}
                  >
                    {isCompleted ? '✓' : `0${idx + 1}`}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-mono text-[10px] uppercase font-bold text-[#767571] tracking-wider">
                        PHASE 0{idx + 1}
                      </span>
                      {isCurrent && (
                        <span className="font-mono text-[10px] text-[#FF5A1F] font-bold uppercase tracking-widest animate-pulse">
                          ACTIVE SPRINT
                        </span>
                      )}
                    </div>

                    <p
                      className={`text-base sm:text-lg font-display font-bold leading-snug ${
                        isCurrent ? 'text-[#111111]' : 'text-[#5F5F5A]'
                      }`}
                    >
                      {milestoneText}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
