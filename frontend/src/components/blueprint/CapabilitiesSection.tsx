import React from 'react'
import type { ProjectIdea } from '../../types/discovery'

interface CapabilitiesSectionProps {
  project: ProjectIdea
}

export const CapabilitiesSection: React.FC<CapabilitiesSectionProps> = ({ project }) => {
  return (
    <section id="capabilities" className="py-14 border-b border-[#E4E2DC] scroll-mt-32">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
        <span className="font-mono text-xs font-bold text-[#FF5A1F] uppercase tracking-widest">
          SECTION 04 // FUNCTIONAL SPECIFICATION
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
        <div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] font-display tracking-tight">
            SYSTEM CAPABILITIES
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#5F5F5A] max-w-xl font-sans">
            Partitioned into essential core milestones and high-distinction advanced features.
          </p>
        </div>

        <div className="flex items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1 rounded-full bg-white border border-[#E4E2DC] text-[#111111]">
            {project.features?.length || 0} CORE
          </span>
          <span className="px-3 py-1 rounded-full bg-[#FFF0E9] border border-[#FF5A1F]/30 text-[#FF5A1F] font-bold">
            {project.advanced_features?.length || 0} ADVANCED
          </span>
        </div>
      </div>

      {/* CORE FEATURES (Numbered editorial rows) */}
      <div className="mb-14">
        <div className="border-b border-[#111111] pb-3 mb-4 flex items-center justify-between">
          <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#111111]">
            CORE SYSTEM FEATURES (MUST-BUILD)
          </span>
          <span className="font-mono text-[11px] text-[#767571] uppercase">PRIMARY ROADMAP</span>
        </div>

        <div className="divide-y divide-[#E4E2DC] border-b border-[#E4E2DC]">
          {project.features?.map((feat, idx) => (
            <div
              key={idx}
              className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group hover:bg-white/60 px-3 rounded-xl transition-colors"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-mono text-xs font-bold text-[#FF5A1F] tracking-widest shrink-0">
                  0{idx + 1}
                </span>
                <span className="text-base sm:text-lg text-[#111111] font-display font-bold group-hover:text-[#FF5A1F] transition-colors">
                  {feat}
                </span>
              </div>
              <span className="font-mono text-[11px] text-[#767571] uppercase tracking-wider shrink-0">
                REQUIRED / CAPSTONE CORE
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ADVANCED FEATURES (Distinction layer) */}
      {project.advanced_features && project.advanced_features.length > 0 && (
        <div>
          <div className="border-b border-[#FF5A1F] pb-3 mb-4 flex items-center justify-between">
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5A1F]">
              ADVANCED CAPABILITIES (EXAMINER DISTINCTION)
            </span>
            <span className="font-mono text-[11px] text-[#FF5A1F] uppercase font-bold">OPTIONAL UPGRADES</span>
          </div>

          <div className="divide-y divide-[#E4E2DC] border-b border-[#E4E2DC]">
            {project.advanced_features.map((adv, idx) => (
              <div
                key={idx}
                className="py-5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 group hover:bg-[#FFF0E9]/30 px-3 rounded-xl transition-colors"
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-xs font-bold text-[#111111] tracking-widest shrink-0">
                    +0{idx + 1}
                  </span>
                  <span className="text-base sm:text-lg text-[#111111] font-display font-medium group-hover:text-[#FF5A1F] transition-colors">
                    {adv}
                  </span>
                </div>
                <span className="font-mono text-[11px] text-[#FF5A1F] uppercase tracking-wider shrink-0 font-medium">
                  HIGH-IMPACT EXTENSION
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}
