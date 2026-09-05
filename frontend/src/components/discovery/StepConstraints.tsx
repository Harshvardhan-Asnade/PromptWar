import React from 'react'
import { useDiscovery } from '../../context/DiscoveryContext'
import { Button } from '../ui/Button'

/**
 * STEP 04 — CONSTRAINTS
 * "WHAT ARE YOU WORKING WITH?"
 * Compact editorial selectors for team size, duration, difficulty, and primary domain.
 */
export const StepConstraints: React.FC = () => {
  const { profile, updateProfile, nextStep, prevStep } = useDiscovery()

  const teamSizes = [
    { value: 1, label: '1 (SOLO)' },
    { value: 2, label: '2 DEVELOPERS' },
    { value: 3, label: '3 DEVELOPERS' },
    { value: 4, label: '4+ DEVELOPERS' },
  ]

  const durations = [
    { value: '4 weeks', label: '4 WEEKS' },
    { value: '6 weeks', label: '6 WEEKS' },
    { value: '8 weeks', label: '8 WEEKS (SEMESTER)' },
    { value: '3 months', label: '3 MONTHS' },
    { value: '6 months', label: '6 MONTHS (YEAR-LONG)' },
  ]

  const difficulties = [
    { value: 'achievable', label: 'ACHIEVABLE', desc: 'Safe MVP scope' },
    { value: 'balanced', label: 'BALANCED', desc: 'Recommended standard' },
    { value: 'challenging', label: 'CHALLENGING', desc: 'High technical depth' },
    { value: 'research', label: 'RESEARCH', desc: 'Novel algorithm or paper' },
  ]

  return (
    <div className="space-y-10">
      {/* Title & Guidance */}
      <div>
        <span className="font-mono text-xs font-semibold text-accent uppercase tracking-widest block mb-2">
          STEP 04 // REALITY CALIBRATION
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-fg tracking-tight mb-4">
          WHAT ARE YOU WORKING WITH?
        </h2>
        <p className="type-body text-fg-secondary text-base md:text-lg">
          Ground your project in your semester calendar and team capacity. The AI engine will scale
          the architectural requirements to match these exact boundaries.
        </p>
      </div>

      <div className="space-y-8">
        {/* 1. Team Size */}
        <div>
          <label className="font-mono text-xs uppercase tracking-wider text-fg-secondary block mb-3 font-semibold">
            01 // TEAM CAPACITY
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {teamSizes.map((item) => {
              const selected = profile.team_size === item.value
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => updateProfile({ team_size: item.value })}
                  className={[
                    'py-3.5 px-4 text-center border font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-150 cursor-pointer rounded-none',
                    selected
                      ? 'bg-surface border-accent text-accent shadow-[0_2px_12px_rgba(255,90,31,0.15)] ring-1 ring-accent/30'
                      : 'bg-surface border-border text-fg-secondary hover:border-border-hover hover:bg-surface-subtle',
                  ].join(' ')}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 2. Available Duration */}
        <div>
          <label className="font-mono text-xs uppercase tracking-wider text-fg-secondary block mb-3 font-semibold">
            02 // AVAILABLE DEVELOPMENT TIMELINE
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {durations.map((item) => {
              const selected = profile.duration.toLowerCase() === item.value.toLowerCase()
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => updateProfile({ duration: item.value })}
                  className={[
                    'py-3 px-3 text-center border font-mono text-xs uppercase tracking-wider font-semibold transition-all duration-150 cursor-pointer rounded-none',
                    selected
                      ? 'bg-surface border-accent text-accent shadow-[0_2px_12px_rgba(255,90,31,0.15)] ring-1 ring-accent/30'
                      : 'bg-surface border-border text-fg-secondary hover:border-border-hover hover:bg-surface-subtle',
                  ].join(' ')}
                >
                  {item.label}
                </button>
              )
            })}
          </div>
        </div>

        {/* 3. Difficulty Preference */}
        <div>
          <label className="font-mono text-xs uppercase tracking-wider text-fg-secondary block mb-3 font-semibold">
            03 // CHALLENGE TIER
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {difficulties.map((item) => {
              const selected = profile.difficulty.toLowerCase() === item.value.toLowerCase()
              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => updateProfile({ difficulty: item.value })}
                  className={[
                    'p-4 text-left border transition-all duration-150 cursor-pointer rounded-none flex flex-col justify-between group',
                    selected
                      ? 'bg-surface border-accent shadow-[0_2px_12px_rgba(255,90,31,0.15)] ring-1 ring-accent/30'
                      : 'bg-surface border-border hover:border-border-hover hover:bg-surface-subtle',
                  ].join(' ')}
                >
                  <span className="font-mono text-xs font-bold uppercase tracking-wider text-fg mb-1">
                    {item.label}
                  </span>
                  <span className="type-meta text-fg-muted text-[0.625rem]">
                    {item.desc}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* 4. Primary Domain Confirmation */}
        <div>
          <label className="font-mono text-xs uppercase tracking-wider text-fg-secondary block mb-3 font-semibold">
            04 // PRIMARY DOMAIN FOCUS
          </label>
          <div className="relative">
            <input
              type="text"
              value={profile.domain}
              onChange={(e) => updateProfile({ domain: e.target.value })}
              placeholder="e.g. Healthcare, FinTech, Autonomous Systems..."
              className="w-full bg-surface border border-border px-4 py-3 font-sans text-sm text-fg placeholder:text-fg-faint focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none rounded-none"
            />
          </div>
          <span className="type-meta text-fg-muted mt-1.5 block">
            Pre-filled from your interests; customize if you have a specific niche in mind.
          </span>
        </div>
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
          className="w-full sm:w-auto px-8 py-3.5 tracking-widest text-xs font-semibold"
        >
          <span>REVIEW PROFILE</span>
          <span>→</span>
        </Button>
      </div>
    </div>
  )
}
