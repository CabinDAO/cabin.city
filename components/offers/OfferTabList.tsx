import InfiniteScroll from 'react-infinite-scroll-component'
import { useProfile } from '../auth/useProfile'
import { useBackend } from '@/components/hooks/useBackend'
import {
  OfferFragment,
  OfferListParams,
  OfferListResponse,
  OfferType,
} from '@/utils/types/offer'
import { ExperienceListContainer } from './styles'
import { ListEmptyState } from '../core/ListEmptyState'
import { ExperienceCard } from '../core/ExperienceCard'

export const OfferTabList = ({ offerType }: { offerType?: OfferType }) => {
  const { user } = useProfile()
  const { useGetPaginated } = useBackend()

  const { data, page, setPage, isEmpty, isLastPage } =
    useGetPaginated<OfferListResponse>('OFFER_LIST', {
      offerType: offerType ?? undefined,
      publiclyVisibleOnly: 'true',
    } as OfferListParams)

  const offers = data
    ? data.reduce(
        (acc: OfferFragment[], val) =>
          'error' in val ? acc : [...acc, ...val.offers],
        []
      )
    : []

  return (
    <ExperienceListContainer withScroll>
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
              <ExperienceCard
                key={offer.externId}
                offer={offer}
                isLocked={!user}
              />
            )
          })
        )}
      </InfiniteScroll>
    </ExperienceListContainer>
  )
}
