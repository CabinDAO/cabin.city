import React from 'react'
import { useRouter } from '@/components/hooks/useRouter'
import { useUser } from '@/components/auth/useUser'
import { useBackend } from '@/components/hooks/useBackend'
import { LocationGetResponse } from '@/utils/types/location'
import { canEditLocation } from '@/lib/permissions'
import styled from 'styled-components'
import { TitleCard } from '@/components/core/TitleCard'
import { ContentCard } from '@/components/core/ContentCard'
import { BaseLayout } from '@/components/core/BaseLayout'
import { LocationEditForm } from '@/components/neighborhoods/LocationEditForm'
import { expandRoute } from '@/utils/routing'

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
    locationId
      ? ['api_location_externId', { externId: locationId as string }]
      : null
  )
  const location = !data || 'error' in data ? null : data.location

  const { user } = useUser({ redirectTo: 'home' })

  if (isLoading || !location || !canEditLocation(user, location)) {
    return null
  }

  return (
    <BaseLayout>
      <TitleCard
        title={`Edit Neighborhood`}
        icon="close"
        iconHref={expandRoute(['n_id', { id: location.externId }])}
      />
      <Contents shape="notch">
        <LocationEditForm
          location={location}
          afterSave={() => {
            refetchLocation().then(() => {
              router.push(['n_id', { id: location.externId }]).then()
            })
          }}
          afterCancel={() => {
            router.push(['n_id', { id: location.externId }]).then()
          }}
          afterDelete={() => {
            router.push(`cityDirectory`).then()
          }}
        />
      </Contents>
    </BaseLayout>
  )
}

const Contents = styled(ContentCard)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  gap: 1.6rem;
`
