import { useBackend } from '@/components/hooks/useBackend'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  LocationFragment,
  LocationListParams,
  LocationListResponse,
} from '@/utils/types/location'
import { useLocationVote } from '../hooks/useLocationVote'
import { ListingCard } from '../core/ListingCard'
import { LocationListContainer } from './styles'

export const LocationsByVoteCount = () => {
  const { useGetPaginated } = useBackend()

  const {
    data,
    page,
    setPage,
    isLastPage,
    mutate: refetchLocations,
  } = useGetPaginated<LocationListResponse>('LOCATION_LIST', {
    sort: 'votesDesc',
  } as LocationListParams)

  const locations = data
    ? data.reduce(
        (acc: LocationFragment[], val) =>
          'error' in val ? acc : [...acc, ...val.locations],
        []
      )
    : []

  const [isRefetchNeeded, setIsRefetchNeeded] = useState(false)
  const { voteForLocation } = useLocationVote(() => {
    setIsRefetchNeeded(true)
  })
  useEffect(() => {
    if (isRefetchNeeded) {
      refetchLocations()
    }
  }, [isRefetchNeeded, refetchLocations])

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
              onVote={() => voteForLocation(location)}
            />
          )
        })}
      </InfiniteScroll>
    </LocationListContainer>
  )
}
