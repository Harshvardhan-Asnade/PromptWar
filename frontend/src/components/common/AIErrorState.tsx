import React from 'react'

export interface AIErrorStateProps {
  badge?: string
  title?: string
  description?: string
  systemNote?: string
  onRetry?: () => void
  retryLabel?: string
  onBack?: () => void
  backLabel?: string
  compact?: boolean
  className?: string
}

/**
 * Reusable AI Error Experience for Project Forge.
 * Displays clean, human-readable explanations with retry and return actions.
 * Never exposes stack traces, API keys, Groq internals, or raw server paths.
 */
export const AIErrorState: React.FC<AIErrorStateProps> = ({
  badge = 'OPERATION INTERRUPTED',
  title = "WE COULDN'T COMPLETE YOUR REQUEST",
  description = 'The AI reasoning service encountered a temporary interruption. Your profile and project state remain safely preserved.',
  systemNote,
  onRetry,
  retryLabel = 'TRY AGAIN',
  onBack,
  backLabel = '← GO BACK',
  compact = false,
  className = '',
}) => {
  // Sanitize systemNote to ensure zero leaked keys or stack traces
  const sanitizedNote = systemNote
    ? systemNote
        .replace(/api[_-]?key[=:][^\s&"']+/gi, '[REDACTED]')
        .replace(/Bearer\s+[^\s]+/gi, '[REDACTED]')
        .replace(/(https?:\/\/[^\s]+)/g, '')
        .replace(/at\s+[\w./\\]+:\d+:\d+/g, '')
        .slice(0, 240)
    : null

  return (
    <div
      role="alert"
      className={`border border-[#FF5A1F]/30 bg-white rounded-3xl text-center shadow-sm select-none ${
        compact ? 'p-6 max-w-xl mx-auto' : 'my-8 py-12 px-6 sm:px-12 max-w-2xl mx-auto'
      } ${className}`}
    >
      {/* Badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF0E9] border border-[#FF5A1F]/30 text-[#FF5A1F] text-xs font-mono uppercase tracking-widest mb-6">
        <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-ping" />
        {badge}
      </div>

      {/* Headline */}
      <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-[#111111] mb-3 font-display uppercase">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm sm:text-base text-[#5F5F5A] max-w-md mx-auto mb-6 font-sans leading-relaxed">
        {description}
      </p>

      {/* Safe System Note */}
      {sanitizedNote && (
        <div className="p-3.5 mb-8 bg-[#F7F6F2] border border-[#E4E2DC] rounded-xl text-left max-w-md mx-auto">
          <span className="text-[10px] font-mono text-[#767571] uppercase tracking-wider block mb-1">
            STATUS NOTE
          </span>
          <p className="text-xs font-mono text-[#111111] break-words">
            {sanitizedNote}
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="w-full sm:w-auto px-7 py-3.5 bg-[#FF5A1F] text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-full hover:bg-[#E04D16] transition-all duration-200 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#FF5A1F]/50 flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{retryLabel}</span>
            <span aria-hidden="true">↻</span>
          </button>
        )}

        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#5F5F5A] hover:text-[#111111] border border-[#E4E2DC] hover:border-[#111111] font-mono text-xs uppercase tracking-wider font-semibold rounded-full transition-all duration-200 cursor-pointer"
          >
            {backLabel}
          </button>
        )}
      </div>
    </div>
  )
}
