import React, { useMemo, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useDiscovery } from '../../context/DiscoveryContext'
import { prefersReducedMotion } from '../../lib/motion'

/**
 * YOUR PROJECT DNA // CALIBRATION ENGINE
 * Dynamic calibration readout that visibly responds whenever the student selects
 * interests, skills, experience, or constraints.
 * Features profile calibration gauges for Technical Depth, Feasibility, and Novelty.
 * IMPORTANT: Explicitly marked as profile-calibration indicators, NOT final AI scores.
 */
export const ProjectDnaSidebar: React.FC = () => {
  const { profile, setStep } = useDiscovery()
  const gaugeRef = useRef<HTMLDivElement>(null)

  // Compute dynamic profile-calibration indicators (NOT final AI scores)
  const calibration = useMemo(() => {
    // 1. Technical Depth (Skills + Experience)
    let depthScore = 45
    if (profile.experience === 'intermediate') depthScore = 65
    if (profile.experience === 'advanced') depthScore = 85

    // Add depth for skills
    const skillsBonus = Math.min(profile.skills.length * 4, 20)
    const advancedSkillKeywords = ['pytorch', 'vision', 'docker', 'tensorflow', 'go', 'rust', 'c++']
    const hasAdvancedSkill = profile.skills.some((s) =>
      advancedSkillKeywords.some((kw) => s.toLowerCase().includes(kw))
    )
    if (hasAdvancedSkill) depthScore += 8
    const finalDepth = Math.min(Math.max(depthScore + skillsBonus, 30), 96)

    // 2. Feasibility (Team Size + Duration vs Difficulty)
    let feasibilityScore = 70
    if (profile.team_size >= 3) feasibilityScore += 10
    if (profile.team_size === 1) feasibilityScore -= 8
    if (profile.duration.includes('12') || profile.duration.includes('16')) feasibilityScore += 10
    if (profile.duration.includes('2') || profile.duration.includes('4')) feasibilityScore -= 6
    if (profile.difficulty === 'hardcore') feasibilityScore -= 12
    if (profile.difficulty === 'accessible') feasibilityScore += 10
    const finalFeasibility = Math.min(Math.max(feasibilityScore, 40), 95)

    // 3. Novelty (Interests + Interdisciplinary Synergy)
    let noveltyScore = 60
    if (profile.interests.length >= 2) noveltyScore += 18
    if (profile.interests.length >= 3) noveltyScore += 10
    const highNoveltyDomains = ['AI / ML', 'Computer Vision', 'Web3 / Blockchain', 'Edge Computing', 'Robotics']
    const hasNovelDomain = profile.interests.some((i) => highNoveltyDomains.includes(i))
    if (hasNovelDomain) noveltyScore += 10
    const finalNovelty = Math.min(Math.max(noveltyScore, 35), 94)

    return {
      depth: finalDepth,
      feasibility: finalFeasibility,
      novelty: finalNovelty,
    }
  }, [profile])

  // Subtle gauge response animation when calibration changes
  useEffect(() => {
    if (prefersReducedMotion() || !gaugeRef.current) return
    gsap.fromTo(
      gaugeRef.current.querySelectorAll('.calibration-bar-fill'),
      { scaleX: 0.85, opacity: 0.7 },
      { scaleX: 1, opacity: 1, duration: 0.4, ease: 'power2.out', stagger: 0.05 }
    )
  }, [calibration])

  return (
    <aside
      aria-label="Project DNA Calibration"
      className="w-full lg:w-80 p-6 md:p-8 bg-white border border-[#E4E2DC] rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] flex flex-col justify-between transition-all"
    >
      <div>
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#E4E2DC] pb-4 mb-6">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#FF5A1F] animate-pulse" />
            <h2 className="font-mono text-xs font-bold text-[#111111] tracking-widest uppercase">
              YOUR PROJECT DNA
            </h2>
          </div>
          <span className="font-mono text-[10px] text-[#FF5A1F] font-semibold tracking-wider">
            CALIBRATING
          </span>
        </div>

        {/* DNA Variables Stack */}
        <div className="space-y-6">
          {/* 01 // Interests */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-[#767571] uppercase tracking-wider">
                01 // INTERESTS
              </span>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="font-mono text-[11px] text-[#FF5A1F] hover:underline cursor-pointer tracking-wider"
              >
                EDIT
              </button>
            </div>
            {profile.interests.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {profile.interests.map((item) => (
                  <span
                    key={item}
                    className="font-mono text-[11px] px-2.5 py-1 bg-[#FFF0E9] text-[#FF5A1F] border border-[#FF5A1F]/30 rounded-lg font-medium"
                  >
                    {item}
                  </span>
                ))}
              </div>
            ) : (
              <span className="font-sans text-xs text-[#767571] italic">Awaiting selection...</span>
            )}
          </div>

          {/* 02 // Skills */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-[#767571] uppercase tracking-wider">
                02 // SKILLS ({profile.skills.length})
              </span>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="font-mono text-[11px] text-[#FF5A1F] hover:underline cursor-pointer tracking-wider"
              >
                EDIT
              </button>
            </div>
            {profile.skills.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="font-mono text-[11px] px-2.5 py-1 bg-[#F7F6F2] text-[#111111] border border-[#E4E2DC] rounded-lg"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <span className="font-sans text-xs text-[#767571] italic">Awaiting selection...</span>
            )}
          </div>

          {/* 03 // Experience */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-[#767571] uppercase tracking-wider">
                03 // EXPERIENCE
              </span>
              <button
                type="button"
                onClick={() => setStep(3)}
                className="font-mono text-[11px] text-[#FF5A1F] hover:underline cursor-pointer tracking-wider"
              >
                EDIT
              </button>
            </div>
            <div className="font-mono text-xs uppercase font-bold text-[#111111]">
              {profile.experience ? (
                <span className="px-2.5 py-1 rounded-lg bg-[#F7F6F2] border border-[#E4E2DC] text-[#FF5A1F] inline-block">
                  {profile.experience}
                </span>
              ) : (
                <span className="font-sans text-xs text-[#767571] italic">Awaiting selection...</span>
              )}
            </div>
          </div>

          {/* 04 // Constraints */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-xs text-[#767571] uppercase tracking-wider">
                04 // CONSTRAINTS
              </span>
              <button
                type="button"
                onClick={() => setStep(4)}
                className="font-mono text-[11px] text-[#FF5A1F] hover:underline cursor-pointer tracking-wider"
              >
                EDIT
              </button>
            </div>
            <div className="space-y-1.5 font-mono text-xs bg-[#F7F6F2] p-3 rounded-xl border border-[#E4E2DC]">
              <div className="flex justify-between text-[#5F5F5A]">
                <span>TEAM:</span>
                <span className="text-[#111111] font-semibold">
                  {profile.team_size} {profile.team_size === 1 ? 'DEVELOPER' : 'DEVELOPERS'}
                </span>
              </div>
              <div className="flex justify-between text-[#5F5F5A]">
                <span>TIMELINE:</span>
                <span className="text-[#111111] font-semibold uppercase">{profile.duration}</span>
              </div>
              <div className="flex justify-between text-[#5F5F5A]">
                <span>MODE:</span>
                <span className="text-[#111111] font-semibold uppercase">{profile.difficulty}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Calibration Indicators (Improvement 02) */}
        <div ref={gaugeRef} className="mt-8 pt-6 border-t border-[#E4E2DC]">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[11px] font-bold text-[#111111] tracking-wider uppercase">
              CALIBRATION SIGNALS
            </span>
            <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-[#FFF0E9] text-[#FF5A1F] font-semibold">
              PROFILE ESTIMATE
            </span>
          </div>

          <div className="space-y-3 font-mono text-[11px]">
            {/* Technical Depth */}
            <div>
              <div className="flex justify-between mb-1 text-[#5F5F5A]">
                <span>TECHNICAL DEPTH</span>
                <span className="text-[#111111] font-bold">{calibration.depth}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#E4E2DC] rounded-full overflow-hidden">
                <div
                  className="calibration-bar-fill h-full bg-[#111111] origin-left transition-all duration-500 rounded-full"
                  style={{ width: `${calibration.depth}%` }}
                />
              </div>
            </div>

            {/* Feasibility */}
            <div>
              <div className="flex justify-between mb-1 text-[#5F5F5A]">
                <span>FEASIBILITY</span>
                <span className="text-[#111111] font-bold">{calibration.feasibility}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#E4E2DC] rounded-full overflow-hidden">
                <div
                  className="calibration-bar-fill h-full bg-[#FF5A1F] origin-left transition-all duration-500 rounded-full"
                  style={{ width: `${calibration.feasibility}%` }}
                />
              </div>
            </div>

            {/* Novelty */}
            <div>
              <div className="flex justify-between mb-1 text-[#5F5F5A]">
                <span>NOVELTY</span>
                <span className="text-[#111111] font-bold">{calibration.novelty}%</span>
              </div>
              <div className="h-1.5 w-full bg-[#E4E2DC] rounded-full overflow-hidden">
                <div
                  className="calibration-bar-fill h-full bg-[#111111] origin-left transition-all duration-500 rounded-full"
                  style={{ width: `${calibration.novelty}%` }}
                />
              </div>
            </div>
          </div>

          <p className="mt-3 text-[10px] font-mono text-[#767571] leading-tight">
            * Profile-calibration indicators, NOT final AI scores. Guides synthesis balance.
          </p>
        </div>
      </div>

      {/* Footer Info */}
      <div className="mt-6 pt-4 border-t border-[#E4E2DC] flex items-center justify-between text-[#767571] font-mono text-[10px]">
        <span>CALIBRATION PROTOCOL</span>
        <span className="text-[#FF5A1F] font-bold">PROJECT FORGE</span>
      </div>
    </aside>
  )
}
