import React from 'react'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { GradientWaves, SplitText, ForgedSurfaceCanvas } from '../components/reactbits'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { useGsapContext } from '../hooks/useGsapContext'

/**
 * LANDING SECTION 1 — HERO (REFINED 5-SECTION EDITORIAL ARCHITECTURE)
 * Features React Bits Gradient Waves & Split Text with signature Project Forge aesthetics.
 */
export const HeroSection: React.FC = () => {
  const containerRef = useGsapContext(() => {
    if (prefersReducedMotion()) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.hero-top-meta', {
      opacity: 0,
      y: -12,
      duration: 0.5,
    })
      .from(
        '.hero-subtext',
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
        },
        '-=0.2'
      )
      .from(
        '.hero-cta-group',
        {
          opacity: 0,
          y: 16,
          duration: 0.5,
        },
        '-=0.3'
      )
      .from(
        '.hero-floating-tag',
        {
          opacity: 0,
          scale: 0.85,
          y: 15,
          duration: 0.7,
          stagger: 0.06,
          ease: 'back.out(1.4)',
        },
        '-=0.3'
      )

    gsap.to('.hero-floating-tag-even', {
      y: '-=8',
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    gsap.to('.hero-floating-tag-odd', {
      y: '+=10',
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  })

  const possibilityTags = [
    { label: 'PYTHON', role: 'SKILL', top: '14%', left: '70%' },
    { label: 'AI / ML', role: 'DOMAIN', top: '30%', left: '82%' },
    { label: 'REACT', role: 'SKILL', top: '50%', left: '68%' },
    { label: 'HEALTHCARE', role: 'DOMAIN', top: '68%', left: '80%' },
    { label: 'COMPUTER VISION', role: 'FIELD', top: '22%', left: '54%' },
    { label: 'IOT & EMBEDDED', role: 'EDGE', top: '82%', left: '60%' },
    { label: 'REAL-TIME DATA', role: 'SYSTEM', top: '76%', left: '76%' },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between pt-8 pb-12 md:pt-12 md:pb-14 border-b border-border bg-[#F7F6F2] overflow-hidden"
    >
      {/* Interactive Forged Liquid Surface Field Canvas */}
      <ForgedSurfaceCanvas />
      {/* React Bits Subtle Gradient Waves */}
      <GradientWaves className="opacity-30 pointer-events-none" />

      <Container className="w-full relative z-10">
        {/* Top Technical Metadata */}
        <div className="hero-top-meta flex items-center justify-between border-b border-border/80 pb-4 mb-8 md:mb-12">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              PROJECT FORGE / 001
            </span>
            <span className="text-border">|</span>
            <span className="type-meta text-fg-muted">IDEATION & BLUEPRINT ENGINE</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
            <span className="type-meta text-fg-muted font-medium">SYSTEM OPERATIONAL</span>
          </div>
        </div>

        {/* Main Editorial Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Monumental Split Text Typography */}
          <div className="lg:col-span-8">
            <div className="mb-6 md:mb-8">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-[#111111] leading-[1.05] uppercase">
                <SplitText text="YOUR SKILLS." delay={0.1} />
              </h1>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight text-accent leading-[1.05] uppercase mt-2">
                <SplitText text="YOUR NEXT PROJECT." delay={0.35} />
              </h1>
            </div>

            {/* Subheading */}
            <p className="hero-subtext text-base sm:text-xl text-[#5F5F5A] max-w-xl font-sans leading-relaxed mb-8 md:mb-10">
              Turn what you already know into a project worth building.
            </p>

            {/* CTA Group */}
            <div className="hero-cta-group flex flex-wrap items-center gap-4">
              <Button
                variant="primary"
                size="lg"
                href="#discovery"
                className="group flex items-center gap-3 px-8 py-4 text-xs font-semibold tracking-widest cursor-pointer shadow-md hover:shadow-xl"
              >
                <span>FIND MY PROJECT →</span>
              </Button>

              <a
                href="#how-it-works"
                className="font-mono text-xs uppercase tracking-wider text-[#5F5F5A] hover:text-[#111111] transition-colors px-4 py-3 border border-[#E4E2DC] rounded-xl bg-white hover:bg-[#F7F6F2]"
              >
                SEE HOW IT WORKS
              </a>
            </div>
          </div>

          {/* Right Column: Abstract Geometric Cloud */}
          <div className="hidden lg:block lg:col-span-4 relative h-[440px] w-full">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-80 h-80 rounded-full border border-border/80" />
              <div className="absolute w-60 h-60 rounded-full border border-border/60 border-dashed" />
              <div className="absolute w-40 h-40 rounded-full bg-[#FF5A1F]/10" />

              {possibilityTags.map((tag, idx) => (
                <div
                  key={idx}
                  className={`hero-floating-tag absolute px-3 py-1.5 bg-white border border-[#E4E2DC] rounded-xl shadow-xs flex items-center gap-2 ${
                    idx % 2 === 0 ? 'hero-floating-tag-even' : 'hero-floating-tag-odd'
                  }`}
                  style={{ top: tag.top, left: tag.left }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-[11px] font-bold text-[#111111] tracking-wider uppercase">
                    {tag.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Scroll Cue */}
      <Container className="w-full mt-8">
        <div className="flex items-center justify-between pt-4 border-t border-border text-fg-muted">
          <span className="type-meta tracking-widest text-fg-secondary">
            SCROLL TO DISCOVER ↓
          </span>
          <span className="type-meta tracking-widest hidden sm:inline">
            CAPSTONE / RESEARCH / ENGINEERING
          </span>
          <span className="type-meta tracking-widest">
            01 / 05
          </span>
        </div>
      </Container>
    </section>
  )
}
