import InfiniteScroll from 'react-infinite-scroll-component'
import { useProfile } from '../auth/useProfile'
import { useBackend } from '@/components/hooks/useBackend'
import {
  OfferFragment,
  OfferListParamsType,
  OfferListResponse,
  OfferType,
} from '@/utils/types/offer'
import { EventListContainer } from './styles'
import { ListEmptyState } from '../core/ListEmptyState'
import { EventCard } from '../core/EventCard'

export const OfferTabList = ({ offerType }: { offerType?: OfferType }) => {
  const { user } = useProfile()
  const { useGetPaginated } = useBackend()

  const { data, page, setPage, isEmpty, isLastPage } =
    useGetPaginated<OfferListResponse>('OFFER_LIST', {
      offerType: offerType ?? undefined,
      futureOnly: 'true',
    } as OfferListParamsType)

  const offers = data
    ? data.reduce(
        (acc: OfferFragment[], val) =>
          'error' in val ? acc : [...acc, ...val.offers],
        []
      )
    : []

  return (
    <EventListContainer withScroll>
      <InfiniteScroll
        hasMore={!isLastPage}
        dataLength={offers.length}
        style={{ overflowX: 'hidden', overflowY: 'hidden' }}
        next={async () => {
          await setPage(page + 1)
        }}
        loader="..."
      >
        {isEmpty ? (
          <ListEmptyState iconName="offer" />
        ) : (
          offers.map((offer) => {
            if (offer.type == OfferType.Residency) {
              return null
            }
            return (
              <EventCard key={offer.externId} offer={offer} isLocked={!user} />
            )
          })
        )}
      </InfiniteScroll>
    </EventListContainer>
  )
}
