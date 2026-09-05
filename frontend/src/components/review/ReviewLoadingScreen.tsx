import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../../lib/motion'

interface ReviewLoadingScreenProps {
  currentStep: number // 0 to 4
}

const AUDIT_STAGES = [
  { id: 0, label: 'CHECKING PROJECT SCOPE', detail: 'Verifying feature boundaries against chosen duration' },
  { id: 1, label: 'CHECKING FEASIBILITY', detail: 'Auditing resource availability, data dependencies, and constraints' },
  { id: 2, label: 'ASSESSING TECHNICAL DEPTH', detail: 'Evaluating architectural complexity, algorithms, and stack fit' },
  { id: 3, label: 'CHECKING ALIGNMENT', detail: 'Comparing requirements against student skills and experience level' },
  { id: 4, label: 'PREPARING RECOMMENDATIONS', detail: 'Formulating strategic adjustments and defense talking points' },
]

export const ReviewLoadingScreen: React.FC<ReviewLoadingScreenProps> = ({ currentStep }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const activeStepRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (activeStepRef.current && !prefersReducedMotion()) {
      gsap.fromTo(
        activeStepRef.current,
        { opacity: 0.4, y: 4 },
        { opacity: 1, y: 0, duration: 0.35, ease: 'power2.out' }
      )
    }
  }, [currentStep])

  const safeStep = Math.min(Math.max(currentStep, 0), AUDIT_STAGES.length - 1)
  const activeStage = AUDIT_STAGES[safeStep]
  const progressPercent = Math.round(((safeStep + 1) / AUDIT_STAGES.length) * 100)

  return (
    <div
      ref={containerRef}
      role="status"
      aria-live="polite"
      className="my-12 py-16 px-6 sm:px-12 bg-white border border-[#E4E2DC] rounded-3xl shadow-sm text-center max-w-3xl mx-auto relative overflow-hidden"
    >
      {/* Subtle top progress bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#E4E2DC]">
        <div
          className="h-full bg-[#FF5A1F] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      <div className="mb-6">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E9] text-[#FF5A1F] font-mono text-xs font-bold uppercase tracking-wider">
          <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-ping" />
          ANALYZING PROJECT
        </span>
      </div>

      <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-[#111111] mb-2 tracking-tight uppercase">
        RUNNING FEASIBILITY ENGINE
      </h3>
      <p className="text-sm text-[#5F5F5A] max-w-md mx-auto mb-10 font-sans">
        Benchmarking architectural scope, potential failure modes, and delivery risks.
      </p>

      {/* High-level status sequence */}
      <div className="max-w-md mx-auto text-left space-y-3 mb-10">
        {AUDIT_STAGES.map((stage, idx) => {
          const isDone = idx < safeStep
          const isCurrent = idx === safeStep

          return (
            <div
              key={stage.id}
              ref={isCurrent ? activeStepRef : undefined}
              className={`p-3.5 rounded-2xl transition-all duration-300 border flex items-center justify-between ${
                isCurrent
                  ? 'bg-[#FFF0E9] border-[#FF5A1F]/40 shadow-xs'
                  : isDone
                  ? 'bg-[#F7F6F2] border-transparent opacity-85'
                  : 'bg-transparent border-transparent opacity-35'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold ${
                    isDone
                      ? 'bg-[#111111] text-white'
                      : isCurrent
                      ? 'bg-[#FF5A1F] text-white animate-pulse'
                      : 'bg-[#E4E2DC] text-[#5F5F5A]'
                  }`}
                >
                  {isDone ? '✓' : `0${idx + 1}`}
                </span>
                <div>
                  <div
                    className={`font-mono text-xs uppercase tracking-wider font-bold ${
                      isCurrent ? 'text-[#FF5A1F]' : isDone ? 'text-[#111111]' : 'text-[#5F5F5A]'
                    }`}
                  >
                    {stage.label}
                  </div>
                  {isCurrent && (
                    <div className="text-[11px] text-[#5F5F5A] mt-0.5 font-sans">
                      {stage.detail}
                    </div>
                  )}
                </div>
              </div>

              <div className="font-mono text-[10px] uppercase tracking-wider text-[#5F5F5A]">
                {isDone ? 'PASSED' : isCurrent ? 'RUNNING' : 'QUEUED'}
              </div>
            </div>
          )
        })}
      </div>

      <div className="font-mono text-xs text-[#5F5F5A]">
        ACTIVE PHASE: <span className="text-[#FF5A1F] font-bold">{activeStage.label}</span>
      </div>
    </div>
  )
}
