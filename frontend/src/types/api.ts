export interface HealthResponse {
  status: string
  service: string
}

export interface ApiError {
  message: string
  status?: number
  detail?: unknown
}

export type AsyncStatus = 'idle' | 'loading' | 'success' | 'error'

export interface ApiResponse<T> {
  data: T | null
  error: ApiError | null
  status: AsyncStatus
  latencyMs?: number
}
