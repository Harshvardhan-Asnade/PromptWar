import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const metaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 40,
        duration: 1.2,
        ease: 'power3.out',
      })
      gsap.from(metaRef.current, {
        opacity: 0,
        y: 20,
        duration: 1.0,
        delay: 0.2,
        ease: 'power3.out',
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={containerRef}
      className="relative min-h-[75vh] border-b border-[#1C202A] px-6 py-20 md:px-12 md:py-28"
    >
      <div className="mx-auto max-w-7xl">
        {/* Meta Header */}
        <div
          ref={metaRef}
          className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-[#181C26] pb-4 font-editorial-mono text-xs uppercase tracking-widest text-[#71788E]"
        >
          <div className="flex items-center gap-3">
            <span className="h-1.5 w-1.5 bg-[#E5A93C]" />
            <span>Capstone Engineering Intelligence</span>
          </div>
          <div>SYSTEM_RELEASE: V0.1.0-STABLE</div>
          <div className="hidden md:block">LOC: /SRC/CORE</div>
        </div>

        {/* Asymmetric Editorial Hero Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <h1
              ref={titleRef}
              className="font-editorial-serif text-5xl font-normal leading-[1.08] tracking-tight text-[#F3F4F6] sm:text-6xl md:text-7xl lg:text-8xl"
            >
              Transforming raw engineering ambition into rigorous architectural blueprints.
            </h1>
          </div>

          <div className="flex flex-col justify-end space-y-6 lg:col-span-4 lg:pl-8">
            <p className="font-sans text-base font-light leading-relaxed text-[#9CA3AF] md:text-lg">
              Project Forge provides final-year students with bespoke, high-impact project
              formulations and compiles them into concrete technical specifications, data
              architectures, and execution roadmaps.
            </p>

            <div className="border-t border-[#1C202A] pt-6 font-editorial-mono text-xs text-[#8A90A2]">
              <div className="flex justify-between py-1">
                <span>IDEATION ENGINE</span>
                <span className="text-white font-medium">STRUCTURED PYDANTIC</span>
              </div>
              <div className="flex justify-between py-1">
                <span>MOTION RUNTIME</span>
                <span className="text-white font-medium">GSAP + LENIS RAF</span>
              </div>
              <div className="flex justify-between py-1">
                <span>FASTAPI BACKEND</span>
                <span className="text-white font-medium">PORT 8000</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
