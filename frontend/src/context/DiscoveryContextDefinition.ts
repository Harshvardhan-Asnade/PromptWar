import { createContext } from 'react'
import type {
  StudentProfile,
  ProjectIdea,
  GenerationStatus,
  ProjectEvaluation,
  ImproveProjectResponse,
  MentorMessage,
} from '../types/discovery'

export type AppRoute =
  | 'landing'
  | 'discovery'
  | 'results'
  | 'project-detail'
  | 'blueprint'
  | 'review'
  | 'improve'
  | 'mentor'

export interface DiscoveryContextType {
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

export const DiscoveryContext = createContext<DiscoveryContextType | null>(null)
