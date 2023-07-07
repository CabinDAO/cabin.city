import {
  LocationItemFragment,
  OfferType,
  useGetLocationsByOfferTypeQuery,
} from '@/generated/graphql'
import InfiniteScroll from 'react-infinite-scroll-component'
import { locationCardPropsFromFragment } from '@/lib/location'
import { useLocationVote } from '../hooks/useLocationVote'
import { useEffect, useState } from 'react'
import { ListingCard } from '../core/ListingCard'
import { LocationListContainer } from './styles'

interface LocationListByOfferTypeProps {
  offerType: OfferType
}

export const LocationListByOfferType = (
  props: LocationListByOfferTypeProps
) => {
  const { offerType } = props
  const { data, fetchMore, refetch } = useGetLocationsByOfferTypeQuery({
    variables: { offerType, size: 20, cursor: null },
  })
  const [refetchList, setRefetchList] = useState(false)
  const { voteForLocation } = useLocationVote(() => {
    setRefetchList(true)
  })

  const locations =
    data?.locationsByOfferType.data.filter(
      (l): l is LocationItemFragment => !!l
    ) ?? []

  const hasMore = !!data?.locationsByOfferType?.after
  const dataLength = locations?.length ?? 0

  useEffect(() => {
    if (refetchList) {
      refetch()
    }
  }, [refetchList, refetch, offerType])

  return (
    <LocationListContainer>
      <InfiniteScroll
        hasMore={!!hasMore}
        dataLength={dataLength}
        next={() => {
          return fetchMore({
            variables: {
              cursor: data?.locationsByOfferType?.after,
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
              onVote={() =>
                voteForLocation({
                  location,
                })
              }
            />
          )
        })}
      </InfiniteScroll>
    </LocationListContainer>
  )
}
