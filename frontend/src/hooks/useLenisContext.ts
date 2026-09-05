import { useContext } from 'react'
import { SmoothScrollContext } from '../components/SmoothScrollContext'

export function useLenisContext() {
  const context = useContext(SmoothScrollContext)
  if (!context) {
    throw new Error('useLenisContext must be used within a SmoothScrollProvider')
  }
  return context
}
