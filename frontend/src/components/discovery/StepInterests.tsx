import React from 'react'
import { useDiscovery } from '../../context/DiscoveryContext'
import { Button } from '../ui/Button'

/**
 * STEP 01 — INTERESTS
 * "WHAT ARE YOU CURIOUS ABOUT?"
 * Multi-select editorial domain grid.
 */
export const StepInterests: React.FC = () => {
  const { profile, toggleInterest, nextStep } = useDiscovery()

  const interestOptions = [
    { label: 'AI / ML', icon: '🤖', description: 'Intelligent inference & autonomous systems' },
    { label: 'WEB SYSTEMS', icon: '🌐', description: 'High-scale web platforms & distributed microservices' },
    { label: 'CYBERSECURITY', icon: '🛡️', description: 'Consensus protocols, cryptography & vulnerability analysis' },
    { label: 'DATA ENGINEERING', icon: '📊', description: 'Real-time telemetry streams & analytics pipelines' },
    { label: 'ROBOTICS', icon: '⚙️', description: 'Hardware control, autonomous navigation & kinematics' },
    { label: 'HEALTHCARE', icon: '🩺', description: 'Clinical decision engines & diagnostic assistance' },
    { label: 'FINTECH', icon: '💳', description: 'Algorithmic trading, fraud detection & ledger systems' },
    { label: 'EDUCATION TECH', icon: '📚', description: 'Adaptive learning environments & automated grading' },
    { label: 'AGRICULTURE & CLIMATE', icon: '🌱', description: 'Environmental modeling & automated precision yield' },
    { label: 'IOT & EMBEDDED', icon: '📡', description: 'Sensors, microcontrollers & edge computing' },
    { label: 'CLOUD PLATFORMS', icon: '☁️', description: 'Container orchestration, serverless & DevOps' },
    { label: 'COMPUTER VISION', icon: '👁️', description: 'Object segmentation, tracking & spatial computing' },
  ]

  const isValid = profile.interests.length >= 1

  return (
    <div className="space-y-8">
      {/* Title & Guidance */}
      <div>
        <span className="font-mono text-xs font-semibold text-accent uppercase tracking-widest block mb-2">
          STEP 01 // DOMAIN CURIOSITY
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-fg tracking-tight mb-4">
          WHAT ARE YOU CURIOUS ABOUT?
        </h2>
        <p className="type-body text-fg-secondary text-base md:text-lg">
          Select one or more sectors that genuinely interest you. Your project blueprint will be
          grounded in these real-world problem domains.
        </p>
      </div>

      {/* Editorial Selection Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
        {interestOptions.map((item) => {
          const selected = profile.interests.includes(item.label)
          return (
            <button
              key={item.label}
              type="button"
              onClick={() => toggleInterest(item.label)}
              className={[
                'p-4 text-left border transition-all duration-200 cursor-pointer relative rounded-none flex flex-col justify-between group',
                selected
                  ? 'bg-surface border-accent shadow-[0_4px_16px_rgba(255,90,31,0.1)] -translate-y-0.5'
                  : 'bg-surface border-border hover:border-border-hover hover:bg-surface-subtle',
              ].join(' ')}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xl">{item.icon}</span>
                  <span
                    className={[
                      'h-2 w-2 rounded-full transition-all',
                      selected ? 'bg-accent scale-100' : 'bg-border scale-75 group-hover:bg-accent/40',
                    ].join(' ')}
                  />
                </div>
                <h3 className="font-display font-bold text-sm md:text-base text-fg tracking-tight mb-1">
                  {item.label}
                </h3>
                <p className="type-small text-fg-secondary text-xs leading-relaxed line-clamp-2">
                  {item.description}
                </p>
              </div>

              {selected && (
                <div className="mt-3 pt-2 border-t border-accent/20 flex items-center justify-between">
                  <span className="font-mono text-[0.625rem] text-accent font-semibold tracking-wider uppercase">
                    SELECTED
                  </span>
                  <span className="text-accent text-xs">✓</span>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <span className="type-meta text-fg-muted">
          {profile.interests.length === 0
            ? 'Select at least 1 domain to continue'
            : `${profile.interests.length} domain${profile.interests.length > 1 ? 's' : ''} selected`}
        </span>

        <Button
          variant="primary"
          size="lg"
          onClick={nextStep}
          disabled={!isValid}
          className="w-full sm:w-auto px-8 py-3.5 tracking-widest text-xs font-semibold"
        >
          <span>CONTINUE</span>
          <span>→</span>
        </Button>
      </div>
    </div>
  )
}
