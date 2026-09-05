import React from 'react'
import type { ProjectIdea, StudentProfile, ProjectEvaluation } from '../../types/discovery'

interface ImproveHeroProps {
  project: ProjectIdea
  profile: StudentProfile
  evaluation: ProjectEvaluation | null
  isImproving: boolean
  hasImproved: boolean
  onRunImprovement: () => void
}

export const ImproveHero: React.FC<ImproveHeroProps> = ({
  project,
  profile,
  evaluation,
  isImproving,
  hasImproved,
  onRunImprovement,
}) => {
  const originalScore =
    evaluation?.overall_score ??
    Math.round(
      (project.innovation_score +
        project.feasibility_score +
        project.impact_score +
        project.technical_depth_score) /
        4
    )

  return (
    <section className="pt-12 pb-14 border-b border-[#E4E2DC]">
      <div className="max-w-4xl">
        {/* Meta Tag */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-6">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E9] border border-[#FF5A1F]/30 text-[#FF5A1F] font-mono text-xs font-bold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
            AI ARCHITECTURAL HARDENING
          </span>
          <span className="font-mono text-xs text-[#5F5F5A]">
            TARGET: <span className="font-bold text-[#111111]">{project.title}</span>
          </span>
        </div>

        {/* Headline */}
        <div className="mb-6">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-[#111111] leading-[1.05] uppercase">
            YOUR PROJECT HAS <br />
            <span className="text-[#5F5F5A]">POTENTIAL.</span>
          </h1>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-display tracking-tight text-[#FF5A1F] mt-3 leading-tight uppercase">
            NOW LET'S MAKE IT STRONGER.
          </h2>
        </div>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-[#5F5F5A] max-w-2xl font-sans leading-relaxed mb-8">
          Use the review findings to strengthen your idea before you start building. Project Forge resolves scope creep, sharpens the tech stack, and hardens architectural deliverables while respecting your team's real constraints.
        </p>

        {/* Review Context Card */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Original Score Pill */}
          <div className="bg-white border border-[#E4E2DC] rounded-2xl p-5 shadow-2xs flex flex-col justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#5F5F5A]">
              AUDIT BASELINE SCORE
            </span>
            <div className="flex items-baseline gap-2 my-2">
              <span className="text-4xl font-black font-mono text-[#111111]">
                {originalScore}
              </span>
              <span className="text-sm font-mono text-[#5F5F5A]">/ 100</span>
            </div>
            <span className="text-xs text-[#5F5F5A] font-sans">
              Evaluated against your {profile.duration || '8-week'} timeline.
            </span>
          </div>

          {/* Concise Review Summary */}
          <div className="bg-white border border-[#E4E2DC] rounded-2xl p-5 shadow-2xs md:col-span-2 flex flex-col justify-between">
            <span className="text-[11px] font-mono uppercase tracking-wider text-[#5F5F5A] mb-2">
              AUDIT SUMMARY & TARGETS
            </span>
            <p className="text-xs sm:text-sm text-[#111111] font-sans line-clamp-2 mb-2 leading-relaxed">
              {evaluation?.weaknesses?.[0]
                ? `Primary bottleneck: ${evaluation.weaknesses[0]}`
                : `Focus: Eliminating delivery risks and reinforcing defensible architectural depth.`}
            </p>
            <div className="flex items-center gap-2 pt-2 border-t border-[#F0EFEB]">
              <span className="text-[10px] font-mono text-[#FF5A1F] font-bold uppercase tracking-wider">
                RECOMMENDATION:
              </span>
              <span className="text-xs text-[#5F5F5A] font-sans truncate">
                {evaluation?.recommendations?.[0] || 'Prune unnecessary thesis-level features.'}
              </span>
            </div>
          </div>
        </div>

        {/* Student Constraints Summary */}
        <div className="bg-white border border-[#E4E2DC] rounded-2xl p-5 mb-8 shadow-2xs">
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#5F5F5A] mb-3">
            RESPECTED STUDENT CONSTRAINTS:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-[#F7F6F2]">
              <span className="block text-[10px] font-mono uppercase text-[#5F5F5A]">SKILLS</span>
              <span className="font-bold text-[#111111] truncate block mt-0.5" title={profile.skills.join(', ')}>
                {profile.skills.length > 0 ? profile.skills.slice(0, 3).join(', ') : 'Python'}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F7F6F2]">
              <span className="block text-[10px] font-mono uppercase text-[#5F5F5A]">TIMELINE</span>
              <span className="font-bold text-[#111111] block mt-0.5">{profile.duration || '8 weeks'}</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F7F6F2]">
              <span className="block text-[10px] font-mono uppercase text-[#5F5F5A]">TEAM SIZE</span>
              <span className="font-bold text-[#111111] block mt-0.5">{profile.team_size || 3} Members</span>
            </div>
            <div className="p-2.5 rounded-xl bg-[#F7F6F2]">
              <span className="block text-[10px] font-mono uppercase text-[#5F5F5A]">EXPERIENCE</span>
              <span className="font-bold text-[#111111] block mt-0.5 capitalize">{profile.experience || 'Intermediate'}</span>
            </div>
          </div>
        </div>

        {/* Action button if needed */}
        {!hasImproved && !isImproving && (
          <div className="pt-2">
            <button
              type="button"
              onClick={onRunImprovement}
              className="px-8 py-4 bg-[#FF5A1F] hover:bg-[#E04D16] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-2xl transition-all shadow-md hover:shadow-xl cursor-pointer"
            >
              STRENGTHEN PROJECT SPECIFICATION →
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
