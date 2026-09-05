import React, { useRef } from 'react'
import { Container } from '../components/layout/Container'
import { Badge } from '../components/ui/Badge'
import { TechLabel } from '../components/ui/Typography'
import { useGsapContext } from '../hooks/useGsapContext'
import { gsap, prefersReducedMotion } from '../lib/motion'

/**
 * 04 — THE DISCOVERY
 * Major pinned ScrollTrigger sequence showing scattered variables converging into a blueprint.
 * CHAOS → UNDERSTANDING → POSSIBILITY
 */
export const DiscoveryConvergenceSection: React.FC = () => {
  const pinTargetRef = useRef<HTMLDivElement>(null)

  const containerRef = useGsapContext((_, container) => {
    if (prefersReducedMotion()) return
    // Only pin on medium screens and up to maintain mobile scroll ergonomics
    if (typeof window !== 'undefined' && window.innerWidth < 768) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top top',
        end: '+=200%',
        pin: pinTargetRef.current,
        scrub: 1,
        anticipatePin: 1,
      },
    })

    // Step 1: Convergence of scattered nodes inward
    tl.to('.converge-node-left', {
      x: 0,
      y: 0,
      opacity: 0.85,
      duration: 1.5,
      ease: 'power2.inOut',
    })
      .to(
        '.converge-node-right',
        {
          x: 0,
          y: 0,
          opacity: 0.85,
          duration: 1.5,
          ease: 'power2.inOut',
        },
        '<'
      )
      // Step 2: State progression highlight
      .to('.convergence-status-highlight', {
        color: '#E5A93C',
        duration: 0.5,
      })
      // Step 3: Central core ignition
      .to('.central-core-ring', {
        scale: 1.15,
        borderColor: '#E5A93C',
        boxShadow: '0 0 50px rgba(229, 169, 60, 0.25)',
        duration: 1,
      })
      // Step 4: Resolution into the final blueprint preview
      .to('.converge-nodes-container', {
        opacity: 0.25,
        scale: 0.95,
        duration: 1,
      })
      .fromTo(
        '.central-blueprint-reveal',
        {
          opacity: 0,
          scale: 0.9,
          y: 25,
          pointerEvents: 'none',
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: 'power3.out',
          pointerEvents: 'auto',
        },
        '-=0.5'
      )
  }, [])

  const leftNodes = [
    { label: 'Python / FastAPI', type: 'SKILL', x: -140, y: -60 },
    { label: 'Machine Learning', type: 'SKILL', x: -180, y: 30 },
    { label: 'Healthcare Domain', type: 'INTEREST', x: -130, y: 110 },
  ]

  const rightNodes = [
    { label: 'Computer Vision', type: 'SKILL', x: 150, y: -70 },
    { label: '3 Developers', type: 'TEAM', x: 170, y: 20 },
    { label: '8-Week Timeline', type: 'CONSTRAINT', x: 140, y: 100 },
  ]

  return (
    <section
      id="discovery-convergence"
      ref={containerRef}
      className="relative border-b border-border bg-canvas-raised overflow-hidden"
    >
      <div
        ref={pinTargetRef}
        className="min-h-screen flex flex-col justify-between py-12 md:py-16"
      >
        <Container className="w-full">
          {/* Header Metadata */}
          <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-8">
            <div className="flex items-center gap-3">
              <TechLabel dot>04 / THE DISCOVERY</TechLabel>
              <span className="text-border">|</span>
              <span className="type-meta text-accent">SYNTHESIS ENGINE</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="type-meta text-fg-faint">STAGE:</span>
              <span className="convergence-status-highlight type-meta text-fg font-medium tracking-widest transition-colors duration-500">
                CHAOS → UNDERSTANDING → POSSIBILITY
              </span>
            </div>
          </div>

          {/* Section Narrative Headline */}
          <div className="text-center max-w-2xl mx-auto mb-8 md:mb-12">
            <h2 className="type-h2 text-fg mb-3">
              Variables converge into a blueprint.
            </h2>
            <p className="type-body text-fg-secondary text-sm md:text-base">
              Watch distinct abilities and constraints coalesce into a unified, high-conviction
              engineering architecture.
            </p>
          </div>
        </Container>

        {/* Dynamic Convergence Arena */}
        <Container className="relative w-full max-w-4xl mx-auto flex items-center justify-center my-auto min-h-[380px] md:min-h-[460px]">
          {/* Background Radial Coordinate Lines */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
            <div className="w-64 h-64 md:w-96 md:h-96 rounded-full border border-border border-dashed" />
            <div className="absolute w-[440px] h-[440px] md:w-[620px] md:h-[620px] rounded-full border border-border/40" />
            <div className="absolute w-full h-px bg-border/40" />
            <div className="absolute h-full w-px bg-border/40" />
          </div>

          {/* Converging Outer Tags */}
          <div className="converge-nodes-container absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Left Node Cluster */}
            <div className="absolute left-4 md:left-12 flex flex-col gap-4 md:gap-7">
              {leftNodes.map((node, i) => (
                <div
                  key={i}
                  className="converge-node-left px-3.5 py-2 bg-surface border border-border flex items-center gap-2.5 shadow-sm transition-transform"
                  style={{
                    transform: `translate(${node.x}px, ${node.y}px)`,
                  }}
                >
                  <span className="h-1.5 w-1.5 bg-accent rounded-full" />
                  <span className="type-label text-fg">{node.label}</span>
                  <span className="type-meta text-fg-faint">[{node.type}]</span>
                </div>
              ))}
            </div>

            {/* Right Node Cluster */}
            <div className="absolute right-4 md:right-12 flex flex-col gap-4 md:gap-7">
              {rightNodes.map((node, i) => (
                <div
                  key={i}
                  className="converge-node-right px-3.5 py-2 bg-surface border border-border flex items-center gap-2.5 shadow-sm transition-transform"
                  style={{
                    transform: `translate(${node.x}px, ${node.y}px)`,
                  }}
                >
                  <span className="h-1.5 w-1.5 bg-accent-text rounded-full" />
                  <span className="type-label text-fg">{node.label}</span>
                  <span className="type-meta text-fg-faint">[{node.type}]</span>
                </div>
              ))}
            </div>
          </div>

          {/* Central Core Emblem */}
          <div className="central-core-ring relative z-10 w-28 h-28 md:w-36 md:h-36 rounded-full border border-border bg-surface/90 backdrop-blur-md flex flex-col items-center justify-center text-center p-2 transition-all duration-500">
            <span className="type-label text-accent font-semibold tracking-widest text-[0.625rem]">
              PROJECT
            </span>
            <span className="font-serif text-xl md:text-2xl text-fg tracking-tight">
              FORGE
            </span>
            <span className="type-meta text-fg-muted mt-1 text-[0.5625rem]">
              CORE V0.2
            </span>
          </div>

          {/* Blueprint Card Overlay (Revealed via Scrub) */}
          <div className="central-blueprint-reveal absolute z-20 max-w-md w-full p-6 md:p-8 bg-surface border border-accent/60 shadow-2xl opacity-0 md:opacity-0">
            <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
              <span className="type-label text-accent">RECOMMENDED BLUEPRINT</span>
              <Badge variant="success" dot>FEASIBLE</Badge>
            </div>
            <h3 className="type-h3 text-fg mb-2">
              Adaptive Intelligence Engine
            </h3>
            <p className="type-small text-fg-secondary text-xs mb-5">
              High-throughput decision infrastructure with real-time auditability. Calibrated for
              3 developers across an 8-week horizon.
            </p>
            <div className="flex items-center justify-between pt-3 border-t border-border/60 text-fg-faint">
              <span className="type-meta">INNOVATION: 92/100</span>
              <span className="type-meta">FEASIBILITY: 89/100</span>
            </div>
          </div>
        </Container>

        {/* Footer Cue */}
        <Container className="w-full">
          <div className="flex items-center justify-between pt-6 border-t border-border/40 text-fg-faint">
            <span className="type-meta">
              SCROLL DRIVEN CONVERGENCE
            </span>
            <span className="type-meta">
              04 / 06
            </span>
          </div>
        </Container>
      </div>
    </section>
  )
}
