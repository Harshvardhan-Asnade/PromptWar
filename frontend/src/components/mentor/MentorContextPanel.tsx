import React, { useState } from 'react'
import type { ProjectIdea } from '../../types/discovery'

interface MentorContextPanelProps {
  project: ProjectIdea
}

export const MentorContextPanel: React.FC<MentorContextPanelProps> = ({ project }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="bg-white border border-[#E4E2DC] rounded-2xl overflow-hidden shadow-sm mb-8 transition-all">
      {/* Header bar */}
      <button
        type="button"
        onClick={() => setIsExpanded((prev) => !prev)}
        className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-[#F7F6F2]/60 transition-colors cursor-pointer"
        aria-expanded={isExpanded}
      >
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
            ACTIVE SPEC REFERENCE: {project.title}
          </span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-[#767571]">
          <span>{isExpanded ? 'COLLAPSE SPEC' : 'EXPAND SPEC'}</span>
          <span className="text-base leading-none">{isExpanded ? '▴' : '▾'}</span>
        </div>
      </button>

      {/* Expandable Spec Drawer */}
      {isExpanded && (
        <div className="px-5 pb-6 pt-2 border-t border-[#E4E2DC] bg-[#F7F6F2]/30 space-y-4">
          <div>
            <span className="font-mono text-[10px] text-[#767571] uppercase tracking-wider block mb-1">
              CORE PROBLEM
            </span>
            <p className="text-xs text-[#5F5F5A] leading-relaxed">
              {project.problem}
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] text-[#767571] uppercase tracking-wider block mb-1">
              TECHNICAL SOLUTION
            </span>
            <p className="text-xs text-[#5F5F5A] leading-relaxed">
              {project.solution}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <span className="font-mono text-[10px] text-[#767571] uppercase tracking-wider block mb-1.5">
                TECH STACK
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.tech_stack?.map((tech, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-white border border-[#E4E2DC] text-[10px] font-mono font-semibold text-[#111111]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="font-mono text-[10px] text-[#767571] uppercase tracking-wider block mb-1.5">
                KEY HIGHLIGHTS
              </span>
              <div className="flex flex-wrap gap-1.5">
                {project.features?.slice(0, 3).map((f, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded bg-[#FFF0E9] text-[10px] font-mono text-[#FF5A1F] font-semibold"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
