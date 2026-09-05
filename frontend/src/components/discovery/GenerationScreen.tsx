import React from 'react'
import { useDiscovery } from '../../context/DiscoveryContext'
import { AIThinkingAnimation } from '../common/AIThinkingAnimation'
import { AIErrorState } from '../common/AIErrorState'

const GENERATION_STEPS = [
  {
    label: 'UNDERSTANDING YOUR PROFILE',
    detail: 'Analyzing technical domains, background, and constraints',
  },
  {
    label: 'MATCHING YOUR SKILLS',
    detail: 'Mapping your stack to industry-grade technical architectures',
  },
  {
    label: 'EXPLORING PROJECT DIRECTIONS',
    detail: 'Synthesizing novel, high-impact problem statements',
  },
  {
    label: 'BUILDING POSSIBILITIES',
    detail: 'Structuring 3 personalized engineering blueprints',
  },
]

export const GenerationScreen: React.FC = () => {
  const {
    generationStatus,
    generationStep,
    errorMessage,
    triggerGeneration,
    setStep,
  } = useDiscovery()

  if (generationStatus === 'error') {
    return (
      <div className="w-full max-w-2xl mx-auto py-12 px-4 animate-fadeIn">
        <AIErrorState
          badge="GENERATION INTERRUPTED"
          title="WE COULDN'T FIND YOUR PROJECTS"
          description="The AI synthesis engine encountered a temporary interruption while formulating your project blueprints. Your profile selections remain safely preserved."
          systemNote={errorMessage || undefined}
          onRetry={() => triggerGeneration()}
          retryLabel="TRY AGAIN"
          onBack={() => setStep(5)}
          backLabel="← REVIEW PROFILE"
        />
      </div>
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto py-6 px-4 animate-fadeIn">
      <AIThinkingAnimation
        title="FORGING YOUR POSSIBILITIES"
        subtext="Synthesizing three personalized, industry-grade capstone engineering directions matching your skills and timeline."
        badgeText="AI SYNTHESIS IN PROGRESS"
        steps={GENERATION_STEPS}
        currentStep={generationStep}
      />
    </div>
  )
}
