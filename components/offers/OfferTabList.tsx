import { useEffect, useState } from 'react'
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
import { PAGE_SIZE } from '@/utils/api/backend'

export const OfferTabList = ({ offerType }: { offerType?: OfferType }) => {
  const { user } = useProfile()
  const { useGet } = useBackend()

  const [offers, setOffers] = useState<OfferFragment[]>([])
  const [page, setPage] = useState(1)

  const { data } = useGet<OfferListResponse>('OFFER_LIST', {
    offerType: offerType ?? undefined,
    publishedOnly: 'true',
    page: page,
  } as OfferListParams)

  useEffect(() => {
    if (data) {
      if (page === 1) {
        // Reset locations if first page
        setOffers(data.offers ?? [])
      } else if (data.offers) {
        // Append locations if not first page
        setOffers([...offers, ...data.offers])
      }
    }
  }, [data, page])

  const hasMore =
    data && data.count ? data.count > PAGE_SIZE * (page + 1) : false
  const dataLength = offers?.length ?? 0

  return (
    <ExperienceListContainer withScroll>
      <InfiniteScroll
        hasMore={!!hasMore}
        dataLength={dataLength}
        style={{ overflowX: 'hidden', overflowY: 'hidden' }}
        next={() => {
          setPage(page + 1)
        }}
        loader="..."
      >
        {offers.length === 0 && data && data.count ? (
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
