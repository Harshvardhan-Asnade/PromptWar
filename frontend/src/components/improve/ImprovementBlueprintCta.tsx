import React from 'react'
import { useDiscovery } from '../../context/DiscoveryContext'

interface ImprovementBlueprintCtaProps {
  onRunImprovementAgain: () => void
  isImproving: boolean
}

export const ImprovementBlueprintCta: React.FC<ImprovementBlueprintCtaProps> = ({
  onRunImprovementAgain,
  isImproving,
}) => {
  const { acceptImprovedProject, navigateTo } = useDiscovery()

  return (
    <section className="py-20 text-center">
      <div className="max-w-3xl mx-auto bg-[#111111] text-white rounded-3xl p-10 sm:p-16 shadow-2xl relative overflow-hidden">
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF5A1F]/15 rounded-full blur-3xl pointer-events-none" />

        <span className="inline-block px-3 py-1 rounded-full bg-[#FF5A1F] text-white font-mono text-xs font-bold uppercase tracking-widest mb-6">
          IMPROVEMENT PHASE COMPLETE
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight leading-[1.1] mb-6 uppercase">
          YOUR BLUEPRINT <br />
          <span className="text-[#FF5A1F]">IS NOW HARDENED.</span>
        </h2>

        <p className="text-sm sm:text-base text-[#E4E2DC]/80 font-sans max-w-lg mx-auto mb-10 leading-relaxed">
          Proceed with an upgraded engineering specification that protects your viva defense, balances technical ambition, and guarantees practical execution.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
          <button
            type="button"
            onClick={acceptImprovedProject}
            className="w-full sm:w-auto px-8 py-4 bg-[#FF5A1F] hover:bg-[#E04D16] text-white font-mono text-xs font-bold uppercase tracking-widest rounded-2xl transition-all duration-200 shadow-md hover:shadow-xl cursor-pointer"
          >
            EXPLORE IMPROVED BLUEPRINT →
          </button>

          <button
            type="button"
            onClick={() => navigateTo('mentor')}
            className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-mono text-xs uppercase tracking-widest rounded-2xl transition-all cursor-pointer"
          >
            ASK AI MENTOR →
          </button>

          <button
            type="button"
            onClick={() => navigateTo('review')}
            className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 text-[#E4E2DC] border border-white/10 font-mono text-xs uppercase tracking-widest rounded-2xl transition-all cursor-pointer"
          >
            ← BACK TO AUDIT
          </button>
        </div>

        {/* Retry option */}
        <div>
          <button
            type="button"
            onClick={onRunImprovementAgain}
            disabled={isImproving}
            className="text-xs font-mono text-[#E4E2DC]/60 hover:text-white uppercase tracking-wider transition-colors underline underline-offset-4 cursor-pointer disabled:opacity-50"
          >
            RUN IMPROVEMENT ENGINE AGAIN ↻
          </button>
        </div>
      </div>
    </section>
  )
}
