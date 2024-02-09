import { useBackend } from '@/components/hooks/useBackend'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PAGE_SIZE } from '@/utils/api/backend'
import {
  LocationFragment,
  LocationListParams,
  LocationListResponse,
} from '@/utils/types/location'
import { useLocationVote } from '../hooks/useLocationVote'
import { ListingCard } from '../core/ListingCard'
import { LocationListContainer } from './styles'

export const LocationsByVoteCount = () => {
  const { useGet } = useBackend()

  const [locations, setLocations] = useState<LocationFragment[]>([])
  const [page, setPage] = useState(1)

  const { data, mutate: refetchLocations } = useGet<LocationListResponse>(
    'LOCATION_LIST',
    {
      sort: 'votesDesc',
      page: page,
    } as LocationListParams
  )

  useEffect(() => {
    if (data) {
      if (page === 1) {
        // Reset locations if first page
        setLocations(data.locations ?? [])
      } else if (data.locations) {
        // Append locations if not first page
        setLocations([...locations, ...data.locations])
      }
    }
  }, [data, page])

  const hasMore =
    data && data.count ? data.count > PAGE_SIZE * (page + 1) : false
  const dataLength = locations?.length ?? 0

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
        hasMore={hasMore}
        dataLength={dataLength}
        next={() => {
          setPage(page + 1)
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
