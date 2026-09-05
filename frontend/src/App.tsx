import React, { Suspense, lazy } from 'react'
import { SmoothScrollProvider } from './components/SmoothScrollProvider'
import { DiscoveryProvider } from './context/DiscoveryProvider'
import { useDiscovery } from './context/useDiscovery'
import { HomePage } from './pages/HomePage'

// Lazy load non-landing stages for optimal initial bundle payload (Phase C6)
const DiscoveryPage = lazy(() =>
  import('./pages/DiscoveryPage').then((m) => ({ default: m.DiscoveryPage }))
)
const ResultsPage = lazy(() =>
  import('./pages/ResultsPage').then((m) => ({ default: m.ResultsPage }))
)
const ProjectDetailPage = lazy(() =>
  import('./pages/ProjectDetailPage').then((m) => ({ default: m.ProjectDetailPage }))
)
const BlueprintPage = lazy(() =>
  import('./pages/BlueprintPage').then((m) => ({ default: m.BlueprintPage }))
)
const ProjectReviewPage = lazy(() =>
  import('./pages/ProjectReviewPage').then((m) => ({ default: m.ProjectReviewPage }))
)
const ProjectImprovePage = lazy(() =>
  import('./pages/ProjectImprovePage').then((m) => ({ default: m.ProjectImprovePage }))
)
const MentorPage = lazy(() =>
  import('./pages/MentorPage').then((m) => ({ default: m.MentorPage }))
)

const PageFallback: React.FC = () => (
  <div className="min-h-screen bg-[#F7F6F2] flex items-center justify-center">
    <div className="flex items-center gap-3 font-mono text-xs text-[#767571] uppercase tracking-wider">
      <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-pulse" />
      <span>LOADING WORKSPACE</span>
    </div>
  </div>
)

const AppContent: React.FC = () => {
  const { currentRoute } = useDiscovery()

  if (currentRoute === 'discovery') {
    return (
      <Suspense fallback={<PageFallback />}>
        <DiscoveryPage />
      </Suspense>
    )
  }

  if (currentRoute === 'results') {
    return (
      <Suspense fallback={<PageFallback />}>
        <ResultsPage />
      </Suspense>
    )
  }

  if (currentRoute === 'project-detail') {
    return (
      <Suspense fallback={<PageFallback />}>
        <ProjectDetailPage />
      </Suspense>
    )
  }

  if (currentRoute === 'blueprint') {
    return (
      <Suspense fallback={<PageFallback />}>
        <BlueprintPage />
      </Suspense>
    )
  }

  if (currentRoute === 'review') {
    return (
      <Suspense fallback={<PageFallback />}>
        <ProjectReviewPage />
      </Suspense>
    )
  }

  if (currentRoute === 'improve') {
    return (
      <Suspense fallback={<PageFallback />}>
        <ProjectImprovePage />
      </Suspense>
    )
  }

  if (currentRoute === 'mentor') {
    return (
      <Suspense fallback={<PageFallback />}>
        <MentorPage />
      </Suspense>
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
