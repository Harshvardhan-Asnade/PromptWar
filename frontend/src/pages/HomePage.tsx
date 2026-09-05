import React, { useState } from 'react'
import { Navigation, SiteFooter } from '../components/layout'
import { CustomCursor } from '../components/ui'
import {
  HeroSection,
  CompactProblemSection,
  HowItWorksSection,
  ShowcaseSection,
  CompactCtaSection,
  DesignSystemShowcase,
} from '../sections'

/**
 * PROJECT FORGE — REFINED 5-SECTION EDITORIAL LANDING EXPERIENCE
 * Warm white (#F7F6F2) + Crisp Black Typography (#111111) + Signature Orange (#FF5A1F).
 * Reduced to 5 concise sections with selective React Bits components.
 */
export const HomePage: React.FC = () => {
  const [showDesignSystem, setShowDesignSystem] = useState(false)

  return (
    <div className="grain-overlay min-h-screen bg-[#F7F6F2] text-fg selection:bg-accent/15 selection:text-fg font-sans">
      {/* Minimal Desktop Custom Cursor */}
      <CustomCursor />

      {/* Floating Light Navigation */}
      <Navigation />

      <main>
        {/* 01 — HERO */}
        <HeroSection />

        {/* 02 — THE PROBLEM */}
        <CompactProblemSection />

        {/* 03 — HOW IT WORKS */}
        <HowItWorksSection />

        {/* 04 — PROJECT SHOWCASE */}
        <ShowcaseSection />

        {/* 05 — FINAL CTA */}
        <CompactCtaSection />

        {/* Collapsible Component Spec Drawer (Dev Tooling) */}
        <section id="design-system" className="border-t border-border bg-surface py-8">
          <div className="container-page flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="type-meta text-accent font-semibold">DEV TOOLING</span>
              <span className="text-border">|</span>
              <span className="type-meta text-fg-muted">Design System Component Specs</span>
            </div>
            <button
              onClick={() => setShowDesignSystem(!showDesignSystem)}
              className="type-meta text-fg-muted hover:text-accent transition-colors underline cursor-pointer"
            >
              {showDesignSystem ? 'Hide Component Library ↑' : 'Inspect Component Library ↓'}
            </button>
          </div>

          {showDesignSystem && (
            <div className="mt-8 border-t border-border pt-8">
              <DesignSystemShowcase />
            </div>
          )}
        </section>
      </main>

      {/* Minimal Light Footer */}
      <SiteFooter />
    </div>
  )
}
