import Link from 'next/link'
import { ChangeEvent, useState } from 'react'
import { useDebounce } from 'use-debounce'
import { useBackend } from '@/components/hooks/useBackend'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  LocationType,
  LocationFragment,
  LocationListParamsType,
  LocationListResponse,
} from '@/utils/types/location'
import styled from 'styled-components'
import { InputText } from '@/components/core/InputText'
import { NeighborhoodCard } from '@/components/core/NeighborhoodCard'
import { Map, onMoveParams } from '@/components/map/Map'
import { expandRoute } from '@/utils/routing'
import Icon from '@/components/core/Icon'

export const NeighborhoodList = ({ type }: { type?: LocationType }) => {
  const { useGetPaginated } = useBackend()
  const [searchInput, setSearchInput] = useState<string>('')
  const [searchValue] = useDebounce(searchInput, 500)

  const [latLngBounds, setLatLngBounds] = useState<
    onMoveParams['bounds'] | undefined
  >(undefined)

  const { data, next, rewind, hasMore } = useGetPaginated<LocationListResponse>(
    'api_location_list',
    {
      searchQuery: searchValue,
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

  const handleSearchInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value)
    await rewind()
  }

  return (
    <>
      <LocationListContainer>
        <Map
          height="40rem"
          locations={locations
            .filter((l) => l.address)
            .map((l) => {
              return {
                // label: l.name,
                lat: l.address?.lat || 0,
                lng: l.address?.lng || 0,
              }
            })}
          onMove={(params) => {
            setLatLngBounds(params.bounds)
          }}
        />
        <SearchContainer>
          <InputText
            value={searchInput}
            placeholder="Search by name or location"
            onChange={handleSearchInputChange}
            endAdornment={<Icon name="search" size={1.4} />}
          />
        </SearchContainer>

        <InfiniteScroll
          hasMore={hasMore}
          dataLength={locations.length}
          next={next}
          loader="..."
        >
          {locations.map((location) => {
            return (
              <NeighborhoodCard key={location.externId} location={location} />
            )
          })}
          <Link href={expandRoute('n_new')}>
            <NewLocationButton>
              <Plus>+</Plus>
              List your neighborhood
            </NewLocationButton>
          </Link>
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

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  align-items: center;
  justify-content: flex-start;
  width: 100%;

  button {
    width: 100%;
  }

  ${({ theme }) => theme.bp.md} {
    flex-direction: row;

    button {
      width: auto;
    }
  }
`

const NewLocationButton = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  min-height: 30rem;
  gap: 2.4rem;
  padding: 2.4rem;
  justify-content: center;
  align-items: center;
  text-align: center;

  //https://kovart.github.io/dashed-border-generator/
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' stroke='%23333' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  opacity: 0.35;
  font-size: 3rem;
`

const Plus = styled.div`
  font-size: 5rem;
`
