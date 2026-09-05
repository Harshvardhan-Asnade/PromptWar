import React from 'react'
import { SmoothScrollProvider } from './components/SmoothScrollProvider'
import { DiscoveryProvider, useDiscovery } from './context/DiscoveryContext'
import { HomePage } from './pages/HomePage'
import { DiscoveryPage } from './pages/DiscoveryPage'
import { ResultsPage } from './pages/ResultsPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { BlueprintPage } from './pages/BlueprintPage'
import { ProjectReviewPage } from './pages/ProjectReviewPage'

const AppContent: React.FC = () => {
  const { currentRoute, navigateTo } = useDiscovery()

  if (currentRoute === 'discovery') {
    return <DiscoveryPage />
  }

  if (currentRoute === 'results') {
    return <ResultsPage />
  }

  if (currentRoute === 'project-detail') {
    return <ProjectDetailPage />
  }

  if (currentRoute === 'blueprint') {
    return <BlueprintPage />
  }

  if (currentRoute === 'review') {
    return <ProjectReviewPage />
  }

  if (currentRoute === 'improve') {
    return (
      <div className="min-h-screen bg-[#F7F6F2] text-[#111111] flex items-center justify-center p-6 font-sans">
        <div className="bg-white border border-[#E4E2DC] rounded-3xl p-10 sm:p-14 text-center max-w-lg shadow-sm">
          <div className="w-12 h-12 bg-[#FFF0E9] rounded-2xl flex items-center justify-center text-[#FF5A1F] mx-auto mb-4 font-mono font-bold text-sm">
            PF
          </div>
          <span className="inline-block px-3 py-1 rounded-full bg-[#FFF0E9] text-[#FF5A1F] text-xs font-mono uppercase tracking-wider mb-4">
            PHASE 8 PREVIEW
          </span>
          <h2 className="text-2xl font-extrabold font-display text-[#111111] mb-3">
            IMPROVEMENT ENGINE
          </h2>
          <p className="text-sm text-[#5F5F5A] mb-8 font-sans">
            The AI Project Improvement engine will unlock in Phase 8. You can review your audit recommendations or return to your engineering blueprint.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => navigateTo('review')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#FF5A1F] hover:bg-[#E04D16] text-white font-mono text-xs font-bold uppercase tracking-wider rounded-xl transition-colors shadow-sm cursor-pointer"
            >
              ← BACK TO AUDIT
            </button>
            <button
              type="button"
              onClick={() => navigateTo('blueprint')}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#F7F6F2] hover:bg-[#E4E2DC] text-[#111111] font-mono text-xs uppercase tracking-wider rounded-xl transition-colors border border-[#E4E2DC] cursor-pointer"
            >
              BLUEPRINT
            </button>
          </div>
        </div>
      </div>
    )
  }

  return <HomePage />
}

export const App: React.FC = () => {
  return (
    <DiscoveryProvider>
      <SmoothScrollProvider>
        <AppContent />
      </SmoothScrollProvider>
    </DiscoveryProvider>
  )
}

export default App
