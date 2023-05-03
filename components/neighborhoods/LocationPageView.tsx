import { useRouter } from 'next/router'
import { useGetLocationByIdQuery } from '@/generated/graphql'
import { locationViewPropsFromFragment } from '@/lib/location'
import { LocationView } from '@/components/neighborhoods/LocationView'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { useEffect } from 'react'
import { useUser } from '@/components/auth/useUser'
import { useLocationVote } from '../hooks/useLocationVote'
import { ActionBar } from '../core/ActionBar'
import { useModal } from '../hooks/useModal'
import { PublishModal } from './edit-location/PublishModal'

export const LocationPageView = () => {
  const router = useRouter()
  const { id } = router.query
  const { user } = useUser({ redirectTo: '/login' })
  const { voteForLocation } = useLocationVote()
  const { showModal } = useModal()
  const { data } = useGetLocationByIdQuery({
    variables: {
      id: `${id}`,
    },
    skip: !id || !user,
  })
  const location = data?.findLocationByID
    ? locationViewPropsFromFragment(data?.findLocationByID)
    : null

  useEffect(() => {
    if (data && !location) {
      router.push('/404')
    }
  }, [data, location, router])

  if (!location || !user) {
    return null
  }

  const backRoute = `/location/${location._id}/edit?step=3`

  const handleVote = () => {
    voteForLocation({
      location,
    })
  }

  const previewMode =
    user._id === location.caretaker._id && !location.publishedAt

  const handlePublish = async () => {
    showModal(() => <PublishModal locationId={location._id} />)
  }

  return (
    <SingleColumnLayout
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
