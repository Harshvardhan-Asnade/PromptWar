import React from 'react'
import { useDiscovery } from '../../context/DiscoveryContext'
import { Button } from '../ui/Button'

/**
 * STEP 02 — SKILLS
 * "WHAT CAN YOU BUILD WITH?"
 * Technical capabilities assembly with counter and multi-select.
 */
export const StepSkills: React.FC = () => {
  const { profile, toggleSkill, nextStep, prevStep } = useDiscovery()

  const skillOptions = [
    { name: 'Python', category: 'CORE' },
    { name: 'TypeScript', category: 'LANG' },
    { name: 'React', category: 'FRONTEND' },
    { name: 'FastAPI', category: 'BACKEND' },
    { name: 'C++', category: 'SYSTEMS' },
    { name: 'Java', category: 'ENTERPRISE' },
    { name: 'Node.js', category: 'RUNTIME' },
    { name: 'SQL / PostgreSQL', category: 'DATABASE' },
    { name: 'Machine Learning', category: 'AI' },
    { name: 'Deep Learning', category: 'AI' },
    { name: 'Computer Vision', category: 'AI' },
    { name: 'Docker / Cloud', category: 'INFRA' },
    { name: 'Go', category: 'SYSTEMS' },
    { name: 'Next.js', category: 'FRONTEND' },
    { name: 'PyTorch', category: 'FRAMEWORK' },
  ]

  const isValid = profile.skills.length >= 1

  return (
    <div className="space-y-8">
      {/* Title & Guidance */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-xs font-semibold text-accent uppercase tracking-widest">
            STEP 02 // TECHNICAL FOUNDATION
          </span>
          <span className="font-mono text-xs font-semibold text-fg bg-accent-light px-2.5 py-0.5 border border-accent/30">
            {String(profile.skills.length).padStart(2, '0')} SKILLS SELECTED
          </span>
        </div>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl text-fg tracking-tight mb-4">
          WHAT CAN YOU BUILD WITH?
        </h2>
        <p className="type-body text-fg-secondary text-base md:text-lg">
          Select the technologies your team has practical command of. We will anchor your
          architectural blueprint directly in these tools.
        </p>
      </div>

      {/* Skills Matrix Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {skillOptions.map((item) => {
          const selected = profile.skills.includes(item.name)
          return (
            <button
              key={item.name}
              type="button"
              onClick={() => toggleSkill(item.name)}
              className={[
                'p-3.5 text-left border transition-all duration-150 cursor-pointer rounded-none flex flex-col justify-between h-24 group',
                selected
                  ? 'bg-surface border-accent shadow-[0_4px_16px_rgba(255,90,31,0.12)] -translate-y-0.5 ring-1 ring-accent/30'
                  : 'bg-surface border-border hover:border-border-hover hover:bg-surface-subtle',
              ].join(' ')}
            >
              <div className="flex items-center justify-between w-full">
                <span className="font-mono text-[0.625rem] text-fg-muted uppercase tracking-wider">
                  {item.category}
                </span>
                <span
                  className={[
                    'h-1.5 w-1.5 rounded-full transition-all',
                    selected ? 'bg-accent scale-100' : 'bg-border scale-75 group-hover:bg-accent/40',
                  ].join(' ')}
                />
              </div>

              <span className="font-display font-bold text-sm md:text-base text-fg tracking-tight">
                {item.name}
              </span>
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
