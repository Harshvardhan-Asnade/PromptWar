import React from 'react'
import { SmoothScrollProvider } from './components/SmoothScrollProvider'
import { DiscoveryProvider, useDiscovery } from './context/DiscoveryContext'
import { HomePage } from './pages/HomePage'
import { DiscoveryPage } from './pages/DiscoveryPage'
import { ResultsPage } from './pages/ResultsPage'
import { ProjectDetailPage } from './pages/ProjectDetailPage'
import { BlueprintPage } from './pages/BlueprintPage'
import { ProjectReviewPage } from './pages/ProjectReviewPage'
import { ProjectImprovePage } from './pages/ProjectImprovePage'
import { MentorPage } from './pages/MentorPage'

const AppContent: React.FC = () => {
  const { currentRoute } = useDiscovery()

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
    return <ProjectImprovePage />
  }

  if (currentRoute === 'mentor') {
    return <MentorPage />
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
