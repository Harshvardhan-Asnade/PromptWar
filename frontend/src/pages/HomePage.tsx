import React, { useState } from 'react'
import { Navigation, SiteFooter } from '../components/layout'
import { CustomCursor } from '../components/ui'
import {
  HeroSection,
  QuestionSection,
  ProblemSection,
  InputsSection,
  ForgeConvergenceSection,
  PromiseSection,
  DeliverySequenceSection,
  StartBuildingSection,
  DesignSystemShowcase,
} from '../sections'

/**
 * PROJECT FORGE — LIGHT EDITORIAL LANDING EXPERIENCE
 * Warm white (#F7F6F2) + Crisp Black Typography (#111111) + Signature Orange (#FF5A1F).
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
        {/* HERO — EDITORIAL OPENING */}
        <HeroSection />

        {/* 01 — THE QUESTION */}
        <QuestionSection />

        {/* 02 — THE PROBLEM */}
        <ProblemSection />

        {/* 03 — THE INPUTS */}
        <InputsSection />

        {/* 04 — THE FORGE (PINNED CONVERGENCE) */}
        <ForgeConvergenceSection />

        {/* 05 — THE PROMISE */}
        <PromiseSection />

        {/* 06 — WHAT PROJECT FORGE DELIVERS (HORIZONTAL SEQUENCE) */}
        <DeliverySequenceSection />

        {/* 07 — FINAL CTA & PHASE 4 DISCOVERY GATEWAY */}
        <StartBuildingSection />

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
