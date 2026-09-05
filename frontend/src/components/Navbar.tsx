import React from 'react'
import { useApiHealth } from '../hooks/useApiHealth'

export const Navbar: React.FC = () => {
  const { status, latencyMs } = useApiHealth()

  return (
    <header className="sticky top-0 z-50 border-b border-[#1C202A] bg-[#090A0D]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <div className="flex items-center gap-4">
          <span className="font-editorial-mono text-xs font-semibold tracking-widest text-[#E5A93C]">
            [PF//01]
          </span>
          <span className="font-editorial-serif text-2xl tracking-tight text-white">
            PROJECT FORGE
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex items-center gap-2 font-editorial-mono text-[11px] uppercase tracking-wider text-[#8A90A2]">
            <span>FastAPI Core:</span>
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-medium ${
                status === 'success'
                  ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/60'
                  : status === 'loading'
                  ? 'bg-amber-950/60 text-amber-300 border border-amber-800/60'
                  : 'bg-rose-950/60 text-rose-400 border border-rose-800/60'
              }`}
            >
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  status === 'success'
                    ? 'bg-emerald-400 animate-pulse'
                    : status === 'loading'
                    ? 'bg-amber-300 animate-spin'
                    : 'bg-rose-400'
                }`}
              />
              {status === 'success'
                ? `ONLINE ${latencyMs ? `(${latencyMs}ms)` : ''}`
                : status === 'loading'
                ? 'CONNECTING'
                : 'OFFLINE'}
            </span>
          </div>

          <a
            href="#diagnostic"
            className="font-editorial-mono text-xs text-[#9CA3AF] transition-colors hover:text-white"
          >
            Diagnostics ↓
          </a>
        </div>
      </div>
    </header>
  )
}
