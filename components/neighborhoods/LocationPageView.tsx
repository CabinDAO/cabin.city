import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useBackend } from '@/components/hooks/useBackend'
import { LocationGetResponse } from '@/utils/types/location'
import { useProfile } from '@/components/auth/useProfile'
import { LocationView } from '@/components/neighborhoods/LocationView'
import { BaseLayout } from '@/components/core/BaseLayout'

export const LocationPageView = () => {
  const router = useRouter()
  const { id } = router.query
  const { user } = useProfile()
  const { useGet } = useBackend()
  const { data } = useGet<LocationGetResponse>(
    id ? ['LOCATION', { externId: `${id}` }] : null,
    { activeEventsOnly: 'true' }
  )

  const location = !data || 'error' in data ? null : data?.location

  useEffect(() => {
    if (data && !location) {
      router.push('/404').then()
    }
  }, [data, location, router, user])

  if (!location) {
    return null
  }

  return (
    <BaseLayout>
      <LocationView location={location} />
    </BaseLayout>
  )
}
