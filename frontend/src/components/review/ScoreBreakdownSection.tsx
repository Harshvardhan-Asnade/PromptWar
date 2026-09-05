import React, { useEffect, useState } from 'react'
import type { ProjectEvaluation, StudentProfile } from '../../types/discovery'
import { prefersReducedMotion } from '../../lib/motion'

interface ScoreBreakdownSectionProps {
  evaluation: ProjectEvaluation
  profile: StudentProfile
}

interface ScoreMetric {
  key: keyof ProjectEvaluation
  label: string
  description: string
  score: number
}

export const ScoreBreakdownSection: React.FC<ScoreBreakdownSectionProps> = ({
  evaluation,
  profile,
}) => {
  const isReduced = prefersReducedMotion()
  const [animatedScore, setAnimatedScore] = useState<number>(
    isReduced ? evaluation.overall_score : 0
  )

  // Animated number count-up for overall score
  useEffect(() => {
    if (isReduced) return

    let start = 0
    const end = evaluation.overall_score
    const duration = 1200 // ms
    const stepTime = 20
    const totalSteps = duration / stepTime
    const increment = end / totalSteps

    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setAnimatedScore(end)
        clearInterval(timer)
      } else {
        setAnimatedScore(Math.floor(start))
      }
    }, stepTime)

    return () => clearInterval(timer)
  }, [evaluation.overall_score, isReduced])

  const metrics: ScoreMetric[] = [
    {
      key: 'innovation_score',
      label: 'INNOVATION',
      description: 'Novelty of approach & distinction from boilerplate templates',
      score: evaluation.innovation_score,
    },
    {
      key: 'feasibility_score',
      label: 'FEASIBILITY',
      description: 'Probability of complete delivery within constraints',
      score: evaluation.feasibility_score,
    },
    {
      key: 'impact_score',
      label: 'IMPACT',
      description: 'Real-world utility & end-user problem solving',
      score: evaluation.impact_score,
    },
    {
      key: 'technical_depth_score',
      label: 'TECHNICAL DEPTH',
      description: 'Engineering complexity, algorithmic depth & architecture',
      score: evaluation.technical_depth_score,
    },
    {
      key: 'uniqueness_score',
      label: 'UNIQUENESS',
      description: 'Differentiation from standard academic submissions',
      score: evaluation.uniqueness_score,
    },
    {
      key: 'scope_score',
      label: 'SCOPE',
      description: 'Appropriateness of feature volume for timeline and team',
      score: evaluation.scope_score,
    },
  ]

  const getScoreStatusBadge = (score: number) => {
    if (score >= 85) return { label: 'EXCEPTIONAL VIABILITY', color: 'text-[#FF5A1F] bg-[#FFF0E9]' }
    if (score >= 70) return { label: 'STRONG POTENTIAL', color: 'text-[#111111] bg-[#E4E2DC]/60' }
    return { label: 'SCOPE REALIGNMENT ADVISED', color: 'text-[#5F5F5A] bg-[#F7F6F2]' }
  }

  const overallBadge = getScoreStatusBadge(evaluation.overall_score)

  return (
    <section className="py-12 border-b border-[#E4E2DC]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Column: Overall Score & Why This Score */}
        <div className="lg:col-span-5 space-y-8">
          {/* Main Overall Potential Gauge */}
          <div className="bg-white border border-[#E4E2DC] rounded-3xl p-8 sm:p-10 shadow-sm relative">
            <span className="font-mono text-xs uppercase tracking-widest text-[#5F5F5A] block mb-2">
              AUDIT VERDICT
            </span>

            <h3 className="text-xl sm:text-2xl font-black font-display text-[#111111] uppercase tracking-tight mb-6">
              PROJECT POTENTIAL
            </h3>

            {/* Big Typography Number Reveal */}
            <div className="flex items-baseline gap-3 mb-4">
              <span
                className="text-7xl sm:text-8xl font-black font-display text-[#111111] tracking-tighter leading-none"
                aria-label={`Overall score: ${evaluation.overall_score} out of 100`}
              >
                {animatedScore}
              </span>
              <span className="font-mono text-2xl font-bold text-[#5F5F5A]">/ 100</span>
            </div>

            {/* Progress line with subtle geometric indicator */}
            <div className="space-y-2 mb-6">
              <div className="h-2 w-full bg-[#F7F6F2] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#FF5A1F] transition-all duration-1000 ease-out"
                  style={{ width: `${evaluation.overall_score}%` }}
                />
              </div>
              <div className="flex justify-between font-mono text-[10px] text-[#5F5F5A]">
                <span>00</span>
                <span>BENCHMARK 75</span>
                <span>100</span>
              </div>
            </div>

            {/* Verdict Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full font-mono text-xs font-bold uppercase tracking-wider mb-6">
              <span className={`px-2.5 py-1 rounded-full ${overallBadge.color}`}>
                {overallBadge.label}
              </span>
            </div>

            <p className="text-xs text-[#5F5F5A] font-sans leading-relaxed">
              Weighted composite index evaluating novelty against feasibility, delivery risk, and viva defensibility.
            </p>
          </div>

          {/* Context Block: WHY THIS SCORE? */}
          <div className="bg-[#FFF0E9]/60 border border-[#FF5A1F]/20 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#FF5A1F]" />
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#FF5A1F]">
                WHY THIS SCORE?
              </h4>
            </div>

            <p className="text-xs sm:text-sm text-[#111111] font-sans leading-relaxed mb-4">
              This evaluation is personalized to your exact inputs. Project Forge checked whether this project is executable given:
            </p>

            <ul className="space-y-2 text-xs font-mono text-[#5F5F5A]">
              <li className="flex items-start gap-2">
                <span className="text-[#FF5A1F] font-bold">→</span>
                <span>
                  <strong className="text-[#111111]">YOUR SKILLS:</strong>{' '}
                  {profile.skills.length > 0 ? profile.skills.join(', ') : 'Python, React'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF5A1F] font-bold">→</span>
                <span>
                  <strong className="text-[#111111]">YOUR TEAM:</strong>{' '}
                  {profile.team_size || 1} Engineer(s)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF5A1F] font-bold">→</span>
                <span>
                  <strong className="text-[#111111]">YOUR TIMELINE:</strong>{' '}
                  {profile.duration || '8 weeks'}
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#FF5A1F] font-bold">→</span>
                <span>
                  <strong className="text-[#111111]">YOUR EXPERIENCE:</strong>{' '}
                  {profile.experience || 'intermediate'}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Right Column: Clean Editorial Score Layout */}
        <div className="lg:col-span-7 bg-white border border-[#E4E2DC] rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="flex items-center justify-between pb-6 border-b border-[#E4E2DC] mb-6">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-[#5F5F5A]">
                BREAKDOWN
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-display text-[#111111] uppercase tracking-tight">
                METRIC SCORES
              </h3>
            </div>
            <span className="font-mono text-xs text-[#5F5F5A]">SCALE 0 - 100</span>
          </div>

          {/* Individual Metric Score Rows */}
          <div className="divide-y divide-[#E4E2DC]">
            {metrics.map((m) => {
              return (
                <div
                  key={m.key}
                  className="py-5 first:pt-0 last:pb-0 group transition-all duration-200"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <div className="transition-transform duration-200 group-hover:translate-x-1">
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                        {m.label}
                      </span>
                      <p className="text-[11px] text-[#5F5F5A] font-sans mt-0.5">
                        {m.description}
                      </p>
                    </div>

                    <div className="text-right">
                      <span
                        className="font-mono text-base sm:text-lg font-bold text-[#111111]"
                        aria-label={`${m.label}: ${m.score} out of 100`}
                      >
                        {m.score}
                      </span>
                      <span className="font-mono text-xs text-[#5F5F5A] ml-1">/ 100</span>
                    </div>
                  </div>

                  {/* Meter Bar */}
                  <div className="h-1.5 w-full bg-[#F7F6F2] rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full bg-[#111111] group-hover:bg-[#FF5A1F] transition-all duration-500 ease-out"
                      style={{ width: `${m.score}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
