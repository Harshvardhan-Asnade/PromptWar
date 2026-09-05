import React from 'react'
import type { ProjectIdea } from '../../types/discovery'

interface ResourcesAndRisksSectionProps {
  project: ProjectIdea
}

export const ResourcesAndRisksSection: React.FC<ResourcesAndRisksSectionProps> = ({ project }) => {
  return (
    <div className="py-14 border-b border-[#E4E2DC] space-y-16">
      {/* SECTION 09 — DATASETS / RESOURCES */}
      <section id="resources" className="scroll-mt-32">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
          <span className="font-mono text-xs font-bold text-[#FF5A1F] uppercase tracking-widest">
            SECTION 09 // DATASETS & RESOURCES
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] font-display tracking-tight mb-4">
          REQUIRED DATASETS & BENCHMARKS
        </h2>

        <p className="text-sm sm:text-base text-[#5F5F5A] max-w-2xl font-sans mb-8">
          Pre-validated corpus collections and synthetic datasets suitable for baseline experimentation.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {project.datasets && project.datasets.length > 0 ? (
            project.datasets.map((dataset, idx) => (
              <div
                key={idx}
                className="bg-white border border-[#E4E2DC] rounded-2xl p-6 shadow-sm hover:border-[#111111] transition-colors"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-[10px] text-[#FF5A1F] uppercase font-bold tracking-wider">
                    RESOURCE 0{idx + 1}
                  </span>
                  <span className="font-mono text-[10px] text-[#767571] uppercase px-2 py-0.5 rounded bg-[#F7F6F2]">
                    BENCHMARK READY
                  </span>
                </div>
                <h4 className="text-base font-bold font-display text-[#111111] mb-2">{dataset}</h4>
                <p className="text-xs text-[#5F5F5A] font-sans">
                  Use for initial distribution baseline, evaluation benchmarks, and adversarial testing.
                </p>
              </div>
            ))
          ) : (
            <div className="bg-white border border-[#E4E2DC] rounded-2xl p-6 text-sm text-[#5F5F5A]">
              Standard synthetic benchmark data generated via simulation scripts.
            </div>
          )}
        </div>
      </section>

      {/* SECTION 10 — RISKS & MITIGATIONS */}
      <section id="risks" className="scroll-mt-32">
        <div className="flex items-center gap-2 mb-3">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
          <span className="font-mono text-xs font-bold text-[#FF5A1F] uppercase tracking-widest">
            SECTION 10 // RISK ADVISORY & MITIGATIONS
          </span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] font-display tracking-tight mb-4">
          ENGINEERING RISKS & SAFEGUARDS
        </h2>

        <p className="text-sm sm:text-base text-[#5F5F5A] max-w-2xl font-sans mb-8">
          Known architectural bottlenecks, dependency vulnerabilities, and examiner defense considerations.
        </p>

        <div className="space-y-4 max-w-4xl">
          {project.risks?.map((risk, idx) => {
            const correspondingImprovement = project.improvements?.[idx]
            return (
              <div
                key={idx}
                className="bg-white border border-[#E4E2DC] rounded-2xl p-6 shadow-sm flex flex-col md:flex-row md:items-start justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <span className="font-mono text-xs font-bold text-[#FF5A1F] bg-[#FFF0E9] px-2.5 py-1 rounded-lg shrink-0">
                    RISK 0{idx + 1}
                  </span>
                  <div>
                    <h4 className="text-base font-bold text-[#111111] font-display mb-1">{risk}</h4>
                    {correspondingImprovement && (
                      <p className="text-xs text-[#5F5F5A] mt-2">
                        <strong className="text-[#111111] font-mono uppercase text-[10px] block mb-0.5">
                          RECOMMENDED MITIGATION:
                        </strong>
                        {correspondingImprovement}
                      </p>
                    )}
                  </div>
                </div>

                <span className="font-mono text-[10px] text-[#767571] uppercase tracking-wider shrink-0 bg-[#F7F6F2] px-2 py-1 rounded border border-[#E4E2DC] self-start">
                  EXAMINER AUDIT ITEM
                </span>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
