import React from 'react'
import type { ProjectEvaluation } from '../../types/discovery'

interface AuditFindingsSectionProps {
  evaluation: ProjectEvaluation
}

export const AuditFindingsSection: React.FC<AuditFindingsSectionProps> = ({ evaluation }) => {
  return (
    <div className="py-12 space-y-16">
      {/* 01: STRENGTHS */}
      <section className="scroll-mt-24" id="strengths">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between pb-6 border-b border-[#E4E2DC] mb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#5F5F5A] block mb-1">
              SECTION 01
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111111] uppercase tracking-tight">
              WHAT'S ALREADY STRONG
            </h3>
          </div>
          <span className="font-mono text-xs text-[#5F5F5A] mt-1 sm:mt-0">
            {evaluation.strengths.length} CORE ADVANTAGES IDENTIFIED
          </span>
        </div>

        {/* Numbered Editorial Rows */}
        <div className="divide-y divide-[#E4E2DC] bg-white border border-[#E4E2DC] rounded-3xl overflow-hidden shadow-sm">
          {evaluation.strengths.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 flex items-start gap-4 sm:gap-8 group hover:bg-[#F7F6F2]/60 transition-colors duration-200"
            >
              <span className="font-mono text-xl sm:text-2xl font-bold text-[#FF5A1F] transition-transform duration-200 group-hover:translate-x-1 shrink-0">
                0{idx + 1}
              </span>
              <div className="pt-0.5">
                <p className="text-sm sm:text-base text-[#111111] font-sans leading-relaxed">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 02: WEAKNESSES */}
      <section className="scroll-mt-24" id="weaknesses">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between pb-6 border-b border-[#E4E2DC] mb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F] block mb-1">
              SECTION 02
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111111] uppercase tracking-tight">
              WHERE IT BREAKS
            </h3>
          </div>
          <span className="font-mono text-xs text-[#5F5F5A] mt-1 sm:mt-0">
            {evaluation.weaknesses.length} EXECUTION DEFICIENCIES
          </span>
        </div>

        {/* Distinct but restrained styling with orange accents */}
        <div className="divide-y divide-[#E4E2DC] bg-white border border-[#E4E2DC] rounded-3xl overflow-hidden shadow-sm">
          {evaluation.weaknesses.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 flex items-start gap-4 sm:gap-8 group hover:bg-[#FFF0E9]/30 transition-colors duration-200"
            >
              <div className="flex items-center gap-2 shrink-0">
                <span className="w-1.5 h-6 bg-[#FF5A1F] rounded-full group-hover:h-8 transition-all duration-200" />
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#111111]">
                  0{idx + 1}
                </span>
              </div>
              <div className="pt-0.5">
                <p className="text-sm sm:text-base text-[#111111] font-sans leading-relaxed">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03: RISKS */}
      <section className="scroll-mt-24" id="risks">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between pb-6 border-b border-[#E4E2DC] mb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#5F5F5A] block mb-1">
              SECTION 03
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111111] uppercase tracking-tight">
              WHAT COULD GO WRONG
            </h3>
          </div>
          <span className="font-mono text-xs text-[#5F5F5A] mt-1 sm:mt-0">
            {evaluation.risks.length} DELIVERY & DEFENSE RISKS
          </span>
        </div>

        {/* Practical engineering language in clean editorial rows */}
        <div className="divide-y divide-[#E4E2DC] bg-white border border-[#E4E2DC] rounded-3xl overflow-hidden shadow-sm">
          {evaluation.risks.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 flex items-start gap-4 sm:gap-8 group hover:bg-[#F7F6F2]/60 transition-colors duration-200"
            >
              <div className="shrink-0 flex items-center gap-2">
                <span className="font-mono text-xs uppercase px-2 py-0.5 rounded bg-[#F7F6F2] text-[#5F5F5A] font-semibold border border-[#E4E2DC]">
                  RISK 0{idx + 1}
                </span>
              </div>
              <div className="pt-0.5">
                <p className="text-sm sm:text-base text-[#111111] font-sans leading-relaxed">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04: RECOMMENDATIONS */}
      <section className="scroll-mt-24" id="recommendations">
        <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between pb-6 border-b border-[#E4E2DC] mb-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F] block mb-1">
              SECTION 04
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111111] uppercase tracking-tight">
              WHAT I WOULD CHANGE
            </h3>
          </div>
          <span className="font-mono text-xs text-[#5F5F5A] mt-1 sm:mt-0">
            {evaluation.recommendations.length} STRATEGIC RECOMMENDATIONS
          </span>
        </div>

        {/* Highly Actionable Editorial List */}
        <div className="divide-y divide-[#E4E2DC] bg-white border border-[#E4E2DC] rounded-3xl overflow-hidden shadow-sm">
          {evaluation.recommendations.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-8 flex items-start gap-4 sm:gap-8 group hover:bg-[#FFF0E9]/20 transition-colors duration-200"
            >
              <div className="shrink-0 pt-0.5 flex items-center gap-2">
                <span className="w-7 h-7 rounded-full bg-[#FFF0E9] text-[#FF5A1F] flex items-center justify-center font-mono font-bold text-xs group-hover:bg-[#FF5A1F] group-hover:text-white transition-colors duration-200">
                  →
                </span>
              </div>
              <div>
                <span className="font-mono text-xs uppercase tracking-wider text-[#FF5A1F] font-bold block mb-1">
                  TACTICAL SHIFT 0{idx + 1}
                </span>
                <p className="text-sm sm:text-base text-[#111111] font-sans leading-relaxed">
                  {item}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
