import styled from 'styled-components'
import { LocationFragment } from '@/utils/types/location'
import { OfferFragment } from '@/utils/types/offer'
import { ContentCard } from '@/components/core/ContentCard'
import { OffersList } from '../OffersList'
import { useProfile } from '@/components/auth/useProfile'

export interface OffersListProps {
  offers: OfferFragment[]
  location: LocationFragment
}

export const LocationOffersList = ({ offers, location }: OffersListProps) => {
  const { user } = useProfile()
  return (
    <StyledContentCard>
      <OffersList
        offers={offers}
        actionsEnabled={user?.externId === location.caretaker.externId}
      />
    </StyledContentCard>
  )
}

const StyledContentCard = styled(ContentCard)`
  display: flex;
  padding: 2.4rem;
`
