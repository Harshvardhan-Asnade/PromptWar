import React from 'react'
import { AIThinkingAnimation } from '../common/AIThinkingAnimation'

interface ImprovementLoadingScreenProps {
  currentStep: number // 0 to 4
}

const IMPROVEMENT_STAGES = [
  {
    label: 'READING YOUR REVIEW',
    detail: 'Parsing audit scores, risk factors, and critique recommendations',
  },
  {
    label: 'IDENTIFYING WEAK POINTS',
    detail: 'Targeting architectural bottlenecks, hardware gaps, and timeline risks',
  },
  {
    label: 'REFINING THE SCOPE',
    detail: 'Pruning scope creep while preserving core demonstration impact',
  },
  {
    label: 'STRENGTHENING ARCHITECTURE',
    detail: 'Hardening data pipelines, production drivers, and verification mechanisms',
  },
  {
    label: 'IMPROVING THE PROJECT',
    detail: 'Generating upgraded blueprint specification and tangible defense points',
  },
]

export const ImprovementLoadingScreen: React.FC<ImprovementLoadingScreenProps> = ({
  currentStep,
}) => {
  return (
    <div className="my-10 max-w-3xl mx-auto px-4">
      <AIThinkingAnimation
        title="STRENGTHENING ARCHITECTURE"
        subtext="Applying feasibility critique to eliminate bottlenecks and strengthen technical rigor."
        badgeText="HARDENING BLUEPRINT"
        steps={IMPROVEMENT_STAGES}
        currentStep={currentStep}
      />
    </div>
  )
}
