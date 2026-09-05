import React from 'react'
import { useDiscovery } from '../../context/DiscoveryContext'
import { Badge } from '../ui/Badge'
import { useApiHealth } from '../../hooks/useApiHealth'

interface MentorNavProps {
  projectTitle?: string
}

export const MentorNav: React.FC<MentorNavProps> = ({ projectTitle }) => {
  const { navigateTo } = useDiscovery()
  const { status, latencyMs } = useApiHealth()

  return (
    <header className="sticky top-0 z-40 bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#E4E2DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Editorial Breadcrumb */}
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <button
            type="button"
            onClick={() => navigateTo('landing')}
            className="group flex items-center gap-2 text-left shrink-0 cursor-pointer"
            aria-label="Project Forge Home"
          >
            <div className="w-7 h-7 bg-[#FF5A1F] rounded flex items-center justify-center text-white font-mono font-bold text-xs">
              PF
            </div>
            <span className="hidden sm:inline-block font-display font-black text-sm tracking-tight text-[#111111] group-hover:text-[#FF5A1F] transition-colors">
              PROJECT FORGE
            </span>
          </button>

          <span className="text-[#E4E2DC] shrink-0">/</span>

          <span className="font-mono text-[11px] text-[#767571] uppercase tracking-widest shrink-0">
            AI MENTOR
          </span>

          {projectTitle && (
            <>
              <span className="hidden md:inline-block text-[#E4E2DC] shrink-0">/</span>
              <span className="hidden md:inline-block font-mono text-[11px] text-[#111111] font-semibold truncate max-w-[220px]">
                {projectTitle}
              </span>
            </>
          )}
        </div>

        {/* Right Navigation Controls */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <div className="hidden sm:block">
            <Badge
              variant={
                status === 'success'
                  ? 'success'
                  : status === 'loading'
                  ? 'warning'
                  : 'error'
              }
              dot
            >
              {status === 'success'
                ? `Advisor Active${latencyMs ? ` · ${latencyMs}ms` : ''}`
                : 'Connecting'}
            </Badge>
          </div>

          <button
            type="button"
            onClick={() => navigateTo('blueprint')}
            className="px-3 sm:px-4 py-2 bg-white text-[#111111] hover:text-[#FF5A1F] border border-[#E4E2DC] hover:border-[#FF5A1F]/40 font-mono text-[11px] uppercase tracking-wider font-semibold rounded-lg transition-all duration-200 cursor-pointer"
          >
            ← BLUEPRINT
          </button>
        </div>
      </div>
    </header>
  )
}
