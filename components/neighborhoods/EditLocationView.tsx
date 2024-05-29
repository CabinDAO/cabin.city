import React from 'react'
import { useRouter } from 'next/router'
import { useProfile } from '@/components/auth/useProfile'
import { useBackend } from '@/components/hooks/useBackend'
import { LocationGetResponse } from '@/utils/types/location'
import { canEditLocation } from '@/lib/permissions'
import styled from 'styled-components'
import { TitleCard } from '@/components/core/TitleCard'
import { ContentCard } from '@/components/core/ContentCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { LocationEditForm } from '@/components/neighborhoods/LocationEditForm'

export default EditLocationView

function EditLocationView() {
  const router = useRouter()
  const { id: locationId } = router.query

  const { useGet } = useBackend()
  const {
    data,
    isLoading,
    mutate: refetchLocation,
  } = useGet<LocationGetResponse>(
    locationId ? ['LOCATION', { externId: locationId as string }] : null
  )
  const location = !data || 'error' in data ? null : data.location

  const { user } = useProfile({ redirectTo: '/' })

  if (isLoading || !location || !canEditLocation(user, location)) {
    return null
  }

  return (
    <BaseLayout>
      <TitleCard
        title={`Edit Neighborhood`}
        icon="close"
        iconHref={`/location/${location.externId}`}
      />
      <Contents shape="notch">
        <LocationEditForm
          location={location}
          afterSave={() => {
            // todo: i dont think refetching is needed but somehow the data doesn't update after save
            // todo: maybe the cache keys don't exactly match?
            // refetchLocation().then(() => {
            router.push(`/location/${location.externId}`).then()
            // })
          }}
          afterCancel={() => {
            router.push(`/location/${location.externId}`).then()
          }}
          afterDelete={() => {
            router.push(`/city-directory`).then()
          }}
        />
      </Contents>
    </BaseLayout>
  )
}

const Contents = styled(ContentCard)`
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 1.6rem;
  // margin-bottom: 4.8rem;
`
