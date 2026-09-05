import React, { useState, useEffect, useCallback, useRef } from 'react'
import type {
  StudentProfile,
  ProjectIdea,
  GenerationStatus,
  ProjectEvaluation,
  ImproveProjectResponse,
  MentorMessage,
} from '../types/discovery'
import { generateProjects, evaluateProject, improveProject, askMentor } from '../lib/api'
import {
  DiscoveryContext,
  type AppRoute,
} from './DiscoveryContextDefinition'

const defaultProfile: StudentProfile = {
  interests: ['AI / ML'],
  skills: ['Python', 'React'],
  experience: 'intermediate',
  team_size: 3,
  duration: '8 weeks',
  difficulty: 'balanced',
  domain: 'AI / ML',
}

export const DiscoveryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile>(defaultProfile)
  const [step, setStep] = useState<number>(1)
  const [currentRoute, setCurrentRoute] = useState<AppRoute>('landing')
  const [projects, setProjects] = useState<ProjectIdea[]>([])
  const [selectedProject, setSelectedProject] = useState<ProjectIdea | null>(null)
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>('idle')
  const [generationStep, setGenerationStep] = useState<number>(0)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  // Phase 7: Evaluation state
  const [evaluation, setEvaluation] = useState<ProjectEvaluation | null>(null)
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false)
  const [evaluationStep, setEvaluationStep] = useState<number>(0)
  const [evaluationError, setEvaluationError] = useState<string | null>(null)

  // Phase 8: Improvement state
  const [improvedProject, setImprovedProject] = useState<ProjectIdea | null>(null)
  const [improvementData, setImprovementData] = useState<ImproveProjectResponse | null>(null)
  const [isImproving, setIsImproving] = useState<boolean>(false)
  const [improvementStep, setImprovementStep] = useState<number>(0)
  const [improvementError, setImprovementError] = useState<string | null>(null)

  // Phase 10: Mentor state
  const [mentorMessages, setMentorMessages] = useState<MentorMessage[]>([])
  const [isAskingMentor, setIsAskingMentor] = useState<boolean>(false)
  const [mentorThinkingStep, setMentorThinkingStep] = useState<number>(0)
  const [mentorError, setMentorError] = useState<string | null>(null)

  // Timer lifecycle management ref to avoid leaks across fast re-renders/unmounts
  const activeTimersRef = useRef<ReturnType<typeof setTimeout>[]>([])

  const clearActiveTimers = useCallback(() => {
    activeTimersRef.current.forEach(clearTimeout)
    activeTimersRef.current = []
  }, [])

  useEffect(() => {
    return () => {
      activeTimersRef.current.forEach(clearTimeout)
      activeTimersRef.current = []
    }
  }, [])

  // Synchronize route with URL hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase()
      if (hash.includes('mentor')) {
        setCurrentRoute('mentor')
      } else if (hash.includes('improve')) {
        setCurrentRoute('improve')
      } else if (hash.includes('review')) {
        setCurrentRoute('review')
      } else if (hash.includes('blueprint')) {
        setCurrentRoute('blueprint')
      } else if (hash.includes('project-detail')) {
        setCurrentRoute('project-detail')
      } else if (hash.includes('discovery')) {
        setCurrentRoute('discovery')
      } else if (hash.includes('results')) {
        setCurrentRoute('results')
      } else {
        setCurrentRoute('landing')
      }
    }

    handleHashChange()
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const navigateTo = useCallback((route: AppRoute) => {
    setCurrentRoute(route)
    if (route === 'mentor') {
      window.location.hash = 'mentor'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (route === 'improve') {
      window.location.hash = 'improve'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (route === 'review') {
      window.location.hash = 'review'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (route === 'blueprint') {
      window.location.hash = 'blueprint'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (route === 'project-detail') {
      window.location.hash = 'project-detail'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (route === 'discovery') {
      window.location.hash = 'discovery'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else if (route === 'results') {
      window.location.hash = 'results'
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.location.hash = ''
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [])

  const selectProject = useCallback((project: ProjectIdea) => {
    setSelectedProject(project)
    setEvaluation(null)
    setEvaluationError(null)
    navigateTo('project-detail')
  }, [navigateTo])

  const clearSelectedProject = useCallback(() => {
    setSelectedProject(null)
    setEvaluation(null)
    setEvaluationError(null)
    navigateTo('results')
  }, [navigateTo])

  const updateProfile = useCallback((updates: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }))
  }, [])

  const toggleInterest = useCallback((interest: string) => {
    setProfile((prev) => {
      const exists = prev.interests.includes(interest)
      const nextInterests = exists
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest]
      return {
        ...prev,
        interests: nextInterests,
        domain: nextInterests[0] || prev.domain,
      }
    })
  }, [])

  const toggleSkill = useCallback((skill: string) => {
    setProfile((prev) => {
      const exists = prev.skills.includes(skill)
      const nextSkills = exists
        ? prev.skills.filter((s) => s !== skill)
        : [...prev.skills, skill]
      return { ...prev, skills: nextSkills }
    })
  }, [])

  const nextStep = useCallback(() => {
    setStep((prev) => Math.min(prev + 1, 5))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const resetDiscovery = useCallback(() => {
    setStep(1)
    setGenerationStatus('idle')
    setErrorMessage(null)
  }, [])

  const triggerGeneration = useCallback(async () => {
    if (generationStatus === 'generating') return

    clearActiveTimers()
    setGenerationStatus('generating')
    setErrorMessage(null)
    setGenerationStep(0)

    const t1 = setTimeout(() => setGenerationStep(1), 600)
    const t2 = setTimeout(() => setGenerationStep(2), 1400)
    const t3 = setTimeout(() => setGenerationStep(3), 2200)
    activeTimersRef.current.push(t1, t2, t3)

    try {
      const payload: StudentProfile = {
        interests: profile.interests.length > 0 ? profile.interests : ['AI / ML'],
        skills: profile.skills.length > 0 ? profile.skills : ['Python'],
        experience: profile.experience || 'intermediate',
        team_size: Math.max(1, profile.team_size || 3),
        duration: profile.duration || '8 weeks',
        difficulty: profile.difficulty || 'balanced',
        domain: profile.domain || profile.interests[0] || 'AI / ML',
      }

      const { data } = await generateProjects(payload)
      clearActiveTimers()

      if (data.projects && data.projects.length === 3) {
        setProjects(data.projects)
        setGenerationStatus('success')
        navigateTo('results')
      } else {
        throw new Error('Expected 3 project blueprints from engine')
      }
    } catch (err: unknown) {
      clearActiveTimers()
      const msg = err instanceof Error ? err.message : 'Failed to connect to AI engine'
      setErrorMessage(msg)
      setGenerationStatus('error')
    }
  }, [generationStatus, clearActiveTimers, profile, navigateTo])

  const clearEvaluation = useCallback(() => {
    setEvaluation(null)
    setEvaluationError(null)
    setIsEvaluating(false)
    setEvaluationStep(0)
  }, [])

  const runEvaluation = useCallback(
    async (forceRefresh = false) => {
      if (!selectedProject) {
        setEvaluationError('No project selected to evaluate.')
        return
      }

      if (isEvaluating) return
      if (evaluation && !forceRefresh) return

      clearActiveTimers()
      setIsEvaluating(true)
      setEvaluationError(null)
      setEvaluationStep(0)

      const t1 = setTimeout(() => setEvaluationStep(1), 500)
      const t2 = setTimeout(() => setEvaluationStep(2), 1100)
      const t3 = setTimeout(() => setEvaluationStep(3), 1700)
      const t4 = setTimeout(() => setEvaluationStep(4), 2300)
      activeTimersRef.current.push(t1, t2, t3, t4)

      try {
        const studentContext: StudentProfile = {
          interests: profile.interests.length > 0 ? profile.interests : ['AI / ML'],
          skills: profile.skills.length > 0 ? profile.skills : ['Python'],
          experience: profile.experience || 'intermediate',
          team_size: Math.max(1, profile.team_size || 3),
          duration: profile.duration || '8 weeks',
          difficulty: profile.difficulty || 'balanced',
          domain: profile.domain || profile.interests[0] || 'AI / ML',
        }

        const { data } = await evaluateProject(selectedProject, studentContext)
        clearActiveTimers()
        setEvaluation(data)
        setIsEvaluating(false)
      } catch (err: unknown) {
        clearActiveTimers()
        const msg =
          err instanceof Error
            ? err.message
            : "We couldn't complete the project audit right now."
        setEvaluationError(msg)
        setIsEvaluating(false)
      }
    },
    [selectedProject, isEvaluating, evaluation, clearActiveTimers, profile]
  )

  const clearImprovement = useCallback(() => {
    setImprovedProject(null)
    setImprovementData(null)
    setImprovementError(null)
    setIsImproving(false)
    setImprovementStep(0)
  }, [])

  const runImprovement = useCallback(
    async (forceRefresh = false, focusAreas?: string[]) => {
      if (!selectedProject) {
        setImprovementError('No project selected to improve.')
        return
      }

      if (isImproving) return
      if (improvedProject && !forceRefresh) return

      clearActiveTimers()
      setIsImproving(true)
      setImprovementError(null)
      setImprovementStep(0)

      const t1 = setTimeout(() => setImprovementStep(1), 600)
      const t2 = setTimeout(() => setImprovementStep(2), 1300)
      const t3 = setTimeout(() => setImprovementStep(3), 2000)
      const t4 = setTimeout(() => setImprovementStep(4), 2800)
      activeTimersRef.current.push(t1, t2, t3, t4)

      try {
        const studentContext: StudentProfile = {
          interests: profile.interests.length > 0 ? profile.interests : ['AI / ML'],
          skills: profile.skills.length > 0 ? profile.skills : ['Python'],
          experience: profile.experience || 'intermediate',
          team_size: Math.max(1, profile.team_size || 3),
          duration: profile.duration || '8 weeks',
          difficulty: profile.difficulty || 'balanced',
          domain: profile.domain || profile.interests[0] || 'AI / ML',
        }

        const areas = focusAreas && focusAreas.length > 0
          ? focusAreas
          : ['architecture', 'scope', 'feasibility', 'technical_depth']

        const { data } = await improveProject(selectedProject, studentContext, areas)
        clearActiveTimers()
        setImprovementData(data)
        setImprovedProject(data.improved_project)
        setIsImproving(false)
      } catch (err: unknown) {
        clearActiveTimers()
        const msg =
          err instanceof Error
            ? err.message
            : "We couldn't strengthen the project right now."
        setImprovementError(msg)
        setIsImproving(false)
      }
    },
    [selectedProject, isImproving, improvedProject, clearActiveTimers, profile]
  )

  const acceptImprovedProject = useCallback(() => {
    if (improvedProject) {
      setSelectedProject(improvedProject)
      navigateTo('blueprint')
    }
  }, [improvedProject, navigateTo])

  const clearMentorChat = useCallback(() => {
    setMentorMessages([])
    setMentorError(null)
    setIsAskingMentor(false)
    setMentorThinkingStep(0)
  }, [])

  const askMentorQuestion = useCallback(
    async (question: string) => {
      if (isAskingMentor) return

      const activeProject = selectedProject || (projects.length > 0 ? projects[0] : null)
      if (!activeProject) {
        setMentorError('Please select or generate a project first.')
        return
      }

      const trimmed = question.trim()
      if (!trimmed) return

      clearActiveTimers()
      const userMsg: MentorMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: trimmed,
        timestamp: Date.now(),
      }

      setMentorMessages((prev) => [...prev, userMsg])
      setIsAskingMentor(true)
      setMentorError(null)
      setMentorThinkingStep(0)

      const t1 = setTimeout(() => setMentorThinkingStep(1), 600)
      const t2 = setTimeout(() => setMentorThinkingStep(2), 1400)
      const t3 = setTimeout(() => setMentorThinkingStep(3), 2200)
      activeTimersRef.current.push(t1, t2, t3)

      try {
        const studentContext: StudentProfile = {
          interests: profile.interests.length > 0 ? profile.interests : ['AI / ML'],
          skills: profile.skills.length > 0 ? profile.skills : ['Python'],
          experience: profile.experience || 'intermediate',
          team_size: Math.max(1, profile.team_size || 3),
          duration: profile.duration || '8 weeks',
          difficulty: profile.difficulty || 'balanced',
          domain: profile.domain || profile.interests[0] || 'AI / ML',
        }

        const { data } = await askMentor(activeProject, studentContext, trimmed)
        clearActiveTimers()

        const assistantMsg: MentorMessage = {
          id: `mentor-${Date.now()}`,
          role: 'assistant',
          response: data,
          timestamp: Date.now(),
        }

        setMentorMessages((prev) => [...prev, assistantMsg])
        setIsAskingMentor(false)
      } catch (err: unknown) {
        clearActiveTimers()
        const msg =
          err instanceof Error
            ? err.message
            : 'AI service is temporarily unavailable. Please try again.'
        setMentorError(msg)
        setIsAskingMentor(false)
      }
    },
    [isAskingMentor, selectedProject, projects, clearActiveTimers, profile]
  )

  return (
    <DiscoveryContext.Provider
      value={{
        profile,
        updateProfile,
        toggleInterest,
        toggleSkill,
        step,
        setStep,
        nextStep,
        prevStep,
        currentRoute,
        navigateTo,
        projects,
        selectedProject,
        selectProject,
        clearSelectedProject,
        generationStatus,
        generationStep,
        errorMessage,
        triggerGeneration,
        resetDiscovery,
        evaluation,
        isEvaluating,
        evaluationStep,
        evaluationError,
        runEvaluation,
        clearEvaluation,
        improvedProject,
        improvementData,
        isImproving,
        improvementStep,
        improvementError,
        runImprovement,
        acceptImprovedProject,
        clearImprovement,
        mentorMessages,
        isAskingMentor,
        mentorThinkingStep,
        mentorError,
        askMentorQuestion,
        clearMentorChat,
      }}
    >
      {children}
    </DiscoveryContext.Provider>
  )
}
