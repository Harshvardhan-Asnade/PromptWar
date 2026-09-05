import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useDiscovery } from '../context/DiscoveryContext'
import {
  ProjectDnaSidebar,
  StepInterests,
  StepSkills,
  StepExperience,
  StepConstraints,
  ReviewAndGenerate,
  GenerationScreen,
} from '../components/discovery'

const STEP_LABELS = [
  { id: 1, label: '01', name: 'INTERESTS' },
  { id: 2, label: '02', name: 'SKILLS' },
  { id: 3, label: '03', name: 'EXPERIENCE' },
  { id: 4, label: '04', name: 'CONSTRAINTS' },
  { id: 5, label: '05', name: 'REVIEW' },
]

export const DiscoveryPage: React.FC = () => {
  const { step, setStep, prevStep, generationStatus, navigateTo } = useDiscovery()
  const contentRef = useRef<HTMLDivElement>(null)

  // Step transition animation with GSAP & reduced motion check
  useEffect(() => {
    if (!contentRef.current) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion) {
      gsap.set(contentRef.current, { opacity: 1, y: 0 })
      return
    }

    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        duration: 0.35,
        ease: 'power2.out',
      }
    )
  }, [step, generationStatus])

  const renderActiveStep = () => {
    if (generationStatus === 'generating' || generationStatus === 'error') {
      return <GenerationScreen />
    }

    switch (step) {
      case 1:
        return <StepInterests />
      case 2:
        return <StepSkills />
      case 3:
        return <StepExperience />
      case 4:
        return <StepConstraints />
      case 5:
        return <ReviewAndGenerate />
      default:
        return <StepInterests />
    }
  }

  const isGeneratingOrError = generationStatus === 'generating' || generationStatus === 'error'

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#111111] selection:bg-[#FF5A1F]/15 selection:text-[#111111] font-sans">
      {/* Top Discovery Header */}
      <header className="sticky top-0 z-40 bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#E4E2DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand & Technical Label */}
          <div className="flex items-center gap-4">
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

            <span className="hidden sm:inline-block text-[#E4E2DC]">/</span>

            <span className="hidden sm:inline-block font-mono text-[11px] text-[#767571] uppercase tracking-widest">
              DISCOVERY
            </span>
          </div>

          {/* Progress Indicator (01 ── 04) */}
          {!isGeneratingOrError && (
            <div className="flex items-center gap-2 sm:gap-4 font-mono text-xs">
              {STEP_LABELS.slice(0, 4).map((s, idx) => {
                const isActive = step === s.id
                const isPast = step > s.id

                return (
                  <React.Fragment key={s.id}>
                    <button
                      type="button"
                      onClick={() => setStep(s.id)}
                      disabled={isGeneratingOrError}
                      className={`flex items-center gap-1.5 transition-colors ${
                        isActive
                          ? 'text-[#FF5A1F] font-bold'
                          : isPast
                          ? 'text-[#111111] hover:text-[#FF5A1F]'
                          : 'text-[#767571] hover:text-[#111111]'
                      }`}
                      aria-current={isActive ? 'step' : undefined}
                    >
                      <span
                        className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                          isActive
                            ? 'bg-[#FF5A1F] text-white'
                            : isPast
                            ? 'bg-[#111111] text-white'
                            : 'bg-[#E4E2DC] text-[#767571]'
                        }`}
                      >
                        {isPast ? '✓' : s.label}
                      </span>
                      <span className="hidden md:inline text-[11px] tracking-wider">{s.name}</span>
                    </button>
                    {idx < 3 && (
                      <span
                        className={`w-3 sm:w-6 h-[1px] ${
                          step > idx + 1 ? 'bg-[#111111]' : 'bg-[#E4E2DC]'
                        }`}
                      />
                    )}
                  </React.Fragment>
                )
              })}
            </div>
          )}

          {/* Back / Exit control */}
          <div className="flex items-center gap-3">
            {step > 1 && !isGeneratingOrError ? (
              <button
                type="button"
                onClick={prevStep}
                className="px-3 py-1.5 rounded-lg border border-[#E4E2DC] hover:border-[#111111] text-[#5F5F5A] hover:text-[#111111] font-mono text-xs uppercase tracking-wider transition-colors"
              >
                ← BACK
              </button>
            ) : (
              <button
                type="button"
                onClick={() => navigateTo('landing')}
                className="px-3 py-1.5 rounded-lg border border-[#E4E2DC] hover:border-[#111111] text-[#5F5F5A] hover:text-[#111111] font-mono text-xs uppercase tracking-wider transition-colors"
              >
                ← EXIT
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page Intro (only show if not generating or in error mode) */}
        {!isGeneratingOrError && (
          <div className="mb-10 lg:mb-12 border-b border-[#E4E2DC] pb-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
              <span className="font-mono text-xs text-[#FF5A1F] uppercase tracking-widest font-medium">
                PROJECT FORGE / DISCOVERY
              </span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#111111] font-display leading-[1.08]">
                  LET'S FIND
                  <br />
                  WHAT YOU SHOULD
                  <br />
                  <span className="text-[#FF5A1F]">BUILD.</span>
                </h1>
                <p className="mt-4 text-base sm:text-lg text-[#5F5F5A] max-w-xl font-sans">
                  Tell us what you know, what interests you, and what you're working with.
                </p>
              </div>

              {/* Step counter pill */}
              <div className="inline-flex items-center self-start lg:self-end px-4 py-2 rounded-xl bg-white border border-[#E4E2DC] font-mono text-xs tracking-wider shadow-sm">
                <span className="text-[#767571] mr-2">PROGRESS:</span>
                <span className="text-[#FF5A1F] font-bold">0{Math.min(step, 4)}</span>
                <span className="text-[#767571] mx-1">/</span>
                <span className="text-[#111111]">04</span>
                {step === 5 && (
                  <span className="ml-2 px-1.5 py-0.5 rounded bg-[#FFF0E9] text-[#FF5A1F] text-[10px] font-bold">
                    REVIEW
                  </span>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Two-Column Responsive Grid (Discovery Steps + DNA Sidebar) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Main Interactive Stage */}
          <div
            ref={contentRef}
            className={`transition-all ${
              isGeneratingOrError ? 'lg:col-span-12' : 'lg:col-span-8'
            }`}
          >
            {renderActiveStep()}
          </div>

          {/* Real-time Project DNA Sidebar (Hidden on generating) */}
          {!isGeneratingOrError && (
            <div className="lg:col-span-4 lg:sticky lg:top-24">
              <ProjectDnaSidebar />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
