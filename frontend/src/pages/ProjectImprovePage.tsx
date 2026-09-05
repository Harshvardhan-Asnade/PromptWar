import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useDiscovery } from '../context/DiscoveryContext'
import {
  ImproveNav,
  ImproveHero,
  ImprovementLoadingScreen,
  ImprovementComparison,
  ImprovementChangesSection,
  ImprovementScoreSection,
  ImprovementBlueprintCta,
} from '../components/improve'
import { prefersReducedMotion } from '../lib/motion'

export const ProjectImprovePage: React.FC = () => {
  const {
    selectedProject,
    projects,
    profile,
    evaluation,
    improvedProject,
    improvementData,
    isImproving,
    improvementStep,
    improvementError,
    runImprovement,
    navigateTo,
  } = useDiscovery()

  const pageRef = useRef<HTMLDivElement>(null)

  // Use selectedProject or fallback to first project if available
  const project = selectedProject || (projects.length > 0 ? projects[0] : null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.title = 'Project Forge — Project Improvement'

    if (pageRef.current && !prefersReducedMotion()) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      )
    }
  }, [])

  // Auto-start improvement if entering without existing improved project
  useEffect(() => {
    if (project && !improvedProject && !isImproving && !improvementError) {
      const timer = setTimeout(() => {
        runImprovement()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [project, improvedProject, isImproving, improvementError, runImprovement])

  // Graceful empty state when no project was selected
  if (!project) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] text-[#111111] flex items-center justify-center p-6 font-sans">
        <div className="bg-white border border-[#E4E2DC] rounded-3xl p-10 sm:p-14 text-center max-w-lg shadow-sm">
          <div className="w-12 h-12 bg-[#FFF0E9] rounded-2xl flex items-center justify-center text-[#FF5A1F] mx-auto mb-4 font-mono font-bold text-sm">
            PF
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-[#FFF0E9] text-[#FF5A1F] text-xs font-mono uppercase tracking-wider mb-4">
            SPECIFICATION REQUIRED
          </span>
          <h2 className="text-2xl font-extrabold font-display text-[#111111] mb-3">
            NO PROJECT SELECTED
          </h2>
          <p className="text-sm text-[#5F5F5A] mb-8 font-sans">
            Please choose an AI-generated project direction first to run the improvement engine.
          </p>
          <button
            type="button"
            onClick={() => navigateTo('results')}
            className="px-8 py-3.5 bg-[#FF5A1F] hover:bg-[#E04D16] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm cursor-pointer"
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
      {/* Sticky Top Header */}
      <ImproveNav />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Improvement Hero */}
        <ImproveHero
          project={project}
          profile={profile}
          evaluation={evaluation}
          isImproving={isImproving}
          hasImproved={Boolean(improvedProject && improvementData)}
          onRunImprovement={() => runImprovement(true)}
        />

        {/* Loading State */}
        {isImproving && (
          <div className="pt-8">
            <ImprovementLoadingScreen currentStep={improvementStep} />
          </div>
        )}

        {/* Editorial Error State */}
        {improvementError && !isImproving && (
          <div className="my-16 p-10 bg-white border border-[#E4E2DC] rounded-3xl text-center max-w-xl mx-auto shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF0E9] text-[#FF5A1F] font-mono font-bold text-lg flex items-center justify-center mx-auto mb-4">
              !
            </div>
            <span className="inline-block px-3 py-1 rounded-full bg-[#FFF0E9] text-[#FF5A1F] text-xs font-mono uppercase tracking-wider mb-3">
              AUDIT SAFEGUARD ACTIVE
            </span>
            <h3 className="text-2xl font-extrabold font-display text-[#111111] mb-2 uppercase">
              IMPROVEMENT INTERRUPTED
            </h3>
            <p className="text-sm text-[#5F5F5A] mb-8 font-sans leading-relaxed">
              We couldn't strengthen the project right now. Your original project and review remain safe.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => runImprovement(true)}
                className="w-full sm:w-auto px-6 py-3 bg-[#FF5A1F] hover:bg-[#E04D16] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                TRY AGAIN
              </button>
              <button
                type="button"
                onClick={() => navigateTo('review')}
                className="w-full sm:w-auto px-6 py-3 bg-[#F7F6F2] hover:bg-[#E4E2DC] text-[#111111] font-mono text-xs uppercase tracking-wider rounded-xl transition-colors border border-[#E4E2DC] cursor-pointer"
              >
                ← RETURN TO REVIEW
              </button>
            </div>
          </div>
        )}

        {/* Success / Completed Results View */}
        {improvedProject && improvementData && !isImproving && (
          <div className="space-y-4">
            {/* Before / After Comparison */}
            <ImprovementComparison
              originalProject={project}
              improvedProject={improvedProject}
              evaluation={evaluation}
              improvementData={improvementData}
            />

            {/* Categorized Changes Breakdown */}
            <ImprovementChangesSection improvementData={improvementData} />

            {/* Score & Potential Evolution */}
            <ImprovementScoreSection
              originalProject={project}
              improvedProject={improvedProject}
              evaluation={evaluation}
            />

            {/* Final CTA Handoff */}
            <ImprovementBlueprintCta
              onRunImprovementAgain={() => runImprovement(true)}
              isImproving={isImproving}
            />
          </div>
        )}
      </main>
    </div>
  )
}
