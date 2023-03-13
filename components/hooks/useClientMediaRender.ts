import { queries } from '@/styles/theme'
import { useEffect, useState } from 'react'
import { useMedia } from 'react-use'

export const useClientMediaRender = () => {
  const [isMobile, setIsMobile] = useState(false)
  const desktop = useMedia(queries.lg)

  useEffect(() => {
    setIsMobile(!desktop)
  }, [desktop])

  return { isMobile }
}
