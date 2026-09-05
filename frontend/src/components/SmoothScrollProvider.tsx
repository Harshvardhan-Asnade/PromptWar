import React, { createContext, useContext } from 'react'
import type Lenis from 'lenis'
import { useSmoothScroll } from '../hooks/useSmoothScroll'

interface SmoothScrollContextType {
  lenis: React.RefObject<Lenis | null>
  scrollTo: (target: string | HTMLElement | number, options?: { offset?: number; duration?: number }) => void
}

const SmoothScrollContext = createContext<SmoothScrollContextType | null>(null)

export const SmoothScrollProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const lenisRef = useSmoothScroll()

  const scrollTo = (
    target: string | HTMLElement | number,
    options?: { offset?: number; duration?: number }
  ) => {
    lenisRef.current?.scrollTo(target, options)
  }

  return (
    <SmoothScrollContext.Provider value={{ lenis: lenisRef, scrollTo }}>
      {children}
    </SmoothScrollContext.Provider>
  )
}

export function useLenisContext() {
  const context = useContext(SmoothScrollContext)
  if (!context) {
    throw new Error('useLenisContext must be used within a SmoothScrollProvider')
  }
  return context
}
