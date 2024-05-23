import Link from 'next/link'
import { useBackend } from '@/components/hooks/useBackend'
import {
  LocationListParamsType,
  LocationListResponse,
  LocationType,
} from '@/utils/types/location'
import styled from 'styled-components'
import { Button } from '@/components/core/Button'
import { ListingCard } from '../core/ListingCard'
import events from '@/lib/googleAnalytics/events'

export const NeighborhoodsTop6List = () => {
  const { useGet } = useBackend()
  const { data } = useGet<LocationListResponse>('LOCATION_LIST', {
    locationType: LocationType.Neighborhood,
  } as LocationListParamsType)

  if (!data || 'error' in data) {
    return null
  }

  const locations = data.locations.slice(0, 6)

  return (
    <OuterContainer>
      <NeighborhoodsTop6ListContainer>
        {locations.map((location, index) => {
          return (
            <ListingCard
              variant="home"
              key={location.externId}
              position={index + 1}
              location={location}
            />
          )
        })}
      </NeighborhoodsTop6ListContainer>
      <Link
        onClick={() => events.viewCityDirectoryEvent()}
        href="/city-directory"
      >
        <Button variant="secondary" isFullWidth>
          See all locations
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
