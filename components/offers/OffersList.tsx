import styled from 'styled-components'
import { OfferItemFragment } from '@/generated/graphql'
import { OfferListItem } from '@/components/core/OfferListItem'
import { offerListItemPropsFromFragment } from '@/utils/offer'
import { useUser } from '../auth/useUser'

export interface OffersListProps {
  offers: OfferItemFragment[]
}

export const OffersList = ({ offers }: OffersListProps) => {
  const { user } = useUser()
  return (
    <OffersListContainer>
      {offers.map((offer) => (
        <OfferListItem
          key={offer._id}
          {...offerListItemPropsFromFragment(offer, user)}
          variant="no-icon"
        />
      ))}
    </OffersListContainer>
  )
}

const OffersListContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.8rem;
`
