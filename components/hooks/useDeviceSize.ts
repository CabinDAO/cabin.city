import { queries } from '@/styles/theme'
import { useEffect, useState } from 'react'
import { useMedia } from 'react-use'

export type DeviceSize = 'mobile' | 'tablet' | 'desktop'

export const useDeviceSize = () => {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>('mobile')
  const tablet = useMedia(queries.md, true)
  const desktop = useMedia(queries.lg, true)

  useEffect(() => {
    if (desktop) {
      setDeviceSize('desktop')
    } else if (tablet) {
      setDeviceSize('tablet')
    } else {
      setDeviceSize('mobile')
    }
  }, [desktop, tablet])

  return { deviceSize }
}
