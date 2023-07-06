import styled from 'styled-components'
import { OfferItemFragment } from '@/generated/graphql'
import { offerListItemPropsFromFragment } from '@/utils/offer'
import { useProfile } from '../auth/useProfile'
import { ExperienceListContainer } from './styles'
import { ExperienceCard } from '../core/ExperienceCard'

export interface OffersListProps {
  offers: OfferItemFragment[]
  actionsEnabled?: boolean
}

export const OffersList = ({
  offers,
  actionsEnabled = false,
}: OffersListProps) => {
  const { user } = useProfile()
  return (
    <ExperienceListContainerNoBorder>
      {offers.map((offer) => (
        <ExperienceCard
          key={offer._id}
          {...offerListItemPropsFromFragment(offer, user)}
          variant="no-icon"
          actionsEnabled={actionsEnabled}
        />
      ))}
    </ExperienceListContainerNoBorder>
  )
}

const ExperienceListContainerNoBorder = styled(ExperienceListContainer)`
  border: none;
`
