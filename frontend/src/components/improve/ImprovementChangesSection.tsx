import React from 'react'
import type { ImproveProjectResponse } from '../../types/discovery'

interface ImprovementChangesSectionProps {
  improvementData: ImproveProjectResponse
}

export const ImprovementChangesSection: React.FC<ImprovementChangesSectionProps> = ({
  improvementData,
}) => {
  const categories = [
    {
      id: 'scope',
      title: 'SCOPE',
      subtitle: 'Timeline & Delivery Safeguards',
      items: improvementData.scope_adjustments,
      badge: 'SAFEGUARDS',
      badgeColor: 'bg-[#FFF0E9] text-[#FF5A1F]',
    },
    {
      id: 'technical_depth',
      title: 'TECHNICAL DEPTH',
      subtitle: 'Algorithms & Advanced Logic',
      items: improvementData.technical_improvements,
      badge: 'ENGINEERING',
      badgeColor: 'bg-[#EBF5FB] text-[#2980B9]',
    },
    {
      id: 'feasibility',
      title: 'FEASIBILITY',
      subtitle: 'Refined Practical Features',
      items: improvementData.feature_improvements,
      badge: 'VIABILITY',
      badgeColor: 'bg-[#EAF7EE] text-[#1D8348]',
    },
    {
      id: 'impact',
      title: 'IMPACT',
      subtitle: 'Academic Distinction & Utility',
      items: improvementData.innovation_opportunities,
      badge: 'INNOVATION',
      badgeColor: 'bg-[#FEF9E7] text-[#B7950B]',
    },
    {
      id: 'architecture',
      title: 'ARCHITECTURE',
      subtitle: 'Component Pipelines & Data Flows',
      items: improvementData.architecture_improvements,
      badge: 'INFRASTRUCTURE',
      badgeColor: 'bg-[#F4ECF7] text-[#8E44AD]',
    },
    {
      id: 'uniqueness',
      title: 'UNIQUENESS',
      subtitle: 'Viva Presentation & Examiner Appeal',
      items:
        improvementData.scalability_improvements && improvementData.scalability_improvements.length > 0
          ? improvementData.scalability_improvements
          : [improvementData.summary_of_changes],
      badge: 'DISTINCTION',
      badgeColor: 'bg-[#F2F4F4] text-[#34495E]',
    },
  ]

  return (
    <section className="py-12 border-b border-[#E4E2DC]">
      <div className="max-w-2xl mb-10">
        <span className="text-[11px] font-mono text-[#FF5A1F] font-bold uppercase tracking-widest block mb-2">
          DETAILED AUDIT RESOLUTIONS
        </span>
        <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-[#111111] uppercase tracking-tight">
          WHAT CHANGED
        </h3>
        <p className="text-sm text-[#5F5F5A] font-sans mt-1">
          Every enhancement directly corresponds to vulnerabilities identified in your project audit.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white border border-[#E4E2DC] rounded-3xl p-6 shadow-2xs hover:shadow-md transition-shadow duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-[#F0EFEB]">
                <h4 className="font-display font-extrabold text-base text-[#111111] tracking-tight">
                  {cat.title}
                </h4>
                <span
                  className={`px-2.5 py-0.5 rounded-full font-mono text-[10px] font-bold uppercase tracking-wider ${cat.badgeColor}`}
                >
                  {cat.badge}
                </span>
              </div>
              <p className="text-xs text-[#5F5F5A] font-sans mb-4">{cat.subtitle}</p>

              <div className="space-y-3">
                {cat.items && cat.items.length > 0 ? (
                  cat.items.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#111111] font-sans">
                      <span className="w-4 h-4 rounded-full bg-[#F7F6F2] text-[#5F5F5A] flex items-center justify-center font-mono text-[10px] shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-xs text-[#5F5F5A] font-sans italic">
                    Aligned with student constraints and scope safeguards.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-[#F0EFEB] text-[10px] font-mono text-[#9E9E98] uppercase">
              VERIFIED AGAINST REAL CONSTRAINTS
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
