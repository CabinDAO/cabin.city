import {
  GetOffersInput,
  OfferItemFragment,
  OfferType,
  useGetOffersCountQuery,
  useGetOffersQuery,
} from '@/generated/graphql'
import { useMemo } from 'react'
import { List } from '../core/List'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ListEmptyState } from '../core/ListEmptyState'
import { offerListItemPropsFromFragment } from '@/utils/offer'
import { OfferListItem } from '../core/OfferListItem'
import { useProfile } from '../auth/useProfile'

interface OfferTabListProps {
  offerType: OfferType
}

export const OfferTabList = ({ offerType }: OfferTabListProps) => {
  const { user } = useProfile()
  const input: GetOffersInput = useMemo(() => {
    return {
      offerTypes: [offerType],
      profileRoleConstraints: [],
    }
  }, [offerType])

  const { data, fetchMore } = useGetOffersQuery({
    variables: {
      input,
    },
  })

  const { data: offersCountData } = useGetOffersCountQuery({
    variables: {
      input,
    },
  })

  const offers = useMemo(
    () =>
      data?.getOffers.data.filter(
        (o): o is OfferItemFragment => !!o && o.location.publishedAt
      ) ?? [],
    [data]
  )
  const hasMore = !!data?.getOffers?.after
  const dataLength = offers.length

  // TODO: Add denormalized count to offer
  const count =
    (offersCountData?.offersCount ?? 0) > 20
      ? offersCountData?.offersCount
      : dataLength

  return (
    <List total={count}>
      <InfiniteScroll
        hasMore={!!hasMore}
        dataLength={dataLength}
        style={{ overflowX: 'hidden', overflowY: 'hidden' }}
        next={() => {
          return fetchMore({
            variables: {
              cursor: data?.getOffers?.after,
            },
          })
        }}
        loader="..."
      >
        {offers.length === 0 && data && offersCountData ? (
          <ListEmptyState iconName="offer" />
        ) : (
          offers.map((offer) => {
            const offerProps = offerListItemPropsFromFragment(offer, user)
            return <OfferListItem key={offer._id} {...offerProps} />
          })
        )}
      </InfiniteScroll>
    </List>
  )
}
