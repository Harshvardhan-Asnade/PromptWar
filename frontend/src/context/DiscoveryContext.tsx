import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'
import type {
  StudentProfile,
  ProjectIdea,
  GenerationStatus,
  ProjectEvaluation,
  ImproveProjectResponse,
  MentorMessage,
} from '../types/discovery'
import { generateProjects, evaluateProject, improveProject, askMentor } from '../lib/api'

export type AppRoute =
  | 'landing'
  | 'discovery'
  | 'results'
  | 'project-detail'
  | 'blueprint'
  | 'review'
  | 'improve'
  | 'mentor'

interface DiscoveryContextType {
  profile: StudentProfile
  updateProfile: (updates: Partial<StudentProfile>) => void
  toggleInterest: (interest: string) => void
  toggleSkill: (skill: string) => void
  step: number
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  currentRoute: AppRoute
  navigateTo: (route: AppRoute) => void
  projects: ProjectIdea[]
  selectedProject: ProjectIdea | null
  selectProject: (project: ProjectIdea) => void
  clearSelectedProject: () => void
  generationStatus: GenerationStatus
  generationStep: number // 0 to 3 for cinematic loading
  errorMessage: string | null
  triggerGeneration: () => Promise<void>
  resetDiscovery: () => void
  evaluation: ProjectEvaluation | null
  isEvaluating: boolean
  evaluationStep: number
  evaluationError: string | null
  runEvaluation: (forceRefresh?: boolean) => Promise<void>
  clearEvaluation: () => void
  improvedProject: ProjectIdea | null
  improvementData: ImproveProjectResponse | null
  isImproving: boolean
  improvementStep: number
  improvementError: string | null
  runImprovement: (forceRefresh?: boolean, focusAreas?: string[]) => Promise<void>
  acceptImprovedProject: () => void
  clearImprovement: () => void
  mentorMessages: MentorMessage[]
  isAskingMentor: boolean
  mentorThinkingStep: number
  mentorError: string | null
  askMentorQuestion: (question: string) => Promise<void>
  clearMentorChat: () => void
}

const defaultProfile: StudentProfile = {
  interests: ['AI / ML'],
  skills: ['Python', 'React'],
  experience: 'intermediate',
  team_size: 3,
  duration: '8 weeks',
  difficulty: 'balanced',
  domain: 'AI / ML',
}

const DiscoveryContext = createContext<DiscoveryContextType | null>(null)

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
    setGenerationStatus('generating')
    setErrorMessage(null)
    setGenerationStep(0)

    // Cinematic stepped status timer
    const stepTimers = [
      setTimeout(() => setGenerationStep(1), 600),
      setTimeout(() => setGenerationStep(2), 1400),
      setTimeout(() => setGenerationStep(3), 2200),
    ]

    try {
      // Clean payload for backend schema requirements
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

      if (data.projects && data.projects.length === 3) {
        setProjects(data.projects)
        setGenerationStatus('success')
        navigateTo('results')
      } else {
        throw new Error('Expected 3 project blueprints from engine')
      }
    } catch (err: unknown) {
      stepTimers.forEach(clearTimeout)
      const msg = err instanceof Error ? err.message : 'Failed to connect to AI engine'
      setErrorMessage(msg)
      setGenerationStatus('error')
    }
  }, [profile, navigateTo])

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

      if (evaluation && !forceRefresh) {
        return
      }

      setIsEvaluating(true)
      setEvaluationError(null)
      setEvaluationStep(0)

      // 5-stage high level progression:
      // 0: CHECKING PROJECT SCOPE
      // 1: CHECKING FEASIBILITY
      // 2: ASSESSING TECHNICAL DEPTH
      // 3: CHECKING ALIGNMENT
      // 4: PREPARING RECOMMENDATIONS
      const stepTimers = [
        setTimeout(() => setEvaluationStep(1), 500),
        setTimeout(() => setEvaluationStep(2), 1100),
        setTimeout(() => setEvaluationStep(3), 1700),
        setTimeout(() => setEvaluationStep(4), 2300),
      ]

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
        stepTimers.forEach(clearTimeout)
        setEvaluation(data)
        setIsEvaluating(false)
      } catch (err: unknown) {
        stepTimers.forEach(clearTimeout)
        const msg =
          err instanceof Error
            ? err.message
            : "We couldn't complete the project audit right now."
        setEvaluationError(msg)
        setIsEvaluating(false)
      }
    },
    [selectedProject, profile, evaluation]
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

      if (improvedProject && !forceRefresh) {
        return
      }

      setIsImproving(true)
      setImprovementError(null)
      setImprovementStep(0)

      // 5-stage high level progression:
      // 0: READING YOUR REVIEW
      // 1: IDENTIFYING WEAK POINTS
      // 2: REFINING THE SCOPE
      // 3: STRENGTHENING THE ARCHITECTURE
      // 4: IMPROVING THE PROJECT
      const stepTimers = [
        setTimeout(() => setImprovementStep(1), 600),
        setTimeout(() => setImprovementStep(2), 1300),
        setTimeout(() => setImprovementStep(3), 2000),
        setTimeout(() => setImprovementStep(4), 2800),
      ]

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
        stepTimers.forEach(clearTimeout)
        setImprovementData(data)
        setImprovedProject(data.improved_project)
        setIsImproving(false)
      } catch (err: unknown) {
        stepTimers.forEach(clearTimeout)
        const msg =
          err instanceof Error
            ? err.message
            : "We couldn't strengthen the project right now."
        setImprovementError(msg)
        setIsImproving(false)
      }
    },
    [selectedProject, profile, improvedProject]
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
      const activeProject = selectedProject || (projects.length > 0 ? projects[0] : null)
      if (!activeProject) {
        setMentorError('Please select or generate a project first.')
        return
      }

      const trimmed = question.trim()
      if (!trimmed) return

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

      // 4-stage progression:
      // 0: UNDERSTANDING YOUR QUESTION
      // 1: CONNECTING IT TO YOUR PROJECT
      // 2: THINKING THROUGH THE OPTIONS
      // 3: FORMING A RECOMMENDATION
      const stepTimers = [
        setTimeout(() => setMentorThinkingStep(1), 600),
        setTimeout(() => setMentorThinkingStep(2), 1400),
        setTimeout(() => setMentorThinkingStep(3), 2200),
      ]

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
        stepTimers.forEach(clearTimeout)

        const assistantMsg: MentorMessage = {
          id: `mentor-${Date.now()}`,
          role: 'assistant',
          response: data,
          timestamp: Date.now(),
        }

        setMentorMessages((prev) => [...prev, assistantMsg])
        setIsAskingMentor(false)
      } catch (err: unknown) {
        stepTimers.forEach(clearTimeout)
        const msg =
          err instanceof Error
            ? err.message
            : 'AI service is temporarily unavailable. Please try again.'
        setMentorError(msg)
        setIsAskingMentor(false)
      }
    },
    [selectedProject, projects, profile]
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

export function useDiscovery() {
  const context = useContext(DiscoveryContext)
  if (!context) {
    throw new Error('useDiscovery must be used within a DiscoveryProvider')
  }
  return context
}
