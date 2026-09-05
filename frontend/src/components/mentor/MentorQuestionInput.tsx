import React, { useState, useRef, useEffect } from 'react'

interface MentorQuestionInputProps {
  onSubmit: (question: string) => void
  disabled?: boolean
  initialQuestion?: string
}

export const MentorQuestionInput: React.FC<MentorQuestionInputProps> = ({
  onSubmit,
  disabled = false,
  initialQuestion = '',
}) => {
  const [value, setValue] = useState(initialQuestion)
  const [prevInitial, setPrevInitial] = useState(initialQuestion)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  if (initialQuestion !== prevInitial) {
    setPrevInitial(initialQuestion)
    setValue(initialQuestion)
  }

  useEffect(() => {
    if (initialQuestion) {
      textareaRef.current?.focus()
    }
  }, [initialQuestion])

  const length = value.trim().length
  const isValid = length >= 3 && length <= 1000

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (isValid && !disabled) {
        handleSubmit()
      }
    }
  }

  const handleSubmit = () => {
    if (!isValid || disabled) return
    onSubmit(value.trim())
    setValue('')
  }

  return (
    <div className="bg-white border border-[#E4E2DC] rounded-2xl p-3 sm:p-4 shadow-sm focus-within:border-[#FF5A1F] focus-within:ring-2 focus-within:ring-[#FF5A1F]/15 transition-all">
      <label htmlFor="mentor-question-input" className="sr-only">
        Ask the AI Project Advisor a technical question
      </label>

      <textarea
        id="mentor-question-input"
        ref={textareaRef}
        rows={3}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder="Ask anything about architecture, milestone prioritization, tech stack choices, or project defense..."
        className="w-full resize-none bg-transparent border-none outline-none text-sm text-[#111111] placeholder:text-[#767571] font-sans leading-relaxed"
        maxLength={1000}
      />

      <div className="flex items-center justify-between pt-2 border-t border-[#E4E2DC]/70">
        <div className="flex items-center gap-3">
          <span
            className={`font-mono text-[10px] ${
              length > 950
                ? 'text-[#FF5A1F] font-bold'
                : length < 3
                ? 'text-[#767571]'
                : 'text-[#111111]'
            }`}
          >
            {length} / 1000 characters
          </span>
          <span className="hidden sm:inline-block font-mono text-[10px] text-[#767571]">
            (Press Enter to send, Shift+Enter for newline)
          </span>
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={!isValid || disabled}
          className="px-5 py-2.5 bg-[#FF5A1F] text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-[#E04D16] transition-all duration-200 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-2 cursor-pointer shadow-sm hover:shadow"
        >
          <span>CONSULT ADVISOR</span>
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </div>
  )
}
