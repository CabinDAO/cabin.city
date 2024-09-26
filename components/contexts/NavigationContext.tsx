import { createContext, ReactNode, useEffect, useState } from 'react'
import { useRouter } from '@/components/hooks/useRouter'

type noHistoryAction = 'goHomeIfNoHistory' | null

interface NavigationState {
  history: string[]
  goBack: (defaultAction?: noHistoryAction) => void
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

  const goBack = (defaultAction?: noHistoryAction) => {
    if (history.length > 0) {
      const lastPath = history[history.length - 2]
      const updatedHistory = [...history]
      updatedHistory.pop()

      router.pushRaw(lastPath).then()

      setHistory(updatedHistory)
    } else if (defaultAction === 'goHomeIfNoHistory') {
      router.push('home').then()
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
