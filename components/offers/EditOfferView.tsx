import styled from 'styled-components'
import { ContentCard } from '../core/ContentCard'
import { TitleCard } from '../core/TitleCard'
import { OfferTypeSummary } from './edit-offer/OfferTypeSummary'
import { EditOfferForm } from './edit-offer/EditOfferForm'
import { OfferFragment, PartialUpdateOfferInput } from '@/generated/graphql'

interface EditOfferViewProps {
  offer: OfferFragment
  updateOfferInput: PartialUpdateOfferInput
  onEdit: (updateOfferInput: PartialUpdateOfferInput) => void
}

export const EditOfferView = ({
  offer,
  onEdit,
  updateOfferInput,
}: EditOfferViewProps) => {
  const locationId = offer.location._id
  return (
    <>
      <TitleCard
        title="Edit Offer"
        icon="close"
        iconHref={`/location/${locationId}/edit?step=3`}
      />
      <StyledContentCard shape="notch">
        <OfferSummaryContainer>
          <OfferTypeSummary offerType={offer.offerType} />
        </OfferSummaryContainer>
        <EditOfferForm
          updateOfferInput={updateOfferInput}
          offer={offer}
          onEdit={onEdit}
        />
      </StyledContentCard>
    </>
  )
}

const StyledContentCard = styled(ContentCard)`
  padding: 3.2rem 2.4rem;
  gap: 2.4rem;
  flex-direction: column;
  margin-bottom: 4.8rem;
`

const OfferSummaryContainer = styled.div`
  width: 100%;

  ${({ theme }) => theme.bp.md} {
    width: 50%;
  }
`
