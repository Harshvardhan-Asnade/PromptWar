import React from 'react'
import { useDiscovery } from '../../context/DiscoveryContext'
import { Button } from '../ui/Button'
import type { ExperienceLevel } from '../../types/discovery'

/**
 * STEP 03 — EXPERIENCE
 * "WHERE ARE YOU RIGHT NOW?"
 * 3 large selectable horizontal tiers.
 */
export const StepExperience: React.FC = () => {
  const { profile, updateProfile, nextStep, prevStep } = useDiscovery()

  const tiers: { level: ExperienceLevel; title: string; quote: string; detail: string }[] = [
    {
      level: 'beginner',
      title: 'BEGINNER',
      quote: '“I know the fundamentals.”',
      detail:
        'You have completed coursework and follow tutorials comfortably. You need clean, modular architectures with proven design patterns and low infrastructure friction.',
    },
    {
      level: 'intermediate',
      title: 'INTERMEDIATE',
      quote: '“I can build independently.”',
      detail:
        'You have built full-stack apps or standard ML scripts without step-by-step guidance. You want a production-grade project with meaningful integration challenges.',
    },
    {
      level: 'advanced',
      title: 'ADVANCED',
      quote: '“I can handle complex systems.”',
      detail:
        'You have production or research experience. You want high-depth technical challenges: custom pipelines, distributed consensus, low-latency telemetry, or research novelties.',
    },
  ]

  const isValid = !!profile.experience

  return (
    <div className="space-y-8">
      {/* Title & Guidance */}
      <div>
        <span className="font-mono text-xs font-semibold text-accent uppercase tracking-widest block mb-2">
          STEP 03 // PROFICIENCY CALIBRATION
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-fg tracking-tight mb-4">
          WHERE ARE YOU RIGHT NOW?
        </h2>
        <p className="type-body text-fg-secondary text-base md:text-lg">
          Be realistic about your technical comfort level. This prevents over-scoping into an
          impossible project or under-scoping into an unimpressive one.
        </p>
      </div>

      {/* Selectable Horizontal Tiers */}
      <div className="space-y-4">
        {tiers.map((tier) => {
          const selected = profile.experience === tier.level
          return (
            <button
              key={tier.level}
              type="button"
              onClick={() => updateProfile({ experience: tier.level })}
              className={[
                'w-full p-6 md:p-8 text-left border transition-all duration-200 cursor-pointer rounded-none relative flex flex-col md:flex-row md:items-center justify-between gap-6 group',
                selected
                  ? 'bg-surface border-accent shadow-[0_6px_24px_rgba(255,90,31,0.12)] -translate-y-0.5 ring-1 ring-accent/30'
                  : 'bg-surface border-border hover:border-border-hover hover:bg-surface-subtle',
              ].join(' ')}
            >
              <div className="md:max-w-xs flex-shrink-0">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={[
                      'h-2.5 w-2.5 rounded-full transition-all',
                      selected ? 'bg-accent scale-100' : 'bg-border scale-75 group-hover:bg-accent/40',
                    ].join(' ')}
                  />
                  <span className="font-display font-extrabold text-xl text-fg tracking-tight">
                    {tier.title}
                  </span>
                </div>
                <p className="font-display italic text-sm text-accent font-medium">
                  {tier.quote}
                </p>
              </div>

              <div className="flex-1 md:border-l md:border-border/60 md:pl-6">
                <p className="type-body text-fg-secondary text-sm leading-relaxed">
                  {tier.detail}
                </p>
              </div>

              {selected && (
                <div className="flex items-center gap-2 font-mono text-xs text-accent font-semibold uppercase tracking-wider flex-shrink-0">
                  <span>ACTIVE</span>
                  <span>✓</span>
                </div>
              )}
            </button>
          )
        })}
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button
          variant="secondary"
          onClick={prevStep}
          className="w-full sm:w-auto px-6 py-3 tracking-wider text-xs"
        >
          ← BACK
        </Button>

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
