import React from 'react'
import { useSmoothScroll } from '../hooks/useSmoothScroll'
import { SmoothScrollContext } from './SmoothScrollContext'

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
