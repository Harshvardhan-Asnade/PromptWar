import React, { useRef } from 'react'
import { Container } from '../components/layout/Container'
import { Badge } from '../components/ui/Badge'
import { TechLabel } from '../components/ui/Typography'
import { useGsapContext } from '../hooks/useGsapContext'
import { gsap, prefersReducedMotion } from '../lib/motion'

/**
 * SECTION 04 — THE FORGE
 * The signature visual storytelling animation of Project Forge.
 * Pinned GSAP ScrollTrigger scrub communicating:
 * CHAOS → UNDERSTANDING → POSSIBILITY → DIRECTION
 */
export const ForgeConvergenceSection: React.FC = () => {
  const pinRef = useRef<HTMLDivElement>(null)

  const containerRef = useGsapContext((_, container) => {
    if (prefersReducedMotion()) return
    if (typeof window !== 'undefined' && window.innerWidth < 768) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=240%',
        pin: pinRef.current,
        scrub: 1,
        anticipatePin: 1,
      },
    })

    // Step 1: Elements drift inward from separated coordinates
    tl.to('.forge-skill-node', {
      x: 0,
      y: 0,
      opacity: 0.9,
      duration: 1.5,
      ease: 'power2.inOut',
    })
      .to(
        '.forge-interest-node',
        {
          x: 0,
          y: 0,
          opacity: 0.9,
          duration: 1.5,
          ease: 'power2.inOut',
        },
        '<'
      )
      .to(
        '.forge-constraint-node',
        {
          x: 0,
          y: 0,
          opacity: 0.9,
          duration: 1.5,
          ease: 'power2.inOut',
        },
        '<'
      )

      // Step 2: Stage indicator switches to UNDERSTANDING
      .to('.forge-stage-understanding', {
        opacity: 1,
        color: '#FF5A1F',
        duration: 0.6,
      })

      // Step 3: Central Core ignites into orange FORGE
      .to('.forge-center-core', {
        scale: 1.12,
        borderColor: '#FF5A1F',
        backgroundColor: '#FFFFFF',
        boxShadow: '0 12px 40px rgba(255,90,31,0.22)',
        duration: 1.2,
      })

      // Step 4: Text switches to ONE DIRECTION -> YOUR PROJECT
      .to('.forge-stage-direction', {
        opacity: 1,
        color: '#FF5A1F',
        duration: 0.6,
      })
      .to('.forge-nodes-wrapper', {
        opacity: 0.2,
        scale: 0.92,
        duration: 1,
      })

      // Step 5: Final resolved project blueprint card appears
      .fromTo(
        '.forge-blueprint-card',
        {
          opacity: 0,
          scale: 0.92,
          y: 35,
          pointerEvents: 'none',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.6,
          ease: 'power3.out',
          pointerEvents: 'auto',
        },
        '-=0.4'
      )
  }, [])

  return (
    <section
      id="forge"
      ref={containerRef}
      className="relative border-b border-border bg-[#F7F6F2] overflow-hidden"
    >
      <div
        ref={pinRef}
        className="min-h-screen flex flex-col justify-between py-10 md:py-16"
      >
        <Container className="w-full">
          {/* Top Metadata */}
          <div className="flex items-center justify-between border-b border-border/80 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <TechLabel dot>04 / THE FORGE</TechLabel>
              <span className="text-border">|</span>
              <span className="type-meta text-accent font-semibold">SIGNATURE SYNTHESIS</span>
            </div>
            <div className="hidden sm:flex items-center gap-3 font-mono text-xs">
              <span className="text-fg-muted">STAGE:</span>
              <span className="text-fg-faint">CHAOS</span>
              <span className="text-fg-faint">→</span>
              <span className="forge-stage-understanding text-fg-faint transition-colors duration-300">
                UNDERSTANDING
              </span>
              <span className="text-fg-faint">→</span>
              <span className="forge-stage-direction text-fg-faint transition-colors duration-300">
                DIRECTION
              </span>
            </div>
          </div>

          {/* Section Headline */}
          <div className="text-center max-w-2xl mx-auto mb-6 md:mb-10">
            <h2 className="type-h2 text-fg font-extrabold tracking-tight mb-2">
              Transforming chaos into conviction.
            </h2>
            <p className="type-body text-fg-secondary text-sm md:text-base">
              Separated variables converge into one coherent direction.
            </p>
          </div>
        </Container>

        {/* Central Convergence Arena */}
        <Container className="relative w-full max-w-4xl mx-auto flex items-center justify-center my-auto min-h-[380px] md:min-h-[460px]">
          {/* Subtle background coordinate circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40">
            <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border border-border border-dashed" />
            <div className="absolute w-[440px] h-[440px] md:w-[620px] md:h-[620px] rounded-full border border-border/60" />
            <div className="absolute w-full h-px bg-border/60" />
            <div className="absolute h-full w-px bg-border/60" />
          </div>

          {/* Converging Outer Tags */}
          <div className="forge-nodes-wrapper absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Left Cluster: Skills */}
            <div className="absolute left-2 md:left-8 flex flex-col gap-5">
              {[
                { label: 'PYTHON / FASTAPI', x: -130, y: -60 },
                { label: 'PYTORCH / ML', x: -160, y: 30 },
                { label: 'REACT / TS', x: -120, y: 110 },
              ].map((node, i) => (
                <div
                  key={i}
                  className="forge-skill-node px-3 py-1.5 bg-surface border border-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center gap-2"
                  style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-xs text-fg font-medium">{node.label}</span>
                  <span className="type-meta text-fg-muted">[SKILL]</span>
                </div>
              ))}
            </div>

            {/* Right Cluster: Constraints & Interests */}
            <div className="absolute right-2 md:right-8 flex flex-col gap-5">
              {[
                { label: 'HEALTHCARE TELEMETRY', x: 140, y: -60, cls: 'forge-interest-node', type: 'INTEREST' },
                { label: '3 DEVELOPERS', x: 170, y: 25, cls: 'forge-constraint-node', type: 'TEAM' },
                { label: '8-WEEK SEMESTER', x: 130, y: 110, cls: 'forge-constraint-node', type: 'CONSTRAINT' },
              ].map((node, i) => (
                <div
                  key={i}
                  className={`${node.cls} px-3 py-1.5 bg-surface border border-border shadow-[0_2px_12px_rgba(0,0,0,0.04)] flex items-center gap-2`}
                  style={{ transform: `translate(${node.x}px, ${node.y}px)` }}
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  <span className="font-mono text-xs text-fg font-medium">{node.label}</span>
                  <span className="type-meta text-fg-muted">[{node.type}]</span>
                </div>
              ))}
            </div>
          </div>

          {/* Central Core Emblem */}
          <div className="forge-center-core relative z-10 w-32 h-32 md:w-40 md:h-40 rounded-full border-2 border-border bg-surface flex flex-col items-center justify-center text-center p-3 transition-all duration-500 shadow-md">
            <span className="font-mono text-[0.6875rem] font-bold tracking-widest text-accent uppercase">
              PROJECT
            </span>
            <span className="font-display font-extrabold text-2xl md:text-3xl text-fg tracking-tight">
              FORGE
            </span>
            <span className="font-mono text-[0.625rem] text-fg-muted mt-1 uppercase tracking-wider">
              SYNTHESIS
            </span>
          </div>

          {/* Blueprint Card Overlay (Revealed via Scrub) */}
          <div className="forge-blueprint-card absolute z-20 max-w-lg w-full p-8 bg-surface border-2 border-accent shadow-[0_16px_50px_rgba(255,90,31,0.14)] opacity-0">
            <div className="flex items-center justify-between border-b border-border pb-4 mb-5">
              <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
                RECOMMENDED BLUEPRINT
              </span>
              <Badge variant="success" dot>FEASIBLE FOR SEMESTER</Badge>
            </div>
            <h3 className="font-display font-extrabold text-2xl md:text-3xl text-fg mb-3 tracking-tight">
              Adaptive Intelligence Engine
            </h3>
            <p className="type-body text-fg-secondary text-sm mb-6 leading-relaxed">
              High-throughput clinical decision engine with real-time auditability. Calibrated for
              3 developers in 8 weeks without external cloud expenses.
            </p>
            <div className="flex items-center justify-between pt-4 border-t border-border text-fg-muted font-mono text-xs">
              <span>INNOVATION: 92/100</span>
              <span>FEASIBILITY: 94/100</span>
            </div>
          </div>
        </Container>

        {/* Bottom Cue */}
        <Container className="w-full">
          <div className="flex items-center justify-between pt-4 border-t border-border text-fg-muted">
            <span className="type-meta">SCROLL TO RESOLVE FORGE</span>
            <span className="type-meta">04 / 07</span>
          </div>
        </Container>
      </div>
    </section>
  )
}
