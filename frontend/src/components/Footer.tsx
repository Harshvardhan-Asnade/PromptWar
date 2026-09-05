import React from 'react'

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-[#1C202A] bg-[#07080A] px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4 font-editorial-mono text-xs text-[#71788E]">
          <span className="text-[#E5A93C]">[PF]</span>
          <span>PROJECT FORGE © 2026</span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">AI CAPSTONE BLUEPRINT PLATFORM</span>
        </div>

        <div className="flex items-center gap-6 font-editorial-mono text-xs text-[#71788E]">
          <span>FASTAPI + REACT + GSAP + LENIS</span>
          <span>V0.1.0</span>
        </div>
      </div>
    </footer>
  )
}
