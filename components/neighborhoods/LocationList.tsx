import {
  LocationItemFragment,
  LocationType,
  useGetLocationsByLocationTypeQuery,
} from '@/generated/graphql'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LocationCard } from '../core/LocationCard'
import { locationCardPropsFromFragment } from '@/lib/location'
import styled from 'styled-components'
import { useLocationVote } from '../hooks/useLocationVote'
import { useEffect, useState } from 'react'

interface LocationListProps {
  locationType: LocationType
}

export const LocationList = (props: LocationListProps) => {
  const { locationType } = props
  const { data, fetchMore, refetch } = useGetLocationsByLocationTypeQuery({
    variables: { locationType, size: 20, cursor: null },
  })
  const [refetchList, setRefetchList] = useState(false)
  const { voteForLocation } = useLocationVote(() => {
    setRefetchList(true)
  })

  const locations =
    data?.locationsByLocationType.data.filter(
      (l): l is LocationItemFragment => !!l
    ) ?? []

  const hasMore = !!data?.locationsByLocationType?.after
  const dataLength = locations?.length ?? 0

  useEffect(() => {
    if (refetchList) {
      refetch()
    }
  }, [refetchList, refetch, locationType])

  return (
    <LocationListContainer>
      <InfiniteScroll
        hasMore={!!hasMore}
        dataLength={dataLength}
        next={() => {
          return fetchMore({
            variables: {
              cursor: data?.locationsByLocationType?.after,
            },
          })
        }}
        loader="..."
      >
        {locations.map((location) => {
          const locationCardProps = locationCardPropsFromFragment(location)
          return (
            <LocationCard
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

const LocationListContainer = styled.div`
  width: 100%;

  .infinite-scroll-component {
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }
`
