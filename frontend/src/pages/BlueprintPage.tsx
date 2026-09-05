import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useDiscovery } from '../context/DiscoveryContext'
import {
  BlueprintNav,
  BlueprintHero,
  ProblemSolutionSection,
  CapabilitiesSection,
  TechStackSection,
  SystemArchitectureDiagram,
  DevelopmentRoadmap,
  ResourcesAndRisksSection,
  BuildOrderSection,
  BlueprintFooterCta,
} from '../components/blueprint'
import { prefersReducedMotion } from '../lib/motion'

export const BlueprintPage: React.FC = () => {
  const { selectedProject, projects, navigateTo } = useDiscovery()
  const pageRef = useRef<HTMLDivElement>(null)

  const project = selectedProject || (projects.length > 0 ? projects[0] : null)
  const currentIndex = project && projects.length > 0 ? projects.findIndex((p) => p.id === project.id) : 0

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    if (project?.title) {
      document.title = `Project Forge — ${project.title}`
    }

    if (pageRef.current && !prefersReducedMotion()) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      )
    }
  }, [project?.id, project?.title])

  if (!project) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] text-[#111111] flex items-center justify-center p-6 font-sans">
        <div className="bg-white border border-[#E4E2DC] rounded-3xl p-10 sm:p-14 text-center max-w-lg shadow-sm">
          <div className="w-12 h-12 bg-[#FFF0E9] rounded-2xl flex items-center justify-center text-[#FF5A1F] mx-auto mb-4 font-mono font-bold text-sm">
            PF
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-[#FFF0E9] text-[#FF5A1F] text-xs font-mono uppercase tracking-wider mb-4">
            SPECIFICATION PENDING
          </span>
          <h2 className="text-2xl font-extrabold font-display text-[#111111] mb-3">
            BLUEPRINT NOT FOUND
          </h2>
          <p className="text-sm text-[#5F5F5A] mb-8 font-sans">
            Please select an AI-generated project direction from your results to load the engineering blueprint.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('results')}
            className="px-8 py-3.5 bg-[#FF5A1F] hover:bg-[#E04D16] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm"
          >
            ← RETURN TO PROJECT DIRECTIONS
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#F7F6F2] text-[#111111] selection:bg-[#FF5A1F]/15 selection:text-[#111111] font-sans pb-24"
    >
      {/* Sticky Blueprint Header & Floating Section Navigator */}
      <BlueprintNav />

      {/* Main Blueprint Editorial Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Blueprint Hero Section */}
        <BlueprintHero project={project} index={currentIndex} />

        {/* Section 01: Problem, Section 02: Solution, Section 03: Objectives */}
        <ProblemSolutionSection project={project} />

        {/* Section 04: Functional Capabilities (Core vs Advanced) */}
        <CapabilitiesSection project={project} />

        {/* Section 05: Engineering Tech Stack */}
        <TechStackSection project={project} />

        {/* Section 06: Architecture Diagram & Section 07: Data Flow */}
        <SystemArchitectureDiagram project={project} />

        {/* Section 08: Pinned ScrollTrigger Development Roadmap */}
        <DevelopmentRoadmap project={project} />

        {/* Section 09: Datasets & Section 10: Engineering Risks */}
        <ResourcesAndRisksSection project={project} />

        {/* Section 11: Build Order Execution Sequence */}
        <BuildOrderSection project={project} />

        {/* Final Statement & Actions */}
        <BlueprintFooterCta />
      </main>
    </div>
  )
}
