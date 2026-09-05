import React from 'react'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'
import { gsap, prefersReducedMotion } from '../lib/motion'
import { useGsapContext } from '../hooks/useGsapContext'

/**
 * HERO — COMPLETE REDESIGN
 * Light editorial composition with oversized Manrope typography,
 * signature orange highlight, and subtle floating possibility labels.
 */
export const HeroSection: React.FC = () => {
  const containerRef = useGsapContext(() => {
    if (prefersReducedMotion()) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.from('.hero-top-meta', {
      opacity: 0,
      y: -15,
      duration: 0.6,
    })
      .from(
        '.hero-title-line',
        {
          opacity: 0,
          y: 40,
          duration: 0.9,
          stagger: 0.12,
        },
        '-=0.3'
      )
      .from(
        '.hero-subtext',
        {
          opacity: 0,
          y: 20,
          duration: 0.7,
        },
        '-=0.4'
      )
      .from(
        '.hero-cta-group',
        {
          opacity: 0,
          y: 20,
          duration: 0.6,
        },
        '-=0.4'
      )
      .from(
        '.hero-floating-tag',
        {
          opacity: 0,
          scale: 0.85,
          y: 20,
          duration: 0.8,
          stagger: 0.08,
          ease: 'back.out(1.4)',
        },
        '-=0.5'
      )

    // Subtle floating idle motion for the possibility tags
    gsap.to('.hero-floating-tag-even', {
      y: '-=10',
      duration: 2.8,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
    gsap.to('.hero-floating-tag-odd', {
      y: '+=12',
      duration: 3.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
    })
  })

  const possibilityTags = [
    { label: 'PYTHON', role: 'SKILL', top: '12%', left: '72%' },
    { label: 'AI / ML', role: 'DOMAIN', top: '28%', left: '84%' },
    { label: 'REACT', role: 'SKILL', top: '48%', left: '70%' },
    { label: 'HEALTHCARE', role: 'DOMAIN', top: '65%', left: '82%' },
    { label: 'COMPUTER VISION', role: 'FIELD', top: '20%', left: '56%' },
    { label: 'IOT & EMBEDDED', role: 'EDGE', top: '82%', left: '60%' },
    { label: 'REAL-TIME DATA', role: 'SYSTEM', top: '78%', left: '78%' },
  ]

  return (
    <section
      ref={containerRef}
      className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between pt-8 pb-12 md:pt-14 md:pb-16 border-b border-border bg-[#F7F6F2] overflow-hidden"
    >
      <Container className="w-full relative z-10">
        {/* Top Technical Metadata */}
        <div className="hero-top-meta flex items-center justify-between border-b border-border/80 pb-4 mb-10 md:mb-16">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              PROJECT FORGE / 001
            </span>
            <span className="text-border">|</span>
            <span className="type-meta text-fg-muted">IDEATION & BLUEPRINT ENGINE</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-accent animate-ping" />
            <span className="type-meta text-fg-muted font-medium">DISCOVERY SYSTEM READY</span>
          </div>
        </div>

        {/* Main Editorial Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Monumental Typography */}
          <div className="lg:col-span-8">
            <div className="mb-6 md:mb-8">
              <h1 className="hero-title-line type-display tracking-tight text-fg font-extrabold uppercase">
                YOU HAVE
              </h1>
              <h1 className="hero-title-line type-display tracking-tight text-fg font-extrabold uppercase">
                THE SKILLS.
              </h1>
            </div>

            <div className="mb-8 md:mb-12">
              <h2 className="hero-title-line type-display tracking-tight text-fg font-extrabold uppercase">
                NOW DISCOVER
              </h2>
              <h2 className="hero-title-line type-display tracking-tight text-fg font-extrabold uppercase">
                WHAT THEY CAN
              </h2>
              <h2 className="hero-title-line type-display tracking-tight font-extrabold uppercase">
                <span className="text-accent underline decoration-accent/30 decoration-8 underline-offset-8">
                  BECOME.
                </span>
              </h2>
            </div>

            <p className="hero-subtext type-body text-fg-secondary max-w-xl text-lg md:text-xl font-normal leading-relaxed mb-10">
              Turn your skills, interests and constraints into a project you can actually build.
            </p>

            {/* CTA Group */}
            <div className="hero-cta-group flex flex-wrap items-center gap-5">
              <Button
                variant="primary"
                size="lg"
                href="#discovery"
                className="group flex items-center gap-3 px-9 py-4 text-xs font-semibold tracking-widest"
              >
                <span>START BUILDING</span>
                <svg
                  className="w-4 h-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </Button>

              <a
                href="#question"
                className="font-mono text-xs uppercase tracking-wider text-fg-muted hover:text-accent transition-colors px-3 py-2"
              >
                EXPLORE STORY ↓
              </a>
            </div>
          </div>

          {/* Right Column: Abstract Geometric Possibility Cloud */}
          <div className="hidden lg:block lg:col-span-4 relative h-[480px] w-full">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Subtle background circles */}
              <div className="w-80 h-80 rounded-full border border-border/80" />
              <div className="absolute w-60 h-60 rounded-full border border-border/60 border-dashed" />
              <div className="absolute w-40 h-40 rounded-full bg-accent-light/40" />

              {/* Floating tags */}
              {possibilityTags.map((tag, idx) => (
                <div
                  key={idx}
                  className={`hero-floating-tag absolute px-3 py-1.5 bg-surface border border-border shadow-[0_4px_16px_rgba(0,0,0,0.04)] flex items-center gap-2 ${
                    idx % 2 === 0 ? 'hero-floating-tag-even' : 'hero-floating-tag-odd'
                  }`}
                  style={{ top: tag.top, left: tag.left }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-[0.6875rem] font-medium text-fg tracking-wider uppercase">
                    {tag.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Scroll Cue */}
      <Container className="w-full mt-10">
        <div className="flex items-center justify-between pt-5 border-t border-border text-fg-muted">
          <span className="type-meta tracking-widest text-fg-secondary">
            SCROLL TO DISCOVER ↓
          </span>
          <span className="type-meta tracking-widest hidden sm:inline">
            CAPSTONE / RESEARCH / ENGINEERING
          </span>
          <span className="type-meta tracking-widest">
            01 / 07
          </span>
        </div>
      </Container>
    </section>
  )
}
