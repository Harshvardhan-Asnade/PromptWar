import { useContext } from 'react'
import { DiscoveryContext } from './DiscoveryContextDefinition'
export type { AppRoute, DiscoveryContextType } from './DiscoveryContextDefinition'

export function useDiscovery() {
  const context = useContext(DiscoveryContext)
  if (!context) {
    throw new Error('useDiscovery must be used within a DiscoveryProvider')
  }
  return context
}
