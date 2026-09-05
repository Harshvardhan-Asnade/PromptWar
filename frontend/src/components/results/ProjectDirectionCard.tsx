import React, { useRef, useState, useCallback } from 'react'
import { gsap } from 'gsap'
import type { ProjectIdea } from '../../types/discovery'
import { WaterRippleCanvas } from './WaterRippleCanvas'
import { prefersReducedMotion } from '../../lib/motion'

interface ProjectDirectionCardProps {
  project: ProjectIdea
  index: number
  isFeatured?: boolean
  isHighlighted?: boolean
  standoutBadge?: string | null
  onSelect: (project: ProjectIdea) => void
}

/**
 * Project Direction Card with Spotlight, Micro-Perspective Tilt,
 * and Water Ripple Canvas distortion.
 * Maintains clear typographic hierarchy and readability across all viewports.
 */
export const ProjectDirectionCard: React.FC<ProjectDirectionCardProps> = ({
  project,
  index,
  isFeatured = false,
  isHighlighted = false,
  standoutBadge = null,
  onSelect,
}) => {
  const cardRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [isPressed, setIsPressed] = useState(false)
  const [spotlightPos, setSpotlightPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

  // Compute composite Project Strength signal
  const overallStrength = Math.round(
    (project.innovation_score +
      project.feasibility_score +
      project.impact_score +
      project.technical_depth_score) /
      4
  )

  // 3D subtle tilt + spotlight on pointer move (safe for desktop)
  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setSpotlightPos({ x, y })

    if (prefersReducedMotion() || window.innerWidth < 1024) return

    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const tiltX = ((y - centerY) / centerY) * -2.2
    const tiltY = ((x - centerX) / centerX) * 2.2

    gsap.to(card, {
      rotateX: tiltX,
      rotateY: tiltY,
      duration: 0.2,
      ease: 'power1.out',
      transformPerspective: 1200,
    })
  }, [])

  const handlePointerLeave = useCallback(() => {
    setIsHovered(false)
    const card = cardRef.current
    if (!card || prefersReducedMotion() || window.innerWidth < 1024) return

    gsap.to(card, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.5,
      ease: 'power2.out',
    })
  }, [])

  // Smooth selection animation
  const handleCardClick = () => {
    const card = cardRef.current
    if (!card || prefersReducedMotion()) {
      onSelect(project)
      return
    }

    gsap.to(card, {
      scale: 0.98,
      duration: 0.12,
      ease: 'power2.in',
      onComplete: () => {
        gsap.to(card, {
          scale: 1.02,
          boxShadow: '0 20px 40px rgba(255, 90, 31, 0.2)',
          duration: 0.2,
          ease: 'power2.out',
          onComplete: () => {
            onSelect(project)
          },
        })
      },
    })
  }

  return (
    <article
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={() => setIsHovered(true)}
      onPointerLeave={handlePointerLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onTouchStart={() => setIsPressed(true)}
      onTouchEnd={() => setIsPressed(false)}
      className={`relative bg-white rounded-3xl flex flex-col justify-between transition-all duration-300 shadow-sm hover:shadow-xl border cursor-pointer select-none group will-change-transform overflow-hidden ${
        isFeatured
          ? 'p-8 sm:p-10 border-[#111111] ring-1 ring-[#111111]/10 bg-white'
          : isHighlighted
          ? 'p-6 sm:p-8 border-[#FF5A1F] ring-2 ring-[#FF5A1F]/30 bg-[#FFF0E9]/15'
          : isHovered
          ? 'p-6 sm:p-8 border-[#111111] -translate-y-1'
          : 'p-6 sm:p-8 border-[#E4E2DC]'
      } ${isPressed ? 'scale-[0.99]' : ''}`}
      onClick={handleCardClick}
      tabIndex={0}
      role="button"
      aria-label={`Explore direction: ${project.title} (${isFeatured ? 'Featured project' : 'Alternative direction'})`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleCardClick()
        }
      }}
    >
      {/* Subtle React Bits Spotlight Effect */}
      {isHovered && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(500px circle at ${spotlightPos.x}px ${spotlightPos.y}px, rgba(255, 90, 31, 0.08), transparent 70%)`,
          }}
          aria-hidden="true"
        />
      )}

      {/* Water Ripple Interactive Canvas */}
      <WaterRippleCanvas accentColor="rgba(255, 90, 31, 0.14)" />

      {/* Foreground Content */}
      <div className="relative z-10">
        {/* Top Badges & Index */}
        <div className="flex items-center justify-between border-b border-[#E4E2DC] pb-4 mb-5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-[#FF5A1F] tracking-widest">
              0{index + 1}
            </span>
            <span className="font-mono text-[11px] text-[#767571] uppercase tracking-wider">
              {isFeatured ? '/ FEATURED DIRECTION' : '/ DIRECTION'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {isFeatured && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-white bg-[#111111] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider shadow-sm">
                <span>★</span>
                <span>PRIMARY PICK</span>
              </span>
            )}
            {standoutBadge && !isFeatured && (
              <span className="inline-flex items-center gap-1 font-mono text-[10px] text-[#FF5A1F] bg-[#FFF0E9] border border-[#FF5A1F]/30 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider">
                <span>★</span>
                <span>{standoutBadge}</span>
              </span>
            )}
            <span className="font-mono text-[10px] text-[#5F5F5A] px-2 py-0.5 rounded bg-[#F7F6F2] border border-[#E4E2DC] uppercase tracking-wider font-medium">
              {project.difficulty}
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="mb-5">
          <h2
            className={`font-black text-[#111111] font-display tracking-tight leading-snug group-hover:text-[#FF5A1F] transition-colors ${
              isFeatured ? 'text-3xl sm:text-4xl lg:text-5xl' : 'text-2xl sm:text-3xl'
            }`}
          >
            {project.title}
          </h2>
          <p className="text-xs sm:text-sm font-mono text-[#5F5F5A] mt-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Problem Statement */}
        <div className="mb-5">
          <span className="font-mono text-[10px] text-[#767571] uppercase tracking-wider block mb-1">
            PROBLEM STATEMENT
          </span>
          <p
            className={`text-xs sm:text-sm text-[#5F5F5A] leading-relaxed font-sans ${
              isFeatured ? 'line-clamp-4' : 'line-clamp-3'
            }`}
          >
            {project.problem}
          </p>
        </div>

        {/* AI Insight: Why this fits you */}
        {project.why_it_fits && (
          <div
            className={`mb-6 p-4 rounded-2xl border transition-colors ${
              isFeatured
                ? 'bg-[#FFF0E9]/30 border-[#FF5A1F]/30'
                : 'bg-[#F7F6F2] border-[#E4E2DC] group-hover:border-[#FF5A1F]/30'
            }`}
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
              <span className="font-mono text-[10px] text-[#FF5A1F] uppercase tracking-wider font-semibold">
                WHY THIS FITS YOUR PROFILE
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#111111] leading-relaxed font-sans">
              "{project.why_it_fits}"
            </p>
          </div>
        )}

        {/* Core Tech Stack */}
        <div className="mb-6">
          <span className="font-mono text-[10px] text-[#767571] uppercase tracking-wider block mb-2">
            ENGINEERING STACK
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.tech_stack?.slice(0, isFeatured ? 8 : 5).map((tech, tIdx) => (
              <span
                key={tIdx}
                className="px-2.5 py-1 rounded-lg bg-[#F7F6F2] border border-[#E4E2DC] text-xs font-mono text-[#111111] group-hover:border-[#111111]/30 transition-colors"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Footer: Detailed Scores & Selection Action */}
      <div className="relative z-10 border-t border-[#E4E2DC] pt-5 mt-2">
        {/* 4 Metric Signals */}
        <div className="grid grid-cols-4 gap-2 text-center mb-4">
          <div className="bg-[#F7F6F2] rounded-xl p-2.5 border border-[#E4E2DC] transition-colors group-hover:border-[#FF5A1F]/20">
            <span className="block text-[9px] font-mono text-[#767571] uppercase">INNOVATION</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-[#111111]">
              {project.innovation_score}
            </span>
          </div>

          <div className="bg-[#F7F6F2] rounded-xl p-2.5 border border-[#E4E2DC] transition-colors group-hover:border-[#FF5A1F]/20">
            <span className="block text-[9px] font-mono text-[#767571] uppercase">FEASIBILITY</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-[#111111]">
              {project.feasibility_score}
            </span>
          </div>

          <div className="bg-[#F7F6F2] rounded-xl p-2.5 border border-[#E4E2DC] transition-colors group-hover:border-[#FF5A1F]/20">
            <span className="block text-[9px] font-mono text-[#767571] uppercase">IMPACT</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-[#111111]">
              {project.impact_score}
            </span>
          </div>

          <div className="bg-[#F7F6F2] rounded-xl p-2.5 border border-[#E4E2DC] transition-colors group-hover:border-[#FF5A1F]/20">
            <span className="block text-[9px] font-mono text-[#767571] uppercase">DEPTH</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-[#111111]">
              {project.technical_depth_score}
            </span>
          </div>
        </div>

        {/* Composite Project Strength Signal */}
        <div className="flex items-center justify-between text-xs font-mono mb-4 px-1">
          <span className="text-[#767571] uppercase text-[10px]">PROJECT STRENGTH</span>
          <div className="flex items-center gap-2">
            <div className="w-20 bg-[#E4E2DC] h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#FF5A1F] h-full rounded-full transition-all duration-500"
                style={{ width: `${overallStrength}%` }}
              />
            </div>
            <span className="font-bold text-[#FF5A1F] text-xs">{overallStrength}/100</span>
          </div>
        </div>

        {/* Action Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            handleCardClick()
          }}
          className={`w-full py-3.5 sm:py-4 px-4 rounded-2xl font-mono text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-md group-hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/50 cursor-pointer ${
            isFeatured
              ? 'bg-[#FF5A1F] hover:bg-[#E04D16] text-white'
              : 'bg-[#111111] group-hover:bg-[#FF5A1F] text-white'
          }`}
        >
          <span>{isFeatured ? 'SELECT FEATURED BLUEPRINT' : 'EXPLORE THIS DIRECTION'}</span>
          <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
        </button>
      </div>
    </article>
  )
}
