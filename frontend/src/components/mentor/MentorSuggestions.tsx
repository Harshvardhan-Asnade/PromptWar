import React from 'react'

interface MentorSuggestionsProps {
  onSelectQuestion: (question: string) => void
  disabled?: boolean
  duration?: string
}

export const MentorSuggestions: React.FC<MentorSuggestionsProps> = ({
  onSelectQuestion,
  disabled = false,
  duration = '8 weeks',
}) => {
  const suggestions = [
    'How should I structure the backend architecture?',
    'What should our team build first in Week 1?',
    `Which feature should we deprioritize to comfortably fit our ${duration} timeline?`,
    'How can we make this project more technically impressive for reviewers?',
    'What could fail first in our current proposed architecture?',
    'What are the first 3 concrete milestones we should hit?',
  ]

  return (
    <div className="my-6">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F]" />
        <span className="font-mono text-[11px] text-[#767571] uppercase tracking-wider font-semibold">
          SUGGESTED ADVISORY QUESTIONS
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {suggestions.map((q, idx) => (
          <button
            key={idx}
            type="button"
            disabled={disabled}
            onClick={() => onSelectQuestion(q)}
            className="text-left p-3 rounded-xl bg-white border border-[#E4E2DC] hover:border-[#FF5A1F] hover:bg-[#FFF0E9]/30 transition-all duration-200 group text-xs text-[#111111] font-medium leading-snug cursor-pointer disabled:opacity-50 disabled:pointer-events-none shadow-sm"
          >
            <span className="text-[#FF5A1F] font-mono text-[10px] block mb-1">
              0{idx + 1} ↗
            </span>
            <span className="group-hover:text-[#FF5A1F] transition-colors">
              "{q}"
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
