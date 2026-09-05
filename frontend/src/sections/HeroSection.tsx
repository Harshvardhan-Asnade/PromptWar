import React from 'react'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { GradientWaves, SplitText, ForgedSurfaceCanvas } from '../components/reactbits'
import { ForgeBlueprintVisual } from '../components/hero/ForgeBlueprintVisual'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { useGsapContext } from '../hooks/useGsapContext'

/**
 * LANDING SECTION 1 — HERO
 * Refined Two-Zone Editorial Architecture:
 * Left: Monumental Split Text Headline + Subheading + Dual CTAs
 * Right: Living Blueprint + Forge Assembly Architectural Visualization
 * Vertically clamped to prevent detachment on tall screens (1080p+).
 */
export const HeroSection: React.FC = () => {
  const containerRef = useGsapContext(() => {
    if (prefersReducedMotion()) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    // Coordinated entrance sequence for editorial hero text and CTAs
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
        '.hero-bottom-meta',
        {
          opacity: 0,
          y: 10,
          duration: 0.5,
        },
        '-=0.2'
      )
  })

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

          {/* RIGHT ZONE: LIVING BLUEPRINT + FORGE ASSEMBLY ARCHITECTURAL VISUAL */}
          <div className="flex items-center justify-center relative w-full pt-4 lg:pt-0">
            <ForgeBlueprintVisual />
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
