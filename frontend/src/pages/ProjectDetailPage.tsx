import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useDiscovery } from '../context/DiscoveryContext'
import { prefersReducedMotion } from '../lib/motion'

export const ProjectDetailPage: React.FC = () => {
  const { selectedProject, projects, selectProject, navigateTo, setStep } = useDiscovery()
  const pageRef = useRef<HTMLDivElement>(null)

  // If no selected project, fallback to first available project
  const project = selectedProject || (projects.length > 0 ? projects[0] : null)

  // Current project index (0, 1, or 2)
  const currentIndex = project && projects.length > 0 ? projects.findIndex((p) => p.id === project.id) : 0

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (pageRef.current && !prefersReducedMotion()) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [project?.id])

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] text-[#111111] flex items-center justify-center p-6 font-sans">
        <div className="bg-white border border-[#E4E2DC] rounded-3xl p-10 text-center max-w-md shadow-sm">
          <div className="w-12 h-12 bg-[#FFF0E9] rounded-2xl flex items-center justify-center text-[#FF5A1F] mx-auto mb-4 font-mono font-bold">
            PF
          </div>
          <h2 className="text-xl font-bold font-display text-[#111111] mb-2">NO PROJECT SELECTED</h2>
          <p className="text-sm text-[#5F5F5A] mb-6">
            Please return to your project directions to inspect or select a blueprint.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('results')}
            className="px-6 py-3 bg-[#FF5A1F] text-white font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-[#E04D16] transition-colors"
          >
            ← BACK TO DIRECTIONS
          </button>
        </div>
      </div>
    )
  }

  const overallStrength = Math.round(
    (project.innovation_score +
      project.feasibility_score +
      project.impact_score +
      project.technical_depth_score) /
      4
  )

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#F7F6F2] text-[#111111] selection:bg-[#FF5A1F]/15 selection:text-[#111111] font-sans pb-28"
    >
      {/* Sticky Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#E4E2DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('landing')}
              className="group flex items-center gap-2 text-left"
            >
              <div className="w-7 h-7 bg-[#FF5A1F] rounded flex items-center justify-center text-white font-mono font-bold text-xs">
                PF
              </div>
              <span className="font-display font-black text-sm tracking-tight text-[#111111] group-hover:text-[#FF5A1F] transition-colors">
                PROJECT FORGE
              </span>
            </button>
            <span className="text-[#E4E2DC]">/</span>
            <span className="font-mono text-xs text-[#767571] uppercase tracking-widest hidden sm:inline">
              PROJECT DIRECTION 0{currentIndex + 1}
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigateTo('results')}
              className="px-3 sm:px-4 py-2 rounded-xl border border-[#E4E2DC] hover:border-[#111111] bg-white text-[#111111] font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>←</span>
              <span className="hidden sm:inline">BACK TO</span>
              <span>DIRECTIONS</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setStep(1)
                navigateTo('discovery')
              }}
              className="px-3 sm:px-4 py-2 rounded-xl border border-[#E4E2DC] hover:border-[#111111] bg-transparent text-[#5F5F5A] hover:text-[#111111] font-mono text-xs uppercase tracking-wider transition-colors hidden md:inline-flex"
            >
              ADJUST PROFILE
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        {/* Top Direction Badge & Category */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-[#FFF0E9] border border-[#FF5A1F]/30 text-[#FF5A1F] font-mono text-xs font-bold uppercase tracking-wider">
              DIRECTION 0{currentIndex + 1} OF 03
            </span>
            <span className="px-3 py-1 rounded-full bg-white border border-[#E4E2DC] text-[#111111] font-mono text-xs uppercase tracking-wider">
              {project.difficulty}
            </span>
          </div>

          {/* Project Strength Score */}
          <div className="inline-flex items-center gap-2 bg-white border border-[#E4E2DC] px-4 py-1.5 rounded-full font-mono text-xs shadow-sm">
            <span className="text-[#767571] uppercase">PROJECT STRENGTH:</span>
            <span className="font-bold text-[#FF5A1F]">{overallStrength}/100</span>
          </div>
        </div>

        {/* Hero Title & Tagline */}
        <div className="mb-10 border-b border-[#E4E2DC] pb-8">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] font-display leading-[1.1]">
            {project.title}
          </h1>
          <p className="mt-4 text-base sm:text-xl font-mono text-[#5F5F5A] max-w-3xl leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* AI Insight: Why this fits your profile */}
        {project.why_it_fits && (
          <div className="mb-12 bg-white border border-[#FF5A1F]/30 rounded-3xl p-6 sm:p-8 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#FF5A1F]" />
            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono text-xs font-bold text-[#FF5A1F] uppercase tracking-widest">
                AI INSIGHT // WHY THIS FITS YOU
              </span>
            </div>
            <p className="text-base sm:text-lg text-[#111111] font-sans leading-relaxed">
              "{project.why_it_fits}"
            </p>
            <p className="text-[11px] font-mono text-[#767571] mt-3 uppercase tracking-wider">
              Calibrated from your tech stack, team size, duration constraints, and experience level.
            </p>
          </div>
        )}

        {/* Two-Column Editorial Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start mb-16">
          {/* Left Column: Problem, Solution, Features (8 cols) */}
          <div className="lg:col-span-7 space-y-10">
            {/* Problem definition */}
            <section className="bg-white border border-[#E4E2DC] rounded-3xl p-6 sm:p-8 shadow-sm">
              <span className="font-mono text-xs text-[#767571] uppercase tracking-widest block mb-3">
                01 // THE PROBLEM STATEMENT
              </span>
              <p className="text-sm sm:text-base text-[#111111] leading-relaxed font-sans">
                {project.problem}
              </p>
            </section>

            {/* Proposed Solution */}
            <section className="bg-white border border-[#E4E2DC] rounded-3xl p-6 sm:p-8 shadow-sm">
              <span className="font-mono text-xs text-[#767571] uppercase tracking-widest block mb-3">
                02 // PROPOSED SYSTEM SOLUTION
              </span>
              <p className="text-sm sm:text-base text-[#111111] leading-relaxed font-sans">
                {project.solution}
              </p>
            </section>

            {/* Top Features */}
            {project.features && project.features.length > 0 && (
              <section className="bg-white border border-[#E4E2DC] rounded-3xl p-6 sm:p-8 shadow-sm">
                <span className="font-mono text-xs text-[#767571] uppercase tracking-widest block mb-4">
                  03 // CORE CAPABILITIES & FEATURES
                </span>
                <ul className="space-y-3">
                  {project.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <span className="w-5 h-5 rounded-full bg-[#FFF0E9] text-[#FF5A1F] flex items-center justify-center font-mono text-[10px] font-bold shrink-0 mt-0.5">
                        {fIdx + 1}
                      </span>
                      <span className="text-sm text-[#111111] leading-relaxed">{feat}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </div>

          {/* Right Column: Score Breakdown & Tech Architecture (5 cols) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            {/* Score Breakdown Radar / Gauges */}
            <div className="bg-white border border-[#E4E2DC] rounded-3xl p-6 sm:p-8 shadow-sm">
              <span className="font-mono text-xs text-[#767571] uppercase tracking-widest block mb-6">
                SIGNAL EVALUATION METRICS
              </span>

              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#5F5F5A]">INNOVATION SCORE</span>
                    <span className="font-bold text-[#111111]">{project.innovation_score}/100</span>
                  </div>
                  <div className="w-full bg-[#F7F6F2] h-2 rounded-full overflow-hidden border border-[#E4E2DC]">
                    <div
                      className="bg-[#111111] h-full rounded-full"
                      style={{ width: `${project.innovation_score}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#5F5F5A]">FEASIBILITY SCORE</span>
                    <span className="font-bold text-[#111111]">{project.feasibility_score}/100</span>
                  </div>
                  <div className="w-full bg-[#F7F6F2] h-2 rounded-full overflow-hidden border border-[#E4E2DC]">
                    <div
                      className="bg-[#111111] h-full rounded-full"
                      style={{ width: `${project.feasibility_score}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#5F5F5A]">IMPACT SCORE</span>
                    <span className="font-bold text-[#111111]">{project.impact_score}/100</span>
                  </div>
                  <div className="w-full bg-[#F7F6F2] h-2 rounded-full overflow-hidden border border-[#E4E2DC]">
                    <div
                      className="bg-[#111111] h-full rounded-full"
                      style={{ width: `${project.impact_score}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1.5">
                    <span className="text-[#5F5F5A]">TECHNICAL DEPTH</span>
                    <span className="font-bold text-[#111111]">{project.technical_depth_score}/100</span>
                  </div>
                  <div className="w-full bg-[#F7F6F2] h-2 rounded-full overflow-hidden border border-[#E4E2DC]">
                    <div
                      className="bg-[#111111] h-full rounded-full"
                      style={{ width: `${project.technical_depth_score}%` }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-[11px] font-mono text-[#767571] mt-6 leading-relaxed">
                Based on innovation, feasibility, impact and technical depth.
              </p>
            </div>

            {/* Selected Tech Stack */}
            <div className="bg-white border border-[#E4E2DC] rounded-3xl p-6 sm:p-8 shadow-sm">
              <span className="font-mono text-xs text-[#767571] uppercase tracking-widest block mb-4">
                ENGINEERING STACK
              </span>
              <div className="flex flex-wrap gap-2">
                {project.tech_stack?.map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-[#F7F6F2] border border-[#E4E2DC] text-xs font-mono text-[#111111]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Primary Action Card: EXPLORE BLUEPRINT → */}
            <div className="bg-[#111111] text-white rounded-3xl p-6 sm:p-8 shadow-lg">
              <span className="inline-block px-2.5 py-1 rounded-full bg-[#FF5A1F] text-white font-mono text-[10px] font-bold uppercase tracking-wider mb-4">
                PHASE 6 READY
              </span>
              <h3 className="text-xl font-bold font-display mb-2">READY TO FORGE?</h3>
              <p className="text-xs text-[#E4E2DC]/80 font-sans mb-6 leading-relaxed">
                Unlock the system architecture, 8-week milestone roadmap, rubric grading benchmarks, and dataset specs.
              </p>
              <button
                type="button"
                onClick={() => {
                  navigateTo('blueprint')
                }}
                className="w-full py-4 px-6 rounded-2xl bg-[#FF5A1F] hover:bg-[#E04D16] text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer"
              >
                <span>EXPLORE BLUEPRINT</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Switcher: Inspect other directions */}
        {projects.length > 1 && (
          <div className="border-t border-[#E4E2DC] pt-10">
            <span className="font-mono text-xs text-[#767571] uppercase tracking-widest block mb-4 text-center">
              OR INSPECT ALTERNATIVE DIRECTIONS
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {projects.map((p, idx) => {
                const isSelected = p.id === project.id
                return (
                  <button
                    key={p.id || idx}
                    type="button"
                    onClick={() => selectProject(p)}
                    className={`p-4 rounded-2xl border text-left transition-all ${
                      isSelected
                        ? 'bg-[#111111] text-white border-[#111111]'
                        : 'bg-white text-[#111111] border-[#E4E2DC] hover:border-[#111111]'
                    }`}
                  >
                    <span
                      className={`font-mono text-[10px] uppercase font-bold block mb-1 ${
                        isSelected ? 'text-[#FF5A1F]' : 'text-[#767571]'
                      }`}
                    >
                      DIRECTION 0{idx + 1}
                    </span>
                    <h4 className="text-sm font-bold font-display truncate">{p.title}</h4>
                    <p
                      className={`text-xs font-mono mt-1 truncate ${
                        isSelected ? 'text-[#E4E2DC]/70' : 'text-[#5F5F5A]'
                      }`}
                    >
                      {p.tagline}
                    </p>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
