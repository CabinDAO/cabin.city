import { useRouter } from 'next/router'
import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { useGetLocationByIdQuery } from '@/generated/graphql'
import { locationViewPropsFromFragment } from '@/lib/location'
import { LocationPhotosView } from '@/components/neighborhoods/LocationPhotosView'
import { useEffect } from 'react'

export const LocationPhotosPageView = () => {
  const router = useRouter()
  const { id, gallery } = router.query
  const { data } = useGetLocationByIdQuery({
    variables: {
      id: `${id}`,
    },
    skip: !id,
  })
  const location = data?.findLocationByID
    ? locationViewPropsFromFragment(data.findLocationByID)
    : null

  useEffect(() => {
    if (data && !location) {
      router.push('/404')
    }
  }, [data, location, router])

  if (!location) {
    return null
  }

  return (
    <SingleColumnLayout>
      <LocationPhotosView location={location} gallery={gallery} />
    </SingleColumnLayout>
  )
}
