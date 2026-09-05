import React from 'react'
import { AIThinkingAnimation } from '../common/AIThinkingAnimation'

interface MentorThinkingAnimationProps {
  currentStep?: number
  compact?: boolean
}

const MENTOR_STEPS = [
  {
    label: 'UNDERSTANDING YOUR QUESTION',
    detail: 'Parsing query intent, scope boundaries, and technical domains',
  },
  {
    label: 'CONNECTING IT TO YOUR PROJECT',
    detail: 'Cross-referencing selected architecture, stack choices, and constraints',
  },
  {
    label: 'THINKING THROUGH THE OPTIONS',
    detail: 'Evaluating engineering tradeoffs, failure scenarios, and milestone impact',
  },
  {
    label: 'FORMING A RECOMMENDATION',
    detail: 'Synthesizing immediate next moves, key takeaways, and relevant risks',
  },
]

export const MentorThinkingAnimation: React.FC<MentorThinkingAnimationProps> = ({
  currentStep,
  compact = false,
}) => {
  return (
    <AIThinkingAnimation
      title="CONSULTING PROJECT ADVISOR"
      subtext="Synthesizing personalized architectural and milestone recommendations based on your project specification."
      badgeText="ADVISOR REASONING CORE"
      steps={MENTOR_STEPS}
      currentStep={currentStep}
      compact={compact}
      autoCycle={currentStep === undefined}
      autoCycleInterval={2200}
    />
  )
}
