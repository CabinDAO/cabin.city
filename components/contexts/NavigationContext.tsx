import { createContext, ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

interface NavigationState {
  history: string[]
  goBack: () => void
}

interface NavigationProviderProps {
  children: ReactNode
}

export const NavigationContext = createContext<NavigationState | null>(null)

export const NavigationProvider = ({ children }: NavigationProviderProps) => {
  const [history, setHistory] = useState<string[]>([])
  const router = useRouter()

  useEffect(() => {
    const { asPath } = router
    const updatedHistory = [...history, asPath]
    setHistory(updatedHistory.slice(-5))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  const goBack = () => {
    if (history.length > 0) {
      const lastPath = history[history.length - 2]
      const updatedHistory = [...history]
      updatedHistory.pop()

      router.push(lastPath)

      setHistory(updatedHistory)
    }
  }

  const navigationContextValue = {
    history,
    goBack,
  }

  return (
    <NavigationContext.Provider value={navigationContextValue}>
      {children}
    </NavigationContext.Provider>
  )
}
