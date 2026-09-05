import React from 'react'
import { Container } from '../components/layout/Container'
import { Button } from '../components/ui/Button'

/**
 * LANDING SECTION 5 — FINAL CTA (05 / 05)
 * Confident closing call-to-action leading directly into the student discovery engine.
 */
export const CompactCtaSection: React.FC = () => {
  return (
    <section id="cta" className="py-24 sm:py-32 bg-[#111111] text-white relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent/15 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block px-3 py-1 rounded-full bg-accent text-white font-mono text-xs font-bold uppercase tracking-widest mb-6">
            05 / LAUNCH YOUR CAPSTONE
          </span>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-black font-display tracking-tight leading-[1.05] uppercase mb-6">
            STOP SEARCHING <br />
            FOR A PROJECT. <br />
            <span className="text-accent">START BUILDING ONE.</span>
          </h2>

          <p className="text-sm sm:text-base text-[#E4E2DC]/80 font-sans max-w-lg mx-auto mb-10 leading-relaxed">
            Answer 4 targeted questions about your skills, team size, and timeline. Get three verified engineering blueprints in under 30 seconds.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              href="#discovery"
              className="w-full sm:w-auto px-10 py-5 text-xs font-bold uppercase tracking-widest shadow-xl hover:shadow-2xl cursor-pointer"
            >
              FIND MY PROJECT →
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
