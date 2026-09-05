import React, { useState } from 'react'
import type { MentorResponse as MentorResponseType } from '../../types/discovery'

interface MentorResponseProps {
  response: MentorResponseType
  timestamp?: number
}

export const MentorResponse: React.FC<MentorResponseProps> = ({
  response,
  timestamp,
}) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    const text = [
      `MENTOR RESPONSE:`,
      response.answer,
      ``,
      `NEXT MOVE:`,
      response.recommended_next_action,
      ``,
      `KEY TAKEAWAYS:`,
      ...(response.key_takeaways?.map((t) => `• ${t}`) || []),
      ``,
      `WATCH OUT FOR:`,
      ...(response.relevant_risks?.map((r) => `• ${r}`) || []),
    ].join('\n')

    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard fallback
    }
  }

  const timeLabel = timestamp
    ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null

  return (
    <div className="bg-white border border-[#E4E2DC] rounded-3xl p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] relative space-y-6">
      {/* Top Header Bar */}
      <div className="flex items-center justify-between border-b border-[#E4E2DC] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-[#FF5A1F] text-white flex items-center justify-center font-mono font-bold text-[10px]">
            AI
          </div>
          <div>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
              PROJECT ADVISOR RECOMMENDATION
            </span>
            {timeLabel && (
              <span className="ml-2 font-mono text-[10px] text-[#767571]">
                {timeLabel}
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleCopy}
          className="font-mono text-[10px] uppercase tracking-wider px-3 py-1 rounded bg-[#F7F6F2] hover:bg-[#FFF0E9] text-[#111111] hover:text-[#FF5A1F] border border-[#E4E2DC] transition-colors cursor-pointer"
        >
          {copied ? '✓ COPIED' : 'COPY ADVICE'}
        </button>
      </div>

      {/* 1. Primary Answer */}
      <div>
        <div className="font-mono text-[10px] text-[#767571] uppercase tracking-wider mb-2">
          MENTOR ADVICE
        </div>
        <p className="text-sm sm:text-base text-[#111111] leading-relaxed font-sans whitespace-pre-wrap">
          {response.answer}
        </p>
      </div>

      {/* 2. Recommended Next Action */}
      {response.recommended_next_action && (
        <div className="p-4 rounded-2xl bg-[#FFF0E9]/70 border border-[#FF5A1F]/30">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
            <span className="font-mono text-[11px] font-bold text-[#FF5A1F] uppercase tracking-wider">
              NEXT MOVE
            </span>
          </div>
          <p className="text-xs sm:text-sm font-semibold text-[#111111] leading-normal font-sans">
            {response.recommended_next_action}
          </p>
        </div>
      )}

      {/* 3. Key Takeaways */}
      {response.key_takeaways && response.key_takeaways.length > 0 && (
        <div>
          <div className="font-mono text-[10px] text-[#767571] uppercase tracking-wider mb-2.5">
            KEY TAKEAWAYS
          </div>
          <ul className="space-y-2">
            {response.key_takeaways.map((takeaway, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs sm:text-sm text-[#333330] font-sans"
              >
                <span className="text-[#FF5A1F] font-mono font-bold text-xs shrink-0 mt-0.5">
                  •
                </span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 4. Relevant Risks / Watch Out For */}
      {response.relevant_risks && response.relevant_risks.length > 0 && (
        <div className="pt-2 border-t border-[#E4E2DC]">
          <div className="font-mono text-[10px] text-[#FF5A1F] uppercase tracking-wider mb-2.5 font-bold">
            WATCH OUT FOR (RELEVANT RISKS)
          </div>
          <ul className="space-y-2">
            {response.relevant_risks.map((risk, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 text-xs text-[#5F5F5A] font-sans"
              >
                <span className="text-[#111111] font-mono text-[10px] shrink-0 mt-0.5">
                  ▲
                </span>
                <span>{risk}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
