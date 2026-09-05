import { useCallback, useEffect, useState } from 'react'
import { fetchHealth } from '../lib/api'
import type { ApiResponse, HealthResponse } from '../types/api'

export function useApiHealth() {
  const [state, setState] = useState<ApiResponse<HealthResponse>>({
    data: null,
    error: null,
    status: 'idle',
    latencyMs: undefined,
  })

  const checkHealth = useCallback(async () => {
    setState((prev) => ({ ...prev, status: 'loading', error: null }))
    try {
      const { data, latencyMs } = await fetchHealth()
      setState({
        data,
        error: null,
        status: 'success',
        latencyMs,
      })
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Failed to reach API health check'
      setState({
        data: null,
        error: { message },
        status: 'error',
        latencyMs: undefined,
      })
    }
  }, [])

  useEffect(() => {
    checkHealth()
  }, [checkHealth])

  return {
    ...state,
    refetch: checkHealth,
  }
}
