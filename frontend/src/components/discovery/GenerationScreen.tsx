import React from 'react'
import { useDiscovery } from '../../context/DiscoveryContext'

const STAGES = [
  { id: 0, label: '01', title: 'UNDERSTANDING YOUR PROFILE', subtitle: 'Analyzing technical domains, background, and constraints' },
  { id: 1, label: '02', title: 'MATCHING YOUR SKILLS', subtitle: 'Mapping your stack to industry-grade technical architectures' },
  { id: 2, label: '03', title: 'EXPLORING PROJECT DIRECTIONS', subtitle: 'Synthesizing novel, high-impact problem statements' },
  { id: 3, label: '04', title: 'BUILDING POSSIBILITIES', subtitle: 'Structuring 3 personalized engineering blueprints' },
]

export const GenerationScreen: React.FC = () => {
  const { generationStatus, generationStep, errorMessage, triggerGeneration, setStep } = useDiscovery()

  if (generationStatus === 'error') {
    return (
      <div className="w-full max-w-2xl mx-auto py-16 px-6 text-center animate-fadeIn">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E9] border border-[#FF5A1F]/30 text-[#FF5A1F] text-xs font-mono uppercase tracking-widest mb-6">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-ping" />
          GENERATION INTERRUPTED
        </div>

        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#111111] mb-4 font-display">
          WE COULDN'T FIND YOUR PROJECTS.
        </h2>

        <p className="text-base md:text-lg text-[#5F5F5A] max-w-md mx-auto mb-8 font-sans">
          Something went wrong while generating your project directions. Your profile selections have been safely preserved.
        </p>

        {errorMessage && (
          <div className="p-4 mb-8 bg-[#F7F6F2] border border-[#E4E2DC] rounded-xl text-left max-w-lg mx-auto">
            <span className="text-[11px] font-mono text-[#767571] uppercase tracking-wider block mb-1">
              SYSTEM NOTE
            </span>
            <p className="text-xs font-mono text-[#111111] break-all">{errorMessage}</p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => triggerGeneration()}
            className="w-full sm:w-auto px-8 py-4 bg-[#FF5A1F] text-white font-medium text-sm tracking-wide rounded-full hover:bg-[#E04D16] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/50 flex items-center justify-center gap-2"
          >
            <span>TRY AGAIN</span>
            <span>↻</span>
          </button>

          <button
            type="button"
            onClick={() => setStep(5)}
            className="w-full sm:w-auto px-6 py-4 bg-white text-[#5F5F5A] hover:text-[#111111] border border-[#E4E2DC] hover:border-[#111111] font-medium text-sm tracking-wide rounded-full transition-all duration-200"
          >
            ← REVIEW PROFILE
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full max-w-2xl mx-auto py-12 px-6 text-center animate-fadeIn">
      {/* Top pill */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF0E9] border border-[#FF5A1F]/20 text-[#FF5A1F] text-xs font-mono uppercase tracking-widest mb-8">
        <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
        AI SYNTHESIS IN PROGRESS
      </div>

      <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#111111] mb-3 font-display">
        FORGING YOUR PATH.
      </h2>
      <p className="text-sm md:text-base text-[#5F5F5A] mb-12 max-w-md mx-auto">
        Evaluating high-impact engineering combinations tailored to your skills and available timeline.
      </p>

      {/* Cinematic Stages Checklist */}
      <div className="bg-white border border-[#E4E2DC] rounded-2xl p-6 md:p-8 shadow-sm text-left mb-10 space-y-5">
        {STAGES.map((s) => {
          const isDone = generationStep > s.id
          const isCurrent = generationStep === s.id

          return (
            <div
              key={s.id}
              className={`flex items-start gap-4 p-3 rounded-xl transition-all duration-500 ${
                isCurrent
                  ? 'bg-[#FFF0E9]/50 border border-[#FF5A1F]/30 scale-[1.01]'
                  : isDone
                  ? 'opacity-80'
                  : 'opacity-35'
              }`}
            >
              {/* Step indicator bubble */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 transition-colors ${
                  isDone
                    ? 'bg-[#111111] text-white'
                    : isCurrent
                    ? 'bg-[#FF5A1F] text-white shadow-sm'
                    : 'bg-[#F7F6F2] text-[#767571] border border-[#E4E2DC]'
                }`}
              >
                {isDone ? '✓' : s.label}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3
                    className={`text-sm md:text-base font-bold tracking-tight font-display ${
                      isCurrent ? 'text-[#FF5A1F]' : isDone ? 'text-[#111111]' : 'text-[#767571]'
                    }`}
                  >
                    {s.title}
                  </h3>
                  {isCurrent && (
                    <span className="text-[10px] font-mono text-[#FF5A1F] tracking-widest uppercase animate-pulse">
                      PROCESSING...
                    </span>
                  )}
                  {isDone && (
                    <span className="text-[10px] font-mono text-[#5F5F5A] tracking-wider uppercase">
                      COMPLETE
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#5F5F5A] mt-0.5 font-sans line-clamp-1">{s.subtitle}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Progress line */}
      <div className="w-full bg-[#E4E2DC] h-1.5 rounded-full overflow-hidden">
        <div
          className="bg-[#FF5A1F] h-full transition-all duration-700 ease-out"
          style={{ width: `${Math.min(100, (generationStep + 1) * 25)}%` }}
        />
      </div>

      <p className="text-[11px] font-mono text-[#767571] mt-4 uppercase tracking-wider">
        PROJECT FORGE INTELLIGENCE ENGINE &bull; 3 PROJECT BLUEPRINTS
      </p>
    </div>
  )
}
