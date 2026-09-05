import React from 'react'
import { useDiscovery } from '../../context/DiscoveryContext'

export const BlueprintFooterCta: React.FC = () => {
  const { navigateTo } = useDiscovery()

  return (
    <section className="py-20 text-center">
      <div className="max-w-3xl mx-auto bg-[#111111] text-white rounded-3xl p-10 sm:p-16 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5A1F]/10 rounded-full blur-3xl pointer-events-none" />

        <span className="inline-block px-3 py-1 rounded-full bg-[#FF5A1F] text-white font-mono text-xs font-bold uppercase tracking-widest mb-6">
          ENGINEERING BLUEPRINT COMPLETE
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.1] mb-6">
          YOU HAVE THE BLUEPRINT.
          <br />
          <span className="text-[#FF5A1F]">NOW BUILD IT.</span>
        </h2>

        <p className="text-sm sm:text-base text-[#E4E2DC]/80 font-sans max-w-lg mx-auto mb-10 leading-relaxed">
          Your project scope is locked, your architecture is defined, and your sprint roadmap is sequenced. Transform this blueprint into your final-year reality.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => navigateTo('review')}
            className="w-full sm:w-auto px-8 py-4 bg-[#FF5A1F] hover:bg-[#E04D16] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-2xl transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer"
          >
            REVIEW MY PROJECT →
          </button>

          <button
            type="button"
            onClick={() => navigateTo('mentor')}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-mono text-xs uppercase tracking-widest rounded-2xl transition-all cursor-pointer"
          >
            ASK YOUR MENTOR →
          </button>
        </div>
      </div>
    </section>
  )
}
