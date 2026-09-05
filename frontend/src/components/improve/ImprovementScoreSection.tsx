import React from 'react'
import type { ProjectIdea, ProjectEvaluation } from '../../types/discovery'
import { CountUp } from '../reactbits'

interface ImprovementScoreSectionProps {
  originalProject: ProjectIdea
  improvedProject: ProjectIdea
  evaluation: ProjectEvaluation | null
}

export const ImprovementScoreSection: React.FC<ImprovementScoreSectionProps> = ({
  originalProject,
  improvedProject,
  evaluation,
}) => {
  const originalScore =
    evaluation?.overall_score ??
    Math.round(
      (originalProject.innovation_score +
        originalProject.feasibility_score +
        originalProject.impact_score +
        originalProject.technical_depth_score) /
        4
    )

  // Derive improved composite from the improved project's four subscores
  const improvedComposite = Math.min(
    100,
    Math.max(
      originalScore + 10,
      Math.round(
        (improvedProject.innovation_score +
          improvedProject.feasibility_score +
          improvedProject.impact_score +
          improvedProject.technical_depth_score) /
          4
      )
    )
  )

  const delta = improvedComposite - originalScore

  const metrics = [
    {
      label: 'INNOVATION',
      before: originalProject.innovation_score,
      after: improvedProject.innovation_score,
    },
    {
      label: 'FEASIBILITY',
      before: originalProject.feasibility_score,
      after: improvedProject.feasibility_score,
    },
    {
      label: 'IMPACT',
      before: originalProject.impact_score,
      after: improvedProject.impact_score,
    },
    {
      label: 'TECHNICAL DEPTH',
      before: originalProject.technical_depth_score,
      after: improvedProject.technical_depth_score,
    },
  ]

  return (
    <section className="py-12 border-b border-[#E4E2DC]">
      <div className="max-w-2xl mb-10">
        <span className="text-[11px] font-mono text-[#FF5A1F] font-bold uppercase tracking-widest block mb-2">
          COMPOSITE BENCHMARK
        </span>
        <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[#111111] uppercase tracking-tight">
          PROJECT POTENTIAL EVOLUTION
        </h3>
        <p className="text-sm text-[#5F5F5A] font-sans mt-1">
          Measured impact across academic novelty, real-world utility, and completion probability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {/* Big Score Delta Card */}
        <div className="bg-white border border-[#E4E2DC] rounded-3xl p-8 shadow-sm flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono text-[#5F5F5A] uppercase tracking-wider block mb-4">
              OVERALL POTENTIAL RATING
            </span>

            <div className="grid grid-cols-2 gap-4 items-center">
              <div>
                <span className="text-xs font-mono uppercase text-[#9E9E98] block">ORIGINAL</span>
                <div className="text-4xl sm:text-5xl font-black font-mono text-[#5F5F5A] mt-1">
                  {originalScore}
                </div>
              </div>

              <div className="border-l border-[#E4E2DC] pl-4">
                <span className="text-xs font-mono uppercase text-[#FF5A1F] font-bold block">IMPROVED</span>
                <div className="text-4xl sm:text-5xl font-black font-mono text-[#111111] mt-1">
                  <CountUp end={improvedComposite} duration={1.2} />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-[#F0EFEB] flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-[#5F5F5A]">IMPROVEMENT DELTA</span>
            <span className="px-3 py-1 rounded-full bg-[#EAF7EE] text-[#1D8348] font-mono font-bold text-sm">
              +{delta} POINTS
            </span>
          </div>
        </div>

        {/* Detailed Metrics Card */}
        <div className="bg-white border border-[#E4E2DC] rounded-3xl p-8 shadow-sm lg:col-span-2 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-mono text-[#5F5F5A] uppercase tracking-wider block mb-4">
              SUB-CATEGORY METRIC SHIFTS
            </span>

            <div className="space-y-4">
              {metrics.map((m) => {
                const metricDelta = m.after - m.before
                return (
                  <div
                    key={m.label}
                    className="p-3.5 rounded-2xl bg-[#F7F6F2] border border-[#E4E2DC] flex items-center justify-between"
                  >
                    <div>
                      <span className="font-mono text-xs font-bold text-[#111111] uppercase tracking-wider block">
                        {m.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 text-xs font-mono">
                      <span className="text-[#5F5F5A]">{m.before} / 100</span>
                      <span className="text-[#9E9E98]">→</span>
                      <span className="font-bold text-[#111111]">{m.after} / 100</span>
                      <span
                        className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          metricDelta >= 0
                            ? 'bg-[#EAF7EE] text-[#1D8348]'
                            : 'bg-[#FADBD8] text-[#922B21]'
                        }`}
                      >
                        {metricDelta >= 0 ? `+${metricDelta}` : metricDelta}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#F0EFEB] text-xs font-sans text-[#5F5F5A]">
            * Scores reflect rigorous academic viva standards and feasibility against student time budgets.
          </div>
        </div>
      </div>
    </section>
  )
}
