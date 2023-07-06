import styled from 'styled-components'
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
import { useProfile } from '../auth/useProfile'
import { ExperienceCard } from '../core/ExperienceCard'

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
    <ExperienceListContainer>
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
            return <ExperienceCard key={offer._id} {...offerProps} />
          })
        )}
      </InfiniteScroll>
    </ExperienceListContainer>
  )
}

export const ExperienceListContainer = styled.div`
  width: 100%;
  border: 1px solid ${({ theme }) => theme.colors.green900};
  background-color: ${({ theme }) => theme.colors.yellow200};
  padding: 2.4rem;

  .infinite-scroll-component {
    display: grid;
    grid-template-columns: 1fr;
    flex-direction: column;
    grid-gap: 1.6rem;
    width: 100%;

    ${({ theme }) => theme.bp.md} {
      grid-template-columns: 1fr 1fr;
      row-gap: 3.7rem;
    }
  }
`
