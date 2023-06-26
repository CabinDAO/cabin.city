import { queries } from '@/styles/theme'
import { useEffect, useState } from 'react'
import { useMedia } from 'react-use'

export type DeviceSize = 'mobile' | 'tablet' | 'desktop'

export const useDeviceSize = () => {
  const [deviceSize, setDeviceSize] = useState<DeviceSize>('mobile')
  const tablet = useMedia(queries.md, true)
  const desktop = useMedia(queries.lg, true)
  const mobile = useMedia(queries.sm, true)

  useEffect(() => {
    if (desktop) {
      setDeviceSize('desktop')
    } else if (tablet) {
      setDeviceSize('tablet')
    } else if (mobile) {
      setDeviceSize('mobile')
    }
  }, [desktop, tablet, mobile])

  return { deviceSize }
}
