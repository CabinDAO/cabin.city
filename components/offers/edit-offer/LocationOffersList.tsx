import styled from 'styled-components'
import { LocationFragment, OfferItemFragment } from '@/generated/graphql'
import { ContentCard } from '@/components/core/ContentCard'
import { OffersList } from '../OffersList'
import { useProfile } from '@/components/auth/useProfile'

export interface OffersListProps {
  offers: OfferItemFragment[]
  location: LocationFragment
}

export const LocationOffersList = ({ offers, location }: OffersListProps) => {
  const { user } = useProfile()
  return (
    <StyledContentCard>
      <OffersList
        offers={offers}
        actionsEnabled={user?._id === location.caretaker._id}
      />
    </StyledContentCard>
  )
}

const StyledContentCard = styled(ContentCard)`
  display: flex;
  padding: 2.4rem;
`
