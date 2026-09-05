import React from 'react'
import type { ProjectIdea } from '../../types/discovery'

interface ProblemSolutionSectionProps {
  project: ProjectIdea
}

export const ProblemSolutionSection: React.FC<ProblemSolutionSectionProps> = ({ project }) => {
  return (
    <div className="space-y-16 py-12 border-b border-[#E4E2DC]">
      {/* SECTION 01 — THE PROBLEM */}
      <section id="problem" className="scroll-mt-32">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
          <span className="font-mono text-xs font-bold text-[#FF5A1F] uppercase tracking-widest">
            SECTION 01 // PROBLEM DEFINITION
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] font-display tracking-tight mb-6">
          THE PROBLEM
        </h2>

        <div className="max-w-4xl bg-white border border-[#E4E2DC] rounded-3xl p-8 sm:p-12 shadow-sm">
          <p className="text-lg sm:text-2xl text-[#111111] font-sans leading-relaxed font-normal">
            {project.problem}
          </p>

          <div className="mt-8 pt-6 border-t border-[#E4E2DC] flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#767571]">
            <span>CAPSTONE VALIDATION CRITERIA</span>
            <span>EXAMINER RUBRIC ALIGNED</span>
          </div>
        </div>
      </section>

      {/* SECTION 02 — THE SOLUTION */}
      <section id="solution" className="scroll-mt-32">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
          <span className="font-mono text-xs font-bold text-[#FF5A1F] uppercase tracking-widest">
            SECTION 02 // SYSTEM SOLUTION
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] font-display tracking-tight mb-6">
          THE SOLUTION
        </h2>

        <div className="max-w-4xl bg-white border border-[#E4E2DC] rounded-3xl p-8 sm:p-12 shadow-sm mb-8">
          <p className="text-lg sm:text-2xl text-[#111111] font-sans leading-relaxed font-normal">
            {project.solution}
          </p>
        </div>

        {/* Visual Pipeline: PROBLEM → SYSTEM → OUTCOME */}
        <div className="max-w-4xl bg-[#F7F6F2] border border-[#E4E2DC] rounded-2xl p-6 sm:p-8">
          <span className="font-mono text-xs text-[#767571] uppercase tracking-widest block mb-4">
            TRANSFORMATION PIPELINE
          </span>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            {/* Step 1 */}
            <div className="bg-white border border-[#E4E2DC] rounded-xl p-4">
              <span className="font-mono text-[10px] text-[#FF5A1F] font-bold block mb-1">01 / INPUT</span>
              <h4 className="font-display font-bold text-sm text-[#111111] mb-1">Problem Space</h4>
              <p className="text-xs text-[#5F5F5A] line-clamp-2">Real-world friction, manual bottlenecks & domain constraints.</p>
            </div>

            {/* Step 2 */}
            <div className="bg-white border border-[#FF5A1F]/30 rounded-xl p-4 relative">
              <span className="font-mono text-[10px] text-[#FF5A1F] font-bold block mb-1">02 / FORGE SYSTEM</span>
              <h4 className="font-display font-bold text-sm text-[#111111] mb-1">Engineered Architecture</h4>
              <p className="text-xs text-[#5F5F5A] line-clamp-2">Modular algorithms, microservices & reliable data pipelines.</p>
            </div>

            {/* Step 3 */}
            <div className="bg-white border border-[#E4E2DC] rounded-xl p-4">
              <span className="font-mono text-[10px] text-[#111111] font-bold block mb-1">03 / OUTCOME</span>
              <h4 className="font-display font-bold text-sm text-[#111111] mb-1">Measurable Impact</h4>
              <p className="text-xs text-[#5F5F5A] line-clamp-2">Defensible capstone with benchmark metrics & live viva demonstration.</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — CORE OBJECTIVES */}
      <section className="scroll-mt-32">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
          <span className="font-mono text-xs font-bold text-[#FF5A1F] uppercase tracking-widest">
            SECTION 03 // PROJECT OBJECTIVES
          </span>
        </div>

        <h3 className="text-2xl sm:text-4xl font-extrabold text-[#111111] font-display tracking-tight mb-6">
          PRIMARY ENGINEERING GOALS
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
          <div className="bg-white border border-[#E4E2DC] rounded-2xl p-6 shadow-sm">
            <span className="w-7 h-7 rounded-full bg-[#FFF0E9] text-[#FF5A1F] flex items-center justify-center font-mono text-xs font-bold mb-4">
              A
            </span>
            <h4 className="font-display font-bold text-base text-[#111111] mb-2">Architectural Rigor</h4>
            <p className="text-xs text-[#5F5F5A] leading-relaxed">
              Design and deliver a clean, decoupled system using proven industry design patterns and schema contracts.
            </p>
          </div>

          <div className="bg-white border border-[#E4E2DC] rounded-2xl p-6 shadow-sm">
            <span className="w-7 h-7 rounded-full bg-[#FFF0E9] text-[#FF5A1F] flex items-center justify-center font-mono text-xs font-bold mb-4">
              B
            </span>
            <h4 className="font-display font-bold text-base text-[#111111] mb-2">Observable Validation</h4>
            <p className="text-xs text-[#5F5F5A] leading-relaxed">
              Instrument quantitative benchmarks, performance metrics, and verifiable edge cases to satisfy grading criteria.
            </p>
          </div>

          <div className="bg-white border border-[#E4E2DC] rounded-2xl p-6 shadow-sm">
            <span className="w-7 h-7 rounded-full bg-[#FFF0E9] text-[#FF5A1F] flex items-center justify-center font-mono text-xs font-bold mb-4">
              C
            </span>
            <h4 className="font-display font-bold text-base text-[#111111] mb-2">Practical Scope</h4>
            <p className="text-xs text-[#5F5F5A] leading-relaxed">
              Maintain milestone boundaries so your team completes a polished, demo-ready prototype within your timeline.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
