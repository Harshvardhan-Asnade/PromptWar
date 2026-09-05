export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced'

export interface StudentProfile {
  interests: string[]
  skills: string[]
  experience: ExperienceLevel | ''
  team_size: number
  duration: string
  difficulty: string
  domain: string
}

export interface ProjectIdea {
  id: string
  title: string
  tagline: string
  problem: string
  solution: string
  why_it_fits: string
  innovation_score: number
  feasibility_score: number
  impact_score: number
  technical_depth_score: number
  difficulty: string
  features: string[]
  advanced_features: string[]
  tech_stack: string[]
  architecture: string[]
  roadmap: string[]
  datasets: string[]
  risks: string[]
  improvements: string[]
}

export interface GenerateProjectsResponse {
  projects: ProjectIdea[]
}

export interface ProjectEvaluation {
  innovation_score: number
  feasibility_score: number
  impact_score: number
  technical_depth_score: number
  uniqueness_score: number
  scope_score: number
  overall_score: number
  strengths: string[]
  weaknesses: string[]
  risks: string[]
  recommendations: string[]
}

export type GenerationStatus = 'idle' | 'generating' | 'success' | 'error'
