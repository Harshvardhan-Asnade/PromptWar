import React from 'react'
import type { ProjectIdea } from '../../types/discovery'

interface TechStackSectionProps {
  project: ProjectIdea
}

interface CategorizedStack {
  category: string
  items: string[]
}

export const TechStackSection: React.FC<TechStackSectionProps> = ({ project }) => {
  // Categorize tech stack based on string patterns or fallback groups
  const categorizeTech = (stack: string[] = []): CategorizedStack[] => {
    const frontend: string[] = []
    const backend: string[] = []
    const aiml: string[] = []
    const data: string[] = []
    const tools: string[] = []

    for (const item of stack) {
      const lower = item.toLowerCase()
      if (lower.includes('frontend') || lower.includes('react') || lower.includes('ui') || lower.includes('typescript') || lower.includes('vue') || lower.includes('client') || lower.includes('webgl')) {
        frontend.push(item)
      } else if (lower.includes('model') || lower.includes('ai') || lower.includes('torch') || lower.includes('onnx') || lower.includes('cv') || lower.includes('vision') || lower.includes('learning') || lower.includes('nlp')) {
        aiml.push(item)
      } else if (lower.includes('data') || lower.includes('sql') || lower.includes('db') || lower.includes('redis') || lower.includes('mongo') || lower.includes('postgres') || lower.includes('ledger')) {
        data.push(item)
      } else if (lower.includes('api') || lower.includes('fastapi') || lower.includes('backend') || lower.includes('node') || lower.includes('python') || lower.includes('express') || lower.includes('logic')) {
        backend.push(item)
      } else {
        tools.push(item)
      }
    }

    const groups: CategorizedStack[] = []
    if (frontend.length > 0) groups.push({ category: 'FRONTEND & VISUALIZATION', items: frontend })
    if (backend.length > 0) groups.push({ category: 'CORE BACKEND & APIS', items: backend })
    if (aiml.length > 0) groups.push({ category: 'AI RUNTIME & ALGORITHMS', items: aiml })
    if (data.length > 0) groups.push({ category: 'DATA LAYER & STORAGE', items: data })
    if (tools.length > 0) groups.push({ category: 'INFRASTRUCTURE & PROTOCOLS', items: tools })

    // Fallback if none matched
    if (groups.length === 0) {
      groups.push({ category: 'TECHNOLOGY STACK', items: stack })
    }

    return groups
  }

  const groups = categorizeTech(project.tech_stack)

  return (
    <section id="tech-stack" className="py-14 border-b border-[#E4E2DC] scroll-mt-32">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
        <span className="font-mono text-xs font-bold text-[#FF5A1F] uppercase tracking-widest">
          SECTION 05 // ENGINEERING SPECIFICATION
        </span>
      </div>

      <h2 className="text-3xl sm:text-5xl font-extrabold text-[#111111] font-display tracking-tight mb-4">
        TECHNOLOGY MATRIX
      </h2>

      <p className="text-sm sm:text-base text-[#5F5F5A] max-w-2xl font-sans mb-10">
        Engineered specifically for your team's existing languages and frameworks, minimizing tooling friction while maximizing academic differentiation.
      </p>

      {/* Grid of categorized stacks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {groups.map((grp, idx) => (
          <div
            key={idx}
            className="bg-white border border-[#E4E2DC] rounded-2xl p-6 shadow-sm hover:border-[#111111] transition-colors"
          >
            <span className="font-mono text-[11px] font-bold text-[#FF5A1F] uppercase tracking-wider block mb-4 border-b border-[#E4E2DC] pb-2">
              {grp.category}
            </span>

            <ul className="space-y-2.5">
              {grp.items.map((tech, tIdx) => (
                <li
                  key={tIdx}
                  className="flex items-center gap-2 text-xs sm:text-sm font-mono text-[#111111] bg-[#F7F6F2] px-3 py-2 rounded-lg border border-[#E4E2DC]/80"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
                  <span className="truncate">{tech}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
