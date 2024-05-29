import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useBackend } from '@/components/hooks/useBackend'
import { LocationGetResponse } from '@/utils/types/location'
import { LocationPhotosView } from '@/components/neighborhoods/LocationPhotosView'
import { BaseLayout } from '@/components/core/BaseLayout'

export const LocationPhotosPageView = () => {
  const router = useRouter()
  const { id } = router.query

  const { useGet } = useBackend()
  const { data } = useGet<LocationGetResponse>(
    id ? ['LOCATION', { externId: `${id}` }] : null
  )

  const location = data && !('error' in data) ? data.location : null

  useEffect(() => {
    if (data && !location) {
      router.push('/404')
    }
  }, [data, location, router])

  if (!location) {
    return null
  }

  return (
    <BaseLayout>
      <LocationPhotosView location={location} />
    </BaseLayout>
  )
}
