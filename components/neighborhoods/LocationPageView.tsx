import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useBackend } from '@/components/hooks/useBackend'
import { LocationGetResponse } from '@/utils/types/location'
import { useProfile } from '@/components/auth/useProfile'
import { useLocationVote } from '../hooks/useLocationVote'
import { LocationView } from '@/components/neighborhoods/LocationView'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { ActionBar } from '../core/ActionBar'
import { useModal } from '../hooks/useModal'
import { PublishLocationModal } from './edit-location/PublishLocationModal'

export const LocationPageView = () => {
  const router = useRouter()
  const { id } = router.query
  const { user } = useProfile()
  const { showModal } = useModal()
  const { useGet } = useBackend()
  const { data, mutate: refetchLocation } = useGet<LocationGetResponse>(
    id ? ['LOCATION', { externId: `${id}` }] : null
  )
  const { voteForLocation } = useLocationVote(refetchLocation)

  const location = data?.location

  const hideFromOthersIfPreview =
    location &&
    !location.publishedAt &&
    user?.externId !== location?.caretaker.externId &&
    !user?.isAdmin

  useEffect(() => {
    if (data && !location) {
      router.push('/404').then()
    } else if (user && hideFromOthersIfPreview) {
      router.push('/city-directory').then()
    }
  }, [data, location, router, hideFromOthersIfPreview, user])

  if (!location || hideFromOthersIfPreview) {
    return null
  }

  const previewMode =
    !location.publishedAt &&
    (user?.externId === location.caretaker.externId || user?.isAdmin)

  const backRoute = `/location/${location.externId}/edit`

  const handleVote = () => {
    voteForLocation(location)
  }

  const handlePublish = async () => {
    showModal(() => (
      <PublishLocationModal
        locationId={location.externId}
        refetchLocation={refetchLocation}
      />
    ))
  }

  return (
    <SingleColumnLayout
      withFooter
      actionBar={
        previewMode ? (
          <ActionBar
            primaryButton={{
              label: 'Publish',
              onClick: handlePublish,
            }}
            secondaryButton={{
              label: 'Back',
              onClick: () => router.push(backRoute),
            }}
          />
        ) : null
      }
    >
      <LocationView location={location} onVote={handleVote} />
    </SingleColumnLayout>
  )
}
