import React, { useEffect, useState } from 'react'
import { prefersReducedMotion } from '../../lib/motion'

export interface ThinkingStep {
  label: string
  detail?: string
}

export interface AIThinkingAnimationProps {
  title?: string
  subtext?: string
  badgeText?: string
  steps: (string | ThinkingStep)[]
  currentStep?: number
  compact?: boolean
  className?: string
  /** Auto-cycle step if currentStep is not externally driven */
  autoCycle?: boolean
  autoCycleInterval?: number
}

/**
 * Global Unified AI Thinking System for Project Forge.
 * Visual concept:
 * An abstract orange Forge mark / node system that expands, connects,
 * compresses, and resolves while rotating through workflow stages.
 * Fully accessible with role="status" and aria-live="polite".
 */
export const AIThinkingAnimation: React.FC<AIThinkingAnimationProps> = ({
  title = 'FORGING RECOMMENDATION',
  subtext = 'Analyzing project requirements and synthesizing technical guidance.',
  badgeText = 'AI SYNTHESIS IN PROGRESS',
  steps,
  currentStep: controlledStep,
  compact = false,
  className = '',
  autoCycle = false,
  autoCycleInterval = 2200,
}) => {
  const [internalStep, setInternalStep] = useState(0)
  const reducedMotion = prefersReducedMotion()

  const normalizedSteps: ThinkingStep[] = steps.map((s) =>
    typeof s === 'string' ? { label: s } : s
  )

  useEffect(() => {
    if (!autoCycle || controlledStep !== undefined) return

    const interval = setInterval(() => {
      setInternalStep((prev) => (prev + 1) % normalizedSteps.length)
    }, autoCycleInterval)

    return () => clearInterval(interval)
  }, [autoCycle, controlledStep, normalizedSteps.length, autoCycleInterval])

  const activeIndex =
    controlledStep !== undefined
      ? Math.min(Math.max(0, controlledStep), normalizedSteps.length - 1)
      : internalStep

  const activeStep = normalizedSteps[activeIndex] || normalizedSteps[0]
  const progressPercent = Math.round(
    ((activeIndex + 1) / Math.max(normalizedSteps.length, 1)) * 100
  )

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`${badgeText}: ${activeStep?.label || title}`}
      className={`relative overflow-hidden border border-[#E4E2DC] bg-white rounded-3xl text-center select-none shadow-[0_4px_24px_rgba(0,0,0,0.03)] ${
        compact ? 'p-6 max-w-xl mx-auto' : 'my-8 py-12 px-6 sm:px-12 max-w-2xl mx-auto'
      } ${className}`}
    >
      {/* Top accent progress track */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#E4E2DC]/70" aria-hidden="true">
        <div
          className="h-full bg-[#FF5A1F] transition-all duration-500 ease-out"
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Abstract Forge Geometric Node Visualization */}
      <div className="flex justify-center mb-6" aria-hidden="true">
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
          {/* Ambient outer pulse halo */}
          <div
            className={`absolute inset-0 rounded-full bg-[#FF5A1F]/10 blur-xl transition-all duration-700 ${
              reducedMotion ? 'opacity-30' : 'animate-pulse'
            }`}
          />

          {/* SVG Abstract Forge Node System */}
          <svg
            viewBox="0 0 120 120"
            className="w-full h-full relative z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer rotating/pulsing ring lattice */}
            <circle
              cx="60"
              cy="60"
              r="46"
              stroke="#E4E2DC"
              strokeWidth="1.5"
              strokeDasharray="4 4"
              className={reducedMotion ? '' : 'origin-center animate-[spin_24s_linear_infinite]'}
            />

            {/* Inner dynamic orbital circle */}
            <circle
              cx="60"
              cy="60"
              r="34"
              stroke="#FF5A1F"
              strokeWidth="1.5"
              strokeOpacity="0.3"
              strokeDasharray="8 6"
              className={reducedMotion ? '' : 'origin-center animate-[spin_12s_linear_infinite_reverse]'}
            />

            {/* Cross connection lines between nodes */}
            <line x1="30" y1="30" x2="90" y2="90" stroke="#FF5A1F" strokeOpacity="0.2" strokeWidth="1.2" />
            <line x1="90" y1="30" x2="30" y2="90" stroke="#FF5A1F" strokeOpacity="0.2" strokeWidth="1.2" />
            <line x1="60" y1="20" x2="60" y2="100" stroke="#111111" strokeOpacity="0.15" strokeWidth="1" />
            <line x1="20" y1="60" x2="100" y2="60" stroke="#111111" strokeOpacity="0.15" strokeWidth="1" />

            {/* Central Forge Anvil / Diamond Spark */}
            <g className="origin-center">
              <rect
                x="52"
                y="52"
                width="16"
                height="16"
                rx="3"
                transform="rotate(45 60 60)"
                fill="#FF5A1F"
                className={reducedMotion ? '' : 'animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite] opacity-60'}
              />
              <rect
                x="53"
                y="53"
                width="14"
                height="14"
                rx="3"
                transform="rotate(45 60 60)"
                fill="#111111"
              />
              <circle cx="60" cy="60" r="3" fill="#FF5A1F" />
            </g>

            {/* 4 Orbital Forge Nodes */}
            {/* North Node */}
            <circle
              cx="60"
              cy="20"
              r={activeIndex === 0 ? '5.5' : '4'}
              fill={activeIndex === 0 ? '#FF5A1F' : '#111111'}
              className="transition-all duration-300"
            />
            {/* East Node */}
            <circle
              cx="100"
              cy="60"
              r={activeIndex === 1 ? '5.5' : '4'}
              fill={activeIndex === 1 ? '#FF5A1F' : '#111111'}
              className="transition-all duration-300"
            />
            {/* South Node */}
            <circle
              cx="60"
              cy="100"
              r={activeIndex === 2 ? '5.5' : '4'}
              fill={activeIndex === 2 ? '#FF5A1F' : '#111111'}
              className="transition-all duration-300"
            />
            {/* West Node */}
            <circle
              cx="20"
              cy="60"
              r={activeIndex === 3 ? '5.5' : '4'}
              fill={activeIndex === 3 ? '#FF5A1F' : '#111111'}
              className="transition-all duration-300"
            />
          </svg>
        </div>
      </div>

      {/* Status Badge */}
      <div className="mb-3">
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E9] border border-[#FF5A1F]/25 text-[#FF5A1F] font-mono text-[11px] font-bold uppercase tracking-widest">
          <span
            className={`w-2 h-2 rounded-full bg-[#FF5A1F] ${
              reducedMotion ? '' : 'animate-ping'
            }`}
          />
          {badgeText}
        </span>
      </div>

      {/* Main Title & Subtitle */}
      <h3 className="text-xl sm:text-2xl md:text-3xl font-black font-display text-[#111111] mb-2 tracking-tight uppercase">
        {title}
      </h3>
      {subtext && (
        <p className="text-xs sm:text-sm text-[#5F5F5A] max-w-md mx-auto mb-8 font-sans">
          {subtext}
        </p>
      )}

      {/* Dynamic Staged Progression List */}
      <div className="max-w-md mx-auto text-left space-y-2.5 mb-2">
        {normalizedSteps.map((step, idx) => {
          const isDone = idx < activeIndex
          const isCurrent = idx === activeIndex

          return (
            <div
              key={idx}
              className={`flex items-start gap-3.5 p-3 rounded-xl transition-all duration-300 ${
                isCurrent
                  ? 'bg-[#FFF0E9]/60 border border-[#FF5A1F]/30 shadow-sm translate-x-0.5'
                  : isDone
                  ? 'bg-transparent opacity-75'
                  : 'bg-transparent opacity-30'
              }`}
            >
              {/* Step indicator node */}
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center font-mono text-[11px] font-bold shrink-0 transition-colors ${
                  isDone
                    ? 'bg-[#111111] text-white'
                    : isCurrent
                    ? 'bg-[#FF5A1F] text-white shadow-sm'
                    : 'bg-[#F7F6F2] text-[#767571] border border-[#E4E2DC]'
                }`}
              >
                {isDone ? '✓' : `0${idx + 1}`}
              </div>

              {/* Step label and detail */}
              <div className="flex-1 min-w-0 pt-0.5">
                <div className="flex items-center justify-between gap-2">
                  <p
                    className={`font-mono text-xs uppercase tracking-wider font-semibold truncate ${
                      isCurrent ? 'text-[#FF5A1F]' : 'text-[#111111]'
                    }`}
                  >
                    {step.label}
                  </p>
                  {isCurrent && (
                    <span className="shrink-0 font-mono text-[10px] text-[#FF5A1F] font-bold animate-pulse">
                      PROCESSING
                    </span>
                  )}
                  {isDone && (
                    <span className="shrink-0 font-mono text-[10px] text-[#767571] uppercase">
                      COMPLETE
                    </span>
                  )}
                </div>
                {step.detail && (
                  <p className="text-[11px] text-[#767571] mt-0.5 leading-snug">
                    {step.detail}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-[#E4E2DC]/60 flex items-center justify-between text-[11px] font-mono text-[#767571]">
        <span>PROJECT FORGE REASONING CORE</span>
        <span>STAGE 0{activeIndex + 1} / 0{normalizedSteps.length}</span>
      </div>
    </div>
  )
}
