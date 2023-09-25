import {
  GetOffersInput,
  OfferItemFragment,
  OfferType,
  useGetOffersCountQuery,
  useGetOffersQuery,
} from '@/generated/graphql'
import { useMemo } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { ListEmptyState } from '../core/ListEmptyState'
import { offerListItemPropsFromFragment } from '@/utils/offer'
import { useProfile } from '../auth/useProfile'
import { ExperienceCard } from '../core/ExperienceCard'
import { ExperienceListContainer } from './styles'

interface OfferTabListProps {
  offerType?: OfferType
}

export const OfferTabList = ({ offerType }: OfferTabListProps) => {
  const { user } = useProfile()
  const input: GetOffersInput = useMemo(() => {
    return {
      offerTypes: offerType ? [offerType] : [],
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

  // Exclude offers belonging to locations that are not published
  const offers = useMemo(
    () =>
      data?.getOffers.data.filter(
        (o): o is OfferItemFragment => !!o && o.location.publishedAt
      ) ?? [],
    [data]
  )
  const hasMore = !!data?.getOffers?.after
  const dataLength = offers.length

  return (
    <ExperienceListContainer withScroll>
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
            if (offer.offerType == OfferType.Residency) {
              return null
            }
            const offerProps = offerListItemPropsFromFragment(offer, user)
            return <ExperienceCard key={offer._id} {...offerProps} />
          })
        )}
      </InfiniteScroll>
    </ExperienceListContainer>
  )
}
