import React, { useEffect, useRef } from 'react'
import type { MentorMessage } from '../../types/discovery'
import { MentorResponse } from './MentorResponse'
import { MentorThinkingAnimation } from './MentorThinkingAnimation'
import { AIErrorState } from '../common/AIErrorState'

interface MentorConversationProps {
  messages: MentorMessage[]
  isThinking: boolean
  thinkingStep?: number
  error: string | null
  onRetry?: () => void
}

export const MentorConversation: React.FC<MentorConversationProps> = ({
  messages,
  isThinking,
  thinkingStep,
  error,
  onRetry,
}) => {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isThinking, error])

  if (messages.length === 0 && !isThinking && !error) {
    return null
  }

  return (
    <div className="space-y-8 my-8">
      {messages.map((msg) => {
        if (msg.role === 'user') {
          const time = msg.timestamp
            ? new Date(msg.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })
            : null

          return (
            <div key={msg.id} className="flex justify-end">
              <div className="max-w-2xl bg-[#111111] text-white p-5 sm:p-6 rounded-2xl rounded-tr-sm shadow-sm space-y-2">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-2">
                  <span className="font-mono text-[10px] uppercase tracking-wider text-[#FF5A1F] font-bold">
                    STUDENT INQUIRY
                  </span>
                  {time && (
                    <span className="font-mono text-[10px] text-white/50">
                      {time}
                    </span>
                  )}
                </div>
                <p className="text-sm sm:text-base font-sans leading-relaxed text-white">
                  {msg.content}
                </p>
              </div>
            </div>
          )
        }

        if (msg.role === 'assistant' && msg.response) {
          return (
            <div key={msg.id} className="max-w-4xl mr-auto">
              <MentorResponse
                response={msg.response}
                timestamp={msg.timestamp}
              />
            </div>
          )
        }

        return null
      })}

      {/* Thinking Animation State */}
      {isThinking && (
        <div className="max-w-3xl mr-auto">
          <MentorThinkingAnimation currentStep={thinkingStep} />
        </div>
      )}

      {/* Error state */}
      {error && (
        <div className="max-w-3xl mr-auto">
          <AIErrorState
            badge="ADVISOR INTERRUPTED"
            title="COULD NOT RETRIEVE ADVICE"
            description="The AI project advisor encountered an interruption. Please verify your query or try again."
            systemNote={error}
            onRetry={onRetry}
            retryLabel="RETRY QUESTION"
          />
        </div>
      )}

      <div ref={bottomRef} className="h-2" />
    </div>
  )
}
