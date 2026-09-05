import React from 'react'
import { useDiscovery, type AppRoute } from '../../context/DiscoveryContext'

interface ProjectWorkspaceNavProps {
  activeStage?: 'overview' | 'blueprint' | 'review' | 'improve' | 'mentor'
}

interface WorkspaceTab {
  id: 'overview' | 'blueprint' | 'review' | 'improve' | 'mentor'
  route: AppRoute
  label: string
  num: string
}

const TABS: WorkspaceTab[] = [
  { id: 'overview', route: 'project-detail', label: 'OVERVIEW', num: '01' },
  { id: 'blueprint', route: 'blueprint', label: 'BLUEPRINT', num: '02' },
  { id: 'review', route: 'review', label: 'REVIEW', num: '03' },
  { id: 'improve', route: 'improve', label: 'IMPROVE', num: '04' },
  { id: 'mentor', route: 'mentor', label: 'MENTOR', num: '05' },
]

/**
 * Persistent Project Workspace Navigation Strip (Improvement 13).
 * Mounted across all post-selection routes (Detail, Blueprint, Review, Improve, Mentor)
 * to anchor the student in the active project workspace context.
 */
export const ProjectWorkspaceNav: React.FC<ProjectWorkspaceNavProps> = ({ activeStage }) => {
  const {
    selectedProject,
    projects,
    currentRoute,
    navigateTo,
    improvedProject,
  } = useDiscovery()

  // Use currently selected project or fallback
  const activeProject = selectedProject || (projects.length > 0 ? projects[0] : null)

  // Deduce current stage from prop or currentRoute
  const currentTab =
    activeStage ||
    (currentRoute === 'project-detail'
      ? 'overview'
      : currentRoute === 'blueprint'
      ? 'blueprint'
      : currentRoute === 'review'
      ? 'review'
      : currentRoute === 'improve'
      ? 'improve'
      : currentRoute === 'mentor'
      ? 'mentor'
      : 'overview')

  if (!activeProject) return null

  return (
    <div className="bg-white border-b border-[#E4E2DC] sticky top-16 z-30 shadow-[0_2px_12px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-13 gap-4">
          {/* Active Workspace Project Anchor */}
          <div className="flex items-center gap-3 shrink-0 min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse shrink-0" />
              <span className="font-mono text-[10px] text-[#767571] uppercase tracking-widest hidden sm:inline">
                PROJECT WORKSPACE:
              </span>
            </div>
            <span
              className="font-display font-bold text-xs sm:text-sm text-[#111111] truncate max-w-[140px] sm:max-w-[240px] md:max-w-[320px]"
              title={activeProject.title}
            >
              {activeProject.title}
            </span>
            {improvedProject && improvedProject.title === activeProject.title && (
              <span className="px-1.5 py-0.5 rounded bg-[#FFF0E9] text-[#FF5A1F] text-[9px] font-mono font-bold tracking-wider shrink-0">
                HARDENED
              </span>
            )}
          </div>

          {/* Persistent Workspace Stages Tabs */}
          <nav
            aria-label="Project Workspace Navigation"
            className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none py-1"
          >
            {TABS.map((tab) => {
              const isActive = currentTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => navigateTo(tab.route)}
                  className={`px-2.5 sm:px-3.5 py-1.5 rounded-xl font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#111111] text-white font-bold shadow-sm'
                      : 'text-[#5F5F5A] hover:text-[#111111] hover:bg-[#F7F6F2]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={`text-[10px] ${isActive ? 'text-[#FF5A1F]' : 'text-[#767571]'}`}>
                    {tab.num}
                  </span>
                  <span>{tab.label}</span>
                </button>
              )
            })}
          </nav>

          {/* Quick Exit to Directions */}
          <div className="shrink-0 hidden md:block">
            <button
              type="button"
              onClick={() => navigateTo('results')}
              className="font-mono text-[11px] text-[#767571] hover:text-[#111111] uppercase tracking-wider transition-colors cursor-pointer px-2 py-1 rounded hover:bg-[#F7F6F2]"
            >
              ← DIRECTIONS
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
