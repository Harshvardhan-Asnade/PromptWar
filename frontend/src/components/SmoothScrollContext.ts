import { createContext } from 'react'
import type Lenis from 'lenis'

export interface SmoothScrollContextType {
  lenis: React.RefObject<Lenis | null>
  scrollTo: (
    target: string | HTMLElement | number,
    options?: { offset?: number; duration?: number }
  ) => void
}

export const SmoothScrollContext = createContext<SmoothScrollContextType | null>(null)
