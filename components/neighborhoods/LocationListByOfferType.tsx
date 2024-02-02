import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocationVote } from '../hooks/useLocationVote'
import { useEffect, useState } from 'react'
import { ListingCard } from '../core/ListingCard'
import { LocationListContainer } from './styles'
import { useBackend } from '@/components/hooks/useBackend'
import { PAGE_SIZE } from '@/utils/api/backend'
import {
  LocationFragment,
  LocationListParams,
  LocationListResponse,
} from '@/utils/types/location'
import { OfferType } from '@/utils/types/offer'

interface LocationListByOfferTypeProps {
  offerType: OfferType
}

export const LocationListByOfferType = (
  props: LocationListByOfferTypeProps
) => {
  const { offerType } = props

  const { useGet } = useBackend()

  const [locations, setLocations] = useState<LocationFragment[]>([])
  const [page, setPage] = useState(1)

  const { data } = useGet<LocationListResponse>('LOCATION_LIST', {
    offerType,
    sort: 'nameAsc',
    page: page,
  } as LocationListParams)

  useEffect(() => {
    if (data) {
      if (page === 1) {
        // Reset locations if first page
        setLocations(data.locations)
      } else {
        // Append locations if not first page
        setLocations([...locations, ...data.locations])
      }
    }
  }, [data])

  const hasMore = data ? data.count > PAGE_SIZE * (page + 1) : false
  const dataLength = locations?.length ?? 0

  // const [refetchList, setRefetchList] = useState(false)
  const { voteForLocation } = useLocationVote(() => {
    // setRefetchList(true)
  })
  // useEffect(() => {
  //   if (refetchList) {
  //     refetch()
  //   }
  // }, [refetchList, refetch, offerType])

  return (
    <LocationListContainer>
      <InfiniteScroll
        hasMore={!!hasMore}
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
