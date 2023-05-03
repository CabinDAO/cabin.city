import { useRouter } from 'next/router'
import { useGetLocationByIdQuery } from '@/generated/graphql'
import { locationViewPropsFromFragment } from '@/lib/location'
import { LocationView } from '@/components/neighborhoods/LocationView'
import { SingleColumnLayout } from '@/components/layouts/SingleColumnLayout'
import { useEffect } from 'react'
import { useUser } from '@/components/auth/useUser'
import { useLocationVote } from '../hooks/useLocationVote'

export const LocationPageView = () => {
  const router = useRouter()
  const { id } = router.query
  const { user } = useUser({ redirectTo: '/login' })
  const { voteForLocation } = useLocationVote()
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

  const handleVote = () => {
    voteForLocation({
      location,
    })
  }

  return (
    <SingleColumnLayout>
      <LocationView location={location} onVote={handleVote} />
    </SingleColumnLayout>
  )
}
