import styled from 'styled-components'
import { OfferItemFragment } from '@/generated/graphql'
import { offerListItemPropsFromFragment } from '@/utils/offer'
import { useProfile } from '../auth/useProfile'
import { ExperienceListContainer } from './styles'
import { ExperienceCard } from '../core/ExperienceCard'

export interface ExperienceListProps {
  offers: OfferItemFragment[]
  actionsEnabled?: boolean
}

export const ExperienceList = ({
  offers,
  actionsEnabled = false,
}: ExperienceListProps) => {
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
