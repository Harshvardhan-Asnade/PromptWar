import React from 'react'
import { Container } from './Container'

/**
 * Clean, minimal editorial footer in warm white.
 */
export const SiteFooter: React.FC = () => {
  return (
    <footer className="border-t border-border bg-[#F7F6F2]">
      <Container className="section-spacing-sm">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          {/* Brand Column */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-xl text-fg tracking-tight">
                PROJECT FORGE
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            </div>
            <p className="type-body text-fg-secondary max-w-sm text-sm">
              AI-powered project discovery and engineering blueprints for final-year students.
            </p>
          </div>

          {/* Metadata Column */}
          <div className="flex flex-col items-start gap-2 md:items-end">
            <span className="type-meta text-fg-muted">
              REACT + TYPESCRIPT + FASTAPI + GSAP + LENIS
            </span>
            <span className="type-meta text-fg-faint">
              PROJECT FORGE © 2026 // ALL RIGHTS RESERVED
            </span>
          </div>
        </div>
      </Container>
    </footer>
  )
}
