import React, { useState, useEffect } from 'react'
import { useDiscovery } from '../../context/DiscoveryContext'

const SECTIONS = [
  { id: 'problem', label: '01 Problem' },
  { id: 'solution', label: '02 Solution' },
  { id: 'capabilities', label: '03 Capabilities' },
  { id: 'tech-stack', label: '04 Stack' },
  { id: 'architecture', label: '05 Architecture' },
  { id: 'roadmap', label: '06 Roadmap' },
  { id: 'resources', label: '07 Resources' },
  { id: 'risks', label: '08 Risks' },
  { id: 'build-order', label: '09 Build Order' },
]

export const BlueprintNav: React.FC = () => {
  const { navigateTo } = useDiscovery()
  const [activeSection, setActiveSection] = useState<string>('problem')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200
      for (const section of SECTIONS) {
        const el = document.getElementById(section.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      {/* Sticky Top Bar */}
      <header className="sticky top-0 z-40 bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#E4E2DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('landing')}
              className="group flex items-center gap-2 text-left"
            >
              <div className="w-7 h-7 bg-[#FF5A1F] rounded flex items-center justify-center text-white font-mono font-bold text-xs">
                PF
              </div>
              <span className="font-display font-black text-sm tracking-tight text-[#111111] group-hover:text-[#FF5A1F] transition-colors">
                PROJECT FORGE
              </span>
            </button>
            <span className="text-[#E4E2DC]">/</span>
            <span className="font-mono text-xs text-[#767571] uppercase tracking-widest hidden sm:inline">
              ENGINEERING BLUEPRINT
            </span>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigateTo('project-detail')}
              className="px-3 sm:px-4 py-2 rounded-xl border border-[#E4E2DC] hover:border-[#111111] bg-white text-[#111111] font-mono text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5"
            >
              <span>←</span>
              <span className="hidden sm:inline">BACK TO</span>
              <span>PROJECT</span>
            </button>

            <button
              type="button"
              onClick={() => scrollToSection('build-order')}
              className="px-3 sm:px-4 py-2 rounded-xl bg-[#111111] hover:bg-[#FF5A1F] text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              BUILD ORDER ↓
            </button>

            <button
              type="button"
              onClick={() => navigateTo('mentor')}
              className="px-3 sm:px-4 py-2 rounded-xl bg-[#FFF0E9] hover:bg-[#FF5A1F] text-[#FF5A1F] hover:text-white border border-[#FF5A1F]/30 font-mono text-xs uppercase tracking-wider font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>AI MENTOR</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </div>

        {/* Sub-header horizontal section slider (Mobile & Desktop) */}
        <div className="border-t border-[#E4E2DC]/80 bg-[#F7F6F2]/80 px-4 sm:px-6 lg:px-8 py-2 overflow-x-auto scrollbar-none flex items-center gap-2">
          {SECTIONS.map((s) => {
            const isActive = activeSection === s.id
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => scrollToSection(s.id)}
                className={`px-3 py-1 rounded-full font-mono text-[11px] uppercase tracking-wider whitespace-nowrap transition-all ${
                  isActive
                    ? 'bg-[#FF5A1F] text-white font-bold shadow-sm'
                    : 'text-[#767571] hover:text-[#111111] hover:bg-[#E4E2DC]/40'
                }`}
              >
                {s.label}
              </button>
            )
          })}
        </div>
      </header>
    </>
  )
}
