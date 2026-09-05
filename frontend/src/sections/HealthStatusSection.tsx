import React from 'react'
import { useApiHealth } from '../hooks/useApiHealth'
import { API_BASE_URL } from '../lib/api'

export const HealthStatusSection: React.FC = () => {
  const { data, error, status, latencyMs, refetch } = useApiHealth()

  return (
    <section
      id="diagnostic"
      className="border-b border-[#1C202A] px-6 py-20 md:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <span className="font-editorial-mono text-xs uppercase tracking-widest text-[#E5A93C]">
              [00 // SYSTEM_HANDSHAKE]
            </span>
            <h2 className="mt-2 font-editorial-serif text-3xl text-white sm:text-4xl md:text-5xl">
              Backend Integration Diagnostic
            </h2>
          </div>
          <div className="font-editorial-mono text-xs text-[#71788E]">
            TARGET: {API_BASE_URL}/api/health
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
          {/* Status Overview */}
          <div className="space-y-6 lg:col-span-5">
            <p className="text-sm font-light leading-relaxed text-[#9CA3AF]">
              Verifying real-time bidirectional communication between the Vite React client
              and the FastAPI Python service over CORS. Responses are validated against the
              backend Pydantic health contract.
            </p>

            <div className="border border-[#1E222B] bg-[#11141A] p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1C202A] pb-3 text-xs font-editorial-mono">
                <span className="text-[#71788E]">CONNECTION STATE</span>
                <span
                  className={`font-semibold ${
                    status === 'success'
                      ? 'text-emerald-400'
                      : status === 'loading'
                      ? 'text-amber-300'
                      : 'text-rose-400'
                  }`}
                >
                  {status.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#1C202A] pb-3 text-xs font-editorial-mono">
                <span className="text-[#71788E]">ROUND-TRIP LATENCY</span>
                <span className="text-white">
                  {latencyMs !== undefined ? `${latencyMs} ms` : '—'}
                </span>
              </div>

              <div className="flex items-center justify-between border-b border-[#1C202A] pb-3 text-xs font-editorial-mono">
                <span className="text-[#71788E]">SERVICE IDENTIFIER</span>
                <span className="text-white">
                  {data?.service || '—'}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-editorial-mono">
                <span className="text-[#71788E]">ENDPOINT STATUS</span>
                <span className="text-white">
                  {data?.status || '—'}
                </span>
              </div>
            </div>

            <button
              onClick={refetch}
              disabled={status === 'loading'}
              className="group inline-flex items-center gap-3 border border-[#2B313E] bg-[#141822] px-5 py-3 font-editorial-mono text-xs uppercase tracking-wider text-white transition-colors hover:border-[#E5A93C] hover:bg-[#1A1F2C] disabled:opacity-50"
            >
              <span
                className={`h-2 w-2 rounded-full bg-[#E5A93C] ${
                  status === 'loading' ? 'animate-ping' : ''
                }`}
              />
              <span>{status === 'loading' ? 'Requesting Handshake...' : 'Trigger Health Check'}</span>
            </button>
          </div>

          {/* Raw JSON Inspector */}
          <div className="lg:col-span-7">
            <div className="border border-[#1E222B] bg-[#0E1015]">
              <div className="flex items-center justify-between border-b border-[#1C202A] px-4 py-2.5 font-editorial-mono text-[11px] text-[#71788E]">
                <span>RESPONSE_BODY (GET /api/health)</span>
                <span className="text-[#9CA3AF]">application/json</span>
              </div>
              <div className="p-5">
                {status === 'loading' && (
                  <div className="font-editorial-mono text-xs text-[#E5A93C]">
                    Connecting to backend server...
                  </div>
                )}
                {status === 'error' && (
                  <div className="font-editorial-mono text-xs text-rose-400">
                    <p className="font-bold mb-1">Connection Error:</p>
                    <p>{error?.message}</p>
                  </div>
                )}
                {status === 'success' && data && (
                  <pre className="overflow-x-auto font-editorial-mono text-xs leading-relaxed text-[#D1D5DB]">
                    <code>{JSON.stringify(data, null, 2)}</code>
                  </pre>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
