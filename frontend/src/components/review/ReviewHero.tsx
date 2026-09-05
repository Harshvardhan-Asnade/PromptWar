import React from 'react'
import type { ProjectIdea, StudentProfile, ProjectEvaluation } from '../../types/discovery'

interface ReviewHeroProps {
  project: ProjectIdea
  profile: StudentProfile
  evaluation: ProjectEvaluation | null
  isEvaluating: boolean
  onRunAudit: () => void
}

export const ReviewHero: React.FC<ReviewHeroProps> = ({
  project,
  profile,
  evaluation,
  isEvaluating,
  onRunAudit,
}) => {
  return (
    <section className="pt-12 pb-16 border-b border-[#E4E2DC]">
      <div className="max-w-4xl">
        {/* Audit Meta Label */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E9] border border-[#FF5A1F]/30 text-[#FF5A1F] font-mono text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
            FEASIBILITY & QUALITY AUDIT
          </span>
          <span className="font-mono text-xs text-[#5F5F5A]">
            TARGET: <span className="font-bold text-[#111111]">{project.title}</span>
          </span>
        </div>

        {/* Primary Opening Headline */}
        <div className="mb-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-[#111111] leading-[1.05] uppercase">
            LET'S PRESS <br />
            <span className="text-[#5F5F5A]">PAUSE.</span>
          </h1>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#111111] mt-4 leading-tight uppercase">
            BEFORE YOU BUILD IT, <br />
            <span className="text-[#FF5A1F]">LET'S CHALLENGE IT.</span>
          </h2>
        </div>

        {/* Supporting Paragraph */}
        <p className="text-base sm:text-lg text-[#5F5F5A] max-w-2xl font-sans leading-relaxed mb-8">
          Project Forge evaluates your project against your skills, timeline, team size, and technical ambition.
          This is an honest academic and architectural stress-test before you commit weeks of code.
        </p>

        {/* Personal Fit Parameters Matrix */}
        <div className="bg-white border border-[#E4E2DC] rounded-2xl p-5 mb-8 shadow-2xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#5F5F5A] mb-3">
            BENCHMARKED AGAINST YOUR CONSTRAINTS:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-[#F7F6F2]">
              <span className="block text-[10px] font-mono uppercase text-[#5F5F5A]">SKILLS</span>
              <span className="font-bold text-[#111111] truncate block mt-0.5" title={profile.skills.join(', ')}>
                {profile.skills.length > 0 ? profile.skills.slice(0, 3).join(', ') : 'Python'}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F7F6F2]">
              <span className="block text-[10px] font-mono uppercase text-[#5F5F5A]">TEAM SIZE</span>
              <span className="font-bold text-[#111111] block mt-0.5">
                {profile.team_size || 1} Member{profile.team_size > 1 ? 's' : ''}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F7F6F2]">
              <span className="block text-[10px] font-mono uppercase text-[#5F5F5A]">TIMELINE</span>
              <span className="font-bold text-[#111111] block mt-0.5">
                {profile.duration || '8 weeks'}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F7F6F2]">
              <span className="block text-[10px] font-mono uppercase text-[#5F5F5A]">EXPERIENCE</span>
              <span className="font-bold text-[#111111] block mt-0.5 capitalize">
                {profile.experience || 'intermediate'}
              </span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex flex-wrap items-center gap-4">
          <button
            type="button"
            onClick={onRunAudit}
            disabled={isEvaluating}
            className="px-8 py-4 bg-[#FF5A1F] hover:bg-[#E04D16] disabled:bg-[#FF5A1F]/60 text-white font-mono text-xs font-bold uppercase tracking-widest rounded-2xl transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isEvaluating ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>ANALYZING YOUR PROJECT...</span>
              </>
            ) : evaluation ? (
              <>
                <span>RUN AUDIT AGAIN</span>
                <span>↻</span>
              </>
            ) : (
              <>
                <span>RUN PROJECT AUDIT</span>
                <span>→</span>
              </>
            )}
          </button>

          {evaluation && (
            <a
              href="#audit-results"
              className="px-6 py-4 bg-white hover:bg-[#F7F6F2] text-[#111111] border border-[#E4E2DC] font-mono text-xs font-bold uppercase tracking-wider rounded-2xl transition-colors cursor-pointer"
            >
              VIEW COMPLETED AUDIT ↓
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
