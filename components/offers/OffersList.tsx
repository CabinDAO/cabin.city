import styled from 'styled-components'
import { OfferListItem } from '@/components/core/OfferListItem'
import { useProfile } from '../auth/useProfile'
import { OfferFragment } from '@/utils/types/offer'

export interface OffersListProps {
  offers: OfferFragment[]
  actionsEnabled?: boolean
}

export const OffersList = ({
  offers,
  actionsEnabled = false,
}: OffersListProps) => {
  const { user } = useProfile()
  return (
    <OffersListContainer>
      {offers.map((offer) => (
        <OfferListItem
          key={offer.externId}
          offer={offer}
          me={user}
          variant="no-icon"
          actionsEnabled={actionsEnabled}
        />
      ))}
    </OffersListContainer>
  )
}

const OffersListContainer = styled.div`
  display: flex;
  flex-flow: column;
  gap: 0.8rem;
  width: 100%;
`
