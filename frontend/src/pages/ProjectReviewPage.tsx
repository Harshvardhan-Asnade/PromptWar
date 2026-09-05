import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useDiscovery } from '../context/DiscoveryContext'
import {
  ReviewNav,
  ReviewHero,
  ReviewLoadingScreen,
  DiagnosticSweepBanner,
  ScoreBreakdownSection,
  AuditFindingsSection,
  ReviewFooterCta,
} from '../components/review'
import { prefersReducedMotion } from '../lib/motion'

export const ProjectReviewPage: React.FC = () => {
  const {
    selectedProject,
    projects,
    profile,
    evaluation,
    isEvaluating,
    evaluationStep,
    evaluationError,
    runEvaluation,
    navigateTo,
  } = useDiscovery()

  const pageRef = useRef<HTMLDivElement>(null)

  // Use selectedProject or fallback to first project if available
  const project = selectedProject || (projects.length > 0 ? projects[0] : null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.title = 'Project Forge — Project Review'

    if (pageRef.current && !prefersReducedMotion()) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
      )
    }
  }, [])

  // Auto-start evaluation if entering without existing evaluation
  useEffect(() => {
    if (project && !evaluation && !isEvaluating && !evaluationError) {
      const timer = setTimeout(() => {
        runEvaluation()
      }, 500)
      return () => clearTimeout(timer)
    }
  }, [project, evaluation, isEvaluating, evaluationError, runEvaluation])

  // Graceful empty state
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
            Please choose an AI-generated project direction first to run a personalized feasibility audit.
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
      {/* Sticky Header */}
      <ReviewNav />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Review Hero (Always displays context & challenge statement) */}
        <ReviewHero
          project={project}
          profile={profile}
          evaluation={evaluation}
          isEvaluating={isEvaluating}
          onRunAudit={() => runEvaluation(true)}
        />

        {/* Loading State: 5-Stage High-Level Progress Display */}
        {isEvaluating && (
          <ReviewLoadingScreen currentStep={evaluationStep} />
        )}

        {/* Error State */}
        {evaluationError && !isEvaluating && (
          <div className="my-12 p-8 sm:p-12 bg-white border border-[#E4E2DC] rounded-3xl max-w-2xl mx-auto text-center shadow-sm">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FFF0E9] text-[#FF5A1F] font-mono text-xs font-bold uppercase tracking-wider mb-4">
              AUDIT ERROR
            </span>
            <h3 className="text-2xl font-bold font-display text-[#111111] mb-2 uppercase">
              PROJECT REVIEW UNAVAILABLE
            </h3>
            <p className="text-sm text-[#5F5F5A] mb-6 font-sans">
              We couldn't complete the project audit right now. ({evaluationError})
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => runEvaluation(true)}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#FF5A1F] hover:bg-[#E04D16] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-colors cursor-pointer"
              >
                TRY AGAIN
              </button>
              <button
                type="button"
                onClick={() => navigateTo('blueprint')}
                className="w-full sm:w-auto px-6 py-3.5 bg-[#F7F6F2] hover:bg-[#E4E2DC] text-[#111111] font-mono text-xs uppercase tracking-wider rounded-xl transition-colors cursor-pointer border border-[#E4E2DC]"
              >
                ← BACK TO BLUEPRINT
              </button>
            </div>
          </div>
        )}

        {/* Completed Audit Results */}
        {evaluation && !isEvaluating && (
          <>
            {/* Critical Moment Diagnostic Sweep Transition */}
            <DiagnosticSweepBanner projectTitle={project.title} />

            {/* Overall Score + Metric Scores + Personal Fit */}
            <ScoreBreakdownSection
              evaluation={evaluation}
              profile={profile}
            />

            {/* Strengths, Weaknesses, Risks, Recommendations */}
            <AuditFindingsSection evaluation={evaluation} />

            {/* Bottom Improve Action & Re-run */}
            <ReviewFooterCta
              onRunAuditAgain={() => runEvaluation(true)}
              isEvaluating={isEvaluating}
            />
          </>
        )}
      </main>
    </div>
  )
}
