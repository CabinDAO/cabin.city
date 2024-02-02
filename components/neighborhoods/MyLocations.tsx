import Link from 'next/link'
import { useBackend } from '@/components/hooks/useBackend'
import { useLocationVote } from '../hooks/useLocationVote'
import { useLocationActions } from '../hooks/useLocationActions'
import { LocationMineResponse } from '@/utils/types/location'
import styled from 'styled-components'
import { LocationCard } from '../core/LocationCard'
import { EmptyState } from '../core/EmptyState'
import { Button } from '../core/Button'

export const MyLocations = () => {
  const { voteForLocation } = useLocationVote()
  const { editLocation, deleteLocation } = useLocationActions()

  const { useGet } = useBackend()
  const { data: locationData } = useGet<LocationMineResponse>('LOCATION_MINE')

  const locations = locationData?.locations ?? []

  if (!locations.length) {
    return (
      <LocationListContainer>
        <EmptyState
          icon="file-document"
          title="No listings yet"
          description="Once created, your locations can be managed from here"
          customCta={GetStartedButton}
        />
      </LocationListContainer>
    )
  }

  return (
    <LocationListContainer>
      {locations.map((location) => {
        return (
          <LocationCard
            key={location.externId}
            location={location}
            onVote={() => voteForLocation(location)}
            editMode
            onDelete={() => deleteLocation(location.externId)}
            onEdit={() => editLocation(location.externId)}
          />
        )
      })}
    </LocationListContainer>
  )
}

const GetStartedButton = () => (
  <Link href="/location/new">
    <Button variant="secondary">Get Started</Button>
  </Link>
)

export const LocationListContainer = styled.div`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`
