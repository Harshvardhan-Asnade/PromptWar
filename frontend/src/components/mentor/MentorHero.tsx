import React from 'react'
import type { ProjectIdea, StudentProfile } from '../../types/discovery'

interface MentorHeroProps {
  project: ProjectIdea
  profile: StudentProfile
}

export const MentorHero: React.FC<MentorHeroProps> = ({ project, profile }) => {
  return (
    <section className="pt-10 pb-8 border-b border-[#E4E2DC]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Eyebrow */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0E9] border border-[#FF5A1F]/30 text-[#FF5A1F] font-mono text-[11px] font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] animate-pulse" />
            AI PROJECT ADVISOR
          </span>
          <span className="font-mono text-xs text-[#767571] uppercase tracking-wider">
            CONTEXT-AWARE ENGINEERING GUIDANCE
          </span>
        </div>

        {/* Big Editorial Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display text-[#111111] tracking-tight leading-[1.05] uppercase max-w-4xl mb-4">
          YOU HAVE THE PROJECT.
          <br />
          <span className="text-[#FF5A1F]">NOW ASK WHAT COMES NEXT.</span>
        </h1>

        {/* Subheading */}
        <p className="text-base sm:text-lg text-[#5F5F5A] max-w-2xl font-sans mb-8 leading-relaxed">
          Get project-aware guidance while you build. Ask about architecture tradeoffs, milestone prioritization, edge case hardening, and defense strategies.
        </p>

        {/* Project Context Matrix Bar */}
        <div className="bg-white border border-[#E4E2DC] rounded-2xl p-4 sm:p-6 shadow-sm">
          <div className="text-[10px] font-mono text-[#767571] uppercase tracking-wider mb-3">
            CURRENT ADVISORY CONTEXT
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {/* Title */}
            <div className="col-span-2 sm:col-span-3 lg:col-span-2">
              <span className="text-[10px] font-mono text-[#767571] uppercase block">PROJECT</span>
              <span className="font-bold text-sm text-[#111111] truncate block mt-0.5">
                {project.title}
              </span>
            </div>

            {/* Skills */}
            <div>
              <span className="text-[10px] font-mono text-[#767571] uppercase block">SKILLS</span>
              <span className="font-semibold text-xs text-[#111111] truncate block mt-0.5">
                {profile.skills?.length > 0 ? profile.skills.slice(0, 2).join(', ') : 'Full Stack'}
              </span>
            </div>

            {/* Team Size */}
            <div>
              <span className="text-[10px] font-mono text-[#767571] uppercase block">TEAM SIZE</span>
              <span className="font-semibold text-xs text-[#111111] block mt-0.5">
                {profile.team_size || 3} Engineers
              </span>
            </div>

            {/* Duration */}
            <div>
              <span className="text-[10px] font-mono text-[#767571] uppercase block">DURATION</span>
              <span className="font-semibold text-xs text-[#111111] block mt-0.5">
                {profile.duration || '8 weeks'}
              </span>
            </div>

            {/* Difficulty & Stage */}
            <div>
              <span className="text-[10px] font-mono text-[#767571] uppercase block">STAGE / DIFFICULTY</span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="px-1.5 py-0.5 rounded bg-[#FFF0E9] text-[#FF5A1F] text-[10px] font-mono font-bold uppercase">
                  BUILD
                </span>
                <span className="font-semibold text-xs text-[#111111] capitalize">
                  {project.difficulty}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
