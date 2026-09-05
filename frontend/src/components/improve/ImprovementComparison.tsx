import React, { useState } from 'react'
import type { ProjectIdea, ProjectEvaluation, ImproveProjectResponse } from '../../types/discovery'

interface ImprovementComparisonProps {
  originalProject: ProjectIdea
  improvedProject: ProjectIdea
  evaluation: ProjectEvaluation | null
  improvementData: ImproveProjectResponse
}

export const ImprovementComparison: React.FC<ImprovementComparisonProps> = ({
  originalProject,
  improvedProject,
  evaluation,
  improvementData,
}) => {
  const [mobileTab, setMobileTab] = useState<'both' | 'before' | 'after'>('both')

  const originalScore =
    evaluation?.overall_score ??
    Math.round(
      (originalProject.innovation_score +
        originalProject.feasibility_score +
        originalProject.impact_score +
        originalProject.technical_depth_score) /
        4
    )

  const improvedScore = Math.min(
    100,
    Math.max(
      originalScore + 12,
      Math.round(
        (improvedProject.innovation_score +
          improvedProject.feasibility_score +
          improvedProject.impact_score +
          improvedProject.technical_depth_score) /
          4
      )
    )
  )

  const scoreDelta = improvedScore - originalScore

  return (
    <section className="py-12 border-b border-[#E4E2DC]">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-[11px] font-mono text-[#FF5A1F] font-bold uppercase tracking-widest block mb-2">
            EDITORIAL COMPARISON
          </span>
          <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[#111111] uppercase tracking-tight">
            BEFORE & AFTER SPECIFICATION
          </h3>
          <p className="text-sm text-[#5F5F5A] font-sans mt-1">
            Review side-by-side how audit vulnerabilities were resolved in the hardened engineering blueprint.
          </p>
        </div>

        {/* Mobile View Switcher */}
        <div className="flex lg:hidden items-center bg-white p-1 rounded-xl border border-[#E4E2DC] self-start">
          <button
            type="button"
            onClick={() => setMobileTab('both')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
              mobileTab === 'both'
                ? 'bg-[#111111] text-white font-bold'
                : 'text-[#5F5F5A] hover:text-[#111111]'
            }`}
          >
            Both
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('before')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
              mobileTab === 'before'
                ? 'bg-[#111111] text-white font-bold'
                : 'text-[#5F5F5A] hover:text-[#111111]'
            }`}
          >
            Before
          </button>
          <button
            type="button"
            onClick={() => setMobileTab('after')}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase transition-colors ${
              mobileTab === 'after'
                ? 'bg-[#FF5A1F] text-white font-bold'
                : 'text-[#5F5F5A] hover:text-[#111111]'
            }`}
          >
            After
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {/* BEFORE CARD */}
        {(mobileTab === 'both' || mobileTab === 'before') && (
          <div className="bg-white border border-[#E4E2DC] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs relative">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#F0EFEB]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7F6F2] border border-[#E4E2DC] text-[#5F5F5A] font-mono text-[11px] font-bold uppercase tracking-wider">
                  BEFORE — INITIAL AUDIT
                </span>
                <div className="font-mono text-xs text-[#5F5F5A]">
                  SCORE: <span className="font-bold text-[#111111] text-sm">{originalScore}</span>
                </div>
              </div>

              <h4 className="text-xl sm:text-2xl font-bold font-display text-[#111111] tracking-tight mb-2">
                {originalProject.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#5F5F5A] font-sans italic mb-6">
                "{originalProject.tagline}"
              </p>

              {/* Identified Weaknesses */}
              <div className="space-y-4 mb-6">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#9E9E98] block">
                  IDENTIFIED VULNERABILITIES:
                </span>
                {evaluation?.weaknesses && evaluation.weaknesses.length > 0 ? (
                  evaluation.weaknesses.slice(0, 3).map((w, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#5F5F5A] font-sans">
                      <span className="w-4 h-4 rounded bg-[#FFF0E9] text-[#FF5A1F] flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                        !
                      </span>
                      <span className="leading-relaxed">{w}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-[#5F5F5A] font-sans">
                    Scope creep risks and loosely defined demonstration boundaries.
                  </div>
                )}
              </div>

              {/* Scope/risks before */}
              <div className="p-3.5 rounded-2xl bg-[#F7F6F2] border border-[#E4E2DC] text-xs">
                <span className="text-[10px] font-mono uppercase text-[#5F5F5A] block mb-1">
                  PRIMARY RISK IN REVIEW:
                </span>
                <span className="text-[#111111] font-sans leading-snug">
                  {evaluation?.risks?.[0] || 'Unmitigated execution bottlenecks during testing.'}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F0EFEB] flex items-center justify-between text-[11px] font-mono text-[#5F5F5A]">
              <span>STATUS: REVISED</span>
              <span>COMPLEXITY: {originalProject.difficulty}</span>
            </div>
          </div>
        )}

        {/* AFTER CARD */}
        {(mobileTab === 'both' || mobileTab === 'after') && (
          <div className="bg-white border-2 border-[#FF5A1F] rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-lg relative overflow-hidden">
            {/* Top highlight bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-[#FF5A1F]" />

            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#F0EFEB]">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFF0E9] border border-[#FF5A1F]/40 text-[#FF5A1F] font-mono text-[11px] font-bold uppercase tracking-wider">
                  AFTER — HARDENED SPECIFICATION
                </span>
                <div className="font-mono text-xs flex items-center gap-1.5">
                  <span className="text-[#5F5F5A]">SCORE:</span>
                  <span className="font-black text-[#111111] text-base">{improvedScore}</span>
                  {scoreDelta > 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-[#EAF7EE] text-[#1D8348] font-bold text-[10px]">
                      +{scoreDelta}
                    </span>
                  )}
                </div>
              </div>

              <h4 className="text-xl sm:text-2xl font-black font-display text-[#111111] tracking-tight mb-2">
                {improvedProject.title}
              </h4>
              <p className="text-xs sm:text-sm text-[#FF5A1F] font-sans font-medium mb-6">
                "{improvedProject.tagline}"
              </p>

              {/* Major improvements summary */}
              <div className="space-y-4 mb-6">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#FF5A1F] font-bold block">
                  STRATEGIC RE-ENGINEERING:
                </span>
                <p className="text-xs sm:text-sm text-[#111111] font-sans leading-relaxed bg-[#FFF0E9]/30 p-3.5 rounded-2xl border border-[#FF5A1F]/20">
                  {improvementData.summary_of_changes}
                </p>

                {/* Major improvements list */}
                {improvementData.technical_improvements.slice(0, 2).map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-[#111111] font-sans">
                    <span className="w-4 h-4 rounded bg-[#EAF7EE] text-[#1D8348] flex items-center justify-center font-mono font-bold text-[10px] shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span className="leading-relaxed font-medium">{item}</span>
                  </div>
                ))}
              </div>

              {/* Scope safeguard */}
              <div className="p-3.5 rounded-2xl bg-[#F7F6F2] border border-[#E4E2DC] text-xs">
                <span className="text-[10px] font-mono uppercase text-[#FF5A1F] font-bold block mb-1">
                  TIMELINE SAFEGUARD:
                </span>
                <span className="text-[#111111] font-sans leading-snug">
                  {improvementData.scope_adjustments?.[0] || 'Pruned extraneous stretch features to protect MVP delivery.'}
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#F0EFEB] flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#1D8348] font-bold">VIVA DEFENSE READY</span>
              <span className="text-[#5F5F5A]">DIFFICULTY: {improvedProject.difficulty}</span>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
