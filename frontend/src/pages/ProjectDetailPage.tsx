import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useDiscovery } from '../context/DiscoveryContext'
import { ProjectWorkspaceNav } from '../components/layout/ProjectWorkspaceNav'
import { prefersReducedMotion } from '../lib/motion'

export const ProjectDetailPage: React.FC = () => {
  const { selectedProject, projects, navigateTo, setStep } = useDiscovery()
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
            className="px-6 py-3 bg-[#FF5A1F] text-white font-mono text-xs uppercase tracking-wider rounded-xl hover:bg-[#E04D16] transition-colors cursor-pointer"
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
      {/* Sticky Top Header */}
      <header className="sticky top-0 z-40 bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#E4E2DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('landing')}
              className="group flex items-center gap-2 text-left cursor-pointer"
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
              className="px-3 sm:px-4 py-2 rounded-xl border border-[#E4E2DC] hover:border-[#111111] bg-white text-[#111111] font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
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
              className="px-3 sm:px-4 py-2 rounded-xl border border-[#E4E2DC] hover:border-[#111111] bg-transparent text-[#5F5F5A] hover:text-[#111111] font-mono text-xs uppercase tracking-wider transition-colors hidden md:inline-flex cursor-pointer"
            >
              ADJUST PROFILE
            </button>
          </div>
        </div>
      </header>

      {/* Persistent Project Workspace Navigation Strip (Improvement 13) */}
      <ProjectWorkspaceNav activeStage="overview" />

      {/* Main Container with De-Cardified Editorial Rhythm (Improvement 07) */}
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

        {/* 1. PROJECT TITLE */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#111111] font-display leading-[1.06] mb-4">
          {project.title}
        </h1>

        {/* 2. TAGLINE */}
        <p className="text-base sm:text-xl font-mono text-[#5F5F5A] max-w-4xl leading-relaxed mb-10 pb-8 border-b border-[#E4E2DC]">
          {project.tagline}
        </p>

        {/* 3. WHY THIS FITS YOU (Editorial Banner) */}
        {project.why_it_fits && (
          <div className="mb-14 p-6 sm:p-8 bg-[#FFF0E9]/35 border-l-4 border-[#FF5A1F] rounded-r-3xl">
            <span className="font-mono text-xs font-bold text-[#FF5A1F] uppercase tracking-widest block mb-2">
              AI INSIGHT // WHY THIS FITS YOUR PROFILE
            </span>
            <p className="text-base sm:text-lg text-[#111111] font-sans leading-relaxed">
              "{project.why_it_fits}"
            </p>
            <p className="text-[11px] font-mono text-[#767571] mt-3 uppercase tracking-wider">
              Calibrated from your tech stack, team size, duration constraints, and experience level.
            </p>
          </div>
        )}

        {/* Two-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-20">
          {/* Left Column: Pure Typography & Whitespace Structure (Problem, Solution, Capabilities) */}
          <div className="lg:col-span-7 space-y-12">
            {/* 4. PROBLEM (Editorial Typography - No Card Box) */}
            <section className="border-l-2 border-[#111111] pl-6 sm:pl-8 py-1">
              <span className="font-mono text-xs text-[#767571] uppercase tracking-widest block mb-3 font-semibold">
                01 // THE PROBLEM STATEMENT
              </span>
              <p className="text-base sm:text-lg text-[#111111] leading-relaxed font-sans font-normal">
                {project.problem}
              </p>
            </section>

            {/* 5. SOLUTION (Editorial Typography - No Card Box) */}
            <section className="border-l-2 border-[#FF5A1F] pl-6 sm:pl-8 py-1">
              <span className="font-mono text-xs text-[#FF5A1F] uppercase tracking-widest block mb-3 font-semibold">
                02 // PROPOSED SYSTEM SOLUTION
              </span>
              <p className="text-base sm:text-lg text-[#222222] leading-relaxed font-sans">
                {project.solution}
              </p>
            </section>

            {/* 6. CAPABILITIES (Clean List - No Card Box) */}
            {project.features && project.features.length > 0 && (
              <section className="pt-2">
                <span className="font-mono text-xs text-[#767571] uppercase tracking-widest block mb-6">
                  03 // CORE SYSTEM CAPABILITIES
                </span>
                <div className="space-y-4">
                  {project.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="flex items-start gap-4 py-3 border-b border-[#E4E2DC]/80"
                    >
                      <span className="w-6 h-6 rounded-full bg-[#111111] text-white flex items-center justify-center font-mono text-[11px] font-bold shrink-0 mt-0.5">
                        0{fIdx + 1}
                      </span>
                      <p className="text-sm sm:text-base text-[#111111] leading-relaxed font-sans">
                        {feat}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Right Column: Distinct Objects Kept as Structured Cards (Scores, Stack, CTA) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-36">
            {/* 7. SIGNAL EVALUATION (Distinct Scores Group) */}
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
                Evaluated against student skills, team size, and timeframe.
              </p>
            </div>

            {/* 8. ENGINEERING STACK (Distinct Technology Cluster) */}
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

            {/* 9. BLUEPRINT CTA (Distinct Primary Action) */}
            <div className="bg-[#111111] text-white rounded-3xl p-6 sm:p-8 shadow-lg">
              <span className="inline-block px-2.5 py-1 rounded-full bg-[#FF5A1F] text-white font-mono text-[10px] font-bold uppercase tracking-wider mb-4">
                ENGINEERING SPEC READY
              </span>
              <h3 className="text-xl font-bold font-display mb-2">READY TO BUILD?</h3>
              <p className="text-xs text-[#E4E2DC]/80 font-sans mb-6 leading-relaxed">
                Unlock full system architecture, build order, interactive topology, and diagnostic review.
              </p>
              <button
                type="button"
                onClick={() => {
                  navigateTo('blueprint')
                }}
                className="w-full py-4 px-6 rounded-2xl bg-[#FF5A1F] hover:bg-[#E04D16] text-white font-mono text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer"
              >
                <span>OPEN ENGINEERING BLUEPRINT</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
