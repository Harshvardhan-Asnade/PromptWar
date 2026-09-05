import React, { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useDiscovery } from '../context/DiscoveryContext'
import {
  ProjectDirectionCard,
  ProjectComparisonBar,
  type ComparisonDimension,
} from '../components/results'
import { prefersReducedMotion } from '../lib/motion'

export const ResultsPage: React.FC = () => {
  const { projects, selectProject, navigateTo, setStep, profile } = useDiscovery()
  const [activeDimension, setActiveDimension] = useState<ComparisonDimension>('all')
  const [currentSlide, setCurrentSlide] = useState<number>(0)

  // DOM Refs for GSAP Animation Stagger
  const labelRef = useRef<HTMLDivElement>(null)
  const headingRef = useRef<HTMLHeadingElement>(null)
  const subtextRef = useRef<HTMLParagraphElement>(null)
  const comparisonRef = useRef<HTMLDivElement>(null)
  const cardsContainerRef = useRef<HTMLDivElement>(null)
  const horizontalTrackRef = useRef<HTMLDivElement>(null)

  // SEO document title
  useEffect(() => {
    document.title = 'Project Forge — 3 AI Project Directions'
  }, [])

  // Staggered Entrance Reveal
  useEffect(() => {
    if (!projects || projects.length === 0) return

    if (prefersReducedMotion()) {
      return
    }

    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })

    tl.fromTo(
      labelRef.current,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.3 }
    )
      .fromTo(
        headingRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4 },
        '-=0.15'
      )
      .fromTo(
        subtextRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.35 },
        '-=0.2'
      )
      .fromTo(
        comparisonRef.current,
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3 },
        '-=0.15'
      )
      .fromTo(
        cardsContainerRef.current?.children || [],
        { opacity: 0, y: 24, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, stagger: 0.12 },
        '-=0.15'
      )
  }, [projects])

  // Desktop horizontal scroll navigation
  const scrollToCard = (index: number) => {
    setCurrentSlide(index)
    if (horizontalTrackRef.current) {
      const cardWidth = horizontalTrackRef.current.clientWidth
      horizontalTrackRef.current.scrollTo({
        left: index * (cardWidth * 0.82),
        behavior: 'smooth',
      })
    }
  }

  // Determine standout badge for each card based on dimension leaders
  const getStandoutBadge = (project: (typeof projects)[0]) => {
    const topInnovation = [...projects].sort((a, b) => b.innovation_score - a.innovation_score)[0]
    const topFeasibility = [...projects].sort((a, b) => b.feasibility_score - a.feasibility_score)[0]
    const topImpact = [...projects].sort((a, b) => b.impact_score - a.impact_score)[0]
    const topDepth = [...projects].sort((a, b) => b.technical_depth_score - a.technical_depth_score)[0]

    if (project.id === topInnovation?.id) return 'MOST INNOVATIVE'
    if (project.id === topFeasibility?.id) return 'MAX FEASIBILITY'
    if (project.id === topImpact?.id) return 'HIGHEST IMPACT'
    if (project.id === topDepth?.id) return 'DEEPEST TECH'
    return null
  }

  // Determine if card should be highlighted by activeDimension
  const isCardHighlighted = (project: (typeof projects)[0]) => {
    if (activeDimension === 'all') return false
    const sorted = [...projects].sort((a, b) => {
      if (activeDimension === 'innovation') return b.innovation_score - a.innovation_score
      if (activeDimension === 'feasibility') return b.feasibility_score - a.feasibility_score
      if (activeDimension === 'impact') return b.impact_score - a.impact_score
      if (activeDimension === 'depth') return b.technical_depth_score - a.technical_depth_score
      return 0
    })
    return project.id === sorted[0]?.id
  }

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#111111] selection:bg-[#FF5A1F]/15 selection:text-[#111111] font-sans pb-24">
      {/* Sticky Top Navigation */}
      <header className="sticky top-0 z-40 bg-[#F7F6F2]/95 backdrop-blur-md border-b border-[#E4E2DC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('landing')}
              className="group flex items-center gap-2 text-left"
            >
              <div className="w-7 h-7 bg-[#FF5A1F] rounded flex items-center justify-center text-white font-mono font-bold text-xs">
                PF
              </div>
              <span className="font-display font-black text-sm tracking-tight text-[#111111] group-hover:text-[#FF5A1F] transition-colors">
                PROJECT FORGE
              </span>
            </button>
            <span className="text-[#E4E2DC]">/</span>
            <span className="font-mono text-xs text-[#767571] uppercase tracking-widest hidden sm:inline">
              PROJECT DIRECTIONS
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setStep(1)
                navigateTo('discovery')
              }}
              className="px-4 py-2 rounded-xl border border-[#E4E2DC] hover:border-[#111111] bg-white text-[#111111] font-mono text-xs uppercase tracking-wider transition-colors"
            >
              ← ADJUST PROFILE
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        {/* If no projects exist (e.g. direct refresh or no generation yet) */}
        {!projects || projects.length === 0 ? (
          <div className="bg-white border border-[#E4E2DC] rounded-3xl p-10 sm:p-14 text-center max-w-lg mx-auto shadow-sm my-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E9] border border-[#FF5A1F]/30 text-[#FF5A1F] text-xs font-mono uppercase tracking-widest mb-6">
              <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
              PROFILE INCOMPLETE
            </div>
            <h2 className="text-2xl font-black font-display text-[#111111] mb-3">
              NO PROJECT DIRECTIONS AVAILABLE.
            </h2>
            <p className="text-sm text-[#5F5F5A] mb-8 font-sans">
              Complete the guided student discovery experience to synthesize your 3 AI-engineered project blueprints.
            </p>
            <button
              type="button"
              onClick={() => {
                setStep(1)
                navigateTo('discovery')
              }}
              className="px-8 py-3.5 bg-[#FF5A1F] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#E04D16] transition-all shadow-sm hover:shadow-md"
            >
              ← RETURN TO DISCOVERY
            </button>
          </div>
        ) : (
          <div>
            {/* Reveal Sequence Section Header */}
            <div className="mb-8 border-b border-[#E4E2DC] pb-8">
              {/* 1. Page Label */}
              <div ref={labelRef} className="flex items-center gap-3 mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFF0E9] text-[#FF5A1F] font-mono text-xs font-bold uppercase tracking-wider border border-[#FF5A1F]/30">
                  03 PROJECTS FOUND
                </span>
                <span className="text-[#E4E2DC]">|</span>
                <span className="font-mono text-xs text-[#767571] uppercase tracking-widest">
                  03 / PROJECT DIRECTIONS
                </span>
              </div>

              {/* 2. Headline */}
              <h1
                ref={headingRef}
                className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] font-display leading-[1.08]"
              >
                THREE DIRECTIONS.
                <br />
                <span className="text-[#FF5A1F]">ONE WILL FIT YOU BEST.</span>
              </h1>

              {/* 3. Supporting Text */}
              <p
                ref={subtextRef}
                className="mt-4 text-base sm:text-lg text-[#5F5F5A] max-w-3xl font-sans leading-relaxed"
              >
                These project directions were generated around your skills (
                <span className="text-[#111111] font-semibold">{profile.skills.slice(0, 3).join(', ')}</span>
                ), interests in{' '}
                <span className="text-[#111111] font-semibold">{profile.interests.join(', ') || 'AI / ML'}</span>
                , team size of <span className="text-[#111111] font-semibold">{profile.team_size}</span>, and{' '}
                <span className="text-[#111111] font-semibold">{profile.duration}</span> timeline.
              </p>
            </div>

            {/* 4. Comparison Strip */}
            <div ref={comparisonRef}>
              <ProjectComparisonBar
                projects={projects}
                activeDimension={activeDimension}
                onSelectDimension={setActiveDimension}
                onFocusProject={scrollToCard}
              />
            </div>

            {/* Desktop Horizontal Navigation Controls */}
            <div className="hidden lg:flex items-center justify-between mb-4 px-1">
              <div className="flex items-center gap-2 font-mono text-xs text-[#767571]">
                <span>DIRECTION</span>
                <span className="font-bold text-[#111111]">0{currentSlide + 1}</span>
                <span>/ 03</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => scrollToCard(Math.max(0, currentSlide - 1))}
                  disabled={currentSlide === 0}
                  className="w-9 h-9 rounded-xl border border-[#E4E2DC] hover:border-[#111111] bg-white flex items-center justify-center font-mono text-xs disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label="Previous project"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => scrollToCard(Math.min(projects.length - 1, currentSlide + 1))}
                  disabled={currentSlide === projects.length - 1}
                  className="w-9 h-9 rounded-xl border border-[#E4E2DC] hover:border-[#111111] bg-white flex items-center justify-center font-mono text-xs disabled:opacity-30 disabled:pointer-events-none transition-colors"
                  aria-label="Next project"
                >
                  →
                </button>
              </div>
            </div>

            {/* Project Directions Display:
                Desktop: 3-column editorial grid / horizontal track
                Mobile/Tablet: vertical stacked list with zero horizontal clipping */}
            <div
              ref={cardsContainerRef}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
            >
              {projects.map((project, idx) => (
                <ProjectDirectionCard
                  key={project.id || idx}
                  project={project}
                  index={idx}
                  isHighlighted={isCardHighlighted(project)}
                  standoutBadge={getStandoutBadge(project)}
                  onSelect={selectProject}
                />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
