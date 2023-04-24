import {
  LocationItemFragment,
  LocationType,
  useGetLocationsByLocationTypeQuery,
} from '@/generated/graphql'
import InfiniteScroll from 'react-infinite-scroll-component'
import { LocationCard } from '../core/LocationCard'
import { locationCardPropsFromFragment } from '@/lib/location'
import styled from 'styled-components'

interface LocationListProps {
  locationType: LocationType
}

export const LocationList = (props: LocationListProps) => {
  const { locationType } = props
  const { data, fetchMore } = useGetLocationsByLocationTypeQuery({
    variables: { locationType, size: 20 },
  })

  const locations =
    data?.locationsByLocationType.data.filter(
      (l): l is LocationItemFragment => !!l
    ) ?? []

  const hasMore = !!data?.locationsByLocationType?.after
  const dataLength = locations?.length ?? 0

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
          return <LocationCard key={location._id} {...locationCardProps} />
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
