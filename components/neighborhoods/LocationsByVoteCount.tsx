import {
  LocationItemFragment,
  useGetLocationsSortedByVoteCountQuery,
} from '@/generated/graphql'
import InfiniteScroll from 'react-infinite-scroll-component'
import { locationCardPropsFromFragment } from '@/lib/location'
import { useLocationVote } from '../hooks/useLocationVote'
import { useEffect, useState } from 'react'
import { ListingCard } from '../core/ListingCard'
import { LocationListContainer } from './styles'

export const LocationsByVoteCount = () => {
  const { data, fetchMore, refetch } = useGetLocationsSortedByVoteCountQuery({
    variables: { size: 20, cursor: null },
  })
  const [refetchList, setRefetchList] = useState(false)
  const { voteForLocation } = useLocationVote(() => {
    setRefetchList(true)
  })

  const locations =
    data?.locationsSortedByVoteCount.data.filter(
      (l): l is LocationItemFragment => !!l
    ) ?? []

  const hasMore = !!data?.locationsSortedByVoteCount?.after
  const dataLength = locations?.length ?? 0

  useEffect(() => {
    if (refetchList) {
      refetch()
    }
  }, [refetchList, refetch])

  return (
    <LocationListContainer>
      <InfiniteScroll
        hasMore={!!hasMore}
        dataLength={dataLength}
        next={() => {
          return fetchMore({
            variables: {
              cursor: data?.locationsSortedByVoteCount?.after,
            },
          })
        }}
        loader="..."
      >
        {locations.map((location, index) => {
          const locationCardProps = locationCardPropsFromFragment(location)
          return (
            <ListingCard
              position={index + 1}
              key={location._id}
              {...locationCardProps}
              onVote={() => voteForLocation(location)}
            />
          )
        })}
      </InfiniteScroll>
    </LocationListContainer>
  )
}
