import React from 'react'
import type { ProjectIdea } from '../../types/discovery'

interface BuildOrderSectionProps {
  project: ProjectIdea
}

export const BuildOrderSection: React.FC<BuildOrderSectionProps> = ({ project }) => {
  const steps = [
    {
      step: '01',
      title: 'Environment & Contract Boundaries',
      focus: 'Setup Git repo, virtual environment, and Pydantic/TypeScript schema definitions.',
      deliverable: 'Running Hello-World endpoint + schema validation test.',
    },
    {
      step: '02',
      title: 'Core Algorithm & Data Synthesis',
      focus: `Implement the baseline logic using ${project.tech_stack?.[0] || 'Python'} and ingest sample benchmark data.`,
      deliverable: 'Deterministic CLI or unit test proving algorithm viability.',
    },
    {
      step: '03',
      title: 'Microservice API & Pipeline Wireframe',
      focus: 'Wrap the core engine into FastAPI/REST routes with structured error handling.',
      deliverable: 'Interactive API docs (/docs) with sample requests succeeding.',
    },
    {
      step: '04',
      title: 'Interactive Frontend Client / Inspector',
      focus: 'Build the UI dashboard to visualize outputs, scores, and real-time state.',
      deliverable: 'Connected frontend triggering backend runs without mock data.',
    },
    {
      step: '05',
      title: 'Stress Testing & Viva Defense Preparation',
      focus: 'Profile latency, evaluate edge-case anomalies, and assemble presentation slides.',
      deliverable: 'Complete project report, video demo, and reproducible readme.',
    },
  ]

  return (
    <section id="build-order" className="py-14 border-b border-[#E4E2DC] scroll-mt-32">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
        <span className="font-mono text-xs font-bold text-[#FF5A1F] uppercase tracking-widest">
          SECTION 11 // DAY 1 ACTION PLAN
        </span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] font-display tracking-tight mb-4">
        WHAT SHOULD YOU BUILD FIRST?
      </h2>

      <p className="text-sm sm:text-base text-[#5F5F5A] max-w-2xl font-sans mb-10">
        Avoid analysis paralysis. Follow this phased execution sequence to guarantee continuous working progress from Day 1 to final presentation.
      </p>

      {/* Sequential Build Order Cards */}
      <div className="space-y-4 max-w-4xl">
        {steps.map((s, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#E4E2DC] hover:border-[#111111] rounded-2xl p-6 transition-all shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-6 group"
          >
            <div className="flex items-start gap-4">
              <span className="font-mono text-lg font-black text-[#FF5A1F] bg-[#FFF0E9] w-12 h-12 rounded-xl flex items-center justify-center shrink-0">
                {s.step}
              </span>

              <div>
                <h3 className="text-lg font-bold font-display text-[#111111] group-hover:text-[#FF5A1F] transition-colors">
                  {s.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5F5F5A] mt-1">{s.focus}</p>
              </div>
            </div>

            <div className="sm:text-right shrink-0 font-mono text-xs border-t sm:border-t-0 pt-3 sm:pt-0 border-[#E4E2DC]">
              <span className="text-[10px] text-[#767571] uppercase block">EXIT CRITERIA</span>
              <span className="text-[#111111] font-semibold text-xs">{s.deliverable}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
