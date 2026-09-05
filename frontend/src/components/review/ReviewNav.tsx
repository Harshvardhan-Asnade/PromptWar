import React from 'react'
import { useDiscovery } from '../../context/DiscoveryContext'

export const ReviewNav: React.FC = () => {
  const { navigateTo, selectedProject } = useDiscovery()

  return (
    <header className="sticky top-0 z-40 bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#E4E2DC]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo('landing')}
            className="group flex items-center gap-2 text-left cursor-pointer"
          >
            <div className="w-7 h-7 bg-[#FF5A1F] rounded flex items-center justify-center text-white font-mono font-bold text-xs">
              PF
            </div>
            <span className="font-display font-black text-sm tracking-tight text-[#111111] group-hover:text-[#FF5A1F] transition-colors">
              PROJECT FORGE
            </span>
          </button>
          <span className="text-[#E4E2DC]">/</span>
          <span className="font-mono text-xs text-[#5F5F5A] uppercase tracking-widest hidden sm:inline">
            AI PROJECT AUDIT
          </span>
          {selectedProject && (
            <>
              <span className="text-[#E4E2DC] hidden md:inline">/</span>
              <span className="font-mono text-xs text-[#FF5A1F] font-bold uppercase tracking-wider hidden md:inline truncate max-w-[200px]">
                {selectedProject.title}
              </span>
            </>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={() => navigateTo('blueprint')}
            className="px-3 sm:px-4 py-2 rounded-xl border border-[#E4E2DC] hover:border-[#111111] bg-white text-[#111111] font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <span>←</span>
            <span className="hidden sm:inline">BACK TO</span>
            <span>BLUEPRINT</span>
          </button>
        </div>
      </div>
    </header>
  )
}
