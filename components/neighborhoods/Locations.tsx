import { useBackend } from '@/components/hooks/useBackend'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  LocationType,
  LocationFragment,
  LocationListParamsType,
  LocationListResponse,
} from '@/utils/types/location'
import { ListingCard } from '@/components/core/ListingCard'
import { LocationListContainer } from './styles'

export const Locations = ({ type }: { type: LocationType | undefined }) => {
  const { useGetPaginated } = useBackend()

  const { data, page, setPage, isLastPage } =
    useGetPaginated<LocationListResponse>('LOCATION_LIST', {
      activeEventsOnly: 'true',
      locationType: type,
    } satisfies LocationListParamsType)

  const locations = data
    ? data.reduce(
        (acc: LocationFragment[], val) =>
          'error' in val ? acc : [...acc, ...val.locations],
        []
      )
    : []

  return (
    <LocationListContainer>
      <InfiniteScroll
        hasMore={!isLastPage}
        dataLength={locations.length}
        next={async () => {
          await setPage(page + 1)
        }}
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
  )
}
