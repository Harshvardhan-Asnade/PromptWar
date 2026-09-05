import React from 'react'
import { useDiscovery } from '../../context/DiscoveryContext'

/**
 * YOUR PROJECT DNA
 * Live visual representation of the student's assembling profile.
 * Updates dynamically across all discovery steps.
 */
export const ProjectDnaSidebar: React.FC = () => {
  const { profile, setStep } = useDiscovery()

  return (
    <div className="w-full lg:w-80 p-6 md:p-8 bg-surface border border-border shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs font-bold text-fg tracking-widest uppercase">
              YOUR PROJECT DNA
            </span>
          </div>
          <span className="type-meta text-accent">LIVE PROFILE</span>
        </div>

        {/* DNA Variables Stack */}
        <div className="space-y-6">
          {/* Interests */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="type-meta text-fg-muted">01 // INTERESTS</span>
              <button
                onClick={() => setStep(1)}
                className="type-meta text-accent hover:underline cursor-pointer"
              >
                EDIT
              </button>
            </div>
            {profile.interests.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {profile.interests.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[0.6875rem] px-2 py-0.5 bg-accent-light text-accent border border-accent/30 font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <span className="type-meta text-fg-faint italic">Awaiting selection...</span>
            )}
          </div>

          {/* Skills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="type-meta text-fg-muted">
                02 // SKILLS ({profile.skills.length})
              </span>
              <button
                onClick={() => setStep(2)}
                className="type-meta text-accent hover:underline cursor-pointer"
              >
                EDIT
              </button>
            </div>
            {profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[0.6875rem] px-2 py-0.5 bg-surface-subtle text-fg border border-border"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <span className="type-meta text-fg-faint italic">Awaiting selection...</span>
            )}
          </div>

          {/* Experience */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="type-meta text-fg-muted">03 // EXPERIENCE</span>
              <button
                onClick={() => setStep(3)}
                className="type-meta text-accent hover:underline cursor-pointer"
              >
                EDIT
              </button>
            </div>
            <div className="font-mono text-xs uppercase font-medium text-fg">
              {profile.experience ? (
                <span className="text-accent">{profile.experience}</span>
              ) : (
                <span className="text-fg-faint italic">Awaiting selection...</span>
              )}
            </div>
          </div>

          {/* Constraints */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="type-meta text-fg-muted">04 // CONSTRAINTS</span>
              <button
                onClick={() => setStep(4)}
                className="type-meta text-accent hover:underline cursor-pointer"
              >
                EDIT
              </button>
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-fg-secondary">
                <span>TEAM:</span>
                <span className="text-fg font-medium">{profile.team_size} {profile.team_size === 1 ? 'MEMBER' : 'MEMBERS'}</span>
              </div>
              <div className="flex justify-between text-fg-secondary">
                <span>TIMELINE:</span>
                <span className="text-fg font-medium uppercase">{profile.duration}</span>
              </div>
              <div className="flex justify-between text-fg-secondary">
                <span>TIER:</span>
                <span className="text-fg font-medium uppercase">{profile.difficulty}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-8 pt-4 border-t border-border flex items-center justify-between text-fg-muted">
        <span className="type-meta">BLUEPRINT CALIBRATION</span>
        <span className="type-meta text-accent">PROJECT FORGE</span>
      </div>
    </div>
  )
}
