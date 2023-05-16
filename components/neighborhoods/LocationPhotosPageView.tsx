import { useRouter } from 'next/router'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { useGetLocationByIdQuery } from '@/generated/graphql'
import { locationViewPropsFromFragment } from '@/lib/location'
import { LocationPhotosView } from '@/components/neighborhoods/LocationPhotosView'
import { useEffect } from 'react'
import { useUser } from '../auth/useUser'

export const LocationPhotosPageView = () => {
  const router = useRouter()
  const { id, gallery } = router.query
  const { user } = useUser({ redirectTo: '/' })
  const { data } = useGetLocationByIdQuery({
    variables: {
      id: `${id}`,
    },
    skip: !id || !user,
  })
  const location = data?.findLocationByID
    ? locationViewPropsFromFragment(data.findLocationByID)
    : null

  useEffect(() => {
    if (data && !location) {
      router.push('/404')
    }
  }, [data, location, router])

  if (!location || !user) {
    return null
  }

  return (
    <SingleColumnLayout>
      <LocationPhotosView location={location} gallery={gallery} />
    </SingleColumnLayout>
  )
}
