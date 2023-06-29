import styled from 'styled-components'
import { LocationItemFragment } from '@/generated/graphql'
import { useLocationVote } from '../hooks/useLocationVote'
import { LocationCard } from '../core/LocationCard'
import { locationCardPropsFromFragment } from '@/lib/location'
import { EmptyState } from '../core/EmptyState'
import { Button } from '../core/Button'
import Link from 'next/link'
import { useProfile } from '../auth/useProfile'
import { useLocationActions } from '../hooks/useLocationActions'

export const MyLocations = () => {
  const { user } = useProfile()
  const { voteForLocation } = useLocationVote()

  const { editLocation, deleteLocation } = useLocationActions()

  const locations =
    user?.locations?.data?.filter((l): l is LocationItemFragment => !!l) ?? []

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
        const locationCardProps = locationCardPropsFromFragment(location)
        return (
          <LocationCard
            key={location._id}
            {...locationCardProps}
            onVote={() =>
              voteForLocation({
                location,
              })
            }
            editMode
            onDelete={() => deleteLocation(location._id)}
            onEdit={() => editLocation(location._id)}
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
