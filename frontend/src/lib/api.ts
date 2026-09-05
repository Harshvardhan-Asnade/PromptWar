import type { HealthResponse } from '../types/api'
import type { StudentProfile, GenerateProjectsResponse } from '../types/discovery'

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

/**
 * Universal fetch wrapper for Project Forge API
 */
export async function apiRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<{ data: T; latencyMs: number }> {
  const cleanPath = path.startsWith('/') ? path : `/${path}`
  const url = `${API_BASE_URL}${cleanPath}`

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...options.headers,
  }

  const startTime = performance.now()

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    })

    const latencyMs = Math.round(performance.now() - startTime)

    if (!response.ok) {
      let errorDetail: unknown
      try {
        errorDetail = await response.json()
      } catch {
        errorDetail = await response.text()
      }
      throw new ApiFetchError(
        `API request failed: ${response.status} ${response.statusText}`,
        response.status,
        errorDetail
      )
    }

    const data = (await response.json()) as T
    return { data, latencyMs }
  } catch (error) {
    if (error instanceof ApiFetchError) {
      throw error
    }
    const message =
      error instanceof Error ? error.message : 'Unknown network error'
    throw new ApiFetchError(
      `Failed to connect to backend at ${url}. Ensure FastAPI is running. (${message})`
    )
  }
}

/**
 * Query the backend health check endpoint
 */
export async function fetchHealth(): Promise<{
  data: HealthResponse
  latencyMs: number
}> {
  return apiRequest<HealthResponse>('/api/health', {
    method: 'GET',
  })
}

/**
 * Send student profile to generate 3 tailored project blueprints
 */
export async function generateProjects(profile: StudentProfile): Promise<{
  data: GenerateProjectsResponse
  latencyMs: number
}> {
  return apiRequest<GenerateProjectsResponse>('/api/projects/generate', {
    method: 'POST',
    body: JSON.stringify(profile),
  })
}
