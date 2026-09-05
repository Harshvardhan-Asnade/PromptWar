import type { HealthResponse } from '../types/api'
import type {
  StudentProfile,
  GenerateProjectsResponse,
  ProjectIdea,
  ProjectEvaluation,
  ImproveProjectResponse,
  MentorResponse,
} from '../types/discovery'

export const API_BASE_URL =
  import.meta.env.VITE_API_URL?.trim() || 'http://localhost:8000'

export class ApiFetchError extends Error {
  status?: number
  detail?: unknown

  constructor(message: string, status?: number, detail?: unknown) {
    super(message)
    this.name = 'ApiFetchError'
    this.status = status
    this.detail = detail
  }
}

const DEFAULT_TIMEOUT_MS = 65000

/**
 * Universal fetch wrapper for Project Forge API with timeout and safe error parsing
 */
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<{ data: T; latencyMs: number }> {
  const url = `${API_BASE_URL.replace(/\/$/, '')}${endpoint}`
  const startTime = performance.now()

  // Client-side request timeout guard (Phase A4 & C5)
  const controller = new AbortController()
  const timeoutId = setTimeout(() => controller.abort(), DEFAULT_TIMEOUT_MS)

  try {
    const response = await fetch(url, {
      ...options,
      signal: options.signal || controller.signal,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    })

    clearTimeout(timeoutId)
    const latencyMs = Math.round(performance.now() - startTime)

    if (!response.ok) {
      let errorMessage = `HTTP Error ${response.status} from ${endpoint}`
      let errorDetail: unknown = null

      try {
        const errorJson = await response.json()
        errorDetail = errorJson
        if (errorJson.detail?.message) {
          errorMessage = errorJson.detail.message
        } else if (typeof errorJson.detail === 'string') {
          errorMessage = errorJson.detail
        }
      } catch {
        // Response was not JSON
      }

      // Safe user-facing fallback messages (Phase B9)
      if (response.status === 429) {
        errorMessage = 'Too many requests. Please wait a moment before trying again.'
      } else if (response.status === 413) {
        errorMessage = 'Payload too large. Please reduce the size of your input.'
      } else if (response.status === 504) {
        errorMessage = 'AI synthesis timed out. Please try again with simpler constraints.'
      } else if (response.status >= 500 && !errorMessage) {
        errorMessage = 'AI service is temporarily unavailable. Please try again.'
      }

      throw new ApiFetchError(
        errorMessage,
        response.status,
        errorDetail
      )
    }

    const data: T = await response.json()
    return { data, latencyMs }
  } catch (err: unknown) {
    clearTimeout(timeoutId)
    if (err instanceof ApiFetchError) {
      throw err
    }
    if (err instanceof DOMException && err.name === 'AbortError') {
      throw new ApiFetchError('Request timed out waiting for AI response. Please try again.', 504)
    }
    const message = err instanceof Error ? err.message : 'Unknown network failure'
    throw new ApiFetchError(`AI service is temporarily unavailable. Please try again. (${message})`)
  }
}

/**
 * Health check ping
 */
export async function getHealth(): Promise<{ data: HealthResponse; latencyMs: number }> {
  return apiRequest<HealthResponse>('/api/health')
}

export const fetchHealth = getHealth

/**
 * Generate 3 high-impact project blueprints matching student profile
 */
export async function generateProjects(
  profile: StudentProfile
): Promise<{ data: GenerateProjectsResponse; latencyMs: number }> {
  return apiRequest<GenerateProjectsResponse>('/api/projects/generate', {
    method: 'POST',
    body: JSON.stringify(profile),
  })
}

/**
 * Evaluate technical feasibility and alignment of a selected project
 */
export async function evaluateProject(
  project: ProjectIdea,
  studentContext: StudentProfile
): Promise<{
  data: ProjectEvaluation
  latencyMs: number
}> {
  return apiRequest<ProjectEvaluation>('/api/projects/evaluate', {
    method: 'POST',
    body: JSON.stringify({
      project,
      student_context: studentContext,
    }),
  })
}

/**
 * Harden and improve a selected project blueprint based on audit findings
 */
export async function improveProject(
  project: ProjectIdea,
  studentContext: StudentProfile,
  focusAreas?: string[]
): Promise<{
  data: ImproveProjectResponse
  latencyMs: number
}> {
  return apiRequest<ImproveProjectResponse>('/api/projects/improve', {
    method: 'POST',
    body: JSON.stringify({
      project,
      student_context: studentContext,
      focus_areas: focusAreas && focusAreas.length > 0 ? focusAreas : null,
    }),
  })
}

/**
 * Ask AI Mentor contextual technical guidance for the selected project
 */
export async function askMentor(
  project: ProjectIdea,
  studentContext: StudentProfile,
  question: string
): Promise<{
  data: MentorResponse
  latencyMs: number
}> {
  return apiRequest<MentorResponse>('/api/mentor', {
    method: 'POST',
    body: JSON.stringify({
      project,
      student_context: studentContext,
      question: question.trim(),
    }),
  })
}
