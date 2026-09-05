import React from 'react'
import { Container } from '../components/layout/Container'
import { WaterRippleCanvas } from '../components/results/WaterRippleCanvas'
import { TiltedCard, SpotlightCard } from '../components/reactbits'
import { useDiscovery } from '../context/DiscoveryContext'
import type { ProjectIdea } from '../types/discovery'

/**
 * LANDING SECTION 4 — PROJECT SHOWCASE (04 / 05)
 * Tangible demonstration of 3 real project directions featuring TiltedCard, SpotlightCard, and WaterRippleCanvas.
 */
export const ShowcaseSection: React.FC = () => {
  const { selectProject } = useDiscovery()

  const sampleProjects: ProjectIdea[] = [
    {
      id: 'showcase-1',
      title: 'Autonomous Edge Vision Inspection System',
      tagline: 'Sub-50ms surface anomaly classification using quantized neural models on edge hardware.',
      problem: 'Manual QA inspection in manufacturing plants is slow, hazardous, and suffers from 18% false negative rates.',
      solution: 'A localized edge computing pipeline that classifies surface anomalies in sub-50ms using Python and OpenCV with zero cloud dependency.',
      why_it_fits: 'Directly leverages Python and Computer Vision skills with realistic 8-week semester boundaries.',
      innovation_score: 92,
      feasibility_score: 88,
      impact_score: 90,
      technical_depth_score: 94,
      difficulty: 'Balanced',
      features: [
        'Real-time video frame inference pipeline',
        'Bounding box defect localization engine',
        'Localized SQLite defect audit datastore',
      ],
      advanced_features: [
        'INT8 post-training quantization on edge accelerators',
        'Fail-safe hardware watchdog alerts',
      ],
      tech_stack: ['Python 3.13', 'FastAPI', 'OpenCV', 'PyTorch', 'SQLite'],
      architecture: ['Camera Ingestion Driver', 'Inference Engine Node', 'Alert Telemetry Gateway'],
      roadmap: [
        'Weeks 1-2: Benchmark dataset & baseline model',
        'Weeks 3-4: INT8 edge quantization pipeline',
        'Weeks 5-6: Real-time alert gateway',
        'Weeks 7-8: Viva defense demonstration',
      ],
      datasets: ['Public Surface Defect Benchmark Dataset'],
      risks: ['Frame drop under high thermal throttling'],
      improvements: ['Multi-threaded circular frame queue'],
    },
    {
      id: 'showcase-2',
      title: 'Decentralized Medical Record Provenance Network',
      tagline: 'Cryptographically auditable EHR provenance network with tamper-evident state transitions.',
      problem: 'Electronic Health Records are susceptible to unauthorized alterations and untracked clinician access.',
      solution: 'An auditable provenance ledger with Merkle tree commitments providing mathematical non-repudiation.',
      why_it_fits: 'Combines Python backend with cryptographic primitives for a standout final-year defense.',
      innovation_score: 95,
      feasibility_score: 82,
      impact_score: 89,
      technical_depth_score: 96,
      difficulty: 'Challenging',
      features: [
        'Merkle root state commitments',
        'Tamper-evident clinician access log',
        'RESTful audit verification API',
      ],
      advanced_features: [
        'Zero-knowledge attribute verification protocol',
      ],
      tech_stack: ['Python', 'FastAPI', 'Cryptography', 'PostgreSQL', 'Docker'],
      architecture: ['API Gateway', 'Audit Ledger Node', 'Storage Vault Service'],
      roadmap: [
        'Weeks 1-4: Cryptographic ledger core & Merkle verification',
        'Weeks 5-8: Verification endpoints & presentation testbed',
      ],
      datasets: ['Synthetic HIPAA-compliant EHR records'],
      risks: ['Verification latency under high transaction volume'],
      improvements: ['Implement zero-knowledge proof batching'],
    },
    {
      id: 'showcase-3',
      title: 'Smart Microgrid Energy Optimization Engine',
      tagline: 'Predictive localized battery dispatch policy using ambient renewable telemetry.',
      problem: 'Distributed renewable power systems suffer from unpredictable solar fluctuations and peak demand surcharges.',
      solution: 'A predictive power dispatch scheduler optimizing battery charge cycles and grid draw in real time.',
      why_it_fits: 'Strong algorithmic focus with practical simulation benchmarks suitable for university scoring.',
      innovation_score: 89,
      feasibility_score: 91,
      impact_score: 93,
      technical_depth_score: 88,
      difficulty: 'Balanced',
      features: [
        'Time-series solar generation forecasting',
        'Dynamic battery discharge policy scheduler',
        'Real-time grid state dashboard',
      ],
      advanced_features: [
        'Multi-agent consensus dispatch under network partitioning',
      ],
      tech_stack: ['Python', 'FastAPI', 'Pandas', 'Scikit-Learn', 'Redis'],
      architecture: ['Telemetry Broker', 'Forecasting Module', 'Dispatch Scheduler'],
      roadmap: [
        'Weeks 1-4: Simulation testbed & time-series model',
        'Weeks 5-8: Optimization logic & academic viva demos',
      ],
      datasets: ['National Solar Telemetry Open Dataset'],
      risks: ['Forecasting degradation during extreme weather anomalies'],
      improvements: ['Introduce ensemble weather forecasting models'],
    },
  ]

  return (
    <section id="showcase" className="py-20 sm:py-24 bg-[#F7F6F2] border-b border-border relative overflow-hidden">
      <Container>
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="font-mono text-xs font-bold text-accent uppercase tracking-widest">
                04 / TANGIBLE OUTPUTS
              </span>
              <span className="text-border">|</span>
              <span className="font-mono text-xs text-fg-muted uppercase">CAPSTONE DIRECTIONS</span>
            </div>

            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-[#111111] leading-[1.1] uppercase">
              ACTUAL PROJECTS <br />
              <span className="text-accent">YOU CAN BUILD.</span>
            </h2>
          </div>

          <p className="text-sm text-[#5F5F5A] max-w-sm font-sans">
            Here are three sample engineering blueprints generated by Project Forge for final-year students.
          </p>
        </div>

        {/* Showcase Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
          {sampleProjects.map((project) => (
            <TiltedCard key={project.id} maxTilt={6} className="h-full">
              <SpotlightCard
                className="h-full p-8 flex flex-col justify-between relative group cursor-pointer"
                spotlightColor="rgba(255, 90, 31, 0.14)"
                borderColor="rgba(255, 90, 31, 0.45)"
              >
                {/* WaterRippleCanvas for interactive tactile response */}
                <div className="absolute inset-0 pointer-events-none rounded-3xl overflow-hidden z-0">
                  <WaterRippleCanvas accentColor="rgba(255, 90, 31, 0.15)" />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#F0EFEB]">
                    <span className="px-2.5 py-1 rounded-full bg-[#FFF0E9] text-accent font-mono text-[10px] font-bold uppercase tracking-wider">
                      DIFFICULTY: {project.difficulty}
                    </span>
                    <div className="font-mono text-xs text-[#5F5F5A]">
                      SCORE: <span className="font-bold text-[#111111]">{project.innovation_score}</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold font-display text-[#111111] tracking-tight uppercase mb-2 group-hover:text-accent transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-[#5F5F5A] font-sans leading-relaxed mb-6">
                    {project.tagline}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tech_stack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded-md bg-[#F7F6F2] border border-[#E4E2DC] text-[#111111] font-mono text-[10px]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Features preview */}
                  <div className="space-y-2 mb-6">
                    {project.features.slice(0, 2).map((f, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-[#5F5F5A] font-sans">
                        <span className="text-accent font-bold">✓</span>
                        <span className="truncate">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="relative z-10 pt-4 border-t border-[#F0EFEB]">
                  <button
                    type="button"
                    onClick={() => selectProject(project)}
                    className="w-full py-3 bg-[#F7F6F2] group-hover:bg-accent group-hover:text-white text-[#111111] font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-all duration-200 border border-[#E4E2DC] group-hover:border-transparent flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>VIEW BLUEPRINT</span>
                    <span>→</span>
                  </button>
                </div>
              </SpotlightCard>
            </TiltedCard>
          ))}
        </div>
      </Container>
    </section>
  )
}
