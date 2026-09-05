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

export interface ImproveProjectResponse {
  improved_project: ProjectIdea
  summary_of_changes: string
  feature_improvements: string[]
  technical_improvements: string[]
  architecture_improvements: string[]
  innovation_opportunities: string[]
  scope_adjustments: string[]
  scalability_improvements: string[]
}

export interface MentorResponse {
  answer: string
  recommended_next_action: string
  key_takeaways: string[]
  relevant_risks: string[]
}

export interface MentorMessage {
  id: string
  role: 'user' | 'assistant'
  content?: string
  response?: MentorResponse
  timestamp: number
}

export type GenerationStatus = 'idle' | 'generating' | 'success' | 'error'
