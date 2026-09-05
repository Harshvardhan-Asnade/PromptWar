import React, { useState, useEffect } from 'react'

export interface BlueprintSectionAnchor {
  id: string
  label: string
  num: string
}

const BLUEPRINT_SECTIONS: BlueprintSectionAnchor[] = [
  { id: 'problem', label: 'PROBLEM', num: '01' },
  { id: 'solution', label: 'SOLUTION', num: '02' },
  { id: 'capabilities', label: 'SYSTEM', num: '03' },
  { id: 'tech-stack', label: 'STACK', num: '04' },
  { id: 'architecture', label: 'ARCH', num: '05' },
  { id: 'roadmap', label: 'ROADMAP', num: '06' },
  { id: 'risks', label: 'RISKS', num: '07' },
]

/**
 * Blueprint Navigation Rail (Improvement 08).
 * Desktop: Persistent sticky left vertical navigation rail with active section tracking.
 * Mobile: Compact sticky horizontal navigator.
 */
export const BlueprintWorkspaceRail: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('problem')

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220
      for (const section of BLUEPRINT_SECTIONS) {
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
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      setActiveSection(id)
    }
  }

  return (
    <>
      {/* Mobile Horizontal Sticky Sub-Bar */}
      <div className="lg:hidden sticky top-[108px] z-20 bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#E4E2DC] px-4 py-2 overflow-x-auto scrollbar-none flex items-center gap-2">
        {BLUEPRINT_SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollToSection(sec.id)}
              className={`px-3 py-1.5 rounded-xl font-mono text-[11px] uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer flex items-center gap-1 ${
                isActive
                  ? 'bg-[#111111] text-white font-bold shadow-sm'
                  : 'text-[#5F5F5A] hover:text-[#111111] bg-white border border-[#E4E2DC]'
              }`}
            >
              <span className={isActive ? 'text-[#FF5A1F]' : 'text-[#767571]'}>
                {sec.num}
              </span>
              <span>{sec.label}</span>
            </button>
          )
        })}
      </div>

      {/* Desktop Persistent Sticky Left Navigation Rail */}
      <nav
        aria-label="Blueprint Engineering Workspace Sections"
        className="hidden lg:block w-56 sticky top-36 self-start shrink-0 space-y-1 py-4 pr-4 border-r border-[#E4E2DC]"
      >
        <div className="flex items-center gap-2 px-3 pb-3 mb-2 border-b border-[#E4E2DC]">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
          <span className="font-mono text-[10px] text-[#767571] uppercase tracking-widest font-semibold">
            ENGINEERING RAIL
          </span>
        </div>

        {BLUEPRINT_SECTIONS.map((sec) => {
          const isActive = activeSection === sec.id
          return (
            <button
              key={sec.id}
              type="button"
              onClick={() => scrollToSection(sec.id)}
              className={`w-full px-3.5 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider text-left transition-all cursor-pointer flex items-center justify-between group ${
                isActive
                  ? 'bg-white text-[#111111] font-bold border border-[#111111] shadow-xs'
                  : 'text-[#5F5F5A] hover:text-[#111111] hover:bg-white/60 border border-transparent'
              }`}
              aria-current={isActive ? 'true' : undefined}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`text-[10px] font-bold ${
                    isActive ? 'text-[#FF5A1F]' : 'text-[#767571] group-hover:text-[#111111]'
                  }`}
                >
                  {sec.num}
                </span>
                <span>{sec.label}</span>
              </div>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" aria-hidden="true" />
              )}
            </button>
          )
        })}

        <div className="pt-6 px-3">
          <div className="p-3 bg-white rounded-xl border border-[#E4E2DC] text-[11px] font-mono text-[#767571]">
            <span className="text-[#111111] font-semibold block mb-1">SPEC ACTIVE</span>
            <span>All systems verified for academic execution.</span>
          </div>
        </div>
      </nav>
    </>
  )
}
