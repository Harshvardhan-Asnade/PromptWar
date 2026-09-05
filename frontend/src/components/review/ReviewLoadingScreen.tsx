import React from 'react'
import { AIThinkingAnimation } from '../common/AIThinkingAnimation'

interface ReviewLoadingScreenProps {
  currentStep: number // 0 to 4
}

const AUDIT_STAGES = [
  { label: 'CHECKING PROJECT SCOPE', detail: 'Verifying feature boundaries against chosen duration' },
  { label: 'CHECKING FEASIBILITY', detail: 'Auditing resource availability, data dependencies, and constraints' },
  { label: 'ASSESSING TECHNICAL DEPTH', detail: 'Evaluating architectural complexity, algorithms, and stack fit' },
  { label: 'CHECKING ALIGNMENT', detail: 'Comparing requirements against student skills and experience level' },
  { label: 'PREPARING RECOMMENDATIONS', detail: 'Formulating strategic adjustments and defense talking points' },
]

export const ReviewLoadingScreen: React.FC<ReviewLoadingScreenProps> = ({ currentStep }) => {
  return (
    <div className="my-10 max-w-3xl mx-auto px-4">
      <AIThinkingAnimation
        title="RUNNING FEASIBILITY ENGINE"
        subtext="Benchmarking architectural scope, potential failure modes, and delivery risks."
        badgeText="ANALYZING PROJECT"
        steps={AUDIT_STAGES}
        currentStep={currentStep}
      />
    </div>
  )
}
