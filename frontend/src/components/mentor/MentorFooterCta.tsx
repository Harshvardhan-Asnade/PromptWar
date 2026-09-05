import React from 'react'
import { useDiscovery } from '../../context/DiscoveryContext'

export const MentorFooterCta: React.FC = () => {
  const { navigateTo } = useDiscovery()

  return (
    <section className="mt-16 pt-12 pb-16 border-t border-[#E4E2DC]">
      <div className="max-w-4xl mx-auto text-center px-4">
        <span className="font-mono text-[10px] text-[#767571] uppercase tracking-widest block mb-2">
          PROJECT FORGE WORKFLOW
        </span>
        <h3 className="text-2xl sm:text-3xl font-black font-display text-[#111111] uppercase tracking-tight mb-3">
          READY TO CONTINUE YOUR BUILD?
        </h3>
        <p className="text-sm text-[#5F5F5A] max-w-md mx-auto mb-8 font-sans">
          Jump between the full engineering blueprint, feasibility audit, and architecture strengthening modules anytime.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => navigateTo('blueprint')}
            className="px-6 py-3.5 bg-white text-[#111111] hover:text-[#FF5A1F] border border-[#E4E2DC] hover:border-[#FF5A1F]/40 font-mono text-xs uppercase tracking-wider font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-sm"
          >
            ← FULL BLUEPRINT
          </button>

          <button
            type="button"
            onClick={() => navigateTo('review')}
            className="px-6 py-3.5 bg-white text-[#111111] hover:text-[#FF5A1F] border border-[#E4E2DC] hover:border-[#FF5A1F]/40 font-mono text-xs uppercase tracking-wider font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-sm"
          >
            FEASIBILITY AUDIT →
          </button>

          <button
            type="button"
            onClick={() => navigateTo('improve')}
            className="px-6 py-3.5 bg-[#FF5A1F] text-white hover:bg-[#E04D16] font-mono text-xs uppercase tracking-wider font-semibold rounded-xl transition-all duration-200 cursor-pointer shadow-md hover:shadow-lg"
          >
            STRENGTHEN PROJECT ⚡
          </button>
        </div>
      </div>
    </section>
  )
}
