import Link from 'next/link'
import {
  LocationType,
  useGetLocationsByLocationTypeQuery,
} from '@/generated/graphql'
import { LocationCard } from '../core/LocationCard'
import { locationCardPropsFromFragment } from '@/lib/location'
import styled from 'styled-components'
import { useLocationVote } from '../hooks/useLocationVote'
import { isNotNull } from '@/lib/data'
import { Button } from '@/components/core/Button'

export const NeighborhoodsTop3List = () => {
  const { voteForLocation } = useLocationVote()
  const { data } = useGetLocationsByLocationTypeQuery({
    variables: { locationType: LocationType.Neighborhood, size: 3 },
  })
  const locations = data?.locationsByLocationType
    ? data.locationsByLocationType.data.filter(isNotNull)
    : []

  return (
    <NeighborhoodsTop3ListContainer>
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
          />
        )
      })}
      <Link href="/city-directory/neighborhoods">
        <Button variant="secondary" isFullWidth>
          See all Neighborhoods
        </Button>
      </Link>
    </NeighborhoodsTop3ListContainer>
  )
}

const NeighborhoodsTop3ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  width: 100%;
`
