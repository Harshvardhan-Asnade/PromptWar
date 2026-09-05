import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import type { ProjectIdea } from '../../types/discovery'
import { prefersReducedMotion } from '../../lib/motion'

interface SystemArchitectureDiagramProps {
  project: ProjectIdea
}

export const SystemArchitectureDiagram: React.FC<SystemArchitectureDiagramProps> = ({ project }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const nodesRef = useRef<HTMLDivElement>(null)

  const nodes = project.architecture && project.architecture.length > 0
    ? project.architecture
    : ['Client Gateway', 'Application Service', 'Core Inference Engine', 'Telemetry Datastore']

  useEffect(() => {
    if (prefersReducedMotion() || !nodesRef.current) return

    const elements = nodesRef.current.children
    gsap.fromTo(
      elements,
      { opacity: 0, y: 20, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
        },
      }
    )
  }, [nodes.length])

  return (
    <section
      id="architecture"
      ref={containerRef}
      className="py-14 border-b border-[#E4E2DC] scroll-mt-32"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
        <span className="font-mono text-xs font-bold text-[#FF5A1F] uppercase tracking-widest">
          SECTION 06 // SYSTEM ARCHITECTURE & DATA FLOW
        </span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] font-display tracking-tight mb-4">
        MODULAR SYSTEM ARCHITECTURE
      </h2>

      <p className="text-sm sm:text-base text-[#5F5F5A] max-w-2xl font-sans mb-12">
        End-to-end component topology detailing service boundaries, ingestion conduits, and persistent state management.
      </p>

      {/* Visual Architecture Diagram Track */}
      <div className="bg-white border border-[#E4E2DC] rounded-3xl p-6 sm:p-10 shadow-sm mb-12">
        <div className="flex items-center justify-between border-b border-[#E4E2DC] pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase text-[#111111]">
              TOPOLOGICAL COMPONENT CHAIN
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#767571] uppercase">
            {nodes.length} ISOLATED SUBSYSTEMS
          </span>
        </div>

        {/* Nodes Sequence */}
        <div
          ref={nodesRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {nodes.map((nodeName, idx) => (
            <div
              key={idx}
              className="bg-[#F7F6F2] border border-[#E4E2DC] hover:border-[#FF5A1F] rounded-2xl p-6 transition-all duration-300 relative group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-6 h-6 rounded-full bg-white border border-[#E4E2DC] text-[#FF5A1F] font-mono text-xs font-bold flex items-center justify-center">
                    0{idx + 1}
                  </span>
                  <span className="font-mono text-[10px] text-[#767571] uppercase tracking-wider">
                    LAYER // 0{idx + 1}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold font-display text-[#111111] mb-2 leading-snug group-hover:text-[#FF5A1F] transition-colors">
                  {nodeName}
                </h3>
              </div>

              <div className="pt-4 mt-4 border-t border-[#E4E2DC]/80 flex items-center justify-between font-mono text-[10px] text-[#767571]">
                <span>STATUS: DESIGNED</span>
                <span className="text-[#FF5A1F] font-semibold">UNIFIED SCHEMA</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* SECTION 07 — DATA FLOW REPRESENTATION */}
      <div className="bg-[#F7F6F2] border border-[#E4E2DC] rounded-3xl p-6 sm:p-8">
        <span className="font-mono text-xs text-[#767571] uppercase tracking-widest block mb-4">
          SECTION 07 // UNIFIED DATA LIFECYCLE
        </span>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 overflow-x-auto pb-2">
          <div className="w-full sm:w-auto flex-1 bg-white p-4 rounded-xl border border-[#E4E2DC] text-center">
            <span className="text-[10px] font-mono text-[#767571] block">STAGE 01</span>
            <strong className="text-xs font-mono text-[#111111]">INGESTION</strong>
            <p className="text-[11px] text-[#5F5F5A] mt-1">Raw telemetry & input payloads</p>
          </div>

          <span className="text-[#FF5A1F] font-mono font-bold rotate-90 sm:rotate-0">→</span>

          <div className="w-full sm:w-auto flex-1 bg-white p-4 rounded-xl border border-[#E4E2DC] text-center">
            <span className="text-[10px] font-mono text-[#767571] block">STAGE 02</span>
            <strong className="text-xs font-mono text-[#111111]">PREPROCESS</strong>
            <p className="text-[11px] text-[#5F5F5A] mt-1">Sanitization & normalization</p>
          </div>

          <span className="text-[#FF5A1F] font-mono font-bold rotate-90 sm:rotate-0">→</span>

          <div className="w-full sm:w-auto flex-1 bg-white p-4 rounded-xl border border-[#FF5A1F]/40 text-center">
            <span className="text-[10px] font-mono text-[#FF5A1F] font-bold block">STAGE 03</span>
            <strong className="text-xs font-mono text-[#111111]">INFERENCE</strong>
            <p className="text-[11px] text-[#5F5F5A] mt-1">Core model & rule scoring</p>
          </div>

          <span className="text-[#FF5A1F] font-mono font-bold rotate-90 sm:rotate-0">→</span>

          <div className="w-full sm:w-auto flex-1 bg-white p-4 rounded-xl border border-[#E4E2DC] text-center">
            <span className="text-[10px] font-mono text-[#767571] block">STAGE 04</span>
            <strong className="text-xs font-mono text-[#111111]">PERSISTENCE</strong>
            <p className="text-[11px] text-[#5F5F5A] mt-1">Audit log & analytics store</p>
          </div>
        </div>
      </div>
    </section>
  )
}
