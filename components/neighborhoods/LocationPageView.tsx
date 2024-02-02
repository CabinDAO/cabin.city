import { useRouter } from 'next/router'
import { LocationView } from '@/components/neighborhoods/LocationView'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { useEffect } from 'react'
import { useProfile } from '@/components/auth/useProfile'
import { useLocationVote } from '../hooks/useLocationVote'
import { ActionBar } from '../core/ActionBar'
import { useModal } from '../hooks/useModal'
import { PublishModal } from './edit-location/PublishModal'
import { useBackend } from '@/components/hooks/useBackend'
import { LocationGetResponse } from '@/utils/types/location'

export const LocationPageView = () => {
  const router = useRouter()
  const { id } = router.query
  const { user } = useProfile()
  const { voteForLocation } = useLocationVote()
  const { showModal } = useModal()
  const { useGet } = useBackend()
  const { data } = useGet<LocationGetResponse>(
    id ? ['LOCATION', { externId: `${id}` }] : null
  )

  const location = data?.location

  const hideFromOthersIfPreview =
    location &&
    !location.publishedAt &&
    user?.externId !== location?.caretaker.externId &&
    !user?.isAdmin

  useEffect(() => {
    if (data && !location) {
      router.push('/404')
    } else if (user && hideFromOthersIfPreview) {
      router.push('/city-directory')
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
    showModal(() => <PublishModal locationId={location.externId} />)
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
