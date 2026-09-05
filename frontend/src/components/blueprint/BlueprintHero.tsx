import React from 'react'
import type { ProjectIdea } from '../../types/discovery'
import { useDiscovery } from '../../context/DiscoveryContext'

interface BlueprintHeroProps {
  project: ProjectIdea
  index: number
}

export const BlueprintHero: React.FC<BlueprintHeroProps> = ({ project, index }) => {
  const { navigateTo } = useDiscovery()

  const overallStrength = Math.round(
    (project.innovation_score +
      project.feasibility_score +
      project.impact_score +
      project.technical_depth_score) /
      4
  )

  const scrollToBuild = () => {
    const el = document.getElementById('build-order')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <section className="pt-10 sm:pt-14 pb-12 border-b border-[#E4E2DC]">
      {/* Top technical label & difficulty */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#FFF0E9] border border-[#FF5A1F]/30 text-[#FF5A1F] font-mono text-xs font-bold uppercase tracking-wider">
            PROJECT FORGE / BLUEPRINT / 0{index + 1}
          </span>
          <span className="px-3 py-1 rounded-full bg-white border border-[#E4E2DC] text-[#111111] font-mono text-xs uppercase tracking-wider">
            {project.difficulty}
          </span>
        </div>

        {/* Compact Project Potential */}
        <div className="inline-flex items-center gap-3 bg-white border border-[#E4E2DC] px-4 py-2 rounded-2xl font-mono text-xs shadow-sm">
          <span className="text-[#767571] uppercase">PROJECT POTENTIAL:</span>
          <span className="font-bold text-[#FF5A1F] text-sm">{overallStrength} / 100</span>
        </div>
      </div>

      {/* Main Title & Tagline */}
      <div className="max-w-4xl">
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#111111] font-display leading-[1.05]">
          {project.title}
        </h1>
        <p className="mt-5 text-base sm:text-xl font-mono text-[#5F5F5A] leading-relaxed">
          {project.tagline}
        </p>
      </div>

      {/* Metric Signals Bar */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
        <div className="bg-white border border-[#E4E2DC] rounded-xl p-3">
          <span className="block text-[10px] font-mono text-[#767571] uppercase">INNOVATION</span>
          <span className="text-sm font-mono font-bold text-[#111111]">
            {project.innovation_score}/100
          </span>
        </div>
        <div className="bg-white border border-[#E4E2DC] rounded-xl p-3">
          <span className="block text-[10px] font-mono text-[#767571] uppercase">FEASIBILITY</span>
          <span className="text-sm font-mono font-bold text-[#111111]">
            {project.feasibility_score}/100
          </span>
        </div>
        <div className="bg-white border border-[#E4E2DC] rounded-xl p-3">
          <span className="block text-[10px] font-mono text-[#767571] uppercase">IMPACT</span>
          <span className="text-sm font-mono font-bold text-[#111111]">
            {project.impact_score}/100
          </span>
        </div>
        <div className="bg-white border border-[#E4E2DC] rounded-xl p-3">
          <span className="block text-[10px] font-mono text-[#767571] uppercase">TECH DEPTH</span>
          <span className="text-sm font-mono font-bold text-[#111111]">
            {project.technical_depth_score}/100
          </span>
        </div>
      </div>

      {/* Hero CTA Actions */}
      <div className="mt-10 flex flex-wrap items-center gap-4">
        <button
          type="button"
          onClick={scrollToBuild}
          className="px-8 py-4 bg-[#FF5A1F] hover:bg-[#E04D16] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-2xl transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 cursor-pointer"
        >
          <span>START BUILDING</span>
          <span>↓</span>
        </button>

        <button
          type="button"
          onClick={() => navigateTo('project-detail')}
          className="px-6 py-4 bg-white border border-[#E4E2DC] hover:border-[#111111] text-[#5F5F5A] hover:text-[#111111] font-mono text-xs uppercase tracking-wider rounded-2xl transition-colors cursor-pointer"
        >
          ← BACK TO PROJECT
        </button>
      </div>
    </section>
  )
}
