import { SingleColumnLayout } from '../layouts/SingleColumnLayout'
import { TitleCard } from '../core/TitleCard'
import { useUser } from '../auth/useUser'
import { CitizenshipStatus } from '@/generated/graphql'
import { NewListingButton } from './NewListingButton'
import { MyLocations } from './MyLocations'
import { useFeatures } from '../hooks/useFeatures'
import { Feature } from '@/lib/features'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export const MyLocationsView = () => {
  const { user, isUserLoading } = useUser()
  const router = useRouter()
  const { hasFeature } = useFeatures()
  const hasCityFeature = hasFeature(Feature.City)

  useEffect(() => {
    if (!isUserLoading && !hasCityFeature) {
      router.push('/dashboard')
    }
  }, [router, hasCityFeature, isUserLoading])

  if (!hasCityFeature) {
    return null
  }

  return (
    <SingleColumnLayout>
      <TitleCard
        icon="draft-proposal"
        title="My Locations"
        end={
          user?.citizenshipStatus === CitizenshipStatus.Verified ||
          hasCityFeature ? (
            <NewListingButton />
          ) : null
        }
      />
      <MyLocations />
    </SingleColumnLayout>
  )
}
