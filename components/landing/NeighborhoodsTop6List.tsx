import Link from 'next/link'
import { useGetNeighborhoodsTop6Query } from '@/generated/graphql'

import { locationCardPropsFromFragment } from '@/lib/location'
import styled from 'styled-components'
import { useLocationVote } from '../hooks/useLocationVote'
import { isNotNull } from '@/lib/data'
import { Button } from '@/components/core/Button'
import { ListingCard } from '../core/ListingCard'
import events from '@/lib/googleAnalytics/events'

export const NeighborhoodsTop6List = () => {
  const { voteForLocation } = useLocationVote()
  const { data } = useGetNeighborhoodsTop6Query()
  const locations = data?.locationsByLocationType
    ? data.locationsByLocationType.data.filter(isNotNull)
    : []

  return (
    <OuterContainer>
      <NeighborhoodsTop6ListContainer>
        {locations.map((location, index) => {
          const locationCardProps = locationCardPropsFromFragment(location)
          return (
            <ListingCard
              prefetch={false}
              key={location._id}
              position={index + 1}
              {...locationCardProps}
              onVote={() =>
                voteForLocation({
                  location,
                })
              }
            />
          )
        })}
      </NeighborhoodsTop6ListContainer>
      <Link
        onClick={() => events.viewCityDirectoryEvent()}
        href="/city-directory"
      >
        <Button variant="secondary" isFullWidth>
          View the City Directory
        </Button>
      </Link>
    </OuterContainer>
  )
}

const OuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  gap: 1.6rem;
  height: 100%;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    gap: 4rem;
  }
`

const NeighborhoodsTop6ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  flex-direction: column;
  grid-gap: 1.6rem;
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    grid-template-columns: 1fr 1fr;
    row-gap: 3.7rem;
  }
`
