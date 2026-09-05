import React from 'react'
import { useDiscovery } from '../../context/DiscoveryContext'
import { Button } from '../ui/Button'

/**
 * REVIEW & GENERATE
 * Final summary of the assembled profile before triggering the AI engine.
 * "WE HAVE YOUR DIRECTION."
 */
export const ReviewAndGenerate: React.FC = () => {
  const { profile, setStep, prevStep, triggerGeneration, generationStatus } = useDiscovery()

  const isGenerating = generationStatus === 'generating'

  return (
    <div className="space-y-8">
      {/* Title & Guidance */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-accent-light border border-accent/30 mb-3">
          <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
          <span className="font-mono text-xs font-semibold text-accent uppercase tracking-wider">
            PROFILE COMPLETE
          </span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-fg tracking-tight mb-4">
          WE HAVE YOUR DIRECTION.
        </h2>
        <p className="type-body text-fg-secondary text-base md:text-lg">
          Review your calibrated inputs below. Once you trigger the engine, Project Forge will
          synthesize these factors into 3 production-grade project blueprints.
        </p>
      </div>

      {/* Review Matrix Card */}
      <div className="p-6 md:p-8 bg-surface border border-border shadow-[0_4px_24px_rgba(0,0,0,0.02)] space-y-6">
        {/* Interests */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-border/70 pb-4">
          <span className="type-meta text-fg-muted sm:w-36 flex-shrink-0">INTERESTS:</span>
          <div className="flex-1 flex flex-wrap gap-1.5">
            {profile.interests.map((item) => (
              <span
                key={item}
                className="font-mono text-xs px-2.5 py-1 bg-accent-light text-accent border border-accent/30 font-medium"
              >
                {item}
              </span>
            ))}
          </div>
          <button
            onClick={() => setStep(1)}
            className="type-meta text-accent hover:underline sm:self-start cursor-pointer"
          >
            EDIT
          </button>
        </div>

        {/* Skills */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-border/70 pb-4">
          <span className="type-meta text-fg-muted sm:w-36 flex-shrink-0">
            SKILLS ({profile.skills.length}):
          </span>
          <div className="flex-1 flex flex-wrap gap-1.5">
            {profile.skills.map((skill) => (
              <span
                key={skill}
                className="font-mono text-xs px-2.5 py-1 bg-surface-subtle text-fg border border-border font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
          <button
            onClick={() => setStep(2)}
            className="type-meta text-accent hover:underline sm:self-start cursor-pointer"
          >
            EDIT
          </button>
        </div>

        {/* Experience */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-4">
          <span className="type-meta text-fg-muted sm:w-36 flex-shrink-0">EXPERIENCE:</span>
          <span className="flex-1 font-mono text-xs uppercase font-bold text-fg">
            {profile.experience}
          </span>
          <button
            onClick={() => setStep(3)}
            className="type-meta text-accent hover:underline cursor-pointer"
          >
            EDIT
          </button>
        </div>

        {/* Constraints */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-border/70 pb-4">
          <span className="type-meta text-fg-muted sm:w-36 flex-shrink-0">CONSTRAINTS:</span>
          <span className="flex-1 font-mono text-xs text-fg">
            {profile.team_size} {profile.team_size === 1 ? 'Dev' : 'Devs'} · {profile.duration} · {profile.difficulty.toUpperCase()}
          </span>
          <button
            onClick={() => setStep(4)}
            className="type-meta text-accent hover:underline cursor-pointer"
          >
            EDIT
          </button>
        </div>

        {/* Primary Domain */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span className="type-meta text-fg-muted sm:w-36 flex-shrink-0">DOMAIN FOCUS:</span>
          <span className="flex-1 font-mono text-xs text-fg font-semibold uppercase">
            {profile.domain || profile.interests[0]}
          </span>
          <button
            onClick={() => setStep(4)}
            className="type-meta text-accent hover:underline cursor-pointer"
          >
            EDIT
          </button>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button
          variant="secondary"
          onClick={prevStep}
          disabled={isGenerating}
          className="w-full sm:w-auto px-6 py-3 tracking-wider text-xs"
        >
          ← BACK
        </Button>

        <Button
          variant="primary"
          size="lg"
          onClick={triggerGeneration}
          loading={isGenerating}
          className="w-full sm:w-auto px-10 py-4 tracking-widest text-xs font-bold shadow-[0_4px_24px_rgba(255,90,31,0.35)]"
        >
          <span>GENERATE MY PROJECTS</span>
          <span>→</span>
        </Button>
      </div>
    </div>
  )
}
