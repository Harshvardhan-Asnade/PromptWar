import React, { useState, useMemo, useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import type { ProjectIdea } from '../../types/discovery'
import { prefersReducedMotion } from '../../lib/motion'

interface SystemArchitectureDiagramProps {
  project: ProjectIdea
}

interface ArchitectureNodeDetail {
  id: string
  name: string
  techBadge: string
  layerName: string
  responsibilities: string[]
  whyUsed: string
  upstream: string
  downstream: string
}

export const SystemArchitectureDiagram: React.FC<SystemArchitectureDiagramProps> = ({ project }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeNodeIdx, setActiveNodeIdx] = useState<number>(0)

  // Dynamically derive interactive nodes from project architecture and tech stack
  const interactiveNodes: ArchitectureNodeDetail[] = useMemo(() => {
    const rawNodes = project.architecture && project.architecture.length > 0
      ? project.architecture
      : ['Student Client Portal', 'FastAPI Orchestrator', 'Core Inference Engine', 'Telemetry Datastore']

    const techStack = project.tech_stack || ['React', 'FastAPI', 'Python', 'PostgreSQL']
    const frontendTech = techStack.find((t) => /react|vue|next|typescript|web/i.test(t)) || 'React / TS'
    const backendTech = techStack.find((t) => /fastapi|django|flask|node|express|python/i.test(t)) || 'FastAPI / Python'
    const modelTech = techStack.find((t) => /pytorch|torch|tensorflow|llm|huggingface|opencv|scikit|ai/i.test(t)) || 'Inference Runtime'
    const dataTech = techStack.find((t) => /postgres|redis|sql|mongo|store|database/i.test(t)) || 'Database / Redis'

    return rawNodes.map((nodeName, idx) => {
      const lower = nodeName.toLowerCase()
      let techBadge = frontendTech
      let layerName = 'PRESENTATION'
      let responsibilities = [
        'User interface state management and input verification',
        'Responsive telemetry visualizations and action triggers',
        'Client-side optimistic updates and event handling',
      ]
      let whyUsed = `Leverages your ${frontendTech} proficiency for modular component design and fluid interaction.`
      let upstream = 'Student User / Browser'
      let downstream = 'API Orchestrator'

      if (lower.includes('gateway') || lower.includes('api') || lower.includes('orchestrat') || lower.includes('fastapi') || idx === 1) {
        techBadge = backendTech
        layerName = 'GATEWAY & ORCHESTRATION'
        responsibilities = [
          'High-throughput asynchronous request routing and schema validation',
          'Model invocation gateway with rate limiting and timeout guards',
          'Data normalization and transformation pipeline',
        ]
        whyUsed = `Matches your Python and backend skill profile; provides async speed and strict Pydantic validation.`
        upstream = frontendTech
        downstream = modelTech
      } else if (lower.includes('model') || lower.includes('infer') || lower.includes('engine') || lower.includes('ai') || idx === 2) {
        techBadge = modelTech
        layerName = 'CORE INTELLIGENCE'
        responsibilities = [
          'Executes specialized domain algorithms and neural inference passes',
          'Computes predictive confidence intervals and anomaly flags',
          'Performs real-time feature extraction on inbound payload batches',
        ]
        whyUsed = `Empowers the project to deliver state-of-the-art predictive capabilities within your 8-week scope.`
        upstream = backendTech
        downstream = dataTech
      } else if (lower.includes('data') || lower.includes('store') || lower.includes('persist') || lower.includes('db') || idx >= 3) {
        techBadge = dataTech
        layerName = 'PERSISTENCE & AUDIT'
        responsibilities = [
          'Persistent relational storage for project state and user sessions',
          'Append-only audit telemetry store for evaluation benchmarks',
          'Fast caching layer for low-latency repetitive queries',
        ]
        whyUsed = `Guarantees ACID reliability and provides structured query access for reporting and evaluations.`
        upstream = modelTech
        downstream = 'Analytics & Client Reporting'
      }

      return {
        id: `node-${idx}`,
        name: nodeName,
        techBadge,
        layerName,
        responsibilities,
        whyUsed,
        upstream,
        downstream,
      }
    })
  }, [project.architecture, project.tech_stack])

  const selectedNode = interactiveNodes[activeNodeIdx] || interactiveNodes[0]

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return
    const detailEl = containerRef.current.querySelector('.node-inspection-panel')
    if (detailEl) {
      gsap.fromTo(
        detailEl,
        { opacity: 0.6, y: 8 },
        { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
      )
    }
  }, [activeNodeIdx])

  return (
    <section
      id="architecture"
      ref={containerRef}
      className="py-14 border-b border-[#E4E2DC] scroll-mt-32"
    >
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
        <span className="font-mono text-xs font-bold text-[#FF5A1F] uppercase tracking-widest">
          SECTION 05 // SYSTEM ARCHITECTURE & DATA FLOW
        </span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] font-display tracking-tight mb-4">
        MODULAR SYSTEM ARCHITECTURE
      </h2>

      <p className="text-sm sm:text-base text-[#5F5F5A] max-w-2xl font-sans mb-10">
        End-to-end component topology detailing service boundaries, ingestion conduits, and persistent state management.
        Click or hover any subsystem to inspect responsibilities and design rationale.
      </p>

      {/* Interactive Topology Visual Diagram */}
      <div className="bg-white border border-[#E4E2DC] rounded-3xl p-6 sm:p-10 shadow-sm mb-8">
        <div className="flex items-center justify-between border-b border-[#E4E2DC] pb-4 mb-8">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5A1F] animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase text-[#111111]">
              INTERACTIVE TOPOLOGY CHAIN
            </span>
          </div>
          <span className="font-mono text-[11px] text-[#767571] uppercase">
            CLICK TO INSPECT ({interactiveNodes.length} SUBSYSTEMS)
          </span>
        </div>

        {/* Nodes Flow */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {interactiveNodes.map((node, idx) => {
            const isSelected = activeNodeIdx === idx

            return (
              <button
                key={node.id}
                type="button"
                onClick={() => setActiveNodeIdx(idx)}
                onMouseEnter={() => setActiveNodeIdx(idx)}
                className={`text-left rounded-2xl p-5 transition-all duration-200 relative group cursor-pointer border flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#FFF0E9]/30 border-[#FF5A1F] shadow-md scale-[1.02] ring-2 ring-[#FF5A1F]/20'
                    : 'bg-[#F7F6F2] border-[#E4E2DC] hover:border-[#111111] hover:bg-white'
                }`}
                aria-selected={isSelected}
                role="tab"
                tabIndex={0}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`w-6 h-6 rounded-full font-mono text-xs font-bold flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#FF5A1F] text-white'
                          : 'bg-white border border-[#E4E2DC] text-[#767571]'
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white border border-[#E4E2DC] text-[#767571]">
                      {node.techBadge}
                    </span>
                  </div>

                  <h3
                    className={`text-sm sm:text-base font-bold font-display mb-1 transition-colors ${
                      isSelected ? 'text-[#FF5A1F]' : 'text-[#111111] group-hover:text-[#111111]'
                    }`}
                  >
                    {node.name}
                  </h3>

                  <span className="font-mono text-[10px] text-[#767571] uppercase block mb-2">
                    {node.layerName}
                  </span>
                </div>

                <div className="pt-3 border-t border-[#E4E2DC]/80 flex items-center justify-between font-mono text-[10px] text-[#767571]">
                  <span>LAYER // 0{idx + 1}</span>
                  <span className={isSelected ? 'text-[#FF5A1F] font-bold' : ''}>
                    {isSelected ? 'INSPECTING' : 'INSPECT →'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Subsystem Inspection Detail Panel (Improvement 09) */}
      {selectedNode && (
        <div className="node-inspection-panel bg-white border-2 border-[#111111] rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E4E2DC] pb-4 mb-6">
            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-xl bg-[#111111] text-white font-mono text-xs font-bold flex items-center justify-center">
                0{activeNodeIdx + 1}
              </span>
              <div>
                <span className="font-mono text-[10px] text-[#FF5A1F] font-bold uppercase tracking-widest block">
                  SUBSYSTEM INSPECTION // {selectedNode.layerName}
                </span>
                <h4 className="text-xl sm:text-2xl font-black font-display text-[#111111]">
                  {selectedNode.name}
                </h4>
              </div>
            </div>

            <span className="font-mono text-xs px-3 py-1 bg-[#F7F6F2] border border-[#E4E2DC] rounded-xl text-[#111111] font-bold">
              TECHNOLOGY: {selectedNode.techBadge}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Responsibilities */}
            <div className="md:col-span-1">
              <span className="font-mono text-xs text-[#767571] uppercase tracking-wider block mb-3 font-semibold">
                CORE RESPONSIBILITIES
              </span>
              <ul className="space-y-2">
                {selectedNode.responsibilities.map((resp, rIdx) => (
                  <li key={rIdx} className="text-xs sm:text-sm text-[#111111] font-sans flex items-start gap-2">
                    <span className="text-[#FF5A1F] font-bold shrink-0">•</span>
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Why Used */}
            <div className="md:col-span-1">
              <span className="font-mono text-xs text-[#767571] uppercase tracking-wider block mb-3 font-semibold">
                WHY IT IS USED
              </span>
              <p className="text-xs sm:text-sm text-[#111111] font-sans leading-relaxed bg-[#F7F6F2] p-4 rounded-xl border border-[#E4E2DC]">
                {selectedNode.whyUsed}
              </p>
            </div>

            {/* Relationships */}
            <div className="md:col-span-1">
              <span className="font-mono text-xs text-[#767571] uppercase tracking-wider block mb-3 font-semibold">
                SYSTEM RELATIONSHIPS
              </span>
              <div className="space-y-3 font-mono text-xs bg-[#F7F6F2] p-4 rounded-xl border border-[#E4E2DC]">
                <div>
                  <span className="text-[10px] text-[#767571] block">UPSTREAM PRODUCER:</span>
                  <span className="text-[#111111] font-semibold">{selectedNode.upstream}</span>
                </div>
                <div className="border-t border-[#E4E2DC] pt-2">
                  <span className="text-[10px] text-[#767571] block">DOWNSTREAM CONSUMER:</span>
                  <span className="text-[#FF5A1F] font-semibold">{selectedNode.downstream}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unified Data Lifecycle Pipeline */}
      <div className="mt-8 bg-[#F7F6F2] border border-[#E4E2DC] rounded-3xl p-6 sm:p-8">
        <span className="font-mono text-xs text-[#767571] uppercase tracking-widest block mb-4">
          END-TO-END DATA LIFECYCLE
        </span>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 overflow-x-auto pb-2">
          <div className="w-full sm:w-auto flex-1 bg-white p-4 rounded-xl border border-[#E4E2DC] text-center">
            <span className="text-[10px] font-mono text-[#767571] block">STAGE 01</span>
            <strong className="text-xs font-mono text-[#111111]">INGESTION</strong>
            <p className="text-[11px] text-[#5F5F5A] mt-1">Raw telemetry & input payloads</p>
          </div>

          <span className="text-[#FF5A1F] font-mono font-bold rotate-90 sm:rotate-0" aria-hidden="true">→</span>

          <div className="w-full sm:w-auto flex-1 bg-white p-4 rounded-xl border border-[#E4E2DC] text-center">
            <span className="text-[10px] font-mono text-[#767571] block">STAGE 02</span>
            <strong className="text-xs font-mono text-[#111111]">PREPROCESS</strong>
            <p className="text-[11px] text-[#5F5F5A] mt-1">Sanitization & normalization</p>
          </div>

          <span className="text-[#FF5A1F] font-mono font-bold rotate-90 sm:rotate-0" aria-hidden="true">→</span>

          <div className="w-full sm:w-auto flex-1 bg-white p-4 rounded-xl border border-[#FF5A1F]/40 text-center">
            <span className="text-[10px] font-mono text-[#FF5A1F] font-bold block">STAGE 03</span>
            <strong className="text-xs font-mono text-[#111111]">INFERENCE</strong>
            <p className="text-[11px] text-[#5F5F5A] mt-1">Core model & rule scoring</p>
          </div>

          <span className="text-[#FF5A1F] font-mono font-bold rotate-90 sm:rotate-0" aria-hidden="true">→</span>

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
