import { useEffect, DependencyList } from 'react'

export function useEffectAsync(effect: () => void, deps?: DependencyList) {
  useEffect(() => {
    effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
