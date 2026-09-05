import React, { useRef, useEffect } from 'react'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { GradientWaves, SplitText, ForgedSurfaceCanvas } from '../components/reactbits'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { useGsapContext } from '../hooks/useGsapContext'

interface TechPillConfig {
  label: string
  role: string
  top: string
  left: string
  visibility?: string
}

/**
 * Controlled Radial Technology Pills Placement System.
 * Every pill has an explicitly calculated, collision-free coordinate
 * around the central Forge Core, using percentage positioning and translate(-50%, -50%).
 * Priority pills remain visible on all screens; secondary pills activate on sm/desktop
 * to guarantee zero overlapping, zero wrapping, and zero horizontal clipping.
 */
const TECHNOLOGY_PILLS: TechPillConfig[] = [
  // 1. Python (North) - Priority
  { label: 'PYTHON', role: 'CORE SKILL', top: '7%', left: '50%' },
  // 2. Computer Vision (North-West) - Priority
  { label: 'COMPUTER VISION', role: 'FIELD', top: '22%', left: '18%' },
  // 3. AI / ML (North-East) - Priority
  { label: 'AI / ML', role: 'DOMAIN', top: '24%', left: '82%' },
  // 4. React (East) - Priority
  { label: 'REACT', role: 'FRONTEND', top: '50%', left: '86%' },
  // 5. Healthcare (South-East) - Priority
  { label: 'HEALTHCARE', role: 'DOMAIN', top: '76%', left: '80%' },
  // 6. IoT & Embedded (South-West) - Secondary
  { label: 'IOT & EMBEDDED', role: 'EDGE', top: '74%', left: '20%', visibility: 'hidden sm:block' },
  // 7. Real-Time Data (South) - Secondary
  { label: 'REAL-TIME DATA', role: 'SYSTEM', top: '93%', left: '50%', visibility: 'hidden sm:block' },
]

/**
 * LANDING SECTION 1 — HERO
 * Refined Two-Zone Editorial Architecture:
 * Left: Monumental Split Text Headline + Subheading + Dual CTAs
 * Right: Central Forge Core + Concentric Thin Orbits + Balanced Technology Pills
 * Vertically clamped to prevent detachment on tall screens (1080p+).
 */
export const HeroSection: React.FC = () => {
  const visualRef = useRef<HTMLDivElement>(null)

  const containerRef = useGsapContext(() => {
    if (prefersReducedMotion()) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // 1. Coordinated entrance sequence
    tl.from('.hero-top-meta', {
      opacity: 0,
      y: -10,
      duration: 0.5,
    })
      .from(
        '.hero-subtext',
        {
          opacity: 0,
          y: 16,
          duration: 0.6,
        },
        '-=0.2'
      )
      .from(
        '.hero-cta-group',
        {
          opacity: 0,
          y: 14,
          duration: 0.5,
        },
        '-=0.3'
      )
      .from(
        '.hero-forge-visual-container',
        {
          opacity: 0,
          scale: 0.92,
          duration: 0.8,
          ease: 'power2.out',
        },
        '-=0.4'
      )
      .from(
        '.hero-tech-pill',
        {
          opacity: 0,
          scale: 0.8,
          duration: 0.6,
          stagger: 0.05,
          ease: 'back.out(1.3)',
        },
        '-=0.4'
      )
      .from(
        '.hero-bottom-meta',
        {
          opacity: 0,
          y: 10,
          duration: 0.5,
        },
        '-=0.3'
      )

    // 2. Continuous ultra-subtle orbital/vertical breathing (8s to 13s, extremely smooth)
    const pills = gsap.utils.toArray<HTMLElement>('.hero-tech-pill')
    pills.forEach((pill, i) => {
      const dur = 8.5 + (i % 4) * 1.5 // 8.5s to 13s
      const yShift = 3.5 + (i % 3) * 1.5 // 3.5px to 6.5px subtle lift
      gsap.to(pill, {
        y: `+=${i % 2 === 0 ? yShift : -yShift}`,
        duration: dur,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.35,
      })
    })

    // 3. Gentle Forge Core pulse
    gsap.to('.hero-forge-core', {
      scale: 1.025,
      duration: 5.5,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  })

  // 4. Subtle pointer parallax on Forge Core (controlled, maximum ±8px)
  useEffect(() => {
    if (prefersReducedMotion()) return
    const container = containerRef.current
    const visual = visualRef.current
    if (!container || !visual) return

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect()
      const relX = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
      const relY = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)

      const clampedX = Math.max(-1, Math.min(1, relX))
      const clampedY = Math.max(-1, Math.min(1, relY))

      gsap.to('.hero-forge-core-group', {
        x: clampedX * 8,
        y: clampedY * 6,
        duration: 0.9,
        ease: 'power2.out',
        overwrite: 'auto',
      })
    }

    container.addEventListener('pointermove', handlePointerMove, { passive: true })
    return () => {
      container.removeEventListener('pointermove', handlePointerMove)
    }
  }, [containerRef])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[clamp(560px,calc(100svh-5rem),820px)] flex flex-col justify-between py-6 sm:py-8 lg:py-10 border-b border-border bg-[#F7F6F2] overflow-hidden"
    >
      {/* Layer 1: Interactive Forged Liquid Surface Field Canvas */}
      <ForgedSurfaceCanvas />

      {/* Layer 2: Subtle React Bits Ambient Wave Texture */}
      <GradientWaves className="opacity-25 pointer-events-none" />

      {/* Layer 3: Foreground Content Container (Single Bounded Container) */}
      <Container className="w-full h-full flex flex-col justify-between flex-1 relative z-10 max-w-7xl mx-auto">
        {/* TOP TECHNICAL METADATA ROW */}
        <div className="hero-top-meta flex items-center justify-between border-b border-border/80 pb-3 mb-4 sm:mb-6 lg:mb-8 w-full">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              PROJECT FORGE / 001
            </span>
            <span className="text-border">|</span>
            <span className="type-meta text-fg-muted font-medium">IDEATION & BLUEPRINT ENGINE</span>
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
            <span className="type-meta text-fg-muted font-semibold tracking-wider">
              SYSTEM OPERATIONAL
            </span>
          </div>
        </div>

        {/* MAIN TWO-ZONE HERO GRID */}
        <div className="my-auto py-2 sm:py-4 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-14 items-center w-full">
          {/* LEFT ZONE: MONUMENTAL EDITORIAL HEADLINE + CTA */}
          <div className="flex flex-col justify-center">
            <div className="mb-5 sm:mb-6">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-black font-display tracking-tight text-[#111111] leading-[1.04] uppercase">
                <SplitText text="YOUR SKILLS." delay={0.08} />
              </h1>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.25rem] font-black font-display tracking-tight text-accent leading-[1.04] uppercase mt-1 sm:mt-2">
                <SplitText text="YOUR NEXT PROJECT." delay={0.28} />
              </h1>
            </div>

            {/* Subheading */}
            <p className="hero-subtext text-base sm:text-lg lg:text-xl text-[#5F5F5A] max-w-xl font-sans leading-relaxed mb-6 sm:mb-8">
              Turn what you already know into a project worth building.
            </p>

            {/* Dual CTA Button Group */}
            <div className="hero-cta-group flex flex-wrap items-center gap-3.5">
              <Button
                variant="primary"
                size="lg"
                href="#discovery"
                className="group flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 text-xs font-semibold tracking-widest cursor-pointer shadow-md hover:shadow-xl transition-all"
              >
                <span>FIND MY PROJECT →</span>
              </Button>

              <a
                href="#how-it-works"
                className="font-mono text-xs uppercase tracking-wider text-[#5F5F5A] hover:text-[#111111] transition-colors px-4 py-3 sm:py-3.5 border border-[#E4E2DC] rounded-xl bg-white hover:bg-[#F7F6F2] shadow-2xs"
              >
                SEE HOW IT WORKS
              </a>
            </div>
          </div>

          {/* RIGHT ZONE: FORGE CORE + ORBITS + BALANCED TECHNOLOGY PILLS */}
          <div className="flex items-center justify-center relative w-full pt-4 lg:pt-0">
            <div
              ref={visualRef}
              className="hero-forge-visual-container relative w-full max-w-[400px] sm:max-w-[440px] lg:max-w-[460px] aspect-square mx-auto flex items-center justify-center select-none"
            >
              {/* Soft Peach/Orange Ambient Aura */}
              <div
                className="absolute w-48 h-48 sm:w-56 sm:h-56 rounded-full bg-gradient-to-br from-[#FF5A1F]/15 via-[#FF8A50]/10 to-transparent blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Outer Fine Orbit Ring */}
              <div
                className="absolute w-[350px] h-[350px] sm:w-[390px] sm:h-[390px] lg:w-[410px] lg:h-[410px] rounded-full border border-[#E4E2DC]/80 pointer-events-none"
                aria-hidden="true"
              />

              {/* Mid Dashed Orbit Ring */}
              <div
                className="absolute w-[250px] h-[250px] sm:w-[280px] sm:h-[280px] lg:w-[300px] lg:h-[300px] rounded-full border border-[#FF5A1F]/20 border-dashed pointer-events-none"
                aria-hidden="true"
              />

              {/* Inner Subtle Orbit Ring */}
              <div
                className="absolute w-[170px] h-[170px] sm:w-[190px] sm:h-[190px] lg:w-[200px] lg:h-[200px] rounded-full border border-[#E4E2DC]/60 pointer-events-none"
                aria-hidden="true"
              />

              {/* Central Forge Core (Parallax-Enabled) */}
              <div
                className="hero-forge-core-group relative z-10 flex items-center justify-center pointer-events-none"
                aria-hidden="true"
              >
                <div className="hero-forge-core w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-[#FFF0E9] via-[#FFE5D8] to-[#FFD8C4] border border-[#FF5A1F]/30 shadow-[0_4px_24px_rgba(255,90,31,0.12)] flex flex-col items-center justify-center p-2 text-center transition-transform">
                  <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse mb-1 shadow-[0_0_8px_rgba(255,90,31,0.6)]" />
                  <span className="font-mono text-[9px] sm:text-[10px] font-bold text-[#FF5A1F] uppercase tracking-wider">
                    FORGE CORE
                  </span>
                  <span className="font-mono text-[8px] text-[#767571] uppercase tracking-widest mt-0.5">
                    SPEC SYNTHESIS
                  </span>
                </div>
              </div>

              {/* Radial Technology Signals Placement */}
              <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                {TECHNOLOGY_PILLS.map((pill) => (
                  <div
                    key={pill.label}
                    className={`hero-tech-pill absolute z-20 ${pill.visibility || ''}`}
                    style={{
                      top: pill.top,
                      left: pill.left,
                      transform: 'translate(-50%, -50%)',
                    }}
                  >
                    <div
                      className="px-3 sm:px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-[#E4E2DC] shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex items-center gap-2 hover:scale-105 hover:-translate-y-0.5 hover:border-[#FF5A1F]/50 hover:shadow-[0_4px_16px_rgba(255,90,31,0.14)] transition-all duration-300 pointer-events-auto cursor-default"
                      title={`${pill.label} — ${pill.role}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] shrink-0" />
                      <span className="font-mono text-[10px] sm:text-[11px] font-bold text-[#111111] tracking-wider uppercase whitespace-nowrap">
                        {pill.label}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM METADATA ROW */}
        <div className="hero-bottom-meta flex items-center justify-between pt-3 border-t border-border text-fg-muted w-full mt-4 sm:mt-6 lg:mt-8">
          <span className="type-meta tracking-widest text-fg-secondary font-medium">
            SCROLL TO DISCOVER ↓
          </span>
          <span className="type-meta tracking-widest hidden md:inline font-medium">
            CAPSTONE / RESEARCH / ENGINEERING
          </span>
          <span className="type-meta tracking-widest font-mono font-bold text-fg-secondary">
            01 / 05
          </span>
        </div>
      </Container>
    </section>
  )
}
