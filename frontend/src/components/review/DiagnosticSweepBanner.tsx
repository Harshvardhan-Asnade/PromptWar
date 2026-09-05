import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../../lib/motion'

interface DiagnosticSweepBannerProps {
  projectTitle: string
}

export const DiagnosticSweepBanner: React.FC<DiagnosticSweepBannerProps> = ({ projectTitle }) => {
  const lineRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (prefersReducedMotion()) return

    const tl = gsap.timeline({ defaults: { ease: 'power3.inOut' } })

    if (lineRef.current) {
      tl.fromTo(
        lineRef.current,
        { scaleX: 0, transformOrigin: 'left center' },
        { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }
      )
    }

    if (badgeRef.current) {
      tl.fromTo(
        badgeRef.current,
        { opacity: 0, y: 6 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' },
        '-=0.2'
      )
    }
  }, [projectTitle])

  return (
    <div id="audit-results" className="pt-12 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4">
        <div>
          <span className="font-mono text-[11px] uppercase tracking-widest text-[#5F5F5A]">
            DIAGNOSTIC TARGET
          </span>
          <h2 className="text-xl sm:text-2xl font-bold font-display text-[#111111] tracking-tight">
            {projectTitle}
          </h2>
        </div>

        <div ref={badgeRef} className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#111111] text-white font-mono text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
            AUDIT COMPLETE
          </span>
          <span className="font-mono text-xs text-[#5F5F5A] hidden sm:inline">
            VERIFIED SPECIFICATION
          </span>
        </div>
      </div>

      {/* Thin Orange Diagnostic Sweep Line */}
      <div className="relative w-full h-[2px] bg-[#E4E2DC] overflow-hidden">
        <div
          ref={lineRef}
          className="absolute inset-0 bg-[#FF5A1F] h-full w-full"
        />
      </div>
    </div>
  )
}
