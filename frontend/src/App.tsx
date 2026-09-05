import React from 'react'
import { SmoothScrollProvider } from './components/SmoothScrollProvider'
import { HomePage } from './pages/HomePage'

export const App: React.FC = () => {
  return (
    <SmoothScrollProvider>
      <HomePage />
    </SmoothScrollProvider>
  )
}

export default App
