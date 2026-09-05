import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { useDiscovery } from '../context/DiscoveryContext'
import {
  MentorNav,
  MentorHero,
  MentorContextPanel,
  MentorConversation,
  MentorQuestionInput,
  MentorSuggestions,
  MentorFooterCta,
} from '../components/mentor'
import { prefersReducedMotion } from '../lib/motion'

export const MentorPage: React.FC = () => {
  const {
    selectedProject,
    projects,
    profile,
    mentorMessages,
    isAskingMentor,
    mentorThinkingStep,
    mentorError,
    askMentorQuestion,
    clearMentorChat,
    navigateTo,
  } = useDiscovery()

  const [lastQuestion, setLastQuestion] = useState<string>('')
  const pageRef = useRef<HTMLDivElement>(null)

  // Use selected project or first available project
  const project = selectedProject || (projects.length > 0 ? projects[0] : null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    document.title = 'Project Forge — AI Project Advisor'

    if (pageRef.current && !prefersReducedMotion()) {
      gsap.fromTo(
        pageRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      )
    }
  }, [])

  const handleAsk = (question: string) => {
    setLastQuestion(question)
    askMentorQuestion(question)
  }

  const handleRetry = () => {
    if (lastQuestion) {
      askMentorQuestion(lastQuestion)
    }
  }

  // Graceful empty state when no project was selected or generated
  if (!project) {
    return (
      <div className="min-h-screen bg-[#F7F6F2] text-[#111111] font-sans flex flex-col justify-between">
        <MentorNav />
        <div className="max-w-xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#FFF0E9] border border-[#FF5A1F]/30 text-[#FF5A1F] font-mono text-xs font-bold uppercase tracking-wider mb-6">
            NO ACTIVE SPEC
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-display text-[#111111] uppercase tracking-tight mb-4">
            SELECT A PROJECT FIRST
          </h2>
          <p className="text-sm text-[#5F5F5A] mb-8 font-sans leading-relaxed">
            The AI Project Advisor provides personalized architectural and milestone guidance based on your tailored engineering blueprint. Generate or select a project to begin.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('discovery')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#FF5A1F] text-white font-mono text-xs uppercase tracking-wider font-semibold rounded-xl hover:bg-[#E04D16] transition-all duration-200 cursor-pointer shadow-md"
            >
              START DISCOVERY →
            </button>
            <button
              type="button"
              onClick={() => navigateTo('landing')}
              className="w-full sm:w-auto px-6 py-3.5 bg-white text-[#111111] border border-[#E4E2DC] font-mono text-xs uppercase tracking-wider font-semibold rounded-xl hover:border-[#111111] transition-all duration-200 cursor-pointer"
            >
              RETURN HOME
            </button>
          </div>
        </div>
        <div className="py-6 border-t border-[#E4E2DC] text-center font-mono text-[11px] text-[#767571]">
          PROJECT FORGE — AI CAPSTONE ENGINE
        </div>
      </div>
    )
  }

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-[#F7F6F2] text-[#111111] font-sans selection:bg-[#FF5A1F]/15 selection:text-[#111111]"
    >
      {/* Top sticky nav */}
      <MentorNav projectTitle={project.title} />

      {/* Hero section */}
      <MentorHero project={project} profile={profile} />

      {/* Main advisory interactive section */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Project spec drawer */}
        <MentorContextPanel project={project} />

        {/* Suggested questions (shown prominently when starting conversation) */}
        <MentorSuggestions
          onSelectQuestion={handleAsk}
          disabled={isAskingMentor}
          duration={profile.duration}
        />

        {/* Question prompt input */}
        <div className="my-6">
          <MentorQuestionInput
            onSubmit={handleAsk}
            disabled={isAskingMentor}
          />
        </div>

        {/* Conversation list */}
        <MentorConversation
          messages={mentorMessages}
          isThinking={isAskingMentor}
          thinkingStep={mentorThinkingStep}
          error={mentorError}
          onRetry={handleRetry}
        />

        {/* Clear chat button if messages exist */}
        {mentorMessages.length > 0 && (
          <div className="flex justify-end pt-4">
            <button
              type="button"
              onClick={clearMentorChat}
              disabled={isAskingMentor}
              className="font-mono text-[10px] text-[#767571] hover:text-[#111111] uppercase tracking-wider underline cursor-pointer"
            >
              CLEAR CONVERSATION HISTORY
            </button>
          </div>
        )}

        {/* Footer CTAs to other phases */}
        <MentorFooterCta />
      </main>
    </div>
  )
}
