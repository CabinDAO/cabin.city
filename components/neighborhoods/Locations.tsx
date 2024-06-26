import { useState } from 'react'
import { useBackend } from '@/components/hooks/useBackend'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  LocationType,
  LocationFragment,
  LocationListParamsType,
  LocationListResponse,
} from '@/utils/types/location'
import styled from 'styled-components'
import { ListingCard } from '@/components/core/ListingCard'
import { Map, onMoveParams } from '@/components/neighborhoods/Map'

export const Locations = ({ type }: { type: LocationType | undefined }) => {
  const { useGetPaginated } = useBackend()

  const [latLngBounds, setLatLngBounds] = useState<
    onMoveParams['bounds'] | undefined
  >(undefined)

  const { data, next, hasMore } = useGetPaginated<LocationListResponse>(
    'LOCATION_LIST',
    {
      countActiveEventsOnly: 'true',
      locationType: type,
      latLngBounds: latLngBounds
        ? `${latLngBounds.north},${latLngBounds.south},${latLngBounds.east},${latLngBounds.west}`
        : undefined,
    } satisfies LocationListParamsType,
    { pageSize: 100 }
  )

  const locations = data
    ? data.reduce(
        (acc: LocationFragment[], val) =>
          'error' in val ? acc : [...acc, ...val.locations],
        []
      )
    : []

  return (
    <>
      <LocationListContainer>
        <Map
          height="40rem"
          locations={locations
            .filter((l) => l.address)
            .map((l) => {
              return {
                label: l.name,
                lat: l.address?.lat || 0,
                lng: l.address?.lng || 0,
              }
            })}
          onMove={(params) => {
            setLatLngBounds(params.bounds)
          }}
        />
        <InfiniteScroll
          hasMore={hasMore}
          dataLength={locations.length}
          next={next}
          loader="..."
        >
          {locations.map((location, index) => {
            return (
              <ListingCard
                position={index + 1}
                key={location.externId}
                location={location}
              />
            )
          })}
        </InfiniteScroll>
      </LocationListContainer>
    </>
  )
}

const LocationListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  border: 1px solid ${({ theme }) => theme.colors.green900};
  background-color: ${({ theme }) => theme.colors.yellow200};
  padding: 2.4rem;

  .infinite-scroll-component {
    display: grid;
    grid-template-columns: 1fr;
    flex-direction: column;
    grid-gap: 1.6rem;
    width: 100%;

    ${({ theme }) => theme.bp.md} {
      grid-template-columns: 1fr 1fr;
      row-gap: 3.7rem;
    }
  }
`
