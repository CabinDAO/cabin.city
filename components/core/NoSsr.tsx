import { useEffect, useState, ReactNode, FC } from 'react'

interface NoSsrProps {
  children: ReactNode
}

export const NoSsr: FC<NoSsrProps> = ({ children }) => {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    if (!isClient) {
      setIsClient(true)
    }
  }, [isClient, setIsClient])

  if (!isClient) return null

  return <>{children}</>
}
