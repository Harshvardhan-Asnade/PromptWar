import React from 'react'
import type { ProjectIdea } from '../../types/discovery'

export type ComparisonDimension = 'all' | 'innovation' | 'feasibility' | 'impact' | 'depth'

interface ProjectComparisonBarProps {
  projects: ProjectIdea[]
  activeDimension: ComparisonDimension
  onSelectDimension: (dim: ComparisonDimension) => void
  onFocusProject?: (index: number) => void
}

export const ProjectComparisonBar: React.FC<ProjectComparisonBarProps> = ({
  projects,
  activeDimension,
  onSelectDimension,
  onFocusProject,
}) => {
  if (!projects || projects.length === 0) return null

  // Compute metric leaders
  const topInnovation = [...projects].sort((a, b) => b.innovation_score - a.innovation_score)[0]
  const topFeasibility = [...projects].sort((a, b) => b.feasibility_score - a.feasibility_score)[0]
  const topImpact = [...projects].sort((a, b) => b.impact_score - a.impact_score)[0]
  const topDepth = [...projects].sort((a, b) => b.technical_depth_score - a.technical_depth_score)[0]

  const dimensions: { id: ComparisonDimension; label: string; leader: ProjectIdea; score: number; metric: string }[] = [
    {
      id: 'innovation',
      label: 'MOST INNOVATIVE',
      leader: topInnovation,
      score: topInnovation?.innovation_score || 0,
      metric: 'INNOVATION',
    },
    {
      id: 'feasibility',
      label: 'MAX FEASIBILITY',
      leader: topFeasibility,
      score: topFeasibility?.feasibility_score || 0,
      metric: 'FEASIBILITY',
    },
    {
      id: 'impact',
      label: 'HIGHEST IMPACT',
      leader: topImpact,
      score: topImpact?.impact_score || 0,
      metric: 'IMPACT',
    },
    {
      id: 'depth',
      label: 'DEEPEST TECH',
      leader: topDepth,
      score: topDepth?.technical_depth_score || 0,
      metric: 'TECH DEPTH',
    },
  ]

  const activeInfo = dimensions.find((d) => d.id === activeDimension)

  return (
    <div className="w-full bg-white border border-[#E4E2DC] rounded-2xl p-4 sm:p-5 mb-8 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Dimension Switcher Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          <span className="font-mono text-[11px] text-[#767571] uppercase tracking-wider shrink-0 mr-1 hidden sm:inline">
            COMPARE:
          </span>

          <button
            type="button"
            onClick={() => onSelectDimension('all')}
            className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap ${
              activeDimension === 'all'
                ? 'bg-[#111111] text-white shadow-sm'
                : 'bg-[#F7F6F2] text-[#5F5F5A] hover:text-[#111111] hover:bg-[#E4E2DC]/50'
            }`}
          >
            ALL DIRECTIONS
          </button>

          {dimensions.map((dim) => {
            const isSelected = activeDimension === dim.id
            return (
              <button
                key={dim.id}
                type="button"
                onClick={() => {
                  onSelectDimension(dim.id)
                  const targetIdx = projects.findIndex((p) => p.id === dim.leader.id)
                  if (targetIdx !== -1 && onFocusProject) {
                    onFocusProject(targetIdx)
                  }
                }}
                className={`px-3 py-1.5 rounded-lg font-mono text-xs uppercase tracking-wider transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#FF5A1F] text-white shadow-sm'
                    : 'bg-[#F7F6F2] text-[#5F5F5A] hover:text-[#111111] hover:bg-[#E4E2DC]/50'
                }`}
              >
                <span>{dim.label}</span>
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                    isSelected ? 'bg-black/20 text-white' : 'bg-[#E4E2DC] text-[#111111]'
                  }`}
                >
                  {dim.score}
                </span>
              </button>
            )
          })}
        </div>

        {/* Right: Quick Dimension Highlight Explanation */}
        <div className="text-xs font-sans text-[#5F5F5A] flex items-center gap-2 shrink-0 border-t md:border-t-0 pt-2 md:pt-0 border-[#E4E2DC]">
          {activeInfo ? (
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
              <span>
                <strong className="text-[#111111] font-medium">{activeInfo.leader.title}</strong> leads in{' '}
                <strong className="text-[#FF5A1F] font-mono">{activeInfo.metric} ({activeInfo.score}/100)</strong>
              </span>
            </div>
          ) : (
            <span>
              Click any metric above to inspect each direction's comparative advantage.
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
